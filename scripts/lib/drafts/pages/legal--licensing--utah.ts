import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Licensing disclosures (Utah)",
  lede: "{{TODO:site.legalName}} is licensed to sell insurance in Utah. The disclosure below identifies the license; the Utah Insurance Department is where it can be verified.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "A Utah producer license permits its holder to sell, solicit or negotiate insurance in the lines it lists, and an agency license requires a designated responsible producer who answers to the regulator for the agency's conduct. Utah differs from the other three states the agency serves in one way that matters on every auto policy: it is a no-fault state, and personal injury protection pays an injured person's own medical bills first, regardless of who caused the crash. The agency's Utah pages are written with that in mind.",
          ],
        },
      ],
    },
    { type: "disclosure", key: "stateLicensing" },
    {
      type: "richText",
      sections: [
        {
          heading: "Checking the license",
          paragraphs: [
            "The Utah Insurance Department licenses producers and agencies in the state and maintains a public licensee search. Use it to confirm that the agency and the advisor you are working with are licensed and in good standing for the line you are buying. The Department also takes complaints from consumers about licensees and carriers; the office would rather hear a complaint first, but that is your choice, not a condition.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Utah insurance producer licensing disclosure for Desert Peak Insurance, and how to check the license with the Utah Insurance Department." },
};
