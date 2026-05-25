"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content: "Bonjour. Posez-moi n\'importe quelle question.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;
    setInput("");
    setLoading(true);

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: prompt };
    const loadingMsg: Message = { id: Date.now() + "l", role: "assistant", content: "", loading: true };
    setMessages(prev => [...prev, userMsg, loadingMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setMessages(prev =>
        prev.map(m => m.id === loadingMsg.id
          ? { ...m, content: data.response || "Une erreur est survenue.", loading: false }
          : m
        )
      );
    } catch {
      setMessages(prev =>
        prev.map(m => m.id === loadingMsg.id
          ? { ...m, content: "Erreur reseau. Reessayez.", loading: false }
          : m
        )
      );
    }
    setLoading(false);
  };

  return (
    <main style={{ fontFamily: "\'DM Sans\', sans-serif", background: "#09090b", color: "#fafafa", height: "100vh", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "14px 20px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10, background: "rgba(9,9,11,0.95)", backdropFilter: "blur(12px)", flexShrink: 0 }}>
        <a href="/orchestre" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          <span>←</span>
        </a>
        <span style={{ fontSize: 18 }}>🎼</span>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Un Orchestre</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1D9E75", display: "inline-block" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>En ligne</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 16, maxWidth: 720, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(127,119,221,0.15)", border: "0.5px solid rgba(127,119,221,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, marginRight: 10, marginTop: 2 }}>
                🎼
              </div>
            )}
            <div style={{
              maxWidth: "75%",
              padding: "10px 14px",
              borderRadius: msg.role === "user" ? "12px 12px 3px 12px" : "3px 12px 12px 12px",
              background: msg.role === "user" ? "rgba(127,119,221,0.15)" : "rgba(255,255,255,0.04)",
              border: msg.role === "user" ? "0.5px solid rgba(127,119,221,0.25)" : "0.5px solid rgba(255,255,255,0.07)",
              fontSize: 14,
              lineHeight: 1.65,
              color: msg.role === "user" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.8)",
              fontWeight: 300,
              whiteSpace: "pre-wrap",
            }}>
              {msg.loading ? (
                <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "2px 0" }}>
                  {[0,1,2].map(i => (
                    <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "inline-block", animation: `pulse 1.2s ${i*0.2}s ease-in-out infinite` }} />
                  ))}
                </div>
              ) : msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "16px 20px", borderTop: "0.5px solid rgba(255,255,255,0.06)", background: "rgba(9,9,11,0.95)", flexShrink: 0 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}}
            placeholder="Posez votre question..."
            rows={1}
            style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "11px 14px", color: "#fafafa", fontSize: 14, fontFamily: "\'DM Sans\', sans-serif", fontWeight: 300, resize: "none", outline: "none", lineHeight: 1.5 }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{ width: 40, height: 40, borderRadius: 10, background: loading || !input.trim() ? "rgba(255,255,255,0.05)" : "rgba(127,119,221,0.8)", border: "0.5px solid rgba(255,255,255,0.1)", cursor: loading || !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16, transition: "all 0.2s" }}
          >
            ↑
          </button>
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.15)", marginTop: 10 }}>
          Entree pour envoyer · Shift+Entree pour nouvelle ligne
        </p>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }`}</style>
    </main>
  );
}
