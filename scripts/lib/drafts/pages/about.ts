import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "About Desert Peak Insurance",
  lede: "An independent agency licensed in Arizona, Nevada, Utah and Idaho. We compare the carriers we represent, show the math, and say when keeping what you have is the right answer.",
  blocks: [
    {
      type: "richText",
      sections: [
        { heading: "", paragraphs: ["Desert Peak Insurance is an independent agency. We do not work for one carrier; we hold appointments with many, which means the analysis can compare the same coverage across several companies and place the policy where it fits. The analysis costs nothing and there is never a fee for our service."] },
        { heading: "How we work", paragraphs: ["You send what you have, usually a declarations page or the answers in the quote flow. A licensed advisor reads the limits against what you own and owe, marks the gaps, and prices the same coverages with the carriers we represent. You get a written finding with the numbers shown. If the recommendation is to change nothing, that is the recommendation."], bullets: ["Personal lines: auto, home, renters, umbrella, life, health, Medicare and the specialty lines in between.", "Commercial lines: general liability, business owners policies, commercial auto, workers' compensation and the coverages a small business is asked to carry.", "Plain words. Policy, limit, deductible, premium, claim. Anything that needs a glossary term is linked to one."] },
        { heading: "Where we are licensed", paragraphs: ["Arizona, Nevada, Utah and Idaho. Each state's licensing page lists the license number and the state Department of Insurance, which is where a complaint or a verification goes."] },
      ],
    },
    { type: "cta", heading: "Request the analysis", body: "Twenty minutes. Your numbers. No obligation.", label: "Request the analysis", href: "/quote/" },
    { type: "disclosure", key: "independentAgency" },
  ],
  seo: { description: "Desert Peak Insurance is an independent agency licensed in Arizona, Nevada, Utah and Idaho. How the analysis works, what we write, and where we are licensed." },
};
