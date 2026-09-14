import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "No-fault insurance",
  definition: [
    "A system in which each driver's own carrier pays that driver's medical bills and certain other losses after a crash, regardless of who caused it, in exchange for limits on suing the other party. The coverage that does this is personal injury protection, and whether a state runs the system is set by that state, not chosen by the policyholder.",
  ],
  inPractice: [
    "Of the four states this office serves, Utah is the one that runs this system; Arizona, Nevada and Idaho are at-fault states, where the driver who caused the crash pays through liability coverage. In Utah, personal injury protection pays first for the insured's own injuries; lawsuits for pain and suffering are allowed only above a threshold set by the state: {{TODO:statute.utah.pip-tort-threshold}}. Property damage is not part of the system, so vehicle repairs still follow fault. A driver who moves from Arizona to Utah will find the policy structure changes, and someone commuting between the two should have limits that make sense under both.",
  ],
  example: [
    "Suppose two drivers collide in Utah and both are hurt. Each driver's own PIP pays that driver's medical bills up to its limit, say $3,000 each, without either carrier arguing about fault. Suppose one driver's bills reach $20,000; that driver may then pursue the at-fault driver's bodily injury liability for the rest. Hypothetical figures.",
  ],
  relatedTerms: ["personal-injury-protection", "bodily-injury-liability", "medical-payments-coverage"],
  relatedProducts: ["auto-insurance"],
};
