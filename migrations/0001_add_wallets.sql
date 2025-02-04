
CREATE TABLE IF NOT EXISTS "wallets" (
  "id" serial PRIMARY KEY NOT NULL,
  "address" text NOT NULL,
  "network_id" text NOT NULL,
  "balance" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "last_updated" timestamp DEFAULT now() NOT NULL,
  "wallet_data" json
);
