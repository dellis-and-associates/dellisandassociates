import type { CollectionConfig } from "payload";
import { tenantAdmin, tenantStaff } from "../access.ts";

export const MESSAGE_KEYS = ["referee-opt-in", "referrer-welcome"] as const;

/** Every outbound message lives here, versioned, admin-write-only. */
export const MessageTemplates: CollectionConfig = {
  slug: "message-templates",
  admin: { useAsTitle: "key", group: "Referrals", defaultColumns: ["key", "tenant", "version", "active"] },
  access: { read: tenantStaff, create: tenantAdmin, update: tenantAdmin, delete: () => false },
  fields: [
    { name: "tenant", type: "relationship", relationTo: "tenants", required: true, index: true },
    { name: "key", type: "select", required: true, index: true, options: MESSAGE_KEYS.map((v) => ({ label: v, value: v })) },
    { name: "version", type: "number", required: true, defaultValue: 1 },
    { name: "active", type: "checkbox", required: true, defaultValue: true },
    { name: "subject", type: "text", required: true },
    { name: "body", type: "textarea", required: true, admin: { description: "Placeholders: {{referrerFirstName}} {{refereeFirstName}} {{agencyName}} {{acceptUrl}} {{declineUrl}}. The opt-in message must name the referrer and let the referee decline." } },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.key === "referee-opt-in" && typeof data.body === "string") {
          for (const ph of ["{{referrerFirstName}}", "{{declineUrl}}"]) if (!data.body.includes(ph)) throw new Error(`The referee opt-in message must include ${ph}.`);
        }
        return data;
      },
    ],
  },
};
