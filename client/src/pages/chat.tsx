import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Socket, io } from "socket.io-client";
import { Settings } from "lucide-react";
import ModeSelector from "@/components/chat/mode-selector";
import MessageList from "@/components/chat/message-list";
import WalletInfo from "@/components/chat/wallet-info";
import NetworkStatus from "@/components/chat/network-status";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Send } from "lucide-react";

type Message = {
  id: string;
  content: string;
  type: "user" | "agent" | "tool";
  timestamp: string | Date;
};

type ChatInstance = {
  id: string;
  name: string;
  createdAt: Date;
  apiKeys?: {
    cdpApiKeyName?: string;
    cdpApiKeyPrivateKey?: string;
  };
};

export default function Chat() {
  const [, params] = useRoute("/chat/:id");
  const chatId = params?.id;

  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"chat" | "auto">("chat");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatInstance, setChatInstance] = useState<ChatInstance | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    cdpApiKeyName: "",
    cdpApiKeyPrivateKey: "",
  });

  const { toast } = useToast();

  useEffect(() => {
    if (chatId) {
      const savedInstances = localStorage.getItem('chatInstances');
      if (savedInstances) {
        const instances = JSON.parse(savedInstances);
        const instance = instances.find((i: ChatInstance) => i.id === chatId);
        if (instance) {
          setChatInstance(instance);
          if (instance.apiKeys) {
            setApiKeys(instance.apiKeys);
          }
        }
      }
    }
  }, [chatId]);

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
      toast({
        title: "Connected to server",
        description: "Ready to chat!",
      });
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      toast({
        title: "Disconnected from server",
        description: "Trying to reconnect...",
        variant: "destructive",
      });
    });

    newSocket.on("message", (msg: Message) => {
      const msgWithDate = {
        ...msg,
        timestamp: new Date(msg.timestamp)
      };
      setMessages(prev => [...prev, msgWithDate]);
      setIsLoading(false);
    });

    newSocket.on("error", (error: string) => {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      setIsLoading(false);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [chatId, apiKeys, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !socket || !isConnected || isLoading) return;

    setIsLoading(true);
    const message: Message = {
      id: Date.now().toString(),
      content: input,
      type: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    socket.emit("chat", input);
    setInput("");
  };

  const handleModeChange = (newMode: "chat" | "auto") => {
    setMode(newMode);
    if (socket) {
      socket.emit("mode", newMode);
    }
  };

  const saveApiKeys = () => {
    if (!chatId) return;

    const savedInstances = localStorage.getItem('chatInstances');
    if (savedInstances) {
      const instances = JSON.parse(savedInstances);
      const updatedInstances = instances.map((instance: ChatInstance) => {
        if (instance.id === chatId) {
          return {
            ...instance,
            apiKeys,
          };
        }
        return instance;
      });
      localStorage.setItem('chatInstances', JSON.stringify(updatedInstances));
    }

    if (socket) {
      socket.disconnect();
    }

    toast({
      title: "API Keys Updated",
      description: "The chat will reconnect with the new configuration.",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col w-full max-w-5xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <ModeSelector mode={mode} onChange={handleModeChange} />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
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
                      onChange={(e) => setApiKeys(prev => ({
                        ...prev,
                        cdpApiKeyName: e.target.value
                      }))}
                      placeholder="Enter CDP API Key Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CDP Private Key</label>
                    <Input
                      type="password"
                      value={apiKeys.cdpApiKeyPrivateKey}
                      onChange={(e) => setApiKeys(prev => ({
                        ...prev,
                        cdpApiKeyPrivateKey: e.target.value
                      }))}
                      placeholder="Enter CDP Private Key"
                    />
                  </div>
                  <Button onClick={saveApiKeys} className="w-full">
                    Save Configuration
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <NetworkStatus isConnected={isConnected} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-3">
            <ScrollArea className="h-[70vh] rounded-lg border bg-card p-4">
              <MessageList messages={messages} />
            </ScrollArea>
          </div>
          <div className="md:col-span-1">
            <WalletInfo />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={!isConnected || mode === "auto" || isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={!isConnected || mode === "auto" || isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}