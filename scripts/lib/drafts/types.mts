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
