ALTER TABLE "authenticator" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "account" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "automation" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "dms" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "integrations" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "keyword" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "listener" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "post" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "session" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "subscription" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "trigger" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "verification_number_sessions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "verification_token" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "authenticator" CASCADE;--> statement-breakpoint
DROP TABLE "account" CASCADE;--> statement-breakpoint
DROP TABLE "automation" CASCADE;--> statement-breakpoint
DROP TABLE "dms" CASCADE;--> statement-breakpoint
DROP TABLE "integrations" CASCADE;--> statement-breakpoint
DROP TABLE "keyword" CASCADE;--> statement-breakpoint
DROP TABLE "listener" CASCADE;--> statement-breakpoint
DROP TABLE "post" CASCADE;--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
DROP TABLE "subscription" CASCADE;--> statement-breakpoint
DROP TABLE "trigger" CASCADE;--> statement-breakpoint
DROP TABLE "verification_number_sessions" CASCADE;--> statement-breakpoint
DROP TABLE "verification_token" CASCADE;--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerified" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "adress" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phoneVerified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "onboardingCompleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "shopname" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "shoptextfont" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "shoptextcolor" text;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "email_verified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "phone_verified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "onboarding_completed";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "shop_name";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "shop_text_font";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "shop_text_color";--> statement-breakpoint
DROP TYPE "public"."integration_types";--> statement-breakpoint
DROP TYPE "public"."listeners";--> statement-breakpoint
DROP TYPE "public"."media_type";--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
DROP TYPE "public"."user_subscription_plan";--> statement-breakpoint
DROP TYPE "public"."trigger_types";