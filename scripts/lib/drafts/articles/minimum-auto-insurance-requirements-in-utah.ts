import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Minimum auto insurance requirements in Utah",
  excerpt: "Utah is the one no-fault state among Arizona, Nevada, Utah and Idaho. What its liability limits and personal injury protection pay, when an injured driver can still sue, how the state checks for coverage, and why the required amounts are a floor.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "A Utah auto policy has two jobs that a policy in a neighbouring state does not. It has to pay other people when the driver causes a crash, like any liability policy, and it has to pay the driver's own household for injuries in a crash regardless of who caused it. That second part is personal injury protection, and it is what makes Utah a no-fault state for injuries. Damage to cars and other property is still settled by fault.",
        "This guide gives the required figures with their sources, explains how no-fault works in practice, describes how Utah checks for coverage, and sets out what a Utah driver should weigh when choosing limits above the floor.",
      ],
    },
    {
      heading: "The liability limits",
      paragraphs: [
        "Utah sets liability limits of $25,000 for bodily injury to one person, $65,000 for bodily injury per accident and $15,000 for property damage, or alternatively a single combined limit of $80,000 for the whole accident, per https://le.utah.gov/xcode/Title31A/Chapter22/31A-22-S304.html.",
        "The split form and the combined form behave differently when a crash is serious. A split limit caps each category separately, so a large claim by one injured person is held to the per-person amount even if the property damage portion goes unused. A combined single limit is one pool for all injuries and damage in the accident, which gives more room for one large claim and less certainty about how the pool will be divided when several people are hurt. Carriers usually offer both structures at higher levels.",
      ],
    },
    {
      heading: "Personal injury protection and how no-fault works",
      paragraphs: [
        "Every Utah policy also carries personal injury protection of at least $3,000 per person, as the Utah Division of Motor Vehicles lists at https://dmv.utah.gov/register/insurance/.",
        "PIP pays reasonable medical expenses for the named insured, household members and passengers injured in a crash, without waiting for anyone to decide fault. Depending on the policy, it also contributes to lost wages, the cost of household services an injured person cannot perform, funeral expenses and a survivor benefit, with the scope and amounts of those benefits set by Utah law and explained by the Utah Insurance Department. The injured person's own carrier pays first, which is why Utah claims for minor injuries tend to be paid faster than fault-based claims elsewhere.",
        "No-fault limits the right to sue, but does not remove it. An injured person can bring a claim against the at-fault driver once medical expenses pass a threshold or the injury is of a serious kind the statute lists, such as permanent disability or disfigurement; the Utah Insurance Department can confirm the current threshold. Past that line, the at-fault driver's bodily injury liability coverage comes into play, and the claim looks like one in any at-fault state.",
      ],
    },
    {
      heading: "What neither part pays",
      paragraphs: [
        "PIP does not pay for property. Damage to the insured car is paid by collision or comprehensive coverage if the driver bought them, or by the other driver's property damage liability if the other driver caused the crash. PIP also stops at its limit; medical bills above it are paid by health insurance, by medical payments coverage if the policy has it, or by the at-fault driver's liability coverage once the threshold is met.",
        "Uninsured and underinsured motorist coverage fills the case where the at-fault driver has no policy or too little. Carriers must offer it, and the Utah Insurance Department can explain the rules on rejecting it in writing. Vehicle types are not treated identically either; motorcycles and some other vehicles can be handled differently for PIP, so riders should ask the carrier how their own policy applies.",
      ],
    },
    {
      heading: "How Utah checks",
      paragraphs: [
        "Carriers report policies to a state database that the Division of Motor Vehicles uses at registration and renewal and that law enforcement can query at a stop. A registered vehicle that shows no insurance draws a notice, and continued non-compliance leads to registration suspension, with fines and reinstatement fees that the Utah Division of Motor Vehicles can confirm.",
        "The practical consequences are the same as elsewhere, with one Utah twist. A driver who lets a policy lapse is uninsured for PIP as well as liability, so an injury in that window is paid by nobody's no-fault coverage, and the driver may be treated as having given up some no-fault protections for that crash. A new policy should begin on the day the old one ends.",
      ],
    },
    {
      heading: "Why the floor is thin",
      paragraphs: [
        "The required figures are sized for a low-speed collision. Utah driving includes Interstate 15 through the Wasatch Front at commuter speed, canyon roads in winter and long rural stretches where a crash happens at highway speed.",
        "Suppose a driver on Interstate 15 causes a crash that seriously injures a driver in another car, whose medical bills and lost income total $140,000, and damages a new SUV worth $45,000. The injured driver's own PIP pays the first portion of medical costs, and the serious injury clears the threshold for a liability claim. With split limits of $25,000 per person and $15,000 for property, the at-fault driver's policy pays $25,000 toward the injury claim and $15,000 toward the SUV, and the remaining balance is the at-fault driver's personal debt. These figures are hypothetical and ignore the PIP offset; the size of the gap is the point.",
      ],
    },
    {
      heading: "What to carry instead",
      paragraphs: ["A Utah policy has more moving parts than one in an at-fault state, so the decisions come in pairs."],
      bullets: [
        "Liability: set limits from what the household owns and earns, and compare split limits with a combined single limit at the same premium.",
        "PIP: ask whether higher PIP limits are available and what they cost; the required amount is exhausted quickly by an emergency room visit.",
        "Health insurance: know how your health plan coordinates with PIP, because it decides who pays after PIP runs out.",
        "Uninsured and underinsured motorist: match these to your liability limits.",
        "Physical damage: carry collision and comprehensive on a financed or newer vehicle; comprehensive is also what pays for deer strikes and hail.",
        "Umbrella: if the household has a home or savings, price an umbrella policy against higher auto limits.",
      ],
    },
    {
      heading: "Where the figures come from",
      paragraphs: [
        "The liability limits are cited to the Utah Code and the PIP figure to the Division of Motor Vehicles; the Utah Insurance Department regulates the carriers and handles complaints. The PIP benefit details, the tort threshold, the uninsured motorist offer rule and the penalty schedule are described without figures, because the department and the Division of Motor Vehicles state the current ones.",
        "Send us your declarations page if your vehicle is registered in Utah. We show your PIP, liability and uninsured motorist limits against what a serious crash would cost, quote the carriers we represent at the same and at higher limits, and tell you plainly if what you have is already right.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "umbrella-insurance", "health-insurance"],
  relatedArticles: ["auto-insurance-explained-a-beginner-s-guide", "sr-22-high-risk-insurance-rules-in-utah", "winter-mountain-driving-safety-tips-for-utah-idaho", "umbrella-policy-vs-higher-liability-limits", "what-to-do-after-a-car-accident-step-by-step"],
  relatedTerms: ["personal-injury-protection", "no-fault-insurance", "bodily-injury-liability", "uninsured-motorist-coverage", "coordination-of-benefits"],
  relatedStates: ["utah"],
};
