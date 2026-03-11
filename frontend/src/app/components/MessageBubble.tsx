import { Zap, User, Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: string; // optional now
}

interface MessageBubbleProps {
  message: Message;
  isDark: boolean;
}

function CodeBlock({ code, isDark }: { code: string; isDark: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden my-3"
      style={{
        background: isDark ? "#0d1117" : "#1e293b",
        border: `1px solid ${isDark ? "#30363d" : "#334155"}`,
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ borderBottom: `1px solid ${isDark ? "#30363d" : "#334155"}` }}
      >
        <span style={{ color: "#94a3b8", fontSize: "0.75rem", fontWeight: 500 }}>
          code
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5"
          style={{ color: copied ? "#4ade80" : "#94a3b8", fontSize: "0.75rem" }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        className="overflow-x-auto px-4 py-3"
        style={{
          color: "#e2e8f0",
          fontSize: "0.8125rem",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function parseContent(content: string, isDark: boolean) {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts.map((part, i) => {
    if (part.startsWith("```") && part.endsWith("```")) {
      const code = part.slice(3, -3).replace(/^[a-z]*\n/, "");
      return <CodeBlock key={i} code={code} isDark={isDark} />;
    }

    // bold support
    const boldParsed = part.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) => {
      if (chunk.startsWith("**") && chunk.endsWith("**")) {
        return <strong key={j}>{chunk.slice(2, -2)}</strong>;
      }
      return chunk;
    });

    return (
      <span key={i} style={{ whiteSpace: "pre-wrap" }}>
        {boldParsed}
      </span>
    );
  });
}

export function MessageBubble({ message, isDark }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const [liked, setLiked] = useState<null | "up" | "down">(null);

  const userBubbleBg = isDark ? "#1e40af" : "#2563eb";
  const aiBubbleBg = isDark ? "#1f2937" : "#f3f4f6";
  const aiBubbleBorder = isDark ? "#374151" : "#e5e7eb";
  const aiText = isDark ? "#f9fafb" : "#111827";
  const textSec = isDark ? "#6b7280" : "#9ca3af";

  const timestamp =
    message.timestamp ||
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} mb-6`}>
      {/* Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        {isUser ? (
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{ background: isDark ? "#1e40af" : "#2563eb" }}
          >
            <User size={15} color="#fff" />
          </div>
        ) : (
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: isDark ? "#0ea5e9" : "#2563eb" }}
          >
            <Zap size={14} color="#fff" fill="#fff" />
          </div>
        )}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col gap-1 max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className="px-4 py-3 rounded-2xl"
          style={{
            background: isUser ? userBubbleBg : aiBubbleBg,
            border: isUser ? "none" : `1px solid ${aiBubbleBorder}`,
            color: isUser ? "#ffffff" : aiText,
            fontSize: "0.9rem",
            lineHeight: 1.65,
            borderTopRightRadius: isUser ? "4px" : "16px",
            borderTopLeftRadius: isUser ? "16px" : "4px",
          }}
        >
          {parseContent(message.content, isDark)}
        </div>

        {/* Timestamp + actions */}
        <div className={`flex items-center gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <span style={{ color: textSec, fontSize: "0.7rem" }}>
            {timestamp}
          </span>

          {!isUser && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLiked(liked === "up" ? null : "up")}
                style={{
                  color:
                    liked === "up"
                      ? isDark
                        ? "#4ade80"
                        : "#16a34a"
                      : textSec,
                }}
              >
                <ThumbsUp size={12} />
              </button>

              <button
                onClick={() => setLiked(liked === "down" ? null : "down")}
                style={{
                  color:
                    liked === "down"
                      ? isDark
                        ? "#f87171"
                        : "#dc2626"
                      : textSec,
                }}
              >
                <ThumbsDown size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}