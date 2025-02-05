import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Examples() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/dashboard">
        <Button variant="ghost" className="mb-4 neon-border glitch-effect">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>
      <h1 className="text-4xl font-bold tracking-tight cyberpunk-text text-glow">
        Real-World Examples
      </h1>

      <Card className="cyberpunk-card neon-border neon-pulse">
        <CardHeader>
          <CardTitle className="cyberpunk-text">Financial Data Analysis</CardTitle>
          <CardDescription className="text-primary/80">Analyze cryptocurrency market trends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-primary/90">Use CDP AgentKit to analyze market data and generate insights:</p>
          <div className="bg-black/30 p-4 rounded-md border border-primary/20 backdrop-blur-sm">
            <code className="text-primary">Query: "Show me the price trend for BTC over the last week and identify key support levels"</code>
          </div>
        </CardContent>
      </Card>

      <Card className="cyberpunk-card neon-border">
        <CardHeader>
          <CardTitle className="cyberpunk-text">Portfolio Management</CardTitle>
          <CardDescription className="text-primary/80">Track and optimize your crypto portfolio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-primary/90">Monitor your portfolio performance and get recommendations:</p>
          <div className="bg-black/30 p-4 rounded-md border border-primary/20 backdrop-blur-sm">
            <code className="text-primary">Query: "Calculate my portfolio's performance and suggest potential rebalancing opportunities"</code>
          </div>
        </CardContent>
      </Card>

      <Card className="cyberpunk-card neon-border">
        <CardHeader>
          <CardTitle className="cyberpunk-text">Market Research</CardTitle>
          <CardDescription className="text-primary/80">Research tokens and trading opportunities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-primary/90">Get detailed information about specific tokens:</p>
          <div className="bg-black/30 p-4 rounded-md border border-primary/20 backdrop-blur-sm">
            <code className="text-primary">Query: "Give me a detailed analysis of ETH including recent news, trading volume, and key metrics"</code>
          </div>
        </CardContent>
      </Card>

      <Card className="cyberpunk-card neon-border">
        <CardHeader>
          <CardTitle className="cyberpunk-text">Trading Strategy Development</CardTitle>
          <CardDescription className="text-primary/80">Build and backtest trading strategies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-primary/90">Develop and test trading strategies using historical data:</p>
          <div className="bg-black/30 p-4 rounded-md border border-primary/20 backdrop-blur-sm">
            <code className="text-primary">Query: "Help me create a simple moving average crossover strategy for BTC/USD"</code>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4 cyberpunk-text text-glow">For Artists & Creators</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <Link href="/music-tutorials">
          <Button className="neon-border glitch-effect w-full sm:w-auto">Music Distribution Tutorials</Button>
        </Link>
        <Link href="/physical-art-tutorials">
          <Button className="neon-border glitch-effect w-full sm:w-auto">Physical Art Tutorials</Button>
        </Link>
      </div>

      <Card className="cyberpunk-card neon-border">
        <CardHeader>
          <CardTitle className="cyberpunk-text">NFT Collection Management</CardTitle>
          <CardDescription className="text-primary/80">Track and manage your digital art portfolio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-primary/90">Monitor your NFT collection and track performance:</p>
          <div className="bg-black/30 p-4 rounded-md border border-primary/20 backdrop-blur-sm">
            <code className="text-primary">Query: "Show me the floor price trends for my NFT collections and suggest optimal listing prices"</code>
          </div>
        </CardContent>
      </Card>

      <Card className="cyberpunk-card neon-border">
        <CardHeader>
          <CardTitle className="cyberpunk-text">Royalty Tracking</CardTitle>
          <CardDescription className="text-primary/80">Monitor creator earnings and royalties</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-primary/90">Track your earnings across different platforms:</p>
          <div className="bg-black/30 p-4 rounded-md border border-primary/20 backdrop-blur-sm">
            <code className="text-primary">Query: "Calculate my total royalty earnings from secondary sales across all marketplaces"</code>
          </div>
        </CardContent>
      </Card>

      <Card className="cyberpunk-card neon-border">
        <CardHeader>
          <CardTitle className="cyberpunk-text">Community Engagement</CardTitle>
          <CardDescription className="text-primary/80">Analyze collector behavior and engagement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-primary/90">Get insights about your collector community:</p>
          <div className="bg-black/30 p-4 rounded-md border border-primary/20 backdrop-blur-sm">
            <code className="text-primary">Query: "Show me engagement metrics for my NFT holders and identify top collectors"</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}