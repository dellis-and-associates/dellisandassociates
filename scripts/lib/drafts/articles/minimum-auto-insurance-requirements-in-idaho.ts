import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Minimum auto insurance requirements in Idaho",
  excerpt: "The liability limits an Idaho driver has to carry, what they pay and what they leave to the driver, how proof of insurance is checked, and how to set limits for Treasure Valley commutes, rural highways and wildlife on the road.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Idaho is an at-fault state. When a driver causes a crash, that driver owes the other people involved for their injuries and damage, and the driver's liability insurance is what pays it. Idaho sets the smallest amount of that insurance a registered vehicle can carry, and it expects proof at registration, at a traffic stop and after an accident.",
        "This guide gives the figures with their source, explains what they do and do not pay, describes enforcement, and walks through how to choose limits that fit the way people actually drive in Idaho: the Interstate 84 corridor between Boise and Nampa, two-lane highways through farm country, and mountain roads with deer and elk on them.",
      ],
    },
    {
      heading: "The limits Idaho sets",
      paragraphs: [
        "An Idaho policy needs at least $25,000 of bodily injury liability for each person, $50,000 of bodily injury liability for each accident and $15,000 of property damage liability, as the Idaho Department of Insurance sets out at https://doi.idaho.gov/consumers/auto-insurance/required-auto-coverage/.",
        "Read those as three separate buckets. The per-person bucket is the most the policy pays for one injured person's medical bills, lost wages and pain and suffering. The per-accident bucket is the ceiling for everyone injured in the same crash. The property damage bucket pays for the other vehicles, fences, livestock, mailboxes, irrigation equipment and buildings the car damages. When one bucket runs dry, the others cannot be borrowed from.",
      ],
    },
    {
      heading: "What the requirement does not pay",
      paragraphs: [
        "The required coverage pays only other people. It does nothing for the insured driver's vehicle, the driver's own injuries or a crash caused by someone without insurance. Collision pays to repair the driver's car after a crash; comprehensive pays for theft, hail, fire, glass and animal strikes; medical payments coverage pays medical bills for the driver and passengers regardless of fault; uninsured and underinsured motorist coverage pays when the at-fault driver cannot.",
        "Carriers must offer uninsured and underinsured motorist coverage in Idaho, and the Idaho Department of Insurance can explain the rules on declining it. On a rural road where the other driver may be a relative's farm truck with the thinnest possible policy, that coverage is often the part that pays the driver who did nothing wrong.",
      ],
    },
    {
      heading: "Wildlife, gravel and the comprehensive question",
      paragraphs: [
        "Idaho drivers file a steady stream of claims the liability requirement never touches. A deer through the windshield near McCall, an elk on US 95 at dusk, a rock chip that runs across the glass on a gravel county road: each is a comprehensive claim on the driver's own policy. A liability-only policy pays none of them.",
        "Suppose a driver on a liability-only policy hits an elk and the damage to a pickup worth $30,000 comes to $12,000. Nothing is paid, because there is no other driver to claim against and no comprehensive coverage to claim under. With comprehensive and a deductible of, for example, $500, the same driver receives $11,500. These are hypothetical figures, and whether comprehensive is worth its premium depends on the vehicle's value and the driver's ability to absorb the loss.",
      ],
    },
    {
      heading: "How Idaho checks",
      paragraphs: [
        "Idaho requires drivers to carry proof of insurance in the vehicle, on paper or electronically, and to produce it at a stop, at an accident and when registering. Failing to show proof, or driving without coverage, brings fines and can bring licence suspension, with amounts and escalation for repeat offences set by Idaho law; the Idaho Transportation Department can confirm them for a given case. A driver convicted of driving uninsured can also be required to maintain an SR-22 filing for a period.",
        "The practical rules are simple. Keep the current card in the car and on the phone. Replace it at every renewal. When switching carriers, start the new policy the day the old one ends. When selling a car, keep the policy until the title and plates have left your name.",
      ],
    },
    {
      heading: "Why the floor is thin in Idaho",
      paragraphs: [
        "The required figures were not written with a modern crash in mind. A crash at highway speed on a two-lane road tends to injure more than one person, and hospital care after a serious injury uses up a per-person limit fast. A property damage limit has to cover the other vehicle and anything else in the path, which in farm country can include equipment worth more than the car.",
        "Suppose a driver drifts across the centre line near Twin Falls and hits an oncoming pickup towing a trailer with a loaded hay rake. The pickup and trailer are worth $40,000, the rake $20,000, and the other driver's injuries cost $70,000. With limits of $25,000 per person and $15,000 for property, the policy pays $40,000 and the at-fault driver owes the remaining $90,000. The numbers are hypothetical; the gap between the limits and the loss is the lesson.",
      ],
    },
    {
      heading: "Setting limits that fit",
      paragraphs: ["Start from what the household has to protect, then price the steps."],
      bullets: [
        "Liability: choose bodily injury and property damage limits from the household's assets and income rather than from the requirement; ask for quotes at two or three levels to see how little each step adds.",
        "Uninsured and underinsured motorist: match them to the liability limits.",
        "Medical payments: consider it for quick payment of your own passengers' bills.",
        "Comprehensive: keep it on any vehicle whose loss to an animal strike you would not want to pay yourself.",
        "Collision: required by a lender on financed vehicles, and a judgment call on an older one.",
        "Umbrella: for households with a home, land or savings, compare an umbrella policy with higher auto limits.",
        "Farm vehicles: a pickup used in a farm or ranch operation may belong on a farm or commercial policy rather than a personal one; ask.",
      ],
    },
    {
      heading: "Where the figures come from",
      paragraphs: [
        "The limits above are cited to the Idaho Department of Insurance, which regulates carriers and takes consumer complaints. The uninsured motorist offer rule and the penalty schedule are set by Idaho law, and the department and the Idaho Transportation Department confirm them for a specific case.",
        "If your vehicle is registered in Idaho, send us the declarations page. We set your limits against what a serious crash on your roads would cost, quote the carriers we represent at the same and higher limits, and show the premium difference line by line. If what you carry is already right, that is our answer.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "umbrella-insurance", "agribusiness-farm-insurance"],
  relatedArticles: ["comprehensive-vs-collision-coverage", "sr-22-high-risk-insurance-rules-in-idaho", "full-coverage-vs-liability-only-auto-insurance", "winter-mountain-driving-safety-tips-for-utah-idaho", "how-to-choose-the-right-deductible"],
  relatedTerms: ["liability-coverage", "comprehensive-coverage", "property-damage-liability", "uninsured-motorist-coverage", "per-occurrence-limit"],
  relatedStates: ["idaho"],
};
