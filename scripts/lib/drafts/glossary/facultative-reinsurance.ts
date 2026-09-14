import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Facultative reinsurance",
  definition: [
    "An arrangement in which a primary insurer offers a single, specific risk to another insurer, which reviews it individually and decides whether to accept a portion of it and on what terms. Each placement is negotiated on its own, unlike a treaty that covers a whole class of business automatically.",
  ],
  inPractice: [
    "It is used for risks that fall outside the primary carrier's treaty or exceed its limits: a very large commercial building, an unusual hazard, a property in a catastrophe-prone location, or a liability limit higher than the carrier normally writes. Because a reinsurance underwriter looks at the individual risk, the primary carrier can accept business it would otherwise decline, and it may pass on some of the reinsurer's conditions to the insured, such as a higher deductible, a protective safeguard requirement, or an exclusion. The cost is higher and the process slower than treaty placement, so it is reserved for cases that justify it. Clients encounter it when a quote on a large or unusual risk takes longer than expected or comes back with conditions; the delay is often the primary carrier waiting on a reinsurer's answer. The analysis says so when that is the reason.",
  ],
  example: [
    "Suppose a carrier is asked to insure a $40 million resort property when its treaty caps any one location at $25 million. It places the $15 million above the cap with a reinsurer on a facultative basis, which accepts on condition that the resort's sprinkler system is inspected annually. The resort's policy carries that condition as a warranty. Suppose the reinsurer had declined; the carrier could have offered only $25 million, and the resort would have needed a second policy elsewhere. Hypothetical figures.",
  ],
  relatedTerms: ["reinsurance-treaty", "reinsurance", "underwriting"],
  relatedProducts: ["business-owners-policy", "retail-business-insurance"],
};
