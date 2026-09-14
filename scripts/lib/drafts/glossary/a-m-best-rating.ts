import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "A.M. Best rating",
  definition: [
    "A letter grade assigned to an insurer by a long-established independent agency that specialises in evaluating the financial condition of insurance companies. The scale runs from A++ at the top through A+, A, A-, B++ and downward; the top four grades are considered secure.",
  ],
  inPractice: [
    "It answers the question a policyholder should ask before price: will this company be able to pay a large claim years from now? The analyst reviews the insurer's capital relative to the risks it writes, its operating performance, its business profile and its risk management, and publishes both the grade and an outlook. Lenders and contracts often specify a minimum, such as A- or better, for any insurer on a certificate of insurance, and surplus lines placements are commonly restricted to insurers at or above a set grade. A downgrade can trigger a lender's demand to replace the policy. Other agencies publish comparable grades, and a company may hold several. The analysis states the grade of every carrier quoted and does not recommend one below the secure range without saying so plainly.",
  ],
  example: [
    "Suppose a contractor's lender requires property coverage from an insurer graded A- or better. The lowest quote is from a company graded B+ at $9,000; the next is from an A-rated company at $10,200. The B+ policy would be refused by the lender, so the comparison is between the A quote and the next admitted option, not the lowest one on the page. Hypothetical figures.",
  ],
  relatedTerms: ["financial-strength-rating", "policyholder-surplus", "admitted-carrier"],
  relatedProducts: ["home-insurance", "general-liability-insurance"],
};
