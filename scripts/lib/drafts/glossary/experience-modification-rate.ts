import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Experience modification rate",
  definition: [
    "A multiplier applied to a business's workers compensation premium that compares its actual claims history against what is expected for others of its size in the same trade. A factor of one is neutral; below one earns a credit, above one a surcharge.",
  ],
  inPractice: [
    "It is calculated by a rating bureau from three years of payroll and losses, skipping the most recent year, and it weights the frequency of claims more heavily than their size. Several small claims hurt more than one large one, which is why a return-to-work program and a light-duty policy lower it over time. The factor follows the business, not the carrier, so switching insurers does not reset it; a bad year stays in the calculation for three cycles. General contractors and public agencies often require a factor at or below one to bid, so it functions as a safety credential as well as a price. Small employers below a premium threshold are not rated on it at all. The analysis reads the worksheet behind the number to see which claims drive it and whether any are misreported.",
  ],
  example: [
    "Suppose a roofing contractor's manual premium works out to $50,000 and its factor is 1.30 after two years of frequent small injuries. The modified premium is $65,000. A competitor with the same payroll and a factor of 0.85 pays $42,500. Over three years the gap is $67,500 for the same work, before either firm's bid is considered. Hypothetical figures, to show how the multiplier compounds.",
  ],
  relatedTerms: ["manual-rate", "return-to-work-program", "loss-ratio", "osha-recordable-incident"],
  relatedProducts: ["workers-compensation-insurance"],
};
