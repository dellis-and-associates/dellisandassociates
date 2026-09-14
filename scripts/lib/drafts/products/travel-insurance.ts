import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Refunds prepaid trip costs when a covered reason cancels or cuts the trip short, pays medical bills and evacuation abroad where a health plan may not, and covers lost bags and delays. The trip cost insured, the ages on the policy and the cancellation terms set the premium.",
  intro: [
    "A travel policy is a package of separate benefits, each with its own limit and its own list of covered reasons: trip cancellation, trip interruption, travel delay, emergency medical, medical evacuation, baggage, and sometimes rental car damage or accidental death. Cancellation is what people buy the policy for. Medical and evacuation are what actually matter on a trip outside the country, where a domestic health plan may pay little or nothing.",
    "The premium is set by the prepaid, nonrefundable cost of the trip, the ages of the people insured, the length of the trip, the destination, and whether cancel-for-any-reason is added. Buying within a short window after the first deposit unlocks a waiver of the pre-existing condition exclusion and some other benefits; the length of that window is set by the carrier and varies.",
    "The analysis starts with what is already covered. A credit card may reimburse cancellation and delays, a health plan may or may not pay abroad, an airline will rebook without a policy. For a refundable domestic trip the recommendation is often no policy at all; for a cruise, a tour with a large deposit, or any trip abroad by someone with a medical history, the medical and cancellation benefits earn their premium.",
  ],
  coverageBlocks: [
    {
      heading: "Trip cancellation and interruption",
      paragraphs: [
        "Cancellation refunds the nonrefundable prepaid costs when you cancel before departure for a reason on the policy's list: illness, injury or death of a person on the trip or a close family member, severe weather that makes the destination uninhabitable or stops the carrier, jury duty, a home rendered unlivable, and on some plans job loss or a work transfer. The list is closed; changing your mind is not on it. Interruption pays the unused portion of the trip plus the cost of getting home early for the same reasons.",
        "Cancel-for-any-reason is an add-on that pays back a partial share of the trip cost for reasons the list does not cover. It must be bought early, usually within the same window as the pre-existing waiver, and the trip must be cancelled a set number of days before departure.",
      ],
    },
    {
      heading: "Emergency medical and evacuation",
      paragraphs: [
        "Emergency medical pays doctor and hospital bills for an illness or injury that begins during the trip, either as primary coverage or after your health plan has paid. Evacuation pays to move you to a hospital that can treat you, by air ambulance if needed, and to bring you home once you are stable; on a cruise, a trek or a trip through a country with thin hospitals it is the benefit that matters most, because an air ambulance across an ocean costs more than most people would guess. Original Medicare generally pays nothing outside the United States apart from narrow exceptions, and many employer plans pay abroad only at out-of-network terms or not at all.",
      ],
    },
    {
      heading: "Travel delay, missed connection and baggage",
      paragraphs: [
        "Travel delay pays meals and a hotel when a covered delay strands you for longer than the policy's threshold of hours, and a missed connection benefit pays to catch up to a cruise or a tour. Baggage delay pays for clothing and toiletries while a checked bag is missing. Baggage loss pays for luggage that is lost, stolen or destroyed, at depreciated value, subject to per-item limits that fall well short of what a camera or a laptop costs.",
      ],
    },
    {
      heading: "Pre-existing conditions and the look-back period",
      paragraphs: [
        "A pre-existing condition, on a travel policy, is one that was treated, tested, or had its medication changed during a look-back period before the policy was bought. A claim caused by such a condition, including a cancellation because a parent's condition worsened, is excluded unless the policy carries the waiver. The waiver is granted when the policy is bought within the window after the first deposit, the full trip cost is insured, and the person is medically able to travel on the day it is bought.",
      ],
    },
    {
      heading: "Annual plans and rental car collision",
      paragraphs: [
        "Someone who travels several times a year can buy an annual plan that covers every trip within a set length, usually with medical and evacuation as the main benefits and thin or no cancellation coverage. Rental car collision coverage is an add-on that pays for damage to a rental where a personal auto policy does not follow you, which is the case in most countries outside the United States and Canada.",
      ],
    },
  ],
  covered: [
    "Nonrefundable airfare, tours, cruise fares and lodging when you cancel for a covered reason",
    "The unused part of a trip and a flight home when you must return early",
    "Hospital and doctor bills abroad, up to the medical limit",
    "An air ambulance to a hospital that can treat you, and the trip home afterward",
    "Meals and a hotel when a flight delay strands you past the policy's threshold",
    "Clothes and toiletries while a checked bag is missing",
    "Stolen or lost luggage, at depreciated value and subject to per-item limits",
  ],
  notCovered: [
    "Cancelling because you changed your mind, without cancel-for-any-reason",
    "A condition treated or changed within the look-back period, without the waiver",
    "Travel into a government advisory that was in effect when the policy was bought",
    "A named storm or a forecast event that existed before the policy was purchased",
    "Injuries from intoxication, or from activities the policy excludes, such as some climbing and diving",
    "Lost work, business losses and anything the airline or hotel already refunded",
    "Routine or elective medical care taken abroad",
  ],
  discounts: [
    { name: "Children included", description: "Some plans cover children under a stated age travelling with an insured adult at no added premium." },
    { name: "Annual multi-trip plan", description: "One policy priced for a year of travel, which costs less than several single-trip policies for a frequent flyer." },
    { name: "Group plans", description: "A family reunion, a wedding party or a tour group above a stated size can be written as one policy at a group rate." },
    { name: "Early purchase benefits", description: "Not a lower premium but more coverage for the same one: the pre-existing waiver and cancel-for-any-reason are available only when the policy is bought within the window after the first deposit." },
  ],
  faqs: [
    {
      question: "Do I need travel insurance for a domestic trip?",
      answer: [
        "Often not. Your health plan works in every state, a domestic flight can be rebooked, and a refundable hotel needs no cancellation coverage. The exceptions are a large nonrefundable deposit, a trip timed to something that cannot move, or a person whose health could plausibly cancel it. If none of those apply, the recommendation is to skip it.",
      ],
    },
    {
      question: "My credit card includes travel protection. Is that enough?",
      answer: [
        "Read the guide to benefits. Card coverage usually pays cancellation and delay only for trips charged to the card, with lower limits, a shorter list of covered reasons and often no medical or evacuation benefit at all. For a domestic trip charged to the card it can be enough. For a trip abroad the medical gap is usually the reason to add a policy on top.",
      ],
    },
    {
      question: "Does my health insurance work abroad?",
      answer: [
        "Some employer and marketplace plans pay for emergencies abroad at out-of-network terms and require you to pay first and claim later; some pay nothing outside the country. Original Medicare generally does not pay outside the United States, and a Medicare supplement may carry a limited foreign travel emergency benefit. None of them pay for an evacuation flight. The plan documents answer the question for your coverage, and the travel policy's medical benefit is priced to fill whatever gap they leave.",
      ],
    },
    {
      question: "What is cancel-for-any-reason and is it worth it?",
      answer: [
        "It is an add-on that pays back a partial share of the trip cost when you cancel for a reason the standard list does not cover, from a change of heart to a worry about the destination. It costs a meaningful amount more, must be bought early, and requires cancelling a set number of days before departure. It is worth it on an expensive, nonrefundable trip where the reason you might cancel is one the list would not accept, and not otherwise.",
      ],
    },
    {
      question: "When do I need to buy the policy?",
      answer: [
        "As soon as the first nonrefundable deposit is paid. The window for the pre-existing condition waiver and for cancel-for-any-reason opens at that deposit and closes a set number of days later, and a policy bought after the window loses both. A policy can be bought later for the other benefits, up to the day before departure, but anything already foreseeable by then, a named storm, a strike that has been announced, is excluded.",
      ],
    },
    {
      question: "Is a trip cancelled by a wildfire or a hurricane covered?",
      answer: [
        "If the event was not foreseeable when the policy was bought, and the policy's list includes weather or a natural disaster that makes the destination uninhabitable or stops the carrier, yes. A hurricane already named or a fire already burning toward the destination on the purchase date is excluded as a known event. Smoke that makes a trip unpleasant but leaves the lodge open is not a covered reason on most plans; that is what cancel-for-any-reason is for.",
      ],
    },
  ],
  relatedProducts: ["health-insurance", "medicare", "auto-insurance", "identity-theft-protection"],
  seo: { description: "How travel insurance works: trip cancellation and interruption, medical and evacuation abroad, delays and baggage, pre-existing conditions and when to skip it, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
