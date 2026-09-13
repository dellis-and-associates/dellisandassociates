import type { CollectionConfig } from "payload";
import { admins } from "../access/index.ts";

/**
 * Save-and-resume for the quote flow. The token lives in an httpOnly cookie;
 * data is the answers so far (regulated PII: same rules as Leads, purged by
 * leads:purge after expiry). Never readable through the API.
 */
export const QuoteSessions: CollectionConfig = {
  slug: "quote-sessions",
  admin: { hidden: true },
  access: { read: admins, create: () => false, update: () => false, delete: admins },
  fields: [
    { name: "token", type: "text", required: true, unique: true, index: true },
    { name: "step", type: "number", required: true, defaultValue: 1 },
    { name: "data", type: "json", required: true },
    { name: "expiresAt", type: "date", required: true, index: true },
    { name: "lead", type: "relationship", relationTo: "leads" },
  ],
};
