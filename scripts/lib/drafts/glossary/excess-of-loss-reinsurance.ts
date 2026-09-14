import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Excess of loss reinsurance",
  definition: [
    "A non-proportional arrangement in which a second insurer pays only the part of a claim, or of a year's claims, that rises above a point the primary insurer has agreed to keep for itself. The primary carrier retains everything below that point and pays a premium for protection above it.",
  ],
  inPractice: [
    "It comes in three forms. Per-risk protection caps the carrier's exposure on any single policy, so, for example, a $10 million building can be written by a carrier that wants to keep no more than $2 million of it. Per-occurrence, or catastrophe, protection caps the carrier's total from one event, such as a hailstorm or wildfire that hits thousands of policies at once; this is the form that matters most for home insurance in the Southwest and Mountain West. Aggregate protection caps the carrier's total for the year. The price of catastrophe protection is set in a global market and rises sharply after bad years, and because it is priced per region, the cost of protecting Arizona hail or Idaho wildfire exposure flows back into rates in those places specifically. The analysis explains this when a client asks why a renewal rose after a season with no claim of their own.",
  ],
  example: [
    "Suppose a home insurer buys catastrophe protection that pays claims from any single event above $20 million, up to $150 million. A monsoon hailstorm across Phoenix produces $90 million of claims. The insurer pays the first $20 million and the reinsurers pay $70 million. Suppose a second storm three weeks later causes $25 million; the insurer pays $20 million again, since the retention applies per event, unless it bought a reinstatement. Hypothetical figures.",
  ],
  relatedTerms: ["reinsurance-treaty", "quota-share-reinsurance", "catastrophe-bond", "reinsurance"],
  relatedProducts: ["home-insurance"],
};
