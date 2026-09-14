import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "ADA compliance insurance",
  definition: [
    "Coverage, usually an endorsement to an EPLI or general liability policy, for claims that a business's premises, website or employment decisions failed to accommodate people with disabilities under federal accessibility rules.",
  ],
  inPractice: [
    "Two exposures. Public accommodation claims, over ramps, restrooms, parking, counters and, increasingly, websites that screen readers cannot navigate, are brought by individuals or serial plaintiffs and typically seek an order to fix the barrier plus attorney fees. Employment claims, over failure to accommodate or disability discrimination, fall under EPLI. General liability forms exclude the public accommodation kind because there is no bodily injury, so a specific endorsement is needed, and it is usually defense-only with a modest sublimit, since the carrier will not pay to remodel a building. Retail, restaurants, hotels, medical offices and any business with a customer-facing website are exposed. An accessibility audit is cheaper than the first lawsuit.",
  ],
  example: [
    "Suppose a small hotel receives a complaint that its booking website cannot be used by a blind guest. Defense costs $18,000 before the case settles with a commitment to rebuild the site. An accessibility endorsement with a $25,000 defense sublimit pays the lawyers; the hotel pays for the website work. Hypothetical.",
  ],
  relatedTerms: ["epli-insurance", "employment-practices-liability", "sublimit"],
  relatedProducts: ["retail-business-insurance", "restaurant-insurance"],
};
