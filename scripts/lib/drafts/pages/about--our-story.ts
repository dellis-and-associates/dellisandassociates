import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Our story",
  lede: "Desert Peak Insurance was built around one habit: compare across carriers, show the math, and say plainly when the right answer is to keep what you have. How it started belongs to the people who started it; how it works is explained below.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "What defines the agency is the method, which is the part worth explaining.",
          ],
        },
        {
          heading: "Why independent",
          paragraphs: [
            "A captive agent represents one carrier and can quote only that carrier's products. An independent agency holds appointments with several carriers and owes its duty to the client rather than to any one of them. That structure is what makes a real comparison possible: the same limits and deductibles priced by different companies, each with its own view of your risk. It also means that when a carrier's rates drift away from the market, the policy can be moved instead of the client being told to accept it.",
          ],
        },
        {
          heading: "Show the math",
          paragraphs: [
            "A recommendation without numbers is an opinion. Every finding we send lists the coverages side by side, the limits, the deductibles and the premium for each option, and it names what the recommended option does not cover. If a change costs more, the finding says what the extra premium buys. If it does not buy anything specific, the finding says that too.",
          ],
        },
        {
          heading: "Say when to keep what you have",
          paragraphs: [
            "The analysis is free, and the honest result of a free analysis is often that nothing should change. A policy with the right limits at a fair premium from a carrier that pays claims properly is not improved by moving it. When that is the finding, the recommendation is to renew, and the file waits until something changes: a new car, a home purchase, a business, a birth, or a renewal notice with a premium that no longer fits the coverage.",
          ],
        },
        {
          heading: "Where we work",
          paragraphs: [
            "Licensed in Arizona, Nevada, Utah and Idaho, with the principal advisor, Daniel Ellis, responsible for the practice. The licensing pages name each state's regulator, which is where a license is verified and where a complaint goes if we ever fail to do what this page describes.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Request the analysis", body: "Bring a declarations page. Leave with a written finding.", label: "Request the analysis", href: "/quote/" },
    { type: "disclosure", key: "independentAgency" },
  ],
  seo: { description: "How Desert Peak Insurance works: an independent agency that compares carriers, shows the numbers, and says when keeping your current policy is the right answer." },
};
