import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Appraisal clause",
  definition: [
    "A provision in most property policies that lets either side demand a formal valuation when the two disagree about how much a covered loss is worth. Each party hires its own appraiser, the two pick an umpire, and any two of the three set the amount, which is binding.",
  ],
  inPractice: [
    "It is a tool for arguments about amount, not about coverage. If the carrier says the loss is excluded, the process does not apply; if it agrees the roof is covered but values it at half what the contractor bid, it does. Each side pays its own appraiser and splits the umpire, so it suits losses large enough to justify the fees. Invoking it is done in writing, and the policy usually sets a timeframe for naming appraisers. It is faster and cheaper than a lawsuit, and it does not prevent one on coverage questions later. Reading the clause before a dispute arises tells the owner whether the carrier can also demand it, which most forms allow.",
  ],
  example: [
    "Suppose a kitchen fire produces a carrier estimate of $40,000 and a contractor estimate of $70,000, with no dispute that the fire is covered. The homeowner invokes the clause; each side's appraiser costs about $2,000, the umpire another $2,000 split. The umpire sides mostly with the contractor at $62,000, and the carrier pays that less the deductible. Hypothetical figures.",
  ],
  relatedTerms: ["adjuster", "claim", "replacement-cost"],
  relatedProducts: ["home-insurance"],
};
