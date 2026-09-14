import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "OSHA recordable incident",
  definition: [
    "A work-related injury or illness serious enough that federal safety rules oblige the employer to log it, as distinct from a minor first-aid case. Death, days away from work, restricted duty, job transfer, loss of consciousness, or any treatment beyond first aid all qualify.",
  ],
  inPractice: [
    "The log is a safety record, not an insurance document, but underwriters read it closely. Rates computed from the log and hours worked are a standard question on workers compensation and general liability applications, and a figure well above the trade's norm draws a surcharge, a loss control visit or a decline. A general contractor's prequalification form usually asks for the same figure with the experience modification rate beside it. What counts is often misunderstood: a cut closed with stitches is recordable, the same cut closed with a butterfly bandage is not; a prescription-strength painkiller makes a case recordable, an over-the-counter one does not. Many entries never become insurance claims, and some claims never make the log, so the two records should be reconciled before renewal. The analysis reviews both.",
  ],
  example: [
    "Suppose a machine shop with twenty employees logs eight cases in a year: three with days away, five with treatment beyond first aid. Its rate per full-time-equivalent employee comes out far above its industry's, and the carrier attaches a surcharge of, say, $6,000 to a $40,000 premium and requires a safety consultation. The following year the shop logs two cases, and the surcharge is removed at renewal. Hypothetical figures.",
  ],
  relatedTerms: ["experience-modification-rate", "return-to-work-program", "underwriting"],
  relatedProducts: ["workers-compensation-insurance", "contractors-insurance"],
};
