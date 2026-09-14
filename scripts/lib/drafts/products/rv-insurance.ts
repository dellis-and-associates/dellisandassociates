import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Insures a motorhome or travel trailer as both a vehicle and a home: liability on the road, physical damage to the coach, and the contents, attached equipment and campsite liability an auto policy leaves out. Full-time living, the total loss settlement and where it is stored move the premium.",
  intro: [
    "A recreational vehicle is two things at once: a vehicle that crashes and a dwelling that burns, leaks and is lived in. The policy is built to cover both. A motorhome carries the same liability, collision and comprehensive parts as an auto policy; a travel trailer or fifth wheel borrows its road liability from the tow vehicle's auto policy and needs its own policy for damage to the trailer itself. On top sit parts an auto policy has no equivalent for: personal effects, attached accessories, vacation liability at the campsite, emergency expense and total loss replacement.",
    "The premium follows the class and value of the coach, whether it is driven or towed, how it is used, where it is stored, the driver's record, the settlement basis chosen and the states it travels through. Idaho and Utah owners store for the winter and are priced for it; Arizona and Nevada owners drive year-round, and every winter the two states host visitors who bring an RV registered somewhere else, which raises the question of which state's policy and rating actually apply.",
    "The analysis settles three questions in order: how a total loss would be paid, whether the RV is a residence rather than a vacation vehicle, and whether what is inside and bolted on is covered. A policy written for weekend use on a coach someone lives in is the most common mismatch we find.",
  ],
  coverageBlocks: [
    {
      heading: "Liability, on the road and at the campsite",
      paragraphs: [
        "For a motorhome, liability pays for injuries and property damage you cause while driving, exactly as it does on a car. For a towed trailer, the tow vehicle's policy pays on the road because the trailer is an extension of it. Both types need vacation liability, which pays when the RV is parked and being used as a residence: a guest who falls on the step, an awning that blows into a neighbor's rig, a campfire that spreads. An auto policy has no answer to any of those.",
      ],
    },
    {
      heading: "Physical damage and how a total loss is settled",
      paragraphs: [
        "Collision pays for crash damage regardless of fault; comprehensive pays for hail, wind, fire, theft, vandalism, flood and animal strikes, including the deer on the highway into Island Park. The settlement basis is the decision that matters. Actual cash value pays what the coach was worth that day, and depreciation on RVs is steep enough that a coach a few years into a long loan can be worth far less than what is owed. Agreed value fixes the number in advance. Total loss replacement, offered on newer units for the first years of ownership, replaces the coach with a new one of the same model, which is the only settlement that fully answers a total loss on a coach bought new.",
      ],
    },
    {
      heading: "Personal effects and attached accessories",
      paragraphs: [
        "Personal effects covers what is inside: clothing, cookware, bedding, electronics, camping gear, at a limit you choose. Attached accessories covers what has been added to the coach: awnings, roof-mounted solar, a satellite dish, a generator, a bike rack, slide toppers. A home policy's off-premises coverage may reach some of the contents on a weekend trip, but it does not follow a full-time resident and it never covers what is bolted to the roof.",
      ],
    },
    {
      heading: "Full-timer coverage",
      paragraphs: [
        "When the RV is the primary residence, the policy needs the parts a homeowners policy would otherwise provide: personal liability that follows you rather than the vehicle, medical payments to guests, loss assessment for an RV park with shared facilities, and contents in a storage shed at the lot. A recreational-use policy carried by a full-time resident is a misrepresentation that a carrier can use to deny a claim, and it is the single question the application asks that people most often answer wrong.",
      ],
    },
    {
      heading: "Emergency expense, roadside and storage",
      paragraphs: [
        "Emergency expense pays lodging and transportation home when a covered loss disables the RV far from home, and pays to return the coach once repaired. Roadside coverage written for RVs pays for the heavy-duty wrecker a large coach needs, which an ordinary auto tow benefit will not. A storage endorsement suspends collision and liability during the off-season and keeps comprehensive running, so the coach is still covered for a garage fire or a hailstorm in February while the premium reflects that it is not being driven.",
      ],
    },
  ],
  covered: [
    "Collision damage to a motorhome or trailer, whoever is at fault",
    "Hail, wind, fire, theft, vandalism and animal strikes under comprehensive",
    "Awnings, slide-outs, roof-mounted solar and satellite equipment",
    "Clothing, cookware, electronics and camping gear inside the RV",
    "A guest injured at your campsite or by your awning",
    "Lodging and a way home when the RV breaks down on a trip",
    "The heavy-duty tow a large coach requires",
  ],
  notCovered: [
    "Wear, delamination, rot, slow leaks and mechanical breakdown",
    "Damage from rodents nesting in a stored RV, with most carriers",
    "Renting the RV to others through a peer-to-peer platform without the endorsement",
    "Living in the RV full-time on a policy written for recreational use",
    "The tow vehicle, which is insured on its own auto policy",
    "Contents of a cargo or utility trailer without a trailer endorsement",
  ],
  discounts: [
    { name: "Multi-policy", description: "The RV alongside an auto or home policy with the same carrier." },
    { name: "Paid in full", description: "The term paid at inception rather than monthly." },
    { name: "Claim-free and safe driver", description: "No RV or auto claims and a clean driving record over the look-back period." },
    { name: "RV association membership", description: "Membership in an owners' association recognized by the carrier." },
    { name: "Storage", description: "A stated off-season with collision and liability suspended, priced as a reduced premium rather than a discount line." },
    { name: "Original owner", description: "Some carriers price a coach bought new and kept by the same owner lower." },
  ],
  faqs: [
    {
      question: "Does my auto policy cover my travel trailer?",
      answer: [
        "For liability while it is hitched, yes: the tow vehicle's liability extends to a trailer it is pulling. For damage to the trailer itself, no. A trailer that rolls in a crosswind on the Nevada desert stretch is a covered claim for the cars it hits and an uncovered loss for the trailer unless it carries its own physical damage policy. The same is true of theft from a storage lot.",
      ],
    },
    {
      question: "What is total loss replacement and is it worth it?",
      answer: [
        "It replaces a coach that is totalled within the first years of ownership with a new one of the same make and model, or the closest current equivalent, rather than paying the depreciated value. It costs more than actual cash value and it matters most on a coach bought new with a loan, because the gap between the loan balance and the depreciated value can be large. After the eligibility years run out the policy usually reverts to a purchase price or agreed value settlement.",
      ],
    },
    {
      question: "I live in my RV full-time. Does a regular RV policy cover me?",
      answer: [
        "Not properly. A recreational policy assumes there is a house somewhere with a homeowners policy providing personal liability and contents coverage. A full-timer endorsement replaces those parts and the application asks the question directly. Answering it honestly costs more; answering it wrong can cost the whole claim.",
      ],
    },
    {
      question: "Do I need coverage while the RV sits in storage all winter?",
      answer: [
        "Comprehensive, yes, because storage lots are where RVs get stolen, burned, hailed on and broken into. Collision and liability can be suspended with a storage endorsement for the months it is parked, and the premium drops accordingly. Driving it during the storage period voids the suspended parts, so the dates need to reflect the actual season.",
      ],
    },
    {
      question: "Is hail damage to the roof covered?",
      answer: [
        "Under comprehensive, less its deductible, and hail is one of the more frequent RV claims in monsoon-season Arizona and the Front Range of Utah and Idaho. Roof membranes, skylights, vent covers and air conditioning shrouds are what hail destroys, and the water that follows through a cracked skylight is part of the same claim if it is reported promptly. Damage from a leak left unrepaired for a season is not.",
      ],
    },
    {
      question: "Can I rent out my RV when I am not using it?",
      answer: [
        "Not on a standard policy, which excludes use for hire. Peer-to-peer rental platforms provide their own coverage during a booking, with limits and exclusions of their own, and some carriers offer a rental endorsement that fills the gap around the booking window. What the platform covers, what it does not, and what happens to your policy if a renter crashes are three separate questions worth asking before the listing goes live.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "home-insurance", "umbrella-insurance", "boat-watercraft-insurance", "mobile-manufactured-home-insurance"],
  seo: { description: "How an RV policy works for motorhomes and travel trailers: road and campsite liability, total loss replacement, contents, full-timer coverage and storage, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
