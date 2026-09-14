import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Additional insured",
  definition: [
    "A person or organisation, other than the policyholder, who is granted protection under the policyholder's liability policy by endorsement, usually because a contract requires it. The status is limited to liability arising from the policyholder's work or premises; it does not make the other party's own operations covered.",
  ],
  inPractice: [
    "The usual cases are a general contractor on a subcontractor's policy, a landlord on a tenant's, a city on an event organiser's, and a client on a vendor's. The endorsement form matters: some cover only ongoing operations, others also completed work, and many now limit coverage to what the contract requires or to the policyholder's own negligence. Blanket endorsements grant the status automatically to anyone the policyholder has agreed in writing to cover, which is convenient but may carry a premium charge on audit. The party granted the status shares the policyholder's limits, so a large claim can leave less for the policyholder. Property policies use a different mechanism, loss payee or mortgagee, and the terms are not interchangeable. The analysis matches the endorsement's edition to the contract's wording.",
  ],
  example: [
    "Suppose a landlord is granted this status on a restaurant tenant's general liability policy. A customer is injured by a falling sign the tenant installed and sues both the tenant and the landlord. The tenant's policy defends and indemnifies both, up to the $1 million occurrence limit, because the landlord's liability arises from the tenant's premises. Suppose instead the injury came from a stair the landlord failed to repair in a common area; that is the landlord's own negligence, and the tenant's policy does not respond. Hypothetical figures.",
  ],
  relatedTerms: ["certificate-of-insurance", "primary-and-noncontributory", "named-insured", "hold-harmless-agreement"],
  relatedProducts: ["general-liability-insurance"],
};
