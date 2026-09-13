import type { CollectionConfig } from "payload";
import { afterChangeRevalidate, afterDeleteRevalidate } from "../hooks/revalidate.ts";
import { admins, publicRead } from "../access/index.ts";
import { slugField } from "../fields/index.ts";

/** Seeded empty. A carrier exists only with an appointment-confirmed date under the Desert Peak entity. */
export const Carriers: CollectionConfig = {
  slug: "carriers",
  admin: { useAsTitle: "name", group: "People", defaultColumns: ["name", "appointmentConfirmedAt", "active"] },
  access: { read: publicRead, create: admins, update: admins, delete: admins },
  hooks: { afterChange: [afterChangeRevalidate], afterDelete: [afterDeleteRevalidate] },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    { name: "active", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
    { name: "appointmentConfirmedAt", type: "date", required: true, admin: { position: "sidebar", description: "Date the appointment under Desert Peak Insurance was confirmed in writing." } },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "website", type: "text" },
    { name: "lines", type: "relationship", relationTo: "products", hasMany: true },
    { name: "states", type: "relationship", relationTo: "states", hasMany: true },
    { name: "notes", type: "textarea", admin: { description: "Internal; never rendered." } },
  ],
};
