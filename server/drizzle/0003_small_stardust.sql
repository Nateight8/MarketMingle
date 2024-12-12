CREATE TYPE "public"."status" AS ENUM('open', 'accepted', 'declined', 'deal', 'sold');--> statement-breakpoint
CREATE TYPE "public"."trigger_types" AS ENUM('EVENT', 'ACTION', 'CONDITION');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keyword" (
	"id" uuid PRIMARY KEY NOT NULL,
	"word" text NOT NULL,
	"automation_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trigger" (
	"id" uuid PRIMARY KEY NOT NULL,
	"type" "trigger_types" NOT NULL,
	"automation_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "keyword" ADD CONSTRAINT "keyword_automation_id_automation_id_fk" FOREIGN KEY ("automation_id") REFERENCES "public"."automation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trigger" ADD CONSTRAINT "trigger_automation_id_automation_id_fk" FOREIGN KEY ("automation_id") REFERENCES "public"."automation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "automation_keyword_unique" ON "keyword" USING btree ("automation_id","word");