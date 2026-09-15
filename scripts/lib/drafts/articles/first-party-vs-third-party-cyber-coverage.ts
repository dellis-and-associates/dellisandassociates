import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "First-party vs third-party cyber coverage",
  excerpt: "First-party cyber coverage pays the business's own costs after an incident; third-party coverage pays what others claim the business owes them. What sits in each half, how the triggers differ, a worked breach, and how to weigh the two limits.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A cyber policy is really two policies sharing a declarations page. One half pays for what an incident costs the business itself: the forensic firm, the restored systems, the lost income while the network is down, the ransom negotiator. The other half pays for what the incident costs everyone else and what they then demand from the business: the customers whose records were exposed, the vendor whose invoices were diverted, the regulator who opens an inquiry.",
        "Carriers sell the two halves together on most small-business forms, but each carries its own insuring agreements, its own limits and sublimits, and sometimes its own retention. The question for a buyer is rarely one or the other. It is how much limit to put in each half, and whether the form actually contains the pieces a particular business will need.",
      ],
    },
    {
      heading: "What first-party coverage pays",
      paragraphs: [
        "First-party insuring agreements respond to the business's own losses, with no lawsuit required. The usual components are breach response costs, business interruption, data restoration and cyber extortion, and a growing number of forms add funds-transfer and social-engineering fraud, though often at a much smaller sublimit.",
      ],
      bullets: [
        "Breach response: the breach coach or privacy attorney, the forensic investigation, notification letters, call-centre support and credit monitoring for affected individuals.",
        "Business interruption: net income lost and extra expense incurred while systems are unavailable, after a waiting period measured in hours rather than a dollar deductible on many forms.",
        "Data and system restoration: the cost to rebuild or recover software and data, which is different from replacing damaged hardware; hardware replacement, sometimes called bricking coverage, is a separate grant on the forms that include it.",
        "Cyber extortion: the negotiator and, where lawful and approved by the carrier, the payment itself.",
        "Funds-transfer and social-engineering fraud: money sent to a criminal because of a spoofed email or a compromised account, usually the item with the smallest sublimit on the page.",
      ],
    },
    {
      heading: "What third-party coverage pays",
      paragraphs: [
        "Third-party insuring agreements respond when someone else makes a claim against the business. That can be a class of customers alleging their data was not protected, a business partner whose systems were infected through a shared connection, a regulator investigating a privacy law violation, or a card brand assessing fines and fees under a merchant agreement. The policy pays defence costs and the settlements or judgements the business becomes legally obligated to pay, within the limit.",
        "Third-party cyber coverage also commonly includes media liability for content the business publishes online, such as a copyright or defamation claim arising from its website or social accounts. Regulatory fines and penalties are covered only where they are insurable under the governing law, which varies by state and by the nature of the penalty, so the form's wording on this point is worth reading rather than assuming.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "The first difference is the trigger. First-party coverage is triggered by discovery of an event: the ransomware screen, the unexplained transfer, the forensic finding that records left the network. Third-party coverage is triggered by a claim, a written demand or suit, and nearly every cyber policy is written on a claims-made basis, so that claim has to be first made and reported during the policy period or an extended reporting period. A business that lets a policy lapse after an incident can keep its first-party recovery and still lose the third-party protection for suits that arrive a year later.",
        "The second difference is control. First-party costs are usually incurred with vendors from the carrier's panel, because the policy requires prior consent for many expenses and pays the panel's negotiated rates. Third-party defence is usually handled by counsel the carrier appoints, and defence costs typically erode the limit rather than sitting on top of it. The third difference is where the money runs out: first-party sublimits cap individual components well below the policy limit, while a third-party claim can consume the whole aggregate on its own.",
      ],
    },
    {
      heading: "A worked breach",
      paragraphs: [
        "Suppose a small accounting practice in Mesa carries a cyber policy with a $1,000,000 aggregate limit, a $10,000 retention, a $250,000 business interruption sublimit and a $50,000 social-engineering sublimit. In February an employee opens an attachment, and ransomware encrypts the file server holding client tax records. The first-party side pays the breach coach and forensic firm at $60,000, data restoration at $40,000, notification and credit monitoring for the affected clients at $30,000, and ten days of lost billing and overtime at $70,000. That is $200,000 of first-party loss, and the practice pays the first $10,000.",
        "Now suppose that eight months later a group of those clients sues, alleging the practice failed to safeguard their information, and a state regulator sends an inquiry letter. Say defence and the settlement together come to $450,000. That is a third-party claim, it arrives in a later policy period, and it is covered only if the practice renewed the claims-made policy or bought an extended reporting period. Because both halves share one aggregate, the policy has $550,000 left for the rest of the year. Had the fraudster instead talked the office manager into wiring $120,000 to a fake vendor account, the social-engineering sublimit would have paid $50,000 and the practice would have absorbed the remainder. The figures are illustrative only.",
      ],
    },
    {
      heading: "Who each half matters most to",
      paragraphs: ["Every business with a network and a bank account needs some of each. The weighting changes with what the business holds and who it contracts with."],
      bullets: [
        "Businesses that store sensitive personal records, such as medical and dental offices, accountants, insurance and financial firms, and anyone holding Social Security numbers, need a third-party limit sized to a class of claimants, not a single complaint.",
        "Businesses whose revenue stops when systems stop, such as online retailers, restaurants dependent on point-of-sale systems, and manufacturers running scheduling software, should look hardest at the business interruption sublimit and the waiting period on the first-party side.",
        "Businesses that pay vendors by wire or ACH, which is nearly all of them, should check the social-engineering and funds-transfer sublimits, since those losses are frequent and the default grants are small.",
        "Technology firms and contractors connecting to a customer's systems need third-party coverage broad enough to include network security liability to that customer, and often professional liability alongside it.",
      ],
    },
    {
      heading: "Contracts and state rules in the region",
      paragraphs: [
        "Arizona, Nevada, Utah and Idaho each have a data breach notification statute that decides when affected residents, and sometimes the attorney general, must be told. The timelines and thresholds differ by state and change over time, and a business with clients in several states has to satisfy each one, which is why breach counsel is usually the first call and why the notification cost on the first-party side scales with where the clients live rather than where the office is. Separately, larger customers, hospitals and government agencies across the region increasingly write a cyber liability limit into vendor contracts; that requirement is almost always a third-party limit, and a policy weighted entirely toward first-party costs may not satisfy it.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A business that already carries a cyber policy with both halves, a claims-made form it renews without gaps, sublimits that match how it actually operates and a third-party limit that meets its contracts is correctly built, and the annual review is only about whether revenue, record counts or contract requirements have changed. The structures worth revisiting are narrower ones: a cyber endorsement on a business owners policy that grants only first-party breach response at a small sublimit, a policy with no social-engineering grant, or a standalone form whose third-party limit has not moved while the client list grew. We read the form, list each insuring agreement against the business's real exposures and price alternatives across the carriers we represent in Arizona, Nevada, Utah and Idaho. The analysis costs nothing, and if the existing policy is the right one we say so.",
      ],
    },
  ],
  relatedProducts: ["cyber-liability-insurance", "professional-liability-eo-insurance", "business-owners-policy"],
  relatedArticles: ["cyber-liability-insurance-explained-a-beginner-s-guide", "occurrence-based-vs-claims-made-cyber-coverage", "how-to-respond-to-a-cyber-incident-as-a-small-business", "starting-a-small-business-insurance-basics"],
  relatedTerms: ["first-party-cyber-coverage", "third-party-cyber-coverage", "data-breach-coverage", "cyber-extortion-coverage", "social-engineering-fraud-coverage", "claims-made-policy", "sublimit"],
};
