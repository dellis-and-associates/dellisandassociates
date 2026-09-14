import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Repairs or replaces the boat, motor and trailer, pays for people you injure on the water, and covers towing, wreck removal and fuel spill cleanup that a home policy never touches. Hull value, horsepower, navigation area and where the boat is stored set the premium.",
  intro: [
    "A boat policy separates physical damage to the hull, motor, trailer and equipment from your liability to other people, and adds parts for medical payments, uninsured boaters, on-water towing, salvage and pollution. It is written on either an agreed value or an actual cash value basis, and that single choice decides what a total loss pays more than anything else on the declarations page.",
    "A home policy carries a small watercraft limit, enough for a canoe, a kayak or a small fishing boat with a low-horsepower motor, and its liability part usually excludes anything larger or faster. The boats on Lake Powell, Lake Mead, Lake Havasu, Bear Lake, Lake Coeur d'Alene and the reservoirs along the Snake River are almost all past that threshold, which is why they need their own policy.",
    "The premium is built from the hull's value, length, horsepower and type, the operator's boating record and any safety course, the navigation area, whether the boat lives on a trailer, in dry storage or in a slip, and the months it is in use. A wake boat and a pontoon of the same value are priced differently because they are used differently. Desert lakes run a long season in hot storage; Idaho boats sit in cold storage for months, and a lay-up period is priced into the policy accordingly.",
  ],
  coverageBlocks: [
    {
      heading: "Hull, motor and trailer",
      paragraphs: [
        "Physical damage pays to repair or replace the hull and its permanently attached equipment, the outboard or inboard, and the trailer, after collision, sinking, fire, theft, storm or vandalism. Agreed value fixes the payout for a total loss at a number set when the policy is written and pays partial losses without depreciation on most parts; actual cash value pays what the boat was worth the day it was lost, which for an older hull can be a fraction of what a replacement costs. The trailer is a separate item with its own value, and it is the item owners most often forget to list.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "Liability pays for injuries and property damage you cause with the boat: a collision with another boat, a dock you hit coming in, a swimmer struck by the prop, and wake damage to moored boats. Skier and wakeboarder liability, covering the person you are towing, is included with some carriers and endorsed with others; it needs to be on the page if you tow. Defense is paid as part of the coverage, and an umbrella can sit above the limit.",
      ],
    },
    {
      heading: "Medical payments and uninsured boater",
      paragraphs: [
        "Medical payments pays the medical bills of the people on board, and often a skier being towed, without anyone establishing fault. Uninsured boater coverage pays for your injuries when the operator who hit you carries no liability coverage, which on the water is common because many states do not require boat liability at all and the lakes we serve draw operators from all over the West.",
      ],
    },
    {
      heading: "Towing, salvage and pollution",
      paragraphs: [
        "On-water towing pays for a tow back to the ramp or the marina when the engine quits, a service that costs far more on the water than on the highway. Wreck removal and salvage pays to raise and remove a boat that has sunk or run aground, which the lake authority will require and which can cost more than the hull was worth. Fuel spill liability pays the cleanup after a sinking or a fuel leak, a responsibility federal law places on the owner regardless of fault.",
      ],
    },
    {
      heading: "Personal effects, fishing gear and where you can go",
      paragraphs: [
        "Personal effects and fishing equipment endorsements pay for rods, electronics, coolers and gear that the hull coverage does not, at their own limits. The navigation area is the line on the page that says where the policy applies; inland lakes and rivers within the continental states is the usual territory, and a trip to the Baja coast or the Pacific needs an extension in advance. Mexico also requires liability from a Mexican insurer, which is a separate purchase we can arrange.",
      ],
    },
  ],
  covered: [
    "Collision with another boat, a dock, a submerged rock or a sandbar",
    "Sinking, fire, theft and storm damage on the water or on the trailer",
    "Injuries you cause to a skier, a swimmer or someone on another boat",
    "Damage to the boat while it is being trailered on the highway",
    "A tow back to the ramp when the engine quits",
    "Wreck removal and fuel cleanup after a sinking",
    "Fishing gear, electronics and personal effects, up to the endorsement limit",
  ],
  notCovered: [
    "Wear, corrosion, blistering, marine growth and dry rot",
    "Engine failure from a mechanical cause, unless a covered peril caused it",
    "Damage outside the navigation area on the policy",
    "Racing and speed tests",
    "Operation by someone under the influence, or by an excluded operator",
    "Freezing damage when the boat was not winterized",
    "Use during the lay-up period, with some carriers",
  ],
  discounts: [
    { name: "Boating safety course", description: "A completed course from a recognized boating education program." },
    { name: "Multi-policy", description: "The boat written alongside the auto or home policy with the same carrier." },
    { name: "Claim-free", description: "No boat claims over the carrier's look-back period." },
    { name: "Safety equipment", description: "A kill switch lanyard, fire suppression, a depth finder or a GPS, depending on the carrier." },
    { name: "Lay-up and diesel", description: "A stated period in storage, and, with some carriers, a diesel engine's lower fire risk." },
  ],
  faqs: [
    {
      question: "Is my boat covered under my home policy?",
      answer: [
        "Only a small one. The home policy's watercraft coverage is capped at a modest limit for physical damage and its liability excludes boats above a stated length or horsepower, which varies by form. A fishing kayak fits; a ski boat, a wake boat, a pontoon with a real motor or a personal watercraft does not. The declarations page and the home policy's watercraft clause together answer the question for your boat.",
      ],
    },
    {
      question: "Should I insure the boat for agreed value or actual cash value?",
      answer: [
        "Agreed value for any boat you could not replace out of pocket, and for any boat more than a few years old, because depreciation on hulls and engines is steep. Actual cash value is cheaper and reasonable on an older boat where the premium difference is large relative to what the boat is worth. Suppose a ten-year-old bowrider with a $30,000 replacement cost has an actual cash value of $14,000; the agreed value policy pays the number on the page and the other pays the smaller one.",
      ],
    },
    {
      question: "Am I covered while towing the boat on the highway?",
      answer: [
        "Two policies apply. Your auto policy's liability covers damage the trailer causes to others while it is attached to your vehicle. The boat policy covers damage to the boat and the trailer themselves, including theft from a truck stop or a hotel lot on the way to the lake. A trailer that jackknifes on the grade down to Lake Powell is an auto liability claim for the other cars and a boat policy claim for the boat.",
      ],
    },
    {
      question: "Can I take the boat to Mexico or the coast?",
      answer: [
        "Only with the navigation area extended before the trip, and for Mexico only with a Mexican liability policy alongside it. Salt water changes the underwriting, and some carriers will not extend a policy written for inland lakes at all. Ask before the trailer is hitched, not from the border.",
      ],
    },
    {
      question: "Is a friend covered when they drive the boat?",
      answer: [
        "A permitted operator is generally covered under your policy, and a claim they cause is your claim. Some policies list named operators only or exclude operators under a certain age or without a boating card, which matters on lakes where the state requires an education card for younger operators. Check the operator clause before handing over the wheel.",
      ],
    },
    {
      question: "What is a lay-up period and what happens if I use the boat during it?",
      answer: [
        "A lay-up period is a stretch of the year the policy assumes the boat is in storage and prices lower for it, common on Idaho and northern Utah policies. Using the boat during that window can void coverage for a loss that happens while it is in use, though the boat remains covered in storage. Arizona and southern Nevada boats often have no lay-up at all because the season never really ends.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "umbrella-insurance", "rv-insurance", "home-insurance"],
  seo: { description: "How a boat policy works: hull and trailer, liability, medical payments, uninsured boater, towing, salvage and navigation limits for the lakes of Arizona, Nevada, Utah and Idaho, from an independent agency." },
};
