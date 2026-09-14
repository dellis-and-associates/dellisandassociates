import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Bodily injury liability",
  definition: [
    "The part of an auto policy that pays for other people's medical bills, lost wages, pain and suffering, and legal defence when the policyholder causes a crash that hurts someone. It does not pay for the policyholder's own injuries; that is what medical payments, personal injury protection and health insurance do.",
  ],
  inPractice: [
    "Limits are written as two figures, per person and per crash, and the second one is the limit that matters when several people are hurt. Arizona, Nevada and Idaho each set a legal floor for these limits, and it is low compared with the cost of a single hospital stay, so the floor is not a recommendation. The premium difference between a low limit and a substantially higher one is usually small because severe crashes are rare; the exposure is not. An umbrella policy sits above these limits and requires a minimum underlying amount. Defence costs are typically paid in addition to the limit, which is one of the more valuable features of the coverage.",
  ],
  example: [
    "Suppose a driver carries $50,000 per person and $100,000 per crash, and causes a collision that injures three people with claims of $60,000, $30,000 and $30,000. The per-person cap holds the first claim at $50,000, and the total of $110,000 exceeds the per-crash figure, so the driver is personally exposed for the shortfall unless an umbrella responds. Hypothetical figures.",
  ],
  relatedTerms: ["property-damage-liability", "liability-coverage", "umbrella-policy"],
  relatedProducts: ["auto-insurance"],
};
