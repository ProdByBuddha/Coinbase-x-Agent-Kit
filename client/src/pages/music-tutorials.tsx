
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MusicTutorials() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/examples">
        <Button variant="ghost" className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Examples
        </Button>
      </Link>
      <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
        Direct-to-Consumer Music Distribution Guide
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Setting Up Your Artist Profile</CardTitle>
          <CardDescription>Create your digital storefront</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Essential steps to establish your digital presence:</p>
          <div className="space-y-2">
            <p>1. Profile optimization</p>
            <p>2. Music metadata management</p>
            <p>3. Smart contract deployment for royalties</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Help me set up my artist profile with optimized metadata for discovery"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Direct Sales Strategy</CardTitle>
          <CardDescription>Maximize your earnings through direct fan engagement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Learn how to:</p>
          <div className="space-y-2">
            <p>• Set up token-gated content</p>
            <p>• Create exclusive fan experiences</p>
            <p>• Manage digital asset distribution</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Show me how to create token-gated exclusive content for my superfans"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fan Community Building</CardTitle>
          <CardDescription>Create lasting connections with your audience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Build your community:</p>
          <div className="space-y-2">
            <p>• Exclusive content strategies</p>
            <p>• Direct fan communication</p>
            <p>• Community reward systems</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Help me design a token-based fan rewards program for my community"</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
