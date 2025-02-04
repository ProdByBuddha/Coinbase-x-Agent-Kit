
CREATE TABLE IF NOT EXISTS "wallets" (
    "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "address" text NOT NULL,
    "network" text NOT NULL,
    "balance" text,
    "created_at" timestamp DEFAULT now() NOT NULL
);
