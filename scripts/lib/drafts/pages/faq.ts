import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Frequently asked questions",
  lede: "What people ask before working with an independent agency: what it costs, who we represent, how the analysis works and what happens to what you send us.",
  blocks: [
    {
      type: "faq",
      items: [
        {
          question: "What is an independent insurance agency?",
          answer: [
            "An agency that holds appointments with several carriers and represents the client rather than any one company. A captive agent sells one carrier's products; an independent agency can quote the same coverage from several carriers and place it where it fits.",
          ],
        },
        {
          question: "What does the analysis cost?",
          answer: [
            "Nothing, and there is no obligation at the end of it. The agency is paid by the carrier as a commission when a policy is placed, at a rate the carrier sets. You pay the premium to the carrier; there is no separate fee to the agency.",
          ],
        },
        {
          question: "What do you need from me?",
          answer: [
            "Your current declarations page for each policy you want compared. It lists the insured, the coverages, the limits, the deductibles and the premium, which is everything an advisor needs to start. If you do not have it, the quote flow asks the same questions.",
          ],
        },
        {
          question: "How long does it take?",
          answer: [
            "The intake conversation takes about twenty minutes. The written finding follows once the carriers have returned rates, which depends on the reports they order; the advisor tells you the expected timing at the end of the conversation.",
          ],
        },
        {
          question: "Will you tell me if I should keep my current policy?",
          answer: [
            "Yes, and it happens often. If the limits fit, the premium is fair and the carrier handles claims well, moving the policy gains nothing, and the finding says renew. We would rather be the agency you call next time than the one that moved you for the sake of it.",
          ],
        },
        {
          question: "Do you sell my information?",
          answer: [
            "No. What you send is used to produce the analysis and to place the policy you choose. It is shared with the carriers quoting the risk and with the service providers the privacy policy names, and with no one else. The do-not-sell notice explains your rights under state privacy law.",
          ],
        },
        {
          question: "Which states are you licensed in?",
          answer: [
            "Arizona, Nevada, Utah and Idaho. The licensing pages under Legal name the state regulator for each, which is where a license can be verified.",
          ],
        },
        {
          question: "Do you handle business insurance as well as personal?",
          answer: [
            "Yes. General liability, business owners policies, commercial auto, workers' compensation, and the certificates a landlord, lender or general contractor asks for. The commercial product pages explain each line for a small-business owner.",
          ],
        },
        {
          question: "What if I already have an agent?",
          answer: [
            "Nothing about the analysis requires you to leave them. Bring the declarations page, get a second reading, and take the finding back to your current agent if you prefer. If the finding is that your agent has you placed well, that is what it will say.",
          ],
        },
        {
          question: "How do I make a complaint?",
          answer: [
            "First with the office, which reviews it and replies in writing. If that does not resolve it, each state's Department of Insurance takes complaints about agents and carriers; the licensing pages name them.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Request the analysis", body: "Your numbers, compared across carriers, in writing.", label: "Request the analysis", href: "/quote/" },
  ],
  seo: { description: "Questions about working with Desert Peak Insurance: cost, independence, what to send, timing, data handling, licensing and complaints." },
};
