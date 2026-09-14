import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Licensing disclosures (Nevada)",
  lede: "{{TODO:site.legalName}} holds a Nevada insurance producer license. This page states the license and names the Nevada regulator where it can be checked.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Nevada licenses both the business entity and each individual producer who acts for it, and the entity must designate a licensed individual responsible for its compliance. A producer may transact only the lines of authority shown on the license; property, casualty, life and health are separate authorities, each with its own examination. Nevada is an at-fault state for auto liability, and the agency's product pages describe Nevada coverage on that basis.",
          ],
        },
      ],
    },
    { type: "disclosure", key: "stateLicensing" },
    {
      type: "richText",
      sections: [
        {
          heading: "Where to verify the license",
          paragraphs: [
            "The Nevada Division of Insurance, part of the state's Department of Business and Industry, issues producer licenses and keeps a public lookup where the status of the agency's license and of any individual advisor can be confirmed. The Division also handles consumer complaints about producers and insurers doing business in Nevada. Ask the office for the license number if it is not shown above, and take any unresolved complaint to the Division.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Nevada insurance producer licensing disclosure for Desert Peak Insurance, and how to verify the license with the Nevada Division of Insurance." },
};
