import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Agreed value policy",
  definition: [
    "A form of property or vehicle coverage under which the insurer and the insured settle in advance, when the contract is written, on the exact amount that will be paid if the item is a total loss.",
  ],
  inPractice: [
    "Common for collector cars, classic motorcycles, boats, jewelry and fine art, where market worth is hard to establish after a loss and depreciation would be unfair. The figure is supported by an appraisal or documentation at inception and can be updated at renewal. Because there is no argument about worth at claim time, a total loss is paid in full without depreciation. It differs from stated amount, which sets a ceiling but still pays the lesser of that ceiling and actual cash value. Carriers that write it usually restrict mileage or use and require secure storage. The premium reflects the fixed payout.",
  ],
  example: [
    "Suppose a restored vintage pickup is insured on an agreed value of $45,000 and is destroyed in a garage fire. The insurer pays $45,000, less any deductible, without an adjuster estimating what the market would have paid. Hypothetical.",
  ],
  relatedTerms: ["stated-amount-policy", "actual-cash-value", "appraisal-clause"],
  relatedProducts: ["auto-insurance", "boat-watercraft-insurance"],
};
