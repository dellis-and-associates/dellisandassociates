import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Premium",
  definition: [
    "The price you pay to keep a policy in force, billed monthly, every six months or once a year. The insurer sets it from the risk it is taking on: what is covered, the limits and deductible chosen, where the property or vehicle is, and the record of the people insured.",
  ],
  inPractice: [
    "The premium is the trade-off side of every other choice on a policy. Raising a limit or adding an endorsement moves it up; taking a higher deductible or dropping an optional coverage moves it down. Paying in instalments often adds a service fee, so the annual figure on the declarations page is not always what leaves your account over the year.",
    "Missing a payment starts the grace period; if the grace period passes unpaid, the policy lapses and the coverage stops.",
  ],
  example: [
    "Suppose a driver's six-month premium is $600. Paying it in one lump sum costs $600. Paying it monthly at $100 plus a hypothetical $5 instalment fee each month costs $630 for the same coverage. Choosing a higher collision deductible on the same policy might bring the six-month figure down; the exact change depends on the insurer's rating and is not a fixed amount. All of these numbers are illustrative only.",
  ],
  relatedTerms: ["deductible", "grace-period", "policy-lapse", "underwriting"],
  relatedProducts: ["auto-insurance"],
};
