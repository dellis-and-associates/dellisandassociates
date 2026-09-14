import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Carrier partners",
  lede: "An independent agency holds appointments with several carriers rather than working for one. This page explains what an appointment is and how it shapes the analysis.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "An appointment is a carrier's authorization for a licensed agency to sell and service its policies. The carrier vets the agency, files the appointment with the state regulator, and from then on the agency can quote, bind and service that carrier's products. Without an appointment, an agency can only refer you somewhere else.",
          ],
        },
        {
          heading: "What it means for you",
          paragraphs: [
            "Because we hold appointments with more than one carrier, the analysis can price the same limits and deductibles with each and place the policy where it fits. Carriers have different appetites: one prices older homes well, another prefers long clean driving records, a third writes the small commercial risks the others decline. The carrier list on this page is maintained by the office and changes as appointments are added or ended.",
            "Compensation comes from the carrier as a commission on the policy placed, at a rate the carrier sets. The independent-agency disclosure below states it in the words counsel approved.",
          ],
        },
      ],
    },
    { type: "disclosure", key: "independentAgency" },
  ],
  seo: { description: "What a carrier appointment is, why an independent agency holds several, and how Desert Peak Insurance uses them to compare the same coverage across carriers." },
};
