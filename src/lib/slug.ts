/**
 * The one slug normalizer (page-generation Phase 0.A defects 1 and 4).
 * Lowercase ASCII, hyphen-separated, no leading/trailing/double hyphens.
 * Every punctuation mark is a separator, following the package's own slugs:
 * apostrophes (Coeur d'Alene → coeur-d-alene; Workers' Compensation →
 * workers-compensation), ampersands (Boat & Watercraft → boat-watercraft),
 * parentheses and periods (St. George → st-george; Business Owners Policy
 * (BOP) → business-owners-policy-bop). Diacritics are stripped. A repeated
 * trailing token run is collapsed (the doubled-BOP defect).
 */
export function slugify(input: string): string {
  const s = input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
  return collapseRepeatedTail(s);
}

/** "a-b-a-b" → "a-b"; "x-y-y" → "x-y". Only whole hyphen-delimited token runs. */
export function collapseRepeatedTail(slug: string): string {
  const tokens = slug.split("-").filter(Boolean);
  for (let len = Math.floor(tokens.length / 2); len >= 1; len--) {
    const tail = tokens.slice(-len).join("-");
    const before = tokens.slice(-2 * len, -len).join("-");
    if (tail === before) return collapseRepeatedTail(tokens.slice(0, -len).join("-"));
  }
  return tokens.join("-");
}

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isNormalizedSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug) && collapseRepeatedTail(slug) === slug;
}
