CREATE TYPE "public"."status" AS ENUM('open', 'accepted', 'declined', 'deal', 'sold');--> statement-breakpoint
CREATE TYPE "public"."user_subscription_plan" AS ENUM('FREE', 'PREMIUM', 'ENTERPRISE');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator" (
	"id" uuid PRIMARY KEY NOT NULL,
	"credential_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"provider_account_id" text NOT NULL,
	"credential_public_key" text NOT NULL,
	"counter" integer NOT NULL,
	"credential_device_type" text NOT NULL,
	"credential_backed_up" boolean NOT NULL,
	"transports" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"session_token" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_number_sessions" (
	"verification_number" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "verification_number_sessions_user_id_created_at_pk" PRIMARY KEY("user_id","created_at")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_token" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "automation" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dms" ALTER COLUMN "automation_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "listener" ALTER COLUMN "automation_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "post" ALTER COLUMN "automation_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscription" ALTER COLUMN "plan" SET DATA TYPE user_subscription_plan;--> statement-breakpoint
ALTER TABLE "trigger" ALTER COLUMN "automation_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "shop_name" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "shop_text_font" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "shop_text_color" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "verification_number_sessions" ADD CONSTRAINT "verification_number_sessions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "authenticator_credential_id_key" ON "authenticator" USING btree ("credential_id");--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "shopname";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "shoptextfont";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "shoptextcolor";--> statement-breakpoint
DROP TYPE "public"."subscription_plan";