ALTER TABLE "oauth_sessions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "oauth_sessions" CASCADE;--> statement-breakpoint
ALTER TABLE "oauth_application_tokens" ALTER COLUMN "scopes" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "oauth_applications" ALTER COLUMN "scopes" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "oauth_applications" ALTER COLUMN "scopes" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "scopes" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "scopes" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "scopes" DROP NOT NULL;