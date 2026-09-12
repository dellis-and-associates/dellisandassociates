import type { CollectionConfig } from "payload";
import { tenantAdmin } from "../access.ts";

/** Immutable audit trail: every state change, refusal and message, with actor and IP hash. */
export const ReferralEvents: CollectionConfig = {
  slug: "referral-events",
  admin: { useAsTitle: "id", group: "Referrals", defaultColumns: ["id", "tenant", "referral", "type", "from", "to", "createdAt"] },
  access: { read: tenantAdmin, create: () => false, update: () => false, delete: () => false },
  hooks: {
    beforeChange: [
      ({ operation }) => {
        if (operation === "update") throw new Error("Referral events are immutable.");
      },
    ],
    beforeDelete: [
      () => {
        throw new Error("Referral events are immutable.");
      },
    ],
  },
  fields: [
    { name: "tenant", type: "relationship", relationTo: "tenants", required: true, index: true },
    { name: "referral", type: "relationship", relationTo: "referrals", index: true },
    { name: "referrer", type: "relationship", relationTo: "referrers", index: true },
    { name: "type", type: "text", required: true, index: true, admin: { description: "status-change | rejected | reward-earned | reward-refused | reward-issued | reward-reversed | opt-in-sent | opt-in-response | created" } },
    { name: "from", type: "text" },
    { name: "to", type: "text" },
    { name: "actor", type: "json", required: true },
    { name: "ipHash", type: "text" },
    { name: "detail", type: "json" },
  ],
};
