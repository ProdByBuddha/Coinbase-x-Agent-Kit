
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Socket } from "socket.io-client";
import {
  Wallet,
  Repeat,
  PieChart,
  DollarSign,
  Send,
  Coins,
  Shield,
  Download,
  Upload,
  Coins as TokenIcon,
  BarChart4,
} from "lucide-react";

interface ActionButtonsProps {
  socket: Socket | null;
  isConnected: boolean;
}

export default function ActionButtons({ socket, isConnected }: ActionButtonsProps) {
  const { toast } = useToast();

  const handleAction = (prompt: string) => {
    if (!socket || !isConnected) {
      toast({
        title: "Not Connected",
        description: "Please wait for the connection to be established.",
        variant: "destructive",
      });
      return;
    }

    socket.emit("message", { content: prompt });
  };

  const actions = [
    { icon: Repeat, label: "Wrap ETH", prompt: "Wrap 0.01 ETH to WETH" },
    { icon: PieChart, label: "Fetch Feed ID", prompt: "Get price feed ID for ETH/USD" },
    { icon: DollarSign, label: "Fetch Price", prompt: "Get the current price for ETH/USD" },
    { icon: Wallet, label: "Wallet Details", prompt: "Show my wallet details" },
    { icon: Send, label: "Send ETH", prompt: "Send 0.01 ETH to 0x..." },
    { icon: Coins, label: "ERC20 Balance", prompt: "Check my WETH balance" },
    { icon: Send, label: "Send ERC20", prompt: "Transfer 0.01 WETH to 0x..." },
    { icon: Shield, label: "Check Address", prompt: "Check reputation of 0x..." },
    { icon: Download, label: "Get Test Funds", prompt: "Request faucet funds" },
    { icon: Upload, label: "Deploy Contract", prompt: "Deploy a smart contract" },
    { icon: TokenIcon, label: "Deploy NFT", prompt: "Deploy an NFT contract" },
    { icon: TokenIcon, label: "Deploy Token", prompt: "Deploy an ERC20 token" },
    { icon: BarChart4, label: "Trade Assets", prompt: "Trade ETH for USDC" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex items-center gap-2 w-full"
          onClick={() => handleAction(action.prompt)}
          disabled={!isConnected}
        >
          <action.icon className="h-4 w-4" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
