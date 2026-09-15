import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Do not sell or share my information",
  lede: "Desert Peak Insurance does not sell personal information and does not share it for targeted advertising. This notice says so plainly, sets out the rights state privacy laws give you, and explains how to submit a request. Effective September 15, 2026.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Several states give residents the right to tell a business not to sell their personal information or use it for targeted advertising. The agency has not sold personal information, does not do so now, and does not share it with advertising platforms or data brokers. There is therefore no sale to opt out of. The rest of this notice exists so that you can confirm that, exercise the other rights your state provides, and hold the agency to it.",
          ],
        },
        {
          heading: "Rights you may have",
          paragraphs: ["Depending on the state you live in, you may have the right to:"],
          bullets: [
            "Confirm whether the agency processes your personal information and access it.",
            "Correct inaccurate personal information.",
            "Delete personal information you provided, subject to the records insurance law requires the agency to keep.",
            "Obtain a copy of your personal information in a portable format.",
            "Opt out of the sale of personal information, its use for targeted advertising, and profiling in furtherance of decisions with legal or similarly significant effects. The agency does none of these.",
            "Appeal a decision the agency makes about your request.",
          ],
        },
        {
          heading: "State-specific notes",
          paragraphs: [
            "Nevada residents may direct a website operator not to sell covered information. The agency does not sell it, and a Nevada request submitted as described below is recorded and honored.",
            "Utah residents have rights of access, deletion, portability and opt-out under the Utah Consumer Privacy Act. Information collected under the federal Gramm-Leach-Bliley Act in connection with an insurance product is exempt from that statute; the agency honors the request anyway on the same terms.",
            "Arizona and Idaho had not enacted a comprehensive consumer privacy statute as of the effective date above. Residents of those states may submit the same requests and the agency handles them on the same terms.",
            "Residents of California and other states with opt-out rights may also submit requests, which the agency honors as far as the applicable law and its insurance record-keeping duties allow.",
          ],
        },
        {
          heading: "How to submit a request",
          paragraphs: [
            "Contact the office through the contact page, by phone, or by mail to the address in the site footer. State which right you are exercising, the name and email or phone number you used with the agency, and, for a deletion request, whether it covers a pending quote, a policy file, or both. The office will confirm receipt, verify your identity by matching the details you give against the record, and may ask one or two further questions if a match is not clear. Responses are sent within the period the applicable law allows, and the office will tell you if it needs an extension and why.",
            "An authorized agent may submit a request on your behalf with written permission from you; the office may still contact you directly to confirm.",
          ],
        },
        {
          heading: "No retaliation",
          paragraphs: [
            "Exercising a privacy right does not change the price or the service you receive from the agency. A deletion request for a pending quote ends that quote; a deletion request from a current client is honored to the extent insurance law allows while the policy and its records remain.",
          ],
        },
        {
          heading: "Appeals",
          paragraphs: [
            "If the agency declines a request, the reply will say why and how to appeal. An appeal is reviewed by the principal advisor. If the appeal is denied, the reply will include how to complain to your state's Attorney General or Department of Insurance.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Submit a privacy request", body: "Tell the office which right you are exercising and how to verify you.", label: "Contact the office", href: "/contact/" },
  ],
  seo: { description: "Desert Peak Insurance does not sell or share personal information. State privacy rights for Nevada, Utah, Arizona and Idaho residents and how to submit a request." },
};
