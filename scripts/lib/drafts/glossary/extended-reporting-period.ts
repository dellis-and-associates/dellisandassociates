import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Extended reporting period",
  definition: [
    "The window after a claims-made policy expires during which the insured may still notify the carrier of new claims arising from acts committed while the policy was in force.",
  ],
  inPractice: [
    "There are usually two. A basic one, often a few months, is automatic and free when the carrier cancels or declines to renew. An optional supplemental one, bought for a premium, runs for a set span of years or indefinitely, and is what the market calls tail coverage. It is triggered only by claims first made after expiration; it does not cover acts after the policy ended, nor does it restore limits spent during the final policy year. The election deadline is short and strict, and missing it forfeits the option. Firms in transition, retiring professionals and sellers of a business are the usual buyers.",
  ],
  example: [
    "Suppose a consultant's errors and omissions policy is not renewed and the automatic window is sixty days. In week three a client sends a demand letter about a report delivered last year. The consultant reports it inside the window and the expired policy responds. Suppose the letter had arrived in month four with no supplemental option purchased; there would be no coverage. Hypothetical.",
  ],
  relatedTerms: ["tail-coverage", "claims-made-policy", "prior-acts-coverage"],
  relatedProducts: ["professional-liability-eo-insurance", "cyber-liability-insurance"],
};
