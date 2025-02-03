
CREATE TABLE IF NOT EXISTS "wallets" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"network" text NOT NULL,
	"balance_eth" text NOT NULL,
	"balance_wei" text NOT NULL,
	"status" text NOT NULL,
	"last_transaction" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
