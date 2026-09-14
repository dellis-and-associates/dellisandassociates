import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Waiver of subrogation",
  definition: [
    "A contract term, backed by a policy endorsement, in which one party gives up its insurer's right to recover a paid loss from the other party. The insurer that pays the claim keeps the loss instead of chasing the party who caused it.",
  ],
  inPractice: [
    "Leases and construction contracts commonly include a mutual version for property damage: landlord and tenant each agree that their own property insurance will pay for damage to their own property, and neither insurer will pursue the other side. It keeps the parties out of litigation with each other and lets each carry insurance sized to its own property. The endorsement must actually be on the policy, since most forms void coverage if the insured impairs the carrier's recovery rights after a loss but allow it when done in writing beforehand. It can be granted blanket or per party, and carriers may charge for it, since they absorb losses they could otherwise have recovered. The same clause is often demanded on general liability, auto and workers compensation policies. The analysis checks each policy for the endorsement before the contract is signed.",
  ],
  example: [
    "Suppose a tenant's employee leaves a space heater on overnight and a fire causes $150,000 of damage to the building. The lease contains a mutual waiver. The landlord's property policy pays the $150,000 and, because of the endorsement, cannot sue the tenant to recover it. Without the endorsement the landlord's carrier would pursue the tenant, and the tenant's liability policy would be defending a claim that the lease was written to avoid. Hypothetical figures.",
  ],
  relatedTerms: ["subrogation", "subrogation-waiver", "certificate-of-insurance"],
  relatedProducts: ["business-owners-policy", "general-liability-insurance"],
};
