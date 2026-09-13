/** Shared with the client component (src/lib/quote.ts imports server-only modules). */
export const STEPS = [
  { n: 1, slug: "coverage", label: "What to compare" },
  { n: 2, slug: "about-you", label: "About you" },
  { n: 3, slug: "details", label: "Details" },
  { n: 4, slug: "summary", label: "Check and send" },
] as const;
