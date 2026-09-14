import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Sublimit",
  definition: [
    "A smaller cap inside a policy that applies to one category of loss, sitting beneath the overall figure shown on the declarations page. For that category the headline number does not apply; the inner one does.",
  ],
  inPractice: [
    "Home policies are full of them: jewelry, cash, firearms, silverware, business property and watercraft each carry their own ceiling under contents coverage, often well below what a household actually owns in that category. Commercial property forms do the same for signs, valuable papers, outdoor property and electronic data; cyber forms do it for social engineering losses. The fix is usually a scheduled item endorsement or a raised inner cap for a specific premium. The analysis compares each inner cap to what the client actually has, which is where much of the underinsurance in a home policy hides.",
  ],
  example: [
    "Suppose a home policy carries $200,000 of contents coverage with a $1,500 sublimit for theft of jewelry. A burglar takes a $6,000 engagement ring and nothing else. The policy pays $1,500 less the deductible, not $6,000, even though the contents limit is far from exhausted. Suppose the ring had been scheduled for $6,000 on a separate endorsement; it would have been paid at that amount, and in most forms with no deductible. Hypothetical figures.",
  ],
  relatedTerms: ["floater", "endorsement", "declarations-page"],
  relatedProducts: ["home-insurance", "renters-insurance"],
};
