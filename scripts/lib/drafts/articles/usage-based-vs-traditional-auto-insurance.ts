import type { ArticleDraft } from "../types.mts";

export const draft: ArticleDraft = {
  title: "Usage-based vs traditional auto insurance",
  excerpt: "Traditional auto pricing estimates risk from who you are and where you live; usage-based pricing adjusts it with data on how, when and how much you actually drive. What gets measured, who tends to gain or lose, the privacy trade, and a worked example.",
  sections: [
    {
      heading: "",
      paragraphs: [
        "Every auto premium is a prediction of how likely a driver is to file a claim and how large it might be. Traditional rating makes that prediction from characteristics that correlate with claims across large groups: age, driving record, claims history, vehicle, garaging address, estimated mileage and, in states that allow it, a credit-based insurance score. It never observes the driver actually driving.",
        "Usage-based insurance adds that observation. Through a smartphone app, a device plugged into the car or data shared by a connected vehicle, the carrier measures driving behaviour and mileage and uses the results to adjust the price. For some drivers the adjustment is a meaningful discount. For others it is nothing, or a surcharge, along with a stream of personal data leaving the car.",
      ],
    },
    {
      heading: "How traditional rating works",
      paragraphs: [
        "A traditional policy is priced from the application and the records the carrier pulls. Territory captures local traffic density, theft and repair costs. Driver age and experience, violations and at-fault claims capture individual history. The vehicle's make, model and safety features affect both injury and repair costs. Declared annual mileage and use, such as commuting or pleasure, add a rough measure of exposure. Discounts for multiple policies, good students, safety courses and continuous coverage refine the result.",
        "The approach is stable and private. The premium changes at renewal based on rate filings and new records, not on day-to-day driving. The trade-off is that a careful, low-mileage driver in a high-risk group pays largely as that group does, and a risky driver in a favourable group benefits from the group's record.",
      ],
    },
    {
      heading: "How usage-based programs work",
      paragraphs: ["Usage-based programs come in two broad designs, and carriers mix features of both."],
      bullets: [
        "Behaviour-based telematics programs score driving over a monitoring period or continuously, looking at hard braking, rapid acceleration, speed relative to limits, sharp cornering, phone handling while moving, time of day and total miles. A participation discount often applies at enrolment, and the score sets a renewal adjustment.",
        "Pay-per-mile programs charge a fixed monthly base rate plus a rate for each mile driven, measured by a device or the vehicle's own connection. They are built for drivers who genuinely drive little.",
        "Some programs can only reduce the premium or remove a discount; others can raise it for poor scores, depending on the carrier's filing and what the state permits.",
        "Phone-based programs may also offer crash detection and roadside dispatch, and the trip data may be available to the carrier when a claim is investigated.",
      ],
    },
    {
      heading: "The mechanism that actually differs",
      paragraphs: [
        "Traditional rating predicts risk from proxies; usage-based rating measures some of the risk directly and blends the measurement with the same proxies, which still set the base rate. The measured factors reward drivers whose actual habits are better than their group suggests and expose drivers whose habits are worse. Mileage, in particular, is a direct measure of exposure that traditional rating can only estimate from what the applicant reports.",
        "The price of that precision is data. The carrier, and sometimes a vendor, collects location, trip times and driving events. Program terms decide how long the data is kept, whether it can be used in claims or underwriting beyond the discount, and whether it is shared. State privacy and insurance rules vary, and so do carrier policies. Reading the program terms before enrolling is as important as reading the discount.",
      ],
    },
    {
      heading: "A worked example",
      paragraphs: [
        "Suppose two drivers in Salt Lake City each pay $1,500 a year for the same coverage under traditional rating. The first works from home, drives about 5,000 miles a year, and rarely drives after dark. She enrols in a telematics program with a 10% participation discount, paying $1,350 for the first term, and her score earns a 20% renewal discount, bringing her to $1,200. The second drives a long commute on I-15, often late at night after a restaurant shift, and brakes hard in traffic. In a program that can surcharge, say his score adds 10% at renewal, taking him to $1,650; in one that cannot, he simply loses the participation discount and returns to $1,500.",
        "Now suppose the first driver chooses a pay-per-mile program instead, with a base rate of $40 a month and 6 cents a mile. For example, at 5,000 miles her year costs $480 in base rate plus $300 in mileage, or $780. If a new job doubled her driving to 10,000 miles, the same program would cost $1,080, still below the traditional price but no longer far below it. All figures are illustrative.",
      ],
    },
    {
      heading: "Who each suits",
      paragraphs: ["The decision rule is whether the driver's actual habits and mileage are better than their rating group assumes, and whether they accept the monitoring."],
      bullets: [
        "Usage-based pricing tends to suit remote workers, retirees, city residents who drive occasionally, and careful drivers whose age, territory or vehicle puts them in an expensive group.",
        "Parents of teen drivers can use a telematics program for feedback on how a new driver is actually driving, and some carriers offer programs designed for that purpose.",
        "Traditional pricing tends to suit drivers with long daily commutes, frequent late-night driving, stop-and-go urban routes that generate hard braking events, or high annual mileage.",
        "Drivers who share a phone-linked program across several household drivers should confirm how the app distinguishes driver from passenger, since trips taken as a passenger can affect a score on some apps.",
        "Anyone uncomfortable with location and trip data being collected should stay with traditional rating; the discount is a trade, not a gift.",
      ],
    },
    {
      heading: "Regional notes",
      paragraphs: [
        "Driving patterns in the region pull in both directions. Long rural distances in Idaho, Nevada and much of Utah and Arizona push mileage up, which favours traditional rating or at least argues against pay-per-mile. Casino, hospitality and healthcare shift work in Las Vegas, Reno and Phoenix puts many drivers on the road late at night, a factor many telematics programs weigh. Winter visitors who leave a car parked for months, retirees in communities around Phoenix, Tucson and St. George, and remote workers along the Wasatch Front are natural candidates for mileage-based pricing. Patchy cell coverage on rural highways can also affect how completely a phone app records trips. Program availability, and whether a score can raise a premium, varies by carrier and state across Arizona, Nevada, Utah and Idaho.",
      ],
    },
    {
      heading: "When to keep what you have",
      paragraphs: [
        "A driver who is already enrolled in a usage-based program and earning a discount, and who is comfortable with the data terms, should generally stay enrolled. A driver on traditional rating whose premium is reasonable, who drives a lot or at night, or who does not want to be monitored is also making a sound choice by staying where they are. The case for a change is a low-mileage or notably careful driver paying a traditional rate set for a riskier group, or a driver in a surcharging program whose score keeps raising the premium. We compare traditional and usage-based options, including the program terms, across the carriers we represent in Arizona, Nevada, Utah and Idaho, and if the policy you have already fits how you drive, we say so.",
      ],
    },
  ],
  relatedProducts: ["auto-insurance", "motorcycle-insurance"],
  relatedArticles: ["annual-vs-six-month-auto-insurance-policies", "how-to-add-a-teen-driver-to-your-policy", "a-checklist-for-insuring-your-new-teen-driver", "how-to-improve-your-insurance-score", "retiring-how-your-insurance-needs-change"],
  relatedTerms: ["telematics-discount", "pay-per-mile-insurance", "premium", "underwriting", "good-student-discount"],
};
