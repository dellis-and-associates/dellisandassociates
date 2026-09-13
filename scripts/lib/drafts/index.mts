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
import type { ArticleDraft, GlossaryDraft } from "./types.mts";

export type DraftCollection = "glossary-terms" | "articles";
const DIR: Record<DraftCollection, string> = { "glossary-terms": "glossary", articles: "articles" };

const fileFor = (collection: DraftCollection, slug: string): URL => new URL(`./${DIR[collection]}/${slug}.ts`, import.meta.url);

export const hasDraft = (collection: DraftCollection, slug: string): boolean =>
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && existsSync(fileURLToPath(fileFor(collection, slug)));

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
