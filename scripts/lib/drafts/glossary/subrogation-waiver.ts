import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Subrogation waiver",
  definition: [
    "An endorsement under which a carrier agrees in advance not to pursue a named party for money it pays on a claim, even if that party caused the loss. It is most often attached to a workers compensation policy at a customer's request, so the carrier cannot recover benefits paid to an injured worker from the customer on whose site the worker was hurt.",
  ],
  inPractice: [
    "From the carrier's side, giving up the recovery right has a cost, so the endorsement is priced: a small surcharge on the affected policy, sometimes on a blanket basis for anyone the insured has agreed in writing to protect, sometimes scheduled party by party. From the insured's side it is nearly always a contractual obligation rather than a choice; the general contractor, landlord or client demands it, the certificate must show it, and the job does not start until it does. Not every carrier offers a blanket version, and monopolistic state funds have their own rules, so the endorsement should be confirmed before signing a contract that requires it. The analysis checks each contract's insurance section against what the policy actually carries.",
  ],
  example: [
    "Suppose a subcontractor's employee is injured on a general contractor's site because of a scaffold the general contractor built badly. The subcontractor's workers compensation carrier pays $80,000 in benefits. Without the endorsement it would sue the general contractor to recover the $80,000. With the endorsement in favour of the general contractor, it cannot; the loss stays with the subcontractor's carrier and, over time, in the subcontractor's experience modification rate. Hypothetical figures.",
  ],
  relatedTerms: ["subrogation", "waiver-of-subrogation", "certificate-of-insurance", "experience-modification-rate"],
  relatedProducts: ["workers-compensation-insurance"],
};
