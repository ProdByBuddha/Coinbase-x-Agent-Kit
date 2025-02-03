
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
    </div>
  );
}
