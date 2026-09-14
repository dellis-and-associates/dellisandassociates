import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Medical payments coverage",
  definition: [
    "An optional part of an auto or home policy that pays reasonable health-care bills for people hurt in a covered situation, without regard to fault. On an auto policy it applies to the driver and passengers of the insured car; on a home policy it applies to guests injured on the property, not to household members.",
  ],
  inPractice: [
    "It is a small, fast coverage. Auto limits are usually modest and the point is to pay ambulance, emergency room and follow-up bills promptly while fault is sorted out; it also covers the policyholder as a pedestrian or cyclist struck by a car. It does not replace health insurance, but it pays deductibles and co-pays health insurance leaves behind, and it matters more for people with high-deductible plans. On a home policy the guest version is a goodwill tool: paying a visitor's urgent care bill after a fall usually prevents a liability claim. In Utah, personal injury protection performs the auto function and this coverage is less common.",
  ],
  example: [
    "Suppose a family of four is rear-ended and each person has $1,500 of emergency room bills. With $5,000 per person of this coverage on their own policy, all four bills are paid within weeks, and their carrier later recovers from the at-fault driver's insurer. Without it, the family waits for the liability claim to resolve or pays their health plan's deductibles first. Hypothetical figures.",
  ],
  relatedTerms: ["personal-injury-protection", "bodily-injury-liability", "deductible"],
  relatedProducts: ["auto-insurance", "home-insurance"],
};
