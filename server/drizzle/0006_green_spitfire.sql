CREATE TYPE "public"."integration" AS ENUM('INSTAGRAM', 'TWITTER', 'FACEBOOK');--> statement-breakpoint
ALTER TABLE "integrations" ALTER COLUMN "name" SET DATA TYPE integration;--> statement-breakpoint
DROP TYPE "public"."integrations";