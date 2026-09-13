import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Policy lapse",
  definition: ["A gap in protection that opens when one contract ends, through non-payment or cancellation, before the next one begins. During the gap no policy responds to a loss, and the gap itself becomes part of your record."],
  inPractice: ["For auto insurance the state's verification program sees a cancelled policy with no replacement and sends notice; a licence or registration suspension can follow. Carriers also rate a driver with a recent gap as a higher risk, so the next policy costs more. When switching carriers, start the new policy on the day the old one ends, not the day after, and cancel the old one only after the new one is in force."],
  example: ["Suppose a payment is missed and the policy cancels on the tenth of the month; a new policy is bought on the twentieth. For ten days there was no coverage, and an accident on the fifteenth would have been paid by no one. Suppose instead the new policy had started on the tenth: no gap, no notice. Hypothetical."],
  relatedTerms: ["grace-period", "sr-22", "binder"],
  relatedProducts: ["auto-insurance", "home-insurance"],
};
