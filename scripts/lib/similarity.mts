/**
 * Near-duplicate detection for the content pipeline and verify:uniqueness:
 * 5-word shingles, pairwise Jaccard, a report of the most similar pairs.
 */
export const SIMILARITY_THRESHOLD = { "glossary-terms": 0.7, articles: 0.7, "product-city": 0.7 } as const;
export type SimilarPair = { a: string; b: string; score: number };

export const tokenize = (text: string): string[] =>
  text
    .replace(/\{\{TODO:[^}]*\}\}/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

export function shingles(text: string, n = 5): Set<string> {
  const w = tokenize(text);
  const out = new Set<string>();
  if (w.length === 0) return out;
  if (w.length < n) { out.add(w.join(" ")); return out; }
  for (let i = 0; i + n <= w.length; i++) out.add(w.slice(i, i + n).join(" "));
  return out;
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

export function similarityReport(docs: { slug: string; text: string }[], threshold: number, top = 20): { pairs: SimilarPair[]; failing: SimilarPair[]; threshold: number } {
  const sets = docs.map((d) => ({ slug: d.slug, s: shingles(d.text) }));
  const pairs: SimilarPair[] = [];
  for (let i = 0; i < sets.length; i++) for (let k = i + 1; k < sets.length; k++) pairs.push({ a: sets[i]!.slug, b: sets[k]!.slug, score: jaccard(sets[i]!.s, sets[k]!.s) });
  pairs.sort((x, y) => y.score - x.score);
  return { pairs: pairs.slice(0, top), failing: pairs.filter((p) => p.score > threshold), threshold };
}
