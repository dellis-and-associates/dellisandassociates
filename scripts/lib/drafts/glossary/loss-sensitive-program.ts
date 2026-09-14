import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Loss-sensitive program",
  definition: [
    "Any commercial pricing arrangement in which the final premium moves with the claims the insured actually has, rather than being fixed in advance. Retrospective rating, large deductible plans, self-insured retentions and captives are all versions of it.",
  ],
  inPractice: [
    "The trade is variability for price. A business with good claims history pays less than under a fixed-cost policy because it keeps the savings from its own performance; one with a bad year pays more, up to whatever cap the arrangement sets. These plans usually require collateral, a letter of credit or cash held by the carrier, to secure the future payments, and they carry a tail of adjustments that can run for years as claims develop. They suit employers with premiums large enough that the law of averages applies to their own losses, strong cash flow, and a genuine safety culture; they punish businesses that buy one to cut the premium and then neglect claims. The analysis tests the plan against several years of loss runs and shows the strongest and weakest cases before recommending it.",
  ],
  example: [
    "Suppose a trucking company with a $600,000 fixed premium moves to a large deductible plan with a $100,000 deductible per claim. The premium falls to $350,000, and the company posts $200,000 of collateral. In a year with $150,000 of total claims under the deductible, its all-in cost is $500,000, a saving of $100,000. In a year with $400,000 of such claims, the cost is $750,000, and it would have been better off on the fixed form. Hypothetical figures.",
  ],
  relatedTerms: ["retrospective-rating-plan", "guaranteed-cost-policy", "self-insured-retention", "captive-insurance"],
  relatedProducts: ["commercial-auto-insurance"],
};
