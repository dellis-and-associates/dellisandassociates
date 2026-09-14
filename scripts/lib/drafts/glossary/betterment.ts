import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Betterment",
  definition: [
    "The increase in value a repair produces when a worn part is replaced with a new one, and the share of the cost an insurer may deduct because the policyholder ends up with something better than what was damaged. It appears mostly in auto claims on tires, batteries, exhaust and suspension components.",
  ],
  inPractice: [
    "The deduction is a form of depreciation applied to a single part rather than the whole vehicle. Carriers apply it inconsistently: some deduct on tires and batteries only, some also on paint for older cars, and some waive it below a threshold. It is negotiable; a policyholder who can show the tires were nearly new, with a receipt, will usually get it removed. On property claims the same idea shows up when a code requires an upgraded replacement, though ordinance-or-law coverage often absorbs that. It should not be confused with the depreciation deduction under actual cash value, which applies to the whole item's age, not to the improvement a new part creates.",
  ],
  example: [
    "Suppose a crash destroys two tires with half their tread left, and new ones cost $400. The carrier deducts $200 of betterment and pays $200 for the pair. Suppose the owner produces a receipt showing they were fitted last month; the deduction is dropped and the carrier pays $400. Hypothetical figures.",
  ],
  relatedTerms: ["actual-cash-value", "collision-coverage", "ordinance-or-law-coverage"],
  relatedProducts: ["auto-insurance"],
};
