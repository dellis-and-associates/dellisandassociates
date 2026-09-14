import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Claim status lookup",
  lede: "Claim status lives with the carrier, not the agency. This page explains where to look, what the stages mean, and when the office can move a claim along.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "The carrier handling your claim keeps the file, and its claims portal or app shows the status against your claim number. The office does not run a separate tracking system, because a second copy would always lag the first. If you do not know which carrier has the claim or where its portal is, send the office your policy number or your name and we will find it.",
          ],
        },
        {
          heading: "What the stages mean",
          paragraphs: [],
          bullets: [
            "Reported or open: the claim has a number and is waiting to be assigned.",
            "Assigned or under investigation: an adjuster has it and is gathering facts, statements and photos.",
            "Estimate in progress: the adjuster or a contractor is pricing the damage.",
            "Pending documents: the carrier is waiting on you for something, usually a receipt, a statement or a signed form.",
            "Approved or payment issued: the carrier has decided and money is on its way.",
            "Closed: paid, denied or withdrawn.",
          ],
        },
        {
          heading: "When to involve the office",
          paragraphs: [
            "A claim that has sat in one stage longer than the adjuster said it would, an estimate you do not understand, a denial letter, or a request for a recorded statement you are unsure about. Send the claim number and the last message you received; an advisor will read it with you and, if needed, contact the carrier through the agency channel, which reaches a different desk than the public claims line.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Ask about a claim", body: "Claim number and the carrier's last message are enough to start.", label: "Contact the office", href: "/contact/" },
  ],
  seo: { description: "Where to check the status of an insurance claim, what each stage means, and when Desert Peak Insurance can step in with the carrier." },
};
