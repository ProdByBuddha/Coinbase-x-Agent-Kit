import { Plus } from "lucide-react";
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
                  <SidebarMenuButton className="w-full justify-start">
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
                <Link key={chat.id} href={`/chat/${chat.id}`}>
                  <Card className="cursor-pointer transition-transform hover:scale-105">
                    <CardHeader>
                      <CardTitle>{chat.name}</CardTitle>
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
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
