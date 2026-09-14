import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Locations we serve",
  lede: "We are licensed in Arizona, Nevada, Utah and Idaho and write coverage in the cities listed here. Each city page covers the local risks a carrier prices for and the rules that touch a policy there.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Insurance is priced by address. Wildfire exposure, hail, flood zones, monsoon wind, theft rates and repair costs all vary by city and sometimes by street, and each carrier weighs them in its own way. The city pages explain which of those apply where you live and what to look for on a declarations page as a result.",
            "Advice is by phone, email and video across all four states, so you do not need to be near an office to be a client. Where a city has a rule of its own, a floodplain designation, a wildfire building code, a rental registration, the page names it.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Cities in Arizona, Nevada, Utah and Idaho where Desert Peak Insurance writes coverage, with the local risks and rules that shape a policy in each." },
};
