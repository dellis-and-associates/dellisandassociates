import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Deductible",
  definition: [
    "The amount you pay out of your own pocket on a covered claim before the insurer pays the rest. It is chosen when the policy is written and printed on the declarations page, usually as a flat dollar amount for auto and home policies and sometimes as a share of the dwelling limit for wind or hail losses.",
  ],
  inPractice: [
    "A higher deductible lowers the premium because you agree to absorb more of each loss yourself; a lower one raises it. The insurer subtracts the deductible from what it owes on each separate claim, not once a year, so two claims in one policy year each carry their own.",
    "It applies to damage to your own property. Liability coverage, which pays what you owe other people, normally has no deductible at all.",
  ],
  example: [
    "Suppose a hail storm does $6,000 of covered damage to a roof and the policy carries a $1,000 deductible. The insurer pays $5,000 and the homeowner pays the first $1,000 to the roofer. Had the same policy carried a $2,500 deductible, the insurer's share would fall to $3,500 and the premium would have been somewhat lower in exchange. These figures are hypothetical and only show the mechanism.",
  ],
  relatedTerms: ["premium", "claim", "declarations-page"],
  relatedProducts: ["auto-insurance", "home-insurance"],
};
