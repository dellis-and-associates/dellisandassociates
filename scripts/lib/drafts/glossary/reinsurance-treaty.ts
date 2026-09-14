import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Reinsurance treaty",
  definition: [
    "A standing contract under which one insurer agrees in advance to accept a defined portion of every policy of a given kind that another insurer writes during the contract's term. Neither side reviews the individual risks; the ceding company writes its business, and the accepting company takes its share automatically.",
  ],
  inPractice: [
    "Most reinsurance is placed this way, renewed annually, and a primary carrier's treaty program is what allows it to write more business than its own capital would safely support. Treaties come in two families: proportional, in which the reinsurer takes a percentage of premium and losses, and non-proportional, in which the reinsurer pays only the part of a loss or a year's losses above an agreed point. The terms set at renewal flow directly into what clients pay. When treaty prices rise after a run of catastrophes, primary carriers raise rates, increase wind and hail deductibles, and cap the number of homes they will write in exposed areas. Facultative placements handle the risks the treaty excludes. A client does not see the treaty but lives with its consequences, and the analysis explains that connection when a renewal moves for reasons that have nothing to do with the client's own record.",
  ],
  example: [
    "Suppose a regional home insurer's treaty covers every home policy it writes in Arizona, with the reinsurer taking a thirty percent share of the premium and paying the same share of every claim. The insurer writes $50 million in premium, cedes $15 million, and a hail season produces $40 million of claims, of which the reinsurer pays $12 million. Suppose at renewal the reinsurer raises its price; the insurer passes some of that increase through to its policyholders the following year. Hypothetical figures.",
  ],
  relatedTerms: ["reinsurance", "facultative-reinsurance", "quota-share-reinsurance", "excess-of-loss-reinsurance"],
  relatedProducts: ["home-insurance"],
};
