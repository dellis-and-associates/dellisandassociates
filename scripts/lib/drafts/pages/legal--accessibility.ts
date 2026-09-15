import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Accessibility statement",
  lede: "Desert Peak Insurance intends this website to be usable by everyone, including people who use screen readers, keyboards, magnification or voice control. The target is WCAG 2.2 at level AA. Last reviewed September 15, 2026.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Insurance documents are hard enough to read without the website adding barriers. The agency builds and tests this site against the Web Content Accessibility Guidelines, version 2.2, at the AA level, and treats a reported barrier as a defect to be fixed rather than a request to be considered.",
          ],
        },
        {
          heading: "What the site does",
          paragraphs: [],
          bullets: [
            "Every page has a logical heading structure, and every interactive element can be reached and operated with a keyboard alone, with a visible focus indicator.",
            "Text and interface colors meet the AA contrast ratios in both the light and dark color schemes, and the site follows your system preference.",
            "Form fields have visible labels, errors are announced and say what to do, and nothing is submitted on a timer.",
            "Text can be resized and the layout reflows on narrow screens without horizontal scrolling.",
            "Motion respects the reduced-motion setting on your device. Images that carry information have text alternatives; decorative images are hidden from assistive technology.",
            "Pages are tested with automated tooling and with a screen reader before they are published.",
          ],
        },
        {
          heading: "Known limitations",
          paragraphs: [
            "Conformance is not yet complete, and the following are known. Declarations pages and policy documents supplied by carriers are PDF files whose accessibility the agency does not control; ask the office for the information in another format. The bot check on forms is provided by a third party and its widget is outside the agency's control, though it offers an accessible challenge. Carrier payment and claims portals linked from the site belong to the carriers.",
          ],
        },
        {
          heading: "Report a barrier",
          paragraphs: [
            "If any part of the site is difficult or impossible to use, tell the office through the contact page or by phone. Include the page address, what you were trying to do, the browser and assistive technology you use, and what happened. The office acknowledges reports promptly, gives a date for the fix, and provides the content or service you needed in another way in the meantime, by phone, by email or on paper.",
          ],
        },
        {
          heading: "Standards and approach",
          paragraphs: [
            "The site is built with semantic HTML, tested against WCAG 2.2 AA success criteria as part of every release, and audited when the design changes. This statement is reviewed when the site changes materially and at least once a year.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Report an accessibility barrier", body: "Page, task, browser and assistive technology are enough for the office to reproduce it.", label: "Contact the office", href: "/contact/" },
  ],
  seo: { description: "Accessibility statement for Desert Peak Insurance: WCAG 2.2 AA commitment, what the site does, known limitations, and how to report a barrier." },
};
