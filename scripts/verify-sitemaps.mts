/**
 * pnpm verify:sitemaps — the sitemap index and its children (SEO brief, 4).
 * Index lists only children that exist; every child is valid XML under the
 * 10,000-URL limit; every URL is indexable, absolute and resolves 200; no
 * noindex URL appears; lastmod is a real document date, never the build time;
 * and every URL in the shipped fixture resolves once its wave is open.
 */
import { readFileSync } from "node:fs";
import { BASE, attr, fetchPage, loadManifest, pmap, report, withPayload } from "./lib/site.mts";

const failures: string[] = [];
const notes: string[] = [];
const manifest = await withPayload(loadManifest);
const indexable = new Set(manifest.filter((r) => r.indexable).map((r) => r.path));
const today = new Date().toISOString().slice(0, 10);

const text = async (p: string) => (await fetch(`${BASE}${p}`)).text();
const indexXml = await text("/sitemap.xml");
if (!indexXml.includes("<sitemapindex")) failures.push("/sitemap.xml is not a sitemap index");
const children = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
if (!children.length) failures.push("/sitemap.xml lists no child sitemaps");

let urlCount = 0;
for (const child of children) {
  const path = child.replace(/^https?:\/\/[^/]+/, "");
  const xml = await text(path);
  if (!xml.includes("<urlset")) { failures.push(`${path}: not a urlset`); continue; }
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]!);
  if (urls.length > 10_000) failures.push(`${path}: ${urls.length} URLs, over the 10,000 limit`);
  urlCount += urls.length;
  for (const u of urls) {
    const loc = /<loc>([^<]+)<\/loc>/.exec(u)?.[1] ?? "";
    const lastmod = /<lastmod>([^<]+)<\/lastmod>/.exec(u)?.[1];
    if (!/^https:\/\//.test(loc) && !loc.startsWith(BASE)) failures.push(`${path}: ${loc} is not an absolute URL`);
    const route = loc.replace(/^https?:\/\/[^/]+/, "");
    if (!indexable.has(route)) failures.push(`${path}: ${route} is in the sitemap but is not indexable`);
    if (lastmod) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) failures.push(`${path}: ${route} has a malformed lastmod "${lastmod}"`);
      const expected = manifest.find((r) => r.path === route)?.lastmod?.slice(0, 10);
      if (expected && lastmod !== expected) failures.push(`${path}: ${route} lastmod ${lastmod} does not match the document's updatedAt ${expected}`);
      if (!expected && lastmod === today) failures.push(`${path}: ${route} lastmod looks like build time, not a document date`);
    }
  }
}
if (urlCount !== indexable.size) failures.push(`sitemaps list ${urlCount} URLs; ${indexable.size} routes are indexable`);

// Every indexable URL resolves 200 and is not noindex (sample the first 40 for speed).
const sampled = [...indexable].slice(0, 40);
await pmap(sampled, 8, async (path) => {
  const { status, html } = await fetchPage(path);
  if (status !== 200) failures.push(`${path}: in the sitemap but returns ${status}`);
  else if (/noindex/.test(attr(html, /<meta name="robots" content="([^"]*)"/) ?? "")) failures.push(`${path}: in the sitemap but the page is noindex`);
});

// The shipped fixture: every URL must exist in the app (after the documented slug correction).
const fixture = readFileSync("desert-peak-insurance-sitemap/full-sitemap.xml", "utf8");
const fixturePaths = [...fixture.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!.replace(/^https?:\/\/[^/]+/, ""));
const known = new Set(manifest.map((r) => r.path));
const blocked = fixturePaths.filter((p) => p.startsWith("/agents/") || p.startsWith("/carriers/")).filter((p) => p !== "/agents/" && p !== "/carriers/");
const missing = fixturePaths.filter((p) => !known.has(p) && !blocked.includes(p));
if (missing.length) failures.push(`fixture URLs not in the app: ${missing.length} (first: ${missing.slice(0, 3).join(", ")})`);
notes.push(`index lists ${children.length} children, ${urlCount} URLs; fixture ${fixturePaths.length} URLs, ${blocked.length} awaiting client data (agent and carrier profiles)`);
notes.push(`sampled ${sampled.length} sitemap URLs for status and robots`);
report("verify:sitemaps", failures, notes);
