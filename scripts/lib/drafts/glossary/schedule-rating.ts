import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Schedule rating",
  definition: [
    "A set of discretionary credits or debits an underwriter applies to a commercial premium based on characteristics of the business that the standard classification does not capture. Safety programs, management experience, condition of premises, employee selection and training, and the quality of equipment are the usual categories.",
  ],
  inPractice: [
    "The credits and debits are capped by a filed maximum in each state, applied on top of the manual premium and the experience modification, and, unlike the experience modification, they are judgment calls. That makes them negotiable. An underwriter who sees a written safety manual, a return-to-work plan, a clean loss control report and a stable workforce has grounds for a credit; one who sees a cluttered shop and high turnover has grounds for a debit. Because the factors are subjective, they differ from carrier to carrier for the same business, which is one reason quotes differ. Some states restrict or prohibit the practice for small policies. The analysis presents the business's case to the underwriter in the categories the filing lists, which is what earns the credit.",
  ],
  example: [
    "Suppose a printing company's premium after the experience modification is $30,000. The underwriter grants a fifteen percent credit for a documented safety program, forklift certification and a loss control visit with no recommendations, bringing the premium to $25,500. A competitor quotes the same business with no credit at $30,000 because its underwriter never saw the documentation. Hypothetical figures, to show that the paperwork is worth money.",
  ],
  relatedTerms: ["manual-rate", "experience-modification-rate", "underwriting"],
  relatedProducts: ["workers-compensation-insurance", "general-liability-insurance"],
};
