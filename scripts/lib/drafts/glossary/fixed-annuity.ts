import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Fixed annuity",
  definition: ["A contract with an insurer that credits a declared interest rate on a lump sum or series of deposits and, if the owner chooses, later converts the balance into a stream of payments for life or a set number of years. The insurer carries the investment risk and the owner receives a stated rate."],
  inPractice: ["The rate is set for an initial period, often several years, after which the carrier declares a renewal rate that cannot fall below a floor written in the contract. Growth is tax-deferred until withdrawn, and gains come out first as taxable income. Surrender charges apply to withdrawals above the free amount during the early years, so the money should be money that can sit. Multi-year rate versions behave like a certificate of deposit with tax deferral; deferred versions with income riders behave differently and cost more. The carrier's financial strength is what stands behind the rate, which is why its rating matters more here than on a term policy. Payments taken as a life income stop at death unless a period certain or refund option is chosen."],
  example: ["Suppose a retiree deposits $100,000 into a five-year contract at 4.5%. The balance grows to about $124,600 by the end of the term if nothing is withdrawn. Suppose he needs $30,000 in year two; the first $10,000 is free, and the remaining $20,000 draws a surrender charge of, say, 6%, or $1,200, plus income tax on the gain portion. Hypothetical figures."],
  relatedTerms: ["surrender-charge", "free-withdrawal-amount", "indexed-annuity", "variable-annuity"],
  relatedProducts: ["annuities"],
};
