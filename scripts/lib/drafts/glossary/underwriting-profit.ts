import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Underwriting profit",
  definition: [
    "The money an insurer has left from premiums after paying claims and the expenses of running the business, before counting any income from investing those premiums. It measures whether the company priced and selected its risks well, independently of how the markets performed.",
  ],
  inPractice: [
    "Carriers do not need it to survive in every year, because the premium they hold between collection and payout earns investment income, and in periods of high interest rates a company can accept a small deficit on this measure and still return a profit to shareholders or policyholders. When investment returns fall, the pressure to make money on the policies themselves rises, and that pressure reaches clients as rate increases, stricter underwriting and reduced appetite. It is the figure behind the combined ratio and, for a mutual company, the source of policyholder dividends. In a group captive it is the amount that returns to the owners. For a client, the practical reading is that a carrier which has made money on its book for several years is more likely to hold its prices and appetite steady than one that has not. The analysis considers this when choosing between carriers with similar quotes.",
  ],
  example: [
    "Suppose an auto insurer collects $200 million in premium in a year, pays $140 million in claims and claim handling, and spends $50 million on commissions, staff and systems. The remaining $10 million is its result from the policies themselves. Suppose it also earned $12 million investing the float; its total pre-tax result is $22 million. In a year where claims rose to $165 million, the policies would lose $15 million and the investment income would cover most of it. Hypothetical figures.",
  ],
  relatedTerms: ["combined-ratio", "loss-ratio", "policyholder-surplus", "captive-insurance"],
  relatedProducts: ["auto-insurance"],
};
