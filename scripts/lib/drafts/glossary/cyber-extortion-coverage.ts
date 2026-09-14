import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Cyber extortion coverage",
  definition: [
    "The insuring agreement that responds when a criminal locks or threatens to leak a company's data and demands payment: it pays the negotiator, the forensic team and, where lawful and approved, the ransom itself.",
  ],
  inPractice: [
    "Ransomware is the main driver. The carrier must be notified before any payment; most policies route the insured to a panel breach coach and a negotiation firm, and the carrier decides whether paying is covered and permitted, including a sanctions check on the recipient. Payment of the ransom is often sublimited and sometimes carries a coinsurance share. The related costs, restoring systems from backups, lost income during the outage, and notifying affected people, sit under other insuring agreements of the same policy. Underwriters now require multifactor authentication, offline backups and endpoint protection before offering it, and exclude losses where the insured misrepresented those controls.",
  ],
  example: [
    "Suppose a medical billing firm's servers are encrypted and the attacker demands $200,000. The carrier's negotiator settles at $60,000, forensics costs $40,000 and rebuilding systems $30,000. A $1,000,000 policy with a $250,000 extortion sublimit and a $10,000 retention pays the balance. Hypothetical figures.",
  ],
  relatedTerms: ["first-party-cyber-coverage", "data-breach-coverage", "sublimit"],
  relatedProducts: ["cyber-liability-insurance"],
};
