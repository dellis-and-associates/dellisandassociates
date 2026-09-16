import { link } from "../../lexical.mts";
import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Daniel Ellis, principal advisor",
  lede: "The licensed person behind what you read here. He reads the declarations pages, compares the carriers the agency represents, and explains the arithmetic until it makes sense to the person paying the premium.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Daniel Ellis is the principal advisor at Desert Peak Insurance and the licensed person responsible for the content on this site. Product pages, articles and glossary entries are written or reviewed by him before they are marked reviewed and dated, which is why his name is attached to them. He has been placing insurance for {{TODO:site.yearsInPractice}} years.",
          ],
        },
        {
          heading: "What the work looks like",
          paragraphs: [
            "Most days begin with a declarations page. It is the short summary a carrier sends with a policy, and it is the one document that says what a client actually bought: the limits, the deductibles, the named insureds, the vehicles or the dwelling, the endorsements that were added and the ones that were not. Read against what a household or a business owns and owes, it is where gaps turn up — a liability limit that stops well short of the assets behind it, a deductible chosen years ago for a car that has since been replaced, a rental property still insured as though someone lived in it.",
            "The second half of the work is comparison. An independent agency holds appointments with several carriers, so the same coverages can be priced by more than one company, each with its own view of the same risk. The finding that comes back sets the options next to each other and names what the recommended one does not cover. When the numbers say the policy already in force is the right one, the finding says to keep it.",
            "The third part is explaining the math. A limit means something only when it is set against a specific loss: what the policy pays, what the client pays first, and where the coverage stops and the client's own money starts. Sitting with that arithmetic until it is clear is the part clients most often mention afterwards, because it is the part nobody had walked them through before.",
          ],
        },
        {
          heading: "Lines he works in",
          paragraphs: [
            "He writes across personal, commercial and health lines, which is what allows one advisor to look at a household and a business together rather than in pieces.",
          ],
          bullets: [
            "Personal lines: auto, home, renters, landlord and mobile home policies, motorcycle, RV, boat and personal umbrella.",
            "Life and retirement: term life, whole life, indexed universal life and annuities.",
            "Health and Medicare: individual health plans, Medicare Advantage and Medicare Supplement, and the dental and vision plans that sit alongside them.",
            "Commercial lines: general liability, business owners policies, commercial auto, workers' compensation, professional liability and surety bonds.",
          ],
        },
        {
          heading: "Where he is licensed",
          paragraphs: [
            "Daniel Ellis holds an insurance producer license in four states: Arizona, license number {{TODO:license.arizona}}; Nevada, license number {{TODO:license.nevada}}; Utah, license number {{TODO:license.utah}}; and Idaho, license number {{TODO:license.idaho}}. Each license can be verified with that state's insurance regulator, and the licensing page for each state names the regulator and links to it.",
            "A producer license is issued by the state after an examination, a background check and a fee, and renewed on a fixed cycle with continuing education. It is what allows an advisor to recommend a policy and to place it, and it is the thing a client can check independently before taking anyone's word for anything.",
          ],
        },
        {
          heading: "Recognition",
          paragraphs: [
            "UnitedHealthcare named Daniel Ellis to its Circle of Champions for plan year 2025, a recognition the carrier gives for work with Medicare clients. It is one carrier's recognition of one advisor. It is not a rating of the agency, not an endorsement of any particular plan, and not a reason to choose a plan that does not fit.",
          ],
        },
        {
          heading: "How to reach him",
          paragraphs: [
            [
              "A question about a policy, a declarations page you would like read, or a correction to something published here all go to the same place: the ",
              link("contact page", "/contact/"),
              " reaches the office and a licensed advisor answers. Ask for Daniel by name if you want the file to be his.",
            ],
          ],
        },
      ],
    },
    { type: "cta", heading: "Have your declarations page read", body: "Send what you have. You get back a written finding with the numbers shown.", label: "Contact the office", href: "/contact/" },
    { type: "disclosure", key: "medicareTpmo" },
    { type: "disclosure", key: "independentAgency" },
  ],
  seo: { description: "Daniel Ellis, principal advisor at Desert Peak Insurance: the lines he writes, the four states he is licensed in, and how to reach him." },
};
