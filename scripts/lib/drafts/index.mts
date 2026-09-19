/**
 * The Drafter: maps a slug to authored content and to the Lexical JSON the
 * collections store. Drafts are data files under ./glossary and ./articles
 * (one per slug, exporting `draft`); a slug with no file is simply "not yet
 * authored" and stays pending. Nothing here calls a model.
 */
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { ArticleInput, GlossaryInput } from "../content-rules.mts";
import { doc, heading, list, paragraph, type BlockNode, type InlineInput, type LexicalDoc } from "../lexical.mts";
import type { ArticleDraft, CityDraft, GlossaryDraft, PageDraft, ProductDraft } from "./types.mts";

export type DraftCollection = "glossary-terms" | "articles";
/** Collections filled by fill-content.mts (no generation status; fills empty fields only). */
export type FillCollection = "products" | "pages" | "cities";
const DIR: Record<DraftCollection | FillCollection, string> = { "glossary-terms": "glossary", articles: "articles", products: "products", pages: "pages", cities: "cities" };

const fileFor = (collection: DraftCollection | FillCollection, slug: string): URL => new URL(`./${DIR[collection]}/${slug}.ts`, import.meta.url);

/** Pages are keyed by path; the file name is the path with slashes turned into "--" (home is "home"). */
export const pageFileSlug = (path: string): string => (path === "/" ? "home" : path.replace(/^\/|\/$/g, "").replace(/\//g, "--"));

export const hasDraft = (collection: DraftCollection | FillCollection, slug: string): boolean =>
  /^[a-z0-9]+(?:-+[a-z0-9]+)*$/.test(slug) && existsSync(fileURLToPath(fileFor(collection, slug)));

export async function loadGlossaryDraft(slug: string): Promise<GlossaryDraft> {
  if (!hasDraft("glossary-terms", slug)) throw new Error(`no authored draft for glossary term "${slug}" (scripts/lib/drafts/glossary/${slug}.ts)`);
  const mod = (await import(fileFor("glossary-terms", slug).href)) as { draft?: GlossaryDraft };
  if (!mod.draft) throw new Error(`glossary draft "${slug}" does not export \`draft\``);
  return mod.draft;
}

export async function loadArticleDraft(slug: string): Promise<ArticleDraft> {
  if (!hasDraft("articles", slug)) throw new Error(`no authored draft for article "${slug}" (scripts/lib/drafts/articles/${slug}.ts)`);
  const mod = (await import(fileFor("articles", slug).href)) as { draft?: ArticleDraft };
  if (!mod.draft) throw new Error(`article draft "${slug}" does not export \`draft\``);
  return mod.draft;
}

async function loadDraft<T>(collection: FillCollection, slug: string): Promise<T> {
  if (!hasDraft(collection, slug)) throw new Error(`no authored draft for ${collection} "${slug}" (scripts/lib/drafts/${DIR[collection]}/${slug}.ts)`);
  const mod = (await import(fileFor(collection, slug).href)) as { draft?: T };
  if (!mod.draft) throw new Error(`${collection} draft "${slug}" does not export \`draft\``);
  return mod.draft;
}
export const loadProductDraft = (slug: string) => loadDraft<ProductDraft>("products", slug);
export const loadPageDraft = (fileSlug: string) => loadDraft<PageDraft>("pages", fileSlug);
export const loadCityDraft = (slug: string) => loadDraft<CityDraft>("cities", slug);

/** Plain text of an inline run (link labels included), for validation and similarity. */
export const inlineText = (input: InlineInput): string => {
  const items = Array.isArray(input) ? input : [input];
  return items
    .map((i) => (typeof i === "string" ? i : i.type === "text" ? i.text : i.children.map((c) => c.text).join("")))
    .join("")
    .replace(/\s+/g, " ")
    .trim();
};

// ── Glossary ──────────────────────────────────────────────────────────────

export const glossaryToFields = (d: GlossaryDraft): { term: string; definition: LexicalDoc; inPractice: LexicalDoc; example: LexicalDoc } => ({
  term: d.term,
  definition: doc(d.definition.map((p) => paragraph(p))),
  inPractice: doc(d.inPractice.map((p) => paragraph(p))),
  example: doc(d.example.map((p) => paragraph(p))),
});

export const glossaryToInput = (slug: string, d: GlossaryDraft): GlossaryInput => ({
  slug,
  term: d.term,
  definition: d.definition.join(" "),
  inPractice: d.inPractice.join(" "),
  example: d.example.join(" "),
  relatedTerms: d.relatedTerms,
  relatedProducts: d.relatedProducts,
});

export const glossaryText = (d: GlossaryDraft): string => [...d.definition, ...d.inPractice, ...d.example].join(" ");

// ── Articles ──────────────────────────────────────────────────────────────

export const articleToFields = (d: ArticleDraft): { title: string; excerpt: string; body: LexicalDoc } => {
  const nodes: BlockNode[] = [];
  for (const s of d.sections) {
    if (s.heading.trim()) nodes.push(heading("h2", s.heading));
    for (const p of s.paragraphs) nodes.push(paragraph(p));
    if (s.bullets?.length) nodes.push(list(s.bullets));
  }
  return { title: d.title, excerpt: d.excerpt, body: doc(nodes) };
};

export const articleToInput = (slug: string, d: ArticleDraft): ArticleInput => ({
  slug,
  title: d.title,
  excerpt: d.excerpt,
  headings: d.sections.map((s) => s.heading).filter((h) => h.trim()),
  paragraphs: d.sections.flatMap((s) => [...s.paragraphs.map(inlineText), ...(s.bullets ?? []).map(inlineText)]),
  relatedProducts: d.relatedProducts,
  relatedArticles: d.relatedArticles,
  relatedTerms: d.relatedTerms,
});

export const articleText = (d: ArticleDraft): string => d.sections.flatMap((s) => [s.heading, ...s.paragraphs.map(inlineText), ...(s.bullets ?? []).map(inlineText)]).join(" ");

// ── Products ──────────────────────────────────────────────────────────────

export const productToFields = (d: ProductDraft) => ({
  summary: d.summary,
  intro: doc(d.intro.map((p) => paragraph(p))),
  coverageBlocks: d.coverageBlocks.map((b) => ({ heading: b.heading, body: doc(b.paragraphs.map((p) => paragraph(p))) })),
  covered: d.covered.map((item) => ({ item })),
  notCovered: d.notCovered.map((item) => ({ item })),
  discounts: (d.discounts ?? []).map((x) => ({ name: x.name, description: x.description })),
  faqs: d.faqs.map((f) => ({ question: f.question, answer: doc(f.answer.map((p) => paragraph(p))) })),
  ...(d.seo ? { seo: d.seo } : {}),
});

export const productProse = (d: ProductDraft): { where: string; text: string }[] => [
  { where: "summary", text: d.summary },
  ...d.intro.map((p, i) => ({ where: `intro[${i}]`, text: inlineText(p) })),
  ...d.coverageBlocks.flatMap((b, i) => [{ where: `coverageBlocks[${i}].heading`, text: b.heading }, ...b.paragraphs.map((p, j) => ({ where: `coverageBlocks[${i}].body[${j}]`, text: inlineText(p) }))]),
  ...d.covered.map((t, i) => ({ where: `covered[${i}]`, text: t })),
  ...d.notCovered.map((t, i) => ({ where: `notCovered[${i}]`, text: t })),
  ...(d.discounts ?? []).flatMap((x, i) => [{ where: `discounts[${i}].name`, text: x.name }, { where: `discounts[${i}].description`, text: x.description }]),
  ...d.faqs.flatMap((f, i) => [{ where: `faqs[${i}].question`, text: f.question }, ...f.answer.map((p, j) => ({ where: `faqs[${i}].answer[${j}]`, text: inlineText(p) }))]),
];
export const productText = (d: ProductDraft): string => productProse(d).map((p) => p.text).join(" ");

// ── Pages ─────────────────────────────────────────────────────────────────

export const pageToFields = (d: PageDraft) => ({
  ...(d.title ? { title: d.title } : {}),
  lede: d.lede,
  layout: d.blocks.map((b) => {
    if (b.type === "richText") {
      const nodes: BlockNode[] = [];
      for (const s of b.sections) {
        if (s.heading.trim()) nodes.push(heading("h2", s.heading));
        for (const p of s.paragraphs) nodes.push(paragraph(p));
        if (s.bullets?.length) nodes.push(list(s.bullets));
      }
      return { blockType: "richText", body: doc(nodes) };
    }
    if (b.type === "faq") return { blockType: "faq", heading: b.heading ?? null, items: b.items.map((it) => ({ question: it.question, answer: doc(it.answer.map((p) => paragraph(p))) })) };
    if (b.type === "cta") return { blockType: "cta", heading: b.heading, body: b.body ?? null, label: b.label, href: b.href };
    if (b.type === "steps") return { blockType: "steps", eyebrow: b.eyebrow ?? null, heading: b.heading, intro: b.intro ?? null, items: b.items.map((it) => ({ title: it.title, body: it.body })) };
    return { blockType: "disclosure", key: b.key };
  }),
  ...(d.seo ? { seo: d.seo } : {}),
});

export const pageProse = (d: PageDraft): { where: string; text: string; heading?: boolean }[] => [
  ...(d.title ? [{ where: "title", text: d.title }] : []),
  { where: "lede", text: d.lede },
  ...d.blocks.flatMap((b, i) => {
    if (b.type === "richText") return b.sections.flatMap((s, j) => [...(s.heading ? [{ where: `blocks[${i}].sections[${j}].heading`, text: s.heading, heading: true }] : []), ...s.paragraphs.map((p, k) => ({ where: `blocks[${i}].sections[${j}].paragraphs[${k}]`, text: inlineText(p) })), ...(s.bullets ?? []).map((p, k) => ({ where: `blocks[${i}].sections[${j}].bullets[${k}]`, text: inlineText(p) }))]);
    if (b.type === "faq") return [...(b.heading ? [{ where: `blocks[${i}].heading`, text: b.heading, heading: true }] : []), ...b.items.flatMap((it, j) => [{ where: `blocks[${i}].items[${j}].question`, text: it.question }, ...it.answer.map((p, k) => ({ where: `blocks[${i}].items[${j}].answer[${k}]`, text: inlineText(p) }))])];
    if (b.type === "cta") return [{ where: `blocks[${i}].heading`, text: b.heading }, ...(b.body ? [{ where: `blocks[${i}].body`, text: b.body }] : []), { where: `blocks[${i}].label`, text: b.label }];
    if (b.type === "steps") return [...(b.eyebrow ? [{ where: `blocks[${i}].eyebrow`, text: b.eyebrow, heading: true }] : []), { where: `blocks[${i}].heading`, text: b.heading, heading: true }, ...(b.intro ? [{ where: `blocks[${i}].intro`, text: b.intro }] : []), ...b.items.flatMap((it, j) => [{ where: `blocks[${i}].items[${j}].title`, text: it.title, heading: true }, { where: `blocks[${i}].items[${j}].body`, text: it.body }])];
    return [];
  }),
];
export const pageText = (d: PageDraft): string => pageProse(d).map((p) => p.text).join(" ");

// ── Cities ────────────────────────────────────────────────────────────────

export const cityToFields = (d: CityDraft) => ({
  cityFacts: {
    localHazards: d.localHazards,
    housingStock: d.housingStock,
    drivingContext: d.drivingContext,
    neighborhoods: d.neighborhoods.map((name) => ({ name })),
    notableRegulatory: d.notableRegulatory,
  },
  ...(d.intro?.length ? { intro: doc(d.intro.map((p) => paragraph(p))) } : {}),
});

export const cityProse = (d: CityDraft): { where: string; text: string }[] => [
  { where: "housingStock", text: d.housingStock },
  { where: "drivingContext", text: d.drivingContext },
  { where: "notableRegulatory", text: d.notableRegulatory },
  ...d.neighborhoods.map((n, i) => ({ where: `neighborhoods[${i}]`, text: n })),
  ...(d.intro ?? []).map((p, i) => ({ where: `intro[${i}]`, text: inlineText(p) })),
];
export const cityText = (d: CityDraft): string => cityProse(d).map((p) => p.text).join(" ");
