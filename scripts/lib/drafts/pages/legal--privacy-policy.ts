import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Privacy policy",
  lede: "How Desert Peak Insurance collects, uses, shares and keeps personal information through this website and in the course of placing and servicing insurance. Effective September 15, 2026.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "This policy covers this website and the personal information Desert Peak Insurance (the agency, we, us) collects when you request a quote or analysis, submit a form, contact the office, or become a client. It applies to visitors from every state; the section on state privacy rights describes additional rights that depend on where you live.",
            "The agency is a licensed insurance producer. Information collected in connection with an insurance product is nonpublic personal information under the federal Gramm-Leach-Bliley Act and the insurance privacy regulations of the states in which the agency is licensed. Those rules apply alongside this policy, and where they are stricter, they control.",
          ],
        },
        {
          heading: "Information we collect",
          paragraphs: ["Three kinds of information reach the agency."],
          bullets: [
            "Information you provide: your name, address, email, phone number and date of birth; the details of what you want insured, such as vehicles, drivers, property, employees or business operations; your current coverage, limits, deductibles and premium; and, for health and Medicare lines, the medications and health conditions you choose to disclose.",
            "Information from third parties in the course of quoting and servicing: driving records, claims-history reports, credit-based insurance scores where permitted, property and inspection records, and policy data, obtained by or through the carriers quoting or holding the risk.",
            "Information collected automatically: the web server records the IP address, browser type, pages requested and time of each request. The quote flow sets a session cookie so your answers persist between steps, and a referral link sets a cookie recording the referral code. The site runs no analytics service and no advertising pixel. The cookie policy lists every cookie.",
          ],
        },
        {
          heading: "How we use it",
          paragraphs: [],
          bullets: [
            "To produce the analysis and quote the coverage you asked about.",
            "To submit applications to carriers and to bind, service, renew, change and cancel policies at your direction.",
            "To help with a claim when you ask the office to be involved.",
            "To respond to messages sent through the site, by email or by phone.",
            "To send service emails about your request or policy. Transactional email is delivered through a third-party email service acting on the agency's instructions.",
            "To keep the records that insurance licensing and record-retention rules require.",
            "To detect and prevent fraud, abuse and automated submissions, including through the bot check on forms.",
          ],
        },
        {
          heading: "How we share it",
          paragraphs: [
            "Personal information is disclosed only as follows. To the carriers and their underwriting partners quoting or holding your policy. To service providers under contract that process data on the agency's behalf and may not use it for their own purposes: website hosting, the database provider, the email delivery service, and the bot-detection service used on forms. To regulators, courts and law enforcement where the law requires it, and to professional advisers under a duty of confidentiality. To a successor entity if the agency is sold or merged, under the same commitments made here.",
            "The agency does not sell personal information and does not share it with anyone for targeted or cross-context behavioral advertising. It does not disclose nonpublic personal information to non-affiliated third parties for their own marketing.",
          ],
        },
        {
          heading: "Health information",
          paragraphs: [
            "Medication and health details are requested only where a health, life or Medicare line needs them, and only through the forms built for that purpose. They are used to quote and place the coverage you asked about, are shared only with the carriers considering that coverage, and are never used for marketing. Requests that include health information are kept for a shorter period than other requests, as described below.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: [
            "A request that does not become a policy is kept for twenty-four months unless the office is told to delete it sooner. A request that includes medication or health information is kept for twelve months. Client files are kept for the period state insurance record-keeping rules require after a policy ends, then deleted or anonymized. Server logs are rotated on a short schedule.",
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "The site is served over encrypted connections. Access to stored information is limited to staff who need it to do the work described here, and the office does not collect or store payment card numbers on this site. No method of transmission or storage is entirely secure, and the agency cannot warrant against every loss; if a breach affects your information, the agency will notify you as the applicable state law requires.",
          ],
        },
        {
          heading: "Your choices and rights",
          paragraphs: [
            "You may ask what personal information the agency holds about you, ask for it to be corrected, and ask for it to be deleted. Deletion is subject to the records insurance law requires the agency to keep. You may opt out of any non-service email by replying to it or by telling the office.",
            "Residents of states with consumer privacy statutes, including Nevada and Utah, may have rights to access, correct, delete and obtain a copy of their personal information and to opt out of its sale or use for targeted advertising. Information collected under the Gramm-Leach-Bliley Act is exempt from some of those statutes; the agency honors requests on the same terms regardless of the exemption. The notice titled Do not sell or share my information explains how to submit a request, how identity is verified, and how to appeal a decision.",
          ],
        },
        {
          heading: "Children",
          paragraphs: [
            "This site is not directed to children, and the agency does not knowingly collect personal information from a child under thirteen through it. Information about minors who are drivers or dependents on a policy is provided by the adult applying for the coverage.",
          ],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "Changes take effect on the date shown at the top of this page. Where a change materially reduces your rights, the agency will notify clients by email before it takes effect.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Questions and requests under this policy go to the office through the contact page, by phone or by mail to the address in the site footer.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Submit a privacy request", body: "Access, correction, deletion or a question about this policy.", label: "Contact the office", href: "/contact/" },
  ],
  seo: { description: "Privacy policy for Desert Peak Insurance: what personal information the agency collects through its website and insurance services, how it is used, shared and kept." },
};
