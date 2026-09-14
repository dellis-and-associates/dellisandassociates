import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "Covers what a charity, church, club or foundation is exposed to: the public at its events, the decisions its board makes, the volunteers who get hurt helping, and the funds a treasurer handles. Grantors, venues and landlords ask for it before they sign.",
  intro: [
    "A non-profit is insured much like a small business, with two additions the for-profit world rarely needs. Its board members are volunteers with personal assets who can be sued over the organisation's decisions, and much of its labour is done by people who are not employees and so have no workers compensation if they are injured. Directors and officers liability answers the first; volunteer accident coverage answers the second. Around those sit the usual general liability, property, auto and crime coverages, adjusted for an organisation whose work often involves the public, children, the elderly or vulnerable adults.",
    "The requests come from outside more often than from inside. A foundation or a government agency issuing a grant asks for proof of liability and, sometimes, of directors and officers coverage. A school, park or church that hosts your event asks to be named as an additional insured on a certificate of insurance, the one-page summary the agency issues showing your carrier, limits and policy dates. A landlord, a fiscal sponsor and a bank extending a line of credit each have their own version of the same request.",
    "The premium is set by the organisation's annual budget, its activities and their hazards, the number of employees and volunteers, whether it serves minors or vulnerable adults, whether it owns property or vehicles, and its claims history. Organisations across Arizona, Nevada, Utah and Idaho range from a food bank with a warehouse and trucks to an all-volunteer arts group with no premises, and the analysis prices the actual activities rather than the category on the tax filing.",
  ],
  coverageBlocks: [
    {
      heading: "General liability and events",
      paragraphs: [
        "General liability pays when a member of the public is injured at your premises or your event, or by something you served or sold: a fall at a fundraiser, an injury on a field trip, a dish at a potluck. It provides the additional insured status venues and grantors ask for, and it extends to volunteers acting on the organisation's behalf, which is a wording point to confirm on the form. Special events held off-site, alcohol served at a gala, and fireworks or inflatables each need to be declared, because carriers rate or exclude them individually and a venue's certificate request often mentions them by name.",
      ],
    },
    {
      heading: "Directors and officers liability",
      paragraphs: [
        "Directors and officers coverage defends and pays claims that arise from how the organisation is governed rather than from a physical accident: a decision to close a programme, a fired executive director alleging wrongful termination, a member claiming the bylaws were ignored, a donor alleging funds were misused, a regulator investigating the board. It insures the individual directors and officers, the organisation itself, and usually employees, volunteers and committee members. On most non-profit forms, employment practices liability is either built in or added, and it is the source of most claims.",
        "Two features decide its value. The policy is claims-made, so it pays only for claims first made during the policy period, and dropping it exposes the board to claims about earlier years unless tail coverage is bought. And the defence costs are often paid inside the limit, so a long employment dispute can consume the limit before any settlement.",
      ],
    },
    {
      heading: "Volunteer accident",
      paragraphs: [
        "Volunteers are not employees, so a volunteer who breaks a wrist building a ramp or is hurt at a shelter has no workers compensation to claim on. Volunteer accident coverage pays their medical bills up to a limit, regardless of who was at fault, and often a small amount for accidental death or dismemberment, with no need to prove the organisation was negligent. It is inexpensive, keeps a volunteer injury from becoming a liability suit, and is written either as a blanket over all registered volunteers or by activity. It does not cover a volunteer's own car, which is the next section.",
      ],
    },
    {
      heading: "Hired and non-owned auto and owned vehicles",
      paragraphs: [
        "When a volunteer drives clients to appointments or delivers meals in their own car and causes a crash, their personal auto policy responds first, and the organisation is sued as well. Hired and non-owned auto liability pays the organisation's share and its defence; it does not repair the volunteer's car. A van or truck the organisation owns needs a commercial auto policy in its own right, with the drivers listed and screened, since a passenger van full of clients is a substantial exposure.",
      ],
    },
    {
      heading: "Property, crime and abuse or molestation",
      paragraphs: [
        "Property coverage insures the building you own or the contents and improvements in the space you rent, plus equipment carried to events. Crime coverage pays for embezzlement by an employee or volunteer treasurer, forged cheques and a fraudulent wire, and grantors increasingly ask for a fidelity limit as a condition of funding. For any organisation that works with children, the elderly or people with disabilities, a sexual abuse and molestation section is a separate coverage with its own limit and its own underwriting: background checks, a two-adult rule and written policies. Without it, such claims are excluded from general liability on most forms.",
      ],
    },
  ],
  covered: [
    "A guest injured at a fundraiser, a programme or a rented venue",
    "Board members sued personally over a governance or employment decision",
    "Wrongful termination, discrimination and harassment claims, with employment practices coverage",
    "A volunteer's medical bills after an injury while serving",
    "The organisation's liability when a volunteer crashes their own car on a delivery",
    "Funds embezzled by a treasurer or bookkeeper, with the crime section",
    "Abuse claims involving clients, with the abuse and molestation section",
    "Office contents, event equipment and a building you own",
  ],
  notCovered: [
    "Damage to a volunteer's own vehicle while driving for the organisation",
    "Claims about events that happened before the directors and officers retroactive date",
    "A volunteer's lost wages, which volunteer accident does not replace",
    "Fines, penalties and the return of misappropriated funds by the person who took them",
    "Abuse claims when the abuse and molestation section was not bought",
    "Professional services such as counselling or medical care without a professional liability endorsement",
    "Employees' injuries, which belong to workers compensation and are required by state rules once you have staff",
  ],
  discounts: [
    { name: "Package policy", description: "General liability, property, crime and hired and non-owned auto written together, with directors and officers often available from the same carrier at a package rate." },
    { name: "Background checks and written safeguarding policies", description: "Documented screening of staff and volunteers who work with vulnerable people, which lowers or is required for the abuse and molestation rate." },
    { name: "Volunteer driver programme", description: "Motor vehicle record checks and proof of personal auto insurance for every volunteer driver." },
    { name: "Financial controls", description: "Dual signatures, a board treasurer separate from the bookkeeper and an annual review or audit, which reduce the crime rate." },
    { name: "Claims-free history", description: "No liability, employment or crime claims over the carrier's look-back period." },
  ],
  faqs: [
    {
      question: "Our board members are volunteers. Can they really be sued?",
      answer: [
        "Yes. State volunteer protection laws limit some claims against individual volunteers but not all of them, and they do not pay for a defence. Directors and officers coverage does, and experienced board candidates often ask whether it is in place before they agree to serve. The organisation itself is also a defendant in most of these claims, and the policy covers it as well.",
      ],
    },
    {
      question: "A grant application asks for a certificate of insurance. What do they want?",
      answer: [
        "Proof that the coverages and limits in the grant agreement are in force, and usually that the grantor is an additional insured on the liability policy. Send us the insurance section of the agreement. If the limits or coverages asked for are above what the policy carries, the policy has to be changed first; the certificate reports what exists and cannot promise more.",
      ],
    },
    {
      question: "Do we need workers compensation if we have one paid staff member?",
      answer: [
        "Each of the four states sets its own threshold for when an employer must carry it, and a single employee can be enough. It is a separate policy from the package and volunteer accident does not replace it, because it covers employees rather than volunteers. The analysis confirms the rule for your state and the cost for a small payroll.",
      ],
    },
    {
      question: "Our treasurer handles all the money. Is that covered?",
      answer: [
        "Only with a crime or fidelity section, which most package policies include only at a small limit or not at all. Employee dishonesty coverage on a non-profit form usually extends to volunteers who handle funds, but confirm the wording. Suppose a volunteer treasurer moves a few hundred dollars a month to a personal account over three years; the loss adds up to more than most small default limits, so the limit should be set from the amount of money the organisation handles in a year rather than left at the default.",
      ],
    },
    {
      question: "We serve children. What does the carrier need from us?",
      answer: [
        "Written policies on screening, supervision and reporting, background checks on staff and volunteers with unsupervised access, and evidence they are followed. Carriers underwrite the abuse and molestation section on those controls and will decline or limit it without them. The section also carries its own limit, which grantors and school districts often specify.",
      ],
    },
  ],
  relatedProducts: ["general-liability-insurance", "business-owners-policy", "cyber-liability-insurance", "commercial-umbrella-insurance"],
  seo: { description: "How a non-profit's insurance is built: general liability and events, directors and officers, volunteer accident, hired and non-owned auto, property, crime and abuse coverage, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
