import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Billing and payments",
  lede: "The carrier bills you and takes your payment; the office does not handle premium money. What the office does is set up the billing plan, fix it when it is wrong, and explain a bill that does not make sense.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Each carrier issues its own invoice and runs its own payment options. Some draft a bank account monthly, some take a card, some add an installment fee when the premium is paid in parts, and nearly all offer the choice of paying the term in full at a lower total. Which of those apply to your policy depends on the carrier, and the office can read the options off your policy.",
          ],
        },
        {
          heading: "Changes the office makes for you",
          paragraphs: [],
          bullets: [
            "Switching between installment and paid-in-full billing at renewal.",
            "Changing the draft date or the bank account on file.",
            "Adding or removing a mortgage company or lienholder as the payer, which is common when a home policy is paid from escrow.",
            "Sorting out a bill that changed mid-term after a vehicle, driver or address change.",
          ],
        },
        {
          heading: "Late payments and cancellation",
          paragraphs: [
            "A missed payment triggers a notice from the carrier, and the notice states the date the policy cancels if payment has not arrived. Paying before that date normally keeps the policy in force without a break. Paying after it can mean a reinstatement with a lapse on record, or a new application at a new rate. If a notice arrives, call the office the same day; a lapse follows you into the rating history and costs more than the late payment did.",
          ],
        },
      ],
    },
    { type: "cta", heading: "A bill that does not add up", body: "Send a photo of the invoice and the office will explain each line.", label: "Contact the office", href: "/contact/" },
  ],
  seo: { description: "How insurance billing works at an independent agency: carriers bill directly, the office changes billing plans and payers, and what a late payment notice means." },
};
