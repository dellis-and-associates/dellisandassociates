import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Co-insurance",
  definition: [
    "A clause in commercial property and some home contracts requiring the owner to carry a limit equal to a stated share of the building's full value, with a penalty at claim time if the limit falls short. It exists because partial losses are far more common than total ones, and without it people would buy a small limit and still collect on most claims.",
  ],
  inPractice: [
    "The penalty applies to partial losses, which is where it stings. The insurer compares the limit actually bought with the limit that should have been carried and pays only that fraction of the loss, less the deductible. Building values drift upward with construction costs, so a limit that met the clause at purchase can fall short two renewals later. Agreed value endorsements suspend the clause for a year in exchange for a signed statement of values. In health insurance the same word means something different: the share of a bill the patient pays after the deductible.",
  ],
  example: [
    "Suppose a building worth $500,000 is insured with an 80 percent clause, so the required limit is $400,000, but the owner bought $300,000. A fire causes $100,000 of damage. The insurer pays $300,000 divided by $400,000, or three quarters of the loss: $75,000 less the deductible. The owner absorbs the rest. Hypothetical figures.",
  ],
  relatedTerms: ["replacement-cost", "deductible", "coinsurance"],
  relatedProducts: ["business-owners-policy"],
};
