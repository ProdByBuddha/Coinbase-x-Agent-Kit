
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
      <Card className={cn(
        "max-w-[80%] p-3",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        type === "tool" && "border-l-4 border-accent"
      )}>
        <div className="prose prose-sm dark:prose-invert max-w-none text-current whitespace-pre-wrap break-words leading-none">
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
