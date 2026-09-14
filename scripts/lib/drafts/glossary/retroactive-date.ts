import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Retroactive date",
  definition: [
    "The point in time, printed on the declarations of a claims-made policy, before which acts, errors or omissions are not covered no matter when the claim arrives.",
  ],
  inPractice: [
    "It is typically set at the day the insured first bought continuous claims-made coverage and carried forward at each renewal or change of carrier. Letting it advance to the current day, which a new carrier may offer in exchange for a lower premium, wipes out coverage for every earlier year's work. Ask for full prior acts, meaning the original date is preserved. A gap in coverage usually resets it; a lapse of even a few weeks can cost years of protection. Check it on every renewal and on every quote from a competing carrier.",
  ],
  example: [
    "Suppose an accountant has held claims-made coverage since a start date in year one and switches carriers in year six. The new quote sets the date at year six. If a year-four tax return is challenged in year seven, the new policy declines because the act predates its date. Suppose instead the accountant insisted the year-one date be carried over; the claim is covered. Hypothetical.",
  ],
  relatedTerms: ["claims-made-policy", "prior-acts-coverage", "policy-lapse"],
  relatedProducts: ["professional-liability-eo-insurance"],
};
