import type { PayloadRequest } from "payload";

export const ROLES = ["admin", "editor", "agent", "partner"] as const;
export type Role = (typeof ROLES)[number];

type UserLike = { roles?: (Role | string)[] | null; id?: number | string; collection?: string } | null | undefined;

export const hasRole = (user: UserLike, ...roles: Role[]): boolean =>
  Boolean(user?.roles?.some((r) => (roles as string[]).includes(r)));

export const isAdmin = (user: UserLike) => hasRole(user, "admin");
export const isEditor = (user: UserLike) => hasRole(user, "editor");
export const isAgent = (user: UserLike) => hasRole(user, "agent");
export const isPartner = (user: UserLike) => hasRole(user, "partner");

export const userOf = (req: PayloadRequest) => req.user as UserLike;
