import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Non-admitted carrier",
  definition: [
    "An insurer that has not been licensed by a given state's insurance department and so writes policies there only through the surplus lines market, on forms and at prices the state does not approve. It is regulated in its home jurisdiction and must meet eligibility standards, but it operates outside the state's rate and form filing system.",
  ],
  inPractice: [
    "The freedom to set its own terms is why it exists: it can insure risks the admitted market declines, such as older homes in wildfire zones, vacant buildings, new ventures, and unusual liability. The trade-offs are concrete. Its policyholders are not protected by the state guaranty fund if it fails, its forms can differ from the standard ones in ways that matter at claim time, its cancellation rights are often broader, and surplus lines tax is added to the premium. The broker must first seek coverage from admitted carriers and document their refusal. Many well-capitalised insurers write both admitted and non-admitted business through separate companies, so the label says nothing about financial strength by itself; the financial strength rating does. The analysis explains the differences before placement and never treats the surplus market as a first choice when an admitted option exists.",
  ],
  example: [
    "Suppose a couple buys a cabin with a wood-shake roof in a mapped high-fire zone, and three admitted carriers decline it. The agent places it with a surplus lines insurer at $4,500 plus tax, on a form that excludes wildfire once a fire is burning within a set distance and allows cancellation on shorter notice than an admitted policy. The couple accepts, replaces the roof over the next year, and the analysis is repeated to see whether an admitted carrier will now take it. Hypothetical figures.",
  ],
  relatedTerms: ["admitted-carrier", "surplus-lines", "surplus-lines-tax", "financial-strength-rating"],
  relatedProducts: ["home-insurance"],
};
