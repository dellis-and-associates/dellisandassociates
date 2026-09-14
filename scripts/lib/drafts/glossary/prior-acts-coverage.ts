import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Prior acts coverage",
  definition: [
    "Protection under a new claims-made policy for work the insured performed before that policy began, achieved by setting the retroactive date back to the earlier one.",
  ],
  inPractice: [
    "It is the alternative to buying a tail from the outgoing carrier when switching. The new carrier agrees to honor the old date, usually on proof of continuous coverage and a signed statement that no claims or circumstances are known. Full prior acts means the original date; limited prior acts means a date somewhere in between. The premium reflects the years absorbed. If the insured knows of a potential claim and does not disclose it, the known-circumstances exclusion lets the carrier deny it later. A first-time buyer with no earlier policy simply has none to carry over.",
  ],
  example: [
    "Suppose a dental practice moves its malpractice policy to a new carrier after eight years. The new carrier offers full prior acts at $9,000 a year or a policy with a fresh date at $5,000. The owner takes the first. When a patient sues over a crown placed five years earlier, the new policy responds. Hypothetical figures.",
  ],
  relatedTerms: ["retroactive-date", "tail-coverage", "claims-made-policy"],
  relatedProducts: ["professional-liability-eo-insurance"],
};
