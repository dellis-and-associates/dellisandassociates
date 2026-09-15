import type { PageDraft } from "../types.mts";

export const draft: PageDraft = {
  title: "Licensing disclosures (Idaho)",
  lede: "Desert Peak Insurance is a licensed insurance producer in Idaho. The license is disclosed below, along with the Idaho Department of Insurance, which issued it.",
  blocks: [
    {
      type: "richText",
      sections: [
        {
          heading: "",
          paragraphs: [
            "Idaho issues producer licenses to individuals and to business entities, and an entity license names the individual producers acting under it. Lines of authority are listed on the license itself; a producer cannot place a line that is not listed. Continuing education and renewal run on the schedule the Department sets. For auto liability Idaho follows the at-fault rule: the driver who causes a crash, through their carrier, pays for the harm done to others, which is why the liability limits on an Idaho policy carry the weight they do.",
          ],
        },
      ],
    },
    { type: "disclosure", key: "stateLicensing" },
    {
      type: "richText",
      sections: [
        {
          heading: "Confirm the license with the state",
          paragraphs: [
            "The Idaho Department of Insurance, at https://doi.idaho.gov/, provides a producer lookup that shows whether a license is active and which lines it covers. The Department is also where a consumer complaint about a producer or a carrier is filed. The agency reads its own complaints seriously and answers them in writing, but nothing about that process replaces your right to go to the regulator directly.",
          ],
        },
      ],
    },
  ],
  seo: { description: "Idaho insurance producer licensing disclosure for Desert Peak Insurance, with how to confirm the license at the Idaho Department of Insurance." },
};
