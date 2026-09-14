import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Per-project aggregate",
  definition: [
    "An endorsement that gives each job site its own separate cap on what a general liability policy will pay in a policy year, rather than one shared cap across every job the business touches.",
  ],
  inPractice: [
    "Without it, a contractor running several sites at once has a single general aggregate limit, and a large claim on one site reduces what is left for the others. General contractors and owners often require the endorsement in their subcontracts, because a subcontractor whose limit has been used up elsewhere is, from their point of view, uninsured. It usually carries an added premium and may apply only to jobs performed under a written contract. Like any other aggregate, it resets at each policy period.",
  ],
  example: [
    "Suppose a framing contractor carries a general aggregate of $2,000,000 and is working three sites. A collapse on the first site produces claims of $1,800,000. With a per-project aggregate, the other two sites still have a full $2,000,000 each available; without it, only $200,000 remains for the rest of the year across all work. Hypothetical figures.",
  ],
  relatedTerms: ["aggregate-limit", "per-occurrence-limit", "additional-insured"],
  relatedProducts: ["contractors-insurance", "general-liability-insurance"],
};
