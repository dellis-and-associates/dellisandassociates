/**
 * Access rules, one per intent, composed per collection. Every rule here is
 * exercised by tests/access/access.test.ts against the role matrix in
 * tests/access/matrix.ts; add a rule, add a row.
 */
import type { Access, FieldAccess } from "payload";
import { isAdmin, isAgent, isEditor, userOf } from "../lib/roles.ts";

export const anyone: Access = () => true;
export const nobody: Access = () => false;

export const admins: Access = ({ req }) => isAdmin(userOf(req));
export const adminsOrEditors: Access = ({ req }) => {
  const u = userOf(req);
  return isAdmin(u) || isEditor(u);
};
export const loggedIn: Access = ({ req }) => Boolean(req.user);

/** Public read is limited to reviewed content; staff see everything. The site renders drafts through the local API (overrideAccess) and applies noindex itself. */
export const reviewedOrStaff: Access = ({ req }) => {
  const u = userOf(req);
  if (isAdmin(u) || isEditor(u) || isAgent(u)) return true;
  return { reviewStatus: { equals: "reviewed" } };
};

/** Data collections without a review workflow (states, cities, forms, redirects, media): world-readable. */
export const publicRead: Access = () => true;

/** Agents may update their own profile; admins anything. */
export const adminsOrOwnAgentProfile: Access = ({ req }) => {
  const u = userOf(req);
  if (isAdmin(u)) return true;
  if (isAgent(u) && u?.id !== undefined) return { user: { equals: u.id } };
  return false;
};

/** Leads: admins see all; an agent sees only leads assigned to their own agent profile (Agents.user = this user). */
export const adminsOrAssignedAgent: Access = ({ req }) => {
  const u = userOf(req);
  if (isAdmin(u)) return true;
  if (isAgent(u) && u?.id !== undefined) return { "assignedAgent.user": { equals: u.id } };
  return false;
};

/** Users: admins manage everyone; anyone else only themselves. */
export const adminsOrSelf: Access = ({ req, id }) => {
  const u = userOf(req);
  if (isAdmin(u)) return true;
  if (u?.id !== undefined) return id !== undefined ? String(id) === String(u.id) : { id: { equals: u.id } };
  return false;
};

export const adminFieldOnly: FieldAccess = ({ req }) => isAdmin(userOf(req));
export const staffFieldRead: FieldAccess = ({ req }) => {
  const u = userOf(req);
  return isAdmin(u) || isEditor(u) || isAgent(u);
};
