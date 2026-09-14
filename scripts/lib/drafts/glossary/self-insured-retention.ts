import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Self-insured retention",
  definition: [
    "A fixed amount of each claim that a business agrees to handle and pay out of its own funds before its liability policy responds. It differs from a deductible in that the carrier is not involved below the threshold; the business investigates, defends and settles those claims itself, or hires an administrator to do so.",
  ],
  inPractice: [
    "Large deductibles and retentions look alike on a quote but behave differently at claim time. Under a deductible the carrier handles the claim from the first dollar and bills the insured back; under a retention the carrier's duty to defend usually begins only once the retention is exhausted, so the business must have the staff or a third-party administrator to manage small claims properly. Umbrella and excess policies carry a retention for claims not covered by any underlying policy, and that figure is worth checking. Retentions are common on professional, cyber and directors and officers policies as well. Because the business pays the first layer, its safety and claims practices affect its costs immediately, not through next year's premium. The analysis confirms the business can actually run the claims it is keeping.",
  ],
  example: [
    "Suppose a property management firm carries a general liability policy with a $50,000 retention per occurrence. A tenant sues over a fall and the claim settles for $35,000 with $10,000 of defence costs. The firm pays all $45,000 and the carrier pays nothing. Suppose a second claim settles for $200,000 with $40,000 of defence costs; the firm pays the first $50,000 and the carrier the remaining $190,000. Hypothetical figures.",
  ],
  relatedTerms: ["deductible", "loss-sensitive-program", "umbrella-policy"],
  relatedProducts: ["commercial-umbrella-insurance", "general-liability-insurance"],
};
