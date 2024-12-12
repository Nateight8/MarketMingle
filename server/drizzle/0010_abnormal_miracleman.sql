ALTER TABLE "dms" ALTER COLUMN "sender_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dms" ALTER COLUMN "receiver" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email_verified" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "onboarding_completed" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "emailVerified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "phoneVerified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "onboardingCompleted";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");