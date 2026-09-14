import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Loss ratio",
  definition: [
    "Claims paid divided by premium collected, for a carrier, a line of business or a single account, over a period. It is the basic measure of whether a book of insurance is priced correctly: the higher the figure, the more of each premium dollar is going back out as claims and claim expenses.",
  ],
  inPractice: [
    "For a policyholder the number matters in two ways. Carriers set rates by territory and class using it, so an area where roof claims have run high sees higher home premiums even for a house with no claims. And a commercial account is often judged on its own record: an underwriter renewing a fleet or a contractor looks at premium in versus claims out over three to five years, and a high figure brings a rate increase, a higher deductible, or a non-renewal. A figure below the carrier's target leaves room for expenses and profit; above it, the account is losing the carrier money.",
  ],
  example: [
    "Suppose a small trucking company paid $40,000 in premium last year and its carrier paid $30,000 in claims on the account. The account ran at 75 percent. If the carrier's expenses take another 30 cents of every premium dollar, that account lost money for the carrier, and the renewal will reflect it. Hypothetical figures.",
  ],
  relatedTerms: ["underwriting", "premium", "actuary"],
  relatedProducts: ["commercial-auto-insurance"],
};
