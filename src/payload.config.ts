import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Agents } from "./collections/Agents.ts";
import { Articles } from "./collections/Articles.ts";
import { Carriers } from "./collections/Carriers.ts";
import { Cities } from "./collections/Cities.ts";
import { Forms } from "./collections/Forms.ts";
import { GlossaryTerms } from "./collections/GlossaryTerms.ts";
import { Leads } from "./collections/Leads.ts";
import { LocationOverrides } from "./collections/LocationOverrides.ts";
import { Media } from "./collections/Media.ts";
import { Pages } from "./collections/Pages.ts";
import { Products } from "./collections/Products.ts";
import { Redirects } from "./collections/Redirects.ts";
import { States } from "./collections/States.ts";
import { Users } from "./collections/Users.ts";
import { ComplianceSettings } from "./globals/ComplianceSettings.ts";
import { SiteSettings } from "./globals/SiteSettings.ts";
import { env, isLocalDatabase, requireDirectDatabaseUri } from "./env.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** migrate:* and seed set PAYLOAD_MIGRATING and therefore go over the direct/session connection. */
const migrating = env.PAYLOAD_MIGRATING === "true";
const connectionString = migrating ? requireDirectDatabaseUri() : env.PAYLOAD_DATABASE_URI;

/**
 * Database topology (DECISIONS.md, Phase 1):
 *  - Runtime goes through the Supabase transaction pooler (6543). The `pg`
 *    driver never issues named prepared statements, so nothing has to be
 *    turned off; `pnpm test:db` proves it with 50 concurrent queries.
 *  - One pool per process, `max: 2` on serverless. The adapter keeps one client
 *    checked out after init (verified 2026-09-12 with pg_stat_activity: with
 *    max 1 the first find() waits forever), so 2 is the effective "size 1".
 *    Raise it only with evidence that invocations queue on one instance.
 *  - Payload owns the `payload_cms` schema, never `public`. RLS stays off there.
 *  - Push mode is allowed only against the Docker database; anywhere else the
 *    schema changes only through committed migrations.
 */
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname, "..") },
  },
  collections: [Products, States, Cities, LocationOverrides, Articles, GlossaryTerms, Pages, Agents, Carriers, Users, Media, Redirects, Forms, Leads],
  globals: [SiteSettings, ComplianceSettings],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  serverURL: env.NEXT_PUBLIC_SITE_URL,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: {
      connectionString,
      max: migrating || isLocalDatabase(connectionString) ? 5 : 2,
    },
    schemaName: "payload_cms",
    push: env.NODE_ENV === "development" && isLocalDatabase(env.PAYLOAD_DATABASE_URI),
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  plugins: [
    s3Storage({
      collections: { media: true },
      bucket: env.S3_BUCKET,
      config: {
        endpoint: env.S3_ENDPOINT,
        region: env.S3_REGION,
        forcePathStyle: true,
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY_ID,
          secretAccessKey: env.S3_SECRET_ACCESS_KEY,
        },
      },
    }),
  ],
  sharp,
});
