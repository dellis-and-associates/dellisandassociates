/**
 * pnpm verify:urls — the URL and canonical contract (SEO brief, section 1).
 * Trailing slash is canonical; the no-slash and uppercase variants 301 to it;
 * query strings never change the canonical; utility routes are noindex and
 * disallowed; unknown paths are a real 404 (no soft-404s) and retired legacy
 * paths are 410. Apex→www and http→https are DNS/host rules, reported as
 * checked-at-launch rather than asserted against localhost.
 */
import { BASE, attr, fetchPage, loadManifest, report, withPayload } from "./lib/site.mts";

const failures: string[] = [];
const notes: string[] = [];
const { manifest, gone } = await withPayload(async (payload) => ({
  manifest: await loadManifest(payload),
  gone: (await payload.find({ collection: "redirects", where: { statusCode: { equals: "410" } }, limit: 3, depth: 0, overrideAccess: true })).docs as unknown as { from: string }[],
}));
const raw = async (path: string, init: RequestInit = {}) => fetch(`${BASE}${path}`, { redirect: "manual", ...init });

// Sample across route families rather than all 1,083: the rules are structural.
const sample = ["/", "/insurance/", "/insurance/auto-insurance/", "/insurance/arizona/", "/resources/glossary/deductible/", "/contact/"].filter((p) => manifest.some((r) => r.path === p) || p === "/");

for (const path of sample) {
  const noSlash = path.replace(/\/$/, "");
  if (noSlash) {
    const res = await raw(noSlash);
    if (res.status !== 301 && res.status !== 308) failures.push(`${noSlash}: expected a permanent redirect to the trailing-slash URL, got ${res.status}`);
    const loc = res.headers.get("location") ?? "";
    if (loc && !loc.endsWith(`${path}`)) failures.push(`${noSlash}: redirects to ${loc}, expected ${path}`);
  }
  const upper = path.toUpperCase();
  if (upper !== path) {
    const res = await raw(upper);
    if (![301, 308, 404].includes(res.status)) failures.push(`${upper}: uppercase variant returned ${res.status}; expected a 301 to lowercase or a 404`);
    if ([301, 308].includes(res.status) && !(res.headers.get("location") ?? "").endsWith(path)) failures.push(`${upper}: uppercase variant does not redirect to the lowercase URL`);
  }
  // Query strings never change the canonical.
  const { html } = await fetchPage(`${path}?utm_source=test&ref=abc`);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/) ?? "";
  if (!canonical.endsWith(path) || canonical.includes("?")) failures.push(`${path}?utm_source: canonical is ${canonical || "missing"}, expected the clean URL`);
}

// Utility routes: noindex in the page and disallowed in robots.txt.
const robots = await (await raw("/robots.txt")).text();
const utility = manifest.filter((r) => r.group === "utility").map((r) => r.path);
for (const path of [...utility, "/search/", "/quote/1/"]) {
  const { status, html } = await fetchPage(path);
  if (status === 200 && !/noindex/.test(attr(html, /<meta name="robots" content="([^"]*)"/) ?? "")) failures.push(`${path}: utility route is not noindex`);
}
for (const prefix of ["/admin/", "/api/", "/quote/", "/forms/", "/partners/portal/", "/referrals/", "/r/", "/design-system/", "/search/"]) {
  if (!robots.includes(`Disallow: ${prefix}`)) notes.push(`robots.txt does not disallow ${prefix} (only enforced when APP_ENV=production; robots is currently ${robots.includes("Disallow: /") ? "disallow-all" : "production"})`);
}

// No soft-404s: an unknown path is a 404 status with the 404 page body.
const unknown = await raw("/this-route-does-not-exist-" + Date.now() + "/");
if (unknown.status !== 404) failures.push(`unknown path returned ${unknown.status}; expected 404`);
else if (!/not found|page is gone|cannot find/i.test(await unknown.text())) failures.push("unknown path returned 404 without the 404 page body");

// Retired legacy paths answer 410.
for (const row of gone) {
  const url = /\.[a-z0-9]{2,5}\/$/i.test(row.from) ? row.from.replace(/\/$/, "") : row.from;
  const res = await raw(url);
  if (res.status !== 410) failures.push(`${url}: expected 410, got ${res.status}`);
}
notes.push(`checked ${sample.length} route families, ${utility.length} utility routes, ${gone.length} retired paths`);
notes.push("apex→www and http→https are host rules; LAUNCH-CHECKLIST.md owns them");
report("verify:urls", failures, notes);
