import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Indemnification clause",
  definition: [
    "The section of a contract that says who will make whom whole if a third party brings a claim arising from the work. It typically obliges one party to reimburse the other's losses, and frequently to defend the other against the claim, within limits the wording sets.",
  ],
  inPractice: [
    "It is the engine that a hold harmless promise runs on, and the two are usually drafted together. What matters for insurance is scope. The obligation may extend to attorney's fees, to claims caused partly by the other party, or to losses the promising party had no part in, and each extension is a risk the promising party's liability policy may or may not accept. The contractual liability coverage in a general liability policy responds to tort liability assumed by contract, not to a promise to pay a penalty or a purely financial loss, and professional liability policies commonly exclude contractually assumed liability unless the insured would have been liable anyway. Caps on the promise, such as limiting it to the contract value or to available insurance, are worth negotiating. Before a client signs, the analysis marks which sentences the policy backs and which it does not.",
  ],
  example: [
    "Suppose an engineering firm signs a contract agreeing to indemnify a developer for any loss arising from its services, including the developer's own delay costs. A design error requires rework, and the developer claims $200,000 of rework plus $150,000 of lost rent from the delay. The firm's professional liability policy covers the $200,000 rework, which is the firm's own negligence, but treats the delay claim as contractually assumed and excludes it. Hypothetical figures.",
  ],
  relatedTerms: ["hold-harmless-agreement", "indemnity", "additional-insured"],
  relatedProducts: ["professional-liability-eo-insurance", "general-liability-insurance"],
};
