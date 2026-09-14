import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Replaces your belongings after a fire, theft or burst pipe, pays when you injure someone or damage the building, and covers a hotel while the unit is repaired. The landlord's policy stops at the walls; this one starts there.",
  intro: [
    "A renters policy is a homeowners policy with the building removed. It insures three things: what you own, what you owe if you are held responsible for an injury or for damage, and where you live while a covered loss is fixed. The landlord's policy covers the structure and the landlord's own liability, and it pays a tenant nothing for a burned sofa, a stolen laptop or a guest who trips over the rug.",
    "Because there is no building to insure, the premium is small next to the other lines. It is set by the contents limit and liability limit you choose, the deductible, the ZIP code and building type, your claim history and, with most carriers, whether an auto policy sits alongside it. The bundle discount on the auto policy frequently exceeds the renters premium, which makes the pair worth pricing even for a tenant who believes there is nothing in the apartment worth insuring.",
    "The analysis adds up what it would cost to replace everything in the unit, checks whether the policy pays new-for-old or depreciated value, and sets a liability limit that matches what a lease and a lawsuit could reach. Where a landlord requires proof of coverage, the certificate is issued with the landlord listed as an interested party.",
  ],
  coverageBlocks: [
    {
      heading: "Personal property",
      paragraphs: [
        "This part pays for your things after a named peril: fire, smoke, lightning, wind, hail, theft, vandalism, water released suddenly from plumbing or an appliance, falling objects, and the weight of ice and snow. It follows the property rather than the address, so a bag stolen from your car, a bike taken from a trailhead rack or a phone lifted from a hotel room is covered, usually at a reduced off-premises limit. Jewelry, cash, firearms and business equipment carry small sub-limits that a schedule can raise.",
        "The settlement basis is the term to check. Actual cash value pays what a used item was worth; replacement cost pays what a new one costs after you replace it. On a young household's furniture and electronics the gap between the two is most of the claim.",
      ],
    },
    {
      heading: "Personal liability",
      paragraphs: [
        "Liability pays when you are legally responsible for injuring someone or damaging their property: a guest hurt in your kitchen, a dog that bites at the dog park, a candle that starts a fire spreading to the unit next door. The last one is the claim tenants underestimate. When a tenant's negligence burns a building, the landlord's carrier pays the landlord and then pursues the tenant for what it paid; this coverage is what answers that demand, and it pays the defense as well.",
      ],
    },
    {
      heading: "Loss of use",
      paragraphs: [
        "If a covered loss makes the unit uninhabitable, this part pays the added cost of living elsewhere until it is repaired: the hotel, the short-term rental, meals above what you would normally spend. It pays the difference above your ordinary rent, not the whole bill, and it is written as a limit or as a period of time. A fire in a neighbor's unit that leaves yours smoke-damaged is the common trigger.",
      ],
    },
    {
      heading: "Medical payments and damage to the building",
      paragraphs: [
        "Medical payments to others pays a guest's medical bills after a minor injury in your unit without anyone establishing fault, which often settles a matter before it becomes a liability claim. The standard form also carries a small limit for damage you cause to the part of the building you rent, which answers a lease clause that makes the tenant responsible for the unit.",
      ],
    },
    {
      heading: "Endorsements worth asking about",
      paragraphs: [
        "Replacement cost on contents, water backup from a sewer or drain, identity fraud expense, a scheduled item for an engagement ring or a camera, and earthquake, which matters along the Wasatch Front, in Reno and in the Idaho mountain towns. A roommate who is not a relative is not insured by your policy unless named on it; each unrelated adult needs their own policy or a shared one that lists both.",
      ],
    },
  ],
  covered: [
    "Furniture, clothing, electronics and kitchen contents after a fire or theft",
    "Belongings stolen from your car, a storage unit or a hotel room, at a reduced limit",
    "A hotel and meals while the unit is repaired after a covered loss",
    "A guest's injury in your unit, and the lawsuit that can follow",
    "Fire or water damage you cause to the building or a neighbor's unit",
    "Water damage from a burst pipe or an overflowing washer in the unit above",
    "Bicycles and sports gear, up to the policy's limits",
  ],
  notCovered: [
    "The building, appliances and fixtures the landlord owns",
    "Flood and surface water entering from outside",
    "Earthquake, without the endorsement",
    "A roommate's belongings unless the roommate is named on the policy",
    "Bed bugs, pests and mold",
    "Your car, which needs its own policy, though the belongings inside it are covered",
    "Business inventory or equipment beyond the small built-in limit",
  ],
  discounts: [
    { name: "Multi-policy", description: "Renters and auto with the same carrier. On the auto side the discount is often larger than the renters premium itself." },
    { name: "Claim-free", description: "No claims over the carrier's look-back period." },
    { name: "Protective devices", description: "Sprinklers, a monitored alarm, deadbolts or a secured building entry." },
    { name: "Paid in full and autopay", description: "The term paid up front, or a bank draft each month." },
    { name: "Gated or secured community", description: "Some carriers price buildings with controlled access lower." },
  ],
  faqs: [
    {
      question: "My landlord requires renters insurance. What are they actually asking for?",
      answer: [
        "Usually two things: a liability limit that meets the lease, and a certificate naming the landlord as an interested party so they are told if the policy cancels. Being an interested party gives the landlord notice, not coverage; your policy still insures you, not them. Some leases ask for the landlord as an additional insured, which extends your liability coverage to claims against them arising from your unit, and most carriers can add it.",
      ],
    },
    {
      question: "How much personal property coverage do I need?",
      answer: [
        "Walk the apartment with your phone recording and add up what it would cost to buy everything again new, closet by closet. People forget clothes, shoes, kitchen equipment and the contents of the hall closet, and those add up faster than the television. Suppose a one-bedroom holds $12,000 of furniture, $6,000 of clothing and $5,000 of electronics; a limit set at the round number that covers those with room for a bike and some tools is the right starting point.",
      ],
    },
    {
      question: "Does renters insurance cover my roommate?",
      answer: [
        "Only if the roommate is a relative or is named on the policy. An unrelated roommate's belongings and liability are not covered by your policy, and a shared policy makes both of you responsible for the deductible and both of you carry a claim on your record. Separate policies are usually cleaner.",
      ],
    },
    {
      question: "Am I covered if a pipe bursts in the unit above me?",
      answer: [
        "Your own contents are covered under your policy for sudden water damage, and your carrier pays you first and then recovers from whoever was at fault. Waiting for the neighbor's or the landlord's insurer to pay instead usually means a long argument about negligence while you sleep on a wet mattress; the point of your own policy is not to have that argument.",
      ],
    },
    {
      question: "Are my things covered while I move?",
      answer: [
        "Named perils apply to belongings in transit, so theft from the moving truck or a fire is covered. Breakage by the movers is not; that falls to the moving company's own valuation coverage, which pays by weight unless you buy full value protection from them. Items in a storage unit between leases are covered at the off-premises limit.",
      ],
    },
    {
      question: "Do I need it if I own almost nothing?",
      answer: [
        "The liability part is the reason, more than the contents. Say a pan of oil catches fire, the sprinklers go off and three units are damaged; the landlord's carrier repairs the building and then looks to the tenant whose stove it was. The contents limit can be set low; the liability limit cannot, and it is the part of the policy that costs the least.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "umbrella-insurance", "home-insurance", "identity-theft-protection"],
  seo: { description: "What a renters policy covers: your belongings, your liability to the landlord and your neighbors, and a hotel while the unit is repaired, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
