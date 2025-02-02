import { Plus, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type ChatInstance = {
  id: string;
  name: string;
  createdAt: Date;
  apiKeys?: {
    cdpApiKeyName?: string;
    cdpApiKeyPrivateKey?: string;
  };
};

export default function Dashboard() {
  const [chatInstances, setChatInstances] = useState<ChatInstance[]>([]);
  const [editingChat, setEditingChat] = useState<ChatInstance | null>(null);
  const [newChatName, setNewChatName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load chat instances from localStorage
    const savedInstances = localStorage.getItem('chatInstances');
    if (savedInstances) {
      setChatInstances(JSON.parse(savedInstances).map((instance: ChatInstance) => ({
        ...instance,
        createdAt: new Date(instance.createdAt)
      })));
    }
  }, []);

  const createNewChat = () => {
    const newChat: ChatInstance = {
      id: Date.now().toString(),
      name: `Chat ${chatInstances.length + 1}`,
      createdAt: new Date()
    };
    const updatedInstances = [...chatInstances, newChat];
    setChatInstances(updatedInstances);
    localStorage.setItem('chatInstances', JSON.stringify(updatedInstances));
  };

  const updateChatName = () => {
    if (!editingChat || !newChatName.trim()) return;

    const updatedInstances = chatInstances.map(chat => 
      chat.id === editingChat.id ? { ...chat, name: newChatName.trim() } : chat
    );
    setChatInstances(updatedInstances);
    localStorage.setItem('chatInstances', JSON.stringify(updatedInstances));
    setEditingChat(null);
    setNewChatName("");

    toast({
      title: "Chat Updated",
      description: "Chat name has been updated successfully.",
    });
  };

  const deleteChat = (chatId: string) => {
    if (!confirm("Are you sure you want to delete this chat?")) return;

    const updatedInstances = chatInstances.filter(chat => chat.id !== chatId);
    setChatInstances(updatedInstances);
    localStorage.setItem('chatInstances', JSON.stringify(updatedInstances));

    toast({
      title: "Chat Deleted",
      description: "Chat has been deleted successfully.",
    });
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border/50 p-4">
            <h2 className="cyberpunk-text text-lg font-bold">CDP AgentKit</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard">
                  <SidebarMenuButton className="w-full justify-start font-bold">
                    Dashboard
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              {chatInstances.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <Link href={`/chat/${chat.id}`}>
                    <SidebarMenuButton className="w-full justify-start">
                      {chat.name}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="cyberpunk-text text-3xl font-bold">Dashboard</h1>
              <Button onClick={createNewChat} className="neon-border">
                <Plus className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {chatInstances.map((chat) => (
                <Card key={chat.id} className="cyberpunk-card group">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="cyberpunk-text">{chat.name}</CardTitle>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => {
                              setEditingChat(chat);
                              setNewChatName(chat.name);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Chat Name</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <Input
                              value={newChatName}
                              onChange={(e) => setNewChatName(e.target.value)}
                              placeholder="Enter new chat name"
                            />
                            <Button onClick={updateChatName} className="w-full">
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteChat(chat.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Created {chat.createdAt.toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-sm">
                      {chat.apiKeys ? "API Keys Configured" : "API Keys Not Configured"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}