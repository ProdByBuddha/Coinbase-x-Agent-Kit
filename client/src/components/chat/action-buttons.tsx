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

    socket.emit("chat", prompt);
  };

  const actions = [
    { icon: Repeat, label: "Wrap ETH", prompt: "Wrap ETH to WETH" },
    { icon: PieChart, label: "Fetch Feed ID", prompt: "Get price feed ID for currency pair. Ask me for the currency pair." },
    { icon: DollarSign, label: "Fetch Price", prompt: "Get the current price for currency pair. Ask me for the currency pair." },
    { icon: Wallet, label: "Wallet Details", prompt: "Show my wallet details" },
    { icon: Send, label: "Send ETH", prompt: "Send ETH to wallet address. Ask me for the wallet address." },
    { icon: Coins, label: "ERC20 Balance", prompt: "Check my WETH balance" },
    { icon: Send, label: "Send ERC20", prompt: "Transfer WETH to wallet address. Ask me for the wallet address." },
    { icon: Shield, label: "Check Address", prompt: "Check reputation of wallet address. Ask me for the wallet address." },
    { icon: Download, label: "Get Test Funds", prompt: "Request faucet funds" },
    { icon: Upload, label: "Deploy Contract", prompt: "Deploy a smart contract" },
    { icon: TokenIcon, label: "Deploy NFT", prompt: "Deploy an NFT contract" },
    { icon: TokenIcon, label: "Deploy Token", prompt: "Deploy an ERC20 token" },
    { icon: BarChart4, label: "Trade Assets", prompt: "Trade currency for currency. Ask me for the currencies to be traded." },
  ];

  return (
    <div className="grid grid-cols-2 gap-1.5 p-2">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="group relative flex items-center gap-1.5 w-full min-w-0 overflow-hidden whitespace-nowrap text-[clamp(7px,1.2vw,10px)] px-3 py-1.5"
          onClick={() => handleAction(action.prompt)}
          disabled={!isConnected}
          title={action.label}
        >
          <action.icon className="h-4 w-4 shrink-0" />
          <span className="transition-opacity duration-200 group-hover:opacity-100 md:group-[.overflow]:opacity-0">
            {action.label}
          </span>
        </Button>
      ))}
    </div>
  );
}