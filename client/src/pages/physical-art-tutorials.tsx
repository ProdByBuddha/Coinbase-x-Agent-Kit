
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PhysicalArtTutorials() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/examples">
        <Button variant="ghost" className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Examples
        </Button>
      </Link>
      <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
        Physical Media Art Guide
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Studio Setup & Documentation</CardTitle>
          <CardDescription>Organize your physical art workflow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Essential steps for physical art management:</p>
          <div className="space-y-2">
            <p>1. Inventory tracking system</p>
            <p>2. Materials documentation</p>
            <p>3. Artwork provenance records</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Help me set up an inventory system for my physical artworks and materials"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Artwork Photography</CardTitle>
          <CardDescription>Document your physical artworks professionally</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Master artwork documentation:</p>
          <div className="space-y-2">
            <p>• Professional photography setup</p>
            <p>• Lighting techniques</p>
            <p>• Detail and texture capture</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Guide me through photographing my sculptures for documentation"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Physical Art Sales Strategy</CardTitle>
          <CardDescription>Market and sell your physical artworks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Learn how to:</p>
          <div className="space-y-2">
            <p>• Pricing strategies for physical art</p>
            <p>• Secure packaging and shipping</p>
            <p>• Exhibition and gallery preparation</p>
          </div>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Help me develop a pricing strategy for my paintings and find suitable galleries"</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
