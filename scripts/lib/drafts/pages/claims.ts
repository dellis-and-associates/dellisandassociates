import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Claims center",
  lede: "A claim is a request to the carrier to pay under the policy. The carrier's adjuster decides it; the office helps you file it properly, read what the adjuster sends, and push back when the numbers are wrong.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Every policy lists a claims phone number and, usually, a claims website or app. Reporting there starts the claim the same day and gives you a claim number, which is the reference for everything that follows. Reporting to the office instead adds a step; we will still pass it along, but the carrier's line is open at hours the office is not.",
          ],
        },
        {
          heading: "What the office does during a claim",
          paragraphs: [],
          bullets: [
            "Explains which coverage responds and what the deductible will be, before you decide whether to file.",
            "Checks the adjuster's estimate against the policy language, especially on depreciation, matching and code upgrades.",
            "Follows up with the carrier when a claim stalls and escalates through the carrier's agency channel when it should.",
            "Tells you honestly when a small loss is better paid out of pocket than filed.",
          ],
        },
      ],
    },
    { type: "cta", heading: "File a claim", body: "Step by step, from the scene to the settlement.", label: "How to file a claim", href: "/claims/how-to-file/" },
  ],
  seo: { description: "Claims help from Desert Peak Insurance: how to report a claim to your carrier, what the office does during a claim, and how to file step by step." },
};
