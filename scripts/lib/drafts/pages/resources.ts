import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Resources and articles",
  lede: "Explainers and how-to guides on the coverage decisions people actually face, plus a glossary of the terms on a declarations page. Written by the advisors, in plain words, with no pitch attached.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Articles cover specifics: preparing a home for monsoon season, what an umbrella policy sits on top of, how a total loss is valued, what a certificate of insurance actually certifies. Each one links to the product it concerns and to the glossary terms it uses. The glossary defines the words a policy uses, one term per page, each with a worked example using hypothetical numbers.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Look up a term", body: "Every word on a declarations page, defined and illustrated.", label: "Open the glossary", href: "/resources/glossary/" },
  ],
  seo: { description: "Insurance explainers, how-to guides and a plain-language glossary from Desert Peak Insurance, written for Arizona, Nevada, Utah and Idaho." },
};
