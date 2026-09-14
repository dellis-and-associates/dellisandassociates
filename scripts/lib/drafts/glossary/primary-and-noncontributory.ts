import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Primary and noncontributory",
  definition: [
    "Two words in an additional insured endorsement that settle whose policy pays first when two carriers both cover the same loss. Primary means your policy responds before the other party's; noncontributory means your carrier cannot ask theirs to share the cost.",
  ],
  inPractice: [
    "The wording shows up in construction subcontracts and commercial leases. A general contractor or landlord adds you as an additional insured and requires your general liability policy to sit primary and noncontributory, so a claim arising from your work lands on your policy and your limits, not theirs. The endorsement must say so in the language the contract uses; a certificate of insurance that mentions it without the matching endorsement creates no obligation. Carriers price it in, and some restrict it to written contracts signed before the work begins.",
  ],
  example: [
    "Suppose a plumbing subcontractor's employee floods a client's floor during a remodel, and the client sues both the plumber and the general contractor. The subcontract required primary and noncontributory status. The plumber's general liability carrier pays the $30,000 settlement and the defense within its $1,000,000 limit, and the general contractor's carrier is never asked to contribute. Round figures, invented for illustration.",
  ],
  relatedTerms: ["additional-insured", "certificate-of-insurance", "hold-harmless-agreement"],
  relatedProducts: ["general-liability-insurance", "contractors-insurance"],
};
