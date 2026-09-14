import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Excess liability",
  definition: [
    "A second layer of coverage that sits above a primary policy and pays only after that policy's limit is used up. Unlike an umbrella, a true excess form usually follows the terms of the underlying policy exactly: same exclusions, same definitions, just a higher ceiling. It adds limit, not breadth.",
  ],
  inPractice: [
    "Businesses buy it when a contract or lender asks for a total limit larger than any one carrier will write on the primary policy. The excess carrier requires that the underlying policy stay in force at the scheduled limit; if the primary lapses or its limit is reduced, the excess layer may not respond until the insured pays the gap. Personal buyers more often want an umbrella, which can drop down to cover claims the primary excludes. The distinction matters at claim time, so the analysis reads both forms side by side rather than assuming they match.",
  ],
  example: [
    "Suppose a contractor carries a general liability policy with a $1 million limit and a $2 million excess policy above it. A jobsite injury settles for $2.5 million. The primary carrier pays its $1 million, the excess carrier pays the next $1.5 million, and the contractor pays nothing beyond its retention. Suppose instead the claim arose from pollution, which the primary excludes; the excess policy, following form, excludes it as well. Hypothetical figures, to show the layering.",
  ],
  relatedTerms: ["umbrella-policy", "aggregate-limit", "per-occurrence-limit"],
  relatedProducts: ["commercial-umbrella-insurance", "general-liability-insurance"],
};
