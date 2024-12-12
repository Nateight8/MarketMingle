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
	"banner" text
);