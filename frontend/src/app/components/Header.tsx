import { useState } from "react";
import { Trash2, ChevronDown, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onClearChat: () => void;
  onToggleSidebar: () => void;
}

const MODELS = [
  { id: "xynova-4", label: "XYNOVA 0.3", badge: "Latest" },
  { id: "xynova-3.5", label: "XYNOVA 0.2", badge: "Fast" },
  { id: "xynova-mini", label: "XYNOVA Mini", badge: null },
];

export function Header({ isDark, onToggleTheme, onClearChat, onToggleSidebar }: HeaderProps) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const bg = isDark ? "#0f172a" : "#ffffff";
  const border = isDark ? "#374151" : "#e5e7eb";
  const text = isDark ? "#f9fafb" : "#111827";
  const textSec = isDark ? "#9ca3af" : "#6b7280";
  const surface = isDark ? "#1f2937" : "#f3f4f6";
  const hover = isDark ? "#374151" : "#e5e7eb";

  return (
    <header
      className="flex items-center justify-between px-4 py-3 relative z-10"
      style={{
        background: bg,
        borderBottom: `1px solid ${border}`,
        fontFamily: "'Inter', sans-serif",
        minHeight: "60px",
      }}
    >
      {/* Left: hamburger + model selector */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onToggleSidebar}
          className="flex items-center justify-center w-9 h-9 rounded-xl md:hidden transition-colors duration-150"
          style={{ color: textSec, background: surface }}
        >
          <Menu size={18} />
        </button>

        {/* Model Selector */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-150"
            style={{
              background: surface,
              border: `1px solid ${border}`,
              color: text,
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            <span>{selectedModel.label}</span>
            {selectedModel.badge && (
              <span
                className="px-1.5 py-0.5 rounded-md"
                style={{
                  background: isDark ? "#0ea5e920" : "#eff6ff",
                  color: isDark ? "#38bdf8" : "#2563eb",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                }}
              >
                {selectedModel.badge}
              </span>
            )}
            <ChevronDown
              size={14}
              style={{
                color: textSec,
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div
                className="absolute top-full left-0 mt-1.5 rounded-xl overflow-hidden z-20"
                style={{
                  background: isDark ? "#1f2937" : "#ffffff",
                  border: `1px solid ${border}`,
                  boxShadow: isDark
                    ? "0 10px 30px rgba(0,0,0,0.4)"
                    : "0 10px 30px rgba(0,0,0,0.08)",
                  minWidth: "180px",
                }}
              >
                {MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model);
                      setDropdownOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-4 py-2.5 text-left transition-colors duration-150"
                    style={{
                      color: text,
                      fontSize: "0.8125rem",
                      background: selectedModel.id === model.id ? (isDark ? "#0ea5e910" : "#eff6ff") : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = isDark ? "#374151" : "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        selectedModel.id === model.id ? (isDark ? "#0ea5e910" : "#eff6ff") : "transparent";
                    }}
                  >
                    <span>{model.label}</span>
                    {model.badge && (
                      <span
                        className="px-1.5 py-0.5 rounded-md"
                        style={{
                          background: isDark ? "#0ea5e920" : "#eff6ff",
                          color: isDark ? "#38bdf8" : "#2563eb",
                          fontSize: "0.65rem",
                          fontWeight: 600,
                        }}
                      >
                        {model.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Clear chat */}
        <button
          onClick={onClearChat}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-150"
          style={{
            color: textSec,
            fontSize: "0.8125rem",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = surface;
            (e.currentTarget as HTMLButtonElement).style.color = text;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = textSec;
          }}
          title="Clear chat"
        >
          <Trash2 size={15} />
          <span className="hidden sm:inline">Clear</span>
        </button>

        {/* Theme toggle */}
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

        {/* Avatar */}
        <div
          className="flex items-center justify-center w-9 h-9 rounded-full select-none cursor-pointer"
          style={{
            background: isDark ? "#0ea5e9" : "#2563eb",
            color: "#fff",
            fontSize: "0.8125rem",
            fontWeight: 600,
            letterSpacing: "0.03em",
          }}
          title="Profile"
        >
          XY
        </div>
      </div>
    </header>
  );
}
