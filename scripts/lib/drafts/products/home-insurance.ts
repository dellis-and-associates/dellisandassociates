import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Rebuilds the house, replaces what is in it and pays what you owe if someone is hurt on your property, less the deductibles on the page. The dwelling limit, the settlement basis on the roof and contents, and the wind and hail deductible decide what a bad year actually costs you.",
  intro: [
    "A homeowners policy is written in lettered parts, and the declarations page shows a limit for each: the dwelling, other structures, personal property, loss of use, personal liability and medical payments to others. The dwelling limit is the number the rest of the policy keys off, because the other property limits are usually set as a fraction of it, and it is the number that is most often wrong.",
    "The premium is built from the reconstruction cost of the house, its age and construction, the type and age of the roof, distance to a fire station and a hydrant, the deductibles chosen, the household's claim history and the carrier's own score for the address on wildfire, hail and wind. In the four states we serve the roof and the wildfire score move the rate more than owners expect, and a carrier can decline a house on either one.",
    "The analysis starts with whether the dwelling limit would actually rebuild the house at current construction cost, which has nothing to do with what the house would sell for. It then checks how the roof and contents are settled, the size of the wind and hail deductible, and the endorsements that close the holes the standard form leaves open. If the policy you already hold does that job, you are told so.",
  ],
  coverageBlocks: [
    {
      heading: "Dwelling and other structures",
      paragraphs: [
        "Coverage A pays to repair or rebuild the house, its attached structures and its built-in fixtures after a covered peril. Coverage B does the same for detached garages, block walls, sheds, gazebos and pool equipment, usually at a set fraction of the dwelling limit. In the common form both are written on an open-perils basis: anything not listed as excluded is covered, which puts the weight of the policy on the exclusions rather than on a list of named causes.",
        "The dwelling limit should track reconstruction cost, which includes debris removal, permits, and the jump in labor and material prices that follows a regional storm. An extended replacement cost endorsement adds a cushion above the limit for exactly that surge. Underinsuring the dwelling is the most expensive mistake on the form: a partial loss may be paid in full, but a total loss stops at the number on the page.",
      ],
    },
    {
      heading: "Personal property",
      paragraphs: [
        "Coverage C pays for the contents: furniture, clothing, electronics, tools, what is in the kitchen and the garage. It is written on named perils, a shorter list than the dwelling enjoys, and the settlement basis matters more than the limit. Actual cash value pays what a used item was worth; replacement cost pays what a new one costs, with the depreciation released once you buy the replacement and send the receipt. Jewelry, firearms, collectibles, cash and silver carry small sub-limits for theft, which a scheduled personal property endorsement lifts item by item, usually with an appraisal.",
      ],
    },
    {
      heading: "Loss of use",
      paragraphs: [
        "When a covered loss makes the house unlivable, this part pays the extra cost of living somewhere else while the repairs are made: a rental, meals beyond your usual grocery bill, boarding for pets. It is written as a dollar limit or a number of months, and it pays only the difference between your normal expenses and the temporary ones. After a wildfire evacuation it can also pay while a civil authority keeps you out of the neighborhood, even if the house itself is untouched.",
      ],
    },
    {
      heading: "Personal liability and medical payments",
      paragraphs: [
        "Personal liability pays when you are legally responsible for injuring someone or damaging their property away from a car: a guest who falls on the stairs, a dog bite at the park, a child's baseball through a neighbor's window. It pays the lawyer as well as the judgment, and the limit is the layer an umbrella policy sits on top of. Medical payments to others pays small medical bills for a guest without anyone proving fault, which is often what keeps a minor injury from turning into a claim against the liability limit.",
      ],
    },
    {
      heading: "Deductibles, wind and hail, and the roof",
      paragraphs: [
        "Most policies carry a single flat deductible for every peril, but in hail country carriers increasingly write a separate wind and hail deductible as a share of the dwelling limit, which on a large house is far more than the flat number. The roof is the other pressure point. An older roof may be settled at actual cash value only, or on a schedule that pays less each year it ages, so a monsoon hailstorm on a fifteen-year-old roof can leave the owner paying most of the replacement. Both facts are on the declarations page or in an endorsement, and both are worth reading before the storm rather than after it.",
      ],
    },
  ],
  covered: [
    "Fire, lightning and smoke damage to the house and its contents",
    "Wind and hail damage to the roof, siding and windows, less the wind and hail deductible",
    "Theft and vandalism, including belongings stolen from your car or a hotel room",
    "Water damage from a pipe that bursts suddenly, though not the pipe itself",
    "The weight of snow and ice on the roof",
    "Rent for a temporary home while a covered loss is repaired",
    "Injuries to guests and damage you cause to a neighbor's property",
    "Detached garages, block walls and sheds under other structures",
  ],
  notCovered: [
    "Flood and surface water, including a monsoon flash flood, which needs a flood policy",
    "Earthquake and earth movement, which needs a separate policy or endorsement",
    "Sewer and drain backup without the endorsement",
    "Wear, rot, mold, termites and rodents",
    "Neglected maintenance, such as a roof leak that was left for years",
    "A business run from the home beyond a small property limit",
    "Short-term rental guests unless the policy is endorsed for them",
    "Motor vehicles, apart from lawn equipment",
  ],
  discounts: [
    { name: "Multi-policy", description: "Home and auto with the same carrier. Usually the largest discount on either policy." },
    { name: "New or impact-resistant roof", description: "A roof replaced recently or built with a rated impact-resistant shingle. In hail-prone areas the roof is priced heavily, and the discount reflects it." },
    { name: "Protective devices", description: "A monitored alarm, a water shut-off sensor, fire sprinklers or a smart smoke detector." },
    { name: "Claim-free", description: "No claims over the carrier's look-back period. A small claim can cost more in lost discount than it pays." },
    { name: "New home or new purchase", description: "Newer construction, or a policy started at the time of purchase." },
    { name: "Gated community and HOA", description: "Homes inside a gated or secured community, with some carriers." },
  ],
  faqs: [
    {
      question: "How much dwelling coverage do I need?",
      answer: [
        "Enough to rebuild the house at today's construction cost, not what it would sell for. Land is not insured, and market value includes it. Carriers run a reconstruction estimator from the square footage, finishes and construction type; ask to see the inputs, because a wrong square footage or a missing basement is the usual reason the limit is short.",
        "Suppose a house would sell for $500,000 and the lot alone is worth $150,000. The dwelling limit should track the $350,000 rebuild plus an extended replacement cushion for the price surge after a regional storm, and it should be adjusted upward when you remodel.",
      ],
    },
    {
      question: "Does homeowners insurance cover monsoon damage?",
      answer: [
        "Wind, hail and lightning are covered perils, so a roof stripped by a microburst or dented by hail is a claim, subject to the wind and hail deductible. Rain that enters through the opening the wind made is covered too. Water that rises from the street or a wash and comes in at ground level is flood, which the policy excludes and a flood policy covers. Dust from a haboob that gets in through closed windows is generally not a covered loss unless a covered peril made the opening.",
      ],
    },
    {
      question: "Why did my carrier raise my premium or non-renew me over the roof?",
      answer: [
        "Hail losses in the Southwest have made the roof the single most scrutinized part of the house. Carriers now ask its age at every renewal, may inspect it from the air, and can move an older roof to actual cash value settlement, add a roof schedule, or decline to renew. Replacing the roof before the carrier forces the issue usually costs less than the premium and settlement changes that follow, and it earns a discount on the new policy.",
      ],
    },
    {
      question: "Is my house covered during a wildfire?",
      answer: [
        "Fire is a covered peril, including wildfire, and loss of use pays while an evacuation order keeps you out. The difficulty is not the coverage but the availability: carriers score every address on wildfire exposure, and a house at the urban edge in Prescott, Flagstaff, the Wasatch foothills or the Boise foothills can be non-renewed or declined on that score alone. Defensible space, a non-combustible roof and ember-resistant vents improve the score with some carriers, and where the standard market will not write the house there are last-resort options that vary by state.",
      ],
    },
    {
      question: "What is the difference between actual cash value and replacement cost?",
      answer: [
        "Actual cash value is what the item was worth used, which for a ten-year-old sofa or roof is a small share of what a new one costs. Replacement cost pays what it costs to buy new, but many policies pay the depreciated amount first and release the balance when you show you replaced the item. The choice can apply separately to the dwelling, the roof and the contents, so a policy can be replacement cost on the house and actual cash value on the roof at the same time.",
      ],
    },
    {
      question: "Are my belongings covered in a storage unit or at my child's college?",
      answer: [
        "Personal property is covered off the premises, usually at a fraction of the contents limit, and that extends to a storage unit and to a student living in a dorm. A student in an off-campus apartment is often treated as living elsewhere and needs a renters policy. Theft from a storage unit is covered but the unit's own insurance requirement is usually satisfied by naming it on a certificate, which we can issue.",
      ],
    },
  ],
  relatedProducts: ["flood-insurance", "earthquake-insurance", "umbrella-insurance", "auto-insurance", "landlord-rental-property-insurance"],
  seo: { description: "How a homeowners policy works, part by part: dwelling, contents, loss of use, liability, the roof and the wind and hail deductible, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
