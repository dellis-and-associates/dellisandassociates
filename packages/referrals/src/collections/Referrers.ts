import type { CollectionConfig } from "payload";
import { adminField, tenantAdmin, tenantAdminOrOwnReferrer } from "../access.ts";
import { TRACKS } from "../types.ts";
import { generateCode } from "../engine/codes.ts";
import { normalizeEmail, normalizePhone } from "../engine/normalize.ts";

export const Referrers: CollectionConfig = {
  slug: "referrers",
  admin: { useAsTitle: "code", group: "Referrals", defaultColumns: ["code", "tenant", "track", "status", "email"] },
  access: { read: tenantAdminOrOwnReferrer, create: tenantAdmin, update: tenantAdminOrOwnReferrer, delete: () => false },
  hooks: {
    beforeValidate: [
      async ({ data, req, operation }) => {
        if (!data) return data;
        if (data.email) data.emailNormalized = normalizeEmail(data.email);
        if (data.phone) data.phoneNormalized = normalizePhone(data.phone);
        if (operation === "create" && !data.code) {
          const tenant = typeof data.tenant === "object" ? data.tenant.id : data.tenant;
          for (let i = 0; i < 5; i++) {
            const code = generateCode();
            const clash = await req.payload.find({ collection: "referrers", where: { and: [{ tenant: { equals: tenant } }, { code: { equals: code } }] }, limit: 1, depth: 0, overrideAccess: true });
            if (clash.totalDocs === 0) {
              data.code = code;
              break;
            }
          }
          if (!data.code) throw new Error("Could not allocate a unique referral code.");
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "tenant", type: "relationship", relationTo: "tenants", required: true, index: true, access: { update: adminField } },
    { name: "code", type: "text", index: true, admin: { readOnly: true, position: "sidebar", description: "Short, unambiguous (no 0/O/1/I/L). Unique per tenant." }, access: { update: () => false } },
    { name: "track", type: "select", required: true, options: TRACKS.map((v) => ({ label: v, value: v })), access: { update: adminField } },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending-review",
      index: true,
      options: ["pending-review", "active", "suspended"].map((v) => ({ label: v, value: v })),
      admin: { description: "A new referrer's first reward waits in the manual review queue until an admin activates them." },
      access: { update: adminField },
    },
    { name: "user", type: "relationship", relationTo: "users", admin: { description: "Partner track: the portal login." }, access: { update: adminField } },
    { name: "name", type: "text", required: true },
    { type: "row", fields: [{ name: "email", type: "email", required: true }, { name: "phone", type: "text" }] },
    { name: "emailNormalized", type: "text", index: true, admin: { hidden: true } },
    { name: "phoneNormalized", type: "text", index: true, admin: { hidden: true } },
    { name: "addressNormalized", type: "text", admin: { hidden: true } },
    {
      name: "termsAcceptance",
      type: "group",
      fields: [
        { name: "program", type: "relationship", relationTo: "referral-programs" },
        { name: "version", type: "text" },
        { name: "acceptedAt", type: "date" },
        { name: "ipHash", type: "text" },
      ],
    },
    {
      name: "payoutMethod",
      type: "select",
      options: ["gift-card-email", "check-by-mail", "account-credit", "none"].map((v) => ({ label: v, value: v })),
      admin: { description: "Abstracted. Never a card or account number." },
    },
    { name: "notes", type: "textarea", access: { read: adminField, update: adminField } },
  ],
};
