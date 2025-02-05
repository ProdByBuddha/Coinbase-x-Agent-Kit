import MessageBubble from "./message-bubble";

type Message = {
  id: string;
  content: string;
  type: "user" | "agent" | "tool";
  timestamp: string | Date;
};

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <div className="flex flex-col">
      {messages.map(message => (
        <MessageBubble
          key={message.id}
          content={message.content}
          type={message.type}
          timestamp={message.timestamp}
        />
      ))}
      {messages.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No messages yet. Start a conversation!
        </div>
      )}
      {isLoading && (
        <div className="flex items-start mb-4">
          <Card className="max-w-[80%] p-3 bg-muted">
            <div className="flex gap-2 items-center">
              <span className="animate-pulse">●</span>
              <span className="animate-pulse delay-100">●</span>
              <span className="animate-pulse delay-200">●</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}