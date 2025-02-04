import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Wallet, Network } from "lucide-react";

interface WalletData {
  network: string;
  address: string;
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
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-3/4" />
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
        <div className="text-sm text-muted-foreground break-all">
          Address: {walletData?.address || "Not connected"}
        </div>
      </CardContent>
    </Card>
  );
}