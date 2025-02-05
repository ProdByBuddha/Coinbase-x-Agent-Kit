import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  content: string;
  type: "user" | "agent" | "tool";
  timestamp: string | Date;
}

export default function MessageBubble({ content, type, timestamp }: MessageBubbleProps) {
  const isUser = type === "user";
  const timeString = timestamp instanceof Date 
    ? timestamp.toLocaleTimeString()
    : new Date(timestamp).toLocaleTimeString();

  return (
    <div className={cn(
      "flex flex-col gap-1 mb-4",
      isUser ? "items-end" : "items-start"
    )}>
      {type === "agent" && <span className="text-xs text-muted-foreground ml-3 mb-1">Agent:</span>}
      <Card className={cn(
        "max-w-[80%] p-4 backdrop-blur-sm animate-in slide-in-from-bottom-2 duration-300",
        isUser ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg" : "bg-white/90 text-foreground shadow-md",
        type === "tool" && "border-l-4 border-accent ring-1 ring-accent/20"
      )}>
        <div className="prose prose-sm dark:prose-invert max-w-none text-current whitespace-pre-wrap break-words leading-normal [&_p]:my-0 [&_code]:bg-yellow-400/20 [&_code]:text-yellow-400">
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>
      </Card>
      <span className="text-xs text-muted-foreground">
        {timeString}
      </span>
    </div>
  );
}