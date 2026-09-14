import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "ERISA bond",
  definition: [
    "A federally mandated form of coverage that protects an employee benefit plan against loss from fraud or dishonesty by the people who handle its money.",
  ],
  inPractice: [
    "Anyone who receives, disburses or manages plan assets must be covered, including the owner. The amount is fixed by federal rule as a proportion of the assets handled, subject to a cap, and the plan itself must be the named insured. It is inexpensive and often written for a three-year term. It is not fiduciary liability coverage: it pays for theft, not for bad decisions. Plan auditors and the annual filing ask whether it is in place, and a missing one is a common audit finding for small plans. Many carriers issue it as a standalone form; some crime policies can be endorsed to add it.",
  ],
  example: [
    "Suppose a small firm's retirement plan holds $400,000 and the office manager who processes deposits diverts $30,000 into a personal account. The plan claims under the form, which has a $50,000 limit, and is made whole; the employer separately pursues the manager. Hypothetical figures.",
  ],
  relatedTerms: ["fiduciary-liability-insurance", "fidelity-bond", "crime-insurance"],
  relatedProducts: ["surety-bonds"],
};
