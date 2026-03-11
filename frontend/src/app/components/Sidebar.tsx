import { Plus, MessageSquare, Settings, Zap, X } from "lucide-react";

interface ChatSession {
  id: string;
  title: string;
  time: string;
}

interface SidebarProps {
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
  chatHistory: ChatSession[];
  activeChatId: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

export function Sidebar({
  isDark,
  isOpen,
  onClose,
  chatHistory,
  activeChatId,
  onSelectChat,
  onNewChat,
}: SidebarProps) {
  const bg = isDark ? "#0f172a" : "#f9fafb";
  const border = isDark ? "#374151" : "#e5e7eb";
  const text = isDark ? "#f9fafb" : "#111827";
  const textSec = isDark ? "#9ca3af" : "#6b7280";
  const hover = isDark ? "#1f2937" : "#f3f4f6";
  const activeItem = isDark ? "#1e3a5f" : "#eff6ff";
  const activeText = isDark ? "#60a5fa" : "#2563eb";
  const accent = isDark ? "#0ea5e9" : "#2563eb";

  return (
    <aside
      className="flex flex-col h-full"
      style={{
        width: "260px",
        minWidth: "260px",
        background: bg,
        borderRight: `1px solid ${border}`,
        fontFamily: "'Inter', sans-serif",
        height: "100vh",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: `1px solid ${border}` }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ background: accent }}
          >
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span
            style={{
              color: text,
              letterSpacing: "0.08em",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            XYNOVA
          </span>
        </div>
        {/* Close button — visible always, useful on mobile */}
        <button
          onClick={onClose}
          className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-150"
          style={{ color: textSec }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = hover;
            (e.currentTarget as HTMLButtonElement).style.color = text;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = textSec;
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* New Chat */}
      <div className="px-4 py-3">
        <button
          onClick={onNewChat}
          className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{
            background: accent,
            color: "#fff",
            border: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
          }}
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div
        className="flex-1 overflow-y-auto px-3 pb-3"
        style={{ scrollbarWidth: "thin", scrollbarColor: `${border} transparent` }}
      >
        <p
          className="px-2 py-2 uppercase"
          style={{
            color: textSec,
            fontSize: "0.68rem",
            letterSpacing: "0.09em",
            fontWeight: 600,
          }}
        >
          Recent
        </p>
        <div className="flex flex-col gap-0.5">
          {chatHistory.map((chat) => {
            const isActive = activeChatId === chat.id;
            return (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className="flex items-start gap-3 w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150"
                style={{
                  background: isActive ? activeItem : "transparent",
                  color: isActive ? activeText : text,
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background = hover;
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <MessageSquare
                  size={15}
                  style={{ marginTop: 2, opacity: 0.65, flexShrink: 0 }}
                />
                <div className="min-w-0">
                  <p
                    className="truncate"
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {chat.title}
                  </p>
                  <p
                    style={{
                      color: textSec,
                      fontSize: "0.7rem",
                      marginTop: 1,
                    }}
                  >
                    {chat.time}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 py-3" style={{ borderTop: `1px solid ${border}` }}>
        <button
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl transition-all duration-150"
          style={{ color: textSec, fontSize: "0.8125rem" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = hover;
            (e.currentTarget as HTMLButtonElement).style.color = text;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = textSec;
          }}
        >
          <Settings size={16} />
          Settings
        </button>
      </div>
    </aside>
  );
}
