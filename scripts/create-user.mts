/**
 * pnpm create:user --email you@example.com [--role admin] [--name "Daniel Ellis"]
 *
 * Creates a CMS login, or updates the role and password of one that exists.
 *
 * Users can only be created by an admin (`create: admins` on the collection), and Payload only offers its
 * "create first user" screen while the users table is empty — so once any row exists, including one a test
 * left behind, the admin UI has no way to make the first real account. This script goes through the local
 * API with `overrideAccess`, which is the sanctioned way in and the only way that works from an empty state.
 *
 * The password is never taken from the command line: argv is visible in shell history and to `ps`. Set
 * NEW_USER_PASSWORD, or leave it unset and the script prompts with the input hidden.
 */
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { ROLES, type Role } from "../src/lib/roles.ts";
import { withPayload } from "./lib/site.mts";

const arg = (k: string): string | undefined => {
  const i = process.argv.indexOf(`--${k}`);
  return i > -1 ? process.argv[i + 1] : undefined;
};

const email = arg("email")?.trim().toLowerCase();
const role = (arg("role") ?? "admin") as Role;
const name = arg("name");

if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
  console.error("Usage: pnpm create:user --email you@example.com [--role admin] [--name \"Daniel Ellis\"]");
  process.exit(1);
}
if (!ROLES.includes(role)) {
  console.error(`Unknown role "${role}". One of: ${ROLES.join(", ")}`);
  process.exit(1);
}

/** Read a password without echoing it, and without it reaching argv or the shell's history. */
async function readPassword(): Promise<string> {
  const fromEnv = process.env.NEW_USER_PASSWORD;
  if (fromEnv) return fromEnv;
  if (!stdin.isTTY) {
    // Piped in: `printf %s 'secret' | pnpm create:user --email ...`. Keeps it out of argv and out of history.
    const chunks: Buffer[] = [];
    for await (const c of stdin) chunks.push(c as Buffer);
    const piped = Buffer.concat(chunks).toString("utf8").replace(/\r?\n$/, "");
    if (piped) return piped;
    console.error("No terminal to prompt on. Pipe the password in, or set NEW_USER_PASSWORD.");
    process.exit(1);
  }
  const rl = createInterface({ input: stdin, output: stdout, terminal: true });
  const hide = (): void => { (rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput = () => {}; };
  const ask = async (label: string) => { const p = rl.question(label); hide(); const v = await p; stdout.write("\n"); return v; };
  const first = await ask("Password (min 8 characters, not shown): ");
  const again = await ask("Again: ");
  rl.close();
  if (first !== again) { console.error("The two entries did not match."); process.exit(1); }
  return first;
}

const password = (await readPassword()).trim();
if (password.length < 8) { console.error("Payload requires at least 8 characters."); process.exit(1); }

await withPayload(async (payload) => {
  const existing = (await payload.find({ collection: "users", where: { email: { equals: email } }, limit: 1, depth: 0, overrideAccess: true })).docs[0];
  if (existing) {
    await payload.update({ collection: "users", id: existing.id, data: { password, roles: [role], ...(name ? { name } : {}) }, overrideAccess: true });
    console.log(`updated ${email} — role ${role}, password reset`);
  } else {
    await payload.create({ collection: "users", data: { email, password, roles: [role], ...(name ? { name } : {}) }, overrideAccess: true });
    console.log(`created ${email} — role ${role}`);
  }
  const all = await payload.find({ collection: "users", limit: 100, depth: 0, overrideAccess: true, sort: "email" });
  console.log(`\nusers now (${all.totalDocs}):`);
  for (const u of all.docs) console.log(`  ${u.email}  ${JSON.stringify(u.roles)}${String(u.email).endsWith("@test.local") ? "   <- left behind by a test run" : ""}`);
  console.log("\nSign in at /admin");
});

// The Postgres pool keeps the event loop alive; the work is done.
process.exit(0);
