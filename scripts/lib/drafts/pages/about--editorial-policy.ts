import { link } from "../../lexical.mts";
import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Editorial policy",
  lede: "How the words on this site are written, checked, reviewed by a licensed person and dated — what we refuse to publish, and what happens when a reader finds something wrong.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Insurance writing goes wrong in a predictable way: a figure that sounded about right, a claim with nothing behind it, a rule quoted from memory. The process below exists to stop that before it reaches a reader, and it is written down here because anyone reading an explanation of their own coverage is entitled to know how the explanation was made.",
          ],
        },
        {
          heading: "Drafted as data, checked before publication",
          paragraphs: [
            "Every page, product description, article and glossary entry is authored as a source file in the repository that builds this site rather than typed into a box. Before any of it can be published, an automated checker reads those files and rejects the ones that break the rules the office writes under:",
          ],
          bullets: [
            "No dollar amounts and no percentage figures, except inside an example that is plainly framed as hypothetical.",
            "No statistic without a source. A claim about what something costs or how often something happens either cites where it came from or does not run.",
            "Statutory figures either cite the state's own official page or are left out, with the mechanism described and the regulator named instead.",
            "No competitor is named, anywhere, and no superlative is used about the agency.",
            "Headings in sentence case, plain words, and any term that needs defining linked to the glossary rather than assumed.",
          ],
        },
        {
          heading: "Reviewed by a licensed person",
          paragraphs: [
            "A checker can catch an invented number. It cannot tell whether an explanation of a coverage is correct, and that judgement belongs to someone licensed to give it. Every product, page, article and glossary term is read by a licensed person before it is marked reviewed, and the published page then carries a \"Last reviewed\" date so you can see when a human last stood behind it. Daniel Ellis, the principal advisor, performs or signs off on that review. A page with no such date has not been through this step.",
          ],
        },
        {
          heading: "Gaps are marked, not filled",
          paragraphs: [
            "When a fact is not confirmed — a license number, a date, a detail only the office can supply — the source file carries a token in its place and the published page prints \"[to be confirmed]\". It reads as unfinished because it is. The alternative is a plausible guess, and a plausible guess is worse than a visible blank: a reader has no way to tell it apart from a fact that was actually checked, and neither, later, does the writer.",
          ],
        },
        {
          heading: "Corrections",
          paragraphs: [
            "A correction is made by editing the source file and sending the page back through the checker and the licensed review, which moves the review date forward. There is no quiet edit: a page that changed is a page that was read and approved again.",
            [
              "If you find something here that is wrong, out of date or simply unclear, write to the office through the ",
              link("contact page", "/contact/"),
              " and name the page. Corrections that come from readers are the fastest ones to make, and they are welcome.",
            ],
          ],
        },
        {
          heading: "What this content is, and is not",
          paragraphs: [
            "Everything published here is general information about how insurance works. It is not advice about your policy and it is not a statement of what your policy covers. Coverage depends on the form, the endorsements, the limits and the deductibles on your own contract, and on the state that regulates it. The policy language governs: where this site and a policy disagree, the policy is right and this site is wrong. A question about a specific policy has to be answered by a licensed advisor who has read that policy.",
          ],
        },
      ],
    },
    { type: "cta", heading: "Found something wrong?", body: "Tell the office which page and what is off. A correction goes through the same review as the original.", label: "Contact the office", href: "/contact/" },
    { type: "disclosure", key: "independentAgency" },
  ],
  seo: { description: "How Desert Peak Insurance writes, checks, reviews and dates its content: automated checks before publication, licensed review, marked gaps and reader corrections." },
};
