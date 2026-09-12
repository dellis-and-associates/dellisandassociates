import type { CollectionConfig } from "payload";
import { admins, adminsOrSelf } from "../access/index.ts";
import { ROLES } from "../lib/roles.ts";
import { adminFieldOnly } from "../access/index.ts";

export { ROLES, type Role } from "../lib/roles.ts";

/**
 * admin — everything, including compliance globals and `reviewed`.
 * editor — content, never compliance. agent — own profile, own leads.
 * partner — referral portal only (Phase 4). Roles are admin-assigned.
 */
export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email", group: "People", defaultColumns: ["email", "roles"] },
  auth: true,
  access: { read: adminsOrSelf, create: admins, update: adminsOrSelf, delete: admins, admin: ({ req }) => Boolean(req.user?.roles?.some((r) => ["admin", "editor", "agent"].includes(r))) },
  fields: [
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      defaultValue: ["editor"],
      options: ROLES.map((r) => ({ label: r, value: r })),
      saveToJWT: true,
      access: { update: adminFieldOnly },
    },
    { name: "name", type: "text" },
  ],
};
