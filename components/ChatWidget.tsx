"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const QUICK_ACTIONS = [
  "Voglio comprare casa",
  "Voglio vendere casa",
  "Ho bisogno di una consulenza",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Ciao, sono l’assistente Immobilei. Posso aiutarti a orientarti tra acquisto, vendita e consulenza immobiliare.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(customMessage?: string) {
    const userMessage = (customMessage ?? input).trim();
    if (!userMessage || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            data.reply ||
            data.error ||
            "Al momento non riesco a rispondere. Riprova tra poco.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "C’è stato un problema tecnico. Riprova tra poco.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }

  const showQuickActions =
    messages.filter((m) => m.role === "user").length === 0 && !loading;

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Apri chat Immobilei"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-[var(--line)]/30 bg-[var(--brand-dark)] px-4 py-3 text-sm font-medium text-white shadow-2xl transition hover:scale-[1.02]"
      >
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-400" />
        Assistente
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[620px] w-[380px] flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-2xl"
          >
          <div className="border-b border-black/10 bg-[#f7f7f5] px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                    IM
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">
                      Immobilei Assistant
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                      <span className="text-[11px] text-black/45">
                        Online ora
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-black/55">
                  Un supporto rapido per aiutarti a capire come muoverti nel
                  mondo immobiliare.
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Chiudi chat"
                className="shrink-0 rounded-full border border-[var(--line)]/30 px-2.5 py-1 text-[11px] text-black/60 transition hover:bg-[var(--brand-dark)] hover:text-white"
              >
                Chiudi
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#f3f3f1] px-4 py-4">
            <div className="space-y-3">
              {messages.map((message, index) => {
                const isUser = message.role === "user";

                return (
                  <div
                    key={index}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? "rounded-br-md bg-black text-white"
                          : "rounded-bl-md border border-black/8 bg-white text-black"
                      }`}
                    >
                      {!isUser && (
                        <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-black/35">
                          Immobilei
                        </div>
                      )}
                      {message.text}
                    </div>
                  </div>
                );
              })}

              {showQuickActions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action}
                      onClick={() => sendMessage(action)}
                      className="rounded-full border border-[var(--line)]/30 bg-white px-3 py-2 text-xs text-black transition hover:border-[var(--brand-dark)] hover:bg-[var(--brand-dark)] hover:text-white"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[86%] rounded-2xl rounded-bl-md border border-black/8 bg-white px-4 py-3 text-sm text-black/60 shadow-sm">
                    Immobilei sta scrivendo...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-black/10 bg-white p-3">
            <div className="flex items-end gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Scrivi qui la tua domanda..."
                className="h-12 flex-1 rounded-full border border-[var(--line)]/30 bg-[#f7f7f5] px-4 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-[var(--brand-dark)]"
              />

              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="h-12 rounded-full bg-[var(--brand-dark)] px-5 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                Invia
              </button>
            </div>

            <div className="mt-3 flex items-start justify-between gap-3">
              <p className="text-[11px] leading-relaxed text-black/40">
                Le risposte sono orientative e non sostituiscono una consulenza
                professionale dedicata.
              </p>

              <button
                onClick={() =>
                  sendMessage("Vorrei essere ricontattato da Immobilei")
                }
                className="shrink-0 text-[11px] font-medium text-black underline underline-offset-4"
              >
                Richiedi contatto
              </button>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
