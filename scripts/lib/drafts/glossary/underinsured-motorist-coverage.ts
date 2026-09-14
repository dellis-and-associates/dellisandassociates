import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Underinsured motorist coverage",
  definition: [
    "The part of an auto policy that pays the policyholder's own injury claim when the at-fault driver has liability insurance but not enough of it. It fills the gap between the other driver's limit and the policyholder's actual loss, up to the amount purchased.",
  ],
  inPractice: [
    "How the gap is measured varies by state and it changes the answer a lot. Under a difference-of-limits rule the coverage pays only the amount by which the policyholder's limit exceeds the at-fault driver's; under an add-on rule it pays on top of whatever the other driver paid. Arizona uses the add-on approach: {{TODO:statute.arizona.uim-add-on}}. It is bought with uninsured motorist coverage and usually at the same limits as the policyholder's own liability. Carriers must offer it in most states and a rejection has to be in writing. A claim under it is a claim against the policyholder's own carrier, so the carrier can contest the value of the injury; keep the same records as for a liability claim.",
  ],
  example: [
    "Suppose a driver is hit by someone carrying $25,000 of bodily injury liability, and the injuries are worth $90,000. The at-fault carrier pays its $25,000. With $100,000 of this coverage under an add-on rule, the driver's own carrier pays the $65,000 balance. Under a difference-of-limits rule it would pay $75,000 at most, which still covers the balance here, but with $50,000 of coverage it would pay only $25,000. Hypothetical figures.",
  ],
  relatedTerms: ["uninsured-motorist-coverage", "bodily-injury-liability", "stacking"],
  relatedProducts: ["auto-insurance"],
};
