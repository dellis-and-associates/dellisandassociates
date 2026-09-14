import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Careers",
  lede: "Desert Peak Insurance hires licensed producers and support staff in Arizona, Nevada, Utah and Idaho when the work calls for it. Openings, when there are any, are listed on this page.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: ["Current openings: {{TODO:site.careersOpenings}}"],
        },
        {
          heading: "What the work is",
          paragraphs: [
            "An advisor here reads declarations pages, prices the same coverages across the carriers the agency represents, writes findings that show the numbers, and services the policies afterward: renewals, changes, certificates and claims. The agency does not measure an advisor by how many policies were moved, because the analysis is free and a fair share of findings end with a recommendation to renew. The job is to be right, in writing, in plain words.",
          ],
        },
        {
          heading: "Licensing",
          paragraphs: [
            "Producer roles require a property and casualty or life and health license in at least one of the four states, or a willingness to sit the state examination within the period an offer sets out. Non-resident licenses in the other states follow. Continuing education runs on each state's renewal schedule and is part of the role.",
          ],
        },
        {
          heading: "How to apply",
          paragraphs: [
            "Send a résumé and a short note on the lines you have worked and the states you are licensed in through the contact page. Applications go to the office and are read by the principal advisor.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Send an application", body: "A résumé and a few lines about the work you have done.", label: "Contact the office", href: "/contact/" },
  ],
  seo: { description: "Careers at Desert Peak Insurance: producer and support roles in Arizona, Nevada, Utah and Idaho, what the work involves, and how to apply." },
};
