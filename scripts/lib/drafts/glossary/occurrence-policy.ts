import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Occurrence policy",
  definition: [
    "A form of liability coverage that responds to injury or damage that happens during the term, no matter how many years later the claim is brought.",
  ],
  inPractice: [
    "General liability and most auto and home liability coverage are written on this basis. Each year's policy stays responsible for what happened that year, so a contractor's old policies remain live for defects that surface later. That is why records of expired policies matter: a claim about work done years ago is tendered to the carrier that insured that year. Premium is stable but starts higher than a claims-made form, because the carrier is pricing an open-ended future. Coverage disputes centre on when the damage occurred, since continuous or slowly developing damage can trigger several policy years at once.",
  ],
  example: [
    "Suppose a roofer replaces a roof in a year when the roofer carried a $1,000,000 occurrence policy, and the roof leaks and damages the interior three years later. The owner's claim goes to the policy from the installation year even though the roofer has since changed carriers twice. If the leak developed across two policy years, both might be tendered. Hypothetical.",
  ],
  relatedTerms: ["claims-made-policy", "per-occurrence-limit", "aggregate-limit"],
  relatedProducts: ["general-liability-insurance", "contractors-insurance"],
};
