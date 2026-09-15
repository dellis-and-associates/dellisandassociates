import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Cyber liability insurance explained: a beginner's guide",
  excerpt: "A cyber policy pays for two different things: your own costs after a breach or ransomware event, and what you owe other people whose data you held. How first-party and third-party parts work, what the breach response panel does, which frauds are covered, and what the application now demands.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A cyber policy is really two policies stapled together. The first-party part pays your own costs when your systems are locked, your data is stolen or your email is used to trick someone: forensics, notification letters, credit monitoring for the affected people, a ransom negotiator, restored data, and the income you lose while the point-of-sale terminals are dark. The third-party part pays what you owe others because of the same event: customers whose records leaked, a payment card brand's assessments, a regulator's investigation, a business partner whose systems you infected.",
        "Small businesses buy it because their other policies decline to. A business owner's policy excludes electronic data almost entirely, a general liability form excludes data breaches by endorsement, and a crime policy covers stolen money but not the cost of telling a thousand customers their addresses are loose. This guide walks through the parts, the frauds that are and are not covered, how the breach response actually runs, and why the application has become the hard part of buying.",
      ],
    },
    {
      heading: "First-party coverage: your own losses",
      paragraphs: ["These are the parts that respond to what happens inside your walls. Each usually carries its own sublimit and its own waiting period or retention, so the declarations page is a list rather than a single number."],
      bullets: [
        "Incident response and forensics: the cost of finding out what happened, what was taken and whether the attacker is still inside.",
        "Notification and credit monitoring: letters, call centres and monitoring for every person whose data was exposed, in the form each state's breach statute requires.",
        "Cyber extortion: the ransom itself where payment is lawful, plus the negotiator and the cost of deciding whether to pay.",
        "Data and system restoration: rebuilding servers, reloading backups, and re-entering data that had no backup.",
        "Business interruption: lost income and extra expense while operations are down, after a waiting period measured in hours, and on some forms including outages at a cloud provider you depend on.",
        "Reputational harm and public relations: on broader forms, the cost of a communications firm and the income lost to customers who left after the news.",
      ],
    },
    {
      heading: "Third-party coverage: what you owe others",
      paragraphs: [
        "The liability side responds when the people whose data you held, or the businesses connected to you, come after you. Network security liability covers claims that your inadequate security let malware spread or let a breach happen. Privacy liability covers claims for failing to protect personal information, including class actions after a large breach. Regulatory coverage pays the cost of responding to a state attorney general or a federal agency and, where insurable, the fines. Payment card coverage pays the assessments a card brand levies through your processor after card data is exposed, which for a retailer or restaurant can be the largest single number in the loss. Media liability covers libel, copyright and trademark claims arising from your website and social accounts.",
        "Third-party cyber is almost always written claims-made, so the same retroactive date and reporting discipline that applies to professional liability applies here: a breach discovered this year that began under a prior policy is only covered if the retroactive date reaches back to it.",
      ],
    },
    {
      heading: "Social engineering and funds transfer fraud: the parts that pay for being fooled",
      paragraphs: [
        "The commonest cyber loss for a small business is not a dramatic hack. It is an email that looks like it came from the owner, a vendor or a title company, asking that a payment go to a new account. No system was breached; a person was persuaded. Standard cyber forms historically excluded this because the loss was voluntary, and many still cover it only by endorsement with a low sublimit and a call-back condition that requires you to have verified the new instructions by telephone before paying.",
        "Two related coverages sit near it. Funds transfer fraud covers money moved out of your account by an attacker who obtained your banking credentials, which is a genuine intrusion. Invoice manipulation covers your customer paying a fraudulent invoice that appeared to come from you, so the money never reached you at all. Ask the carrier which of the three it covers, at what sublimit, and whether a crime policy would carry the risk more cheaply; the crime and cyber markets overlap here and a business is often better served by whichever form treats the loss as primary.",
      ],
    },
    {
      heading: "How a breach claim actually runs",
      paragraphs: [
        "Suppose a twelve-person accounting firm in Boise finds its files encrypted on a Monday morning, with a note demanding $80,000. The owner calls the number on the policy, and within hours the carrier's breach coach, a privacy lawyer, is on the phone. The lawyer engages a forensics firm under privilege, so the investigation report cannot be used against the firm later, and a negotiator opens contact with the attacker. Forensics finds the attacker also copied client tax files. Restoration from backups takes four days; the negotiated payment, if any, is made only after a sanctions check. Because tax returns for clients in several states were exposed, the lawyer determines notification is required in each and drafts the letters, and the carrier's vendor mails them and runs the monitoring. Total costs across forensics, restoration, four days of lost billing, notification and legal advice come to $140,000 against a $500,000 limit with a $5,000 retention. All figures invented; the sequence is the point.",
        "Two things in that sequence matter for buying. The panel of vendors is chosen by the carrier, and using one outside the panel without approval can cost you the coverage. And the clock on the state notification statutes starts when you discover the breach, so the first call has to be to the carrier, not to a local IT shop, because a friendly technician who wipes and reinstalls also destroys the evidence.",
      ],
    },
    {
      heading: "What cyber policies exclude",
      paragraphs: ["The exclusions fall into losses another policy handles and losses the carrier declines to price."],
      bullets: [
        "Bodily injury and property damage, including physical damage to hardware; a fried server is a property claim, and the data on it is a cyber claim.",
        "Losses from a failure to maintain the security controls you stated on the application, which carriers now enforce as a condition rather than a warranty on some forms.",
        "Unencrypted portable devices, on some forms, so a lost laptop is only covered if it was encrypted.",
        "Prior known incidents, and breaches that began before the retroactive date.",
        "Acts of war and, increasingly, state-sponsored attacks, under exclusions that have been redrafted and are worth reading closely.",
        "Infrastructure failure such as a power grid or telecommunications outage that is not caused by an attack on you or your provider.",
        "Betterment: upgrading to better systems than you had, rather than restoring what you lost.",
      ],
    },
    {
      heading: "The application is the underwriting",
      paragraphs: [
        "A cyber application asks whether you use multi-factor authentication on email, remote access and administrator accounts; whether backups are offline or immutable and how often they are tested; whether you run endpoint detection and response rather than plain antivirus; whether you have a patching cadence and an incident response plan; and how you verify changes to vendor payment details. The answers decide three things at once: whether the carrier will quote, the premium, and whether a later claim will be paid. A wrong answer about multi-factor authentication is the commonest reason a ransomware claim is disputed.",
        "The practical order is to fix the controls first and apply second. A business that turns on multi-factor authentication and moves backups offline the month before applying often moves from declined to quoted, and pays less for more coverage, because those two controls alone defeat much of what the carrier is pricing for.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Every one of the four states has a breach notification statute that sets who must be told, in what form and within what time; the deadline differs in each, and the breach counsel provided under the policy's notification coverage confirms the one that applies to the people affected. Nevada additionally regulates how businesses must encrypt certain personal data in transit and how payment card data must be handled, and a Nevada business that falls short of that standard weakens its position with both the regulator and the carrier. Utah has enacted a consumer privacy law that gives residents rights over their data and creates obligations for larger businesses, and Utah also offers an affirmative defence to businesses that maintain a written cybersecurity programme meeting a recognised framework, which is exactly the kind of documentation a cyber application rewards. Arizona's medical and dental practices, which are numerous around Phoenix and Tucson, carry federal health privacy obligations on top of state law, and their cyber policy should include regulatory coverage explicitly for those.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "List the personal data you hold, including customers, employees and patients, and the money that moves through your accounts by wire or ACH. Then answer honestly the five control questions above. If you have multi-factor authentication everywhere, tested offline backups and a call-back rule for payment changes, you are a good risk and the policy will be reasonably priced; if not, the money is better spent on those first and the policy second. We quote cyber alongside the business owner's policy and the crime coverage so the fraud parts land on the form that treats them as primary, across the carriers we represent in Arizona, Nevada, Utah and Idaho.",
      ],
    },
  ],
  relatedProducts: ["cyber-liability-insurance", "business-owners-policy", "professional-liability-eo-insurance", "identity-theft-protection"],
  relatedArticles: ["how-to-respond-to-a-cyber-incident-as-a-small-business", "first-party-vs-third-party-cyber-coverage", "occurrence-based-vs-claims-made-cyber-coverage", "business-owners-policy-bop-explained-a-beginner-s-guide", "starting-a-small-business-insurance-basics"],
  relatedTerms: ["first-party-cyber-coverage", "third-party-cyber-coverage", "cyber-extortion-coverage", "social-engineering-fraud-coverage", "funds-transfer-fraud-coverage", "data-breach-coverage"],
};
