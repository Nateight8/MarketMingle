CREATE TYPE "public"."integration_types" AS ENUM('INSTAGRAM', 'TWITTER', 'FACEBOOK');--> statement-breakpoint
ALTER TABLE "integrations" ALTER COLUMN "name" SET DATA TYPE integration_types;--> statement-breakpoint
DROP TYPE "public"."integrations";