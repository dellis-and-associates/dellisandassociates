import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Pays the costs of a data breach, ransomware event or funds-transfer fraud: the forensic and notification work you must do, the income you lose while systems are down, and the claims from customers and regulators. Priced on your revenue, your data and the security controls you can prove.",
  intro: [
    "A cyber policy responds to an event that a general liability or property policy was never written for: someone gets into your systems, locks or steals your data, or tricks an employee into sending money. The policy is split into two halves. First-party coverage pays your own costs after the event. Third-party coverage pays what you owe other people because of it, and the lawyer who defends you.",
    "Small businesses in Arizona, Nevada, Utah and Idaho buy it for practical reasons: a client's vendor agreement demands it, a card processor asks about it, or a bookkeeper wired money to a fake invoice and the bank would not reverse it. Any business that stores customer records, takes card payments, runs on cloud software or emails invoices has the exposure, whether or not it thinks of itself as a technology company.",
    "The premium is set from revenue, the kind and volume of records you hold, your industry, prior incidents and the controls on your application: multi-factor authentication on email and remote access, tested offline backups, endpoint detection and staff training. Carriers now decline or surcharge applications without those basics. The analysis reads your current policy, if you have one, against the contracts that ask for it and the way your business actually operates.",
  ],
  coverageBlocks: [
    {
      heading: "First-party breach response",
      paragraphs: [
        "When an event is discovered, the carrier's breach hotline puts a forensic firm, a privacy attorney and a notification vendor to work. The policy pays for finding out what happened, determining which records were exposed, notifying the people affected as each state's breach law requires, offering them credit monitoring, and handling the public relations if the event becomes known. Some forms pay these costs inside the main limit and others carve them out with their own sub-limit, which is the first thing to compare between two quotes.",
      ],
    },
    {
      heading: "Business interruption, data restoration and extortion",
      paragraphs: [
        "If a ransomware event or a denial-of-service attack takes your systems down, cyber business interruption pays the income you lose and the extra expense of operating another way, after a waiting period measured in hours rather than days. Data restoration pays to rebuild or recover files and software from backups or from scratch. Cyber extortion pays a negotiator and, where the carrier agrees and the law allows, the ransom itself.",
        "The waiting period and the period of restoration set how much of a shutdown the policy pays for, and a dependent-business extension is needed if the outage is at your cloud vendor rather than your own office.",
      ],
    },
    {
      heading: "Third-party privacy and network security liability",
      paragraphs: [
        "This half pays claims brought against you because your systems failed: customers whose data was exposed, a partner whose network was infected through yours, or a client who lost money because your email was used to send them a fake invoice. It includes defence costs and settlements. Regulatory coverage pays to respond to an investigation by a state attorney general or a federal agency and, where insurable, the fines. Payment card coverage pays the assessments a card brand levies through your processor after card data is compromised, which a merchant agreement makes you responsible for.",
      ],
    },
    {
      heading: "Social engineering and funds-transfer fraud",
      paragraphs: [
        "The most common small-business loss is not a hack at all: an employee receives a convincing email from the owner, a vendor or a title company and wires money to a criminal's account. Because the employee sent the money voluntarily, a standard crime policy and many cyber policies exclude it unless a social engineering endorsement is added. The endorsement usually carries a lower sub-limit and may require a call-back procedure to verify payment changes before a claim is paid. Ask for it specifically; it is the coverage most often missing at claim time.",
      ],
    },
    {
      heading: "Who asks for it and what the certificate shows",
      paragraphs: [
        "Clients with vendor-security programmes, larger general contractors, franchisors, landlords with shared building systems and some lenders now write cyber insurance into their contracts. What they receive is a certificate of insurance: a one-page summary issued by the agency listing the carrier, the policy period, the limits and whether the requester is an additional insured. The certificate proves the policy exists on the date it was issued and does not change it, so a contract that asks for a limit or endorsement you do not have means the policy changes first and the certificate follows.",
      ],
    },
  ],
  covered: [
    "Forensic investigation, legal advice and customer notification after a breach",
    "Credit monitoring for the people whose records were exposed",
    "Lost income and extra expense while systems are down after an attack",
    "Rebuilding data and software after ransomware or malicious deletion",
    "Extortion negotiation and, where permitted, the ransom payment",
    "Defence and settlements when customers or partners sue over a breach",
    "Regulatory investigation costs and insurable fines and card-brand assessments",
    "Money wired to a fraudster by a deceived employee, with the social engineering endorsement",
  ],
  notCovered: [
    "Bodily injury or physical damage to property, which belong to general liability and property policies",
    "Upgrading systems to a better standard than before the event",
    "Losses from a control you told the carrier you had and did not, such as multi-factor authentication",
    "Theft of your own trade secrets or the value of lost intellectual property",
    "Events that began before the retroactive date on the policy",
    "Funds-transfer fraud when the social engineering endorsement is not on the policy",
    "Acts of war and, on many forms, state-sponsored attacks that meet the exclusion's wording",
  ],
  discounts: [
    { name: "Multi-factor authentication", description: "Enforced on email, remote access and administrator accounts. With many carriers this is a condition of being quoted at all, and it moves the rate more than anything else." },
    { name: "Tested offline backups", description: "Backups kept separate from the network and restored on a schedule, which shortens a ransomware shutdown and lowers the business interruption rate." },
    { name: "Endpoint detection and response", description: "Managed monitoring software on every computer and server, documented on the application." },
    { name: "Staff phishing training", description: "A recurring training and simulation programme. Some carriers price it directly; others require it for the social engineering endorsement." },
    { name: "Package with a business owners policy", description: "Cyber added as a section of a package policy usually costs less than a standalone policy at small limits, though the standalone form is broader." },
  ],
  faqs: [
    {
      question: "My general liability policy mentions data. Is that not enough?",
      answer: [
        "Almost never. General liability forms now exclude damage arising from access to or disclosure of personal information, and the small amount of data coverage some package policies include is usually a sub-limit for notification costs only, with no business interruption, extortion or funds-transfer fraud. The analysis reads the endorsement and shows the gap next to a standalone quote.",
      ],
    },
    {
      question: "What is the difference between first-party and third-party coverage?",
      answer: [
        "First-party pays your own costs: the forensic firm, the notifications, the lost income, the ransom. Third-party pays claims other people bring against you because of the event, plus your defence. A small business with few customers and no contracts may need mostly first-party coverage; a firm that holds client data or connects to other companies' systems needs both. Quotes are often built with different limits for each, so compare them side by side rather than by the headline number.",
      ],
    },
    {
      question: "We use cloud software for everything. Does the vendor's insurance cover us?",
      answer: [
        "The vendor's policy covers the vendor. Their terms of service usually limit what they owe you to a refund of fees, and the notification duty for your customers' data stays with you because you collected it. What you want on your own policy is a dependent-business interruption extension so an outage at the vendor triggers your income coverage, and a contingent breach provision so a breach there triggers your notification coverage.",
      ],
    },
    {
      question: "How much coverage should a small business carry?",
      answer: [
        "Start from what a bad week would cost: the forensic and legal response, the notifications for every record you hold, and the income lost during the days it would take to rebuild from backups. Add any limit a contract requires. For example, a firm holding a few thousand customer records that could be down for a week might reasonably land on a limit of one million dollars, but the arithmetic is specific to the business and the analysis works it through.",
      ],
    },
    {
      question: "What happens on the day we discover an incident?",
      answer: [
        "Call the carrier's breach hotline before you call anyone else, including your own IT provider. The policy pays for the vendors the carrier approves, and using your own without consent can leave those bills outside the coverage. Preserve the systems as they are, do not pay a ransom on your own, and let the assigned attorney direct the forensic work. The policy also has a notice deadline, so late reporting is a coverage question in itself.",
      ],
    },
  ],
  relatedProducts: ["business-owners-policy", "professional-liability-eo-insurance", "general-liability-insurance", "identity-theft-protection"],
  seo: { description: "How a cyber liability policy works for a small business: first-party breach response, business interruption, extortion, third-party privacy liability and funds-transfer fraud, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
