import type { CollectionConfig } from "payload";
import { ownTenantRow, ownTenantRowAdmin } from "../access.ts";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: { useAsTitle: "name", group: "Referrals", defaultColumns: ["name", "slug", "referralsEnabled"] },
  access: { read: ownTenantRow, create: ({ req }) => Boolean(req.user?.roles?.includes("admin")) && !req.user?.tenant, update: ownTenantRowAdmin, delete: () => false },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "referralsEnabled",
      type: "checkbox",
      required: true,
      defaultValue: false,
      admin: { description: "Tenant-level kill switch. False until counsel has filled every reward rule row for this tenant. The engine refuses to earn a reward while this is off." },
    },
    { name: "agencyDisplayName", type: "text", admin: { description: "Used in referee messages ({{agencyName}})." } },
    { name: "notifyEmail", type: "email", admin: { description: "Where referral operations notices go." } },
    {
      name: "velocity",
      type: "group",
      admin: { description: "Abuse limits. Rejections above these carry velocity-referrer / velocity-ip reason codes." },
      fields: [
        { name: "perReferrerPerDay", type: "number", required: true, defaultValue: 10, min: 1 },
        { name: "perIpPerHour", type: "number", required: true, defaultValue: 20, min: 1 },
      ],
    },
    { name: "dedupeWindowDays", type: "number", required: true, defaultValue: 180, min: 1, admin: { description: "A referee already referred within this window, by anyone, is a duplicate." } },
  ],
};
