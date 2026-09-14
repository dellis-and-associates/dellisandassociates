import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Terms of use",
  lede: "The terms on which {{TODO:site.legalName}} makes this website available. Using the site means accepting them. Effective {{TODO:legal.effectiveDate}}.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "These terms govern your use of this website, its forms, the quote flow and the partner portal (together, the site), operated by {{TODO:site.legalName}} (the agency). If you do not agree with them, do not use the site. The privacy policy and cookie policy form part of these terms.",
          ],
        },
        {
          heading: "The site is information, not coverage",
          paragraphs: [
            "Everything published on the site, including product pages, articles, the glossary and city pages, is general information about how insurance works. It is not a policy, an offer of coverage, or advice about your particular situation. Coverage is governed only by the policy a carrier issues; where a description on this site differs from the policy, the policy controls.",
            "No coverage is bound, changed or cancelled by submitting a form or completing the quote flow. A policy is in force only when the carrier issues it or an advisor confirms binding in writing. Until then, keep your existing coverage in place.",
          ],
        },
        {
          heading: "Information you submit",
          paragraphs: [
            "You agree that the information you provide is accurate and complete to your knowledge. Carriers rate and issue policies on that information, and a material misstatement can result in a higher premium, a denied claim or a rescinded policy. You are responsible for telling the office when something changes. Submitting information about another person means you have their authority to do so.",
          ],
        },
        {
          heading: "Quote sessions and accounts",
          paragraphs: [
            "The quote flow stores your answers in a session tied to a cookie on your device for a limited period. Anyone with access to that device during the period can see the answers, so use a private device or clear the session when you finish. Partner portal credentials are personal; you are responsible for activity under them and must tell the office if they are compromised.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [],
          bullets: [
            "Do not submit false, misleading or fraudulent information or impersonate another person.",
            "Do not use automated tools to submit forms, scrape content or probe the site, or attempt to bypass the bot check on forms.",
            "Do not interfere with the site's operation or attempt to access data or accounts that are not yours.",
            "Do not reproduce or redistribute the site's content beyond what the next section allows.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "The site's text, design, logos and code belong to the agency or its licensors. You may read, print and share pages for personal, non-commercial reference with the source attributed. Any other reproduction requires the agency's written permission. Carrier names and marks, where shown, belong to the carriers.",
          ],
        },
        {
          heading: "Third-party links and services",
          paragraphs: [
            "The site links to state insurance regulators, carrier portals and other outside sites, and forms use a third-party bot check. The agency does not control those sites or services and is not responsible for their content, availability or privacy practices. Payments to carriers are made on the carrier's own systems under the carrier's terms.",
          ],
        },
        {
          heading: "Disclaimer of warranties",
          paragraphs: [
            "The site is provided as is and as available. To the extent the law allows, the agency disclaims all warranties, express or implied, including accuracy, fitness for a particular purpose and uninterrupted operation. Insurance rules change, carriers change their products, and the agency does not warrant that any page reflects the current position of any carrier or state.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "To the extent the law allows, the agency is not liable for indirect, incidental, consequential or punitive damages arising from use of the site, and its total liability arising from the site is limited to the amount you paid the agency to use it, which is nothing. This limitation does not apply to liability that cannot be limited by law, and it does not limit the agency's duties under an insurance transaction, which are governed by the applicable policy, state insurance law and the agency's licensing obligations.",
          ],
        },
        {
          heading: "Indemnity",
          paragraphs: [
            "You agree to indemnify the agency against claims and costs arising from your breach of these terms or your submission of false information through the site.",
          ],
        },
        {
          heading: "Governing law and disputes",
          paragraphs: [
            "These terms are governed by the laws of {{TODO:legal.governingLawState}} without regard to its conflict-of-law rules, and disputes about the site are brought in the courts of that state. Nothing here limits your right to complain to a state Department of Insurance about the agency's conduct as a licensed producer.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "The agency may revise these terms by publishing a new version with a new effective date. Continued use of the site after that date is acceptance of the revised terms.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: ["Questions about these terms go to the office through the contact page."],
        },
      ],
    },
  ],
  seo: { description: "Terms of use for the Desert Peak Insurance website: information not coverage, what you submit, acceptable use, intellectual property, disclaimers and governing law." },
};
