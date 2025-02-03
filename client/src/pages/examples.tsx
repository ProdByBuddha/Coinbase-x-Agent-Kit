
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Examples() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link href="/dashboard">
        <Button variant="ghost" className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>
      <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
        Real-World Examples
      </h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Financial Data Analysis</CardTitle>
          <CardDescription>Analyze cryptocurrency market trends</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Use CDP AgentKit to analyze market data and generate insights:</p>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Show me the price trend for BTC over the last week and identify key support levels"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Management</CardTitle>
          <CardDescription>Track and optimize your crypto portfolio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Monitor your portfolio performance and get recommendations:</p>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Calculate my portfolio's performance and suggest potential rebalancing opportunities"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Research</CardTitle>
          <CardDescription>Research tokens and trading opportunities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Get detailed information about specific tokens:</p>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Give me a detailed analysis of ETH including recent news, trading volume, and key metrics"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trading Strategy Development</CardTitle>
          <CardDescription>Build and backtest trading strategies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Develop and test trading strategies using historical data:</p>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Help me create a simple moving average crossover strategy for BTC/USD"</code>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4">For Artists & Creators</h2>
      <div className="flex gap-4 mb-4">
        <Link href="/tutorials">
          <Button>View Music Distribution Tutorials</Button>
        </Link>
        <Link href="/tutorials">
          <Button>View Physical Art Tutorials</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>NFT Collection Management</CardTitle>
          <CardDescription>Track and manage your digital art portfolio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Monitor your NFT collection and track performance:</p>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Show me the floor price trends for my NFT collections and suggest optimal listing prices"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Royalty Tracking</CardTitle>
          <CardDescription>Monitor creator earnings and royalties</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Track your earnings across different platforms:</p>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Calculate my total royalty earnings from secondary sales across all marketplaces"</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Community Engagement</CardTitle>
          <CardDescription>Analyze collector behavior and engagement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Get insights about your collector community:</p>
          <div className="bg-muted p-4 rounded-md">
            <code>Query: "Show me engagement metrics for my NFT holders and identify top collectors"</code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
