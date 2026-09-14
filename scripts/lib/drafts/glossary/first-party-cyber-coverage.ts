import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "First-party cyber coverage",
  definition: [
    "The half of a network security policy that pays the insured's own losses after an incident, as distinct from the half that pays claims other people bring.",
  ],
  inPractice: [
    "Typical insuring agreements: breach response costs, business interruption from a network outage, data restoration, extortion, and, increasingly, funds transfer and social engineering fraud. Each has its own sublimit and waiting period. The business interruption piece is the one most often undersized; it needs a realistic estimate of daily income lost while systems are down, and the restoration period should include the time to rebuild from backups. Dependent business interruption, for when a cloud provider goes down, is a separate extension. Carriers now condition the whole policy on controls the applicant attests to, so the application is part of the contract and should be answered by someone who knows the systems.",
  ],
  example: [
    "Suppose a small online retailer's site is taken offline by an attack for six days. Restoration costs $15,000 and lost profit is $4,000 a day after a one-day waiting period. The first-party agreements pay $15,000 plus $20,000 of income, less a $5,000 retention. Hypothetical.",
  ],
  relatedTerms: ["third-party-cyber-coverage", "cyber-extortion-coverage", "data-breach-coverage", "business-interruption-insurance"],
  relatedProducts: ["cyber-liability-insurance"],
};
