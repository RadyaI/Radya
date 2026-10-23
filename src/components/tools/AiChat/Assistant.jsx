"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { X, Send, Bot, Zap, Sparkles, Cat, MessageCircleCode, Triangle, RefreshCw } from "lucide-react";
import "./custom.css";

const PROVIDERS = [
  {
    id: "groq",
    label: "Llama 3.3",
    title: "Groq",
    thinking: "groq lagi ngetik",
    placeholder: "> tanya llama...",
    Icon: Zap,
    Avatar: Cat,
    Float: MessageCircleCode,
  },
  {
    id: "gemini",
    label: "Gemini 2.5",
    title: "Gemini",
    thinking: "gemini lagi mikir",
    placeholder: "> tanya gemini...",
    Icon: Sparkles,
    Avatar: Bot,
    Float: Bot,
  },
  {
    id: "claude",
    label: "Haiku 4.5",
    title: "Claude",
    thinking: "claude lagi mikir",
    placeholder: "> tanya claude...",
    Icon: Triangle,
    Avatar: Triangle,
    Float: Triangle,
  },
];

const mdComponents = {
  p: (props) => <p className="mb-2 last:mb-0" {...props} />,
  strong: (props) => <strong className="font-black" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  ul: (props) => <ul className="mb-2 ml-4 list-square space-y-1 last:mb-0" {...props} />,
  ol: (props) => <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  a: (props) => (
    <a
      className="font-bold underline decoration-2 underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: (props) => (
    <code className="border border-current px-1 font-mono text-[0.85em] font-bold" {...props} />
  ),
  pre: (props) => (
    <pre className="my-2 overflow-x-auto border-2 border-current p-2 font-mono text-xs" {...props} />
  ),
};

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: "Halo! Aku AI Assistant-nya Radya. Mau nanya apa nih soal Radya atau projectnya?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [providerIndex, setProviderIndex] = useState(0);

  const provider = PROVIDERS[providerIndex];
  const listRef = useRef(null);
  const inputRef = useRef(null);

  /* scroll di dalam list saja (tidak menggeser halaman) */
  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  /* fokus ke input saat dibuka, Esc untuk menutup */
  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const cycleProvider = () => setProviderIndex((i) => (i + 1) % PROVIDERS.length);

  const fetchAIResponse = async (history, providerId) => {
    const response = await fetch(`/api/chat/${providerId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ history, persona: "radya" }),
    });

    if (!response.ok) {
      let errorMessage = "Terjadi kesalahan pada server.";
      const rawResponseText = await response.text();

      try {
        const errorData = JSON.parse(rawResponseText);
        switch (response.status) {
          case 400: errorMessage = "Format pesan tidak valid."; break;
          case 413: errorMessage = "Pesan sudah terlalu panjang. refresh dulu yaa."; break;
          case 429: errorMessage = "Kamu terlalu cepat kirim pesan. Tunggu sebentar ya ⏳"; break;
          case 500: errorMessage = "Waduh AInya lagi bermasalah. Coba lagi nanti."; break;
          default: errorMessage = errorData?.error ?? "Terjadi kesalahan tidak diketahui.";
        }
      } catch {
        console.error("Gagal parse JSON. Respons mentah dari server:", rawResponseText);
        errorMessage = `Server error (${response.status}). Coba lagi nanti.`;
      }
      const error = new Error(errorMessage);
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    return data.text;
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", text: input.trim() };
    const updatedHistory = [...messages, userMessage];

    setMessages(updatedHistory);
    setInput("");
    setIsLoading(true);

    const currentProviderId = provider.id;
    const currentTitle = provider.title;

    try {
      let replyText = "";

      try {
        replyText = await fetchAIResponse(updatedHistory, currentProviderId);
      } catch (primaryError) {
        console.warn(`${currentProviderId} Error:`, primaryError);

        /* fallback ke groq kalau provider utama gagal */
        if (currentProviderId !== "groq") {
          setMessages((prev) => [
            ...prev,
            {
              role: "model",
              text: `⚠️ **${currentTitle} lagi bermasalah / kena limit.**\n\n*Aku pindahin ke Groq ya, bentar...*`,
            },
          ]);
          setProviderIndex(0);
          replyText = await fetchAIResponse(updatedHistory, "groq");
        } else {
          throw primaryError;
        }
      }

      if (replyText) setMessages((prev) => [...prev, { role: "model", text: replyText }]);
    } catch (finalError) {
      console.error("Final Error:", finalError);
      const friendlyMessage =
        finalError.status === 429
          ? "⏳ Kamu terlalu cepat kirim pesan. Tunggu sebentar ya."
          : "Yah, lagi ada masalah di server. Coba lagi nanti ya 😥";
      setMessages((prev) => [...prev, { role: "model", text: friendlyMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  const { Icon, Avatar, Float } = provider;

  return (
    <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-4 z-[99] cursor-default font-mono text-black md:bottom-6 md:right-6">
      <style>{`
        @keyframes ai-blink { 0%, 100% { opacity: 1 } 50% { opacity: 0.15 } }
        .ai-dot { animation: ai-blink 0.9s steps(1) infinite; }
        .ai-dot:nth-child(2) { animation-delay: 0.15s; }
        .ai-dot:nth-child(3) { animation-delay: 0.3s; }
        @media (prefers-reduced-motion: reduce) { .ai-dot { animation: none; } }
        .ai-scroll::-webkit-scrollbar { width: 8px; }
        .ai-scroll::-webkit-scrollbar-track { background: #fff; border-left: 2px solid #000; }
        .ai-scroll::-webkit-scrollbar-thumb { background: #000; }
        .ai-scroll { scrollbar-width: thin; scrollbar-color: #000 #fff; }
      `}</style>

      {/* ===== jendela chat ===== */}
      <section
        role="dialog"
        aria-label="Chat dengan RadyAI"
        aria-hidden={!isOpen}
        className={`absolute bottom-[4.25rem] right-0 flex h-[520px] max-h-[70dvh] w-[360px] max-w-[calc(100vw-2rem)] origin-bottom-right flex-col border-4 border-black bg-white shadow-[8px_8px_0_0_#000] transition-all duration-200 ${
          isOpen ? "visible translate-y-0 rotate-0 scale-100 opacity-100" : "invisible translate-y-6 rotate-2 scale-95 opacity-0"
        }`}
      >
        {/* title bar */}
        <div className="flex shrink-0 items-stretch justify-between border-b-4 border-black bg-black text-white">
          <button
            type="button"
            onClick={cycleProvider}
            title="Klik buat ganti model AI"
            aria-label={`Model saat ini ${provider.title} ${provider.label}. Klik untuk ganti model.`}
            className="group flex min-w-0 items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-dashed focus-visible:outline-white"
          >
            <Icon className="h-5 w-5 shrink-0 stroke-[2.5px]" aria-hidden />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-60">
                model radyai · {providerIndex + 1}/{PROVIDERS.length}
              </span>
              <span className="truncate text-sm font-black uppercase">{provider.label}</span>
            </span>
            <RefreshCw className="h-3.5 w-3.5 shrink-0 stroke-[3px] transition-transform duration-300 group-hover:rotate-180" aria-hidden />
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Tutup chat"
            className="flex w-12 shrink-0 items-center justify-center border-l-4 border-white transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-dashed focus-visible:outline-white"
          >
            <X className="h-5 w-5 stroke-[3px]" aria-hidden />
          </button>
        </div>

        {/* pesan */}
        <div
          ref={listRef}
          className="ai-scroll flex-1 space-y-5 overflow-y-auto overflow-x-hidden bg-[radial-gradient(#0002_1px,transparent_1px)] [background-size:14px_14px] p-4"
          aria-live="polite"
        >
          {messages.map((msg, idx) => {
            const isUser = msg.role === "user";
            return (
              <div key={idx} className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
                {!isUser && (
                  <div className="flex h-8 w-8 shrink-0 -rotate-3 items-center justify-center border-2 border-black bg-black text-white">
                    <Avatar className="h-4 w-4" aria-hidden />
                  </div>
                )}
                <div
                  className={`max-w-[85%] overflow-hidden border-2 border-black p-3 text-sm leading-relaxed ${
                    isUser
                      ? "rotate-[0.6deg] bg-black text-white shadow-[3px_3px_0_0_#888]"
                      : "-rotate-[0.4deg] bg-white shadow-[3px_3px_0_0_#000]"
                  }`}
                >
                  <ReactMarkdown components={mdComponents}>{msg.text}</ReactMarkdown>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5" role="status">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-black bg-white">
                <Avatar className="h-4 w-4" aria-hidden />
              </div>
              <div className="flex items-center gap-2 border-2 border-dashed border-black bg-white px-3 py-2 text-xs font-bold uppercase">
                {provider.thinking}
                <span className="flex gap-1" aria-hidden>
                  <i className="ai-dot h-1.5 w-1.5 bg-black" />
                  <i className="ai-dot h-1.5 w-1.5 bg-black" />
                  <i className="ai-dot h-1.5 w-1.5 bg-black" />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* input */}
        <form onSubmit={handleSend} className="flex shrink-0 gap-2 border-t-4 border-black bg-white p-3">
          <label htmlFor="ai-input" className="sr-only">
            Tulis pertanyaan
          </label>
          <input
            id="ai-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={provider.placeholder}
            disabled={isLoading}
            autoComplete="off"
            className="min-w-0 flex-1 border-2 border-black bg-white px-3 py-2 text-sm font-bold placeholder:text-black/40 focus:shadow-[3px_3px_0_0_#000] focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Kirim pertanyaan"
            className="flex w-11 shrink-0 items-center justify-center border-2 border-black bg-black text-white shadow-[3px_3px_0_0_#000] transition-all duration-150 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            <Send className="h-4 w-4 stroke-[2.5px]" aria-hidden />
          </button>
        </form>
      </section>

      {/* ===== tombol floating ===== */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Tutup chat AI" : "Buka chat AI"}
        aria-expanded={isOpen}
        className={`relative flex h-14 w-14 items-center justify-center border-4 border-black shadow-[5px_5px_0_0_#000] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dashed focus-visible:outline-black active:translate-x-1 active:translate-y-1 active:shadow-none ${
          isOpen ? "rotate-6 bg-white text-black" : "-rotate-3 bg-black text-white hover:rotate-0"
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 stroke-[3px]" aria-hidden />
        ) : (
          <>
            <Float className="h-7 w-7" aria-hidden />
            <span
              aria-hidden
              className="absolute -right-3 -top-3 rotate-12 border-2 border-black bg-white px-1 text-[9px] font-black uppercase text-black shadow-[2px_2px_0_0_#000]"
            >
              ai
            </span>
          </>
        )}
      </button>
    </div>
  );
}