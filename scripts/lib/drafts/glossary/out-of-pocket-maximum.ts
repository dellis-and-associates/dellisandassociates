import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Out-of-pocket maximum",
  definition: ["The most a person pays in a plan year for covered, in-network services before the health plan pays everything else in full. Deductibles, copays and coinsurance all count toward it; premiums, balance bills and non-covered services do not."],
  inPractice: ["It is the figure that defines the worst case for a bad year, which makes it more important than the deductible for anyone comparing plans. Family plans usually have an individual limit and a family limit, and the individual limit applies to each member even before the family total is reached. Out-of-network services have a separate, higher limit or none. It resets each plan year, so a treatment that spans December and January can hit two limits. Original Medicare has none, which is the core reason for supplement policies; Advantage plans set one within a federal ceiling. Choosing a high-deductible plan with a health savings account is often reasonable when the limit could be paid from savings in a bad year."],
  example: ["Suppose a plan has a $2,000 deductible, 20% coinsurance and a $6,000 limit. A member with a $50,000 hospital bill pays the $2,000 deductible, then 20% of the next $20,000, which is $4,000, reaching the $6,000 cap; the plan pays the remaining $28,000 in full. Any further covered care that year costs the member nothing. Hypothetical figures."],
  relatedTerms: ["coinsurance", "deductible", "copay", "in-network-vs-out-of-network"],
  relatedProducts: ["health-insurance"],
};
