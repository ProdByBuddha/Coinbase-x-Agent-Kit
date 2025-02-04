import { pgTable, text, integer, timestamp, json, foreignKey, sql } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const wallets = pgTable("wallets", {
  id: integer("id").primaryKey().notNull().default(sql`GENERATED ALWAYS AS IDENTITY`),
  address: text("address").notNull(),
  network: text("network").notNull(),
  balance: text("balance"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});

export const chats = pgTable("chats", {
  id: integer("id").primaryKey().notNull().default(sql`GENERATED ALWAYS AS IDENTITY`),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  apiKeys: json("api_keys").$type<{
    cdpApiKeyName?: string;
    cdpApiKeyPrivateKey?: string;
  }>()
});

export const messages = pgTable("messages", {
  id: integer("id").primaryKey().notNull().default(sql`GENERATED ALWAYS AS IDENTITY`),
  chatId: integer("chat_id").references(() => chats.id),
  content: text("content").notNull(),
  type: text("type", { enum: ["user", "agent", "tool"] }).notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  metadata: json("metadata")
});

// Chat schemas
export const insertChatSchema = createInsertSchema(chats);
export const selectChatSchema = createSelectSchema(chats);
export type InsertChat = typeof chats.$inferInsert;
export type SelectChat = typeof chats.$inferSelect;

// Message schemas
export const insertMessageSchema = createInsertSchema(messages);
export const selectMessageSchema = createSelectSchema(messages);
export type InsertMessage = typeof messages.$inferInsert;
export type SelectMessage = typeof messages.$inferSelect;