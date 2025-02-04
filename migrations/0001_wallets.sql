
CREATE TABLE IF NOT EXISTS "wallets" (
  "id" serial PRIMARY KEY NOT NULL,
  "address" text NOT NULL,
  "network" text NOT NULL,
  "balance" text,
  "created_at" timestamp DEFAULT now() NOT NULL
);
