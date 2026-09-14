import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Open-peril policy",
  definition: [
    "A form that covers every cause of loss except the ones it expressly excludes. It reverses the usual burden: the insurer must point to an exclusion to deny a claim, instead of the policyholder proving the cause was on a list.",
  ],
  inPractice: [
    "The dwelling portion of a standard HO-3 and the whole of an HO-5 are written this way; so are most scheduled floaters and many commercial property forms. Broader does not mean unlimited. Flood, earth movement, wear and tear, neglect, intentional acts, ordinance enforcement and, in most forms, mold and pest damage are still excluded, and those lines hold at claim time. The practical advantage comes with unusual accidents: a paint can dropped from a ladder onto hardwood, a child's experiment that melts a countertop. Neither appears on any list, and both are covered because neither is excluded. The premium difference against a named-peril form is usually modest, and the analysis shows both.",
  ],
  example: [
    "Suppose a homeowner on an HO-5 spills a gallon of solvent that ruins $3,000 of flooring. No exclusion mentions spills, so the claim pays $3,000 less the deductible. Suppose the same floor was ruined by groundwater seeping through the slab over a wet winter; the earth movement and seepage exclusions apply, and the claim is denied. Hypothetical figures.",
  ],
  relatedTerms: ["named-peril-policy", "exclusion", "all-risk-policy"],
  relatedProducts: ["home-insurance"],
};
