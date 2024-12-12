CREATE TYPE "public"."integrations" AS ENUM('INSTAGRAM', 'TWITTER', 'FACEBOOK');--> statement-breakpoint
ALTER TABLE "integrations" ALTER COLUMN "name" SET DATA TYPE integrations;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
DROP TYPE "public"."integration";