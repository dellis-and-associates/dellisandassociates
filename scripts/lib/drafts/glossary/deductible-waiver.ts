import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Deductible waiver",
  definition: [
    "A provision that removes the policyholder's share of a claim in a specific situation, so the insurer pays from the first dollar. It is usually tied to a circumstance the carrier chooses to reward or considers outside the policyholder's control, and it is written into the policy or added by endorsement rather than decided claim by claim.",
  ],
  inPractice: [
    "The common versions: glass claims on auto policies where windshield repair is paid in full; collision claims where the other driver is identified and clearly at fault; and, in some states, uninsured motorist property damage. Home policies rarely include one, though a few carriers reduce the deductible after several claim-free years. The condition matters: a waived collision deductible for a not-at-fault crash usually requires the other driver to be identified, so a hit-and-run does not qualify. Waiving glass raises the premium a little, and whether it is worth buying depends on the vehicle's glass and how much of it carries sensors.",
  ],
  example: [
    "Suppose a driver carries a $500 collision deductible with a waiver for not-at-fault losses. A stranger backs into the parked car and leaves a note. The repair is $2,000; the insurer pays all of it, then pursues the other driver's carrier. Had the car been hit by an unknown vehicle, the driver would pay the $500 first. Hypothetical figures.",
  ],
  relatedTerms: ["deductible", "collision-coverage", "comprehensive-coverage"],
  relatedProducts: ["auto-insurance"],
};
