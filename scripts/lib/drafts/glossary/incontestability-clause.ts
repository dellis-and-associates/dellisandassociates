import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Incontestability clause",
  definition: ["A policy provision that stops the insurer from voiding the coverage for misstatements on the application after the policy has been in force for a set time, commonly two years, while the insured is alive. After that window the carrier must pay the death claim even if it later finds an error or omission in the application."],
  inPractice: ["During the window the insurer can investigate any death claim, pull medical records and rescind the policy if it finds a material misrepresentation, returning the premiums instead of paying the face amount. Outright fraud, non-payment of premium and misstatement of age or sex are typically carved out; age errors are adjusted rather than voided. The clock restarts when a policy is reinstated after a lapse, and a new policy that replaces an old one starts a fresh window, which is one reason to be careful about replacing a policy that is already past it. Honesty on the application remains the practical rule; the provision is a backstop, not a strategy."],
  example: ["Suppose a man omits a heart condition on his application and dies three years later of a stroke. The insurer discovers the omission in the claim file, but the two-year window has closed, so it pays the $250,000 face amount. Suppose instead he had died after fourteen months; the insurer could rescind the policy and refund the premiums. Hypothetical figures."],
  relatedTerms: ["underwriting", "suicide-clause", "policy-lapse"],
  relatedProducts: ["life-insurance"],
};
