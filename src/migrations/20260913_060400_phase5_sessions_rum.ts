import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "payload_cms"."enum_rum_samples_metric" AS ENUM('CLS', 'INP', 'LCP', 'TTFB', 'FCP');
  CREATE TYPE "payload_cms"."enum_rum_samples_rating" AS ENUM('good', 'needs-improvement', 'poor');
  CREATE TYPE "payload_cms"."enum_rum_samples_device" AS ENUM('mobile', 'desktop');
  CREATE TABLE "payload_cms"."quote_sessions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"token" varchar NOT NULL,
  	"step" numeric DEFAULT 1 NOT NULL,
  	"data" jsonb NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"lead_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_cms"."rum_samples" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"metric" "payload_cms"."enum_rum_samples_metric" NOT NULL,
  	"value" numeric NOT NULL,
  	"rating" "payload_cms"."enum_rum_samples_rating" NOT NULL,
  	"path" varchar NOT NULL,
  	"navigation_type" varchar,
  	"device" "payload_cms"."enum_rum_samples_device",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "quote_sessions_id" integer;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD COLUMN "rum_samples_id" integer;
  ALTER TABLE "payload_cms"."quote_sessions" ADD CONSTRAINT "quote_sessions_lead_id_leads_id_fk" FOREIGN KEY ("lead_id") REFERENCES "payload_cms"."leads"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "quote_sessions_token_idx" ON "payload_cms"."quote_sessions" USING btree ("token");
  CREATE INDEX "quote_sessions_expires_at_idx" ON "payload_cms"."quote_sessions" USING btree ("expires_at");
  CREATE INDEX "quote_sessions_lead_idx" ON "payload_cms"."quote_sessions" USING btree ("lead_id");
  CREATE INDEX "quote_sessions_updated_at_idx" ON "payload_cms"."quote_sessions" USING btree ("updated_at");
  CREATE INDEX "quote_sessions_created_at_idx" ON "payload_cms"."quote_sessions" USING btree ("created_at");
  CREATE INDEX "rum_samples_metric_idx" ON "payload_cms"."rum_samples" USING btree ("metric");
  CREATE INDEX "rum_samples_path_idx" ON "payload_cms"."rum_samples" USING btree ("path");
  CREATE INDEX "rum_samples_device_idx" ON "payload_cms"."rum_samples" USING btree ("device");
  CREATE INDEX "rum_samples_updated_at_idx" ON "payload_cms"."rum_samples" USING btree ("updated_at");
  CREATE INDEX "rum_samples_created_at_idx" ON "payload_cms"."rum_samples" USING btree ("created_at");
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quote_sessions_fk" FOREIGN KEY ("quote_sessions_id") REFERENCES "payload_cms"."quote_sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rum_samples_fk" FOREIGN KEY ("rum_samples_id") REFERENCES "payload_cms"."rum_samples"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_quote_sessions_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("quote_sessions_id");
  CREATE INDEX "payload_locked_documents_rels_rum_samples_id_idx" ON "payload_cms"."payload_locked_documents_rels" USING btree ("rum_samples_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_cms"."quote_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_cms"."rum_samples" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_cms"."quote_sessions" CASCADE;
  DROP TABLE "payload_cms"."rum_samples" CASCADE;
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_quote_sessions_fk";
  
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rum_samples_fk";
  
  DROP INDEX "payload_cms"."payload_locked_documents_rels_quote_sessions_id_idx";
  DROP INDEX "payload_cms"."payload_locked_documents_rels_rum_samples_id_idx";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "quote_sessions_id";
  ALTER TABLE "payload_cms"."payload_locked_documents_rels" DROP COLUMN "rum_samples_id";
  DROP TYPE "payload_cms"."enum_rum_samples_metric";
  DROP TYPE "payload_cms"."enum_rum_samples_rating";
  DROP TYPE "payload_cms"."enum_rum_samples_device";`)
}
