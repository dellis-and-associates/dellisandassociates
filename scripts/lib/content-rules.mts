/**
 * Pre-write validation for generated content (page-generation Phase 3,
 * "Factual restraint"). Pure: takes plain strings and slug lists, returns a
 * list of violations. Unit-tested in tests/unit/content-rules.test.ts.
 *
 * Numbers policy: a dollar figure or percentage is allowed only (a) inside a
 * `{{TODO:…}}` token, (b) in a sentence that cites a source URL, or (c) in a
 * paragraph explicitly framed as hypothetical ("Suppose…", "for example…").
 * Everything else is treated as an invented figure and refused.
 */
import { BANNED_PHRASES_DEFAULT } from "../../src/globals/ComplianceSettings.ts";
import { TODO_TOKEN } from "../../src/fields/index.ts";

export type Violation = { rule: string; message: string };

export const EXTRA_BANNED_PHRASES = ["guaranteed", "cheapest", "lowest rate", "save up to", "% off"];
/** Legitimate product and policy terms that happen to contain a banned word; stripped before the banned-phrase scan. */
export const BANNED_PHRASE_ALLOWLIST = [
  "guaranteed issue",
  "guaranteed insurability",
  "guaranteed cost",
  "guaranteed renewable",
  "guaranteed replacement cost",
  "guaranteed death benefit",
  "guaranteed minimum",
  "guaranteed interest",
  "guaranteed cash value",
  "guaranteed universal life",
];
export const COMPETITORS = ["State Farm", "GEICO", "Progressive", "Allstate", "USAA", "Liberty Mutual", "Farmers", "Nationwide", "Travelers"];
export const AGENCY_SUPERLATIVES = ["best", "#1", "number one", "leading", "top-rated", "top rated", "premier"];
export const STATES = ["arizona", "nevada", "utah", "idaho"];

export const WORD_RANGE = { "glossary-terms": [150, 300], articles: [900, 1800] } as const;
export const LINK_RULES = {
  "glossary-terms": { totalMin: 3, totalMax: 5, productsMin: 1, termsMin: 2, termsMax: 4 },
  articles: { productsMin: 2, articlesMin: 3, termsMin: 2 },
} as const;

const STOP_WORDS = new Set(["a", "an", "the", "of", "and", "or", "to", "in", "for", "vs", "on", "at", "by", "with"]);
const HYPOTHETICAL = /\b(suppose|imagine|hypothetical(?:ly)?|for example|for instance|let'?s say|say you|say a|say the|say your)\b/i;
const URL = /https?:\/\/[^\s)]+/i;
const MONEY_OR_PERCENT = /\$\s?\d[\d,]*(?:\.\d+)?|\d[\d,]*(?:\.\d+)?\s?(?:%|percent\b)/i;
const STATISTIC = /\b(on average|the average|averages?\s+\$|studies (?:show|found|suggest)|research shows|percent of|survey(?:s)? (?:found|show)|most (?:people|drivers|homeowners|policies) (?:pay|have))\b/i;
const STATUTE = /\b(state law|statute|required by law|legally required|minimum (?:limits?|coverage|liability|amounts?)|must carry|the law requires|state requires|requires (?:drivers|every driver|owners)|filing deadline|days to (?:file|report)|state minimum)\b/i;
const DIGITS = /\d/;
const TODO_ANY = /\{\{TODO:[^}]*\}\}/g;
const ACRONYM = /^[A-Z][A-Z0-9-]{1,5}$/;

export const countWords = (text: string): number => (text.trim() ? text.trim().split(/\s+/).length : 0);

export const splitSentences = (text: string): string[] =>
  text
    .replace(TODO_ANY, (m) => m.replace(/\./g, "\u0001")) // dots inside tokens are not sentence ends
    .split(/(?<=[.!?])\s+(?=[A-Z"'(“])/)
    .map((s) => s.replace(/\u0001/g, ".").trim())
    .filter(Boolean);

export const termWords = (slug: string): string[] => slug.split("-").filter((w) => w && !STOP_WORDS.has(w));

/** True when `sentence` contains any of the term's own (non-stop) words, allowing common inflections. */
export const usesOwnWords = (sentence: string, slug: string): string[] =>
  termWords(slug).filter((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:s|es|d|ed|ing)?\\b`, "i").test(sentence));

const stripTodos = (t: string) => t.replace(TODO_ANY, " ");
const stripAllowlisted = (t: string) => BANNED_PHRASE_ALLOWLIST.reduce((s, p) => s.replace(new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), " "), t);

/** Checks that apply to any block of prose: paragraphs, headings, excerpts, definitions. */
export function checkProse(text: string, where: string): Violation[] {
  const v: Violation[] = [];
  const plain = stripTodos(text);
  const scan = stripAllowlisted(plain).toLowerCase();
  for (const phrase of [...BANNED_PHRASES_DEFAULT, ...EXTRA_BANNED_PHRASES]) {
    const p = phrase.toLowerCase();
    const re = /^[a-z]/.test(p) && /[a-z]$/.test(p) ? new RegExp(`\\b${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i") : null;
    if (re ? re.test(scan) : scan.includes(p)) v.push({ rule: "banned-phrase", message: `${where}: contains "${phrase}"` });
  }
  for (const c of COMPETITORS) if (new RegExp(`\\b${c}\\b`, "i").test(plain)) v.push({ rule: "competitor", message: `${where}: names a competitor ("${c}")` });
  for (const m of text.matchAll(/\{\{TODO[^}]*\}\}|\{\{[^}]*TODO[^}]*\}\}/g)) {
    if (!TODO_TOKEN.test(m[0])) v.push({ rule: "todo-format", message: `${where}: malformed token ${m[0]}` });
    const key = m[0].slice(7, -2);
    if (key.startsWith("statute.")) {
      const [, state, ...rest] = key.split(".");
      if (!state || !STATES.includes(state) || rest.length === 0) v.push({ rule: "todo-format", message: `${where}: statute token must be {{TODO:statute.<state>.<topic>}} (got ${m[0]})` });
    }
  }
  const hypothetical = HYPOTHETICAL.test(plain);
  for (const s of splitSentences(text)) {
    const sourced = URL.test(s);
    const bare = stripTodos(s);
    if (!sourced && !hypothetical && MONEY_OR_PERCENT.test(bare)) v.push({ rule: "figure", message: `${where}: dollar figure or percentage outside a TODO token, a sourced sentence or a hypothetical: "${s.slice(0, 80)}"` });
    if (!sourced && STATISTIC.test(bare)) v.push({ rule: "statistic", message: `${where}: statistic-like claim without a source: "${s.slice(0, 80)}"` });
    if (!sourced && STATUTE.test(bare) && DIGITS.test(bare) && !TODO_TOKEN.test(s)) v.push({ rule: "statute", message: `${where}: statutory figure must be a {{TODO:statute.<state>.<topic>}} token or cite a DOI/NAIC URL: "${s.slice(0, 80)}"` });
    if (/\b(we|our|us|agency|desert peak)\b/i.test(bare)) {
      for (const sup of AGENCY_SUPERLATIVES) {
        const re = /^[a-z]/.test(sup) ? new RegExp(`\\b${sup}\\b`, "i") : null;
        if (re ? re.test(bare) : bare.includes(sup)) v.push({ rule: "superlative", message: `${where}: superlative about the agency ("${sup}"): "${s.slice(0, 80)}"` });
      }
    }
  }
  return v;
}

/** Sentence case: after the first word, no run of capitalized ordinary words. Acronyms and a single proper noun are fine. */
export function checkHeading(heading: string, where: string): Violation[] {
  const words = heading.trim().split(/\s+/);
  if (words.length < 2) return [];
  const rest = words.slice(1).filter((w) => !ACRONYM.test(w));
  const capped = rest.filter((w) => /^[A-Z][a-z]/.test(w));
  const long = rest.filter((w) => w.replace(/[^a-z]/gi, "").length >= 4);
  if (capped.length >= 2 && capped.length / Math.max(long.length, 1) > 0.5) return [{ rule: "heading-case", message: `${where}: heading is not sentence case: "${heading}"` }];
  return [];
}

export type GlossaryInput = { slug: string; term: string; definition: string; inPractice: string; example: string; relatedTerms: string[]; relatedProducts: string[] };

export function validateGlossary(g: GlossaryInput): Violation[] {
  const v: Violation[] = [];
  const words = countWords(g.definition) + countWords(g.inPractice) + countWords(g.example);
  const [min, max] = WORD_RANGE["glossary-terms"];
  if (words < min || words > max) v.push({ rule: "words", message: `${g.slug}: ${words} words; expected ${min}–${max} across definition, inPractice and example` });
  const first = splitSentences(g.definition)[0] ?? "";
  const own = usesOwnWords(first, g.slug);
  if (own.length) v.push({ rule: "self-definition", message: `${g.slug}: first sentence of the definition uses the term's own words (${own.join(", ")})` });
  if (!g.example.trim() || !HYPOTHETICAL.test(g.example)) v.push({ rule: "example", message: `${g.slug}: example must be framed as hypothetical ("Suppose…", "for example…")` });
  const r = LINK_RULES["glossary-terms"];
  const total = g.relatedTerms.length + g.relatedProducts.length;
  if (total < r.totalMin || total > r.totalMax) v.push({ rule: "links", message: `${g.slug}: ${total} related links; expected ${r.totalMin}–${r.totalMax}` });
  if (g.relatedProducts.length < r.productsMin) v.push({ rule: "links", message: `${g.slug}: links to no product` });
  if (g.relatedTerms.length < r.termsMin || g.relatedTerms.length > r.termsMax) v.push({ rule: "links", message: `${g.slug}: ${g.relatedTerms.length} related terms; expected ${r.termsMin}–${r.termsMax}` });
  if (g.relatedTerms.includes(g.slug)) v.push({ rule: "links", message: `${g.slug}: relates to itself` });
  if (new Set([...g.relatedTerms, ...g.relatedProducts]).size !== total) v.push({ rule: "links", message: `${g.slug}: duplicate related links` });
  for (const [name, t] of [["definition", g.definition], ["inPractice", g.inPractice], ["example", g.example], ["term", g.term]] as const) v.push(...checkProse(t, `${g.slug}.${name}`));
  return v;
}

export type ArticleInput = {
  slug: string;
  title: string;
  excerpt: string;
  /** Headings in document order. */
  headings: string[];
  /** Every prose block of the body (paragraphs and bullets), in document order. */
  paragraphs: string[];
  relatedProducts: string[];
  relatedArticles: string[];
  relatedTerms: string[];
};

export function validateArticle(a: ArticleInput): Violation[] {
  const v: Violation[] = [];
  const words = a.headings.reduce((n, h) => n + countWords(h), 0) + a.paragraphs.reduce((n, p) => n + countWords(p), 0);
  const [min, max] = WORD_RANGE.articles;
  if (words < min || words > max) v.push({ rule: "words", message: `${a.slug}: ${words} words in the body; expected ${min}–${max}` });
  if (!a.title.trim()) v.push({ rule: "title", message: `${a.slug}: title is empty` });
  if (a.excerpt.length > 300) v.push({ rule: "excerpt", message: `${a.slug}: excerpt is ${a.excerpt.length} characters; max 300` });
  const r = LINK_RULES.articles;
  if (a.relatedProducts.length < r.productsMin) v.push({ rule: "links", message: `${a.slug}: ${a.relatedProducts.length} related products; expected ≥ ${r.productsMin}` });
  if (a.relatedArticles.length < r.articlesMin) v.push({ rule: "links", message: `${a.slug}: ${a.relatedArticles.length} related articles; expected ≥ ${r.articlesMin}` });
  if (a.relatedTerms.length < r.termsMin) v.push({ rule: "links", message: `${a.slug}: ${a.relatedTerms.length} related terms; expected ≥ ${r.termsMin}` });
  if (a.relatedArticles.includes(a.slug)) v.push({ rule: "links", message: `${a.slug}: relates to itself` });
  for (const list of [a.relatedProducts, a.relatedArticles, a.relatedTerms]) if (new Set(list).size !== list.length) v.push({ rule: "links", message: `${a.slug}: duplicate related links` });
  v.push(...checkProse(a.title, `${a.slug}.title`), ...checkProse(a.excerpt, `${a.slug}.excerpt`));
  a.headings.forEach((h, i) => v.push(...checkHeading(h, `${a.slug}.heading[${i}]`), ...checkProse(h, `${a.slug}.heading[${i}]`)));
  a.paragraphs.forEach((p, i) => v.push(...checkProse(p, `${a.slug}.body[${i}]`)));
  return v;
}
