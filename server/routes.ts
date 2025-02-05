import type { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupWebSocket } from "./socket.js";
import { db } from "@db";
import { messages, chats, wallets } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export function registerRoutes(app: Express) {
  const httpServer = createServer(app);
  const io = new Server(httpServer);

  // Setup WebSocket
  setupWebSocket(io);

  // Chat Routes
  app.get("/api/chats", async (req, res) => {
    try {
      const result = await db.query.chats.findMany({
        orderBy: (chats, { desc }) => [desc(chats.createdAt)],
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chats" });
    }
  });

  app.post("/api/chats", async (req, res) => {
    try {
      const { name } = req.body;
      const result = await db.insert(chats).values({
        name,
        createdAt: new Date(),
      }).returning();
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to create chat" });
    }
  });

  app.patch("/api/chats/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, apiKeys } = req.body;
      const result = await db.update(chats)
        .set({ name, apiKeys })
        .where(eq(chats.id, parseInt(id)))
        .returning();
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({ error: "Failed to update chat" });
    }
  });

  app.delete("/api/chats/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const chatId = parseInt(id);
      console.log(`Attempting to delete chat with ID: ${chatId}`);

      // First delete all messages associated with this chat
      await db.delete(messages).where(eq(messages.chatId, chatId));

      // Then delete the chat
      const deleteResult = await db.delete(chats).where(eq(chats.id, chatId));

      if (deleteResult) {
        console.log(`Successfully deleted chat ${chatId}`);
        res.json({ success: true });
      } else {
        console.log(`Chat ${chatId} not found`);
        res.status(404).json({ error: "Chat not found" });
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      res.status(500).json({ error: "Failed to delete chat" });
    }
  });

  // Message Routes
  app.get("/api/messages/:chatId", async (req, res) => {
    try {
      const { chatId } = req.params;
      const result = await db.query.messages.findMany({
        where: eq(messages.chatId, parseInt(chatId)),
        orderBy: (messages, { asc }) => [asc(messages.timestamp)],
        limit: 100
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.get("/api/wallet", async (req, res) => {
    try {
      const wallet = await db.query.wallets.findFirst({
        orderBy: (wallets, { desc }) => [desc(wallets.lastUpdated)]
      });

      res.json({
        network: wallet?.networkId || process.env.NETWORK_ID || "base-sepolia",
        address: wallet?.address || "Not connected",
        balance_eth: wallet?.balance_eth,
        balance_wei: wallet?.balance_wei,
        lastUpdated: wallet?.lastUpdated
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wallet info" });
    }
  });

  // Assuming the wallet update logic is elsewhere and needs modification.  This is a placeholder.  The actual implementation would depend on where the walletData comes from.
  //  For example, it could be from a POST request to /api/wallet


  return httpServer;
}