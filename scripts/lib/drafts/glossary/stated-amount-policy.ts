import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Stated amount policy",
  definition: [
    "A way of insuring a vehicle or item that names a figure on the declarations as the most the carrier will pay, while still settling a loss at the lowest of that figure, the cost to repair, or actual cash value.",
  ],
  inPractice: [
    "It is often mistaken for agreed value, and the mistake shows up at claim time. The figure caps the payout; it does not promise it. If the market has fallen, the carrier pays market. If the owner set the figure too low, the carrier pays no more than it. It is used for commercial vehicles with custom equipment, older trucks, and specialty vehicles when a carrier will not write agreed value, and for scheduled personal property on some home policies. Buyers should ask which of the two forms a quote uses, and read the loss settlement clause rather than the marketing sheet.",
  ],
  example: [
    "Suppose a tow truck is insured for a stated amount of $60,000. It is destroyed and the adjuster puts its actual cash value at $52,000. The carrier pays $52,000 less the deductible. Suppose instead the market value were $65,000; the carrier pays $60,000, the cap. Hypothetical.",
  ],
  relatedTerms: ["agreed-value-policy", "actual-cash-value", "declarations-page"],
  relatedProducts: ["commercial-auto-insurance"],
};
