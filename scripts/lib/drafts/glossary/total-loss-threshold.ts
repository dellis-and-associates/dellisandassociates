import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Total loss threshold",
  definition: [
    "The point at which an insurer decides a damaged vehicle is not worth repairing and instead pays its value and takes the car.",
  ],
  inPractice: [
    "Each state sets a rule, either a fixed share of the vehicle's pre-accident value or a formula that adds salvage value to repair cost, and the Department of Insurance and Financial Institutions can confirm the one Arizona uses. Carriers may also declare a total below that point when repair cost plus rental and the risk of hidden damage exceed what the car is worth. Once declared, the owner is paid actual cash value less the deductible, the lender is paid first, and the vehicle receives a salvage title. An owner who keeps the car receives the value minus what the salvage would have fetched. Gap coverage matters here for financed cars. The valuation can be disputed with comparable listings.",
  ],
  example: [
    "Suppose a sedan worth $15,000 is hit and the repair estimate is $11,500. In a state whose rule sits around three-quarters of value, the car is declared a total. The owner receives $15,000 less a $500 deductible, and the lender's $9,000 payoff comes out first. Hypothetical figures.",
  ],
  relatedTerms: ["actual-cash-value", "salvage-title", "gap-insurance"],
  relatedProducts: ["auto-insurance"],
};
