import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload_cms"."enum_products_tier" AS ENUM('1', '2');
  CREATE TYPE "payload_cms"."enum_products_category" AS ENUM('Personal', 'Commercial');
  CREATE TYPE "payload_cms"."enum_products_third_subpage" AS ENUM('discounts-faq', 'plans-enrollment-faq');
  CREATE TYPE "payload_cms"."enum_products_review_status" AS ENUM('draft', 'in-review', 'reviewed');
  CREATE TYPE "payload_cms"."enum_products_index_wave" AS ENUM('1', '2', '3');
  CREATE TYPE "payload_cms"."enum_cities_city_facts_local_hazards" AS ENUM('monsoon-dust', 'extreme-heat', 'wildfire-wui', 'hail', 'freeze', 'flood-plain', 'flash-flood', 'earthquake', 'wind', 'snow-load', 'mountain-driving', 'wildlife-collision', 'urban-theft');
  CREATE TYPE "payload_cms"."enum_cities_size_band" AS ENUM('large', 'mid', 'small');
  CREATE TYPE "payload_cms"."enum_articles_section" AS ENUM('guides', 'state-requirements', 'compare', 'how-to', 'life-events', 'seasonal');
  CREATE TYPE "payload_cms"."enum_articles_review_status" AS ENUM('draft', 'in-review', 'reviewed');
  CREATE TYPE "payload_cms"."enum_articles_index_wave" AS ENUM('1', '2', '3');
  CREATE TYPE "payload_cms"."enum_articles_generation_status" AS ENUM('pending', 'drafted', 'failed');
  CREATE TYPE "payload_cms"."enum_glossary_terms_review_status" AS ENUM('draft', 'in-review', 'reviewed');
  CREATE TYPE "payload_cms"."enum_glossary_terms_index_wave" AS ENUM('1', '2', '3');
  CREATE TYPE "payload_cms"."enum_glossary_terms_generation_status" AS ENUM('pending', 'drafted', 'failed');
  CREATE TYPE "payload_cms"."enum_pages_blocks_disclosure_key" AS ENUM('independentAgency', 'medicareTpmo', 'stateLicensing');
  CREATE TYPE "payload_cms"."enum_pages_template" AS ENUM('home', 'static', 'quote-hub', 'claims-hub', 'products-hub', 'locations-hub', 'carriers-hub', 'team-hub', 'blog-hub', 'legal-static');
  CREATE TYPE "payload_cms"."enum_pages_review_status" AS ENUM('draft', 'in-review', 'reviewed');
  CREATE TYPE "payload_cms"."enum_pages_index_wave" AS ENUM('1', '2', '3');
  CREATE TYPE "payload_cms"."enum_redirects_status_code" AS ENUM('301', '410');
  CREATE TYPE "payload_cms"."enum_redirects_source" AS ENUM('legacy-crawl', 'slug-change', 'manual');
  CREATE TYPE "payload_cms"."enum_forms_fields_type" AS ENUM('text', 'email', 'tel', 'date', 'textarea', 'select', 'checkbox', 'checkbox-group', 'address', 'hidden');
  CREATE TYPE "payload_cms"."enum_forms_lead_type" AS ENUM('contact', 'intake', 'medication', 'quote', 'referral');
  CREATE TYPE "payload_cms"."enum_leads_type" AS ENUM('contact', 'intake', 'medication', 'quote', 'referral');
  CREATE TYPE "payload_cms"."enum_leads_status" AS ENUM('new', 'contacted', 'qualified', 'quoted', 'bound', 'closed', 'rejected');
  CREATE TYPE "payload_cms"."enum_compliance_settings_reward_rules_track" AS ENUM('customer', 'partner');
  CREATE TYPE "payload_cms"."enum_compliance_settings_reward_rules_reward_type_allowed" AS ENUM('gift-card', 'merchandise', 'account-credit', 'none');
  CREATE TYPE "payload_cms"."enum_compliance_settings_reward_rules_cash_equivalent_allowed" AS ENUM('yes', 'no');
  CREATE TABLE "payload_cms"."products_coverage_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_cms"."products_covered" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "payload_cms"."products_not_covered" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "payload_cms"."products_discounts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "payload_cms"."products_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_cms"."products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"tier" "payload_cms"."enum_products_tier" NOT NULL,
  	"category" "payload_cms"."enum_products_category" NOT NULL,
  	"third_subpage" "payload_cms"."enum_products_third_subpage" DEFAULT 'discounts-faq' NOT NULL,
  	"parent_id" integer,
  	"medicare_touching" boolean DEFAULT false,
  	"summary" varchar,
  	"intro" jsonb,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"review_status" "payload_cms"."enum_products_review_status" DEFAULT 'draft' NOT NULL,
  	"index_wave" "payload_cms"."enum_products_index_wave" DEFAULT '3' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "payload_cms"."states_statutory_minimums" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer NOT NULL,
  	"coverage" varchar NOT NULL,
  	"requirement" varchar NOT NULL,
  	"source_url" varchar NOT NULL,
  	"verified_at" timestamp(3) with time zone,
  	"note" varchar
  );
  
  CREATE TABLE "payload_cms"."states" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"abbr" varchar NOT NULL,
  	"license_number" varchar,
  	"doi_name" varchar,
  	"doi_url" varchar,
  	"risk_notes" jsonb,
  	"notable_regulatory" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."cities_city_facts_local_hazards" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "payload_cms"."enum_cities_city_facts_local_hazards",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_cms"."cities_city_facts_neighborhoods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "payload_cms"."cities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"state_id" integer NOT NULL,
  	"size_band" "payload_cms"."enum_cities_size_band" DEFAULT 'mid' NOT NULL,
  	"city_facts_county" varchar,
  	"city_facts_nearest_office_or_agent" varchar,
  	"city_facts_housing_stock" varchar,
  	"city_facts_driving_context" varchar,
  	"city_facts_notable_regulatory" varchar,
  	"intro" jsonb,
  	"facts_complete" numeric,
  	"facts_missing" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."location_overrides_custom_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_cms"."location_overrides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"product_id" integer NOT NULL,
  	"city_id" integer NOT NULL,
  	"intro" jsonb,
  	"testimonial_quote" varchar,
  	"testimonial_attribution" varchar,
  	"testimonial_consent_on_file" boolean DEFAULT false,
  	"testimonial_consent_document_id" integer,
  	"assigned_agent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"section" "payload_cms"."enum_articles_section" NOT NULL,
  	"excerpt" varchar,
  	"body" jsonb,
  	"word_count" numeric,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"review_status" "payload_cms"."enum_articles_review_status" DEFAULT 'draft' NOT NULL,
  	"index_wave" "payload_cms"."enum_articles_index_wave" DEFAULT '3' NOT NULL,
  	"generation_status" "payload_cms"."enum_articles_generation_status" DEFAULT 'pending' NOT NULL,
  	"generation_generated_at" timestamp(3) with time zone,
  	"generation_batch" varchar,
  	"generation_error" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"articles_id" integer,
  	"states_id" integer,
  	"glossary_terms_id" integer
  );
  
  CREATE TABLE "payload_cms"."glossary_terms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"term" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"definition" jsonb,
  	"in_practice" jsonb,
  	"example" jsonb,
  	"word_count" numeric,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"review_status" "payload_cms"."enum_glossary_terms_review_status" DEFAULT 'draft' NOT NULL,
  	"index_wave" "payload_cms"."enum_glossary_terms_index_wave" DEFAULT '3' NOT NULL,
  	"generation_status" "payload_cms"."enum_glossary_terms_generation_status" DEFAULT 'pending' NOT NULL,
  	"generation_generated_at" timestamp(3) with time zone,
  	"generation_batch" varchar,
  	"generation_error" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."glossary_terms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"glossary_terms_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "payload_cms"."pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload_cms"."pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_cms"."pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload_cms"."pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" varchar,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload_cms"."pages_blocks_disclosure" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" "payload_cms"."enum_pages_blocks_disclosure_key" NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload_cms"."pages_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "payload_cms"."pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"template" "payload_cms"."enum_pages_template" DEFAULT 'static' NOT NULL,
  	"legal_state_id" integer,
  	"lede" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"review_status" "payload_cms"."enum_pages_review_status" DEFAULT 'draft' NOT NULL,
  	"index_wave" "payload_cms"."enum_pages_index_wave" DEFAULT '3' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."agents_licenses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"state_id" integer NOT NULL,
  	"license_number" varchar NOT NULL,
  	"npn" varchar
  );
  
  CREATE TABLE "payload_cms"."agents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"active" boolean DEFAULT false,
  	"user_id" integer,
  	"title" varchar,
  	"bio" jsonb,
  	"photo_image_id" integer,
  	"photo_release_on_file" boolean DEFAULT false,
  	"email" varchar,
  	"phone" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."agents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"cities_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "payload_cms"."carriers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"active" boolean DEFAULT false,
  	"appointment_confirmed_at" timestamp(3) with time zone NOT NULL,
  	"logo_id" integer,
  	"website" varchar,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."carriers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer,
  	"states_id" integer
  );
  
  CREATE TABLE "payload_cms"."redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar,
  	"status_code" "payload_cms"."enum_redirects_status_code" DEFAULT '301' NOT NULL,
  	"source" "payload_cms"."enum_redirects_source" DEFAULT 'manual' NOT NULL,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."forms_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "payload_cms"."forms_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "payload_cms"."enum_forms_fields_type" NOT NULL,
  	"required" boolean DEFAULT false,
  	"autocomplete" varchar,
  	"inputmode" varchar,
  	"pii" boolean DEFAULT false,
  	"placeholder" varchar,
  	"help" varchar,
  	"options_from_products" boolean DEFAULT false
  );
  
  CREATE TABLE "payload_cms"."forms_notify_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "payload_cms"."forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"lead_type" "payload_cms"."enum_forms_lead_type" NOT NULL,
  	"collects_health_information" boolean DEFAULT false,
  	"submit_label" varchar DEFAULT 'Send' NOT NULL,
  	"confirmation" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"reference" varchar,
  	"form_id" integer,
  	"type" "payload_cms"."enum_leads_type" NOT NULL,
  	"status" "payload_cms"."enum_leads_status" DEFAULT 'new' NOT NULL,
  	"contact_name" varchar,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"assigned_agent_id" integer,
  	"contains_health_information" boolean DEFAULT false,
  	"data" jsonb,
  	"source_page" varchar,
  	"source_referral_code" varchar,
  	"source_utm" jsonb,
  	"source_ip_hash" varchar,
  	"source_user_agent" varchar,
  	"notes" varchar,
  	"retain_until" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."leads_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "payload_cms"."site_settings_nav_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "payload_cms"."site_settings_nav_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "payload_cms"."site_settings_nav_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "payload_cms"."site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'Desert Peak Insurance' NOT NULL,
  	"legal_name" varchar DEFAULT '{{TODO:site.legalName}}',
  	"phone" varchar,
  	"phone_href" varchar,
  	"email" varchar,
  	"address_street" varchar,
  	"address_city" varchar,
  	"address_state_id" integer,
  	"address_zip" varchar,
  	"office_hours" varchar,
  	"social_facebook" varchar,
  	"social_instagram" varchar,
  	"social_linkedin" varchar,
  	"social_google" varchar,
  	"default_seo_title_suffix" varchar DEFAULT ' — Desert Peak Insurance',
  	"default_seo_description" varchar,
  	"default_seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_cms"."compliance_settings_banned_phrases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"phrase" varchar NOT NULL
  );
  
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
  
  CREATE TABLE "payload_cms"."compliance_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"independent_agency_disclosure" varchar DEFAULT 'Desert Peak Insurance is an independent agency, not an insurer. No coverage is bound by this website.' NOT NULL,
  	"medicare_in_scope" boolean DEFAULT true,
  	"medicare_tpmo_disclaimer" varchar DEFAULT '{{TODO:compliance.medicareTpmoDisclaimer}}',
  	"medicare_plan_year" varchar,
  	"state_licensing_disclosure" varchar DEFAULT 'Desert Peak Insurance is licensed in {{state}}, license number {{licenseNumber}}.',
  	"licensed_states_note" varchar,
  	"lead_retention_days" numeric DEFAULT 730 NOT NULL,
  	"health_lead_retention_days" numeric DEFAULT 365 NOT NULL,
  	"referral_program_enabled" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_cms"."users" ADD COLUMN "name" varchar;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "states_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "cities_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "location_overrides_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "articles_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "glossary_terms_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "agents_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "carriers_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "redirects_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "forms_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "leads_id" integer;
  ALTER TABLE "payload_cms"."products_coverage_blocks" ADD CONSTRAINT "products_coverage_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."products_covered" ADD CONSTRAINT "products_covered_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."products_not_covered" ADD CONSTRAINT "products_not_covered_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."products_discounts" ADD CONSTRAINT "products_discounts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."products_faqs" ADD CONSTRAINT "products_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."products" ADD CONSTRAINT "products_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_cms"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."products" ADD CONSTRAINT "products_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload_cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."states_statutory_minimums" ADD CONSTRAINT "states_statutory_minimums_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "payload_cms"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."states_statutory_minimums" ADD CONSTRAINT "states_statutory_minimums_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."states"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."cities_city_facts_local_hazards" ADD CONSTRAINT "cities_city_facts_local_hazards_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_cms"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."cities_city_facts_neighborhoods" ADD CONSTRAINT "cities_city_facts_neighborhoods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."cities" ADD CONSTRAINT "cities_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "payload_cms"."states"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."location_overrides_custom_faqs" ADD CONSTRAINT "location_overrides_custom_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."location_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."location_overrides" ADD CONSTRAINT "location_overrides_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "payload_cms"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."location_overrides" ADD CONSTRAINT "location_overrides_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "payload_cms"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."location_overrides" ADD CONSTRAINT "location_overrides_testimonial_consent_document_id_media_id_fk" FOREIGN KEY ("testimonial_consent_document_id") REFERENCES "payload_cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."location_overrides" ADD CONSTRAINT "location_overrides_assigned_agent_id_agents_id_fk" FOREIGN KEY ("assigned_agent_id") REFERENCES "payload_cms"."agents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."articles" ADD CONSTRAINT "articles_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload_cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_cms"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."articles_rels" ADD CONSTRAINT "articles_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."articles_rels" ADD CONSTRAINT "articles_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "payload_cms"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."articles_rels" ADD CONSTRAINT "articles_rels_states_fk" FOREIGN KEY ("states_id") REFERENCES "payload_cms"."states"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."articles_rels" ADD CONSTRAINT "articles_rels_glossary_terms_fk" FOREIGN KEY ("glossary_terms_id") REFERENCES "payload_cms"."glossary_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."glossary_terms" ADD CONSTRAINT "glossary_terms_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload_cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."glossary_terms_rels" ADD CONSTRAINT "glossary_terms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_cms"."glossary_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."glossary_terms_rels" ADD CONSTRAINT "glossary_terms_rels_glossary_terms_fk" FOREIGN KEY ("glossary_terms_id") REFERENCES "payload_cms"."glossary_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."glossary_terms_rels" ADD CONSTRAINT "glossary_terms_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."pages_blocks_disclosure" ADD CONSTRAINT "pages_blocks_disclosure_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "payload_cms"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."pages" ADD CONSTRAINT "pages_legal_state_id_states_id_fk" FOREIGN KEY ("legal_state_id") REFERENCES "payload_cms"."states"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "payload_cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."agents_licenses" ADD CONSTRAINT "agents_licenses_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "payload_cms"."states"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."agents_licenses" ADD CONSTRAINT "agents_licenses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."agents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."agents" ADD CONSTRAINT "agents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "payload_cms"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."agents" ADD CONSTRAINT "agents_photo_image_id_media_id_fk" FOREIGN KEY ("photo_image_id") REFERENCES "payload_cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."agents_rels" ADD CONSTRAINT "agents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_cms"."agents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."agents_rels" ADD CONSTRAINT "agents_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "payload_cms"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."agents_rels" ADD CONSTRAINT "agents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."carriers" ADD CONSTRAINT "carriers_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "payload_cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."carriers_rels" ADD CONSTRAINT "carriers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_cms"."carriers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."carriers_rels" ADD CONSTRAINT "carriers_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."carriers_rels" ADD CONSTRAINT "carriers_rels_states_fk" FOREIGN KEY ("states_id") REFERENCES "payload_cms"."states"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."forms_fields_options" ADD CONSTRAINT "forms_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."forms_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."forms_fields" ADD CONSTRAINT "forms_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."forms_notify_emails" ADD CONSTRAINT "forms_notify_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."leads" ADD CONSTRAINT "leads_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "payload_cms"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."leads" ADD CONSTRAINT "leads_assigned_agent_id_agents_id_fk" FOREIGN KEY ("assigned_agent_id") REFERENCES "payload_cms"."agents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."leads_rels" ADD CONSTRAINT "leads_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_cms"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."leads_rels" ADD CONSTRAINT "leads_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."site_settings_nav_header" ADD CONSTRAINT "site_settings_nav_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."site_settings_nav_footer_links" ADD CONSTRAINT "site_settings_nav_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."site_settings_nav_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."site_settings_nav_footer" ADD CONSTRAINT "site_settings_nav_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."site_settings" ADD CONSTRAINT "site_settings_address_state_id_states_id_fk" FOREIGN KEY ("address_state_id") REFERENCES "payload_cms"."states"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."site_settings" ADD CONSTRAINT "site_settings_default_seo_image_id_media_id_fk" FOREIGN KEY ("default_seo_image_id") REFERENCES "payload_cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."compliance_settings_banned_phrases" ADD CONSTRAINT "compliance_settings_banned_phrases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."compliance_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."compliance_settings_reward_rules" ADD CONSTRAINT "compliance_settings_reward_rules_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "payload_cms"."states"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_cms"."compliance_settings_reward_rules" ADD CONSTRAINT "compliance_settings_reward_rules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "payload_cms"."compliance_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_coverage_blocks_order_idx" ON "payload_cms"."products_coverage_blocks" USING btree ("_order");
  CREATE INDEX "products_coverage_blocks_parent_id_idx" ON "payload_cms"."products_coverage_blocks" USING btree ("_parent_id");
  CREATE INDEX "products_covered_order_idx" ON "payload_cms"."products_covered" USING btree ("_order");
  CREATE INDEX "products_covered_parent_id_idx" ON "payload_cms"."products_covered" USING btree ("_parent_id");
  CREATE INDEX "products_not_covered_order_idx" ON "payload_cms"."products_not_covered" USING btree ("_order");
  CREATE INDEX "products_not_covered_parent_id_idx" ON "payload_cms"."products_not_covered" USING btree ("_parent_id");
  CREATE INDEX "products_discounts_order_idx" ON "payload_cms"."products_discounts" USING btree ("_order");
  CREATE INDEX "products_discounts_parent_id_idx" ON "payload_cms"."products_discounts" USING btree ("_parent_id");
  CREATE INDEX "products_faqs_order_idx" ON "payload_cms"."products_faqs" USING btree ("_order");
  CREATE INDEX "products_faqs_parent_id_idx" ON "payload_cms"."products_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "payload_cms"."products" USING btree ("slug");
  CREATE INDEX "products_parent_idx" ON "payload_cms"."products" USING btree ("parent_id");
  CREATE INDEX "products_seo_seo_image_idx" ON "payload_cms"."products" USING btree ("seo_image_id");
  CREATE INDEX "products_review_status_idx" ON "payload_cms"."products" USING btree ("review_status");
  CREATE INDEX "products_index_wave_idx" ON "payload_cms"."products" USING btree ("index_wave");
  CREATE INDEX "products_updated_at_idx" ON "payload_cms"."products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "payload_cms"."products" USING btree ("created_at");
  CREATE INDEX "products_rels_order_idx" ON "payload_cms"."products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "payload_cms"."products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "payload_cms"."products_rels" USING btree ("path");
  CREATE INDEX "products_rels_products_id_idx" ON "payload_cms"."products_rels" USING btree ("products_id");
  CREATE INDEX "states_statutory_minimums_order_idx" ON "payload_cms"."states_statutory_minimums" USING btree ("_order");
  CREATE INDEX "states_statutory_minimums_parent_id_idx" ON "payload_cms"."states_statutory_minimums" USING btree ("_parent_id");
  CREATE INDEX "states_statutory_minimums_product_idx" ON "payload_cms"."states_statutory_minimums" USING btree ("product_id");
  CREATE UNIQUE INDEX "states_slug_idx" ON "payload_cms"."states" USING btree ("slug");
  CREATE UNIQUE INDEX "states_abbr_idx" ON "payload_cms"."states" USING btree ("abbr");
  CREATE INDEX "states_updated_at_idx" ON "payload_cms"."states" USING btree ("updated_at");
  CREATE INDEX "states_created_at_idx" ON "payload_cms"."states" USING btree ("created_at");
  CREATE INDEX "cities_city_facts_local_hazards_order_idx" ON "payload_cms"."cities_city_facts_local_hazards" USING btree ("order");
  CREATE INDEX "cities_city_facts_local_hazards_parent_idx" ON "payload_cms"."cities_city_facts_local_hazards" USING btree ("parent_id");
  CREATE INDEX "cities_city_facts_neighborhoods_order_idx" ON "payload_cms"."cities_city_facts_neighborhoods" USING btree ("_order");
  CREATE INDEX "cities_city_facts_neighborhoods_parent_id_idx" ON "payload_cms"."cities_city_facts_neighborhoods" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "cities_slug_idx" ON "payload_cms"."cities" USING btree ("slug");
  CREATE INDEX "cities_state_idx" ON "payload_cms"."cities" USING btree ("state_id");
  CREATE INDEX "cities_facts_complete_idx" ON "payload_cms"."cities" USING btree ("facts_complete");
  CREATE INDEX "cities_updated_at_idx" ON "payload_cms"."cities" USING btree ("updated_at");
  CREATE INDEX "cities_created_at_idx" ON "payload_cms"."cities" USING btree ("created_at");
  CREATE INDEX "location_overrides_custom_faqs_order_idx" ON "payload_cms"."location_overrides_custom_faqs" USING btree ("_order");
  CREATE INDEX "location_overrides_custom_faqs_parent_id_idx" ON "payload_cms"."location_overrides_custom_faqs" USING btree ("_parent_id");
  CREATE INDEX "location_overrides_product_idx" ON "payload_cms"."location_overrides" USING btree ("product_id");
  CREATE INDEX "location_overrides_city_idx" ON "payload_cms"."location_overrides" USING btree ("city_id");
  CREATE INDEX "location_overrides_testimonial_testimonial_consent_docum_idx" ON "payload_cms"."location_overrides" USING btree ("testimonial_consent_document_id");
  CREATE INDEX "location_overrides_assigned_agent_idx" ON "payload_cms"."location_overrides" USING btree ("assigned_agent_id");
  CREATE INDEX "location_overrides_updated_at_idx" ON "payload_cms"."location_overrides" USING btree ("updated_at");
  CREATE INDEX "location_overrides_created_at_idx" ON "payload_cms"."location_overrides" USING btree ("created_at");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "payload_cms"."articles" USING btree ("slug");
  CREATE INDEX "articles_section_idx" ON "payload_cms"."articles" USING btree ("section");
  CREATE INDEX "articles_seo_seo_image_idx" ON "payload_cms"."articles" USING btree ("seo_image_id");
  CREATE INDEX "articles_review_status_idx" ON "payload_cms"."articles" USING btree ("review_status");
  CREATE INDEX "articles_index_wave_idx" ON "payload_cms"."articles" USING btree ("index_wave");
  CREATE INDEX "articles_generation_generation_status_idx" ON "payload_cms"."articles" USING btree ("generation_status");
  CREATE INDEX "articles_updated_at_idx" ON "payload_cms"."articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "payload_cms"."articles" USING btree ("created_at");
  CREATE INDEX "articles_rels_order_idx" ON "payload_cms"."articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "payload_cms"."articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "payload_cms"."articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_products_id_idx" ON "payload_cms"."articles_rels" USING btree ("products_id");
  CREATE INDEX "articles_rels_articles_id_idx" ON "payload_cms"."articles_rels" USING btree ("articles_id");
  CREATE INDEX "articles_rels_states_id_idx" ON "payload_cms"."articles_rels" USING btree ("states_id");
  CREATE INDEX "articles_rels_glossary_terms_id_idx" ON "payload_cms"."articles_rels" USING btree ("glossary_terms_id");
  CREATE UNIQUE INDEX "glossary_terms_slug_idx" ON "payload_cms"."glossary_terms" USING btree ("slug");
  CREATE INDEX "glossary_terms_seo_seo_image_idx" ON "payload_cms"."glossary_terms" USING btree ("seo_image_id");
  CREATE INDEX "glossary_terms_review_status_idx" ON "payload_cms"."glossary_terms" USING btree ("review_status");
  CREATE INDEX "glossary_terms_index_wave_idx" ON "payload_cms"."glossary_terms" USING btree ("index_wave");
  CREATE INDEX "glossary_terms_generation_generation_status_idx" ON "payload_cms"."glossary_terms" USING btree ("generation_status");
  CREATE INDEX "glossary_terms_updated_at_idx" ON "payload_cms"."glossary_terms" USING btree ("updated_at");
  CREATE INDEX "glossary_terms_created_at_idx" ON "payload_cms"."glossary_terms" USING btree ("created_at");
  CREATE INDEX "glossary_terms_rels_order_idx" ON "payload_cms"."glossary_terms_rels" USING btree ("order");
  CREATE INDEX "glossary_terms_rels_parent_idx" ON "payload_cms"."glossary_terms_rels" USING btree ("parent_id");
  CREATE INDEX "glossary_terms_rels_path_idx" ON "payload_cms"."glossary_terms_rels" USING btree ("path");
  CREATE INDEX "glossary_terms_rels_glossary_terms_id_idx" ON "payload_cms"."glossary_terms_rels" USING btree ("glossary_terms_id");
  CREATE INDEX "glossary_terms_rels_products_id_idx" ON "payload_cms"."glossary_terms_rels" USING btree ("products_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "payload_cms"."pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "payload_cms"."pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "payload_cms"."pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "payload_cms"."pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "payload_cms"."pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "payload_cms"."pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "payload_cms"."pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "payload_cms"."pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "payload_cms"."pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "payload_cms"."pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "payload_cms"."pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_disclosure_order_idx" ON "payload_cms"."pages_blocks_disclosure" USING btree ("_order");
  CREATE INDEX "pages_blocks_disclosure_parent_id_idx" ON "payload_cms"."pages_blocks_disclosure" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_disclosure_path_idx" ON "payload_cms"."pages_blocks_disclosure" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_order_idx" ON "payload_cms"."pages_blocks_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_parent_id_idx" ON "payload_cms"."pages_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_path_idx" ON "payload_cms"."pages_blocks_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_form_idx" ON "payload_cms"."pages_blocks_form" USING btree ("form_id");
  CREATE UNIQUE INDEX "pages_path_idx" ON "payload_cms"."pages" USING btree ("path");
  CREATE INDEX "pages_legal_state_idx" ON "payload_cms"."pages" USING btree ("legal_state_id");
  CREATE INDEX "pages_seo_seo_image_idx" ON "payload_cms"."pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_review_status_idx" ON "payload_cms"."pages" USING btree ("review_status");
  CREATE INDEX "pages_index_wave_idx" ON "payload_cms"."pages" USING btree ("index_wave");
  CREATE INDEX "pages_updated_at_idx" ON "payload_cms"."pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "payload_cms"."pages" USING btree ("created_at");
  CREATE INDEX "agents_licenses_order_idx" ON "payload_cms"."agents_licenses" USING btree ("_order");
  CREATE INDEX "agents_licenses_parent_id_idx" ON "payload_cms"."agents_licenses" USING btree ("_parent_id");
  CREATE INDEX "agents_licenses_state_idx" ON "payload_cms"."agents_licenses" USING btree ("state_id");
  CREATE UNIQUE INDEX "agents_slug_idx" ON "payload_cms"."agents" USING btree ("slug");
  CREATE UNIQUE INDEX "agents_user_idx" ON "payload_cms"."agents" USING btree ("user_id");
  CREATE INDEX "agents_photo_photo_image_idx" ON "payload_cms"."agents" USING btree ("photo_image_id");
  CREATE INDEX "agents_updated_at_idx" ON "payload_cms"."agents" USING btree ("updated_at");
  CREATE INDEX "agents_created_at_idx" ON "payload_cms"."agents" USING btree ("created_at");
  CREATE INDEX "agents_rels_order_idx" ON "payload_cms"."agents_rels" USING btree ("order");
  CREATE INDEX "agents_rels_parent_idx" ON "payload_cms"."agents_rels" USING btree ("parent_id");
  CREATE INDEX "agents_rels_path_idx" ON "payload_cms"."agents_rels" USING btree ("path");
  CREATE INDEX "agents_rels_cities_id_idx" ON "payload_cms"."agents_rels" USING btree ("cities_id");
  CREATE INDEX "agents_rels_products_id_idx" ON "payload_cms"."agents_rels" USING btree ("products_id");
  CREATE UNIQUE INDEX "carriers_slug_idx" ON "payload_cms"."carriers" USING btree ("slug");
  CREATE INDEX "carriers_logo_idx" ON "payload_cms"."carriers" USING btree ("logo_id");
  CREATE INDEX "carriers_updated_at_idx" ON "payload_cms"."carriers" USING btree ("updated_at");
  CREATE INDEX "carriers_created_at_idx" ON "payload_cms"."carriers" USING btree ("created_at");
  CREATE INDEX "carriers_rels_order_idx" ON "payload_cms"."carriers_rels" USING btree ("order");
  CREATE INDEX "carriers_rels_parent_idx" ON "payload_cms"."carriers_rels" USING btree ("parent_id");
  CREATE INDEX "carriers_rels_path_idx" ON "payload_cms"."carriers_rels" USING btree ("path");
  CREATE INDEX "carriers_rels_products_id_idx" ON "payload_cms"."carriers_rels" USING btree ("products_id");
  CREATE INDEX "carriers_rels_states_id_idx" ON "payload_cms"."carriers_rels" USING btree ("states_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "payload_cms"."redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "payload_cms"."redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "payload_cms"."redirects" USING btree ("created_at");
  CREATE INDEX "forms_fields_options_order_idx" ON "payload_cms"."forms_fields_options" USING btree ("_order");
  CREATE INDEX "forms_fields_options_parent_id_idx" ON "payload_cms"."forms_fields_options" USING btree ("_parent_id");
  CREATE INDEX "forms_fields_order_idx" ON "payload_cms"."forms_fields" USING btree ("_order");
  CREATE INDEX "forms_fields_parent_id_idx" ON "payload_cms"."forms_fields" USING btree ("_parent_id");
  CREATE INDEX "forms_notify_emails_order_idx" ON "payload_cms"."forms_notify_emails" USING btree ("_order");
  CREATE INDEX "forms_notify_emails_parent_id_idx" ON "payload_cms"."forms_notify_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_slug_idx" ON "payload_cms"."forms" USING btree ("slug");
  CREATE INDEX "forms_updated_at_idx" ON "payload_cms"."forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "payload_cms"."forms" USING btree ("created_at");
  CREATE UNIQUE INDEX "leads_reference_idx" ON "payload_cms"."leads" USING btree ("reference");
  CREATE INDEX "leads_form_idx" ON "payload_cms"."leads" USING btree ("form_id");
  CREATE INDEX "leads_type_idx" ON "payload_cms"."leads" USING btree ("type");
  CREATE INDEX "leads_status_idx" ON "payload_cms"."leads" USING btree ("status");
  CREATE INDEX "leads_contact_contact_email_idx" ON "payload_cms"."leads" USING btree ("contact_email");
  CREATE INDEX "leads_contact_contact_phone_idx" ON "payload_cms"."leads" USING btree ("contact_phone");
  CREATE INDEX "leads_assigned_agent_idx" ON "payload_cms"."leads" USING btree ("assigned_agent_id");
  CREATE INDEX "leads_source_source_referral_code_idx" ON "payload_cms"."leads" USING btree ("source_referral_code");
  CREATE INDEX "leads_retain_until_idx" ON "payload_cms"."leads" USING btree ("retain_until");
  CREATE INDEX "leads_updated_at_idx" ON "payload_cms"."leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "payload_cms"."leads" USING btree ("created_at");
  CREATE INDEX "leads_rels_order_idx" ON "payload_cms"."leads_rels" USING btree ("order");
  CREATE INDEX "leads_rels_parent_idx" ON "payload_cms"."leads_rels" USING btree ("parent_id");
  CREATE INDEX "leads_rels_path_idx" ON "payload_cms"."leads_rels" USING btree ("path");
  CREATE INDEX "leads_rels_products_id_idx" ON "payload_cms"."leads_rels" USING btree ("products_id");
  CREATE INDEX "site_settings_nav_header_order_idx" ON "payload_cms"."site_settings_nav_header" USING btree ("_order");
  CREATE INDEX "site_settings_nav_header_parent_id_idx" ON "payload_cms"."site_settings_nav_header" USING btree ("_parent_id");
  CREATE INDEX "site_settings_nav_footer_links_order_idx" ON "payload_cms"."site_settings_nav_footer_links" USING btree ("_order");
  CREATE INDEX "site_settings_nav_footer_links_parent_id_idx" ON "payload_cms"."site_settings_nav_footer_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_nav_footer_order_idx" ON "payload_cms"."site_settings_nav_footer" USING btree ("_order");
  CREATE INDEX "site_settings_nav_footer_parent_id_idx" ON "payload_cms"."site_settings_nav_footer" USING btree ("_parent_id");
  CREATE INDEX "site_settings_address_address_state_idx" ON "payload_cms"."site_settings" USING btree ("address_state_id");
  CREATE INDEX "site_settings_default_seo_default_seo_image_idx" ON "payload_cms"."site_settings" USING btree ("default_seo_image_id");
  CREATE INDEX "compliance_settings_banned_phrases_order_idx" ON "payload_cms"."compliance_settings_banned_phrases" USING btree ("_order");
  CREATE INDEX "compliance_settings_banned_phrases_parent_id_idx" ON "payload_cms"."compliance_settings_banned_phrases" USING btree ("_parent_id");
  CREATE INDEX "compliance_settings_reward_rules_order_idx" ON "payload_cms"."compliance_settings_reward_rules" USING btree ("_order");
  CREATE INDEX "compliance_settings_reward_rules_parent_id_idx" ON "payload_cms"."compliance_settings_reward_rules" USING btree ("_parent_id");
  CREATE INDEX "compliance_settings_reward_rules_state_idx" ON "payload_cms"."compliance_settings_reward_rules" USING btree ("state_id");
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "payload_cms"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_states_fk" FOREIGN KEY ("states_id") REFERENCES "payload_cms"."states"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "payload_cms"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_location_overrides_fk" FOREIGN KEY ("location_overrides_id") REFERENCES "payload_cms"."location_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "payload_cms"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_glossary_terms_fk" FOREIGN KEY ("glossary_terms_id") REFERENCES "payload_cms"."glossary_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "payload_cms"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_agents_fk" FOREIGN KEY ("agents_id") REFERENCES "payload_cms"."agents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_carriers_fk" FOREIGN KEY ("carriers_id") REFERENCES "payload_cms"."carriers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "payload_cms"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "payload_cms"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "payload_cms"."leads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_states_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("states_id");
  CREATE INDEX "payload_locked_documents_rels_cities_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("cities_id");
  CREATE INDEX "payload_locked_documents_rels_location_overrides_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("location_overrides_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_glossary_terms_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("glossary_terms_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_agents_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("agents_id");
  CREATE INDEX "payload_locked_documents_rels_carriers_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("carriers_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("leads_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_cms"."products_coverage_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."products_covered" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."products_not_covered" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."products_discounts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."products_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."products_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."states_statutory_minimums" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."states" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."cities_city_facts_local_hazards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."cities_city_facts_neighborhoods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."cities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."location_overrides_custom_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."location_overrides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."articles_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."glossary_terms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."glossary_terms_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."pages_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."pages_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."pages_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."pages_blocks_disclosure" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."pages_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."agents_licenses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."agents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."agents_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."carriers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."carriers_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."redirects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."forms_fields_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."forms_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."forms_notify_emails" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."forms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."leads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."leads_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."site_settings_nav_header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."site_settings_nav_footer_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."site_settings_nav_footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."compliance_settings_banned_phrases" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."compliance_settings_reward_rules" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."compliance_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_cms"."products_coverage_blocks" CASCADE;
  DROP TABLE "payload_cms"."products_covered" CASCADE;
  DROP TABLE "payload_cms"."products_not_covered" CASCADE;
  DROP TABLE "payload_cms"."products_discounts" CASCADE;
  DROP TABLE "payload_cms"."products_faqs" CASCADE;
  DROP TABLE "payload_cms"."products" CASCADE;
  DROP TABLE "payload_cms"."products_rels" CASCADE;
  DROP TABLE "payload_cms"."states_statutory_minimums" CASCADE;
  DROP TABLE "payload_cms"."states" CASCADE;
  DROP TABLE "payload_cms"."cities_city_facts_local_hazards" CASCADE;
  DROP TABLE "payload_cms"."cities_city_facts_neighborhoods" CASCADE;
  DROP TABLE "payload_cms"."cities" CASCADE;
  DROP TABLE "payload_cms"."location_overrides_custom_faqs" CASCADE;
  DROP TABLE "payload_cms"."location_overrides" CASCADE;
  DROP TABLE "payload_cms"."articles" CASCADE;
  DROP TABLE "payload_cms"."articles_rels" CASCADE;
  DROP TABLE "payload_cms"."glossary_terms" CASCADE;
  DROP TABLE "payload_cms"."glossary_terms_rels" CASCADE;
  DROP TABLE "payload_cms"."pages_blocks_rich_text" CASCADE;
  DROP TABLE "payload_cms"."pages_blocks_faq_items" CASCADE;
  DROP TABLE "payload_cms"."pages_blocks_faq" CASCADE;
  DROP TABLE "payload_cms"."pages_blocks_cta" CASCADE;
  DROP TABLE "payload_cms"."pages_blocks_disclosure" CASCADE;
  DROP TABLE "payload_cms"."pages_blocks_form" CASCADE;
  DROP TABLE "payload_cms"."pages" CASCADE;
  DROP TABLE "payload_cms"."agents_licenses" CASCADE;
  DROP TABLE "payload_cms"."agents" CASCADE;
  DROP TABLE "payload_cms"."agents_rels" CASCADE;
  DROP TABLE "payload_cms"."carriers" CASCADE;
  DROP TABLE "payload_cms"."carriers_rels" CASCADE;
  DROP TABLE "payload_cms"."redirects" CASCADE;
  DROP TABLE "payload_cms"."forms_fields_options" CASCADE;
  DROP TABLE "payload_cms"."forms_fields" CASCADE;
  DROP TABLE "payload_cms"."forms_notify_emails" CASCADE;
  DROP TABLE "payload_cms"."forms" CASCADE;
  DROP TABLE "payload_cms"."leads" CASCADE;
  DROP TABLE "payload_cms"."leads_rels" CASCADE;
  DROP TABLE "payload_cms"."site_settings_nav_header" CASCADE;
  DROP TABLE "payload_cms"."site_settings_nav_footer_links" CASCADE;
  DROP TABLE "payload_cms"."site_settings_nav_footer" CASCADE;
  DROP TABLE "payload_cms"."site_settings" CASCADE;
  DROP TABLE "payload_cms"."compliance_settings_banned_phrases" CASCADE;
  DROP TABLE "payload_cms"."compliance_settings_reward_rules" CASCADE;
  DROP TABLE "payload_cms"."compliance_settings" CASCADE;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_states_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_cities_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_location_overrides_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_articles_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_glossary_terms_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_agents_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_carriers_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_redirects_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_forms_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_leads_fk";
  
  DROP INDEX "payload_cms"."payload_locked_documents_rels_products_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_states_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_cities_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_location_overrides_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_articles_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_glossary_terms_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_pages_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_agents_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_carriers_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_redirects_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_forms_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_leads_id_idx";
  ALTER TABLE "payload_cms"."users" DROP COLUMN "name";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "products_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "states_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "cities_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "location_overrides_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "articles_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "glossary_terms_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "pages_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "agents_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "carriers_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "redirects_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "forms_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "leads_id";
  DROP TYPE "payload_cms"."enum_products_tier";
  DROP TYPE "payload_cms"."enum_products_category";
  DROP TYPE "payload_cms"."enum_products_third_subpage";
  DROP TYPE "payload_cms"."enum_products_review_status";
  DROP TYPE "payload_cms"."enum_products_index_wave";
  DROP TYPE "payload_cms"."enum_cities_city_facts_local_hazards";
  DROP TYPE "payload_cms"."enum_cities_size_band";
  DROP TYPE "payload_cms"."enum_articles_section";
  DROP TYPE "payload_cms"."enum_articles_review_status";
  DROP TYPE "payload_cms"."enum_articles_index_wave";
  DROP TYPE "payload_cms"."enum_articles_generation_status";
  DROP TYPE "payload_cms"."enum_glossary_terms_review_status";
  DROP TYPE "payload_cms"."enum_glossary_terms_index_wave";
  DROP TYPE "payload_cms"."enum_glossary_terms_generation_status";
  DROP TYPE "payload_cms"."enum_pages_blocks_disclosure_key";
  DROP TYPE "payload_cms"."enum_pages_template";
  DROP TYPE "payload_cms"."enum_pages_review_status";
  DROP TYPE "payload_cms"."enum_pages_index_wave";
  DROP TYPE "payload_cms"."enum_redirects_status_code";
  DROP TYPE "payload_cms"."enum_redirects_source";
  DROP TYPE "payload_cms"."enum_forms_fields_type";
  DROP TYPE "payload_cms"."enum_forms_lead_type";
  DROP TYPE "payload_cms"."enum_leads_type";
  DROP TYPE "payload_cms"."enum_leads_status";
  DROP TYPE "payload_cms"."enum_compliance_settings_reward_rules_track";
  DROP TYPE "payload_cms"."enum_compliance_settings_reward_rules_reward_type_allowed";
  DROP TYPE "payload_cms"."enum_compliance_settings_reward_rules_cash_equivalent_allowed";`)
}
