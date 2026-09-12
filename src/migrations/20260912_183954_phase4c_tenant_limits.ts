import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_cms"."tenants" ADD COLUMN "velocity_per_referrer_per_day" numeric DEFAULT 10 NOT NULL;
  ALTER TABLE "payload_cms"."tenants" ADD COLUMN "velocity_per_ip_per_hour" numeric DEFAULT 20 NOT NULL;
  ALTER TABLE "payload_cms"."tenants" ADD COLUMN "dedupe_window_days" numeric DEFAULT 180 NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_cms"."tenants" DROP COLUMN "velocity_per_referrer_per_day";
  ALTER TABLE "payload_cms"."tenants" DROP COLUMN "velocity_per_ip_per_hour";
  ALTER TABLE "payload_cms"."tenants" DROP COLUMN "dedupe_window_days";`)
}
