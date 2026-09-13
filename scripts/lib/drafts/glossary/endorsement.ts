import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Endorsement",
  definition: [
    "A written change attached to a policy that adds, removes or alters coverage without rewriting the whole contract. It is signed off by the insurer, carries its own form number, and overrides the base policy wording wherever the two conflict.",
  ],
  inPractice: [
    "Most of the tailoring on a home or auto policy happens through endorsements: scheduling a piece of jewelry above the standard sublimit, adding water back-up coverage, extending replacement cost to contents, or excluding a named driver. Each one usually changes the premium and is listed on the declarations page.",
    "Reading the endorsements matters as much as reading the base form, because an endorsement can quietly narrow coverage as well as widen it.",
  ],
  example: [
    "Suppose a homeowner's base policy limits jewelry theft to $1,500 in total. An engagement ring appraised at a hypothetical $8,000 would be underpaid by $6,500 after a theft. Adding a scheduled personal property endorsement that lists the ring at $8,000 closes that gap, often with no deductible on the scheduled item, in exchange for a small addition to the premium. The amounts are illustrative only.",
  ],
  relatedTerms: ["rider", "sublimit", "declarations-page"],
  relatedProducts: ["home-insurance"],
};
