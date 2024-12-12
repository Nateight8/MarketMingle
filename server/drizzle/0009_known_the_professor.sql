CREATE TYPE "public"."trigger_types" AS ENUM('EVENT', 'ACTION', 'CONDITION');--> statement-breakpoint
ALTER TABLE "listener" DROP CONSTRAINT "listener_automation_id_unique";--> statement-breakpoint
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_user_id_unique";--> statement-breakpoint
ALTER TABLE "dms" ALTER COLUMN "sender_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "dms" ALTER COLUMN "receiver" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "integrations" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "keyword" ALTER COLUMN "automation_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "trigger" ALTER COLUMN "type" SET DATA TYPE trigger_types;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET DEFAULT 'Anonymous';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "address" text;--> statement-breakpoint
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
ALTER TABLE "user" DROP COLUMN IF EXISTS "adress";--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_post_id_unique" UNIQUE("post_id");--> statement-breakpoint
ALTER TABLE "public"."post" ALTER COLUMN "media_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."media_type";--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('IMAGE', 'CAROUSEL_ALBUM', 'TEXT');--> statement-breakpoint
ALTER TABLE "public"."post" ALTER COLUMN "media_type" SET DATA TYPE "public"."media_type" USING "media_type"::"public"."media_type";