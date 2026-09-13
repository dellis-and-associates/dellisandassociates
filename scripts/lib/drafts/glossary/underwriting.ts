import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Underwriting",
  definition: [
    "The process an insurer uses to decide whether to accept a risk, and at what price and on what conditions. It weighs the application, outside records such as prior claims and, for life and health policies, medical history, against the insurer's own rules and rates.",
  ],
  inPractice: [
    "Underwriting is why two neighbours with similar houses can pay different premiums, and why an application can come back accepted, accepted with conditions, or declined. Conditions can include a higher deductible, an exclusion, a required repair, or a higher rate class.",
    "It does not end at issue. A claim, a new driver in the household, or a lapse can trigger a fresh look at renewal, and a material misstatement on the application can void a policy later.",
  ],
  example: [
    "Suppose two applicants each ask for a hypothetical $500,000 term life policy. One is a non-smoker with normal blood pressure; the other smokes and has a chronic condition under treatment. Underwriting places the first in a preferred rate class and the second in a standard or rated class, so the second pays more each month for the same $500,000. The insurer might also ask the second applicant for a physician's statement before issuing.",
  ],
  relatedTerms: ["premium", "actuary", "exclusion"],
  relatedProducts: ["life-insurance", "home-insurance"],
};
