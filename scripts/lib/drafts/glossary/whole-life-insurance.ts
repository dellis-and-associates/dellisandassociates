import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Whole life insurance",
  definition: [
    "A permanent policy with a fixed premium, a fixed death benefit, and a savings component that grows on a schedule set out in the contract when it is issued. It is designed to stay in force until death, however long that is, as long as premiums are paid.",
  ],
  inPractice: [
    "The contract states the cash value for every year in advance, which distinguishes it from universal life, where growth depends on the carrier's crediting rate and the cost of coverage can rise. Participating policies from mutual carriers add dividends, which are not promised but have historically been paid and can be taken in cash, used to reduce premiums, or applied to buy paid-up additions that raise both the death benefit and the savings. Premiums are high relative to term because the policy is funding a benefit that will certainly be paid and building the savings; the early years' values are low because acquisition costs come first. It suits estate liquidity, a permanent obligation such as a special-needs dependant, business succession funded by a buy-sell agreement, or a person who wants forced savings with a death benefit attached. Non-forfeiture options let a policyholder who stops paying keep a reduced benefit rather than lose everything. The analysis compares it with term plus separate saving, and with universal life, before recommending it.",
  ],
  example: [
    "Suppose a forty-five-year-old buys a $250,000 policy with a level premium of $5,500 a year. The contract shows a cash value of about $60,000 at year fifteen and $120,000 at year twenty-five, before any dividends. Suppose at sixty-five she stops paying and elects reduced paid-up coverage; the policy continues with no further premium at a smaller benefit, say $190,000, for the rest of her life. Hypothetical figures.",
  ],
  relatedTerms: ["cash-value-life-insurance", "paid-up-additions", "dividend-options", "non-forfeiture-options"],
  relatedProducts: ["whole-life-insurance"],
};
