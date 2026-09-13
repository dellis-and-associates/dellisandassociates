import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Actuary",
  definition: [
    "A professional who uses mathematics and past loss data to estimate how likely future claims are and what they will cost. Insurers, pension plans and regulators employ them to set rates, reserves and the assumptions behind long-term contracts.",
  ],
  inPractice: [
    "Policyholders never meet the actuary, but they feel the work everywhere. The base rate for a territory, the discount for a claims-free history, the mortality table behind a life premium and the reserve an insurer must hold against open claims all come out of actuarial models. Regulators review those filings before a rate can be used.",
    "An actuary sets the price for a class of risk; the underwriter then decides which class a particular applicant belongs in.",
  ],
  example: [
    "Suppose an actuary studies a hypothetical group of 10,000 similar cars insured for one year and finds the group as a whole produced $2,000,000 of collision claims. Spread evenly, that is $200 of expected claim cost per car. Add the insurer's expenses and a margin, and the result becomes the starting rate for that class, before any driver-specific adjustment. The numbers are made up to show the arithmetic.",
  ],
  relatedTerms: ["underwriting", "loss-ratio", "mortality-table"],
  relatedProducts: ["life-insurance", "auto-insurance"],
};
