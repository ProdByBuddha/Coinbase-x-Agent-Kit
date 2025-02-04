
import { Plus, Pencil, Trash2, Info } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
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
  DialogDescription,
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
    updateChatMutation.mutate({
      ...editingChat,
      name: newChatName,
    });
  };

  const handleDeleteChat = (chatId: number) => {
    if (!confirm("Are you sure you want to delete this chat?")) return;
    deleteChatMutation.mutate(chatId);
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen bg-gradient-to-br from-background to-background/95">
        <Sidebar>
          <SidebarHeader className="border-b border-border/50 p-4">
            <h2 className="cyberpunk-text text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">CDP AgentKit</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="flex flex-col h-full">
              <div className="flex-1">
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
              </div>
              <SidebarMenuItem>
                <Link href="/help">
                  <SidebarMenuButton className="w-full justify-start">
                    Help Guide
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/examples">
                  <SidebarMenuButton className="w-full justify-start">
                    Examples
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl p-8 space-y-10">
            <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="space-y-3">
                <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary-foreground animate-gradient-x">
                  Welcome to CDP AgentKit
                </h1>
                <p className="text-lg text-muted-foreground/90 max-w-2xl">
                  Manage your chat instances and configurations from one central dashboard.
                </p>
              </div>
              <Button 
                onClick={() => createChatMutation.mutate()}
                className="relative overflow-hidden group hover:scale-105 hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary-foreground"
                size="lg"
                disabled={createChatMutation.isPending}
              >
                <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                Create New Chat
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
              </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {chatInstances.map((chat) => (
                <Card key={chat.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 backdrop-blur-sm bg-background/95">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle className="text-xl font-semibold">{chat.name}</CardTitle>
                      <CardDescription>
                        Created {new Date(chat.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="hover:border-primary/50"
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
                            <DialogTitle>Edit Chat Settings</DialogTitle>
                            <DialogDescription>
                              Update the name and configuration for this chat instance.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Chat Name</label>
                              <Input
                                value={newChatName}
                                onChange={(e) => setNewChatName(e.target.value)}
                                placeholder="Enter new chat name"
                                className="border-border/50 focus:border-primary/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">CDP API Key Name</label>
                              <Input
                                value={editingChat?.apiKeys?.cdpApiKeyName || ''}
                                onChange={(e) => setEditingChat(prev => ({
                                  ...prev!,
                                  apiKeys: {
                                    ...prev?.apiKeys,
                                    cdpApiKeyName: e.target.value
                                  }
                                }))}
                                placeholder="Enter CDP API Key Name"
                                className="border-border/50 focus:border-primary/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">CDP Private Key</label>
                              <Input
                                type="password"
                                value={editingChat?.apiKeys?.cdpApiKeyPrivateKey || ''}
                                onChange={(e) => setEditingChat(prev => ({
                                  ...prev!,
                                  apiKeys: {
                                    ...prev?.apiKeys,
                                    cdpApiKeyPrivateKey: e.target.value
                                  }
                                }))}
                                placeholder="Enter CDP Private Key"
                                className="border-border/50 focus:border-primary/50"
                              />
                            </div>
                            <Button 
                              onClick={handleUpdateChat} 
                              className="w-full"
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
                        className="hover:border-destructive/50 hover:text-destructive"
                        onClick={() => handleDeleteChat(chat.id)}
                        disabled={deleteChatMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Info className="h-4 w-4 mr-2" />
                      {(import.meta.env.VITE_CDP_API_KEY_NAME) ? (
                        <span className="text-success">API Keys Configured</span>
                      ) : (
                        <span className="text-warning">API Keys Not Configured</span>
                      )}
                    </div>
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
