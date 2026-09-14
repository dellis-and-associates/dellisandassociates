import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Funds transfer fraud coverage",
  definition: [
    "An insuring agreement on a crime or cyber policy that pays when a criminal, without the insured's knowledge, instructs the bank to move money out of the insured's account.",
  ],
  inPractice: [
    "The distinguishing fact is that nobody at the business authorized the payment: the attacker used stolen online banking credentials, a forged wire instruction, or a compromised phone line to direct the bank. That separates it from social engineering, where an employee is deceived into sending the money. Banks bear some of this risk under their own rules for consumer accounts, but business accounts carry far less protection, which is why the coverage exists. Limits are set to the largest balance typically held. Carriers ask about dual authorization for wires, bank alerts and how quickly the insured reconciles. Recovery from the receiving bank is sometimes possible if the loss is reported within hours.",
  ],
  example: [
    "Suppose a wholesaler's online banking login is captured by malware and a $70,000 wire leaves for an overseas account overnight. The bank recovers $10,000. The funds transfer agreement, with a $250,000 limit and a $2,500 deductible, pays the $57,500 balance. Hypothetical figures.",
  ],
  relatedTerms: ["social-engineering-fraud-coverage", "crime-insurance", "cyber-extortion-coverage"],
  relatedProducts: ["cyber-liability-insurance", "retail-business-insurance"],
};
