import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Copay",
  definition: ["A fixed dollar charge the patient pays at the time of a service, such as an office visit or a prescription fill, with the health plan covering the rest of the allowed amount. It is a flat fee, unlike coinsurance, which is a percentage."],
  inPractice: ["Plans typically set different amounts for primary care, specialists, urgent care, the emergency room and each drug tier, and the schedule is printed on the insurance card. Some services carry it instead of the deductible, meaning the plan pays even before the deductible is met, which is a real advantage of a copay-based plan for someone who sees doctors often. Whether the amounts count toward the deductible varies by plan; they nearly always count toward the out-of-pocket maximum. Preventive visits under most plans have none. Drug copays can be undercut by a pharmacy's cash price, and the pharmacist can say so if asked. High-deductible plans compatible with a health savings account cannot use them for non-preventive care until the deductible is met."],
  example: ["Suppose a plan charges $30 for a primary care visit, $60 for a specialist and $250 for the emergency room. A member who sees her doctor twice, a dermatologist once and visits the emergency room once in a year pays $370 in total for those visits, regardless of what the providers billed the plan. Hypothetical figures."],
  relatedTerms: ["coinsurance", "deductible", "out-of-pocket-maximum", "medicare-part-d"],
  relatedProducts: ["health-insurance"],
};
