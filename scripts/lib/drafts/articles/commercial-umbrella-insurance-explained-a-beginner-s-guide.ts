import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Commercial umbrella insurance explained: a beginner's guide",
  excerpt: "A commercial umbrella adds a layer of liability limit above a business's general liability, auto and employers liability policies. How the layer attaches, the difference between a true umbrella and a following-form excess policy, why contracts drive the purchase, and how to size the layer.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A business's liability policies each stop at a number. General liability stops at its per-occurrence limit, commercial auto at its combined single limit, and the employers liability part of a workers' compensation policy at its own modest figures. A commercial umbrella is a single policy that sits on top of all of them and adds one more layer of limit, so that a large judgement that exhausts the policy underneath does not proceed straight to the company's bank account and, for a sole proprietor or a partner, to the owner's house.",
        "It is bought for two reasons that arrive in a different order than people expect. The first is a contract: a general contractor, a landlord, a municipality or a large customer states an umbrella limit as a condition of the job, and the certificate has to show it. The second is the exposure itself: a fleet on the interstate, a crew on a roof, a product in a stranger's kitchen. This guide explains how the layer works, where umbrella and excess forms differ, what the carrier demands of the policies underneath, and how to arrive at a figure.",
      ],
    },
    {
      heading: "How the layer attaches",
      paragraphs: [
        "The umbrella lists the underlying policies on a schedule with the limits each must carry. Those scheduled limits are the attachment points. When a covered claim exceeds the underlying limit, the umbrella pays from that point up to its own limit. If the underlying policy is not in force, or is carrying less than the scheduled limit, the umbrella still treats the scheduled figure as the floor and the business pays the difference itself. The obligation to maintain underlying insurance is a condition of the policy, not a courtesy.",
        "Suppose a landscaping company carries a general liability policy at $1,000,000 per occurrence, a commercial auto policy at $1,000,000 combined single limit, and a $3,000,000 umbrella scheduled over both. A crew truck runs a red light in Mesa and injures three people; the claims settle at $2,500,000 in total. The auto policy pays its $1,000,000; the umbrella pays the next $1,500,000 and still has $1,500,000 in reserve for the year. Had the company let the auto limit slide to $500,000 at renewal without telling the umbrella carrier, the umbrella would attach at $1,000,000 and the middle $500,000 would be the company's. Round figures for illustration; the mechanism is exact.",
        "Umbrella limits carry their own aggregate. A busy year with several large losses can exhaust it, and the umbrella aggregate is often the same as the per-occurrence limit, which surprises owners who assume the layer resets with each claim.",
      ],
    },
    {
      heading: "Umbrella versus following-form excess",
      paragraphs: [
        "The words are used loosely, and the difference matters when a claim arrives. A true umbrella has its own insuring agreement, which can be broader than the policies beneath it. Where the umbrella covers something the underlying policy does not, it drops down and pays from the first dollar after a self-insured retention, a stated amount the business pays itself. A following-form excess policy does the opposite: it adopts the terms, conditions and exclusions of the underlying policy exactly and adds only limit. If the underlying policy would not pay, neither will the excess.",
        "In practice most umbrellas sold to small and mid-sized businesses are a hybrid. They follow form for the main coverages and grant a little breadth around the edges, and they also carry exclusions of their own that can be narrower than the underlying, for example around pollution, certain professional services or abuse and molestation. Reading the umbrella's exclusions against the general liability policy's is the single most useful thing an agent does on this line, because a gap between them means a claim the primary carrier pays and the umbrella carrier declines.",
      ],
    },
    {
      heading: "What sits underneath, and what the carrier requires of it",
      paragraphs: ["The umbrella carrier will typically require each of the following to be in force, at limits it states, before the umbrella takes effect."],
      bullets: [
        "Commercial general liability, at a per-occurrence and aggregate limit set by the umbrella carrier, usually on an occurrence form.",
        "Commercial auto liability for every owned vehicle, plus hired and non-owned auto coverage for employees who drive their own cars on company business.",
        "Employers liability, the second part of the workers' compensation policy, at stated limits; the umbrella sits above employers liability but never above the workers' compensation benefits themselves.",
        "Liquor liability where the business sells or serves alcohol, or the umbrella will exclude it.",
        "Sometimes professional liability, but usually the umbrella excludes professional services outright and a separate E&O policy is expected to carry that exposure.",
        "Any additional scheduled policies, such as a garage policy for an auto repair shop or a watercraft policy for an outfitter.",
      ],
    },
    {
      heading: "Why contracts drive the purchase",
      paragraphs: [
        "Most first umbrellas are bought because a contract says so. A general contractor's subcontract, a commercial lease, a municipal service agreement or a hospital's vendor terms will state the limits the business must show on a certificate of insurance, and the umbrella is how a small company reaches those figures without rewriting each primary policy. The contract will usually also require the umbrella to name the other party as an additional insured, to be primary and non-contributory, and to waive subrogation. An umbrella that follows form typically extends those endorsements automatically from the underlying policy; a stand-alone umbrella may need them added, and the certificate is wrong until they are.",
        "Read the required limit against the required form. A contract that asks for a stated excess limit on an occurrence basis, with defence outside limits, is describing a specific policy, and a claims-made umbrella with defence inside limits does not satisfy it even at the same number.",
      ],
    },
    {
      heading: "What the umbrella excludes",
      paragraphs: ["The umbrella adds limit to the liability exposures underneath it; it is not a place to find coverage the business never bought."],
      bullets: [
        "Damage to your own property and injury to your own employees, beyond what employers liability covers.",
        "Professional errors and omissions, on almost every form.",
        "Pollution, except a very limited set of sudden and accidental events on some forms.",
        "Cyber and data events, which need their own policy.",
        "Employment practices such as wrongful termination and harassment, unless specifically scheduled over an EPLI policy.",
        "Aircraft, and often unmanned aircraft used for inspection or marketing, unless endorsed.",
        "Punitive damages in states where they are uninsurable, and intentional acts everywhere.",
        "Anything the underlying policy excludes, on a following-form excess.",
      ],
    },
    {
      heading: "Sizing the layer",
      paragraphs: [
        "Start with the contract requirements, since they are non-negotiable. Then look at the exposures that produce the very large claim: vehicles, especially heavy ones and those driven long distances; work at height or with the public underfoot; products that people ingest, sit on or plug in; alcohol service; and premises with many visitors. Each of those argues for another increment. The first increment of umbrella limit is the most expensive because the chance of a claim reaching it is highest; each further increment costs less per dollar of limit, so moving from a small layer to a moderate one is usually a modest change in premium.",
        "Fleet size and driver records move a commercial umbrella premium more than anything else, because auto claims are where the large judgements come from. A single serious accident on I-15 between Las Vegas and St. George, or on I-84 across southern Idaho, can produce a claim that would exhaust an ordinary auto limit several times over, and a business with trucks on those roads should size the umbrella to that scenario rather than to the general liability exposure.",
      ],
    },
    {
      heading: "What decides the premium",
      paragraphs: [
        "The carrier rates the umbrella from the same information as the underlying policies: payroll, revenue, vehicle count and type, driver records, class of operations, the limits and carriers underneath, and the loss history for several years. Two things owners can control matter most. Keeping the underlying policies with carriers the umbrella carrier accepts, since some will not sit over a non-admitted primary, and keeping the loss runs clean, since a large paid loss on the primary policy raises the umbrella premium the following year even though the umbrella paid nothing.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Gather the insurance requirements from your three largest contracts or your lease, the declarations pages for general liability, auto and workers' compensation, and a vehicle list with drivers. From those we can say whether an umbrella is required, whether the underlying limits already meet the scheduled minimums or need raising first, and what layer fits the exposure. If the primary limits already satisfy the contracts and the operation has no vehicles and no public foot traffic, the recommendation may be to do nothing, and we will say that. Otherwise we quote the umbrella with the underlying policies together, across the carriers we represent in Arizona, Nevada, Utah and Idaho, so the schedule and the endorsements line up from the start.",
      ],
    },
  ],
  relatedProducts: ["commercial-umbrella-insurance", "general-liability-insurance", "commercial-auto-insurance", "workers-compensation-insurance", "contractors-insurance"],
  relatedArticles: ["primary-vs-excess-insurance", "umbrella-insurance-explained-a-beginner-s-guide", "how-to-read-a-certificate-of-insurance", "how-to-choose-general-liability-coverage-limits", "how-to-add-additional-insured-status-to-a-policy"],
  relatedTerms: ["excess-liability", "self-insured-retention", "per-occurrence-limit", "aggregate-limit", "additional-insured", "primary-and-noncontributory", "certificate-of-insurance"],
};
