"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Loader2, Sparkles, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import './custom.css'

export default function Assistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "model", text: "Halo! Aku AI Assistant-nya Radya. Mau nanya apa nih soal Radya atau projectnya?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const [provider, setProvider] = useState("groq");

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const fetchAIResponse = async (history, currentProvider) => {
        const endpoint = currentProvider === "gemini" ? "/api/chat/gemini" : "/api/chat/groq";
        
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ history }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Server Error");
        }

        const data = await response.json();
        return data.text;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userText = input;
        const newUserMessage = { role: "user", text: userText };
        
        const updatedHistory = [...messages, newUserMessage];
        setMessages(updatedHistory);
        setInput("");
        setIsLoading(true);

        try {
            let replyText = "";

            if (provider === "gemini") {
                try {
                    replyText = await fetchAIResponse(updatedHistory, "gemini");
                } catch (geminiError) {
                    console.error("Gemini Error:", geminiError);
                    
                    setMessages(prev => [...prev, { 
                        role: "model", 
                        text: "⚠️ **Waduh Gemini lagi error/limit.**\n\n*Bentar ya, switch ke Llama (Groq)...*" 
                    }]);
                    setProvider("groq"); 
                    
                    replyText = await fetchAIResponse(updatedHistory, "groq");
                }
            } else {
                replyText = await fetchAIResponse(updatedHistory, "groq");
            }

            if (replyText) {
                setMessages(prev => [...prev, { role: "model", text: replyText }]);
            }

        } catch (error) {
            console.error("Final Error:", error);
            setMessages(prev => [...prev, { role: "model", text: "Yah sori, server lagi sibuk banget nih. Coba refresh atau tunggu bentar ya!" }]);
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
                        onClick={() => setProvider(provider === 'gemini' ? 'groq' : 'gemini')}
                        title="Klik buat ganti Model AI"
                    >
                        {provider === 'gemini' ? (
                            <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                        ) : (
                            <Zap className="w-5 h-5 text-orange-400 animate-pulse" />
                        )}
                        <div className="flex flex-col">
                            <span className="font-bold text-xs text-gray-500">MODEL RadyAI</span>
                            <span className={`font-bold text-sm ${provider === 'gemini' ? 'text-blue-400' : 'text-orange-400'}`}>
                                {provider === 'gemini' ? 'Gemini 2.5' : 'Llama 3.3'}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && (
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${provider === 'gemini' ? 'bg-blue-500/20' : 'bg-orange-500/20'}`}>
                                    {provider === 'gemini' ? <Bot className="w-4 h-4 text-blue-400" /> : <Zap className="w-4 h-4 text-orange-400" />}
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
                                {provider === 'gemini' ? 'Gemini lagi mikir...' : 'Groq lagi ngetik...'}
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
                        placeholder={`Tanya ${provider === 'gemini' ? 'Gemini' : 'Llama'}...`}
                        className="cursor-default flex-1 bg-[#222] text-white text-sm rounded-lg px-4 py-2 outline-none border border-white/5 focus:ring-1 focus:ring-blue-500/50 placeholder:text-gray-600"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className={`p-2 text-white rounded-lg transition-colors ${provider === 'gemini' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-orange-600 hover:bg-orange-500'}`}
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
                    ${isOpen ? "bg-red-500 rotate-90" : (provider === 'gemini' ? "bg-[#0a0a0a]" : "bg-[#1a0a0a]")}
                `}
            >
                {isOpen ? <X className="w-6 h-6 text-white" /> : (
                    provider === 'gemini' ? <Bot className="w-7 h-7 text-blue-400" /> : <Zap className="w-7 h-7 text-orange-400" />
                )}
            </button>
        </div>
    );
}