import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Third-party cyber coverage",
  definition: [
    "The liability half of a network security policy, paying defense and damages when customers, business partners or regulators bring claims against the insured over an incident.",
  ],
  inPractice: [
    "Insuring agreements include network security liability, for spreading malware or failing to secure data; privacy liability, for exposing personal information; regulatory defense and penalties where insurable; payment card assessments from the card brands after a card breach; and media liability for online content. Claims-made, with defense inside the limit. A contract with a large customer often requires this coverage at a set limit, backed by a certificate. It does not pay the insured's own response costs; those sit under the first-party agreements. Privacy regulators in several states and abroad can fine businesses, and whether those fines are covered depends on the policy wording and the law of the jurisdiction.",
  ],
  example: [
    "Suppose a payroll provider's breach exposes its clients' employee records and three client companies sue for their notification costs. Defense runs $80,000 and settlements total $150,000. The provider's liability agreement pays both within a $1,000,000 limit, less a $10,000 retention. Hypothetical.",
  ],
  relatedTerms: ["first-party-cyber-coverage", "data-breach-coverage", "claims-made-policy"],
  relatedProducts: ["cyber-liability-insurance", "professional-liability-eo-insurance"],
};
