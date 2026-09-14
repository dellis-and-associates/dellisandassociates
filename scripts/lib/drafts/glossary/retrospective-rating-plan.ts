import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Retrospective rating plan",
  definition: [
    "A way of pricing a large commercial policy in which the final premium is worked out after the term ends, from the losses that actually occurred, within a minimum and maximum agreed at the start. The insured pays a deposit premium, and the figure is adjusted, up or down, at intervals as claims develop.",
  ],
  inPractice: [
    "It is offered to employers whose premium is large enough that their own losses are statistically meaningful, most often on workers compensation and sometimes on general liability and auto. The formula converts losses to premium using a loss conversion factor that covers claim handling, adds a basic premium for the carrier's expenses and profit, and applies a tax multiplier; the minimum protects the carrier's expenses and the maximum protects the insured from a catastrophic year. Adjustments run for several years after the policy ends because claims keep developing, so a business must be able to fund a later bill. Good loss control and a strong return-to-work program pay back directly, since every dollar of avoided loss reduces premium. The analysis models the plan against the insured's last five years of losses before recommending it over a guaranteed cost policy.",
  ],
  example: [
    "Suppose a staffing company's standard premium would be $500,000. Under a plan with a minimum of $300,000 and a maximum of $650,000, it pays a $400,000 deposit. Its incurred losses for the year come to $150,000; after the conversion factor and basic premium, the adjusted premium is $360,000 and the carrier refunds $40,000. Suppose losses had been $500,000 instead; the formula would exceed the maximum, and the company would owe an additional $250,000. Hypothetical figures.",
  ],
  relatedTerms: ["guaranteed-cost-policy", "loss-sensitive-program", "experience-modification-rate"],
  relatedProducts: ["workers-compensation-insurance"],
};
