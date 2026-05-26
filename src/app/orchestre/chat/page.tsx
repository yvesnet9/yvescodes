"use client";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
  filePreview?: string;
}

interface UploadedFile {
  data: string;
  mediaType: string;
  type: "image" | "document";
  name: string;
  preview?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "assistant", content: "Bonjour. Posez-moi n\'importe quelle question. Vous pouvez aussi joindre une image ou un PDF." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) window.location.href = "/orchestre/login";
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/orchestre/login";
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isPDF = file.type === "application/pdf";
    if (!isImage && !isPDF) {
      alert("Formats acceptes : images (JPG, PNG, WebP) et PDF.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      setUploadedFile({
        data: base64,
        mediaType: file.type,
        type: isImage ? "image" : "document",
        name: file.name,
        preview: isImage ? result : undefined,
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const send = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;
    setInput("");
    setLoading(true);

    const fileToSend = uploadedFile;
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      filePreview: fileToSend?.preview,
    };
    const loadingMsg: Message = { id: Date.now() + "l", role: "assistant", content: "", loading: true };
    setMessages(prev => [...prev, userMsg, loadingMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          file: fileToSend ? { data: fileToSend.data, mediaType: fileToSend.mediaType, type: fileToSend.type } : undefined,
        }),
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
      <div style={{ padding: "14px 20px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10, background: "rgba(9,9,11,0.95)", flexShrink: 0 }}>
        <a href="/orchestre" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 13 }}>←</a>
        <span style={{ fontSize: 18 }}>🎼</span>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Un Orchestre</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <a href="/orchestre/pricing" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textDecoration: "none", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "3px 8px" }}>Credits</a>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1D9E75", display: "inline-block" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>En ligne</span>
          <button onClick={handleLogout} style={{ marginLeft: 4, fontSize: 11, color: "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer" }}>Deconnexion</button>
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
            <div style={{ maxWidth: "75%", display: "flex", flexDirection: "column", gap: 6, alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
              {msg.filePreview && (
                <img src={msg.filePreview} alt="fichier joint" style={{ maxWidth: 200, borderRadius: 8, border: "0.5px solid rgba(255,255,255,0.1)" }} />
              )}
              <div style={{
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "12px 12px 3px 12px" : "3px 12px 12px 12px",
                background: msg.role === "user" ? "rgba(127,119,221,0.15)" : "rgba(255,255,255,0.04)",
                border: msg.role === "user" ? "0.5px solid rgba(127,119,221,0.25)" : "0.5px solid rgba(255,255,255,0.07)",
                fontSize: 14, lineHeight: 1.65,
                color: msg.role === "user" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.8)",
                fontWeight: 300, whiteSpace: "pre-wrap",
              }}>
                {msg.loading ? (
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {[0,1,2].map(i => (
                      <span key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "inline-block", animation: `pulse 1.2s ${i*0.2}s ease-in-out infinite` }} />
                    ))}
                  </div>
                ) : msg.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Upload preview */}
      {uploadedFile && (
        <div style={{ maxWidth: 720, width: "100%", margin: "0 auto", padding: "0 20px 8px", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(127,119,221,0.08)", border: "0.5px solid rgba(127,119,221,0.2)", borderRadius: 8, padding: "8px 12px" }}>
            {uploadedFile.preview ? (
              <img src={uploadedFile.preview} alt="" style={{ width: 32, height: 32, borderRadius: 4, objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: 20 }}>📄</span>
            )}
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{uploadedFile.name}</span>
            <button onClick={removeFile} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 16, lineHeight: 1 }}>×</button>
          </div>
        </div>
      )}

      {/* Input */}
      <div style={{ padding: "12px 20px 16px", borderTop: "0.5px solid rgba(255,255,255,0.06)", background: "rgba(9,9,11,0.95)", flexShrink: 0 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 8, alignItems: "flex-end" }}>
          <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={handleFileChange} style={{ display: "none" }} />
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18, color: uploadedFile ? "#7F77DD" : "rgba(255,255,255,0.35)" }}
            title="Joindre un fichier"
          >
            📎
          </button>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }}}
            placeholder={uploadedFile ? "Posez une question sur ce fichier..." : "Posez votre question..."}
            rows={1}
            style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "11px 14px", color: "#fafafa", fontSize: 14, fontFamily: "\'DM Sans\', sans-serif", fontWeight: 300, resize: "none", outline: "none", lineHeight: 1.5 }}
          />
          <button onClick={send} disabled={loading || !input.trim()}
            style={{ width: 40, height: 40, borderRadius: 10, background: loading || !input.trim() ? "rgba(255,255,255,0.05)" : "rgba(127,119,221,0.8)", border: "0.5px solid rgba(255,255,255,0.1)", cursor: loading || !input.trim() ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
            ↑
          </button>
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.12)", marginTop: 8 }}>
          Entree pour envoyer · 📎 pour joindre image ou PDF
        </p>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:.3} 50%{opacity:1} }`}</style>
    </main>
  );
}
