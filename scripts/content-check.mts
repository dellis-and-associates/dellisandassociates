/**
 * pnpm content:check [--collection=products|pages|cities|glossary-terms|articles] [--slug=x]
 *
 * Validates every authored draft under scripts/lib/drafts/ against the
 * factual-restraint rules with no database: word ranges, banned phrases,
 * competitor names, unsourced figures and statutes, sentence-case headings,
 * link counts, and that every related slug exists in src/seed-data. Writers
 * run this before handing a batch over; it exits 1 on any violation.
 */
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { LOCAL_HAZARDS } from "../src/collections/Cities.ts";
import { validateArticle, validateCity, validateGlossary, validatePage, validateProduct, type Violation } from "./lib/content-rules.mts";
import { articleToInput, cityProse, glossaryToInput, loadArticleDraft, loadCityDraft, loadGlossaryDraft, loadPageDraft, loadProductDraft, pageFileSlug, pageProse, productProse } from "./lib/drafts/index.mts";
import { SIMILARITY_THRESHOLD, similarityReport } from "./lib/similarity.mts";
import { articleText, cityText, glossaryText, pageText, productText } from "./lib/drafts/index.mts";

const args = process.argv.slice(2);
const arg = (n: string) => args.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
const only = arg("collection");
const onlySlug = arg("slug");
const seed = <T,>(f: string) => JSON.parse(readFileSync(new URL(`../src/seed-data/${f}`, import.meta.url), "utf8")) as T;
const productSlugs = new Set(seed<{ slug: string }[]>("products.json").map((p) => p.slug));
const termSlugs = new Set(seed<{ slug: string }[]>("glossary.json").map((p) => p.slug));
const articleSlugs = new Set(seed<{ slug: string }[]>("articles.json").map((p) => p.slug));
const stateSlugs = new Set(seed<{ slug: string; cities: { slug: string }[] }[]>("states.json").map((s) => s.slug));
const citySlugs = new Set(seed<{ slug: string; cities: { slug: string }[] }[]>("states.json").flatMap((s) => s.cities.map((c) => c.slug)));
const pagePaths = new Set(seed<{ path: string }[]>("pages.json").map((p) => pageFileSlug(p.path)));
const files = (dir: string) => readdirSync(fileURLToPath(new URL(`./lib/drafts/${dir}/`, import.meta.url))).filter((f) => f.endsWith(".ts")).map((f) => f.slice(0, -3)).filter((s) => !onlySlug || s === onlySlug).sort();
const unknown = (what: string, slugs: string[], known: Set<string>, slug: string): Violation[] => slugs.filter((s) => !known.has(s)).map((s) => ({ rule: "links", message: `${slug}: unknown ${what} slug "${s}"` }));

let total = 0, bad = 0;
const texts: Record<string, { slug: string; text: string }[]> = {};
const run = async (collection: string, dir: string, fn: (slug: string) => Promise<{ v: Violation[]; text: string }>) => {
  if (only && only !== collection) return;
  texts[collection] = [];
  for (const slug of files(dir)) {
    total++;
    try {
      const { v, text } = await fn(slug);
      texts[collection]!.push({ slug, text });
      if (v.length) { bad++; console.log(`FAIL ${collection}/${slug}`); for (const x of v) console.log(`     [${x.rule}] ${x.message}`); }
    } catch (e) { bad++; console.log(`FAIL ${collection}/${slug}: ${(e as Error).message.split("\n")[0]}`); }
  }
  const n = texts[collection]!.length;
  if (n > 1) {
    const threshold = (SIMILARITY_THRESHOLD as Record<string, number>)[collection] ?? 0.7;
    const sim = similarityReport(texts[collection]!, threshold);
    for (const p of sim.failing) { bad++; console.log(`FAIL ${collection}: ${p.a} ~ ${p.b} are near-duplicates (Jaccard ${p.score.toFixed(2)} > ${threshold})`); }
  }
  console.log(`ok   ${collection}: ${n} draft(s) checked`);
};

await run("products", "products", async (slug) => {
  const d = await loadProductDraft(slug);
  const v = [...(productSlugs.has(slug) ? [] : [{ rule: "slug", message: `${slug}: not a product slug in src/seed-data/products.json` }]), ...validateProduct(slug, { summary: d.summary, introCount: d.intro.length, blocks: d.coverageBlocks.length, covered: d.covered.length, notCovered: d.notCovered.length, discounts: d.discounts ? d.discounts.length : null, faqs: d.faqs.length, relatedProducts: d.relatedProducts }, productProse(d)), ...unknown("product", d.relatedProducts, productSlugs, slug)];
  return { v, text: productText(d) };
});
await run("pages", "pages", async (slug) => {
  const d = await loadPageDraft(slug);
  const v = [...(pagePaths.has(slug) ? [] : [{ rule: "slug", message: `${slug}: no page with this path in src/seed-data/pages.json (file name = path with "/" → "--", home = "home")` }]), ...validatePage(slug, { lede: d.lede, blocks: d.blocks.length }, pageProse(d))];
  return { v, text: pageText(d) };
});
await run("cities", "cities", async (slug) => {
  const d = await loadCityDraft(slug);
  const v = [...(citySlugs.has(slug) ? [] : [{ rule: "slug", message: `${slug}: not a city slug in src/seed-data/states.json` }]), ...validateCity(slug, { localHazards: d.localHazards, neighborhoods: d.neighborhoods }, cityProse(d), LOCAL_HAZARDS)];
  return { v, text: cityText(d) };
});
await run("glossary-terms", "glossary", async (slug) => {
  const d = await loadGlossaryDraft(slug);
  const v = [...(termSlugs.has(slug) ? [] : [{ rule: "slug", message: `${slug}: not a glossary slug in src/seed-data/glossary.json` }]), ...validateGlossary(glossaryToInput(slug, d)), ...unknown("glossary term", d.relatedTerms, termSlugs, slug), ...unknown("product", d.relatedProducts, productSlugs, slug)];
  return { v, text: glossaryText(d) };
});
await run("articles", "articles", async (slug) => {
  const d = await loadArticleDraft(slug);
  const v = [...(articleSlugs.has(slug) ? [] : [{ rule: "slug", message: `${slug}: not an article slug in src/seed-data/articles.json` }]), ...validateArticle(articleToInput(slug, d)), ...unknown("product", d.relatedProducts, productSlugs, slug), ...unknown("article", d.relatedArticles, articleSlugs, slug), ...unknown("glossary term", d.relatedTerms, termSlugs, slug), ...unknown("state", d.relatedStates ?? [], stateSlugs, slug)];
  return { v, text: articleText(d) };
});
console.log(bad ? `\ncontent:check failed (${bad} of ${total})` : `\ncontent:check passed (${total} drafts)`);
process.exit(bad ? 1 : 0);
