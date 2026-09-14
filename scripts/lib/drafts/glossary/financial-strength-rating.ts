import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Financial strength rating",
  definition: [
    "An independent agency's opinion, expressed as a letter grade, of an insurer's ability to pay its claims as they come due. Several agencies publish them, each on its own scale, and the grade reflects capital, earnings, reserves, reinsurance and management rather than price or service.",
  ],
  inPractice: [
    "It is the first thing to check on any carrier that is unfamiliar, and it is worth rechecking at renewal, since grades move. A high grade does not mean a claim will be handled well; it means the money will be there. A low or withdrawn grade is a warning that the company may be unable to pay a large loss, or may be placed into rehabilitation by its state regulator, at which point policyholders of an admitted carrier fall back on the state guaranty fund, with its caps, and policyholders of a non-admitted carrier have no such fallback. Lenders, landlords and contracts commonly set a minimum grade. Because the various agencies use different scales, an A from one is not the same as an A from another; the analysis names the agency alongside the grade and explains what the letter means on that scale.",
  ],
  example: [
    "Suppose a homeowner's carrier is downgraded two notches mid-term after a bad wildfire year. The mortgage servicer notices at renewal and sends a letter requiring a carrier graded at or above its threshold. The analysis is rerun: an alternative carrier at the required grade quotes $2,300 against the current $1,900, and the homeowner moves, because the grade requirement is not negotiable. Hypothetical figures.",
  ],
  relatedTerms: ["a-m-best-rating", "policyholder-surplus", "combined-ratio", "admitted-carrier"],
  relatedProducts: ["home-insurance"],
};
