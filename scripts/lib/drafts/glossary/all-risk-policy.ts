import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "All-risk policy",
  definition: [
    "An older label for coverage that responds to any cause of loss unless the form specifically excludes it. Insurers now prefer open peril or special form because the old name suggested nothing was excluded, which was never true and led to disputes.",
  ],
  inPractice: [
    "The phrase still appears in leases, lender requirements and construction agreements, and the practical answer is a special-form property policy. Builders risk and inland marine forms are commonly written this way. What separates them from a named-peril form is the burden of proof: the policyholder shows a sudden physical loss occurred, and the insurer must identify an exclusion to decline it. The exclusions matter more than the label. Flood, earthquake, wear, faulty design or workmanship, and government action are routinely carved out. When a contract uses the old term, the analysis maps it onto a current form and confirms the excluded causes are acceptable to the other party.",
  ],
  example: [
    "Suppose a lease requires the tenant to carry all-risk coverage on $150,000 of improvements, and the tenant buys a special-form commercial property policy. A pipe bursts and destroys $20,000 of finishes; that is a sudden physical loss with no exclusion in play, so it pays. Suppose instead the finishes rot from a slow leak that went unnoticed for a year; the wear-and-neglect exclusion applies, and the wording of the lease does not change that. Hypothetical figures.",
  ],
  relatedTerms: ["open-peril-policy", "exclusion", "builders-risk-insurance"],
  relatedProducts: ["business-owners-policy", "retail-business-insurance"],
};
