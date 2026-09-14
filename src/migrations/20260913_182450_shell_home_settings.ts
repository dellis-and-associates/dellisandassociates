import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "payload_cms"."site_settings_carriers_names" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "payload_cms"."site_settings_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"consent_date" timestamp(3) with time zone NOT NULL
  );
  
  ALTER TABLE "payload_cms"."site_settings" ADD COLUMN "advisor_name" varchar;
  ALTER TABLE "payload_cms"."site_settings" ADD COLUMN "advisor_title" varchar;
  ALTER TABLE "payload_cms"."site_settings" ADD COLUMN "advisor_statement" varchar;
  ALTER TABLE "payload_cms"."site_settings" ADD COLUMN "advisor_photo_id" integer;
  ALTER TABLE "payload_cms"."site_settings" ADD COLUMN "carriers_headline" varchar;
  ALTER TABLE "payload_cms"."site_settings" ADD COLUMN "testimonial_consent_confirmed" boolean DEFAULT false;
  ALTER TABLE "payload_cms"."site_settings_carriers_names" ADD CONSTRAINT "site_settings_carriers_names_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."site_settings_testimonials" ADD CONSTRAINT "site_settings_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_carriers_names_order_idx" ON "payload_cms"."site_settings_carriers_names" USING btree ("_order");
  CREATE INDEX "site_settings_carriers_names_parent_id_idx" ON "payload_cms"."site_settings_carriers_names" USING btree ("_parent_id");
  CREATE INDEX "site_settings_testimonials_order_idx" ON "payload_cms"."site_settings_testimonials" USING btree ("_order");
  CREATE INDEX "site_settings_testimonials_parent_id_idx" ON "payload_cms"."site_settings_testimonials" USING btree ("_parent_id");
  ALTER TABLE "payload_cms"."site_settings" ADD CONSTRAINT "site_settings_advisor_photo_id_media_id_fk" FOREIGN KEY ("advisor_photo_id") REFERENCES "payload_cms"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_advisor_advisor_photo_idx" ON "payload_cms"."site_settings" USING btree ("advisor_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_cms"."site_settings_carriers_names" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."site_settings_testimonials" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_cms"."site_settings_carriers_names" CASCADE;
  DROP TABLE "payload_cms"."site_settings_testimonials" CASCADE;
  ALTER TABLE "payload_cms"."site_settings" DROP CONSTRAINT "site_settings_advisor_photo_id_media_id_fk";
  
  DROP INDEX "payload_cms"."site_settings_advisor_advisor_photo_idx";
  ALTER TABLE "payload_cms"."site_settings" DROP COLUMN "advisor_name";
  ALTER TABLE "payload_cms"."site_settings" DROP COLUMN "advisor_title";
  ALTER TABLE "payload_cms"."site_settings" DROP COLUMN "advisor_statement";
  ALTER TABLE "payload_cms"."site_settings" DROP COLUMN "advisor_photo_id";
  ALTER TABLE "payload_cms"."site_settings" DROP COLUMN "carriers_headline";
  ALTER TABLE "payload_cms"."site_settings" DROP COLUMN "testimonial_consent_confirmed";`)
}
