import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Non-owner policy",
  definition: [
    "Liability coverage for a driver who does not have a car of their own but still drives regularly, whether borrowed, rented or shared. It follows the person rather than a vehicle, pays for injury and damage the driver causes to others, and does not cover damage to the car being driven.",
  ],
  inPractice: [
    "Common reasons to carry one: an SR-22 filing that must be satisfied without a vehicle, keeping continuous liability history so a future auto premium is not rated as a lapse, or frequent use of borrowed cars where the owner's limits are thin. It sits behind the vehicle owner's coverage; the owner's policy pays first and this one responds when those limits are used up. Most carriers exclude cars in the household and any vehicle furnished for regular use, so it is not a way to insure a spouse's car on the cheap. Rental counters sell damage waivers separately because this policy leaves the rental car itself uncovered.",
  ],
  example: [
    "Suppose a driver with a non-owner policy carrying $100,000 per person in bodily injury limits borrows a friend's car and causes a crash. The friend's policy pays first, say $25,000, its limit. The injured party's costs are $60,000, so the non-owner policy pays the $35,000 remainder. The friend's car is repaired under the friend's collision coverage, not this one. Hypothetical figures.",
  ],
  relatedTerms: ["sr-22", "liability-coverage", "policy-lapse"],
  relatedProducts: ["auto-insurance"],
};
