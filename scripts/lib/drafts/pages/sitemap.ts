import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Site map",
  lede: "Every public page on the site, grouped the way the navigation groups them. If a page is not listed here, it has moved or does not exist yet; the office can point you to what replaced it.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "The list is generated from the pages the site publishes, so it stays current as product pages, city pages, articles and glossary terms are added. Legal and licensing pages sit under their own heading. Forms and the partner portal are listed where they appear in the navigation.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Site map for Desert Peak Insurance: products, locations, claims, billing, resources, legal and licensing pages." },
};
