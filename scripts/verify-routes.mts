/** pnpm verify:routes — manifest == site; sitemap == indexable set; zero broken internal links; zero orphans within 3 clicks; the shipped sitemap fixture resolves. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { BASE, fetchPage, links, loadManifest, main, pmap, report, withPayload } from "./lib/site.mts";

const failures: string[] = [];
const notes: string[] = [];
const manifest = await withPayload(loadManifest);
const byGroup = new Map<string, number>();
for (const r of manifest) byGroup.set(r.group, (byGroup.get(r.group) ?? 0) + 1);
notes.push(`manifest: ${manifest.length} routes — ${[...byGroup].map(([g, n]) => `${g} ${n}`).join(", ")}`);
const utility = manifest.filter((r) => r.group === "utility").length;
notes.push(`plan: ${manifest.length - utility} planned routes (+ ${utility} utility); agents/carriers profiles blocked: 45 (not in manifest until the roster exists)`);

// 1. every manifest path serves 200
const statuses = await pmap(manifest, 8, async (r) => {
  const first = await fetchPage(r.path);
  if (first.status === 307 && first.location) { const next = await fetchPage(new URL(first.location, "http://x").pathname); return { path: r.path, status: next.status === 200 ? 200 : first.status, location: first.location }; }
  return { path: r.path, ...first };
});
for (const s of statuses) if (s.status !== 200) failures.push(`${s.path} → ${s.status}${s.location ? ` ${s.location}` : ""}`);
notes.push(`${statuses.filter((s) => s.status === 200).length}/${manifest.length} manifest routes return 200`);

// 2. sitemap == indexable set
const sm = await fetchPage("/sitemap.xml");
const inSitemap = new Set([...sm.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname));
const indexable = new Set(manifest.filter((r) => r.indexable).map((r) => r.path));
for (const p of indexable) if (!inSitemap.has(p)) failures.push(`indexable route missing from sitemap: ${p}`);
for (const p of inSitemap) if (!indexable.has(p)) failures.push(`sitemap lists a non-indexable route: ${p}`);
notes.push(`sitemap.xml: ${inSitemap.size} urls, indexable in manifest: ${indexable.size}`);

// 3. crawl from / for broken links and orphans (BFS depth ≤ 3)
const seen = new Map<string, number>([["/", 0]]);
const queue = ["/"];
const broken: string[] = [];
const known = new Set(manifest.map((r) => r.path));
while (queue.length && seen.size < 3000) {
  const batch = queue.splice(0, 16);
  await pmap(batch, 8, async (path) => {
    const depth = seen.get(path)!;
    const page = await fetchPage(path);
    if (page.status >= 400) { broken.push(`${path} (${page.status})`); return; }
    if (depth >= 3) return;
    for (const href of links(main(page.html) + (page.html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? "") + (page.html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? ""))) {
      const norm = href.endsWith("/") ? href : `${href}/`;
      if (!seen.has(norm)) { seen.set(norm, depth + 1); queue.push(norm); }
    }
  });
}
for (const b of broken) failures.push(`broken internal link target: ${b}`);
const orphans = manifest.filter((r) => !seen.has(r.path));
for (const o of orphans.slice(0, 30)) failures.push(`orphan (not reachable from / in ≤3 clicks): ${o.path}`);
if (orphans.length > 30) failures.push(`…and ${orphans.length - 30} more orphans`);
notes.push(`crawled ${seen.size} pages from / to depth 3; ${orphans.length} orphans; ${broken.length} broken`);

// 4. the shipped fixture resolves after the known corrections
const fixture = [...readFileSync(join(process.cwd(), "desert-peak-insurance-sitemap", "full-sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
const corrected = fixture.filter((p) => !/^\/(agents|carriers)\/[^/]+\/$/.test(p)).map((p) => p.replace("/business-owners-policy-business-owners-policy/", "/business-owners-policy/"));
const missing = corrected.filter((p) => !known.has(p));
for (const m of missing.slice(0, 20)) failures.push(`fixture url has no route: ${m}`);
notes.push(`fixture: ${fixture.length} urls, ${corrected.length} after corrections, ${corrected.length - missing.length} resolve`);
void BASE;
report("verify:routes", failures, notes);
