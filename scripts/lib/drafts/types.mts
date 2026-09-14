/**
 * The authored draft shapes. One file per slug under `glossary/` and
 * `articles/`, each exporting `draft`. Content is data committed to the repo:
 * there is no runtime model call anywhere in the pipeline.
 *
 * Every related-* array holds slugs from src/seed-data/*.json; the generator
 * resolves them to ids at write time and refuses to write if any is unknown.
 */
import type { InlineInput } from "../lexical.mts";

export type GlossaryDraft = {
  /** Display name; replaces the placeholder derived from the slug (e.g. "SR-22", not "Sr 22"). */
  term: string;
  /** Plain-language definition. The first sentence must not use the term's own words. */
  definition: string[];
  /** How it affects a policy in practice. */
  inPractice: string[];
  /** A short worked example with round, clearly hypothetical numbers. */
  example: string[];
  relatedTerms: string[];
  relatedProducts: string[];
};

export type ArticleSection = {
  /** Sentence case. An empty string means an intro block with no heading. */
  heading: string;
  paragraphs: InlineInput[];
  bullets?: InlineInput[];
};

export type ArticleDraft = {
  title: string;
  /** ≤ 300 characters (the collection's maxLength). */
  excerpt: string;
  sections: ArticleSection[];
  relatedProducts: string[];
  relatedArticles: string[];
  relatedTerms: string[];
  relatedStates?: string[];
};

// ── Products, pages, cities (fill-content.mts) ────────────────────────────

export type ProductDraft = {
  /** One paragraph, ≤ 300 characters, used on hubs and cards. Mechanism, not reassurance. */
  summary: string;
  /** 2–4 paragraphs: what the policy does, for whom, what decides the premium. */
  intro: InlineInput[];
  /** 3–6 blocks, one per coverage part, each 1–3 paragraphs. Headings in sentence case. */
  coverageBlocks: { heading: string; paragraphs: InlineInput[] }[];
  /** 4–8 short items each. Specific things, not categories. */
  covered: string[];
  notCovered: string[];
  /** 3–6 discounts carriers commonly offer. Omit for Medicare and annuities (plans-enrollment-faq lines). */
  discounts?: { name: string; description: string }[];
  /** 4–6 questions people actually ask, each answered in 1–3 paragraphs. */
  faqs: { question: string; answer: InlineInput[] }[];
  /** 2–5 product slugs from src/seed-data/products.json. */
  relatedProducts: string[];
  seo?: { title?: string; description?: string };
};

export type PageBlockDraft =
  | { type: "richText"; sections: ArticleSection[] }
  | { type: "faq"; heading?: string; items: { question: string; answer: InlineInput[] }[] }
  | { type: "cta"; heading: string; body?: string; label: string; href: string }
  | { type: "disclosure"; key: "independentAgency" | "medicareTpmo" | "stateLicensing" };

export type PageDraft = {
  /** Replaces the seeded placeholder title when set. */
  title?: string;
  /** ≤ 300 characters. */
  lede: string;
  blocks: PageBlockDraft[];
  seo?: { title?: string; description?: string };
};

export type CityDraft = {
  /** Values from LOCAL_HAZARDS in src/collections/Cities.ts. Real hazards for this city only. */
  localHazards: string[];
  /** 1–3 sentences on what people insure here: housing age, construction, HOA prevalence. */
  housingStock: string;
  /** 1–3 sentences on how people drive here: commutes, highways, seasonal traffic. */
  drivingContext: string;
  /** 3–5 real, named neighborhoods or districts. A fabricated one is worse than an empty list. */
  neighborhoods: string[];
  /** 1–3 sentences on local rules that touch insurance (HOA, floodplain designations, wildfire codes). */
  notableRegulatory: string;
  /** Optional 1–2 paragraph city intro shared by its product pages. */
  intro?: InlineInput[];
};
