import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "SR-22",
  definition: ["A certificate a carrier files with the state to prove that a driver carries the required liability coverage. It is not a policy or a type of coverage; it is a filing attached to an ordinary auto policy, usually after a licence suspension or a conviction."],
  inPractice: ["The state tells the driver when a filing is required and for how long, usually in the suspension notice or the court order. The carrier files it and must notify the state if the policy cancels, which is why a lapse during the filing period restarts the clock. Not every carrier files them, and a filing usually raises the premium because of the record behind it. A driver who does not own a car can satisfy it with a non-owner policy."],
  example: ["Suppose a driver's licence is reinstated after a suspension and the state requires a filing for three years. The driver buys an auto policy, the carrier files the certificate, and the driver keeps the policy continuous for the whole period. Suppose the policy lapses in month twenty; the carrier reports it, the licence is at risk again, and the period restarts. Hypothetical, to show the mechanism."],
  relatedTerms: ["non-owner-policy", "policy-lapse", "liability-coverage"],
  relatedProducts: ["auto-insurance"],
};
