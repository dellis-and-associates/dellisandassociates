/**
 * Snapshots the site's authored glossary drafts into content/glossary.json so the
 * "Term of the week" family feeds from the same definitions the website publishes.
 * Only authored terms are imported; the 197 placeholder shells have no definition yet
 * and produce no post. Re-run when the site authors more terms.
 *
 * Usage: node scripts/import-glossary.ts [path-to-site-repo]
 */
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { ROOT, TODAY } from "./collateral/lib.ts";

const site = resolve(process.argv[2] ?? join(ROOT, ".."));
const dir = join(site, "scripts", "lib", "drafts", "glossary");
if (!existsSync(dir)) { console.error(`import-glossary: no drafts at ${dir}; content/glossary.json left unchanged`); process.exit(0); }
const terms: { slug: string; term: string; definition: string }[] = [];
for (const f of readdirSync(dir).filter((f) => f.endsWith(".ts")).sort()) {
  const mod = await import(pathToFileURL(join(dir, f)).href);
  const d = mod.draft;
  if (!d?.term || !d?.definition?.length) continue;
  terms.push({ slug: f.replace(/\.ts$/, ""), term: d.term, definition: d.definition.join(" ") });
}
const out = { $description: `Snapshot of authored glossary drafts from the site repo (scripts/lib/drafts/glossary), imported ${TODAY}. The site is the master; edit there and re-run pnpm import:glossary.`, source: "site:scripts/lib/drafts/glossary/*.ts", imported: TODAY, count: terms.length, terms };
writeFileSync(join(ROOT, "content", "glossary.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`import-glossary: ${terms.length} authored terms -> content/glossary.json`);
