import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Certificate of insurance",
  definition: [
    "A one-page summary, issued by an agent or carrier, showing a third party what policies a business carries, with whom, at what limits, and for what dates. It is evidence, not a contract: it confers no coverage on its own, and the policy always governs if the two disagree.",
  ],
  inPractice: [
    "Landlords, general contractors, lenders and clients ask for one before a lease is signed or a job begins, and many will not release payment without it. The standard form has a description box where the requesting party's status as additional insured, the waiver of subrogation and primary wording are noted; those only mean something if the corresponding endorsements are actually on the policy. A holder can ask to be notified of cancellation, and most carriers agree only to the extent the policy already provides. Requesting parties often over-ask, demanding limits or endorsements the business does not have; the right response is to price the endorsement or negotiate the requirement, not to issue a document that overstates the coverage, which is a serious matter for the agent. The analysis reads the contract's insurance clause before anything is issued.",
  ],
  example: [
    "Suppose a cleaning company signs a contract with a property manager that requires general liability of $1 million per occurrence with the manager named as additional insured. The agent checks the policy, adds the additional insured endorsement for a small premium, and issues the certificate showing both. Suppose a visitor later slips on a freshly mopped floor and sues the manager; the manager tenders the claim to the cleaner's policy, which defends it because the endorsement, not the certificate, gives it that right. Hypothetical figures.",
  ],
  relatedTerms: ["additional-insured", "waiver-of-subrogation", "primary-and-noncontributory"],
  relatedProducts: ["general-liability-insurance", "business-owners-policy"],
};
