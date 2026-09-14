import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "D&O insurance",
  definition: [
    "Liability protection for the people who run an organization, covering claims that they mismanaged it: shareholders, regulators, competitors, creditors or employees alleging a wrongful act in their capacity as directors or officers.",
  ],
  inPractice: [
    "Written in three parts. Side A pays individuals directly when the company cannot indemnify them, such as in bankruptcy. Side B reimburses the company for what it pays to indemnify them. Side C covers the entity itself, typically for securities claims at public companies or, for private firms and non-profits, for broader claims. Non-profits buy it because board members are volunteers with personal assets at risk. It is claims-made, excludes fraud proven in court and bodily injury, and defense costs usually erode the limit. Underwriters look at financial statements, litigation history and ownership structure.",
  ],
  example: [
    "Suppose a non-profit's board approves a merger that fails, and a donor group sues the directors for breach of duty. The D&O policy, with a $1,000,000 limit, pays $150,000 in defense and a $200,000 settlement. Suppose the same board had no policy; each director would fund their own defense. Hypothetical.",
  ],
  relatedTerms: ["epli-insurance", "fiduciary-liability-insurance", "claims-made-policy"],
  relatedProducts: ["non-profit-organization-insurance", "business-owners-policy"],
};
