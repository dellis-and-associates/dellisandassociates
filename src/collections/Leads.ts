import type { CollectionConfig } from "payload";
import { adminFieldOnly, adminsOrAssignedAgent, admins } from "../access/index.ts";
import { isAdmin, userOf } from "../lib/roles.ts";
import { LEAD_TYPES } from "./Forms.ts";
import { sendEmail } from "../lib/email.ts";

export const LEAD_STATUSES = ["new", "contacted", "qualified", "quoted", "bound", "closed", "rejected"] as const;

/**
 * Regulated PII (state insurance privacy rules), not marketing data.
 *  - Created by the server-side submission handler through the local API,
 *    or by an admin entering a phone lead by hand. No other role creates.
 *  - Read: admins, and the agent the lead is assigned to.
 *  - `data` (the raw submission) is admin-read-only at the field level; agents
 *    see contact, interest and status.
 *  - Never logged: no hooks touch the payload logger; error reporting scrubs
 *    (Phase 7). Never emailed in full: notifications carry the lead id and
 *    non-PII fields only.
 *  - Retention: `retainUntil` is set on create from ComplianceSettings
 *    (leadRetentionDays / healthLeadRetentionDays); `pnpm leads:purge`
 *    deletes expired leads. The period is stated in DECISIONS.md.
 */
export const Leads: CollectionConfig = {
  slug: "leads",
  admin: {
    useAsTitle: "reference",
    group: "Operations",
    defaultColumns: ["reference", "type", "status", "assignedAgent", "createdAt", "retainUntil"],
    hidden: ({ user }) => !isAdmin(user) && !user?.roles?.includes("agent"),
  },
  access: { read: adminsOrAssignedAgent, create: admins, update: adminsOrAssignedAgent, delete: admins },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation !== "create") return data;
        // Health flag comes from the form definition, from the first field, never from the handler's discretion.
        const formId = typeof data.form === "object" && data.form ? data.form.id : data.form;
        if (formId) {
          const form = await req.payload.findByID({ collection: "forms", id: formId, depth: 0, overrideAccess: true }).catch(() => null);
          if (form?.collectsHealthInformation) data.containsHealthInformation = true;
        }
        const settings = await req.payload.findGlobal({ slug: "compliance-settings", depth: 0, overrideAccess: true });
        const days = data.containsHealthInformation ? settings.healthLeadRetentionDays : settings.leadRetentionDays;
        const until = new Date();
        until.setUTCDate(until.getUTCDate() + Number(days ?? 730));
        data.retainUntil = until.toISOString();
        data.reference = data.reference ?? `L-${Date.now().toString(36).toUpperCase()}`;
        return data;
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== "create") return doc;
        // The notification names the form and the timestamp only. No field contents, ever.
        const formId = typeof doc.form === "object" && doc.form ? doc.form.id : doc.form;
        const form = formId ? await req.payload.findByID({ collection: "forms", id: formId, depth: 0, overrideAccess: true }).catch(() => null) : null;
        const recipients = (form?.notifyEmails ?? []).map((e) => e.email).filter(Boolean);
        await sendEmail({
          to: recipients,
          subject: `New submission: ${form?.name ?? doc.type}`,
          text: `A new ${form?.name ?? doc.type} submission arrived at ${new Date(doc.createdAt).toISOString()}. Reference ${doc.reference}. Open it in the admin panel.`,
          purpose: "lead-notification",
        });
        return doc;
      },
    ],
  },
  fields: [
    { name: "reference", type: "text", unique: true, index: true, admin: { readOnly: true, position: "sidebar" } },
    { name: "form", type: "relationship", relationTo: "forms", index: true },
    { name: "type", type: "select", required: true, index: true, options: LEAD_TYPES.map((v) => ({ label: v, value: v })) },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      index: true,
      options: LEAD_STATUSES.map((v) => ({ label: v, value: v })),
    },
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "name", type: "text" },
        { name: "email", type: "email", index: true },
        { name: "phone", type: "text", index: true },
      ],
    },
    { name: "interest", type: "relationship", relationTo: "products", hasMany: true },
    { name: "assignedAgent", type: "relationship", relationTo: "agents", index: true, access: { update: adminFieldOnly } },
    { name: "containsHealthInformation", type: "checkbox", defaultValue: false, admin: { readOnly: true } },
    {
      name: "data",
      type: "json",
      access: { read: ({ req }) => isAdmin(userOf(req)), update: adminFieldOnly },
      admin: { description: "The raw submission. Admin-only. Purged with the lead." },
    },
    {
      name: "source",
      type: "group",
      admin: { description: "Attribution. IP is stored hashed with REFERRAL_HASH_SALT, never raw." },
      fields: [
        { name: "page", type: "text" },
        { name: "referralCode", type: "text", index: true },
        { name: "utm", type: "json" },
        { name: "ipHash", type: "text" },
        { name: "userAgent", type: "text" },
      ],
    },
    { name: "notes", type: "textarea", admin: { description: "Agent notes. No health information here." } },
    { name: "retainUntil", type: "date", index: true, admin: { readOnly: true, position: "sidebar" } },
  ],
};
