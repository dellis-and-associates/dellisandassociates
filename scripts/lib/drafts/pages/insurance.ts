import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Insurance products",
  lede: "Every line we write, personal and commercial, with what each policy does, what it commonly excludes and what decides the premium. Start with the one you are about to renew.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Each product page below is written the way an advisor explains the policy at the desk: the coverages that make it up, the limits and deductibles you actually choose, and the claims it does and does not pay. Reading the page for the policy you already hold before requesting the analysis makes the quote flow's questions easier to answer.",
            "Where a rule differs by state, the page says so instead of averaging the four states together. Utah's no-fault auto system is the usual example; Arizona, Nevada and Idaho are at-fault states, and the same auto policy reads differently on either side of that line.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Auto, home, renters, umbrella, life, health, Medicare and commercial insurance from Desert Peak Insurance: what each policy covers, excludes and costs." },
};
