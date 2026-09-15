import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Contact us",
  lede: "Reach the office by phone, email or the form on this page. For a claim, the fastest route is the carrier's claims line printed on your policy; the office can help you find it.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Use the form for anything that is not urgent: a question about a policy, a change of address or vehicle, a certificate of insurance, or a request for the analysis. Attach a declarations page if you have one; it is the single document that makes the first reply useful. Messages sent through the form reach the office by email and are answered by a licensed advisor.",
            "If you have an open claim, contact the carrier's claims department first with your claim number, then let the office know so an advisor can follow it. Do not send card numbers, Social Security numbers or medical records through the form; the office will tell you how to send those if a carrier needs them.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Contact Desert Peak Insurance by phone, email or the contact form. Policy questions, changes, certificates and requests for the analysis." },
};
