import { Button } from "@/components/ui/button";
import { MessageSquare, Bot } from "lucide-react";

interface ModeSelectorProps {
  mode: "chat" | "auto";
  onChange: (mode: "chat" | "auto") => void;
}

export default function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="flex gap-2 w-full">
      <Button
        variant={mode === "chat" ? "default" : "outline"}
        onClick={() => onChange("chat")}
        className="flex gap-2 flex-1 md:flex-none"
      >
        <MessageSquare className="h-4 w-4" />
        Chat Mode
      </Button>
      <Button
        variant={mode === "auto" ? "default" : "outline"}
        onClick={() => onChange("auto")}
        className="flex gap-2"
      >
        <Bot className="h-4 w-4" />
        Auto Mode
      </Button>
    </div>
  );
}
