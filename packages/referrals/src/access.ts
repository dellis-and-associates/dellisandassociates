import type { Access, FieldAccess, PayloadRequest, Where } from "payload";

type U = { id?: number | string; roles?: string[] | null; tenant?: number | string | { id: number | string } | null } | null | undefined;
const user = (req: PayloadRequest) => req.user as U;
const has = (u: U, r: string) => Boolean(u?.roles?.includes(r));
export const tenantIdOf = (u: U): number | string | undefined => {
  const t = u?.tenant;
  if (t === null || t === undefined) return undefined;
  return typeof t === "object" ? t.id : t;
};

/** Admin of the same tenant. An admin with no tenant is the platform operator and sees every tenant. */
export const tenantAdmin: Access = ({ req }) => {
  const u = user(req);
  if (!has(u, "admin")) return false;
  const t = tenantIdOf(u);
  return t === undefined ? true : ({ tenant: { equals: t } } satisfies Where);
};

/** Admin, editor or agent of the same tenant (read-only uses). */
export const tenantStaff: Access = ({ req }) => {
  const u = user(req);
  if (!(has(u, "admin") || has(u, "editor") || has(u, "agent"))) return false;
  const t = tenantIdOf(u);
  return t === undefined && has(u, "admin") ? true : t === undefined ? false : ({ tenant: { equals: t } } satisfies Where);
};

/** Tenant admin, or the referrer whose `user` is this user (portal). */
export const tenantAdminOrOwnReferrer: Access = ({ req }) => {
  const u = user(req);
  if (has(u, "admin")) return tenantAdmin({ req } as never);
  if (u?.id !== undefined && (has(u, "partner") || has(u, "agent"))) return { user: { equals: u.id } };
  return false;
};

/** Tenant admin, or rows whose referrer belongs to this user. */
export const tenantAdminOrOwnReferrals: Access = ({ req }) => {
  const u = user(req);
  if (has(u, "admin")) return tenantAdmin({ req } as never);
  if (u?.id !== undefined && (has(u, "partner") || has(u, "agent"))) return { "referrer.user": { equals: u.id } };
  return false;
};

/** The tenants collection itself: rows are keyed by id, not by a tenant field. */
export const ownTenantRow: Access = ({ req }) => {
  const u = user(req);
  if (!(has(u, "admin") || has(u, "editor") || has(u, "agent") || has(u, "partner"))) return false;
  const t = tenantIdOf(u);
  if (t === undefined) return has(u, "admin");
  return { id: { equals: t } };
};
export const ownTenantRowAdmin: Access = ({ req }) => {
  const u = user(req);
  if (!has(u, "admin")) return false;
  const t = tenantIdOf(u);
  return t === undefined ? true : { id: { equals: t } };
};

export const never: Access = () => false;
export const adminField: FieldAccess = ({ req }) => has(user(req), "admin");
