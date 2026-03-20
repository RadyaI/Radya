"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Loader2, Sparkles, Zap, Cat, MessageCircleCode, Triangle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import './custom.css'

const PROVIDERS = [
    {
        id: "groq",
        label: "Llama 3.3",
        title: "Groq",
        color: "text-orange-400",
        bg: "bg-orange-500/20",
        btnBg: "bg-orange-600 hover:bg-orange-500",
        windowBg: "bg-[#1a0a0a]",
        ring: "focus:ring-orange-500/50",
        thinking: "Groq lagi ngetik...",
        placeholder: "Tanya Llama...",
        icon: (cls) => <Zap className={`w-5 h-5 ${cls} animate-pulse`} />,
        avatarIcon: (cls) => <Cat className={`w-4 h-4 ${cls}`} />,
        floatIcon: (cls) => <MessageCircleCode className={`w-7 h-7 ${cls}`} />,
    },
    {
        id: "gemini",
        label: "Gemini 2.5",
        title: "Gemini",
        color: "text-blue-400",
        bg: "bg-blue-500/20",
        btnBg: "bg-blue-600 hover:bg-blue-500",
        windowBg: "bg-[#0a0a0a]",
        ring: "focus:ring-blue-500/50",
        thinking: "Gemini lagi mikir...",
        placeholder: "Tanya Gemini...",
        icon: (cls) => <Sparkles className={`w-5 h-5 ${cls} animate-pulse`} />,
        avatarIcon: (cls) => <Bot className={`w-4 h-4 ${cls}`} />,
        floatIcon: (cls) => <Bot className={`w-7 h-7 ${cls}`} />,
    },
    {
        id: "claude",
        label: "Haiku 4.5",
        title: "Claude",
        color: "text-amber-400",
        bg: "bg-amber-500/20",
        btnBg: "bg-amber-600 hover:bg-amber-500",
        windowBg: "bg-[#0f0a00]",
        ring: "focus:ring-amber-500/50",
        thinking: "Claude lagi mikir...",
        placeholder: "Tanya Claude...",
        icon: (cls) => <Triangle className={`w-5 h-5 ${cls} animate-pulse`} />,
        avatarIcon: (cls) => <Triangle className={`w-4 h-4 ${cls}`} />,
        floatIcon: (cls) => <Triangle className={`w-7 h-7 ${cls}`} />,
    },
];

export default function Assistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "model", text: "Halo! Aku AI Assistant-nya Radya. Mau nanya apa nih soal Radya atau projectnya?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [providerIndex, setProviderIndex] = useState(0);

    const provider = PROVIDERS[providerIndex];
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const cycleProvider = () => {
        setProviderIndex(i => (i + 1) % PROVIDERS.length);
    };

    const fetchAIResponse = async (history, providerId) => {
        const endpoint = `/api/chat/${providerId}`;

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ history, persona: "radya" }),
        });

        if (!response.ok) {
            let errorMessage = "Terjadi kesalahan pada server.";
            try {
                const errorData = await response.json();
                switch (response.status) {
                    case 400: errorMessage = "Format pesan tidak valid."; break;
                    case 413: errorMessage = "Pesan sudah terlalu panjang. refresh dulu yaa."; break;
                    case 429: errorMessage = "Kamu terlalu cepat kirim pesan. Tunggu sebentar ya ⏳"; break;
                    case 500: errorMessage = "Waduh AInya lagi bermasalah. Coba lagi nanti."; break;
                    default: errorMessage = errorData?.error ?? "Terjadi kesalahan tidak diketahui.";
                }
            } catch {
                errorMessage = "Server error. Coba lagi nanti.";
            }
            const error = new Error(errorMessage);
            error.status = response.status;
            throw error;
        }

        const data = await response.json();
        return data.text;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userText = input.trim();
        const userMessage = { role: "user", text: userText };
        const updatedHistory = [...messages, userMessage];

        setMessages(updatedHistory);
        setInput("");
        setIsLoading(true);

        const currentProviderId = provider.id;

        try {
            let replyText = "";

            try {
                replyText = await fetchAIResponse(updatedHistory, currentProviderId);
            } catch (primaryError) {
                console.warn(`${currentProviderId} Error:`, primaryError);

                // Fallback ke groq kalau provider utama gagal
                if (currentProviderId !== "groq") {
                    setMessages(prev => [
                        ...prev,
                        {
                            role: "model",
                            text: `⚠️ **${provider.title} lagi bermasalah / kena limit.**\n\n*Aku pindahin ke Groq ya, bentar...*`,
                        },
                    ]);
                    setProviderIndex(0); // reset ke groq
                    replyText = await fetchAIResponse(updatedHistory, "groq");
                } else {
                    throw primaryError;
                }
            }

            if (replyText) {
                setMessages(prev => [...prev, { role: "model", text: replyText }]);
            }

        } catch (finalError) {
            console.error("Final Error:", finalError);
            const friendlyMessage = finalError.status === 429
                ? "⏳ Kamu terlalu cepat kirim pesan. Tunggu sebentar ya."
                : "Yah, lagi ada masalah di server. Coba lagi nanti ya 😥";

            setMessages(prev => [...prev, { role: "model", text: friendlyMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="cursor-default fixed bottom-6 right-6 z-[99] font-sans">

            <div className={`
                absolute bottom-16 right-0 w-[350px] max-w-[90vw] h-[500px] max-h-[80vh]
                bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden
                transition-all duration-300 origin-bottom-right
                ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10 pointer-events-none"}
            `}>

                <div className="cursor-pointer p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                    <div
                        className="flex items-center gap-2 cursor-pointer group select-none"
                        onClick={cycleProvider}
                        title="Klik buat ganti Model AI"
                    >
                        {provider.icon(provider.color)}
                        <div className="flex flex-col">
                            <span className="font-bold text-xs text-gray-500">MODEL RadyAI</span>
                            <span className={`font-bold text-sm ${provider.color}`}>
                                {provider.label}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && (
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${provider.bg}`}>
                                    {provider.avatarIcon(provider.color)}
                                </div>
                            )}
                            <div className={`
                                max-w-[85%] p-3 text-sm rounded-xl leading-relaxed shadow-sm overflow-hidden
                                ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-[#1a1a1a] text-gray-200 border border-white/10 rounded-tl-none'}
                            `}>
                                <ReactMarkdown
                                    components={{
                                        strong: ({ node, ...props }) => <span className="font-bold text-white" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc ml-4 mt-2 space-y-1" {...props} />,
                                        li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                                        p: ({ node, ...props }) => <p className="mb-0" {...props} />
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3 justify-start animate-pulse">
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                                <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
                            </div>
                            <div className="bg-[#222] text-gray-400 p-3 rounded-xl rounded-tl-none text-xs border border-white/5 italic">
                                {provider.thinking}
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-3 bg-black/40 border-t border-white/10 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={provider.placeholder}
                        className={`cursor-default flex-1 bg-[#222] text-white text-sm rounded-lg px-4 py-2 outline-none border border-white/5 focus:ring-1 ${provider.ring} placeholder:text-gray-600`}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className={`p-2 text-white rounded-lg transition-colors ${provider.btnBg}`}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border border-white/10
                    hover:scale-110 active:scale-95
                    ${isOpen ? "bg-red-500 rotate-90" : provider.windowBg}
                `}
            >
                {isOpen
                    ? <X className="w-6 h-6 text-white" />
                    : provider.floatIcon(provider.color)
                }
            </button>
        </div>
    );
}