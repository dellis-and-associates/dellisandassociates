import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "payload_cms"."enum_pages_template" ADD VALUE 'utility';
  DROP TABLE "payload_cms"."compliance_settings_reward_rules" CASCADE;
  ALTER TABLE "payload_cms"."pages" ADD COLUMN "noindex" boolean DEFAULT false;
  ALTER TABLE "payload_cms"."compliance_settings" DROP COLUMN "referral_program_enabled";
  DROP TYPE "payload_cms"."enum_compliance_settings_reward_rules_track";
  DROP TYPE "payload_cms"."enum_compliance_settings_reward_rules_reward_type_allowed";
  DROP TYPE "payload_cms"."enum_compliance_settings_reward_rules_cash_equivalent_allowed";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload_cms"."enum_compliance_settings_reward_rules_track" AS ENUM('customer', 'partner');
  CREATE TYPE "payload_cms"."enum_compliance_settings_reward_rules_reward_type_allowed" AS ENUM('gift-card', 'merchandise', 'account-credit', 'none');
  CREATE TYPE "payload_cms"."enum_compliance_settings_reward_rules_cash_equivalent_allowed" AS ENUM('yes', 'no');
  CREATE TABLE "payload_cms"."compliance_settings_reward_rules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"state_id" integer NOT NULL,
  	"track" "payload_cms"."enum_compliance_settings_reward_rules_track" NOT NULL,
  	"medicare_rule_set" boolean DEFAULT false,
  	"reward_type_allowed" "payload_cms"."enum_compliance_settings_reward_rules_reward_type_allowed",
  	"per_referral_cap" numeric,
  	"per_referrer_annual_cap" numeric,
  	"cash_equivalent_allowed" "payload_cms"."enum_compliance_settings_reward_rules_cash_equivalent_allowed",
  	"source_citation" varchar,
  	"verified_by" varchar,
  	"verified_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_cms"."pages" ALTER COLUMN "template" SET DATA TYPE text;
  ALTER TABLE "payload_cms"."pages" ALTER COLUMN "template" SET DEFAULT 'static'::text;
  DROP TYPE "payload_cms"."enum_pages_template";
  CREATE TYPE "payload_cms"."enum_pages_template" AS ENUM('home', 'static', 'quote-hub', 'claims-hub', 'products-hub', 'locations-hub', 'carriers-hub', 'team-hub', 'blog-hub', 'legal-static');
  ALTER TABLE "payload_cms"."pages" ALTER COLUMN "template" SET DEFAULT 'static'::"payload_cms"."enum_pages_template";
  ALTER TABLE "payload_cms"."pages" ALTER COLUMN "template" SET DATA TYPE "payload_cms"."enum_pages_template" USING "template"::"payload_cms"."enum_pages_template";
  ALTER TABLE "payload_cms"."compliance_settings" ADD COLUMN "referral_program_enabled" boolean DEFAULT false;
  ALTER TABLE "payload_cms"."compliance_settings_reward_rules" ADD CONSTRAINT "compliance_settings_reward_rules_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "payload_cms"."states"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."compliance_settings_reward_rules" ADD CONSTRAINT "compliance_settings_reward_rules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."compliance_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "compliance_settings_reward_rules_order_idx" ON "payload_cms"."compliance_settings_reward_rules" USING btree ("_order");
  CREATE INDEX "compliance_settings_reward_rules_parent_id_idx" ON "payload_cms"."compliance_settings_reward_rules" USING btree ("_parent_id");
  CREATE INDEX "compliance_settings_reward_rules_state_idx" ON "payload_cms"."compliance_settings_reward_rules" USING btree ("state_id");
  ALTER TABLE "payload_cms"."pages" DROP COLUMN "noindex";`)
}
