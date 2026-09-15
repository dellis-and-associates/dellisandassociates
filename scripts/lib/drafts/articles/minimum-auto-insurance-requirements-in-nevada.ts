import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Minimum auto insurance requirements in Nevada",
  excerpt: "The liability limits Nevada sets for a registered vehicle, how the DMV matches policies to plates, why cancelling a policy before surrendering the plates causes trouble, and how to judge whether the floor is enough for driving in Las Vegas or Reno.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Nevada ties insurance to the vehicle registration. A car with Nevada plates needs a liability policy in force for as long as the registration is active, whether or not the car is driven, and the Department of Motor Vehicles checks that electronically rather than waiting for a traffic stop. Nevada is an at-fault state: the driver who causes a crash, through that driver's liability insurance, pays for the other people's injuries and damage.",
        "This guide sets out the limits with their source, what the requirement leaves uncovered, how enforcement works in practice, and how to decide what to carry above the floor. It applies to private passenger vehicles; commercial vehicles, rideshare use and vehicles for hire have additional rules.",
      ],
    },
    {
      heading: "The three limits Nevada sets",
      paragraphs: [
        "A Nevada policy has to carry at least $25,000 of bodily injury liability for one person, $50,000 of bodily injury liability for one accident and $20,000 of property damage liability, the limits in effect since July 1, 2018, as the Nevada Division of Insurance explains at https://doi.nv.gov/Consumers/Automobile_Insurance/Higher_Minimum_Vehicle_Liability_Requirements/.",
        "Carriers print that as three numbers separated by slashes on the declarations page. The first number caps what the policy pays for any one injured person, however many people are hurt. The second caps the total for everyone injured in the crash. The third is the most the policy pays for other people's vehicles and property: cars, walls, signs, light poles and anything else the car hits.",
      ],
    },
    {
      heading: "What the requirement leaves out",
      paragraphs: [
        "Liability pays other people. The requirement includes nothing for the insured driver's own car, the driver's own medical bills, or passengers in the driver's car beyond what the liability coverage owes them when the driver is at fault. Collision and comprehensive cover the car; medical payments coverage pays medical bills regardless of fault; uninsured and underinsured motorist coverage pays when the other driver has too little insurance or none.",
        "That last one matters in a state with a large visitor and transient population. Carriers must offer uninsured and underinsured motorist coverage, and the Nevada Division of Insurance can confirm the rules on rejecting it and on how much must be offered. Declining it saves a modest premium and leaves the driver relying on a stranger's policy in the crash they did not cause.",
      ],
    },
    {
      heading: "How the DMV checks",
      paragraphs: [
        "Carriers report every Nevada policy to the DMV, and the DMV matches those reports against active registrations. When a policy ends and nothing replaces it, the registration is flagged, the owner is sent a notice, and a registration that stays uninsured is suspended. Reinstatement brings fines and fees that rise with the length of the gap and with repeat lapses; the Nevada DMV publishes the schedule.",
        "The trap that catches people is the order of operations. Selling a car, moving it out of state or parking it for a season does not end the registration. If the policy is cancelled first and the plates are surrendered later, the DMV sees a registered, uninsured vehicle for the days in between. Surrender the plates or transfer the registration, then cancel the policy. New residents face the reverse problem: an out-of-state policy on a car that should now be registered in Nevada, with the time allowed for the change set by Nevada and published by the Nevada DMV.",
      ],
    },
    {
      heading: "Why the floor is thin on Nevada roads",
      paragraphs: [
        "The required limits were written to make sure a routine collision gets paid. Driving on Interstate 15 through Las Vegas, US 95 at rush hour or Interstate 80 through Reno puts ordinary drivers next to new pickups, rideshare vehicles and commercial trucks, and a single chain-reaction crash can involve several of them.",
        "Suppose a driver rear-ends a stopped SUV, which is pushed into a new pickup, and repairs come to $28,000 for the SUV and $22,000 for the pickup. With a property damage limit of $20,000, the policy pays $20,000 in total and the driver owes the other $30,000. Say one of the drivers also has $60,000 of medical bills: a per-person limit of $25,000 leaves $35,000 unpaid. These figures are hypothetical, but the pattern is real. The injured parties can pursue the at-fault driver's wages and assets for what the policy did not pay.",
      ],
    },
    {
      heading: "Choosing limits above the minimum",
      paragraphs: ["The better starting point is what the household has to lose, not what the DMV accepts."],
      bullets: [
        "Set bodily injury limits against savings, home equity and future income; a judgment can reach all three.",
        "Raise the property damage limit so a crash involving two late-model vehicles would not exhaust it.",
        "Match uninsured and underinsured motorist limits to the liability limits.",
        "Price medical payments coverage; it pays quickly without waiting for a fault decision.",
        "If the household owns a home or has meaningful savings, compare raising the auto limits with adding an umbrella policy, which usually requires higher underlying auto limits first.",
        "Keep collision and comprehensive on any financed or leased car, and weigh them against value on an older one.",
      ],
    },
    {
      heading: "Rental cars, rideshare and visitors",
      paragraphs: [
        "A personal policy usually extends its liability coverage to a car rented for personal use in Nevada, and collision and comprehensive often extend to the rental if the policy carries them. The rental counter's damage waiver is a separate product, and whether it is worth buying depends on what the personal policy and the credit card already provide.",
        "Driving for a rideshare or delivery platform is a different matter. A personal policy commonly excludes the periods when the app is on, and the platform's own coverage has gaps depending on whether a ride has been accepted. A rideshare endorsement from the personal carrier closes that gap where the carrier offers one. Drivers visiting from another state stay covered under their home-state policy, which generally adjusts to meet Nevada's limits while they are here; residents cannot rely on that.",
      ],
    },
    {
      heading: "Where the figures come from",
      paragraphs: [
        "The limits in this article are cited to the Nevada Division of Insurance, which regulates carriers and takes consumer complaints. The DMV handles registration, verification notices and reinstatement. Penalties, the uninsured motorist offer rule and the new-resident window are described here without figures; the DMV and the division state the current ones.",
        "If your car is registered in Nevada, send us the declarations page. We compare the limits you carry against what you own, quote the same coverage across the carriers we represent, and show the difference in premium between the floor and a sensible limit. If your current policy already fits, that is what you will hear.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "umbrella-insurance", "motorcycle-insurance"],
  relatedArticles: ["full-coverage-vs-liability-only-auto-insurance", "sr-22-high-risk-insurance-rules-in-nevada", "how-to-insure-a-vehicle-for-rideshare-driving", "how-to-read-your-auto-insurance-declarations-page", "relocating-out-of-state-insurance-to-do-list"],
  relatedTerms: ["liability-coverage", "property-damage-liability", "underinsured-motorist-coverage", "medical-payments-coverage", "policy-lapse"],
  relatedStates: ["nevada"],
};
