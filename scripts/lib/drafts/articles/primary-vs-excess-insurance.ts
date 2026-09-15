import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Primary vs excess insurance",
  excerpt: "Primary insurance pays first and handles the claim; excess insurance pays only after a stated underlying limit is used up. How the layers attach, why defence costs decide more than the limit, a worked claim through both layers, and when a single primary policy is the right structure.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Every liability claim is paid from the bottom up. The primary policy is the one that responds first: it investigates, hires the defence lawyer, negotiates, and pays up to its limit. An excess policy sits above it and pays nothing until the primary limit is exhausted, then takes over for the remainder up to its own limit. The two are not competing products. They are layers of one tower, and the question a buyer faces is how tall the tower needs to be and how much of it should be bought in each layer.",
        "That question is easier to answer once you see that the layers are priced on different logic, respond to different events, and carry different duties. Primary carriers expect to pay claims every year. Excess carriers expect to pay rarely, and the premium for each layer reflects that.",
      ],
    },
    {
      heading: "What primary insurance is",
      paragraphs: [
        "A primary policy is the ordinary auto, homeowners, general liability or commercial auto policy. It carries a limit per occurrence and often an aggregate limit for the policy year. It has a deductible or none. Most importantly, it carries the duty to defend: when a claim arrives, the primary carrier assigns an adjuster, retains counsel, and pays for the defence, in many personal and small commercial forms outside the limit, so that legal fees do not erode the money available to pay the injured party.",
        "The primary carrier also controls the claim. It decides whether to settle or fight, within the limit, and it owes the insured a duty to settle reasonably when a claim within the limit could be resolved. A primary carrier that refuses a reasonable settlement inside its limit and then loses a larger verdict can be held responsible for the overage in many jurisdictions, which is the main reason primary carriers settle serious claims rather than gamble.",
      ],
    },
    {
      heading: "What excess insurance is",
      paragraphs: [
        "An excess policy attaches at a stated underlying limit and pays above it. A true excess policy, often called following form, adopts the terms, conditions and exclusions of the primary policy beneath it: whatever the primary covers, the excess covers for the amount above the primary limit, and whatever the primary excludes, the excess excludes too. A personal or commercial umbrella is a close relative that also follows form on most claims but adds some coverage the primary lacks, subject to a self-insured retention on those drop-down claims. This article is about the pure excess layer; the umbrella's extra breadth is covered elsewhere.",
        "The excess carrier's duties are narrower. It does not usually investigate or defend while the primary is handling the claim. Its obligations begin when the primary limit is paid or tendered, and its policy states whether defence costs it then incurs sit inside or outside its own limit. It requires the insured to maintain the scheduled underlying limits for the policy term; if the underlying policy is cancelled, reduced or exhausted by unrelated claims, the excess policy still attaches at the scheduled figure and the insured absorbs the gap.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "The difference is not the size of the limit. A household or business can buy a large primary limit or a small excess limit; either is possible. The difference is where the layer sits in the frequency of claims. The primary layer absorbs every fender-bender, slip and fall, and disputed invoice. The excess layer sees only the claims that break through the primary limit, which in a well-structured programme are rare. Premium per dollar of limit is therefore far lower in the excess layer, and the higher the attachment point, the lower it goes.",
        "The second difference is who controls the claim and pays for the lawyers. Under a primary policy the carrier defends from the first letter. Under a pure excess policy the carrier typically reserves the right to associate in the defence once its layer is likely to be reached, and it may or may not pay defence costs in addition to its limit. A business buying excess coverage should read that clause before comparing premiums, because an excess policy whose limit erodes with defence costs is worth materially less on a large claim than one whose defence costs are paid outside the limit.",
        "The third difference is exhaustion. Primary limits are used up by settlements and judgments in the policy year, and a business with a busy claims year can find its aggregate consumed before the serious claim arrives. The excess policy then attaches as scheduled and the business pays the eroded portion itself. Some excess forms drop down to fill an aggregate exhausted by covered claims; many do not. Knowing which you have is the difference between a programme and a collection of policies.",
      ],
    },
    {
      heading: "A worked claim through both layers",
      paragraphs: [
        "Suppose an electrical contractor in Mesa carries a general liability policy with a $1,000,000 per-occurrence limit and a $2,000,000 aggregate, and a $3,000,000 following-form excess policy attaching at those limits. A fire at a client's warehouse is traced to the contractor's work and the client's property carrier, after paying its own insured, sues the contractor to recover $2,500,000. The primary carrier defends, pays counsel outside its limit, and eventually tenders its $1,000,000 limit toward a settlement. The excess carrier pays the remaining $1,500,000 and the contractor pays nothing beyond its deductible. If the excess policy pays defence costs inside its limit, the $1,500,000 plus the legal fees after the primary tender all come from the $3,000,000, which still covers this claim but leaves less for anything else that year.",
        "Now suppose the same contractor had already settled two unrelated injury claims earlier in the year for $600,000 each, using $1,200,000 of the $2,000,000 aggregate. When the fire claim arrives, only $800,000 of aggregate remains. The primary pays $800,000, the excess attaches at the scheduled $1,000,000 rather than at what the primary actually had left, and the contractor owes the $200,000 gap before the excess begins paying. A contractor who had bought a higher primary aggregate or an excess form that drops down over an exhausted aggregate would owe nothing. All figures are illustrative; the shape of the problem is what matters.",
      ],
    },
    {
      heading: "Who each layer suits",
      paragraphs: ["The decision is about the size of the plausible worst claim and about how many separate primary policies the excess would sit over."],
      bullets: [
        "A household or sole proprietor whose plausible worst claim is within the top primary limit its carrier offers, and who holds only one or two policies, is usually well served by a strong primary limit alone.",
        "A business that signs contracts requiring liability limits higher than its primary carrier will write, which is common in construction, property management and municipal work across Arizona, Nevada, Utah and Idaho, needs an excess layer to meet the contract, and should have the excess carrier's certificate ready alongside the primary.",
        "A business with several primary policies, such as general liability, commercial auto and employers liability, gains most from a single excess layer above all of them, because one excess limit is available whichever policy the claim comes through.",
        "A business with high claim frequency should spend on the primary aggregate before it spends on excess; the excess does not help with a primary layer that keeps running dry.",
        "Anyone whose primary carrier is a non-admitted or thinly rated company should ask whether the excess carrier will accept that primary; excess underwriters schedule the underlying carriers they will sit above, and a change of primary carrier can void the attachment.",
      ],
    },
    {
      heading: "What people get wrong",
      paragraphs: [
        "The commonest error is buying the excess layer and then letting the underlying limits drift. A commercial auto policy renewed at a lower limit to save premium, or a general liability policy replaced mid-term with one carrying a lower aggregate, opens a gap the excess carrier will not fill. The excess schedule of underlying insurance should be checked at every renewal of every primary policy, not only at the excess renewal.",
        "The second is comparing excess quotes on limit and premium alone. Two excess quotes at the same limit can differ on whether defence costs erode the limit, whether the form follows the primary or carries its own exclusions, whether it drops down over an exhausted aggregate, and whether it covers the same territory and the same additional insureds as the primary. A cheaper excess quote that carries its own exclusions is a different product.",
        "The third is assuming the excess carrier will defend. When a claim is clearly headed above the primary limit, the insured or its agent should put the excess carrier on notice early. Excess policies have notice conditions, and a carrier that first hears of a claim at the primary tender may dispute late notice on a claim it could have influenced.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A programme where every primary policy still matches the excess schedule, the excess form follows the primary, defence costs are outside the excess limit, and the total tower matches the largest contract requirement and the plausible worst claim, is correctly built, and the annual review is arithmetic rather than redesign. A small operation with one primary policy, no contract requirements and a limit at the top of what its carrier offers is also reasonably placed, and the time to add an excess layer is when the first large contract arrives, a second line of coverage is added, or the assets at risk grow past the primary limit. Adding excess before those events buys a layer that has nothing to sit over.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Gather the declarations pages and the schedule of underlying insurance from any excess policy already in force, plus the insurance clauses of the contracts you sign most often. From those we can lay out the tower as it stands, mark where each layer attaches and what erodes it, and price the alternatives across the carriers we represent in Arizona, Nevada, Utah and Idaho: more primary, more excess, or a rebuilt combination. If the existing structure already covers the contracts and the exposure, that is what the analysis will say.",
      ],
    },
  ],
  relatedProducts: ["general-liability-insurance", "commercial-umbrella-insurance", "umbrella-insurance", "contractors-insurance"],
  relatedArticles: ["umbrella-policy-vs-higher-liability-limits", "commercial-umbrella-insurance-explained-a-beginner-s-guide", "how-to-choose-general-liability-coverage-limits", "self-insured-retention-vs-deductible", "how-to-read-a-certificate-of-insurance"],
  relatedTerms: ["excess-liability", "per-occurrence-limit", "aggregate-limit", "self-insured-retention", "umbrella-policy"],
};
