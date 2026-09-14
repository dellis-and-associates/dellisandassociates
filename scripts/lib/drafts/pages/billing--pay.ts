import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Make a payment",
  lede: "Premium payments go to the carrier that issued the policy. Use the carrier's portal, app or phone line printed on the invoice; the office can tell you which one applies to you.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Your invoice names the carrier and gives a payment address, a phone line and, for most carriers, a website or app where a bank account or card can be entered. Pay there and keep the confirmation number. This website does not take payments and the office does not store card numbers. If an email or text asks you to send payment details to the agency, treat it as suspicious and call the office before acting on it.",
          ],
        },
        {
          heading: "If you cannot find the carrier's payment page",
          paragraphs: [
            "Send the office your policy number or a photo of the invoice and we will send back the carrier's payment link and phone number. Never pay through a link in an unexpected message; type the carrier's address yourself or use the app you already have.",
          ],
        },
        {
          heading: "Payment methods",
          paragraphs: [
            "Bank draft, card and mailed check are the usual options, but each carrier decides which it accepts and whether it charges a fee for installments or for card payments. Those fees appear on the carrier's invoice. The office adds no fee of its own to any payment.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Need the payment link", body: "A policy number is enough for the office to find it.", label: "Contact the office", href: "/contact/" },
  ],
  seo: { description: "Where to pay your insurance premium: the carrier's portal, app or phone line on your invoice. Desert Peak Insurance does not take payments on this site." },
};
