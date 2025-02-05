import type { Server } from "socket.io";
import { initializeAgent } from "../server/chatbot.js";
import { db } from "@db";
import { messages, wallets } from "@db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import { HumanMessage } from "@langchain/core/messages";

type SocketQuery = {
  chatId: string;
  cdpApiKeyName?: string;
  cdpApiKeyPrivateKey?: string;
};

export function setupWebSocket(io: Server) {
  io.on("connection", async (socket) => {
    console.log("Client connected");
    const query = socket.handshake.query as SocketQuery;
    const chatId = parseInt(query.chatId);

    if (!chatId) {
      socket.emit("error", "Chat ID is required");
      return;
    }

    let mode: "chat" | "auto" = "chat";
    let agent: any;
    let config: any;

    try {
      const result = await initializeAgent({
        cdpApiKeyName: process.env.CDP_API_KEY_NAME,
        cdpApiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY
      });
      agent = result.agent;
      config = result.config;
    } catch (error) {
      console.error("Agent initialization error:", error);
      socket.emit("error", "Failed to initialize agent");
      return;
    }

    socket.on("chat", async (message: string) => {
      try {
        const stream = await agent.stream(
          { messages: [new HumanMessage(message)] },
          config
        );

        // Get wallet data from file
        let walletData;
        try {
          walletData = JSON.parse(fs.readFileSync("wallet_data.txt", "utf8"));
        } catch (error) {
          console.error("Error reading wallet data:", error);
        }

        // Update wallet info if available
        if (walletData) {
          try {
            await db.update(wallets)
              .set({
                networkId: walletData.networkId || process.env.NETWORK_ID || "base-sepolia",
                address: walletData.address || "Not connected",
                balance_eth: walletData.balance_eth || "0",
                balance_wei: walletData.balance_wei || "0",
                lastUpdated: new Date()
              })
              .where(eq(wallets.address, walletData.address))
              .returning();
          } catch (error) {
            console.error("Error updating wallet:", error);
          }
        }

        // Save user message first
        await db.insert(messages).values({
          chatId,
          content: message,
          type: "user",
          timestamp: new Date()
        });

        for await (const chunk of stream) {
          if ("agent" in chunk) {
            const msg = {
              chatId,
              content: chunk.agent.messages[0].content,
              type: "agent" as const,
              timestamp: new Date()
            };
            await db.insert(messages).values(msg);
            socket.emit("message", { ...msg, id: Date.now().toString() });
          } else if ("tools" in chunk) {
            const msg = {
              chatId,
              content: chunk.tools.messages[0].content,
              type: "tool" as const,
              timestamp: new Date()
            };
            await db.insert(messages).values(msg);
            socket.emit("message", { ...msg, id: Date.now().toString() });
          }
        }
      } catch (error) {
        console.error("Message processing error:", error);
        socket.emit("error", "Failed to process message");
      }
    });

    socket.on("mode", (newMode: "chat" | "auto") => {
      mode = newMode;
      if (mode === "auto") {
        // Start autonomous mode
        // Implementation similar to runAutonomousMode from chatbot.ts
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}