import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Hold harmless agreement",
  definition: [
    "A contract clause in which one party promises to take responsibility for certain claims so the other party is not left paying them. It shifts risk by contract rather than by insurance, and it is usually paired with a promise to indemnify and a duty to defend.",
  ],
  inPractice: [
    "They appear in leases, subcontracts, vendor agreements, equipment rentals and event permits, and they come in degrees: a limited form covers only the promising party's own negligence, an intermediate form adds claims the two share, and a broad form makes the promising party pay even for the other side's sole negligence, which some states refuse to enforce in construction contracts. The clause is only as good as the money behind it, which is why the same contract almost always requires liability insurance and additional insured status. General liability policies cover liability assumed under an insured contract, a defined term that includes most such clauses, so the promise is usually insured; but the policy's limit and exclusions still apply, and a promise wider than the policy leaves the business bare. The analysis reads the clause and says what the policy will and will not back.",
  ],
  example: [
    "Suppose a caterer signs a venue contract promising to hold the venue harmless from any claim arising out of the event. A guest is injured when a venue-owned railing gives way, and sues the venue. The venue tenders the claim to the caterer under the clause. Whether the caterer's $1 million policy responds depends on the state's rule on broad-form clauses and the policy's contractual liability wording; if it does, the caterer's limits are spent on the venue's own defect. Hypothetical figures.",
  ],
  relatedTerms: ["indemnification-clause", "additional-insured", "waiver-of-subrogation"],
  relatedProducts: ["general-liability-insurance", "contractors-insurance"],
};
