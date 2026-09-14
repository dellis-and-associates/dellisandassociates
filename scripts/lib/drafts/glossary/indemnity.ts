import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Indemnity",
  definition: [
    "The principle that a claim payment should restore the policyholder to the financial position held just before the loss, no better and no worse. Property and liability contracts are built on it: the insurer makes good the actual loss, rather than paying a fixed sum regardless of what was lost.",
  ],
  inPractice: [
    "The rule explains several things people find surprising. Coverage is limited to the value of what was lost, so over-insuring a building does not produce a bigger payout. Depreciation deductions under actual cash value, the requirement of an insurable interest, and subrogation all follow from it. Life insurance is the main exception: it pays an agreed face amount because a life has no market value to restore. Some property forms, such as agreed value on a classic car, also depart from the principle by fixing the payout in advance.",
  ],
  example: [
    "Suppose a warehouse insured for $1,000,000 burns down, but the building was actually worth $600,000 on the day of the fire. Under a contract of indemnity the insurer pays $600,000 less the deductible, not the full limit, because paying more would leave the owner better off than before the loss. Hypothetical figures.",
  ],
  relatedTerms: ["actual-cash-value", "subrogation", "replacement-cost"],
  relatedProducts: ["home-insurance"],
};
