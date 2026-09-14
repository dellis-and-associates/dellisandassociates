import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Meet the team",
  lede: "The licensed advisors who read your declarations page and write the finding. Each profile lists the states the advisor is licensed in and the lines they work on.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Desert Peak Insurance is led by its principal advisor, Daniel Ellis. Every advisor listed here holds a state producer license, which the state regulator issues after an examination and renews on a fixed cycle with continuing education. That license is what allows an advisor to recommend a policy and to place it, and it is what you can verify with the state Department of Insurance.",
            "When you request an analysis, one advisor owns it from the first conversation to the written finding. If you would rather work with a particular person, say so in the request and the office will route it to them.",
          ],
        },
      ],
    },
  ],
  seo: { description: "The licensed advisors at Desert Peak Insurance, led by principal advisor Daniel Ellis, with the states and lines each one works in." },
};
