import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Per-occurrence limit",
  definition: [
    "The most a policy pays for any single event, however many people are hurt or how much property is damaged in it. An event that injures three people is still one event; the three claims share the same cap. It sits alongside the aggregate, which caps the policy year as a whole.",
  ],
  inPractice: [
    "How an event is counted matters more than people expect. Policies define an occurrence as an accident, including continuous or repeated exposure to the same harmful conditions, so a leak that damages several units over months may be treated as one occurrence with one limit, not several. On liability forms, defense costs may be paid in addition to the limit or subtracted from it depending on the wording. A contract that asks for a specific per-occurrence figure is asking about this number, and a certificate of insurance shows it on its own line.",
  ],
  example: [
    "Suppose a restaurant's liability policy carries a $500,000 per-occurrence limit. A gas leak injures four customers, and their claims total $700,000. Because the leak is one occurrence, the policy pays $500,000 in total across the four claimants and the restaurant is exposed to the remaining $200,000. Had four unrelated slip-and-fall claims of $175,000 each arisen on different days, each would have had its own $500,000 cap. Hypothetical figures.",
  ],
  relatedTerms: ["aggregate-limit", "self-insured-retention", "certificate-of-insurance"],
  relatedProducts: ["general-liability-insurance", "restaurant-insurance"],
};
