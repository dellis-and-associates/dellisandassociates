import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Tail coverage",
  definition: [
    "An option bought when a claims-made policy ends that keeps the carrier responsible for claims reported after expiration, as long as the act itself happened before the policy ended.",
  ],
  inPractice: [
    "Formally it is an extended reporting period endorsement. It matters at retirement, the sale of a practice, a change of carrier, or when a firm closes. The price is usually a multiple of the final annual premium, paid once. Most policies include a short automatic tail at no charge and offer a longer optional one for a set number of years or without limit, with a deadline to elect it after the policy ends. It adds no new limits; the tail shares whatever remained on the final policy year. When switching carriers, prior acts coverage on the new policy is usually cheaper than buying a tail, so compare both before deciding.",
  ],
  example: [
    "Suppose a physician retires and the final year's premium was $10,000. The carrier offers an unlimited tail for $20,000, payable within the election window. Two years later a former patient sues over treatment given during the covered years; the tail responds, subject to the policy's original limit. Invented figures.",
  ],
  relatedTerms: ["extended-reporting-period", "claims-made-policy", "retroactive-date"],
  relatedProducts: ["professional-liability-eo-insurance"],
};
