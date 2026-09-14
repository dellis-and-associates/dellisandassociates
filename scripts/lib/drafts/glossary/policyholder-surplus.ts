import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Policyholder surplus",
  definition: [
    "The amount by which an insurer's assets exceed its liabilities, including the reserves it holds for claims it expects to pay. It is the company's cushion: the money available to absorb losses larger than the reserves anticipated.",
  ],
  inPractice: [
    "Regulators and rating agencies watch it in relation to the premium the company writes, since a company writing many times its cushion in premium has little margin for a bad year, and regulators set capital requirements below which they step in. The figure appears in the annual statement every insurer files and in the rating agencies' reports, and it is one of the numbers behind a financial strength rating. For a client the point is practical: a large, well-capitalised carrier can pay a wildfire season's claims without strain, while a thinly capitalised one may be unable to, and may be placed into receivership, leaving policyholders to the state guaranty fund. A mutual insurer's cushion belongs to its policyholders and funds dividends in good years; a stock insurer's belongs to shareholders. The analysis looks at it alongside the grade, particularly for regional or specialty carriers.",
  ],
  example: [
    "Suppose an insurer holds $500 million of assets against $380 million of liabilities, leaving a cushion of $120 million, and writes $240 million of premium a year. A regional hailstorm produces $60 million of claims above what it reserved; the cushion absorbs it and the company continues, though its rating agency may lower its outlook. Suppose the cushion had been $40 million instead; the same storm would have wiped out most of it and drawn the regulator in. Hypothetical figures.",
  ],
  relatedTerms: ["financial-strength-rating", "a-m-best-rating", "combined-ratio", "reinsurance"],
  relatedProducts: ["home-insurance"],
};
