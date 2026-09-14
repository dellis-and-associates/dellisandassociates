import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Indexed universal life",
  definition: ["A permanent policy with flexible premiums whose cash value earns interest tied to the movement of a stock market index without being invested in it directly. The insurer credits interest from the index change, subject to a cap, a participation rate and a floor that is usually zero."],
  inPractice: ["The floor means the account does not lose value from a market decline, but insurance charges and fees still come out of it, so a flat year is still a losing year. The cap and participation rate limit the upside and the insurer can change them within contract limits, which is why sales illustrations that assume a steady high crediting rate deserve scepticism. The policy works when the owner funds it well above the cost of coverage in the early years; underfunded, it behaves like any other universal policy and can lapse in old age. Loans against the cash value are a common planning use and carry their own interest terms, which the illustration should show."],
  example: ["Suppose a policy has a cap of 9% and a floor of 0%, and the owner has $50,000 of cash value at the start of the year. If the index rises 14%, the account is credited 9%, about $4,500 before charges. If the index falls 10%, the account is credited nothing and the year's charges still reduce it. Hypothetical figures."],
  relatedTerms: ["universal-life-insurance", "cash-value-life-insurance", "policy-lapse"],
  relatedProducts: ["indexed-universal-life-insurance", "life-insurance"],
};
