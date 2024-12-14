ALTER TABLE "automation" ADD CONSTRAINT "automation_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "dms" ADD CONSTRAINT "dms_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "keyword" ADD CONSTRAINT "keyword_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "listener" ADD CONSTRAINT "listener_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "trigger" ADD CONSTRAINT "trigger_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_unique" UNIQUE("id");