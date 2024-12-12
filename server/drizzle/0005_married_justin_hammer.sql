CREATE TYPE "public"."integration_types" AS ENUM('INSTAGRAM', 'TWITTER', 'FACEBOOK');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "integrations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" "integration_types" DEFAULT 'INSTAGRAM',
	"created_at" timestamp DEFAULT now(),
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp,
	"instagram_id" text,
	CONSTRAINT "integrations_token_unique" UNIQUE("token"),
	CONSTRAINT "integrations_instagram_id_unique" UNIQUE("instagram_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
