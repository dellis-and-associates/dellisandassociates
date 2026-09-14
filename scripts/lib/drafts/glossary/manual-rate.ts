import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Manual rate",
  definition: [
    "The published base price for a unit of exposure in a given class of business, before any adjustment for the individual policyholder. In workers compensation it is the charge for each hundred dollars of payroll in a classification code; in general liability it may be per thousand dollars of sales or per square foot.",
  ],
  inPractice: [
    "It is the starting point of the premium calculation, not the end. A rating bureau or the carrier files the base figure by class, the policyholder's exposure is multiplied by it to produce the manual premium, and that figure is then modified by the experience modification rate, schedule credits or debits, and any premium discount. Class assignment therefore matters as much as the base figure: a clerical employee misclassified as a roofer is charged at a base many times higher. Payroll audits at the end of the term true up the exposure, which is why a growing business receives an additional bill and a shrinking one a refund. The analysis checks each classification against what the employees actually do.",
  ],
  example: [
    "Suppose a landscaping company has $400,000 of payroll in a class with a base figure of $8 per hundred dollars of payroll. The manual premium is $32,000. With an experience modification of 0.90 and a schedule credit of ten percent, the final premium is about $25,900. Suppose $60,000 of that payroll is actually office staff in a clerical class at $0.30; reclassifying it cuts the manual premium by roughly $4,600. Hypothetical figures.",
  ],
  relatedTerms: ["experience-modification-rate", "schedule-rating", "premium", "underwriting"],
  relatedProducts: ["workers-compensation-insurance"],
};
