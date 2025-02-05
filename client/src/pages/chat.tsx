import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Socket, io } from "socket.io-client";
import { Settings, Send, ArrowLeft, PanelLeft } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ModeSelector from "@/components/chat/mode-selector";
import MessageList from "@/components/chat/message-list";
import WalletInfo from "@/components/chat/wallet-info";
import NetworkStatus from "@/components/chat/network-status";
import ActionButtons from "@/components/chat/action-buttons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "wouter";

type Message = {
  id: string;
  content: string;
  type: "user" | "agent" | "tool";
  timestamp: string | Date;
};

type ChatInstance = {
  id: number;
  name: string;
  createdAt: string;
  apiKeys?: {
    cdpApiKeyName?: string;
    cdpApiKeyPrivateKey?: string;
  };
};

export default function Chat() {
  const [, params] = useRoute("/chat/:id");
  const chatId = params?.id;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"chat" | "auto">("chat");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false); // Added loading state
  const [apiKeys, setApiKeys] = useState({
    cdpApiKeyName: "",
    cdpApiKeyPrivateKey: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: chatInstance } = useQuery<ChatInstance>({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await fetch(`/api/chats/${chatId}`);
      if (!response.ok) throw new Error("Failed to fetch chat");
      return response.json();
    },
    enabled: !!chatId,
  });

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const response = await fetch(`/api/messages/${chatId}`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      return response.json();
    },
    enabled: !!chatId,
  });

  const updateChatMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKeys,
          name: chatInstance?.name,
        }),
      });
      if (!response.ok) throw new Error("Failed to update chat");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", chatId] });
      toast({
        title: "API Keys Updated",
        description: "The chat will reconnect with the new configuration.",
      });
    },
  });

  useEffect(() => {
    if (chatInstance?.apiKeys) {
      setApiKeys({
        cdpApiKeyName: chatInstance.apiKeys.cdpApiKeyName || "",
        cdpApiKeyPrivateKey: chatInstance.apiKeys.cdpApiKeyPrivateKey || "",
      });
    }
  }, [chatInstance]);
  useEffect(() => {
    if (!chatId) return;

    const newSocket = io(window.location.origin, {
      path: "/socket.io",
      query: {
        chatId,
        ...apiKeys,
      },
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    newSocket.on("message", (msg: Message) => {
      queryClient.invalidateQueries({ queryKey: ["messages", chatId] });
      queryClient.setQueryData(["messages", chatId], (old: Message[] = []) => [
        ...old,
        msg,
      ]); // Update messages with the new message
      setIsLoading(false);
      setIsStreaming(false); //Added to stop loading after message received
    });

    newSocket.on("streaming", () => {
      setIsStreaming(true); // Start loading indicator
    });

    newSocket.on("error", (error: string) => {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      setIsLoading(false);
      setIsStreaming(false); //Added to stop loading after error
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [chatId, apiKeys, toast, queryClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || !socket || !isConnected || isLoading) return;

    setIsLoading(true);
    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      content: trimmedInput,
      type: "user",
      timestamp: new Date(),
    };
    queryClient.setQueryData(["messages", chatId], (old: Message[] = []) => [
      ...old,
      tempMessage,
    ]);
    socket.emit("chat", trimmedInput);
    setInput("");
  };

  const handleModeChange = (newMode: "chat" | "auto") => {
    setMode(newMode);
    if (socket) {
      socket.emit("mode", newMode);
      if (newMode === "auto") {
        // Send initial auto mode trigger
        socket.emit("chat", "Start autonomous mode operations");
        setIsLoading(true);
      }
    }
  };

  const saveApiKeys = () => {
    if (!chatId) return;
    updateChatMutation.mutate();
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col w-full max-w-5xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="lg:hidden neon-border">
                  <PanelLeft className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[90vh] bg-background">
                <DrawerHeader className="border-b">
                  <DrawerTitle className="text-lg font-semibold">Chat Navigation</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 flex flex-col gap-4">
                  <ActionButtons socket={socket} isConnected={isConnected} />
                </div>
              </DrawerContent>
            </Drawer>
            <Link href="/dashboard">
              <Button variant="outline" size="icon" className="neon-border">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-primary">
                {chatInstance ? chatInstance.name : "Loading..."}
              </h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="neon-border">
                    <Settings className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Agent Configuration</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CDP API Key Name</label>
                      <Input
                        value={apiKeys.cdpApiKeyName}
                        onChange={(e) => setApiKeys((prev) => ({
                          ...prev,
                          cdpApiKeyName: e.target.value,
                        }))}
                        placeholder="Enter CDP API Key Name"
                        className="neon-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CDP Private Key</label>
                      <Input
                        type="password"
                        value={apiKeys.cdpApiKeyPrivateKey}
                        onChange={(e) => setApiKeys((prev) => ({
                          ...prev,
                          cdpApiKeyPrivateKey: e.target.value,
                        }))}
                        placeholder="Enter CDP Private Key"
                        className="neon-border"
                      />
                    </div>
                    <Button onClick={saveApiKeys} className="w-full neon-border" disabled={updateChatMutation.isPending}>
                      Save Configuration
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="neon-border w-auto"
                onClick={async () => {
                  if (!confirm("Are you sure you want to clear all messages?"))
                    return;
                  try {
                    await fetch(`/api/messages/${chatId}`, { method: "DELETE" });
                    queryClient.setQueryData(["messages", chatId], []);
                    toast({
                      title: "Messages Cleared",
                      description: "All messages have been cleared successfully.",
                    });
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to clear messages.",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Clear Chat
              </Button>
              <div className="w-full md:w-auto">
                <ModeSelector mode={mode} onChange={handleModeChange} />
              </div>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="neon-border">
                  <Settings className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Agent Configuration</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      CDP API Key Name
                    </label>
                    <Input
                      value={apiKeys.cdpApiKeyName}
                      onChange={(e) =>
                        setApiKeys((prev) => ({
                          ...prev,
                          cdpApiKeyName: e.target.value,
                        }))
                      }
                      placeholder="Enter CDP API Key Name"
                      className="neon-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      CDP Private Key
                    </label>
                    <Input
                      type="password"
                      value={apiKeys.cdpApiKeyPrivateKey}
                      onChange={(e) =>
                        setApiKeys((prev) => ({
                          ...prev,
                          cdpApiKeyPrivateKey: e.target.value,
                        }))
                      }
                      placeholder="Enter CDP Private Key"
                      className="neon-border"
                    />
                  </div>
                  <Button
                    onClick={saveApiKeys}
                    className="w-full neon-border"
                    disabled={updateChatMutation.isPending}
                  >
                    Save Configuration
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:block">
            <NetworkStatus isConnected={isConnected} />
          </div>
          <div className="md:hidden absolute top-4 right-4">
            <NetworkStatus isConnected={isConnected} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-3">
            <ScrollArea className="h-[70vh] rounded-lg border bg-card p-4 cyberpunk-card">
              <MessageList messages={messages} isLoading={isStreaming} />
            </ScrollArea>
          </div>
          <div className="hidden md:block md:col-span-1 space-y-4">
            {/* <WalletInfo /> */}
            <ActionButtons socket={socket} isConnected={isConnected} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={!isConnected || mode === "auto" || isLoading}
            className="flex-1 neon-border"
          />
          <Button
            type="submit"
            disabled={!isConnected || mode === "auto" || isLoading}
            className="neon-border"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}