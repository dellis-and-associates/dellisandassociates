import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Catastrophe bond",
  definition: [
    "A security sold by an insurer or reinsurer to investors, who receive interest but lose some or all of their principal if a defined disaster, such as a hurricane or earthquake above a set size, occurs during the term. It moves disaster risk from the insurance market into the capital markets.",
  ],
  inPractice: [
    "The issuer places the investors' money in a trust; if the trigger is not hit, the money is returned with interest at the end of the term, and if it is, the issuer draws on the trust to pay claims. Triggers can be the issuer's actual losses, an industry loss index, or a physical parameter such as an earthquake's magnitude at a location. They sit alongside traditional reinsurance in a carrier's catastrophe program, usually at the highest layers, and pension funds and hedge funds buy them because the risk is uncorrelated with stock markets. For a client the relevance is indirect but real: they add capacity to the market for wildfire, earthquake and severe-storm risk, and when investor appetite for them is strong, reinsurance prices ease and home insurance in exposed areas becomes easier to place. When appetite weakens, the reverse. The analysis does not track them for individual clients, but they are part of why the market moves.",
  ],
  example: [
    "Suppose a Western insurer issues $200 million of notes that pay investors a coupon of, say, eight percent a year for three years and are triggered if the insurer's losses from a single earthquake exceed $500 million. No such quake occurs, and investors are repaid in full with interest. Suppose instead a large quake on the Wasatch fault causes $700 million of the insurer's losses; the trust pays the insurer $200 million, the investors lose their principal, and the insurer's policyholders are paid. Hypothetical figures.",
  ],
  relatedTerms: ["excess-of-loss-reinsurance", "reinsurance", "policyholder-surplus"],
  relatedProducts: ["earthquake-insurance", "home-insurance"],
};
