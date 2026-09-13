/**
 * Every authored draft in scripts/lib/drafts passes the content rules, links
 * only to slugs that exist in src/seed-data, and the corpus has no near-duplicate
 * pair. The same checks the generator runs, without a database.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { validateArticle, validateGlossary } from "../../scripts/lib/content-rules.mts";
import { articleText, articleToInput, glossaryText, glossaryToInput, loadArticleDraft, loadGlossaryDraft } from "../../scripts/lib/drafts/index.mts";
import { SIMILARITY_THRESHOLD, similarityReport } from "../../scripts/lib/similarity.mts";
import { countWords } from "../../src/lib/text.ts";
import { articleToFields, glossaryToFields } from "../../scripts/lib/drafts/index.mts";

const root = process.cwd();
const json = <T,>(rel: string): T => JSON.parse(readFileSync(join(root, rel), "utf8")) as T;
const slugsOf = (rel: string) => new Set(json<{ slug: string }[]>(rel).map((x) => x.slug));
const products = slugsOf("src/seed-data/products.json");
const articles = slugsOf("src/seed-data/articles.json");
const terms = slugsOf("src/seed-data/glossary.json");
const states = slugsOf("src/seed-data/states.json");
const files = (dir: string) => readdirSync(join(root, "scripts/lib/drafts", dir)).filter((f) => f.endsWith(".ts")).map((f) => f.slice(0, -3)).sort();

describe("authored glossary drafts", () => {
  const slugs = files("glossary");
  it("exist", () => expect(slugs.length).toBeGreaterThan(0));
  it.each(slugs)("%s passes the content rules and links to seed slugs", async (slug) => {
    expect(terms.has(slug), `${slug} is not a glossary slug in the seed data`).toBe(true);
    const d = await loadGlossaryDraft(slug);
    expect(validateGlossary(glossaryToInput(slug, d))).toEqual([]);
    for (const t of d.relatedTerms) expect(terms.has(t), `related term ${t}`).toBe(true);
    for (const p of d.relatedProducts) expect(products.has(p), `related product ${p}`).toBe(true);
    const f = glossaryToFields(d);
    const n = countWords(f.definition) + countWords(f.inPractice) + countWords(f.example);
    expect(n).toBeGreaterThanOrEqual(150);
    expect(n).toBeLessThanOrEqual(300);
  });
  it("has no near-duplicate pair across the corpus", async () => {
    const docs = await Promise.all(slugs.map(async (slug) => ({ slug, text: glossaryText(await loadGlossaryDraft(slug)) })));
    const r = similarityReport(docs, SIMILARITY_THRESHOLD["glossary-terms"]);
    expect(r.failing).toEqual([]);
  });
});

describe("authored article drafts", () => {
  const slugs = files("articles");
  it("exist", () => expect(slugs.length).toBeGreaterThan(0));
  it.each(slugs)("%s passes the content rules and links to seed slugs", async (slug) => {
    expect(articles.has(slug), `${slug} is not an article slug in the seed data`).toBe(true);
    const d = await loadArticleDraft(slug);
    expect(validateArticle(articleToInput(slug, d))).toEqual([]);
    for (const p of d.relatedProducts) expect(products.has(p), `related product ${p}`).toBe(true);
    for (const a of d.relatedArticles) expect(articles.has(a), `related article ${a}`).toBe(true);
    for (const t of d.relatedTerms) expect(terms.has(t), `related term ${t}`).toBe(true);
    for (const s of d.relatedStates ?? []) expect(states.has(s), `related state ${s}`).toBe(true);
    const n = countWords(articleToFields(d).body);
    expect(n).toBeGreaterThanOrEqual(900);
    expect(n).toBeLessThanOrEqual(1800);
  });
  it("has no near-duplicate pair across the corpus", async () => {
    const docs = await Promise.all(slugs.map(async (slug) => ({ slug, text: articleText(await loadArticleDraft(slug)) })));
    expect(similarityReport(docs, SIMILARITY_THRESHOLD.articles).failing).toEqual([]);
  });
});
