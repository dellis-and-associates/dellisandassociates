import type { CollectionConfig } from "payload";
import { tenantAdminOrOwnReferrals } from "../access.ts";
import { REWARD_TYPES } from "../types.ts";

/**
 * Append-only. Nobody updates or deletes an entry — not through the API
 * (access) and not through the local API with overrideAccess (hooks throw).
 * Balances are computed from entries, never stored.
 */
export const RewardLedger: CollectionConfig = {
  slug: "reward-ledger",
  admin: { useAsTitle: "id", group: "Referrals", defaultColumns: ["id", "tenant", "referrer", "referral", "type", "amount", "createdAt"] },
  access: { read: tenantAdminOrOwnReferrals, create: () => false, update: () => false, delete: () => false },
  hooks: {
    beforeChange: [
      ({ operation }) => {
        if (operation === "update") throw new Error("The reward ledger is append-only; write a reversing entry instead.");
      },
    ],
    beforeDelete: [
      () => {
        throw new Error("The reward ledger is append-only; entries are never deleted.");
      },
    ],
  },
  fields: [
    { name: "tenant", type: "relationship", relationTo: "tenants", required: true, index: true },
    { name: "referrer", type: "relationship", relationTo: "referrers", required: true, index: true },
    { name: "referral", type: "relationship", relationTo: "referrals", required: true, index: true },
    { name: "type", type: "select", required: true, options: ["earned", "issued", "reversed"].map((v) => ({ label: v, value: v })) },
    { name: "reversesType", type: "select", options: ["earned", "issued"].map((v) => ({ label: v, value: v })), admin: { description: "For reversed entries: voiding an earned reward, or clawing back an issued one." } },
    { name: "rewardType", type: "select", required: true, options: REWARD_TYPES.map((v) => ({ label: v, value: v })) },
    { name: "amount", type: "number", required: true, min: 0 },
    { name: "currency", type: "text", required: true, defaultValue: "USD" },
    { name: "ruleSnapshot", type: "json", required: true, admin: { description: "The rule row as it stood when this entry was written." } },
    { name: "termsVersion", type: "text", required: true },
    { name: "actor", type: "json", required: true },
    { name: "reason", type: "text" },
    { name: "reverses", type: "relationship", relationTo: "reward-ledger" },
  ],
};
