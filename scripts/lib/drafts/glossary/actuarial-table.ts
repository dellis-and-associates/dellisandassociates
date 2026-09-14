import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Actuarial table",
  definition: [
    "A statistical chart that gives, for each age or other characteristic, the probability of an event an insurer must price, such as death, disability, illness or the need for long-term care. Insurers use them to set premiums and reserves for policies whose claims may not arrive for decades.",
  ],
  inPractice: [
    "Life insurers rely on mortality versions, disability and health insurers on morbidity versions, and pension and annuity providers on longevity versions that project how long payments will run. The figures come from large populations of insured lives, adjusted for the effects of underwriting: people who pass a medical examination die later, as a group, than the population at large, so insured versions show lower rates than general ones. Regulators prescribe standard versions for reserve calculations, while a carrier prices its own products on its own experience, which is why two companies quote the same applicant differently. The charts explain the shape of pricing that clients notice: why term premiums climb steeply with age, why a smoker pays a multiple of a non-smoker, why an annuity pays a woman less per month than a man of the same age. The analysis uses this to explain a quote, not to predict any individual's outcome.",
  ],
  example: [
    "Suppose an insurer's chart shows that among healthy non-smoking men aged forty, about two in a thousand die within the year, and among those aged sixty, about ten in a thousand. To cover $500,000 of death benefit, the pure cost of one year's risk is roughly $1,000 for the forty-year-old and $5,000 for the sixty-year-old, before expenses and profit. Hypothetical figures, to show how the chart drives the premium.",
  ],
  relatedTerms: ["mortality-table", "morbidity-table", "actuary"],
  relatedProducts: ["life-insurance", "term-life-insurance"],
};
