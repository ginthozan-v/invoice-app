CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"createTs" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"userID" text
);
--> statement-breakpoint
ALTER TABLE "invoices" ADD COLUMN "customerID" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customerID_customers_id_fk" FOREIGN KEY ("customerID") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;