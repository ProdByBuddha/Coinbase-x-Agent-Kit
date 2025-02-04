import { pgTable, text, serial, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  apiKeys: json("api_keys").$type<{
    cdpApiKeyName?: string;
    cdpApiKeyPrivateKey?: string;
  }>()
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: serial("chat_id").references(() => chats.id),
  content: text("content").notNull(),
  type: text("type", { enum: ["user", "agent", "tool"] }).notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  metadata: json("metadata")
});

export const wallets = pgTable("wallets", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  networkId: text("network_id").notNull(),
  balance_eth: text("balance_eth"),
  balance_wei: text("balance_wei"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
  walletData: json("wallet_data")
});

// Wallet schemas
export const insertWalletSchema = createInsertSchema(wallets);
export const selectWalletSchema = createSelectSchema(wallets);
export type InsertWallet = typeof wallets.$inferInsert;
export type SelectWallet = typeof wallets.$inferSelect;

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