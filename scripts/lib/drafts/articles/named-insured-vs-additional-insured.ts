import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Named insured vs additional insured",
  excerpt: "The named insured owns the policy's rights and duties; an additional insured is someone added to borrow its liability protection for one relationship. What each status grants, why contracts require it, a worked jobsite claim, and what a certificate does not do.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Every liability policy answers the question of who it protects in layers. At the centre is the named insured, the person or business shown on the declarations page. Around it is a ring of people the policy treats as insureds automatically, such as employees or a spouse. Beyond that, by endorsement, sit additional insureds: outside parties the named insured has agreed, usually by contract, to protect under its own policy.",
        "The labels sound similar and are routinely confused, especially on certificates of insurance. The practical difference is large. A named insured controls the policy and is covered for its full scope. An additional insured is covered only for claims connected to the named insured's work, premises or operations, and only to the extent the endorsement says.",
      ],
    },
    {
      heading: "What being a named insured means",
      paragraphs: [
        "The named insured is the party the policy is issued to. On a business policy it is the legal entity, and additional entities such as affiliated LLCs can be listed as named insureds too. On a homeowner or auto policy it is the individual, with a spouse in the same household typically included by definition. The first named insured, the one listed first, carries particular duties under most commercial forms: paying the premium, receiving cancellation and non-renewal notices, requesting changes and receiving any return premium.",
        "Named insured status comes with the policy's full coverage grant, subject to its exclusions, and the right to make claims, request endorsements and cancel. The policy's who-is-an-insured provision then extends protection to others acting for the named insured, such as employees within the scope of their work, partners or members, and on personal policies resident relatives. Those people are insureds without being named insureds.",
      ],
    },
    {
      heading: "What being an additional insured means",
      paragraphs: [
        "An additional insured is added to someone else's policy by endorsement, most often because a contract requires it. Typical examples are a general contractor added to a subcontractor's general liability policy, a landlord added to a tenant's policy, a property owner added to a vendor's policy for an event, or a municipality added for work in a public right of way.",
        "The endorsement limits the coverage to liability arising out of the named insured's operations, work, premises or products, depending on the form. Some forms cover only ongoing operations, some add completed operations, and some are blanket endorsements that confer status on anyone the named insured has agreed in a written contract to add. The additional insured shares the named insured's limits rather than receiving its own, cannot cancel or change the policy, and generally receives no cancellation notice unless an endorsement provides for one.",
      ],
      bullets: [
        "A certificate holder is only the recipient of a certificate of insurance; being listed as one confers no coverage.",
        "A loss payee or mortgagee is an interest in property coverage, entitled to be included on a claim payment for damaged property, not a liability insured.",
        "An additional interest on a personal auto policy, such as a leasing company, is usually entitled to notice, not to liability protection.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "The difference lies in the scope of the grant and who controls the contract. A named insured is protected for whatever the policy covers in its own right. An additional insured is protected only for a claim that has the required connection to the named insured, which courts and carriers read according to the endorsement's exact wording, such as caused in whole or in part by the named insured's acts, or arising out of its work. A claim entirely caused by the additional insured's own separate activity usually falls outside that connection.",
        "Contracts then shape how the policies interact. A primary and noncontributory clause requires the named insured's policy to pay first without seeking a share from the additional insured's own policy. A waiver of subrogation prevents the named insured's carrier from recovering its payment from the additional insured. Both are endorsements, both have to be added, and neither is created by a certificate of insurance or by the contract alone.",
      ],
    },
    {
      heading: "A worked jobsite claim",
      paragraphs: [
        "Suppose a painting contractor in Chandler carries general liability limits of $1,000,000 per occurrence and $2,000,000 in the aggregate, with a blanket additional insured endorsement for ongoing and completed operations and primary and noncontributory wording. A general contractor on a commercial remodel requires both. A delivery driver trips over the painter's unsecured drop cloth, fractures a wrist and sues the general contractor, the building owner and the painter together for $300,000.",
        "The painter's carrier defends the painter as named insured and defends the general contractor as an additional insured, because the injury arose out of the painter's work, and settles for, say, $180,000 from the painter's policy. The general contractor's own policy is not touched, so its loss history stays clean. Now suppose instead the driver had fallen through a gap in scaffolding the general contractor erected itself, unrelated to painting. For example, under an endorsement limited to injury caused by the painter's acts, the painter's carrier would decline to defend the general contractor, whose own policy would respond. Either way, every dollar paid to an additional insured reduces the painter's aggregate limit for the rest of the year. The figures are hypothetical.",
      ],
    },
    {
      heading: "Who needs which status",
      paragraphs: ["The question usually comes from a contract, a landlord or a lender, and the answer depends on the relationship."],
      bullets: [
        "Every business entity that operates, owns property or signs contracts should be a named insured on its own policy; a related company working under another entity's policy as an additional insured has much narrower protection.",
        "A general contractor, landlord or event host should require additional insured status from subcontractors, tenants and vendors, specifying ongoing and completed operations and primary and noncontributory wording in the contract.",
        "A subcontractor or tenant should read the contract's insurance section before signing and confirm the policy's blanket endorsement actually matches it, rather than issuing certificates and hoping.",
        "A co-owner, trust or family member with an ownership interest in a home or vehicle should generally be a named insured or listed interest on that policy, not simply assumed to be covered.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Arizona, Nevada, Utah and Idaho each have construction anti-indemnity laws that limit how far a contract can shift responsibility for a party's own negligence onto someone else, and courts and legislatures in some states have applied similar limits to additional insured requirements. The exact scope differs by state and by whether the project is public, commercial or residential, which is why an additional insured request that is routine in one state may be unenforceable in part in another. The heavy residential and commercial building activity in the Phoenix and Las Vegas metros, along the Wasatch Front and around Boise means that trade contractors in the region see these requests on nearly every job, and a policy that grants blanket status in the form general contractors expect is worth more than a stack of individually endorsed certificates.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A contractor or tenant whose general liability policy already carries a blanket additional insured endorsement for ongoing and completed operations, with blanket primary and noncontributory and waiver of subrogation wording, is usually well set up; the task is to issue accurate certificates and compare each new contract against the endorsements. A business whose affiliated entities are all listed as named insureds needs no change either. The situations to fix are an endorsement limited to ongoing operations when contracts require completed operations, a related LLC doing business without being named, and certificates that describe additional insured status the policy does not contain. We read the contract and the endorsements side by side, and if the current policy already satisfies them, we tell you and change nothing.",
      ],
    },
  ],
  relatedProducts: ["general-liability-insurance", "contractors-insurance", "business-owners-policy", "commercial-umbrella-insurance"],
  relatedArticles: ["how-to-add-additional-insured-status-to-a-policy", "how-to-read-a-certificate-of-insurance", "primary-vs-excess-insurance", "general-liability-vs-professional-liability"],
  relatedTerms: ["named-insured", "additional-insured", "certificate-of-insurance", "primary-and-noncontributory", "waiver-of-subrogation", "hold-harmless-agreement"],
};
