import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Surplus lines",
  definition: [
    "The market for risks the standard, state-licensed insurers will not write, served by non-admitted companies that are allowed to operate in a state without filing their rates and forms. It exists so that an unusual, high-hazard or claim-heavy risk can still be insured somewhere.",
  ],
  inPractice: [
    "Access goes through a specially licensed broker who must first show the risk was declined by the admitted market, a step called a diligent search in most states. Premiums carry a state tax and a stamping fee on top, paid by the policyholder, and the policy usually says plainly that the guaranty fund does not apply. Forms are not standardised, so exclusions, deductibles and cancellation terms need reading rather than assuming. Typical uses in this region: homes in high wildfire zones, vacant buildings, contractors with a loss history, event liability and some short-term rentals. A good agent tries the standard market first and explains the difference before placing a risk here.",
  ],
  example: [
    "Suppose a homeowner in a canyon subdivision is declined by three standard insurers because of wildfire exposure. A broker places the home in the non-admitted market at $4,000 a year plus tax and fees, with a $10,000 wildfire deductible. Suppose the owner clears defensible space and installs ember-resistant vents; two years later a standard insurer may be willing to take it back. Hypothetical figures.",
  ],
  relatedTerms: ["admitted-carrier", "non-admitted-carrier", "surplus-lines-tax", "wildfire-mitigation"],
  relatedProducts: ["home-insurance"],
};
