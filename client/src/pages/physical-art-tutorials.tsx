import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PhysicalArtTutorials() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/examples">
        <Button variant="ghost" className="mb-4 neon-border glitch-effect">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Examples
        </Button>
      </Link>
      <h1 className="text-4xl font-bold tracking-tight cyberpunk-text text-glow">
        Physical Media Art Guide
      </h1>

      <Card className="cyberpunk-card neon-border neon-pulse">
        <CardHeader>
          <CardTitle className="cyberpunk-text">Studio Setup & Documentation</CardTitle>
          <CardDescription className="text-primary/80">Organize your physical art workflow</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-primary/90">Essential steps for physical art management:</p>
          <div className="space-y-2">
            <p className="text-primary/80">1. Inventory tracking system</p>
            <p className="text-primary/80">2. Materials documentation</p>
            <p className="text-primary/80">3. Artwork provenance records</p>
          </div>
          <div className="bg-black/30 p-4 rounded-md border border-primary/20 backdrop-blur-sm">
            <code className="text-primary">Query: "Help me set up an inventory system for my physical artworks and materials"</code>
          </div>
        </CardContent>
      </Card>

      <Card className="cyberpunk-card neon-border">
        <CardHeader>
          <CardTitle className="cyberpunk-text">Artwork Photography</CardTitle>
          <CardDescription className="text-primary/80">Document your physical artworks professionally</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-primary/90">Master artwork documentation:</p>
          <div className="space-y-2">
            <p className="text-primary/80">• Professional photography setup</p>
            <p className="text-primary/80">• Lighting techniques</p>
            <p className="text-primary/80">• Detail and texture capture</p>
          </div>
          <div className="bg-black/30 p-4 rounded-md border border-primary/20 backdrop-blur-sm">
            <code className="text-primary">Query: "Guide me through photographing my sculptures for documentation"</code>
          </div>
        </CardContent>
      </Card>

      <Card className="cyberpunk-card neon-border">
        <CardHeader>
          <CardTitle className="cyberpunk-text">Physical Art Sales Strategy</CardTitle>
          <CardDescription className="text-primary/80">Market and sell your physical artworks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-primary/90">Learn how to:</p>
          <div className="space-y-2">
            <p className="text-primary/80">• Pricing strategies for physical art</p>
            <p className="text-primary/80">• Secure packaging and shipping</p>
            <p className="text-primary/80">• Exhibition and gallery preparation</p>
          </div>
          <div className="bg-black/30 p-4 rounded-md border border-primary/20 backdrop-blur-sm">
            <code className="text-primary">Query: "Help me develop a pricing strategy for my paintings and find suitable galleries"</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}