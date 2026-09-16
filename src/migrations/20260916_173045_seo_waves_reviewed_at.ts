import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload_cms"."enum_site_settings_promoted_wave" AS ENUM('1', '2', '3');
  ALTER TABLE "payload_cms"."products" ADD COLUMN "reviewed_at" timestamp(3) with time zone;
  ALTER TABLE "payload_cms"."articles" ADD COLUMN "reviewed_at" timestamp(3) with time zone;
  ALTER TABLE "payload_cms"."glossary_terms" ADD COLUMN "reviewed_at" timestamp(3) with time zone;
  ALTER TABLE "payload_cms"."pages" ADD COLUMN "reviewed_at" timestamp(3) with time zone;
  ALTER TABLE "payload_cms"."site_settings" ADD COLUMN "promoted_wave" "payload_cms"."enum_site_settings_promoted_wave" DEFAULT '1' NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_cms"."products" DROP COLUMN "reviewed_at";
  ALTER TABLE "payload_cms"."articles" DROP COLUMN "reviewed_at";
  ALTER TABLE "payload_cms"."glossary_terms" DROP COLUMN "reviewed_at";
  ALTER TABLE "payload_cms"."pages" DROP COLUMN "reviewed_at";
  ALTER TABLE "payload_cms"."site_settings" DROP COLUMN "promoted_wave";
  DROP TYPE "payload_cms"."enum_site_settings_promoted_wave";`)
}
