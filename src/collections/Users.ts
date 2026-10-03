import type { CollectionConfig } from "payload";
import { Forbidden } from "payload";
import { admins, adminsOrSelf } from "../access/index.ts";
import { ROLES } from "../lib/roles.ts";
import { env } from "../env.ts";
import { verifyTurnstile } from "../lib/turnstile.ts";
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
  hooks: {
    /**
     * Cloudflare Turnstile on the admin sign-in. The widget above the form (admin.components.beforeLogin)
     * leaves its token in a short-lived cookie, because Payload's login posts JSON and would not carry a
     * form field. Payload runs this after it has checked the password, so this gates the session rather
     * than the comparison; the brute-force counting is Payload's own maxLoginAttempts.
     *
     * ADMIN_LOGIN_TURNSTILE=off is the way back in if the widget cannot load and nobody can sign in.
     */
    beforeLogin: [
      async ({ req }) => {
        if (env.ADMIN_LOGIN_TURNSTILE === "off") return;
        const cookie = req.headers?.get?.("cookie") ?? "";
        const raw = /(?:^|;\s*)dp-admin-turnstile=([^;]*)/.exec(cookie)?.[1];
        const ip = req.headers?.get?.("x-forwarded-for")?.split(",")[0]?.trim();
        const check = await verifyTurnstile(raw ? decodeURIComponent(raw) : null, ip);
        if (!check.passed) throw new Forbidden(req.t);
      },
    ],
  },
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
