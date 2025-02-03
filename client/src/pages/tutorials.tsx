
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Tutorials() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/examples">
        <Button variant="ghost" className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Examples
        </Button>
      </Link>
      <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
        Physical Art Sales with Web3
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Setting Up Your Art Gallery</CardTitle>
          <CardDescription>Create your digital storefront for physical art</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Essential steps to establish your Web3 art presence:</p>
          <div className="space-y-2">
            <p>1. Digital catalog creation</p>
            <p>2. Artwork metadata and authentication</p>
            <p>3. Smart contract setup for physical art sales</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Help me create a digital catalog for my physical artworks with authentication certificates"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Physical Art Sales Strategy</CardTitle>
          <CardDescription>Connect digital tokens to physical artworks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Learn how to:</p>
          <div className="space-y-2">
            <p>• Create NFT certificates of authenticity</p>
            <p>• Set up secure shipping and handling</p>
            <p>• Manage physical inventory with blockchain</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Show me how to create authentication certificates for my physical artworks"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Analytics</CardTitle>
          <CardDescription>Track sales and engagement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Monitor your art business:</p>
          <div className="space-y-2">
            <p>• Physical artwork inventory tracking</p>
            <p>• Sales performance analytics</p>
            <p>• Collector engagement metrics</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Generate a report of my artwork sales and inventory status"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Collector Community</CardTitle>
          <CardDescription>Build relationships with art collectors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Engage with collectors:</p>
          <div className="space-y-2">
            <p>• Private viewing experiences</p>
            <p>• Early access to new works</p>
            <p>• Collector rewards program</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Help me set up exclusive previews for my top collectors"</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
