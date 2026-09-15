import { describe, expect, it } from "vitest";
import { checkHeading, checkProse, splitSentences, usesOwnWords, validateArticle, validateGlossary, type ArticleInput, type GlossaryInput } from "../../scripts/lib/content-rules.mts";

const rules = (v: { rule: string }[]) => v.map((x) => x.rule);
const words = (n: number, w = "word") => Array.from({ length: n }, () => w).join(" ") + ".";

const glossary = (over: Partial<GlossaryInput> = {}): GlossaryInput => ({
  slug: "deductible",
  term: "Deductible",
  definition: "The amount you pay out of your own pocket on a covered claim before the insurer pays the rest. " + words(50, "plain"),
  inPractice: words(70, "practice"),
  example: "Suppose a hail storm causes $6,000 of covered damage and the policy carries a $1,000 deductible. The insurer pays $5,000. " + words(40, "example"),
  relatedTerms: ["premium", "claim"],
  relatedProducts: ["auto-insurance"],
  ...over,
});

const article = (over: Partial<ArticleInput> = {}): ArticleInput => ({
  slug: "how-to-choose-the-right-deductible",
  title: "How to choose the right deductible",
  excerpt: "A short excerpt.",
  headings: ["What a deductible does", "How to pick a number you can live with"],
  paragraphs: Array.from({ length: 10 }, (_, i) => words(100, `p${i}`)),
  relatedProducts: ["auto-insurance", "home-insurance"],
  relatedArticles: ["a", "b", "c"],
  relatedTerms: ["deductible", "premium"],
  ...over,
});

describe("splitSentences", () => {
  it("splits on terminal punctuation and keeps TODO tokens whole", () => {
    expect(splitSentences("First one. Second {{TODO:statute.arizona.minimums}} here. Third?")).toEqual(["First one.", "Second {{TODO:statute.arizona.minimums}} here.", "Third?"]);
  });
});

describe("self-definition", () => {
  it("finds the term's own words, with inflections, ignoring stop words", () => {
    expect(usesOwnWords("A deductible is the deductible.", "deductible")).toEqual(["deductible"]);
    expect(usesOwnWords("The part of a policy that pays others' costs.", "liability-coverage")).toEqual([]);
    expect(usesOwnWords("Coverage that pays claims.", "liability-coverage")).toEqual(["coverage"]);
    expect(usesOwnWords("The declarations are on the first sheet.", "declarations-page")).toEqual(["declarations"]);
    expect(usesOwnWords("A form of proof of insurance.", "proof-of-insurance")).toEqual(["proof", "insurance"]);
  });
  it("fails a glossary term whose first sentence uses itself, but only the first sentence", () => {
    expect(rules(validateGlossary(glossary({ definition: "A deductible is what you pay first. " + words(50) })))).toContain("self-definition");
    expect(rules(validateGlossary(glossary({ definition: "The amount you pay first. A deductible is per claim. " + words(50) })))).not.toContain("self-definition");
  });
});

describe("word ranges and links", () => {
  it("accepts a well-formed glossary term", () => {
    expect(validateGlossary(glossary())).toEqual([]);
  });
  it("refuses glossary terms outside 150–300 words", () => {
    expect(rules(validateGlossary(glossary({ inPractice: words(10) })))).toContain("words");
    expect(rules(validateGlossary(glossary({ inPractice: words(250) })))).toContain("words");
  });
  it("requires 3–5 glossary links, ≥ 1 product, 2–4 terms, no self or duplicate link", () => {
    expect(rules(validateGlossary(glossary({ relatedTerms: ["premium"], relatedProducts: ["auto-insurance"] })))).toContain("links");
    expect(rules(validateGlossary(glossary({ relatedTerms: ["a", "b", "c", "d"], relatedProducts: ["x", "y"] })))).toContain("links");
    expect(rules(validateGlossary(glossary({ relatedTerms: ["a", "b", "c"], relatedProducts: [] })))).toContain("links");
    expect(rules(validateGlossary(glossary({ relatedTerms: ["deductible", "premium"] })))).toContain("links");
    expect(rules(validateGlossary(glossary({ relatedTerms: ["premium", "premium"] })))).toContain("links");
  });
  it("requires a hypothetical framing in the example", () => {
    expect(rules(validateGlossary(glossary({ example: words(60) })))).toContain("example");
  });
  it("accepts a well-formed article and enforces 900–1,800 words, ≥ 2 products, ≥ 3 articles, ≥ 2 terms", () => {
    expect(validateArticle(article())).toEqual([]);
    expect(rules(validateArticle(article({ paragraphs: [words(500)] })))).toContain("words");
    expect(rules(validateArticle(article({ paragraphs: [words(1900)] })))).toContain("words");
    expect(rules(validateArticle(article({ relatedProducts: ["auto-insurance"] })))).toContain("links");
    expect(rules(validateArticle(article({ relatedArticles: ["a", "b"] })))).toContain("links");
    expect(rules(validateArticle(article({ relatedTerms: ["deductible"] })))).toContain("links");
    expect(rules(validateArticle(article({ excerpt: "x".repeat(301) })))).toContain("excerpt");
  });
});

describe("factual restraint", () => {
  it("flags the compliance banned phrases and the extra ones, case-insensitively", () => {
    for (const p of ["Guaranteed lowest rate", "the CHEAPEST option", "we'll save you money", "guaranteed approval", "the lowest rate in town", "save up to a lot", "20% off"]) {
      expect(rules(checkProse(p, "t")), p).toContain("banned-phrase");
    }
  });
  it("allows legitimate policy terms that contain 'guaranteed'", () => {
    expect(rules(checkProse("A guaranteed issue policy asks no health questions.", "t"))).not.toContain("banned-phrase");
    expect(rules(checkProse("A guaranteed cost policy has a fixed premium; the guaranteed insurability rider adds coverage later.", "t"))).not.toContain("banned-phrase");
  });
  it("flags competitors by name, and not ordinary words", () => {
    expect(rules(checkProse("Unlike Progressive, we do not.", "t"))).toContain("competitor");
    expect(rules(checkProse("Farmers in Idaho need crop coverage.", "t"))).toContain("competitor");
    expect(rules(checkProse("Travel insurance covers trips.", "t"))).not.toContain("competitor");
    // Case-sensitive since 2026-09-15: the brands are capitalised; "progressive lenses" and "a nationwide network" are ordinary words.
    expect(rules(checkProse("A progressive increase in limits.", "t"))).not.toContain("competitor");
    expect(rules(checkProse("Plans with a nationwide network of dentists.", "t"))).not.toContain("competitor");
    expect(rules(checkProse("Compare it with a quote from Nationwide.", "t"))).toContain("competitor");
  });
  it("refuses dollar figures and percentages that are not TODO, sourced or hypothetical", () => {
    expect(rules(checkProse("The average premium is $1,400 a year.", "t"))).toEqual(expect.arrayContaining(["figure", "statistic"]));
    expect(rules(checkProse("Rates rose 12% last year.", "t"))).toContain("figure");
    expect(rules(checkProse("Rates rose 12 percent last year.", "t"))).toContain("figure");
    expect(rules(checkProse("The minimum is {{TODO:statute.arizona.auto-liability-minimums}} per person.", "t"))).toEqual([]);
    expect(rules(checkProse("The state lists $25,000 per person (https://difi.az.gov/).", "t"))).toEqual([]);
    expect(rules(checkProse("Suppose the deductible is $1,000 and the covered loss is $6,000. The insurer pays $5,000.", "t"))).toEqual([]);
    expect(rules(checkProse("For example, a 20% coinsurance share of a $100 bill is $20.", "t"))).toEqual([]);
  });
  it("refuses statistic-like claims without a source", () => {
    expect(rules(checkProse("Studies show most drivers overpay.", "t"))).toContain("statistic");
    expect(rules(checkProse("On average, claims close in weeks.", "t"))).toContain("statistic");
    expect(rules(checkProse("On average, claims close in weeks (https://content.naic.org/).", "t"))).toEqual([]);
  });
  it("requires statutory figures to be TODO tokens or sourced", () => {
    expect(rules(checkProse("Arizona requires drivers to carry 25/50/15 minimum limits.", "t"))).toContain("statute");
    expect(rules(checkProse("Arizona requires drivers to carry {{TODO:statute.arizona.auto-liability-minimums}}.", "t"))).toEqual([]);
    expect(rules(checkProse("The state minimum is 25/50/15 per https://difi.az.gov/.", "t"))).toEqual([]);
    expect(rules(checkProse("State law requires liability coverage on every registered vehicle.", "t"))).toEqual([]); // no figure: a plain statement
  });
  it("checks TODO token format, and the statute.<state>.<topic> shape", () => {
    expect(rules(checkProse("See {{TODO statute}}.", "t"))).toContain("todo-format");
    expect(rules(checkProse("See {{TODO:statute.texas.minimums}}.", "t"))).toContain("todo-format");
    expect(rules(checkProse("See {{TODO:statute.arizona}}.", "t"))).toContain("todo-format");
    expect(rules(checkProse("See {{TODO:statute.utah.sr22-duration}}.", "t"))).toEqual([]);
  });
  it("refuses superlatives about the agency, not about anything else", () => {
    expect(rules(checkProse("We are the leading agency in Utah.", "t"))).toContain("superlative");
    expect(rules(checkProse("Our team is #1.", "t"))).toContain("superlative");
    expect(rules(checkProse("Desert Peak is the best choice.", "t"))).toContain("superlative");
    expect(rules(checkProse("The best time to review a policy is before renewal.", "t"))).toEqual([]);
  });
});

describe("headings", () => {
  it("accepts sentence case, proper nouns and acronyms; refuses title case", () => {
    expect(checkHeading("What the deductible does to a claim", "h")).toEqual([]);
    expect(checkHeading("What Arizona requires", "h")).toEqual([]);
    expect(checkHeading("How an SR-22 filing works in Nevada", "h")).toEqual([]);
    expect(checkHeading("Minimum Auto Insurance Requirements in Arizona", "h")).toHaveLength(1);
    expect(checkHeading("How To Choose The Right Deductible", "h")).toHaveLength(1);
  });
});
