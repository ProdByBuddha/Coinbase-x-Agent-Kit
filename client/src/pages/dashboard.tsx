import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  id: number;
  name: string;
  createdAt: string;
  apiKeys?: {
    cdpApiKeyName?: string;
    cdpApiKeyPrivateKey?: string;
  };
};

export default function Dashboard() {
  const [editingChat, setEditingChat] = useState<ChatInstance | null>(null);
  const [newChatName, setNewChatName] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: chatInstances = [] } = useQuery<ChatInstance[]>({
    queryKey: ['chats'],
    queryFn: async () => {
      const response = await fetch('/api/chats');
      if (!response.ok) throw new Error('Failed to fetch chats');
      return response.json();
    }
  });

  const createChatMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Chat ${chatInstances.length + 1}`,
        }),
      });
      if (!response.ok) throw new Error('Failed to create chat');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      toast({
        title: "Chat Created",
        description: "New chat has been created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create chat. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateChatMutation = useMutation({
    mutationFn: async (chat: ChatInstance) => {
      const response = await fetch(`/api/chats/${chat.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newChatName.trim(),
          apiKeys: chat.apiKeys,
        }),
      });
      if (!response.ok) throw new Error('Failed to update chat');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      setEditingChat(null);
      setNewChatName("");
      toast({
        title: "Chat Updated",
        description: "Chat has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update chat. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteChatMutation = useMutation({
    mutationFn: async (chatId: number) => {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete chat');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      toast({
        title: "Chat Deleted",
        description: "Chat has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete chat. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleUpdateChat = () => {
    if (!editingChat || !newChatName.trim()) return;
    updateChatMutation.mutate(editingChat);
  };

  const handleDeleteChat = (chatId: number) => {
    if (!confirm("Are you sure you want to delete this chat?")) return;
    console.log(`Initiating delete for chat ${chatId}`);
    deleteChatMutation.mutate(chatId, {
      onError: (error) => {
        console.error('Delete mutation error:', error);
      }
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
              <Button 
                onClick={() => createChatMutation.mutate()}
                className="neon-border"
                disabled={createChatMutation.isPending}
              >
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
                              className="neon-border"
                            />
                            <Button 
                              onClick={handleUpdateChat} 
                              className="w-full neon-border"
                              disabled={updateChatMutation.isPending}
                            >
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteChat(chat.id)}
                        disabled={deleteChatMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Created {new Date(chat.createdAt).toLocaleDateString()}
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