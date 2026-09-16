/** pnpm verify:uniqueness — pairwise Jaccard on 5-word shingles per template family; ≥250 local words or noindex on city pages. */
import { fetchPage, loadManifest, main, pmap, report, strip, withPayload } from "./lib/site.mts";
import { jaccard, shingles } from "./lib/similarity.mts";

const failures: string[] = [];
const notes: string[] = [];
const manifest = await withPayload(loadManifest);
/** Text inside the page's data-local regions. Nested elements are common there, so the closing tag is found by counting depth rather than by a lazy match, which used to stop at the first inner </div> and undercount every page. */
const local = (html: string) => {
  const out: string[] = [];
  for (const m of html.matchAll(/<(section|div)\b[^>]*\bdata-local\b[^>]*>/g)) {
    const tag = m[1]!;
    let depth = 1;
    const scan = new RegExp(`<(/?)${tag}\\b[^>]*>`, "g");
    scan.lastIndex = m.index! + m[0].length;
    let hit: RegExpExecArray | null = null;
    while (depth > 0 && (hit = scan.exec(html))) depth += hit[1] ? -1 : 1;
    out.push(html.slice(m.index! + m[0].length, hit ? hit.index : html.length));
  }
  return strip(out.join(" "));
};
const body = (html: string) => strip(main(html).replace(/<nav[\s\S]*?<\/nav>|<section[^>]*cta-band[\s\S]*?<\/section>/g, ""));

async function family(group: string, threshold: number, textOf: (html: string) => string) {
  const routes = manifest.filter((r) => r.group === group);
  // Pages that are noindex (unreviewed shells, incomplete cities) are not in the index and cannot be doorway pages; only indexable pages are compared.
  const docs = (await pmap(routes, 8, async (r) => ({ r, ...(await fetchPage(r.path)) }))).filter((d) => d.status === 200 && !/<meta name="robots" content="[^"]*noindex/.test(d.html));
  const sh = docs.map((d) => ({ path: d.r.path, s: shingles(textOf(d.html)), html: d.html, r: d.r }));
  const pairs: { a: string; b: string; j: number }[] = [];
  for (let i = 0; i < sh.length; i++) for (let k = i + 1; k < sh.length; k++) {
    // compare within the same product only for city pages: that is where a doorway page hides
    if (group === "product-city" && sh[i]!.path.split("/")[2] !== sh[k]!.path.split("/")[2]) continue;
    pairs.push({ a: sh[i]!.path, b: sh[k]!.path, j: jaccard(sh[i]!.s, sh[k]!.s) });
  }
  pairs.sort((x, y) => y.j - x.j);
  const over = pairs.filter((p) => p.j > threshold);
  notes.push(`${group}: ${routes.length} routes, ${docs.length} indexable compared, ${pairs.length} pairs, max similarity ${(pairs[0]?.j ?? 0).toFixed(2)}, ${over.length} over ${threshold}`);
  for (const p of over.slice(0, 20)) failures.push(`${group}: ${p.a} ~ ${p.b} = ${p.j.toFixed(2)}`);
  return sh;
}
const cities = await family("product-city", 0.7, body);
const cityRoutes = manifest.filter((r) => r.group === "product-city");
const allCities = (await pmap(cityRoutes, 8, async (r) => ({ path: r.path, ...(await fetchPage(r.path)) }))).filter((d) => d.status === 200);
let todo = 0, thin = 0;
void cities;
for (const c of allCities) {
  const t = local(c.html);
  const words = t.split(/\s+/).filter(Boolean).length;
  const hasTodo = /in progress|not yet (?:recorded|confirmed)|to be confirmed/.test(t);
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(c.html);
  if (hasTodo) { todo++; if (!noindex) failures.push(`${c.path}: local facts incomplete but indexable`); }
  else if (words < 250) { thin++; if (!noindex) failures.push(`${c.path}: ${words} local words (< 250) but indexable`); }
}
notes.push(`city pages: ${todo} with local facts still TODO (noindex), ${thin} under 250 local words`);
await family("article", 0.7, body);
await family("glossary", 0.7, body);
report("verify:uniqueness", failures, notes);
