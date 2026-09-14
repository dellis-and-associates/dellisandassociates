import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Claims-made policy",
  definition: [
    "A form of liability coverage that responds based on when a demand for damages is first presented to the insured and reported to the carrier, not on when the underlying act happened. The policy in force on the day the claim is made is the one that pays, provided the act occurred after the retroactive date.",
  ],
  inPractice: [
    "Professional liability, directors and officers, employment practices and cyber policies are usually written this way. The trade-off: the premium starts lower in the early years because the carrier's exposure is small, then rises as years of prior work pile up behind it. The risk sits at the end. Cancel or switch carriers without tail coverage or prior acts coverage, and a claim that arrives later for old work has no policy to land on. Report every potential claim promptly; late notice is the most common reason a carrier declines.",
  ],
  example: [
    "Suppose an architect's plan error in year two of a claims-made policy causes a leak discovered in year five, and the owner sues that year. If the architect still holds the policy, the year-five policy pays, subject to its $1,000,000 limit. Suppose instead the architect retired in year four and bought no tail; the claim is uncovered. Hypothetical.",
  ],
  relatedTerms: ["occurrence-policy", "retroactive-date", "tail-coverage", "prior-acts-coverage"],
  relatedProducts: ["professional-liability-eo-insurance"],
};
