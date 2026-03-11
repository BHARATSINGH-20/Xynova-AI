import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:scale-105"
      style={{
        background: isDark ? "#1f2937" : "#f3f4f6",
        border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
        color: isDark ? "#f9fafb" : "#111827",
      }}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={16} strokeWidth={2} />
      ) : (
        <Moon size={16} strokeWidth={2} />
      )}
    </button>
  );
}
