import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Admitted carrier",
  definition: [
    "An insurer licensed by a state's insurance department to sell policies there, with its rates and forms filed with and approved by that department. Licensing brings two protections: the state guaranty fund stands behind its claims if it becomes insolvent, and its policy language and pricing have been reviewed by a regulator.",
  ],
  inPractice: [
    "Most personal lines, standard auto, home, and life, are written this way, and it is the default an agent looks for. The trade-off is flexibility: a licensed company can only use approved forms and rates, so a risk that does not fit its filed rules, an older home with a wood shake roof or a business with a claims history, may be declined. That is when the surplus lines market comes in. When comparing quotes, the distinction matters more than the price: a lower premium from a non-admitted company means no guaranty fund protection, and a policy form that may differ from what the reader expects.",
  ],
  example: [
    "Suppose a homeowner receives two quotes on a rural home, one for $2,000 from an admitted company and one for $1,700 from a non-admitted one. If the non-admitted insurer fails mid-claim, the state fund does not step in; with the admitted insurer it does, up to the fund's cap. Hypothetical figures.",
  ],
  relatedTerms: ["surplus-lines", "underwriting", "non-admitted-carrier"],
  relatedProducts: ["home-insurance"],
};
