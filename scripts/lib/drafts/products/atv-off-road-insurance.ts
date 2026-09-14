import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Covers a quad, side-by-side, dirt bike or snowmobile for rollover, collision, theft and the injuries you cause to others on trails and public land, where a home or auto policy usually stops. Machine value, use and the number of operators set the premium.",
  intro: [
    "An off-road vehicle policy is an auto-style policy for machines that rarely see pavement: ATVs, side-by-sides, dirt bikes, snowmobiles and golf carts. It carries liability, collision, comprehensive, medical payments and uninsured motorist parts, each with its own limit or deductible, plus coverage for the accessories people bolt on and the trailer they haul the machine with.",
    "A home policy covers a recreational vehicle's liability only on your own property with most forms, and pays nothing for damage to the machine anywhere. The auto policy does not list it at all. So the moment a side-by-side leaves the driveway for the dunes at Sand Hollow, the trails around Bear Lake, the washes outside Phoenix or the snow above McCall, its owner carries the whole loss alone unless a separate policy exists.",
    "The premium is set by the machine's type and value, engine size, the ages of the operators, whether it is used for recreation or for ranch work, where it is stored, the accessories added, and whether the state or land manager where you ride asks for proof of liability. The analysis checks the state you ride in most, not only the one you live in, because the four states run their own off-highway registration and permit programs and none of them match.",
  ],
  coverageBlocks: [
    {
      heading: "Liability",
      paragraphs: [
        "Liability pays for injuries and property damage you cause to others: a rider you collide with on a blind dune crest, a hiker on a shared trail, a fence and the cattle behind it, a rental cabin's deck. It pays a defense too. Passenger liability, which covers the person in the other seat of a side-by-side or on the back of a quad, is not standard with every carrier and is the clause to confirm on a machine built for two or four.",
      ],
    },
    {
      heading: "Collision and rollover",
      paragraphs: [
        "Rollover is the claim that defines this line. Collision pays to repair or replace the machine after it rolls, hits a rock, drops into a wash or collides with another rider, regardless of fault, at actual cash value less the deductible or at an agreed value if the policy is written that way. Sand dunes, side hills and the moment a novice grabs the throttle are where these claims come from, and a group ride where one machine clips another produces two of them at once.",
      ],
    },
    {
      heading: "Comprehensive",
      paragraphs: [
        "Theft is the reason to carry comprehensive. Machines are taken from open trailers, from garages and from campsites, and a side-by-side is worth as much as a car. Comprehensive also pays for fire, vandalism, hail while parked at camp, a flash flood through a wash where the machine was left, and animal strikes. It carries its own deductible and stays in force through the off-season while collision may be suspended.",
      ],
    },
    {
      heading: "Accessories and trailers",
      paragraphs: [
        "Lift kits, winches, light bars, cages, doors, windshields, oversized tires, snowmobile tracks and stereo systems are covered only to a small built-in limit unless they are scheduled with receipts. A side-by-side that has been built up can carry accessories worth more than the base machine. The trailer that hauls it is a separate item that needs its own listing, and the home policy's off-premises coverage does not extend to either.",
      ],
    },
    {
      heading: "Medical payments and uninsured motorist",
      paragraphs: [
        "Medical payments pays the medical bills of the operator and passengers regardless of fault, with no deductible, which matters because the nearest emergency room from most riding areas is a long way off and the ride there is frequently a helicopter. Uninsured motorist pays your injuries when another rider with no coverage hits you, and on public land that is the usual rider. Helmets and riding gear are covered under accessories with some carriers.",
      ],
    },
    {
      heading: "Where the policy applies",
      paragraphs: [
        "The policy covers use on trails, public land and private property, and on roads where the state permits a street-legal machine; Arizona and Utah both allow certain off-highway vehicles to be plated for road use, with rules that differ between them. Organized competition, hill climbs, commercial guiding and use as a farm implement on a recreational policy are the standard exclusions, and riding in an area closed to motorized use is often one too.",
      ],
    },
  ],
  covered: [
    "Rollover damage to a side-by-side on a trail or a dune",
    "Theft of the machine from a garage, a trailer or a campsite",
    "Injuries you cause to another rider, a hiker or a landowner's property",
    "Fire, vandalism, hail and flash flood damage while parked at camp",
    "Winches, light bars, cages and tracks, to the accessory limit or the scheduled amount",
    "Medical bills for you and a passenger regardless of fault",
    "The trailer that hauls the machine, when it is listed",
  ],
  notCovered: [
    "Organized racing, hill climbs and timed competition",
    "Operation by a child below the age the policy permits",
    "Wear, engine failure and damage from sand or water ingestion",
    "Using the machine for hire, guiding or ranch work on a recreational policy",
    "Riding in areas closed to motorized use",
    "Accessories above the built-in limit that were never listed",
    "Injury to a passenger where the policy lacks passenger liability",
  ],
  discounts: [
    { name: "Multi-unit", description: "Two or more machines on one policy, which is common in a family that rides together." },
    { name: "Multi-policy", description: "The off-road policy written with the same carrier as the auto or home." },
    { name: "Safety course", description: "A completed off-highway vehicle safety course from a recognized program." },
    { name: "Homeowner", description: "Some carriers price owners of a home lower on every line, this one included." },
    { name: "Paid in full", description: "The term paid at inception." },
    { name: "Club membership", description: "Membership in a riding club or association the carrier recognizes." },
  ],
  faqs: [
    {
      question: "Does my homeowners policy cover my ATV or side-by-side?",
      answer: [
        "For liability, only while it is on your own property with most forms, and a few forms exclude it entirely. For damage to the machine, not at all, anywhere. The moment it is loaded on the trailer the home policy has nothing further to say, and the auto policy never listed it. A separate policy is the only way the machine and the injuries it can cause are insured on public land.",
      ],
    },
    {
      question: "Is insurance required to ride on public land?",
      answer: [
        "It depends on the state and on the machine. Arizona, Nevada, Utah and Idaho each run their own off-highway vehicle registration and permit programs, and the liability requirements differ by state and by whether the machine is plated for street use. Federal land managers set their own rules for specific areas. The analysis works from where you actually ride, and the liability part of the policy is worth carrying regardless of whether a rule demands it.",
      ],
    },
    {
      question: "What does the policy pay after a rollover?",
      answer: [
        "Collision pays to repair the machine or, if the frame is bent, its actual cash value less the deductible, or the agreed value if that is how the policy is written. Medical payments pays the operator's and passenger's medical bills. Scheduled accessories are paid at their listed value; unscheduled ones share the small built-in limit. Injuries to a passenger beyond medical payments depend on whether passenger liability is on the policy.",
      ],
    },
    {
      question: "Are my accessories covered?",
      answer: [
        "Up to the built-in limit without doing anything, and up to what you paid if they are scheduled with receipts. Suppose a side-by-side worth $18,000 carries $9,000 of cage, doors, winch, lights and tires; a built-in limit of $3,000 leaves $6,000 uncovered in a rollover or a theft unless the parts are listed. The schedule is a list and a set of receipts, and it changes the outcome of the claim more than any other step.",
      ],
    },
    {
      question: "Are my kids and friends covered when they ride it?",
      answer: [
        "A permitted operator is generally covered, and the claim is yours. Policies set a minimum operator age and some exclude operators below it altogether, which matters because a youth-sized quad is often ridden by a child. Household members who ride regularly should be listed. A friend who takes the machine without permission is not covered, and their injuries would be a liability claim against you only if you were negligent.",
      ],
    },
    {
      question: "Are snowmobiles covered the same way?",
      answer: [
        "Yes, on the same form, and Idaho and northern Utah policies are often written seasonally with the sled in lay-up through the summer. A sled buried in an avalanche is generally a comprehensive claim for the machine and a medical payments claim for the operator; a sled ridden into a closed area or a hill-climb competition is excluded. Tracks, skis and a tunnel bag count as accessories.",
      ],
    },
  ],
  relatedProducts: ["motorcycle-insurance", "auto-insurance", "home-insurance", "umbrella-insurance", "boat-watercraft-insurance"],
  seo: { description: "How an ATV, side-by-side, dirt bike and snowmobile policy works: rollover, theft, liability on public land, accessories, passengers and where the policy applies, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
