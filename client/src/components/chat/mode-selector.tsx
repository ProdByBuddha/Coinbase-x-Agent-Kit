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
        size="sm"
        className="flex gap-1.5 flex-1 md:flex-none text-xs md:text-sm py-1 h-7 md:h-8"
      >
        <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
        Chat
      </Button>
      <Button
        variant={mode === "auto" ? "default" : "outline"}
        onClick={() => onChange("auto")}
        size="sm"
        className="flex gap-1.5 flex-1 md:flex-none text-xs md:text-sm py-1 h-7 md:h-8"
      >
        <Bot className="h-3 w-3 md:h-4 md:w-4" />
        Auto
      </Button>
    </div>
  );
}
