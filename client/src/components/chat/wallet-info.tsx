
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wallet, Network, Coins, Activity, Clock } from "lucide-react";

interface WalletData {
  network: string;
  address: string;
  balanceETH: string;
  balanceWEI: string;
  lastTransaction: string;
  status: 'active' | 'inactive';
}

export default function WalletInfo() {
  const { data: walletData, isLoading } = useQuery<WalletData>({
    queryKey: ["/api/wallet"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Info
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Network className="h-4 w-4 text-muted-foreground" />
          <span>Network: {walletData?.network || "base-sepolia"}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-muted-foreground" />
            <span>ETH: {walletData?.balanceETH || "0.00"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Coins className="h-3 w-3" />
            <span>WEI: {walletData?.balanceWEI || "0"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <span>Status: {walletData?.status || "inactive"}</span>
        </div>
        <div className="text-sm text-muted-foreground break-all">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4" />
            Last Tx: {walletData?.lastTransaction || "No recent transactions"}
          </div>
          Address: {walletData?.address || "Not connected"}
        </div>
      </CardContent>
    </Card>
  );
}
