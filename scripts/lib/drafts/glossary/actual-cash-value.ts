import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Actual cash value",
  definition: ["A way of valuing a loss at the cost to replace the damaged property today minus depreciation for its age and condition. It is what the property was worth the moment before the loss, not what a new one costs."],
  inPractice: ["Auto policies use it for the vehicle itself: a total loss is settled at the car's market value, which is why a financed car can be worth less than the loan. Home policies may use it for the roof or for contents unless replacement cost is endorsed. The premium is lower because the payout is lower; the gap shows up on the day of a claim."],
  example: ["Suppose a seven-year-old sofa that cost $2,000 is destroyed in a fire and a similar new one is $2,400. Under actual cash value the insurer estimates the used sofa's worth, say $700, and pays that less any deductible; under replacement cost it pays $2,400. Hypothetical figures, to show the gap."],
  relatedTerms: ["replacement-cost", "gap-insurance", "betterment"],
  relatedProducts: ["home-insurance", "auto-insurance"],
};
