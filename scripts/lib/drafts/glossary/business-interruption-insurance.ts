import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Business interruption insurance",
  definition: [
    "Coverage on a commercial property policy that replaces the net income a company loses, and pays the expenses that continue, while it is shut down by physical damage the policy covers.",
  ],
  inPractice: [
    "It is triggered only by covered direct damage: a fire, a burst pipe, a storm. A power cut at the utility, a pandemic or a road closure is not a trigger unless a specific endorsement adds it. The period of restoration runs from the loss until the premises could reasonably be repaired, with an optional extended period to rebuild revenue afterward. A waiting period of a few days usually applies. The limit is set from a worksheet of projected income, and underinsurance is common because owners guess low. Extra expense coverage, which pays for a temporary location or rush shipping to keep operating, is usually bundled with it.",
  ],
  example: [
    "Suppose a bakery's kitchen fire closes it for four months. Its monthly net income was $12,000 and continuing payroll and rent were $9,000 a month. The claim is roughly $84,000 for the closure, plus extra expense for a rented commissary kitchen, less the waiting period. Hypothetical figures.",
  ],
  relatedTerms: ["contingent-business-interruption", "equipment-breakdown-coverage", "peril"],
  relatedProducts: ["business-owners-policy", "restaurant-insurance"],
};
