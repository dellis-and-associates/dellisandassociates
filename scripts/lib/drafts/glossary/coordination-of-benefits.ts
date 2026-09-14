import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Coordination of benefits",
  definition: ["The set of rules that decides which of two health plans pays first when a person is covered by both, and how much the second one pays afterwards. The aim is that the combined payment does not exceed the bill and the same claim is not paid twice."],
  inPractice: ["Common situations are a child covered under both parents' plans, a working spouse with employer coverage and Medicare, and a retiree with an employer plan alongside Medicare. The primary plan pays as if it were the only coverage; the secondary plan pays some or all of what remains, up to what it would have paid on its own, so a second plan rarely brings the bill to zero. For children the birthday rule usually applies: the parent whose birthday falls earlier in the year is primary. For Medicare, whether the employer plan is primary depends on the size of the employer and whether the person is still working. Insurers ask about other coverage on every claim and will hold payment until the question is answered."],
  example: ["Suppose a child's $2,000 hospital bill is submitted to both parents' plans. The mother's plan is primary and pays $1,500 after its deductible; the father's plan, as secondary, would have paid $1,600 on its own, so it pays the remaining $500. Had the secondary plan's own payment been only $400, the family would owe $100. Hypothetical figures."],
  relatedTerms: ["explanation-of-benefits", "medicare-part-b", "in-network-vs-out-of-network"],
  relatedProducts: ["health-insurance", "medicare"],
};
