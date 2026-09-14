import type { ProductDraft } from "../types.mts";

export const draft: ProductDraft = {
  summary: "The policies a trade or general contractor needs to hold a license, sign a subcontract and get on a job site: general liability with completed operations, tools and equipment, commercial auto, workers compensation and the license bond, matched to what the board and the GC ask for.",
  intro: [
    "Contractors insurance is not one policy but a package assembled around the way a contractor works: on other people's property, with employees and subs, with expensive equipment in a truck, and with work that can fail years after it is finished. Each of those is a separate exposure and a separate policy or endorsement. The order they matter in is usually set by who is asking: the state licensing board, then the general contractor or owner whose contract you sign, then your lender or equipment financier.",
    "Every trade in Arizona, Nevada, Utah and Idaho meets the same basic list, from a one-truck handyman to a framing company with crews. The details differ by trade and by whether you work residential or commercial. Roofing, excavation and anything involving structural work are rated and underwritten more carefully than painting or flooring, and residential work carries its own set of exclusions on some liability forms that need reading before you sign.",
    "The premium across the package is set by payroll and receipts by class of work, the vehicles and drivers, the equipment schedule, the claims history and the subcontracting practices the application asks about. The analysis lays your current policies next to the requirements in your licence and your contracts and shows where they do not line up.",
  ],
  coverageBlocks: [
    {
      heading: "General liability and completed operations",
      paragraphs: [
        "General liability pays for bodily injury and property damage you cause to others during the work: a dropped tool that injures a homeowner, a water line cut that floods a neighbour's unit, a fire started by a torch. Completed operations extends that to damage that shows up after the job is done and paid for, which is where a contractor's real long-tail exposure lives. A deck that collapses two summers later, or a plumbing joint that fails behind drywall, is a completed operations claim.",
        "The form's exclusions matter more for contractors than for most businesses. The policy does not pay to redo your own faulty work; it pays for the damage that work causes to other property. Some carriers add exclusions for residential construction, for work on condominiums, or for damage caused by subcontractors, and those exclusions are the first thing a general contractor's contract review will reject.",
      ],
    },
    {
      heading: "Tools, equipment and installation",
      paragraphs: [
        "A property policy covers things at a fixed address. A contractor's tools live in trucks and on sites, so they are insured on an inland marine form called a contractors equipment or tools floater. Small hand tools are covered as a blanket amount; anything valuable, such as a skid steer, a generator or a laser level, is scheduled by serial number and value. Theft from a locked vehicle or a job site is the common claim, and the policy's conditions on locking and site security decide whether it pays.",
        "Installation coverage is the related piece: it insures materials you have bought for a job, at the site or in transit, until the work is accepted. Without it, a pallet of cabinets stolen from a garage the night before install is your loss, not the homeowner's.",
      ],
    },
    {
      heading: "Commercial auto and hired or non-owned vehicles",
      paragraphs: [
        "A truck titled to the business, or used for the business with tools and ladders aboard, needs a commercial auto policy; a personal auto policy can deny a claim once the vehicle's use is clearly commercial. Hired and non-owned coverage adds liability for employees driving their own vehicles between sites and for rented equipment haulers. Contracts usually set an auto liability limit alongside the general liability one.",
      ],
    },
    {
      heading: "Workers compensation and employers liability",
      paragraphs: [
        "Workers compensation pays an injured employee's medical bills and a share of lost wages regardless of fault, and in exchange the employee generally cannot sue. Each of the four states sets its own rules for when a contractor must carry it, and general contractors typically require proof from every sub regardless. Employers liability, packaged with it, responds when an injury suit falls outside the compensation system. If you use subcontractors who carry no coverage of their own, their payroll is charged to your policy at audit, which is the usual source of a surprise bill.",
      ],
    },
    {
      heading: "License bonds, certificates and additional insureds",
      paragraphs: [
        "State contractor licensing boards require a license bond as a condition of holding the licence. The bond is not insurance for you; it is a guarantee to the board and the public that you will follow the licensing law, and if the surety pays a claim you repay the surety. Bonds are placed through the same office and are described on the surety page.",
        "Every job then begins with a certificate of insurance. It is a one-page summary the agency issues to the general contractor or owner showing your carriers, limits and policy dates, and stating whether they are an additional insured on your liability policy with primary and non-contributory wording and a waiver of subrogation on the workers compensation policy. Those are endorsements that must be on the policies before the certificate can say they are.",
      ],
    },
  ],
  covered: [
    "Injury to a customer or bystander caused by your crew during the work",
    "Damage to a client's property caused by your operations, such as a cut line or a fire",
    "Damage caused by your finished work after the job closes, under completed operations",
    "Tools and scheduled equipment stolen from a job site or a locked truck",
    "Materials bought for a job and lost before installation is accepted",
    "Employee injuries through workers compensation, including medical care and wage benefits",
    "Crashes in company trucks and, with the endorsement, in employees' own vehicles on business",
    "Legal defence when a client or a third party sues over the work",
  ],
  notCovered: [
    "The cost of tearing out and redoing your own defective work",
    "Contractual promises to finish a job or pay a penalty, which belong to a performance bond",
    "Professional design errors, if you also design, without a professional liability policy",
    "Damage to the specific part of the property you are working on, under many general liability forms",
    "Injuries to uninsured subcontractors' workers beyond what the audit charges you for",
    "Pollution from fuel, solvents or asbestos disturbed during the work, without a pollution endorsement",
    "Wear, breakdown and mechanical failure of equipment",
  ],
  discounts: [
    { name: "Package policy", description: "General liability, property and inland marine written together with one carrier, usually as a contractors package or business owners policy." },
    { name: "Experience modification credit", description: "A workers compensation rating factor below one, earned by a claims history better than your trade's expected losses." },
    { name: "Written subcontractor agreements", description: "Collecting certificates and indemnity agreements from every sub, which lowers the liability rate and prevents audit charges." },
    { name: "Fleet safety and telematics", description: "Driver record checks and tracking on company vehicles." },
    { name: "Higher deductibles on equipment", description: "Taking a larger deductible on the tools floater in exchange for a lower rate on scheduled items." },
  ],
  faqs: [
    {
      question: "What does the licensing board actually require me to carry?",
      answer: [
        "The boards in each of the four states require a license bond for most classifications, and some require proof of workers compensation or an exemption filing before the licence is issued. General liability is not always a licensing condition, but it is a condition of nearly every contract you will sign. The requirements and bond amounts are published by each board; send us your classification and we will match the package to it rather than guessing.",
      ],
    },
    {
      question: "The general contractor wants to be an additional insured. What does that mean?",
      answer: [
        "It means your liability policy will defend and pay for the general contractor when they are sued because of your work. It is granted by an endorsement, either naming them or by a blanket endorsement that covers anyone your contract requires. Contracts also ask for the ongoing and completed operations versions, primary and non-contributory wording, and a waiver of subrogation. Each is a separate endorsement with its own small charge, and the certificate must match what the policy actually carries.",
      ],
    },
    {
      question: "I work alone. Do I still need workers compensation?",
      answer: [
        "Rules for sole proprietors differ by state, and a contractor with no employees may be able to file an exemption. The practical answer is often set by the general contractor, who may refuse a sub without a policy because your payroll would otherwise be charged to theirs. A minimum-premium policy or a ghost policy that names you but excludes you as an owner can satisfy the contract at a small cost; the analysis compares the options.",
      ],
    },
    {
      question: "Are my tools covered under my truck's insurance?",
      answer: [
        "No. A commercial auto policy covers the vehicle and permanently attached equipment, not the tools inside it. Theft from the truck is a claim on the tools and equipment floater, which is why that policy asks whether the vehicle is locked and where it is parked overnight.",
      ],
    },
    {
      question: "What is a builders risk policy and do I need one?",
      answer: [
        "Builders risk insures a structure while it is under construction, against fire, theft of installed materials, wind and vandalism. On a new build or major remodel it is bought by the owner or the general contractor for the project term, and the contract says which. Trade subcontractors usually do not buy it, but should confirm the project carries it before storing materials on site.",
      ],
    },
    {
      question: "Why did my workers compensation audit produce a bill?",
      answer: [
        "The policy is priced at the start of the year on estimated payroll and trued up at the end against actual payroll and the certificates you collected from subs. Payroll higher than estimated, a crew classified in a higher-rated trade, or subs with no coverage of their own all add premium at audit. Keeping certificates on file and estimating payroll honestly at renewal removes most surprises.",
      ],
    },
  ],
  relatedProducts: ["general-liability-insurance", "surety-bonds", "commercial-auto-insurance", "workers-compensation-insurance", "business-owners-policy"],
  seo: { description: "What a contractor needs to hold a licence and sign a subcontract: general liability with completed operations, tools and equipment, commercial auto, workers compensation and the license bond, from an independent agency in Arizona, Nevada, Utah and Idaho." },
};
