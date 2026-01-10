CREATE TYPE "public"."_account_authenticator_kind" AS ENUM('PASSWORD', 'PASSKEY');--> statement-breakpoint
CREATE TYPE "public"."_account_state" AS ENUM('ACTIVE', 'DELETED');--> statement-breakpoint
CREATE TYPE "public"."_email_verification_purpose" AS ENUM('LOGIN', 'SIGN_UP', 'ADD_EMAIL');--> statement-breakpoint
CREATE TYPE "public"."_external_account_kind" AS ENUM('DISCORD');--> statement-breakpoint
CREATE TABLE "account_authenticators" (
	"id" varchar PRIMARY KEY NOT NULL,
	"account_id" varchar NOT NULL,
	"kind" "_account_authenticator_kind" NOT NULL,
	"key" varchar,
	"credential" jsonb NOT NULL,
	"name" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "account_authenticators_account_id_key_unique" UNIQUE NULLS NOT DISTINCT("account_id","key")
);
--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" varchar PRIMARY KEY NOT NULL,
	"primary_email_id" varchar NOT NULL,
	"name" varchar NOT NULL,
	"state" "_account_state" DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "challenges" (
	"id" varchar PRIMARY KEY NOT NULL,
	"device_id" varchar NOT NULL,
	"challenge" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "challenges_device_id_unique" UNIQUE("device_id")
);
--> statement-breakpoint
CREATE TABLE "email_verifications" (
	"id" varchar PRIMARY KEY NOT NULL,
	"email_id" varchar NOT NULL,
	"purpose" "_email_verification_purpose" NOT NULL,
	"code" varchar,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "email_verifications_email_id_unique" UNIQUE("email_id")
);
--> statement-breakpoint
CREATE TABLE "emails" (
	"id" varchar PRIMARY KEY NOT NULL,
	"account_id" varchar,
	"email" varchar NOT NULL,
	"normalized_email" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"verified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "external_accounts" (
	"id" varchar PRIMARY KEY NOT NULL,
	"account_id" varchar NOT NULL,
	"kind" "_external_account_kind" NOT NULL,
	"external_id" varchar NOT NULL,
	"data" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "external_accounts_account_id_kind_unique" UNIQUE("account_id","kind"),
	CONSTRAINT "external_accounts_kind_external_id_unique" UNIQUE("kind","external_id")
);
--> statement-breakpoint
CREATE TABLE "oauth_application_redirect_uris" (
	"id" varchar PRIMARY KEY NOT NULL,
	"application_id" varchar NOT NULL,
	"redirect_uri" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "oauth_application_secrets" (
	"id" varchar PRIMARY KEY NOT NULL,
	"application_id" varchar NOT NULL,
	"secret" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "oauth_application_tokens" (
	"id" varchar PRIMARY KEY NOT NULL,
	"application_id" varchar NOT NULL,
	"account_id" varchar NOT NULL,
	"redirect_uri_id" varchar NOT NULL,
	"token" varchar NOT NULL,
	"scopes" jsonb NOT NULL,
	"nonce" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "oauth_applications" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"scopes" jsonb NOT NULL,
	"is_super_app" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar PRIMARY KEY NOT NULL,
	"application_id" varchar,
	"account_id" varchar NOT NULL,
	"token" varchar NOT NULL,
	"scopes" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "account_authenticators" ADD CONSTRAINT "account_authenticators_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_primary_email_id_emails_id_fk" FOREIGN KEY ("primary_email_id") REFERENCES "public"."emails"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_verifications" ADD CONSTRAINT "email_verifications_email_id_emails_id_fk" FOREIGN KEY ("email_id") REFERENCES "public"."emails"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "emails" ADD CONSTRAINT "emails_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "external_accounts" ADD CONSTRAINT "external_accounts_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauth_application_redirect_uris" ADD CONSTRAINT "oauth_application_redirect_uris_application_id_oauth_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."oauth_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauth_application_secrets" ADD CONSTRAINT "oauth_application_secrets_application_id_oauth_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."oauth_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauth_application_tokens" ADD CONSTRAINT "oauth_application_tokens_application_id_oauth_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."oauth_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauth_application_tokens" ADD CONSTRAINT "oauth_application_tokens_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauth_application_tokens" ADD CONSTRAINT "oauth_application_tokens_redirect_uri_id_oauth_application_redirect_uris_id_fk" FOREIGN KEY ("redirect_uri_id") REFERENCES "public"."oauth_application_redirect_uris"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_application_id_oauth_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."oauth_applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "emails_normalized_email_index" ON "emails" USING btree ("normalized_email") WHERE "emails"."verified_at" IS NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "emails_account_id_normalized_email_index" ON "emails" USING btree ("account_id","normalized_email");