import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Maximum medical improvement",
  definition: [
    "The point in a workers compensation claim at which the treating physician concludes that the employee's condition has stabilised and further treatment will not make it better. It does not mean the employee is healed; it means the recovery has reached its plateau.",
  ],
  inPractice: [
    "It is the hinge of the claim. Before it, the employee receives temporary disability benefits and active treatment; after it, temporary benefits end, the physician assigns an impairment rating if any, and the claim moves to permanent benefits, a settlement, or closure. Maintenance care such as pain management can continue afterwards under most states' rules. Disputes cluster here: the carrier may ask for an independent medical examination to confirm the date, and an employee's own physician may disagree. For the employer the date determines when the reserve can be trimmed and when a modified job either becomes permanent or ends. The analysis explains the sequence so an employer knows what the next letter from the carrier will mean.",
  ],
  example: [
    "Suppose an employee with a shoulder injury has surgery and six months of therapy. The surgeon declares the plateau reached and rates a modest impairment. Temporary benefits of $700 a week stop, a permanent partial benefit is calculated on the rating, say $12,000, and the employee continues in a light-duty job that becomes a permanent reassignment. Suppose instead the surgeon found more surgery could help; the plateau is not reached, and the weekly benefit continues. Hypothetical figures.",
  ],
  relatedTerms: ["temporary-total-disability", "permanent-partial-disability", "independent-medical-examination"],
  relatedProducts: ["workers-compensation-insurance"],
};
