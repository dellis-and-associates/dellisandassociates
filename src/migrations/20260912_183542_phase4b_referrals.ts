import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload_cms"."enum_referral_programs_track" AS ENUM('customer', 'partner');
  CREATE TYPE "payload_cms"."enum_referral_programs_reward_type" AS ENUM('gift-card', 'merchandise', 'account-credit', 'none');
  CREATE TYPE "payload_cms"."enum_referral_reward_rules_track" AS ENUM('customer', 'partner');
  CREATE TYPE "payload_cms"."enum_referral_reward_rules_reward_type_allowed" AS ENUM('gift-card', 'merchandise', 'account-credit', 'none');
  CREATE TYPE "payload_cms"."enum_referral_reward_rules_cash_equivalent_allowed" AS ENUM('yes', 'no');
  CREATE TYPE "payload_cms"."enum_referrers_track" AS ENUM('customer', 'partner');
  CREATE TYPE "payload_cms"."enum_referrers_status" AS ENUM('pending-review', 'active', 'suspended');
  CREATE TYPE "payload_cms"."enum_referrers_payout_method" AS ENUM('gift-card-email', 'check-by-mail', 'account-credit', 'none');
  CREATE TYPE "payload_cms"."enum_referrals_source" AS ENUM('link', 'code', 'form', 'portal');
  CREATE TYPE "payload_cms"."enum_referrals_attribution_model" AS ENUM('first-touch');
  CREATE TYPE "payload_cms"."enum_referrals_consent_opt_in_status" AS ENUM('pending', 'accepted', 'declined', 'expired');
  CREATE TYPE "payload_cms"."enum_referrals_status" AS ENUM('submitted', 'contacted', 'qualified', 'quoted', 'bound', 'closed', 'rejected');
  CREATE TYPE "payload_cms"."enum_referrals_rejection_reason" AS ENUM('self-referral', 'duplicate-referee', 'disposable-email', 'velocity-referrer', 'velocity-ip', 'bot-check-failed', 'consent-not-affirmed', 'referee-declined', 'referee-no-response', 'manual');
  CREATE TYPE "payload_cms"."enum_reward_ledger_type" AS ENUM('earned', 'issued', 'reversed');
  CREATE TYPE "payload_cms"."enum_reward_ledger_reverses_type" AS ENUM('earned', 'issued');
  CREATE TYPE "payload_cms"."enum_reward_ledger_reward_type" AS ENUM('gift-card', 'merchandise', 'account-credit', 'none');
  CREATE TYPE "payload_cms"."enum_message_templates_key" AS ENUM('referee-opt-in', 'referrer-welcome');
  CREATE TABLE "payload_cms"."tenants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"referrals_enabled" boolean DEFAULT false NOT NULL,
  	"agency_display_name" varchar,
  	"notify_email" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."referral_programs_terms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"version" varchar NOT NULL,
  	"effective_from" timestamp(3) with time zone NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "payload_cms"."referral_programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"track" "payload_cms"."enum_referral_programs_track" NOT NULL,
  	"active" boolean DEFAULT false NOT NULL,
  	"active_from" timestamp(3) with time zone,
  	"active_to" timestamp(3) with time zone,
  	"qualification_note" varchar,
  	"reward_type" "payload_cms"."enum_referral_programs_reward_type",
  	"reward_amount" numeric,
  	"current_terms_version" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."referral_reward_rules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"tenant_id" integer NOT NULL,
  	"state_abbr" varchar NOT NULL,
  	"track" "payload_cms"."enum_referral_reward_rules_track" NOT NULL,
  	"medicare_rule_set" boolean DEFAULT false NOT NULL,
  	"reward_type_allowed" "payload_cms"."enum_referral_reward_rules_reward_type_allowed",
  	"per_referral_cap" numeric,
  	"per_referrer_annual_cap" numeric,
  	"cash_equivalent_allowed" "payload_cms"."enum_referral_reward_rules_cash_equivalent_allowed",
  	"source_citation" varchar,
  	"verified_by" varchar,
  	"verified_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."referrers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer NOT NULL,
  	"code" varchar,
  	"track" "payload_cms"."enum_referrers_track" NOT NULL,
  	"status" "payload_cms"."enum_referrers_status" DEFAULT 'pending-review' NOT NULL,
  	"user_id" integer,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"email_normalized" varchar,
  	"phone_normalized" varchar,
  	"address_normalized" varchar,
  	"terms_acceptance_program_id" integer,
  	"terms_acceptance_version" varchar,
  	"terms_acceptance_accepted_at" timestamp(3) with time zone,
  	"terms_acceptance_ip_hash" varchar,
  	"payout_method" "payload_cms"."enum_referrers_payout_method",
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."referrals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer NOT NULL,
  	"program_id" integer NOT NULL,
  	"referrer_id" integer NOT NULL,
  	"referee_first_name" varchar NOT NULL,
  	"referee_last_name" varchar,
  	"referee_email" varchar,
  	"referee_phone" varchar,
  	"referee_state_abbr" varchar,
  	"referee_email_normalized" varchar,
  	"referee_phone_normalized" varchar,
  	"medicare_touching" boolean DEFAULT false NOT NULL,
  	"source" "payload_cms"."enum_referrals_source" NOT NULL,
  	"attribution_code" varchar,
  	"attribution_model" "payload_cms"."enum_referrals_attribution_model" DEFAULT 'first-touch',
  	"attribution_first_touch_at" timestamp(3) with time zone,
  	"attribution_landing_page" varchar,
  	"consent_referrer_affirmed_permission" boolean DEFAULT false NOT NULL,
  	"consent_opt_in_messages_sent" numeric DEFAULT 0 NOT NULL,
  	"consent_opt_in_sent_at" timestamp(3) with time zone,
  	"consent_opt_in_status" "payload_cms"."enum_referrals_consent_opt_in_status" DEFAULT 'pending' NOT NULL,
  	"consent_opt_in_responded_at" timestamp(3) with time zone,
  	"consent_opt_in_token" varchar,
  	"status" "payload_cms"."enum_referrals_status" DEFAULT 'submitted' NOT NULL,
  	"rejection_reason" "payload_cms"."enum_referrals_rejection_reason",
  	"duplicate_of_id" integer,
  	"fraud_self_referral" boolean DEFAULT false,
  	"fraud_duplicate_referee" boolean DEFAULT false,
  	"fraud_disposable_email" boolean DEFAULT false,
  	"fraud_velocity" boolean DEFAULT false,
  	"fraud_bot_check_passed" boolean DEFAULT false,
  	"fraud_manual_review" boolean DEFAULT false,
  	"lead_id" integer,
  	"ip_hash" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."referrals_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "payload_cms"."reward_ledger" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer NOT NULL,
  	"referrer_id" integer NOT NULL,
  	"referral_id" integer NOT NULL,
  	"type" "payload_cms"."enum_reward_ledger_type" NOT NULL,
  	"reverses_type" "payload_cms"."enum_reward_ledger_reverses_type",
  	"reward_type" "payload_cms"."enum_reward_ledger_reward_type" NOT NULL,
  	"amount" numeric NOT NULL,
  	"currency" varchar DEFAULT 'USD' NOT NULL,
  	"rule_snapshot" jsonb NOT NULL,
  	"terms_version" varchar NOT NULL,
  	"actor" jsonb NOT NULL,
  	"reason" varchar,
  	"reverses_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."referral_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer NOT NULL,
  	"referral_id" integer,
  	"referrer_id" integer,
  	"type" varchar NOT NULL,
  	"from" varchar,
  	"to" varchar,
  	"actor" jsonb NOT NULL,
  	"ip_hash" varchar,
  	"detail" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."message_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tenant_id" integer NOT NULL,
  	"key" "payload_cms"."enum_message_templates_key" NOT NULL,
  	"version" numeric DEFAULT 1 NOT NULL,
  	"active" boolean DEFAULT true NOT NULL,
  	"subject" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_cms"."users" ADD COLUMN "tenant_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "tenants_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "referral_programs_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "referral_reward_rules_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "referrers_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "referrals_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "reward_ledger_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "referral_events_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "message_templates_id" integer;
  ALTER TABLE "payload_cms"."referral_programs_terms" ADD CONSTRAINT "referral_programs_terms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."referral_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."referral_programs" ADD CONSTRAINT "referral_programs_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "payload_cms"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referral_reward_rules" ADD CONSTRAINT "referral_reward_rules_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "payload_cms"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referrers" ADD CONSTRAINT "referrers_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "payload_cms"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referrers" ADD CONSTRAINT "referrers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "payload_cms"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referrers" ADD CONSTRAINT "referrers_terms_acceptance_program_id_referral_programs_id_fk" FOREIGN KEY ("terms_acceptance_program_id") REFERENCES "payload_cms"."referral_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referrals" ADD CONSTRAINT "referrals_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "payload_cms"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referrals" ADD CONSTRAINT "referrals_program_id_referral_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "payload_cms"."referral_programs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referrals" ADD CONSTRAINT "referrals_referrer_id_referrers_id_fk" FOREIGN KEY ("referrer_id") REFERENCES "payload_cms"."referrers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referrals" ADD CONSTRAINT "referrals_duplicate_of_id_referrals_id_fk" FOREIGN KEY ("duplicate_of_id") REFERENCES "payload_cms"."referrals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referrals" ADD CONSTRAINT "referrals_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "payload_cms"."leads"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referrals_rels" ADD CONSTRAINT "referrals_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_cms"."referrals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."referrals_rels" ADD CONSTRAINT "referrals_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."reward_ledger" ADD CONSTRAINT "reward_ledger_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "payload_cms"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."reward_ledger" ADD CONSTRAINT "reward_ledger_referrer_id_referrers_id_fk" FOREIGN KEY ("referrer_id") REFERENCES "payload_cms"."referrers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."reward_ledger" ADD CONSTRAINT "reward_ledger_referral_id_referrals_id_fk" FOREIGN KEY ("referral_id") REFERENCES "payload_cms"."referrals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."reward_ledger" ADD CONSTRAINT "reward_ledger_reverses_id_reward_ledger_id_fk" FOREIGN KEY ("reverses_id") REFERENCES "payload_cms"."reward_ledger"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referral_events" ADD CONSTRAINT "referral_events_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "payload_cms"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referral_events" ADD CONSTRAINT "referral_events_referral_id_referrals_id_fk" FOREIGN KEY ("referral_id") REFERENCES "payload_cms"."referrals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."referral_events" ADD CONSTRAINT "referral_events_referrer_id_referrers_id_fk" FOREIGN KEY ("referrer_id") REFERENCES "payload_cms"."referrers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."message_templates" ADD CONSTRAINT "message_templates_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "payload_cms"."tenants"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "tenants_slug_idx" ON "payload_cms"."tenants" USING btree ("slug");
  CREATE INDEX "tenants_updated_at_idx" ON "payload_cms"."tenants" USING btree ("updated_at");
  CREATE INDEX "tenants_created_at_idx" ON "payload_cms"."tenants" USING btree ("created_at");
  CREATE INDEX "referral_programs_terms_order_idx" ON "payload_cms"."referral_programs_terms" USING btree ("_order");
  CREATE INDEX "referral_programs_terms_parent_id_idx" ON "payload_cms"."referral_programs_terms" USING btree ("_parent_id");
  CREATE INDEX "referral_programs_tenant_idx" ON "payload_cms"."referral_programs" USING btree ("tenant_id");
  CREATE INDEX "referral_programs_updated_at_idx" ON "payload_cms"."referral_programs" USING btree ("updated_at");
  CREATE INDEX "referral_programs_created_at_idx" ON "payload_cms"."referral_programs" USING btree ("created_at");
  CREATE INDEX "referral_reward_rules_tenant_idx" ON "payload_cms"."referral_reward_rules" USING btree ("tenant_id");
  CREATE INDEX "referral_reward_rules_updated_at_idx" ON "payload_cms"."referral_reward_rules" USING btree ("updated_at");
  CREATE INDEX "referral_reward_rules_created_at_idx" ON "payload_cms"."referral_reward_rules" USING btree ("created_at");
  CREATE INDEX "referrers_tenant_idx" ON "payload_cms"."referrers" USING btree ("tenant_id");
  CREATE INDEX "referrers_code_idx" ON "payload_cms"."referrers" USING btree ("code");
  CREATE INDEX "referrers_status_idx" ON "payload_cms"."referrers" USING btree ("status");
  CREATE INDEX "referrers_user_idx" ON "payload_cms"."referrers" USING btree ("user_id");
  CREATE INDEX "referrers_email_normalized_idx" ON "payload_cms"."referrers" USING btree ("email_normalized");
  CREATE INDEX "referrers_phone_normalized_idx" ON "payload_cms"."referrers" USING btree ("phone_normalized");
  CREATE INDEX "referrers_terms_acceptance_terms_acceptance_program_idx" ON "payload_cms"."referrers" USING btree ("terms_acceptance_program_id");
  CREATE INDEX "referrers_updated_at_idx" ON "payload_cms"."referrers" USING btree ("updated_at");
  CREATE INDEX "referrers_created_at_idx" ON "payload_cms"."referrers" USING btree ("created_at");
  CREATE INDEX "referrals_tenant_idx" ON "payload_cms"."referrals" USING btree ("tenant_id");
  CREATE INDEX "referrals_program_idx" ON "payload_cms"."referrals" USING btree ("program_id");
  CREATE INDEX "referrals_referrer_idx" ON "payload_cms"."referrals" USING btree ("referrer_id");
  CREATE INDEX "referrals_referee_referee_email_normalized_idx" ON "payload_cms"."referrals" USING btree ("referee_email_normalized");
  CREATE INDEX "referrals_referee_referee_phone_normalized_idx" ON "payload_cms"."referrals" USING btree ("referee_phone_normalized");
  CREATE INDEX "referrals_status_idx" ON "payload_cms"."referrals" USING btree ("status");
  CREATE INDEX "referrals_duplicate_of_idx" ON "payload_cms"."referrals" USING btree ("duplicate_of_id");
  CREATE INDEX "referrals_lead_idx" ON "payload_cms"."referrals" USING btree ("lead_id");
  CREATE INDEX "referrals_updated_at_idx" ON "payload_cms"."referrals" USING btree ("updated_at");
  CREATE INDEX "referrals_created_at_idx" ON "payload_cms"."referrals" USING btree ("created_at");
  CREATE INDEX "referrals_rels_order_idx" ON "payload_cms"."referrals_rels" USING btree ("order");
  CREATE INDEX "referrals_rels_parent_idx" ON "payload_cms"."referrals_rels" USING btree ("parent_id");
  CREATE INDEX "referrals_rels_path_idx" ON "payload_cms"."referrals_rels" USING btree ("path");
  CREATE INDEX "referrals_rels_products_id_idx" ON "payload_cms"."referrals_rels" USING btree ("products_id");
  CREATE INDEX "reward_ledger_tenant_idx" ON "payload_cms"."reward_ledger" USING btree ("tenant_id");
  CREATE INDEX "reward_ledger_referrer_idx" ON "payload_cms"."reward_ledger" USING btree ("referrer_id");
  CREATE INDEX "reward_ledger_referral_idx" ON "payload_cms"."reward_ledger" USING btree ("referral_id");
  CREATE INDEX "reward_ledger_reverses_idx" ON "payload_cms"."reward_ledger" USING btree ("reverses_id");
  CREATE INDEX "reward_ledger_updated_at_idx" ON "payload_cms"."reward_ledger" USING btree ("updated_at");
  CREATE INDEX "reward_ledger_created_at_idx" ON "payload_cms"."reward_ledger" USING btree ("created_at");
  CREATE INDEX "referral_events_tenant_idx" ON "payload_cms"."referral_events" USING btree ("tenant_id");
  CREATE INDEX "referral_events_referral_idx" ON "payload_cms"."referral_events" USING btree ("referral_id");
  CREATE INDEX "referral_events_referrer_idx" ON "payload_cms"."referral_events" USING btree ("referrer_id");
  CREATE INDEX "referral_events_type_idx" ON "payload_cms"."referral_events" USING btree ("type");
  CREATE INDEX "referral_events_updated_at_idx" ON "payload_cms"."referral_events" USING btree ("updated_at");
  CREATE INDEX "referral_events_created_at_idx" ON "payload_cms"."referral_events" USING btree ("created_at");
  CREATE INDEX "message_templates_tenant_idx" ON "payload_cms"."message_templates" USING btree ("tenant_id");
  CREATE INDEX "message_templates_key_idx" ON "payload_cms"."message_templates" USING btree ("key");
  CREATE INDEX "message_templates_updated_at_idx" ON "payload_cms"."message_templates" USING btree ("updated_at");
  CREATE INDEX "message_templates_created_at_idx" ON "payload_cms"."message_templates" USING btree ("created_at");
  ALTER TABLE "payload_cms"."users" ADD CONSTRAINT "users_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "payload_cms"."tenants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "payload_cms"."tenants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_referral_programs_fk" FOREIGN KEY ("referral_programs_id") REFERENCES "payload_cms"."referral_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_referral_reward_rules_fk" FOREIGN KEY ("referral_reward_rules_id") REFERENCES "payload_cms"."referral_reward_rules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_referrers_fk" FOREIGN KEY ("referrers_id") REFERENCES "payload_cms"."referrers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_referrals_fk" FOREIGN KEY ("referrals_id") REFERENCES "payload_cms"."referrals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reward_ledger_fk" FOREIGN KEY ("reward_ledger_id") REFERENCES "payload_cms"."reward_ledger"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_referral_events_fk" FOREIGN KEY ("referral_events_id") REFERENCES "payload_cms"."referral_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_message_templates_fk" FOREIGN KEY ("message_templates_id") REFERENCES "payload_cms"."message_templates"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_tenant_idx" ON "payload_cms"."users" USING btree ("tenant_id");
  CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("tenants_id");
  CREATE INDEX "payload_locked_documents_rels_referral_programs_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("referral_programs_id");
  CREATE INDEX "payload_locked_documents_rels_referral_reward_rules_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("referral_reward_rules_id");
  CREATE INDEX "payload_locked_documents_rels_referrers_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("referrers_id");
  CREATE INDEX "payload_locked_documents_rels_referrals_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("referrals_id");
  CREATE INDEX "payload_locked_documents_rels_reward_ledger_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("reward_ledger_id");
  CREATE INDEX "payload_locked_documents_rels_referral_events_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("referral_events_id");
  CREATE INDEX "payload_locked_documents_rels_message_templates_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("message_templates_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_cms"."tenants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."referral_programs_terms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."referral_programs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."referral_reward_rules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."referrers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."referrals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."referrals_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."reward_ledger" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."referral_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."message_templates" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_cms"."tenants" CASCADE;
  DROP TABLE "payload_cms"."referral_programs_terms" CASCADE;
  DROP TABLE "payload_cms"."referral_programs" CASCADE;
  DROP TABLE "payload_cms"."referral_reward_rules" CASCADE;
  DROP TABLE "payload_cms"."referrers" CASCADE;
  DROP TABLE "payload_cms"."referrals" CASCADE;
  DROP TABLE "payload_cms"."referrals_rels" CASCADE;
  DROP TABLE "payload_cms"."reward_ledger" CASCADE;
  DROP TABLE "payload_cms"."referral_events" CASCADE;
  DROP TABLE "payload_cms"."message_templates" CASCADE;
  ALTER TABLE "payload_cms"."users" DROP CONSTRAINT "users_tenant_id_tenants_id_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tenants_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_referral_programs_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_referral_reward_rules_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_referrers_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_referrals_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reward_ledger_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_referral_events_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_message_templates_fk";
  
  DROP INDEX "payload_cms"."users_tenant_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_tenants_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_referral_programs_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_referral_reward_rules_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_referrers_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_referrals_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_reward_ledger_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_referral_events_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_message_templates_id_idx";
  ALTER TABLE "payload_cms"."users" DROP COLUMN "tenant_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "tenants_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "referral_programs_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "referral_reward_rules_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "referrers_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "referrals_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "reward_ledger_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "referral_events_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "message_templates_id";
  DROP TYPE "payload_cms"."enum_referral_programs_track";
  DROP TYPE "payload_cms"."enum_referral_programs_reward_type";
  DROP TYPE "payload_cms"."enum_referral_reward_rules_track";
  DROP TYPE "payload_cms"."enum_referral_reward_rules_reward_type_allowed";
  DROP TYPE "payload_cms"."enum_referral_reward_rules_cash_equivalent_allowed";
  DROP TYPE "payload_cms"."enum_referrers_track";
  DROP TYPE "payload_cms"."enum_referrers_status";
  DROP TYPE "payload_cms"."enum_referrers_payout_method";
  DROP TYPE "payload_cms"."enum_referrals_source";
  DROP TYPE "payload_cms"."enum_referrals_attribution_model";
  DROP TYPE "payload_cms"."enum_referrals_consent_opt_in_status";
  DROP TYPE "payload_cms"."enum_referrals_status";
  DROP TYPE "payload_cms"."enum_referrals_rejection_reason";
  DROP TYPE "payload_cms"."enum_reward_ledger_type";
  DROP TYPE "payload_cms"."enum_reward_ledger_reverses_type";
  DROP TYPE "payload_cms"."enum_reward_ledger_reward_type";
  DROP TYPE "payload_cms"."enum_message_templates_key";`)
}
