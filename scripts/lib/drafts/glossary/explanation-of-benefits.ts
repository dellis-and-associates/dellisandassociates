import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Explanation of benefits",
  definition: ["The statement a health plan sends after processing a claim, showing what the provider billed, what the plan allowed, what it paid and what the patient owes. It is not a bill; the provider's invoice comes separately and should match it."],
  inPractice: ["Reading it catches errors: a claim processed as out-of-network when the doctor is in the network, a deductible applied twice, a service coded wrongly, or a bill from the provider that exceeds the patient responsibility shown. The allowed amount is the negotiated rate; the difference between billed and allowed is written off by an in-network provider and can be balance-billed by an out-of-network one. Each statement also updates the running totals toward the deductible and the out-of-pocket maximum. Medicare sends a similar summary notice quarterly. Keep them for the year, and query anything that does not match the provider's bill before paying it. An appeal deadline usually runs from the statement date."],
  example: ["Suppose a statement shows a specialist billed $450, the plan allowed $300, the plan paid $240 and the patient owes $60 in coinsurance. Suppose the specialist's office then sends a bill for $210, the $60 plus the $150 it should have written off; the patient should pay $60 and ask the office to correct the rest. Hypothetical figures."],
  relatedTerms: ["coordination-of-benefits", "coinsurance", "out-of-pocket-maximum", "in-network-vs-out-of-network"],
  relatedProducts: ["health-insurance"],
};
