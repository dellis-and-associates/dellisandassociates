import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Pays other people after a crash you cause, repairs or replaces the bike after a collision or theft, and, with the right endorsement, covers the helmet, the bags and the custom parts. Rider experience, engine size and where the bike sleeps set the premium.",
  intro: [
    "A motorcycle policy is built on the auto policy's frame, with liability, collision, comprehensive, uninsured motorist and medical parts that each carry their own limit or deductible, but two things are different. The rider is the crumple zone, so the coverages that pay for your own injuries matter more than they do on a car. And a bike is easy to steal and easy to modify, so how the policy treats theft and aftermarket parts decides whether a claim pays what you expect.",
    "The premium comes from the rider's age and years licensed, whether a safety course has been completed, the bike's displacement and type, its value, where it is garaged, the miles ridden, the riding record, and whether the policy is written for year-round use or with a lay-up period. A sport bike prices above a cruiser of the same value because the loss history says so. In Arizona and southern Nevada the season is twelve months long; in Idaho and northern Utah the bike sits from the first snow until spring, and a seasonal policy is priced for that.",
    "The analysis sets the liability limits against what you own, matches uninsured motorist to those limits because on a motorcycle you are the one who gets hurt, decides between actual cash value and agreed value for the bike, and schedules the custom parts so a total loss pays for them. If a passenger rides with you, it checks that the policy covers the passenger at all.",
  ],
  coverageBlocks: [
    {
      heading: "Liability",
      paragraphs: [
        "Liability pays for injuries and property damage you cause to others and defends you if you are sued. The limits are yours to choose, and the floor each state sets is written for the other driver's benefit rather than yours. One clause to read closely: guest passenger liability, which covers injuries to the person on the seat behind you, is not automatic with every carrier and is excluded outright by some unless the policy is endorsed.",
      ],
    },
    {
      heading: "Collision and comprehensive",
      paragraphs: [
        "Collision pays to repair or replace the bike after a crash regardless of fault, and that includes a single-vehicle lowside on a gravel corner with no one else involved. Comprehensive pays for theft, vandalism, fire, hail, flood and animal strikes, with its own deductible. A total loss is settled at actual cash value unless the policy is written on an agreed value basis, and for a vintage, restored or heavily customized bike the agreed value option is the only way the settlement reflects what was actually lost.",
      ],
    },
    {
      heading: "Custom parts and equipment",
      paragraphs: [
        "The policy covers the bike as it left the factory. Aftermarket exhaust, bags, seats, chrome, paint, lighting and performance parts are covered only up to a small built-in limit unless they are scheduled with receipts, and on a bike that has been built up over several years the difference is often thousands. Safety apparel, meaning the helmet, jacket, gloves and boots destroyed in a crash, is covered under this part or a separate apparel endorsement with some carriers and not at all with others.",
      ],
    },
    {
      heading: "Uninsured motorist and medical payments",
      paragraphs: [
        "When a driver turns left across your lane and carries no insurance or too little, uninsured and underinsured motorist coverage pays for your injuries up to your own limits. On a motorcycle the injuries in that crash are yours, not the driver's, which is why matching this limit to your liability limit is the standing recommendation. Medical payments pays your medical bills and a passenger's regardless of fault with no deductible. Utah's no-fault personal injury protection treats motorcycles differently from cars, and a rider there should not assume those benefits follow them onto the bike.",
      ],
    },
    {
      heading: "Roadside, trip interruption and lay-up",
      paragraphs: [
        "A motorcycle needs a flatbed, so roadside coverage written for bikes pays for the right truck. Trip interruption pays lodging and meals when the bike breaks down far from home on a covered loss. A lay-up endorsement suspends collision and liability during the months the bike is stored and keeps comprehensive running, so a theft from the garage in January is still covered while the winter premium drops.",
      ],
    },
  ],
  covered: [
    "Injuries and property damage you cause to others, up to your limits",
    "Repairs to the bike after a crash, including a single-vehicle drop",
    "Theft of the bike from a garage or a trailhead parking lot",
    "Hail, fire, vandalism and animal strikes",
    "Your injuries when the at-fault driver has no or too little insurance",
    "Custom parts and riding apparel, to the built-in limit or the scheduled amount",
    "A flatbed tow when the bike will not start",
  ],
  notCovered: [
    "Racing, track days and timed events",
    "Riding without a motorcycle endorsement on your license, with some carriers",
    "Wear, tire damage and mechanical failure",
    "A passenger's injuries where the policy lacks guest passenger liability",
    "Custom parts above the built-in limit that were never scheduled",
    "Riding for hire or delivery",
  ],
  discounts: [
    { name: "Safety course", description: "A completed rider course from a recognized program. It also earns the license endorsement in some states." },
    { name: "Multi-bike and multi-policy", description: "More than one motorcycle, or a bike alongside an auto or home policy with the same carrier." },
    { name: "Experienced rider", description: "A set number of years licensed for motorcycles with a clean record." },
    { name: "Anti-theft and garaging", description: "A tracking device, an alarm or a locked garage, priced against the theft exposure." },
    { name: "Association membership", description: "Membership in a riders' association recognized by the carrier." },
    { name: "Lay-up", description: "Not a discount on the schedule but the same effect: a reduced premium for the months the bike is stored." },
  ],
  faqs: [
    {
      question: "Do I need coverage on a bike I only ride a few months a year?",
      answer: [
        "The bike still needs liability while it is registered and on the road, and it still needs comprehensive while it sits, because theft and garage fires do not follow the season. The lay-up endorsement is built for this: liability and collision are suspended during the stored months, comprehensive continues, and the premium reflects the split. Riding during the lay-up period voids the suspended coverages, so the dates have to be honest.",
      ],
    },
    {
      question: "Is my helmet and gear covered?",
      answer: [
        "It depends on the carrier. Some include riding apparel under custom parts and equipment, some sell a separate apparel endorsement, and some pay nothing for it. A good helmet, jacket, boots and gloves add up, and after a crash they are almost always destroyed, so ask the question when the policy is placed rather than when the claim is filed.",
      ],
    },
    {
      question: "What does a customized bike get in a total loss?",
      answer: [
        "On a standard policy, the actual cash value of the factory bike plus the built-in custom parts limit, which rarely reflects what was spent. Scheduling the parts with receipts raises that limit to what you paid, and an agreed value policy fixes the total the carrier pays at a number you and the carrier set in advance. For a build worth more than the base bike, agreed value with scheduled parts is the only settlement that comes out right.",
      ],
    },
    {
      question: "Does my auto policy cover a motorcycle?",
      answer: [
        "No. An auto policy excludes vehicles with fewer than four wheels, and its uninsured motorist coverage will not follow you onto a motorcycle you own but have not insured. A bike needs its own policy, and once it has one the uninsured motorist limit on that policy is what pays when a car hits you.",
      ],
    },
    {
      question: "What happens if a driver pulls out in front of me and has no insurance?",
      answer: [
        "Your uninsured motorist coverage pays for your injuries up to your limit, and your collision coverage repairs the bike less the deductible. A share of the drivers in Arizona, Nevada, Utah and Idaho carry no insurance at all, and a share of the rest carry the state floor, which does not go far on a helicopter flight and a surgery. This is the limit we least want a rider to skimp on.",
      ],
    },
    {
      question: "Is my passenger covered?",
      answer: [
        "Only if the policy carries guest passenger liability. Without it, a passenger injured in a crash you caused has no claim against your policy and would have to sue you personally. Medical payments, where carried, pays a passenger's bills regardless of fault. If you regularly ride two-up, both parts should be on the declarations page.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "umbrella-insurance", "atv-off-road-insurance", "health-insurance"],
  seo: { description: "How a motorcycle policy works: liability, collision, comprehensive, uninsured motorist, custom parts, apparel and lay-up, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
