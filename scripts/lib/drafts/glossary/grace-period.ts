import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Grace period",
  definition: ["A short window after a premium due date during which the policy stays in force even though the payment is late. It exists so a missed date does not become a gap in coverage, and its length is set by the policy or by state rule."],
  inPractice: ["Life policies commonly have one written into the contract; auto and home policies vary by carrier and state, and some have none, cancelling on the date in the notice. A payment made inside the window keeps the policy continuous; a payment made after it may mean a new policy, a new application and a record showing a gap."],
  example: ["Suppose a premium is due on the first and the policy allows a window through the end of the month. A claim on the tenth is covered even though the payment arrives on the twelfth. Suppose the payment arrives on the fifth of the following month; the policy has lapsed and the claim would not be paid. Hypothetical, to show why the date matters."],
  relatedTerms: ["policy-lapse", "premium", "binder"],
  relatedProducts: ["life-insurance", "auto-insurance"],
};
