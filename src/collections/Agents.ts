import type { CollectionConfig } from "payload";
import { admins, adminsOrOwnAgentProfile, publicRead } from "../access/index.ts";
import { slugField } from "../fields/index.ts";

/**
 * Seeded empty. Created by an admin from client-supplied roster data only. A
 * licensed agent may edit their own profile (Users.roles = agent, linked here).
 */
export const Agents: CollectionConfig = {
  slug: "agents",
  admin: { useAsTitle: "name", group: "People", defaultColumns: ["name", "slug", "active", "user"] },
  access: { read: publicRead, create: admins, update: adminsOrOwnAgentProfile, delete: admins },
  fields: [
    { name: "name", type: "text", required: true },
    slugField("name"),
    { name: "active", type: "checkbox", defaultValue: false, admin: { position: "sidebar", description: "Inactive agents render nowhere." }, access: { update: ({ req }) => Boolean(req.user?.roles?.includes("admin")) } },
    { name: "user", type: "relationship", relationTo: "users", unique: true, admin: { position: "sidebar" }, access: { update: ({ req }) => Boolean(req.user?.roles?.includes("admin")) } },
    { name: "title", type: "text" },
    { name: "bio", type: "richText" },
    {
      name: "photo",
      type: "group",
      fields: [
        { name: "image", type: "upload", relationTo: "media" },
        { name: "releaseOnFile", type: "checkbox", defaultValue: false, admin: { description: "No release, no photo on the site." } },
      ],
    },
    {
      name: "licenses",
      type: "array",
      access: { update: ({ req }) => Boolean(req.user?.roles?.includes("admin")) },
      admin: { description: "Admin only. From the client's roster; never typed from memory." },
      fields: [
        { name: "state", type: "relationship", relationTo: "states", required: true },
        { name: "licenseNumber", type: "text", required: true },
        { name: "npn", type: "text", admin: { description: "National Producer Number" } },
      ],
    },
    { name: "citiesServed", type: "relationship", relationTo: "cities", hasMany: true },
    { name: "products", type: "relationship", relationTo: "products", hasMany: true },
    {
      type: "row",
      fields: [
        { name: "email", type: "email" },
        { name: "phone", type: "text" },
      ],
    },
  ],
};
