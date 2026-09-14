import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Free withdrawal amount",
  definition: ["The portion of an annuity's value the owner may take out each year during the surrender period without paying the surrender penalty. It is typically expressed as a share of the account value or of the premiums paid, measured each contract year."],
  inPractice: ["It is a relief valve, not a plan: taking the allowance every year is fine, but anything above it is penalised, and unused allowance usually does not carry forward. Some contracts calculate it on the previous anniversary's value, others on the original premium, and some do not allow it at all in the first year. Required minimum distributions from a qualified contract are commonly treated as free even if they exceed the stated share. Income tax still applies to the gain portion of any withdrawal, and the tax code's early withdrawal penalty may too. Withdrawals under a living benefit rider are a separate calculation with their own rules, and taking more than the rider allows can reduce the income base."],
  example: ["Suppose a contract allows 10% of the account value each year without penalty and the balance is $80,000. The owner may withdraw $8,000 that year with no surrender charge. Suppose she withdraws $20,000 instead; the extra $12,000 is subject to the schedule, say 6%, costing $720. Hypothetical figures."],
  relatedTerms: ["surrender-charge", "qualified-annuity", "fixed-annuity"],
  relatedProducts: ["annuities"],
};
