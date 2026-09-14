import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Base flood elevation",
  definition: [
    "The height, in feet above a reference datum, that water is expected to reach in the storm that has a one-in-a-hundred chance of happening in any year. It appears on flood maps for high-risk zones and is the line against which a building's lowest floor is measured.",
  ],
  inPractice: [
    "It sets the target for construction and the benchmark for rating. Communities that participate in the federal program require new buildings in high-risk zones to have the lowest floor at or above this line, often with an added freeboard margin; existing buildings below it pay more for coverage and can be hard to insure privately. The gap between the line and the actual floor, positive or negative, is what an elevation certificate records. Raising a structure, fitting a crawlspace with flood vents, or moving utilities above the line are the standard ways to improve the number. In the desert Southwest the mapped line can be shallow but still costly, since a foot of water across a slab does most of the damage a deeper flood would. The analysis asks for the certificate first and the quote second.",
  ],
  example: [
    "Suppose a floodplain map gives a line of 1,205 feet at a lot near a wash. A house whose lowest floor is at 1,207 feet sits two feet above it and is rated favourably. A neighbouring house with a finished basement floor at 1,201 feet sits four feet below, and its premium might be three times higher, say $3,000 against $1,000. Hypothetical figures, to show how the same map produces very different prices next door.",
  ],
  relatedTerms: ["elevation-certificate", "flood-zone", "nfip"],
  relatedProducts: ["flood-insurance"],
};
