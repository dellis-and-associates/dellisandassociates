import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Subrogation",
  definition: [
    "The insurer's right, after it pays your claim, to step into your shoes and recover that money from whoever caused the loss. The right is written into the policy: by accepting payment you hand the insurer your right to pursue the responsible party.",
  ],
  inPractice: [
    "For a policyholder the main effect is a duty to cooperate: sign what the insurer needs, keep evidence, and do nothing that gives up the claim against the other party. Settling privately with the at-fault driver after your insurer has paid can breach the policy.",
    "Recovery can also bring back your deductible. If the insurer collects in full from the other side, it returns your share too. Business contracts sometimes require a waiver of subrogation, which gives up this right toward a named party in advance.",
  ],
  example: [
    "Suppose another driver runs a red light and causes $4,000 of damage to your car. You claim under your own collision coverage, pay your $500 deductible, and the insurer pays the $3,500 balance. Your insurer then pursues the other driver's liability insurer for the full $4,000. If it recovers everything, it keeps $3,500 and refunds your $500. The figures are hypothetical.",
  ],
  relatedTerms: ["claim", "collision-coverage", "deductible", "waiver-of-subrogation"],
  relatedProducts: ["auto-insurance"],
};
