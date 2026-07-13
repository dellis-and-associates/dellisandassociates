export type ServiceSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  features?: { term: string; desc: string }[];
};

export type ServiceContent = {
  title: string;
  lede: string;
  icon: "canopy" | "staircase" | "review" | "term" | "index" | "cross" | "eye";
  sections: ServiceSection[];
};

export const serviceContent: Record<string, ServiceContent> = {
  "life-insurance": {
    title: "Life insurance, sized to your actual obligations.",
    icon: "canopy",
    lede: "Life insurance is a vital component of financial planning, offering essential protection for your loved ones in case of your untimely passing — covering immediate expenses like funeral costs and outstanding debts while providing ongoing support for their long-term needs.",
    sections: [
      {
        heading: "What is life insurance?",
        paragraphs: [
          "Life insurance is a contract between an individual and an insurance company. In exchange for premium payments, the insurance company provides a lump-sum payment, known as a death benefit, to beneficiaries upon the insured's death.",
        ],
      },
      {
        heading: "Types of life insurance",
        features: [
          {
            term: "Term life insurance",
            desc: "The simplest and often the cheapest form. It pays out the death benefit if the insured dies during the term of the policy, which is usually between 10 and 30 years.",
          },
          {
            term: "Permanent life insurance",
            desc: "Includes whole life, universal life, and variable life policies that provide death benefits and accumulate cash value over time.",
          },
        ],
      },
      {
        heading: "Why do you need it?",
        paragraphs: [
          "Life insurance serves as a financial safety net for families and their loved ones. It can help cover funeral costs, pay off debts, provide an inheritance, replace lost income, or fund a child's education.",
        ],
      },
      {
        heading: "What affects your premium",
        paragraphs: [
          "Age, health, lifestyle, coverage amount, policy type, and term length all influence cost. The right policy starts from an assessment of your financial obligations — which is exactly what our no-fee review walks through.",
        ],
      },
    ],
  },

  "whole-life-insurance": {
    title: "Whole life: coverage for your entire lifetime.",
    icon: "canopy",
    lede: "Whole life insurance provides coverage for your entire lifetime, as long as you continue to pay the premiums — with a cash value component that grows alongside the protection.",
    sections: [
      {
        heading: "How permanent coverage works",
        paragraphs: [
          "Permanent life insurance, also known as whole life, provides lifetime coverage. It is priced above term life because it lasts for the extent of your life and typically builds cash value.",
          "The cash value component accumulates on a tax-deferred basis over the life of the policy — it acts as the savings portion of the policy. You can borrow against it, make withdrawals, or surrender the policy for its cash value minus surrender charges.",
        ],
      },
      {
        heading: "Varieties of permanent life insurance",
        features: [
          {
            term: "Whole life insurance",
            desc: "Offers a fixed death benefit and a cash value factor that grows at a guaranteed rate.",
          },
          {
            term: "Universal life insurance",
            desc: "Provides flexibility to adjust premiums and death benefits as your circumstances change.",
          },
          {
            term: "Burial insurance",
            desc: "A small whole life policy with a death benefit typically between $5,000 and $26,000, designed to cover final expenses.",
          },
          {
            term: "Survivorship life coverage",
            desc: "Insures two people under one policy — typically married couples — paying the benefit after both have passed.",
          },
        ],
      },
    ],
  },

  "term-life-insurance": {
    title: "Term life: level premiums for a defined window.",
    icon: "term",
    lede: "Term life insurance is a straightforward and cost-effective form of life insurance that provides coverage for a specified period — with premiums that stay the same for the duration of the policy.",
    sections: [
      {
        heading: "How term coverage works",
        paragraphs: [
          "Term life insurance delivers protection for a certain period of time — 10, 15, 20, 25, or 30 years — and the premium stays level for the duration of the policy. Death benefits are paid tax-free to your beneficiaries. Guaranteed renewability is available after the term expires, though rates increase annually from there.",
        ],
      },
      {
        heading: "Key features",
        features: [
          {
            term: "Coverage period",
            desc: "Fixed terms such as 10, 20, 25, or 30 years with regular premium payments.",
          },
          {
            term: "Death benefit",
            desc: "A lump-sum, tax-free payout to your named beneficiary.",
          },
          {
            term: "Affordability",
            desc: "Lower premiums than whole life or universal life insurance.",
          },
          {
            term: "No cash value",
            desc: "Policies expire with no payout if the policyholder outlives the term — that's what keeps premiums low.",
          },
          {
            term: "Renewability",
            desc: "Option to renew at higher premiums after the term ends.",
          },
          {
            term: "Convertible policies",
            desc: "Many terms can convert to permanent insurance without a new medical exam.",
          },
          {
            term: "Coverage amount",
            desc: "A customizable death benefit sized to your needs.",
          },
          {
            term: "Medical underwriting",
            desc: "A health examination may be required at issue.",
          },
          {
            term: "Term length",
            desc: "Chosen to match the years your obligations actually run.",
          },
          {
            term: "Financial protection",
            desc: "Covers mortgages, education, and living expenses through the years that matter.",
          },
        ],
      },
    ],
  },

  iul: {
    title: "Indexed universal life: protection with market-linked growth.",
    icon: "index",
    lede: "Indexed Universal Life (IUL) combines the elements of traditional universal life insurance with cash value growth potential linked to the performance of a stock market index, typically the S&P 500 — with tax-deferred accumulation.",
    sections: [
      {
        heading: "A unique — and not-for-everyone — option",
        paragraphs: [
          "An IUL policy lets you allocate cash value to fixed or equity-indexed accounts, referencing indexes like the S&P 500 and Nasdaq-100. Your cash value is not directly invested in the stock market, which limits downside while capturing a share of index gains.",
        ],
      },
      {
        heading: "Key advantages",
        features: [
          {
            term: "Low price",
            desc: "The policyholder bears the index risk, so the premiums are low.",
          },
          {
            term: "Cash value accumulation",
            desc: "Amounts credited to the cash value grow tax-deferred.",
          },
          {
            term: "Flexibility",
            desc: "You control the amount allocated to indexed accounts and can adjust death benefits.",
          },
          {
            term: "Death benefit",
            desc: "Permanent, tax-exempt, and avoids probate.",
          },
          {
            term: "Less risk",
            desc: "Cash value is not directly invested in the stock market.",
          },
          {
            term: "Easier distribution",
            desc: "Tax-free access to cash value through policy loans.",
          },
          {
            term: "Unlimited contribution",
            desc: "No annual contribution caps like qualified retirement accounts.",
          },
        ],
      },
    ],
  },

  annuities: {
    title: "Annuities: contractual income, in steps.",
    icon: "staircase",
    lede: "Annuities are insurance contracts that provide a fixed income stream for a person's lifetime or a specified period — a legally binding agreement that transfers longevity risk to the insurer in exchange for premium payments.",
    sections: [
      {
        heading: "How annuities work",
        paragraphs: [
          "An annuity is a customizable contract issued by an insurance company that converts your premiums into a guaranteed fixed income. The type of annuity you purchase determines your future payments.",
          "Annuities are used in retirement planning and can be purchased with a lump sum or through contributions over time — available as fixed, variable, or indexed types.",
        ],
        bullets: [
          "Principal protection",
          "Potential guaranteed lifetime income",
          "Beneficiary options",
          "Some annuities are optimized to help fund long-term care",
        ],
      },
      {
        heading: "Fixed indexed annuities",
        paragraphs: [
          "Our current offering: fixed indexed annuities share in upside gains while avoiding downside losses. As a result, your investment can only go up — never down.",
        ],
      },
    ],
  },

  medicare: {
    title: "Medicare: four parts, one decision.",
    icon: "cross",
    lede: "Medicare is a US government health insurance program offering medical coverage to seniors aged 65 and over — and to younger people with disabilities or chronic conditions such as permanent kidney failure. We handle the enrollment windows and the plan spread.",
    sections: [
      {
        heading: "The parts",
        features: [
          {
            term: "Part A — hospital insurance",
            desc: "Inpatient hospital stays, skilled nursing, and hospice.",
          },
          {
            term: "Part B — medical insurance",
            desc: "Doctor's services, outpatient care, medical supplies, and preventive services.",
          },
        ],
      },
      {
        heading: "What we offer",
        bullets: [
          "Medicare Supplements",
          "Part D prescription drug plans",
          "Part C — Medicare Advantage",
        ],
      },
      {
        heading: "Part C (Medicare Advantage) can include",
        bullets: [
          "Hospitalization",
          "Home healthcare services",
          "Hospice care",
          "Doctor's visits",
          "Prescription drug coverage",
          "Preventive care",
          "Dental and vision",
          "Hearing care",
          "SilverSneakers membership programs",
        ],
      },
      {
        heading: "Plan types",
        bullets: [
          "Health Maintenance Organization (HMO)",
          "Preferred Provider Organization (PPO)",
          "Private Fee-for-Service (PFFS)",
          "Special Needs Plans (SNPs)",
          "Medical Savings Account (MSA)",
        ],
      },
    ],
  },

  "health-insurance": {
    title: "Health insurance for individuals and families.",
    icon: "cross",
    lede: "Health insurance is coverage that pays for medical and surgical expenses incurred by the insured. Knowing the moving parts makes the choice much simpler — here's what we walk through together.",
    sections: [
      {
        heading: "The moving parts",
        features: [
          {
            term: "Premium",
            desc: "Regular payments to maintain coverage; varies by age, location, and coverage level.",
          },
          {
            term: "Deductible",
            desc: "The amount you must pay out of pocket for medical expenses before your insurance starts to cover costs.",
          },
          {
            term: "Copayment and coinsurance",
            desc: "Cost-sharing mechanisms — fixed amounts or percentages of each service.",
          },
          {
            term: "Network",
            desc: "In-network providers offer lower negotiated rates.",
          },
          {
            term: "Coverage",
            desc: "Doctor visits, hospitalization, prescriptions, and preventive care.",
          },
          {
            term: "Preventive care",
            desc: "Often covered without any cost-sharing.",
          },
          {
            term: "Open enrollment",
            desc: "Plans are available during specific annual periods — we track the windows.",
          },
          {
            term: "Subsidies",
            desc: "Government financial assistance for eligible individuals.",
          },
          {
            term: "Medicare and Medicaid",
            desc: "Government programs for seniors and low-income populations.",
          },
          {
            term: "Private vs. public insurance",
            desc: "Private company plans versus government-administered options.",
          },
        ],
      },
    ],
  },

  "dental-and-vision-insurance": {
    title: "Dental & vision, for individuals and groups.",
    icon: "eye",
    lede: "Ellis & Associates offers dental insurance to both individuals and groups, and vision plans that cover routine eye health from exams to eyewear.",
    sections: [
      {
        heading: "Vision coverage",
        paragraphs: [
          "Vision coverage typically includes routine eye health expenses such as eye exams, contact lens fittings, contact lenses, and eyeglass lenses and frames — and may offer LASIK discounts. Coverage structures vary by plan type.",
          "Vision insurance is often a value-added benefit linked to indemnity health insurance, health maintenance organizations (HMOs), and preferred provider organizations (PPOs).",
        ],
      },
      {
        heading: "Combined coverage benefits",
        bullets: [
          "Savings on eye care accessories",
          "Quality standards for eye care and related materials",
          "Annual eye checkup with a $10 deductible (once a year)",
          "Eyewear deductible of $20 (once in 24 months)",
          "Frames deductible available (once every 24 months)",
          "Contact lens offers available (once every 24 months)",
        ],
      },
    ],
  },
};
