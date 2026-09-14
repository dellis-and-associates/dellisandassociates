import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  lede: "An independent insurance agency licensed in Arizona, Nevada, Utah and Idaho. We compare your current policy against the carriers we represent, show the numbers, and say when keeping what you have is the right call. The analysis costs nothing.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "The analysis starts with what you already have. Send a declarations page, or answer the questions in the quote flow, and a licensed advisor reads the limits and deductibles against what you own, owe and earn. Gaps get marked, duplicated coverage gets marked, and the same coverages are priced with each carrier we hold an appointment with.",
            "You get a written finding with the numbers side by side: what changes, what it costs, and what it does not buy you. Sometimes the finding is that your current policy is priced fairly and the limits fit; in that case the recommendation is to renew, and we tell you so. There is no fee for the analysis and no obligation to move.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Desert Peak Insurance compares your current auto, home, life, health and commercial policies across the carriers it represents. Independent, licensed in Arizona, Nevada, Utah and Idaho, and the analysis costs nothing." },
};
