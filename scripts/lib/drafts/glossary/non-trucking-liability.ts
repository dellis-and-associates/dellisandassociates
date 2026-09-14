import type { GlossaryDraft } from "../types.mts";

export const draft: GlossaryDraft = {
  term: "Non-trucking liability",
  definition: [
    "Coverage for an owner-operator's tractor while it is being driven for personal reasons, off dispatch, when the motor carrier's policy does not apply.",
  ],
  inPractice: [
    "A leased owner-operator is covered by the motor carrier's auto liability while under dispatch. Between loads, driving home, or running errands in the tractor, that policy does not respond, and this form fills the gap. It is cheaper than a full commercial policy because personal use is a fraction of the miles. It excludes any use in the business of a motor carrier, including deadheading to pick up a load, so the boundary between business and personal is where disputes arise. Bobtail coverage is the related form that turns on whether a trailer is attached rather than on the purpose of the trip. Many leases require one or both.",
  ],
  example: [
    "Suppose an owner-operator drops a trailer at the yard on Friday, drives the tractor to a family dinner, and causes a collision that injures another motorist. The carrier's policy declines because the driver was off dispatch. The non-trucking liability policy pays the $35,000 claim within its $1,000,000 limit. Hypothetical.",
  ],
  relatedTerms: ["bobtail-insurance", "motor-truck-cargo-insurance", "liability-coverage"],
  relatedProducts: ["commercial-auto-insurance"],
};
