/** Writes brand/logos/MANIFEST.sha256 for the locked identity. Run once; verify-token-lock fails if any logo file changes afterwards. */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { LOGOS } from "./collateral/lib.ts";
const lines = readdirSync(LOGOS).filter((f) => /\.(svg|png)$/.test(f)).sort().map((f) => `${createHash("sha256").update(readFileSync(join(LOGOS, f))).digest("hex")}  ${f}`);
writeFileSync(join(LOGOS, "MANIFEST.sha256"), lines.join("\n") + "\n");
console.log(`lock-identity: ${lines.length} files hashed -> brand/logos/MANIFEST.sha256`);
