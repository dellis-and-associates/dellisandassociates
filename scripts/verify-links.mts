/**
 * pnpm verify:links — the internal link graph (SEO brief, section 7).
 * Crawls the rendered HTML from the homepage: zero broken internal links, zero
 * orphans among indexable routes, every indexable route within three clicks,
 * no links from indexable pages to noindex content, and an anchor-text
 * repetition report. Anchors inside the header and footer are the site
 * furniture and are counted separately from in-content anchors.
 */
import { BASE, attr, fetchPage, links as hrefsIn, loadManifest, pmap, report, withPayload } from "./lib/site.mts";

const failures: string[] = [];
const notes: string[] = [];
const { manifest, promotedWave } = await withPayload(async (payload) => ({
  manifest: await loadManifest(payload),
  promotedWave: Number(((await payload.findGlobal({ slug: "site-settings", depth: 0 })) as { promotedWave?: string | null }).promotedWave ?? 1),
}));
const byPath = new Map(manifest.map((r) => [r.path, r]));
const indexable = manifest.filter((r) => r.indexable);
const MAX_DEPTH = 3;
const ANCHOR_REPEAT_THRESHOLD = 40;

const normalise = (href: string) => {
  const clean = href.split("#")[0]!.split("?")[0]!;
  if (!clean.startsWith("/")) return null;
  return clean.endsWith("/") || /\.[a-z0-9]+$/i.test(clean) ? clean : `${clean}/`;
};
/** Anchors with their text, minus the shared header and footer. */
function contentAnchors(html: string): { href: string; text: string }[] {
  const body = html.replace(/<header[\s\S]*?<\/header>/g, "").replace(/<footer[\s\S]*?<\/footer>/g, "");
  return [...body.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ href: m[1]!, text: m[2]!.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() }));
}

const seen = new Map<string, number>([["/", 0]]);
const linkedFrom = new Map<string, string>();
const anchors = new Map<string, Set<string>>();
const pageCache = new Map<string, { status: number; html: string }>();
let frontier = ["/"];
for (let depth = 0; depth < MAX_DEPTH && frontier.length; depth++) {
  const pages = await pmap(frontier, 8, async (path) => {
    const page = pageCache.get(path) ?? (await fetchPage(path));
    pageCache.set(path, page);
    return { path, ...page };
  });
  const next = new Set<string>();
  for (const { path, status, html } of pages) {
    if (status !== 200) continue;
    for (const raw of hrefsIn(html)) {
      const href = normalise(raw);
      if (!href || seen.has(href)) continue;
      seen.set(href, depth + 1);
      linkedFrom.set(href, path);
      next.add(href);
    }
    for (const a of contentAnchors(html)) {
      const href = normalise(a.href);
      if (!href || !a.text) continue;
      const key = a.text.toLowerCase();
      if (!anchors.has(key)) anchors.set(key, new Set());
      anchors.get(key)!.add(href);
    }
  }
  frontier = [...next];
}

// Broken internal links: every link target found in the crawl must answer 200.
const targets = [...seen.keys()].filter((p) => p !== "/");
const statuses = await pmap(targets, 8, async (path) => {
  const page = pageCache.get(path) ?? (await fetchPage(path));
  if (page.status === 200) return { path, status: 200 };
  // A route that redirects (the quote flow enters at /quote/1/, the portal at its login) is fine as long as it lands on a page.
  const followed = await fetch(`${BASE}${path}`, { redirect: "follow" });
  return { path, status: followed.status };
});
for (const { path, status } of statuses) if (status !== 200) failures.push(`broken link: ${path} returns ${status} (linked from ${linkedFrom.get(path) ?? "?"})`);

// Depth and orphans, measured against the indexable set.
for (const route of indexable) {
  const depth = seen.get(route.path);
  if (depth === undefined) failures.push(`orphan: ${route.path} is indexable but is not linked from any page within ${MAX_DEPTH} clicks`);
  else if (depth > MAX_DEPTH) failures.push(`depth: ${route.path} is ${depth} clicks from the homepage`);
}

// Indexable pages should not spend crawl budget on noindex content (utility CTAs are exempt and reported).
let utilityLinks = 0, waveLinks = 0, pendingDataLinks = 0;
for (const [path, page] of pageCache) {
  const from = byPath.get(path);
  if (!from?.indexable || page.status !== 200) continue;
  for (const raw of hrefsIn(page.html)) {
    const href = normalise(raw);
    const target = href ? byPath.get(href) : undefined;
    if (!target || target.indexable) continue;
    if (target.group === "utility") { utilityLinks++; continue; }
    // Wave 2 and 3 pages are built and linked on purpose; they become indexable when the wave opens.
    if (target.wave > promotedWave) { waveLinks++; continue; }
    // City pages are noindex only until the nearest-office fact arrives (TODO-CLIENT-DATA.md #14). A state hub must
    // still link its cities: that is how a reader finds them, and the pages turn indexable the day the field is filled.
    if (target.group === "product-city") { pendingDataLinks++; continue; }
    failures.push(`crawl budget: indexable ${path} links to noindex ${href}`);
  }
}

const repeated = [...anchors.entries()].filter(([, t]) => t.size > 1).map(([text, t]) => ({ text, targets: t.size })).sort((a, b) => b.targets - a.targets).slice(0, 10);
for (const r of repeated) if (r.targets > ANCHOR_REPEAT_THRESHOLD) failures.push(`anchor text "${r.text}" points at ${r.targets} different pages — exact-match repetition`);
notes.push(`crawled ${pageCache.size} pages to depth ${MAX_DEPTH}; ${indexable.length} indexable routes, ${seen.size} reachable paths`);
notes.push(`utility links from indexable pages (quote, forms, portal — expected): ${utilityLinks}`);
notes.push(`links to pages awaiting a later indexation wave (promoted wave is ${promotedWave}): ${waveLinks}`);
notes.push(`links to city pages awaiting the nearest-office fact: ${pendingDataLinks}`);
if (repeated.length) notes.push(`most reused anchor text: ${repeated.slice(0, 5).map((r) => `"${r.text}" → ${r.targets}`).join(", ")}`);
report("verify:links", failures, notes);
