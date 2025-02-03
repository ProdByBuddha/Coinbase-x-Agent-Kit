
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
  verbose: true,
  strict: true,
} satisfies Config;
