import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Personal injury protection",
  definition: [
    "First-party auto coverage that pays the policyholder's own medical bills, a share of lost wages, and sometimes household help and funeral costs after a crash, no matter who caused it. It is the working part of a no-fault system and is mandatory in the states that use one.",
  ],
  inPractice: [
    "Utah requires it; Arizona, Nevada and Idaho do not, and in those states carriers offer medical payments coverage instead or as well. Where it is required, the state sets a minimum benefit, $3,000 per person in Utah per https://dmv.utah.gov/register/insurance/, and drivers can buy more. It pays quickly because there is no fault argument, and it coordinates with health insurance in a way that varies by carrier: some pay first, some pay after the health plan. Wage replacement is capped and usually starts after a short waiting period. A driver hurt as a pedestrian is covered by their own auto PIP, which surprises people. Buying only the minimum is common and usually a mistake for anyone whose health plan has a high deductible.",
  ],
  example: [
    "Suppose a Utah driver with $10,000 of this coverage is injured by a driver who ran a stop sign. Her emergency room and physical therapy bills total $7,000 and she misses two weeks of work. Her own carrier pays the $7,000 and a capped share of her wages promptly. Suppose bills continue past $10,000; she then claims against the at-fault driver's liability coverage for the rest. Hypothetical figures.",
  ],
  relatedTerms: ["no-fault-insurance", "medical-payments-coverage", "bodily-injury-liability"],
  relatedProducts: ["auto-insurance", "health-insurance"],
};
