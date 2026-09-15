import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to respond to a cyber incident as a small business",
  excerpt: "The first hours after ransomware, a breach or a fraudulent wire decide how much the policy pays and how much the business loses. What to have ready, how to contain without destroying evidence, when to call the carrier, and how notification and the claim work.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A small business usually discovers a cyber incident in one of a few ways: files on the office computers are suddenly encrypted with a ransom note, a customer calls about a suspicious invoice sent from the owner's email account, the bank flags a wire transfer nobody authorised, or a vendor reports that data it holds for the business has been exposed. The instinct in each case is to fix the problem fast, which is understandable and often exactly wrong. Wiping the computers, paying the attacker, or hiring the nearest IT firm can destroy the evidence the investigation needs and can breach the conditions of the cyber policy.",
        "A cyber policy is built around a response process: a breach hotline, pre-approved lawyers and forensic firms, and coverage for notification, restoration, extortion and lost income. This guide covers how to use it well, for small businesses in Arizona, Nevada, Utah and Idaho, and what to do if there is no cyber policy at all.",
      ],
    },
    {
      heading: "What to have ready before anything happens",
      paragraphs: ["An incident is a poor time to go looking for these."],
      bullets: [
        "The cyber policy, its breach hotline number, and the list of approved vendors, printed and kept somewhere other than the office network.",
        "Contact details for your IT provider or managed service provider, and a copy of its contract showing what it is responsible for.",
        "Your bank's fraud department number, and the names of the people authorised to move money.",
        "A list of the types of personal information you hold, where it is stored, and which states your customers and employees live in.",
        "Offline or immutable backups, and a record of when they were last tested.",
        "Your business owners, crime and professional liability policies, since some losses may fall under them instead.",
      ],
    },
    {
      heading: "Step one: contain the incident without destroying evidence",
      paragraphs: [
        "Disconnect affected computers from the network and the internet, by unplugging network cables or turning off wireless, but do not power them off, wipe them or reinstall software unless the forensic firm or carrier tells you to. Memory, logs and the attacker's files are evidence of what happened, what data was taken, and whether notification is required. Change passwords for email, banking and administrator accounts from a clean device, and turn on multi-factor authentication where it was not already.",
        "If money was sent by wire or electronic transfer to a fraudster, call the bank immediately and ask it to recall the transfer and contact the receiving bank. The chance of recovery falls quickly with each hour. Report the fraud to the FBI's Internet Crime Complaint Center as well, since banks and law enforcement use those reports to freeze funds.",
      ],
    },
    {
      heading: "Step two: call the carrier's breach line before hiring anyone",
      paragraphs: [
        "Call the cyber carrier's hotline as soon as the incident is contained, and before engaging lawyers, forensic investigators or public relations help on your own. Cyber policies commonly require notice as soon as practicable and require the carrier's consent before incident response costs are incurred, and many pay the carrier's panel vendors directly while restricting reimbursement for vendors the policyholder chose alone. The carrier will usually connect you first to a breach coach, a lawyer who directs the response under attorney-client privilege and hires the forensic firm through counsel.",
        "Do not pay a ransom or contact the attacker before speaking to the carrier and counsel. Cyber extortion coverage, where the policy includes it, typically requires the carrier's consent before payment, and a payment to a sanctioned group can violate federal law. Forensic firms can often verify whether the data can be decrypted, whether backups can restore it, and whether paying would work.",
      ],
    },
    {
      heading: "Step three: work out the notification obligations",
      paragraphs: [
        "Once the forensic investigation shows what information was accessed, counsel determines who must be notified. Arizona, Nevada, Utah and Idaho each have data breach notification laws that define personal information, set when individuals must be notified, and in some cases require notice to the state attorney general; breach counsel confirms the deadline in each state that applies. The law that applies depends on where the affected people live, not only where the business is. Health information, card payment data and financial account data can bring additional federal or contractual requirements.",
        "The cyber policy's first-party coverage typically pays for the legal advice, the notification letters, call centre support and credit monitoring offered to affected people. Third-party coverage responds if customers, business partners or regulators bring claims or investigations. Keep communications factual and route them through counsel.",
      ],
    },
    {
      heading: "Step four: restore operations and document the claim",
      paragraphs: [
        "Restore systems from clean backups once the forensic firm confirms the attacker is out, and rebuild compromised machines rather than just cleaning them. Keep a daily record of the business interruption: orders lost, staff overtime, temporary equipment, and revenue compared with the same period in earlier months. Cyber business interruption coverage pays lost income after a waiting period stated in the policy, and the claim depends on those records.",
        "Save every invoice from the response, including vendors, overtime, and replacement hardware where the policy covers it. Social engineering and funds transfer fraud losses are often covered at a smaller sublimit than other cyber losses, and some fall under a crime policy instead, so report them to every carrier that might respond.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: ["These are the decisions that most often cost small businesses coverage or money."],
      bullets: [
        "Wiping or reimaging computers before the forensic investigation.",
        "Hiring the business's usual IT provider to investigate without the carrier's consent.",
        "Paying a ransom before calling the carrier.",
        "Waiting a day to call the bank about a fraudulent wire.",
        "Notifying customers before counsel has confirmed what was accessed and which laws apply.",
        "Assuming the managed service provider's insurance will pay the business's losses.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a Boise dental practice arrives on a Monday to find its patient records encrypted and a ransom demand for $80,000. The office manager unplugs the network and calls the cyber carrier's hotline instead of the practice's usual IT contractor. The breach coach hires a forensic firm, which restores most data from an offline backup and finds that the attacker copied records for 3,000 patients. The practice pays no ransom. The cyber policy, with a $5,000 retention, pays $40,000 for forensics and legal advice, $25,000 for notification letters and credit monitoring, and $30,000 of lost income over the eight business days the office was closed beyond the waiting period. The figures are hypothetical; calling the hotline first and preserving the systems kept the costs within the policy.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "If an incident is happening now, call the breach hotline on your cyber policy first, then call us. If you are preparing, send us your current policies and we will tell you whether you have cyber coverage, what its consent and notice conditions are, where social engineering and funds transfer fraud sit, and compare cyber options across the carriers we represent in Arizona, Nevada, Utah and Idaho. If the coverage you have already fits your business, we will confirm that and help you print the response plan.",
      ],
    },
  ],
  relatedProducts: ["cyber-liability-insurance", "business-owners-policy", "professional-liability-eo-insurance"],
  relatedArticles: ["cyber-liability-insurance-explained-a-beginner-s-guide", "first-party-vs-third-party-cyber-coverage", "occurrence-based-vs-claims-made-cyber-coverage", "starting-a-small-business-insurance-basics"],
  relatedTerms: ["data-breach-coverage", "cyber-extortion-coverage", "social-engineering-fraud-coverage", "funds-transfer-fraud-coverage", "business-interruption-insurance"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
