import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { Send, Paperclip, Mic } from "lucide-react";

interface ChatInputProps {
  isDark: boolean;
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ isDark, onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const bg = isDark ? "#0f172a" : "#ffffff";
  const surface = isDark ? "#1f2937" : "#f9fafb";
  const border = isDark ? "#374151" : "#e5e7eb";
  const borderFocused = isDark ? "#0ea5e9" : "#2563eb";
  const text = isDark ? "#f9fafb" : "#111827";
  const textSec = isDark ? "#6b7280" : "#9ca3af";
  const accentBg = isDark ? "#0ea5e9" : "#2563eb";

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;

    onSend(trimmed);
    setValue("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled) handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 180) + "px";
  };

  // Auto focus when enabled again
  useEffect(() => {
    if (!disabled) {
      textareaRef.current?.focus();
    }
  }, [disabled]);

  return (
    <div
      className="px-4 py-4"
      style={{
        background: bg,
        borderTop: `1px solid ${border}`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "860px" }}>
        <div
          className="flex items-end gap-3 px-4 py-3 rounded-2xl transition-all duration-200"
          style={{
            background: surface,
            border: `1.5px solid ${focused ? borderFocused : border}`,
            boxShadow: focused
              ? `0 0 0 3px ${isDark ? "#0ea5e920" : "#2563eb15"}`
              : isDark
                ? "none"
                : "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* Attachment */}
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 mb-0.5"
            style={{ color: textSec }}
            disabled={disabled}
          >
            <Paperclip size={17} />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onInput={handleInput}
            placeholder="Message XYNOVA…"
            rows={1}
            disabled={disabled}
            className="flex-1 resize-none outline-none bg-transparent"
            style={{
              color: text,
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              maxHeight: "180px",
              overflowY: "auto",
            }}
          />

          {/* Mic */}
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 mb-0.5"
            style={{ color: textSec }}
            disabled={disabled}
          >
            <Mic size={17} />
          </button>

          {/* Send */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 transition-all duration-150 mb-0.5"
            style={{
              background:
                value.trim() && !disabled
                  ? accentBg
                  : isDark
                    ? "#374151"
                    : "#e5e7eb",
              color:
                value.trim() && !disabled ? "#ffffff" : textSec,
              cursor:
                value.trim() && !disabled ? "pointer" : "not-allowed",
              opacity: disabled ? 0.7 : 1,
            }}
          >
            <Send size={15} />
          </button>
        </div>

        <p
          className="text-center mt-2"
          style={{ color: textSec, fontSize: "0.7rem" }}
        >
          XYNOVA can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}