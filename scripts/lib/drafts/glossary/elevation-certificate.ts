import type { GlossaryDraft } from "../types.mts";
export const draft: GlossaryDraft = {
  term: "Elevation certificate",
  definition: [
    "A surveyor's document recording how high a building's lowest floor sits compared with the expected height of floodwater in its area. It is prepared on a federal form by a licensed surveyor or engineer and shows the building's location, flood zone and key heights.",
  ],
  inPractice: [
    "Its main use is rating a flood policy. In a high-risk zone the height of the lowest floor against the base flood elevation is one of the strongest drivers of premium, so a building that sits above the expected water line can be far cheaper to insure than one below it, and this document is what proves it. Under the current federal rating method it is no longer required to buy a policy, but it can still lower the price when it shows a favourable elevation. It also supports a letter of map amendment when a lot has been mapped into a flood zone but the structure itself sits above the water line. The document travels with the property; a seller who has one should hand it over, since a new survey costs money and time.",
  ],
  example: [
    "Suppose a buyer is quoted $2,400 a year for flood coverage on a house in a mapped high-risk zone with no certificate on file. The seller produces one showing the lowest floor two feet above the base flood elevation. Re-rated with that document, the premium is $900. Suppose instead the certificate showed the floor two feet below; the premium would rise, and the buyer would know that before closing. Hypothetical figures.",
  ],
  relatedTerms: ["base-flood-elevation", "flood-zone", "nfip"],
  relatedProducts: ["flood-insurance"],
};
