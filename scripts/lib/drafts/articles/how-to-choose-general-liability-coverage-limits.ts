import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "How to choose general liability coverage limits",
  excerpt: "A general liability limit is two numbers: what the policy pays for one incident and what it pays in a year. How to read the limits on a quote, find the floor your contracts set, size the numbers to what a claim would cost, and know when an umbrella is the better route up.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A general liability policy answers when someone outside your business says you injured them or damaged their property and they want to be paid. The limit is the most the carrier will pay on your behalf, and choosing it is the one decision on the policy that is genuinely yours; the form, the exclusions and the rating basis are largely fixed by the carrier. Set it too low and a single serious claim runs through it and into the company's bank account. Set it higher than anyone requires and the extra premium is real but usually smaller than people expect, because the second million costs far less than the first.",
        "This guide is for the owner of a small or mid-sized business in Arizona, Nevada, Utah or Idaho who has a quote or a renewal in hand. It works through the limits in the order that matters: what they mean, what your contracts force, what a claim would cost, and how to reach the right number for the least premium.",
      ],
    },
    {
      heading: "What to gather first",
      paragraphs: ["The right limit is set against documents, not instinct. Collect these before you compare quotes."],
      bullets: [
        "The current declarations page, or the quote, showing each limit line: each occurrence, general aggregate, products and completed operations aggregate, personal and advertising injury, damage to rented premises, and medical expense.",
        "Every contract, lease and vendor agreement you have signed or are about to sign, with the insurance clause found and marked. Landlords, general contractors, municipalities and large customers each write their own requirement.",
        "The certificates of insurance you have been asked to produce in the past year; the requested limits on them are a record of what your market expects.",
        "A short description of what the business does, where it does it and who is present: customers on your premises, your staff on other people's premises, products that leave your hands, or work that stays in place after you finish.",
        "Your revenue and payroll figures, because the premium is rated on them and a higher limit is quoted as a multiple of the base.",
        "Any claims or incidents in the past several years, including ones that never became claims, since they show what kind of loss your business actually produces.",
      ],
    },
    {
      heading: "Step one: understand what each limit line does",
      paragraphs: [
        "The each-occurrence limit is the most the policy pays for all damages arising from one accident or event, however many people were hurt or how many lawsuits followed. The general aggregate is the most it pays in the policy year for all occurrences combined, other than products and completed operations, which have their own aggregate. On a standard form the aggregate is typically written at twice the occurrence limit, so a policy described as one million and two million pays up to one million for any single event and two million across the year. Once an aggregate is exhausted, the policy has no more to give until it renews, and a business that has had two large claims by September is uninsured for the fourth quarter unless the aggregate is reinstated by endorsement.",
        "The products and completed operations aggregate matters to anyone who sells a physical product or leaves finished work behind: a contractor, a manufacturer, a food business. A claim that arises after the work is done or the product has left your control is paid from this aggregate rather than the general one. Personal and advertising injury covers libel, slander, wrongful eviction and copyright in your advertising, and is usually written at the occurrence limit. Damage to rented premises and medical expense are small sublimits and rarely decisive.",
        "Defence costs are the other half of the picture. On the standard commercial general liability form the carrier pays the cost of defending you in addition to the limit, so a two-year lawsuit that ends in a modest settlement does not eat the limit with lawyers' fees. Some non-standard and surplus lines forms put defence inside the limit, which makes a nominally identical limit worth much less. Check which you are being quoted.",
      ],
    },
    {
      heading: "Step two: find the floor your contracts set",
      paragraphs: [
        "Read the insurance clause in every agreement. The limit named there is a floor, not a recommendation: the other party will not sign, or will not pay, until the certificate shows at least that figure, and a general contractor's project manager will hold a draw over a shortfall of one line. Clauses commonly name the occurrence and aggregate limits, sometimes the products aggregate, and often add conditions that are not limits at all but affect what you buy: additional insured status for the other party, primary and noncontributory wording, a waiver of subrogation, and in construction a per-project aggregate so that a claim on one job does not deplete the aggregate available on another.",
        "The highest figure across all your contracts is the minimum you can carry and still do the work you have. If one customer demands more than the rest, price the higher limit before deciding whether to walk away from the contract; the difference is often less than the margin on the job. Public-sector and hospital contracts tend to sit at the top of the range; size to them before bidding rather than after winning.",
      ],
    },
    {
      heading: "Step three: size the limit to what a claim would cost",
      paragraphs: [
        "The contract floor tells you what others require. Your own exposure tells you whether that floor is enough. Think about the worst plausible event for your particular business, not the routine one. For a retail shop it is a customer who falls, breaks a hip and needs surgery and months of care. For a landscaper it is a mower that throws a stone through a car windscreen on a busy road, or a fire started by equipment on a client's property. For a contractor it is finished work that fails and damages the building around it. For a caterer it is an outbreak that sends a wedding party to hospital. In each case, add the medical costs, the lost income of the injured person, the property repair and a jury's view of pain and suffering, and ask whether the occurrence limit covers it with room to spare.",
        "Then weigh what sits behind the limit. A sole proprietor's personal assets are reachable by a judgment that exceeds the policy; an LLC or corporation shields the owner but not the business, and a judgment beyond the limit can take the business itself. Owners with more to lose sensibly buy more limit. Weigh, too, how many people your business touches: a retailer on a busy corner faces more occurrences a year than a consultant who visits one client a week, which argues for a higher aggregate.",
      ],
    },
    {
      heading: "Step four: choose between a higher limit and an umbrella",
      paragraphs: [
        "There are two ways to raise the number on the certificate. The general liability carrier can write a higher occurrence limit, though many carriers cap what they will write on a small account. Or you can leave the general liability limit where it is and add a commercial umbrella or excess liability policy, which sits above the general liability, the commercial auto and the employers liability and pays once any of them is exhausted. Above a certain point the umbrella is usually the more economical route, because one policy raises the limit over several underlying policies at once and the excess layer is priced for the rarity of large losses.",
        "An umbrella has conditions. It requires the underlying policies to carry stated minimum limits and stay in force, and it follows the underlying form, so an exclusion in the general liability is an exclusion in the umbrella. Certificate requirements can be met by showing the two policies together, and a clause that demands a specific general liability limit is satisfied by a lower general liability plus an umbrella only if the contract says so or the other party agrees. Ask before assuming.",
      ],
    },
    {
      heading: "Common mistakes",
      paragraphs: ["The errors below come up on the certificates and claims files of businesses that thought the limits question was settled."],
      bullets: [
        "Reading only the occurrence limit and never the aggregate, then finding in the autumn that two claims have used most of the year's capacity.",
        "Carrying the limit the first landlord asked for years ago while the business has grown to several locations and much larger contracts.",
        "Accepting a surplus lines quote at the same limit as the standard quote without noticing that defence costs are inside the limit.",
        "Signing a contract that demands a per-project aggregate or primary and noncontributory wording and assuming the certificate covers it; those are endorsements, and the certificate only reports what the policy contains.",
        "Buying a higher general liability limit when a commercial umbrella would raise it over the auto and employers liability as well for a similar premium.",
        "Treating the limit as the whole of the decision and ignoring exclusions for the work you actually do, such as work over a certain height, pollution, or professional advice, which no limit fixes.",
        "Letting the underlying general liability lapse or drop below the umbrella's required minimum, which quietly voids the umbrella.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose a Boise commercial painting contractor with two crews carries general liability at $1,000,000 per occurrence and $2,000,000 aggregate, and wins a bid on a school district project whose contract asks for $2,000,000 per occurrence, $4,000,000 aggregate, additional insured status and primary and noncontributory wording. Say the carrier quotes the higher general liability limit at an extra $2,400 a year, while a $1,000,000 commercial umbrella over the general liability, the commercial auto and the employers liability quotes at $1,500. The umbrella is cheaper, raises the limit over the trucks as well, and the district's risk manager confirms in writing that a $1,000,000 general liability plus a $1,000,000 umbrella meets the occurrence figure. The additional insured and primary wording are added to the general liability by endorsement for a small charge, and the certificate is issued showing both policies. Two years later a dropped scaffold plank damages a parked car and injures a passer-by, and the claim settles for $1,300,000 with defence costs on top; the general liability pays its $1,000,000, the umbrella pays the remaining $300,000, and the business pays nothing beyond the deductible. Every figure here is illustrative.",
      ],
    },
    {
      heading: "How to use this",
      paragraphs: [
        "Bring the declarations page and the insurance clauses from your contracts and we will read the limit lines against them, price a higher general liability limit and an umbrella side by side across the carriers we represent in Arizona, Nevada, Utah and Idaho, and tell you which endorsements the contracts actually demand. If the limits you carry already clear every contract and every plausible claim, the recommendation is to leave them alone and spend nothing more.",
      ],
    },
  ],
  relatedProducts: ["general-liability-insurance", "commercial-umbrella-insurance", "business-owners-policy"],
  relatedArticles: ["general-liability-insurance-explained-a-beginner-s-guide", "how-to-choose-umbrella-policy-coverage-limits", "how-to-read-a-certificate-of-insurance", "how-to-add-additional-insured-status-to-a-policy", "umbrella-policy-vs-higher-liability-limits"],
  relatedTerms: ["per-occurrence-limit", "aggregate-limit", "per-project-aggregate", "primary-and-noncontributory", "excess-liability"],
  relatedStates: ["arizona", "nevada", "utah", "idaho"],
};
