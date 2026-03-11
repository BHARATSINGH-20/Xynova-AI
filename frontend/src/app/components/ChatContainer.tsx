import { useEffect, useRef } from "react";
import { MessageBubble, Message } from "./MessageBubble";
import { Zap, Sparkles, Code2, Globe } from "lucide-react";

interface ChatContainerProps {
  messages: Message[];
  isDark: boolean;
  isTyping: boolean;
  onSendMessage: (message: string) => void; // 🔥 added
}

function TypingIndicator({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex gap-3 mb-6">
      <div
        className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
        style={{ background: isDark ? "#0ea5e9" : "#2563eb" }}
      >
        <Zap size={14} color="#fff" fill="#fff" />
      </div>
      <div
        className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
        style={{
          background: isDark ? "#1f2937" : "#f3f4f6",
          border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
          borderTopLeftRadius: "4px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-2 h-2 rounded-full"
            style={{
              background: isDark ? "#60a5fa" : "#2563eb",
              animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  "Explain quantum computing in simple terms",
  "Write a Python script to scrape a website",
  "Summarize today's news in bullet points",
  "Debug my React code and fix the issues",
];

function EmptyState({
  isDark,
  onSendMessage,
}: {
  isDark: boolean;
  onSendMessage: (message: string) => void;
}) {
  const text = isDark ? "#f9fafb" : "#111827";
  const textSec = isDark ? "#9ca3af" : "#6b7280";
  const surface = isDark ? "#1f2937" : "#ffffff";
  const border = isDark ? "#374151" : "#e5e7eb";
  const accentBg = isDark ? "#0ea5e915" : "#eff6ff";
  const accent = isDark ? "#38bdf8" : "#2563eb";

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12">
      <div
        className="flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
        style={{ background: isDark ? "#0ea5e9" : "#2563eb" }}
      >
        <Zap size={28} color="#fff" fill="#fff" />
      </div>

      <h1 style={{ color: text, fontSize: "1.75rem", fontWeight: 700, marginBottom: 8 }}>
        How can I help you?
      </h1>

      <p style={{ color: textSec, fontSize: "0.9375rem", marginBottom: 32 }}>
        Ask me anything — I'm XYNOVA.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {SUGGESTIONS.map((textValue) => (
          <div
            key={textValue}
            className="px-4 py-3 rounded-xl cursor-pointer transition-all duration-150"
            style={{
              background: surface,
              border: `1px solid ${border}`,
            }}
            onClick={() => onSendMessage(textValue)} // 🔥 now functional
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = accent;
              (e.currentTarget as HTMLDivElement).style.background = accentBg;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = border;
              (e.currentTarget as HTMLDivElement).style.background = surface;
            }}
          >
            <p style={{ color: text, fontSize: "0.8125rem", fontWeight: 500 }}>
              {textValue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChatContainer({
  messages,
  isDark,
  isTyping,
  onSendMessage,
}: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <>
      <style>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>

      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState isDark={isDark} onSendMessage={onSendMessage} />
        ) : (
          <div className="mx-auto px-4 py-6" style={{ maxWidth: "860px" }}>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} isDark={isDark} />
            ))}
            {isTyping && <TypingIndicator isDark={isDark} />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </>
  );
}