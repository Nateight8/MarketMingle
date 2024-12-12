CREATE TYPE "public"."listeners" AS ENUM('SMARTAI', 'MESSAGE');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('IMAGE', 'CAROUSEL_ALBUM', 'TEXT');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "automation" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'Untitled',
	"created_at" timestamp DEFAULT now(),
	"active" boolean DEFAULT false,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"automation_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"sender_id" uuid NOT NULL,
	"receiver" uuid NOT NULL,
	"message" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "listener" (
	"id" uuid PRIMARY KEY NOT NULL,
	"automation_id" uuid NOT NULL,
	"listener" "listeners" DEFAULT 'MESSAGE',
	"prompt" text NOT NULL,
	"comment_reply" text,
	"dm_count" integer DEFAULT 0,
	"comment_count" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post" (
	"id" uuid PRIMARY KEY NOT NULL,
	"post_id" text NOT NULL,
	"caption" text,
	"media" text NOT NULL,
	"media_type" "media_type" DEFAULT 'IMAGE',
	"automation_id" uuid NOT NULL,
	CONSTRAINT "post_post_id_unique" UNIQUE("post_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "automation" ADD CONSTRAINT "automation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dms" ADD CONSTRAINT "dms_automation_id_automation_id_fk" FOREIGN KEY ("automation_id") REFERENCES "public"."automation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dms" ADD CONSTRAINT "dms_sender_id_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dms" ADD CONSTRAINT "dms_receiver_user_id_fk" FOREIGN KEY ("receiver") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listener" ADD CONSTRAINT "listener_automation_id_automation_id_fk" FOREIGN KEY ("automation_id") REFERENCES "public"."automation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post" ADD CONSTRAINT "post_automation_id_automation_id_fk" FOREIGN KEY ("automation_id") REFERENCES "public"."automation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
