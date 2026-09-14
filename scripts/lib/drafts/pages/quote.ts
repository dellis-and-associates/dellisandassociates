import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Get a quote",
  lede: "Pick a line below and answer a few questions. A licensed advisor prices the same coverages with the carriers we represent and sends a written finding. It costs nothing, and if your current policy is the right one, that is what the finding says.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "The quote flow asks for what a carrier needs to rate you: who is insured, what is insured, where it is kept, and the limits and deductibles you carry now. A declarations page answers most of it in one upload. Your answers are held in a session so you can leave and come back; nothing goes to a carrier until an advisor has read it.",
            "You will not get a number on the screen. Carrier rates depend on reports the carrier orders after the request, and a figure produced before those come back would be a guess. Expect a reply from an advisor with real numbers rather than an estimate from a form.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Request an insurance quote and analysis from Desert Peak Insurance. Auto, home, life, health, Medicare and commercial lines compared across carriers at no cost." },
};
