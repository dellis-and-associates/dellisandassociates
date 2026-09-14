import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Flood zone",
  definition: [
    "A classification on a federal map that states how likely an area is to be inundated by rising water. Zones lettered A and V are high-risk areas where a lender will require coverage on a federally backed mortgage; X and similar zones are moderate or minimal risk, where coverage is optional but still available.",
  ],
  inPractice: [
    "The designation drives three things: whether a lender will demand a policy, how the policy is rated, and what a seller must disclose. In the Southwest the maps surprise people. Desert washes, alluvial fans and the flat ground below a dam or levee are often mapped as high risk even though they are dry most of the year, and flash flooding from a monsoon cell can inundate an area mapped as minimal risk. Maps are revised, and a revision can move a house into a high-risk zone mid-mortgage, which triggers a lender letter and a forced placement if the owner does nothing. An owner who believes the structure sits above the water line can seek a letter of map amendment with an elevation certificate. The analysis checks the current map for the parcel, not the one from the listing.",
  ],
  example: [
    "Suppose a homebuyer in a Phoenix suburb is told the property is in zone X and skips flood coverage. Two years later the county's map revision places the lot in zone AE because of a nearby wash. The lender sends a notice requiring coverage, and the owner buys a policy at, say, $1,200 a year. Suppose the owner had bought the optional policy at purchase, while the lot was still zone X, for $500 a year; some rating systems let that lower price carry forward. Hypothetical figures.",
  ],
  relatedTerms: ["base-flood-elevation", "elevation-certificate", "force-placed-insurance", "nfip"],
  relatedProducts: ["flood-insurance"],
};
