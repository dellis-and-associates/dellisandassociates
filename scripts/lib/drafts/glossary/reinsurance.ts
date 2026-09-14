import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Reinsurance",
  definition: [
    "Insurance that an insurer buys for itself, transferring part of the risk it has taken on to another company in exchange for a share of the premium. It lets a carrier write more policies than its own capital could safely absorb and shields it from a single catastrophe wiping out a year of results.",
  ],
  inPractice: [
    "Policyholders never see the contract but feel its price. After a bad wildfire or hail season the cost of this protection rises for every carrier in the region, and that shows up as rate filings a year or two later even for people with no claims. It is also why some carriers stop writing in high-hazard areas: the cost of laying off that risk exceeds what they can charge. Two shapes exist. Treaty contracts cover a whole book of business automatically; facultative contracts are bought one risk at a time, for a large building or an unusual account. The original insurer remains fully responsible to the policyholder; a reinsurer's failure is the carrier's problem, not the claimant's.",
  ],
  example: [
    "Suppose a regional home insurer keeps the first $20,000,000 of loss from any single event and buys protection for the next $200,000,000. A wildfire causes $80,000,000 of insured damage. The carrier pays all claims to its policyholders, then collects $60,000,000 from its reinsurers. Hypothetical figures.",
  ],
  relatedTerms: ["reinsurance-treaty", "facultative-reinsurance", "underwriting"],
  relatedProducts: ["home-insurance"],
};
