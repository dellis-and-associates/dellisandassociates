import type { PageDraft } from "../types.mts";

/**
 * The homepage's one CMS block: how the analysis works, in four steps.
 *
 * Every `body` sentence below is from the approved prose this block replaces,
 * split at its own clause boundaries and reordered — no new claim, no number
 * that was not already there. What is genuinely new is marked NEW: the section
 * eyebrow, the heading (the redesign brief's own title for the band) and the
 * four step titles, which are labels the prose did not have. Sentences that
 * were not in the prose do not appear at all.
 *
 * Step titles label rather than restate: in a numbered layout the title is
 * scanned and the body is read, so a title that repeats the body's opening
 * words wastes the scan. None of them refers to another step, because the
 * index comes from array position and the copy must survive a reorder.
 *
 * Pending client sign-off: this file is the proposal. `fill:content` has not
 * been run, so the live page still carries the two paragraphs. The intro joins
 * two approved sentences that sat paragraphs apart; joined, "the analysis"
 * lands twice in two sentences. Fixing that means editing approved copy, so it
 * is an option for the client, not a change made here.
 */
export const draft: PageDraft = {
  lede: "An independent insurance agency licensed in Arizona, Nevada, Utah and Idaho. We compare your current policy against the carriers we represent, show the numbers, and say when keeping what you have is the right call. The analysis costs nothing.",
  blocks: [
    {
      type: "steps",
      eyebrow: "The process", // NEW
      heading: "How the analysis works", // NEW (the brief's title for this band)
      intro: "The analysis starts with what you already have. There is no fee for the analysis and no obligation to move.",
      items: [
        {
          title: "Send what you have", // NEW
          body: "Send a declarations page, or answer the questions in the quote flow.",
        },
        {
          title: "Against what you own, owe and earn", // NEW label, built from the sentence's own tail
          body: "A licensed advisor reads the limits and deductibles against what you own, owe and earn.",
        },
        {
          title: "Marked, then priced", // NEW label
          body: "Gaps get marked, duplicated coverage gets marked, and the same coverages are priced with each carrier we hold an appointment with.",
        },
        {
          title: "The finding, in writing", // NEW
          body: "You get a written finding with the numbers side by side: what changes, what it costs, and what it does not buy you. Sometimes the finding is that your current policy is priced fairly and the limits fit; in that case the recommendation is to renew, and we tell you so.",
        },
      ],
    },
  ],
  seo: { description: "Desert Peak Insurance compares your current auto, home, life, health and commercial policies across the carriers it represents. Independent, licensed in Arizona, Nevada, Utah and Idaho, and the analysis costs nothing." },
};
