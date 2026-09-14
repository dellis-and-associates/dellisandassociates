import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Coinsurance",
  definition: ["The share of a covered bill, expressed as a percentage, that the patient pays after the deductible has been met, with the health plan paying the rest. It applies until the annual out-of-pocket maximum is reached."],
  inPractice: ["The percentage applies to the allowed amount, not the provider's list price, so an in-network claim is calculated on the negotiated rate. It is the cost-sharing that makes expensive care expensive: a copay is the same whatever the service costs, but a percentage of a surgery is a large sum, which is why the out-of-pocket maximum matters. Out-of-network percentages are higher and may be calculated on a lower allowed amount. Original Medicare applies it to most Part B services with no ceiling. The word means something different in property insurance, where a co-insurance clause penalises a building insured below a required share of its value; the two are unrelated apart from the spelling."],
  example: ["Suppose a plan has a $1,500 deductible and 20% coinsurance. A member with an $8,000 outpatient surgery, all at allowed rates, pays the $1,500 deductible and then 20% of the remaining $6,500, which is $1,300, for a total of $2,800. The plan pays $5,200. Hypothetical figures."],
  relatedTerms: ["copay", "deductible", "out-of-pocket-maximum", "co-insurance"],
  relatedProducts: ["health-insurance"],
};
