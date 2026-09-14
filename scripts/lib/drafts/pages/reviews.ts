import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Client reviews",
  lede: "Reviews appear here only when the client has given written consent to publish their words and their name. None have been published yet.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Insurance advice touches private facts: what someone owns, what they owe, what happened in a claim. A review is not published without a signed consent that states exactly what will appear, and a review is not edited beyond removing details the client asked to keep out. That rule means this page begins empty and grows slowly, which we prefer to a page of quotes no one can check.",
          ],
        },
        {
          heading: "If you are a client",
          paragraphs: [
            "Tell the office you would like to leave a review and we will send the consent form. Consent can be withdrawn at any time, and the review comes down when it is.",
          ],
        },
        {
          heading: "What will not happen here",
          paragraphs: [],
          bullets: [
            "No payment or discount in exchange for a review.",
            "No review from anyone the office cannot confirm is a client.",
            "No review presented as a typical claim outcome; every claim is its own set of facts.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Client reviews of Desert Peak Insurance are published only with written consent. How the consent process works and why the page starts empty." },
};
