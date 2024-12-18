CREATE TYPE "public"."integration_types" AS ENUM('INSTAGRAM', 'TWITTER', 'FACEBOOK');--> statement-breakpoint
CREATE TYPE "public"."listeners" AS ENUM('SMARTAI', 'MESSAGE');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('IMAGE', 'CAROUSEL_ALBUM', 'TEXT');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('open', 'accepted', 'declined', 'deal', 'sold');--> statement-breakpoint
CREATE TYPE "public"."user_subscription_plan" AS ENUM('FREE', 'PREMIUM', 'ENTERPRISE');--> statement-breakpoint
CREATE TYPE "public"."trigger_types" AS ENUM('DM', 'COMMENT');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "automation" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'Untitled',
	"created_at" timestamp DEFAULT now(),
	"active" boolean DEFAULT false,
	"user_id" uuid NOT NULL,
	CONSTRAINT "automation_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"automation_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"sender_id" uuid NOT NULL,
	"receiver" uuid NOT NULL,
	"message" text,
	CONSTRAINT "dms_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "integrations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" "integration_types" DEFAULT 'INSTAGRAM',
	"created_at" timestamp DEFAULT now(),
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp,
	"instagram_id" text,
	CONSTRAINT "integrations_id_unique" UNIQUE("id"),
	CONSTRAINT "integrations_token_unique" UNIQUE("token"),
	CONSTRAINT "integrations_instagram_id_unique" UNIQUE("instagram_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keyword" (
	"id" uuid PRIMARY KEY NOT NULL,
	"word" text NOT NULL,
	"automation_id" uuid NOT NULL
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
	CONSTRAINT "post_id_unique" UNIQUE("id"),
	CONSTRAINT "post_post_id_unique" UNIQUE("post_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"plan" "user_subscription_plan" DEFAULT 'FREE',
	"customer_id" text,
	CONSTRAINT "subscription_id_unique" UNIQUE("id"),
	CONSTRAINT "subscription_customer_id_unique" UNIQUE("customer_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trigger" (
	"id" uuid PRIMARY KEY NOT NULL,
	"type" "trigger_types" NOT NULL,
	"automation_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"location" text,
	"adress" text,
	"phoneVerified" boolean DEFAULT false,
	"onboardingCompleted" boolean DEFAULT false,
	"shopname" text,
	"shoptextfont" text,
	"shoptextcolor" text,
	"banner" text,
	CONSTRAINT "user_id_unique" UNIQUE("id")
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
 ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "keyword" ADD CONSTRAINT "keyword_automation_id_automation_id_fk" FOREIGN KEY ("automation_id") REFERENCES "public"."automation"("id") ON DELETE cascade ON UPDATE no action;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
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
CREATE UNIQUE INDEX IF NOT EXISTS "automation_keyword_unique" ON "keyword" USING btree ("automation_id","word");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_listener" ON "listener" USING btree ("automation_id","listener");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "automation_id_unique" ON "trigger" USING btree ("automation_id","type");