import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Motor truck cargo insurance",
  definition: [
    "A hauler's coverage for the freight it carries, paying the shipper when goods are lost or damaged while in the hauler's possession.",
  ],
  inPractice: [
    "For-hire trucking companies and owner-operators carry it because shippers and brokers demand a certificate before tendering a load, and because their responsibility for the freight exists under the bill of lading. It pays on the trucker's behalf, so it is a liability form, not the shipper's own property policy. Limits are set per vehicle or per load. Exclusions to read closely: theft from an unattended vehicle unless locked and alarmed, certain commodities such as electronics, tobacco or live animals, refrigeration failure unless endorsed, and loads outside the scheduled radius. Debris removal and pollutant clean-up after a spill are useful add-ons. The commodity hauled and the trucker's claims history drive the premium.",
  ],
  example: [
    "Suppose an owner-operator hauling $70,000 of appliances jackknifes on ice and the load is destroyed. The trucker's cargo policy, with a $100,000 limit per load, pays the shipper $70,000 less a $1,000 deductible. Hypothetical.",
  ],
  relatedTerms: ["cargo-insurance", "bobtail-insurance", "non-trucking-liability"],
  relatedProducts: ["commercial-auto-insurance"],
};
