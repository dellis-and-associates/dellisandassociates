import { createHash } from "node:crypto";

/** IPs are stored hashed with the tenant platform salt, never raw. */
export const hashIp = (ip: string, salt: string): string => createHash("sha256").update(`${salt}:${ip.trim()}`).digest("hex").slice(0, 32);
