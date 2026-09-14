import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Morbidity table",
  definition: [
    "A chart giving, by age and often by sex and occupation, the probability of becoming sick or disabled and the expected duration of the condition. Disability, long-term care, critical illness and health insurers price their products from it, as life insurers price from a mortality table.",
  ],
  inPractice: [
    "Two dimensions matter where a mortality chart has one: how likely a claim is to begin, and how long it will last. A disability policy's premium depends on both, which is why the elimination period and the benefit period change the price so much, and why an occupation with physical demands is charged more than a desk job for the same benefit. Long-term care pricing adds a third dimension, the chance of recovering or dying while on claim. These charts have been less reliable than their mortality counterparts; early long-term care policies were priced on assumptions about lapses and claim durations that proved wrong, and the rate increases on those older policies followed. Carriers now hold larger margins, and the analysis explains why a policy bought today is priced the way it is and what could still move the premium.",
  ],
  example: [
    "Suppose a chart shows that a forty-five-year-old office worker has about a one in a hundred chance of a disability lasting more than ninety days in a given year, and that such a disability typically runs about two years. For a $4,000 monthly benefit, the expected cost of a year's cover is roughly $960 before expenses. Suppose the same person were a roofer; the chart's rate for that occupation class might be triple, and so might the premium. Hypothetical figures.",
  ],
  relatedTerms: ["mortality-table", "actuarial-table", "elimination-period", "benefit-period"],
  relatedProducts: ["health-insurance"],
};
