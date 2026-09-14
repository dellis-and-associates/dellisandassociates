import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "In-network vs. out-of-network",
  definition: ["The distinction between providers who have signed a contract with a health plan to accept its negotiated rates and providers who have not. The first group bills at agreed prices and cannot charge the patient the difference; the second group bills at their own rates, and the plan pays less or nothing."],
  inPractice: ["HMO and EPO plans generally pay nothing for non-contracted care except emergencies; PPO and POS plans pay a share, with a separate and higher deductible and out-of-pocket maximum. The gap is not only the plan's lower percentage but balance billing: the provider can bill the difference between its charge and the plan's allowed amount, and that difference does not count toward the plan's maximum. Federal rules limit surprise bills for emergencies and for out-of-network clinicians at in-network facilities. Directories are unreliable, so confirm contract status with the plan and the provider's billing office before a scheduled service, and ask specifically about the anesthesiologist, the lab and the facility, which can be contracted differently from the surgeon."],
  example: ["Suppose a PPO pays 80% in-network and 60% out-of-network of the allowed amount. An in-network MRI with a $1,000 allowed charge costs the patient $200. Suppose an out-of-network center bills $2,500, the plan allows $1,000 and pays $600; the patient owes $400 plus the $1,500 balance bill, $1,900 in all. Hypothetical figures."],
  relatedTerms: ["out-of-pocket-maximum", "coinsurance", "explanation-of-benefits", "medicare-advantage"],
  relatedProducts: ["health-insurance"],
};
