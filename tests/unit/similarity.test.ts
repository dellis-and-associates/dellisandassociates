import { describe, expect, it } from "vitest";
import { jaccard, shingles, similarityReport, tokenize } from "../../scripts/lib/similarity.mts";

describe("shingles", () => {
  it("tokenizes case-insensitively, drops punctuation and TODO tokens", () => {
    expect(tokenize("A Deductible, per claim! {{TODO:x.y}} done.")).toEqual(["a", "deductible", "per", "claim", "done"]);
  });
  it("builds 5-word shingles", () => {
    const s = shingles("one two three four five six", 5);
    expect([...s]).toEqual(["one two three four five", "two three four five six"]);
    expect([...shingles("too short", 5)]).toEqual(["too short"]);
    expect(shingles("", 5).size).toBe(0);
  });
});

describe("jaccard", () => {
  it("is 1 for identical sets, 0 for disjoint, and symmetric", () => {
    const a = shingles("the quick brown fox jumps over the lazy dog");
    const b = shingles("the quick brown fox jumps over the lazy dog");
    const c = shingles("insurance pays the covered loss less the deductible");
    expect(jaccard(a, b)).toBe(1);
    expect(jaccard(a, c)).toBe(0);
    expect(jaccard(a, c)).toBe(jaccard(c, a));
    expect(jaccard(new Set(), new Set())).toBe(0);
  });
});

describe("similarityReport", () => {
  const base = "Suppose a hail storm causes covered damage to the roof and the policy carries a deductible; the insurer pays the rest of the covered amount after the deductible is subtracted from the loss.";
  it("fails a batch with a pair above the threshold and lists the most similar pairs first", () => {
    const docs = [
      { slug: "a", text: base },
      { slug: "b", text: base.replace("hail storm", "wind storm") },
      { slug: "c", text: "The price you pay to keep a policy in force, billed monthly or yearly, set by the insurer from the risk it takes on." },
    ];
    const r = similarityReport(docs, 0.7);
    expect(r.failing.map((p) => [p.a, p.b])).toEqual([["a", "b"]]);
    expect(r.pairs[0]).toMatchObject({ a: "a", b: "b" });
    expect(r.pairs[0]!.score).toBeGreaterThan(0.7);
    expect(r.pairs).toHaveLength(3);
  });
  it("passes distinct documents and caps the report at 20 pairs", () => {
    const docs = Array.from({ length: 8 }, (_, i) => ({ slug: `d${i}`, text: `document number ${i} talks only about topic ${i} and item ${i} plus thing ${i} again ${i}` }));
    const r = similarityReport(docs, 0.7);
    expect(r.failing).toEqual([]);
    expect(r.pairs).toHaveLength(20); // 28 pairs, top 20 reported
  });
});
