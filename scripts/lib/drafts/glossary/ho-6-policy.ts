import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "HO-6 policy",
  definition: [
    "The homeowners form written for a condominium or co-op unit owner, covering what the association's master coverage leaves out. It insures the interior of the unit from the studs in, the owner's contents, loss of use, and personal liability; the building shell and common areas belong to the association's master policy.",
  ],
  inPractice: [
    "The dwelling limit on this form is the number people get wrong. It depends on where the association's coverage stops, which the condominium declarations and the master policy set: a bare-walls master policy leaves cabinets, flooring, fixtures and interior walls to the owner, while an all-in master policy covers original fixtures but not upgrades. Loss assessment coverage is the other piece to review. It pays the owner's share when the association levies a special assessment after a covered loss or to fund a master-policy deductible, and those deductibles can be large, so a small default loss assessment limit is often too little. The analysis reads the association's documents before pricing the unit.",
  ],
  example: [
    "Suppose a unit owner carries $50,000 of dwelling coverage and $5,000 of loss assessment. A fire in the building's garage triggers a $250,000 master-policy deductible that the association splits across fifty units, $5,000 each. The owner's loss assessment coverage pays that share. Suppose the fire had also destroyed $30,000 of the owner's upgraded kitchen; the dwelling coverage would pay it less the deductible, because the master policy covers only the original builder finishes. Hypothetical figures.",
  ],
  relatedTerms: ["ho-3-policy", "deductible", "dp-3-policy"],
  relatedProducts: ["home-insurance"],
};
