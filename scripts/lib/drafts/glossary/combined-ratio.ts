import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Combined ratio",
  definition: [
    "The standard measure of whether an insurer's core business is making or losing money, calculated by adding claims and expenses together and comparing the total with the premium earned. When the total is less than the premium, the company made an underwriting profit; when it is more, the company paid out more in claims and costs than it collected.",
  ],
  inPractice: [
    "It is published for every insurer and for the industry as a whole, and it explains a great deal of what clients experience. When it runs high for a line of business, carriers raise rates, tighten underwriting, non-renew marginal risks and pull out of regions, which is what happened to home insurance in wildfire and hail states. When it runs low, competition returns and rates soften. Because an insurer also earns investment income on the premium it holds, a company can run slightly above break-even on this measure and still be profitable overall, which is why the figure alone does not decide a carrier's strength. Loss ratio is the larger component; the expense ratio, covering commissions, staff and overhead, is the rest. The analysis uses it to explain why a renewal moved rather than to predict what a single client will pay.",
  ],
  example: [
    "Suppose a carrier earns $100 million of premium in a year, pays $68 million in claims and claim expenses, and spends $29 million on commissions and operations. The measure comes to ninety-seven, meaning three dollars of underwriting profit on every hundred of premium, before investment income. Suppose a hail season pushes claims to $80 million; the measure becomes one hundred and nine, and rates in that state rise the following year. Hypothetical figures.",
  ],
  relatedTerms: ["loss-ratio", "underwriting-profit", "policyholder-surplus"],
  relatedProducts: ["home-insurance", "auto-insurance"],
};
