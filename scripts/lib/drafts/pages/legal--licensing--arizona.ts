import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Licensing disclosures (Arizona)",
  lede: "{{TODO:site.legalName}} is licensed as an insurance producer in Arizona. The license, the lines it covers and the regulator that issued it are set out below.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "In Arizona an insurance producer license is issued by the state to an individual or a business entity after an examination, a background check and a fee, and it is renewed on a fixed cycle with continuing education. The license authorizes the holder to solicit, negotiate and sell insurance for the lines it names; carriers then appoint the licensed agency to represent them. Arizona is an at-fault state for auto liability, and the agency's product pages describe coverage in those terms.",
          ],
        },
      ],
    },
    { type: "disclosure", key: "stateLicensing" },
    {
      type: "richText",
      sections: [
        {
          heading: "Verify a license or make a complaint",
          paragraphs: [
            "The Arizona Department of Insurance and Financial Institutions regulates insurance producers in the state. Its website at https://difi.az.gov/ offers a license lookup where you can confirm that the agency and its advisors hold a current license, and it accepts complaints about producers and carriers. Bring a complaint to the office first if you prefer; the regulator is available whether or not you do.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Arizona insurance producer licensing disclosure for Desert Peak Insurance, with how to verify the license at the Arizona Department of Insurance and Financial Institutions." },
};
