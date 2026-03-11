import { useState, useEffect, useCallback } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { ChatContainer } from "./components/ChatContainer";
import { ChatInput } from "./components/ChatInput";
import { Message } from "./components/MessageBubble";

const API_URL = "http://localhost:5000/api/chat";

interface ChatSession {
  id: string;
  title: string;
  time: string;
  messages: Message[];
}

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

let _counter = 100;
const genId = () => `msg-${++_counter}-${Date.now()}`;

let _chatCounter = 10;
const genChatId = () => `chat-${++_chatCounter}-${Date.now()}`;

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string>("new");
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Theme sync
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.body.style.background = isDark ? "#0f172a" : "#f9fafb";
  }, [isDark]);

  // Responsive check
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Select chat
  const handleSelectChat = (id: string) => {
    const selected = chatSessions.find((s) => s.id === id);
    if (!selected) return;

    setActiveChatId(id);
    setCurrentMessages(selected.messages);
    if (isMobile) setSidebarOpen(false);
  };

  // New chat
  const handleNewChat = () => {
    setActiveChatId("new");
    setCurrentMessages([]);
    if (isMobile) setSidebarOpen(false);
  };

  // Clear chat
  const handleClearChat = () => {
    if (activeChatId === "new") {
      setCurrentMessages([]);
      return;
    }

    setChatSessions((prev) =>
      prev.map((s) =>
        s.id === activeChatId ? { ...s, messages: [] } : s
      )
    );
    setCurrentMessages([]);
  };

  const handleSend = useCallback(
    async (text: string) => {
      const userMsg: Message = {
        id: genId(),
        role: "user",
        content: text,
        timestamp: formatTime(),
      };

      const newMessages = [...currentMessages, userMsg];
      setCurrentMessages(newMessages);

      let chatId = activeChatId;

      // Create new chat
      if (activeChatId === "new") {
        const session: ChatSession = {
          id: genChatId(),
          title: text.length > 42 ? text.slice(0, 42) + "…" : text,
          time: "Just now",
          messages: newMessages,
        };

        setChatSessions((prev) => [session, ...prev]);
        setActiveChatId(session.id);
        chatId = session.id;
      } else {
        setChatSessions((prev) =>
          prev.map((s) =>
            s.id === activeChatId ? { ...s, messages: newMessages } : s
          )
        );
      }

      try {
        setIsTyping(true);

        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            history: newMessages,
          }),
        });

        if (!res.ok) throw new Error("Server error");

        const data = await res.json();

        const aiMsg: Message = {
          id: genId(),
          role: "assistant",
          content: data.reply,
          timestamp: formatTime(),
        };

        setCurrentMessages((prev) => [...prev, aiMsg]);

        setChatSessions((prev) =>
          prev.map((s) =>
            s.id === chatId
              ? { ...s, messages: [...newMessages, aiMsg] }
              : s
          )
        );
      } catch (err) {
        console.error(err);

        const errorMsg: Message = {
          id: genId(),
          role: "assistant",
          content: "Server error. Please try again.",
          timestamp: formatTime(),
        };

        setCurrentMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsTyping(false);
      }
    },
    [currentMessages, activeChatId]
  );

  const bg = isDark ? "#0f172a" : "#f9fafb";

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: bg, fontFamily: "'Inter', sans-serif", transition: "background 0.2s" }}
    >
      <div>
        <Sidebar
          isDark={isDark}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          chatHistory={chatSessions}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0 h-screen">
        <Header
          isDark={isDark}
          onToggleTheme={() => setIsDark((v) => !v)}
          onClearChat={handleClearChat}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
        <ChatContainer messages={currentMessages} isDark={isDark} isTyping={isTyping} />
        <ChatInput isDark={isDark} onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}