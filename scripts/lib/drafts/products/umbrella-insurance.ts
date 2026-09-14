import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Adds a layer of liability above your auto, home, boat and rental policies, paying once their limits are spent. It is priced by the limit you choose and the policies beneath it, and it pays some claims those policies never would.",
  intro: [
    "A personal umbrella is a single liability policy that sits over the liability parts of every other personal policy you hold. When a crash, a dog bite or a drowning at your pool produces a judgment larger than the auto or home limit, the underlying policy pays up to its limit and the umbrella pays the rest, up to its own. It pays the defense too, and on a serious injury claim the lawyers can cost as much as the verdict.",
    "Because the umbrella only pays after the underlying limit is exhausted, the carrier requires those limits to meet a stated floor before it will write the policy, and the floor applies to every car, home, boat and rental unit on the schedule. That is the mechanism to understand: the umbrella is inexpensive relative to its limit precisely because the first layer of every claim is paid by another policy.",
    "The premium follows the limit chosen and what sits underneath: the number of cars and drivers, homes, boats, rental units, whether there is a young driver, a pool or a dog of a breed the carrier scores, and the household's claim record. The analysis looks at net worth and future income, both of which a judgment can reach, and sets the limit from there. For a household with little of either and no drivers, the recommendation can be that an umbrella is not yet worth its premium.",
  ],
  coverageBlocks: [
    {
      heading: "How the layers stack",
      paragraphs: [
        "Suppose your auto policy carries a bodily injury limit of $250,000 per person and you cause a crash that ends in a $900,000 judgment. The auto carrier pays $250,000 and the defense to that point. A $1 million umbrella pays the remaining $650,000 and the defense from there. Without the umbrella the balance is collected from savings, from home equity above the state's homestead protection and, in the states we serve, from wages for years. The same stacking applies over the home policy for an injury on your property and over a boat or rental policy that is listed on the umbrella's schedule.",
      ],
    },
    {
      heading: "Underlying limit requirements",
      paragraphs: [
        "The umbrella lists a required underlying limit for each policy beneath it: auto bodily injury and property damage, home personal liability, watercraft, recreational vehicles and rental properties. If an underlying policy is dropped below that number or lapses, the umbrella still attaches at the required limit, and the gap between what you carry and what the umbrella expected is yours. Some carriers write the umbrella only when the auto and home are with them; others accept outside policies and ask for the declarations pages each year.",
      ],
    },
    {
      heading: "What the umbrella covers on its own",
      paragraphs: [
        "Beyond adding a layer, most umbrellas cover claims the underlying policies leave out: personal injury in the legal sense, meaning libel, slander, defamation and false arrest, along with liability from incidents abroad and some claims involving vehicles you rent or borrow. For these the umbrella pays from the first dollar after a self-insured retention, a deductible-like amount that is usually modest. What is covered here varies by carrier more than any other part of the form.",
      ],
    },
    {
      heading: "Excess uninsured motorist",
      paragraphs: [
        "Everything above pays other people. Some carriers offer an endorsement that extends uninsured and underinsured motorist coverage to the umbrella limit, so that when an uninsured driver injures you or a family member badly the umbrella pays your side. It is not offered everywhere and it adds to the premium, but for a household whose exposure runs the other way it is often the more valuable half of the policy.",
      ],
    },
    {
      heading: "Exclusions",
      paragraphs: [
        "A personal umbrella excludes business and professional liability, including a side business run from the house, intentional harm, liability you took on in a contract, and any vehicle, boat, aircraft or property that is not listed on the schedule. A rental house or a ski boat left off the schedule is uncovered, which is the most common umbrella claim denial.",
      ],
    },
  ],
  covered: [
    "Bodily injury judgments above your auto liability limits",
    "Injuries at your home or pool above the home liability limit",
    "Dog bites and injuries caused by household members away from home",
    "Libel, slander and other personal injury claims a home policy excludes",
    "Defense costs on a covered claim, often outside the limit",
    "Claims arising from a boat, RV or rental property on the schedule",
  ],
  notCovered: [
    "Your own injuries or property, unless excess uninsured motorist is added",
    "Business and professional liability, including a side business run from home",
    "Intentional harm and criminal acts",
    "Vehicles, boats or properties you own but did not list",
    "Liability you assumed in a contract",
    "The layer beneath the required underlying limit, if you let an underlying policy lapse",
  ],
  discounts: [
    { name: "Multi-policy", description: "The umbrella written with the same carrier as the auto and home. With many carriers this is the only way the umbrella is written at all." },
    { name: "Claim-free household", description: "No liability claims on any underlying policy over the look-back period." },
    { name: "No youthful drivers", description: "A household without a driver under the carrier's youthful age is priced lower; adding a teenager is the usual reason an umbrella premium jumps." },
    { name: "Paid in full", description: "The annual premium paid at inception." },
  ],
  faqs: [
    {
      question: "Who actually needs an umbrella?",
      answer: [
        "Anyone whose net worth or future earnings would be reached by a judgment above their auto or home limits: a household with equity, retirement savings, a teenage driver, a pool, a dog, a boat, a rental house, or a seat on a nonprofit board. The list is broad because the premium is low relative to the limit.",
        "It is not everyone. A renter with no car, no savings and no dependants has little a judgment could take, and for them the money is better spent raising the liability limits on the policies they do carry. We say so when that is the case.",
      ],
    },
    {
      question: "How much umbrella coverage should I buy?",
      answer: [
        "Enough to cover net worth plus several years of income, rounded up to the next limit the carrier offers, because a judgment that outruns the policy is collected from both. The step from one limit to the next usually costs less than the first layer did. The analysis puts a number on it from your balance sheet rather than from a rule of thumb.",
      ],
    },
    {
      question: "Does the umbrella cover my rental property or my boat?",
      answer: [
        "Only if it is listed on the umbrella and carries its own underlying liability at the required limit. A rental house needs a landlord policy under the umbrella; a boat needs a watercraft policy or a qualifying endorsement. Adding a property or a boat and forgetting to add it to the umbrella is a gap we look for at every renewal.",
      ],
    },
    {
      question: "What happens if I lower my auto limits below the required amount?",
      answer: [
        "The umbrella does not drop down to meet you. It attaches at the underlying limit it required, so on a large claim you pay the difference between what you carry and what the umbrella expected before the umbrella pays anything. Any change to an underlying policy should be checked against the umbrella's schedule first.",
      ],
    },
    {
      question: "Does an umbrella cover my teenager?",
      answer: [
        "Yes, as a member of the household, and a teenage driver is the most common reason a family buys one. The carrier will require the teenager to be listed on the auto policy beneath it at the required limits, and the umbrella premium will reflect the added driver.",
      ],
    },
    {
      question: "Am I covered if I am sued for something I posted online?",
      answer: [
        "Most umbrellas include personal injury coverage, which responds to claims of libel and slander, including statements made online, so long as they were not made knowingly false or in the course of a business. The home policy beneath it usually excludes this, so the umbrella pays from the first dollar after the retention. The wording varies by carrier and is worth reading if this is the exposure you are buying for.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "home-insurance", "boat-watercraft-insurance", "landlord-rental-property-insurance", "commercial-umbrella-insurance"],
  seo: { description: "How a personal umbrella policy works: the layer above your auto and home liability, the underlying limits it requires, what it adds on its own and who needs one, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
