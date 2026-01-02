"use client"

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Copy, RefreshCw, ArrowRightLeft, FileJson, Link, Binary } from "lucide-react";

export default function Encoders() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("base64");
  const [output, setOutput] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }

    try {
      let result = "";

      if (mode === "base64") {
        if (isDecoding) {
          result = atob(input);
        } else {
          result = btoa(input);
        }
      } 
      else if (mode === "url") {
        if (isDecoding) {
          result = decodeURIComponent(input);
        } else {
          result = encodeURIComponent(input);
        }
      }
      else if (mode === "jwt") {
        const parts = input.split('.');
        if (parts.length !== 3) throw new Error("Format JWT tidak valid (harus ada 3 bagian)");
        
        const payload = atob(parts[1]); 
        result = JSON.stringify(JSON.parse(payload), null, 2);
      }

      setOutput(result);
    } catch (err) {
      setOutput("Error: Input tidak valid untuk format ini.");
    }
  }, [input, mode, isDecoding]);

  
  const ModeBtn = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => { setMode(id); setInput(""); setOutput(""); }}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
        mode === id 
        ? "bg-blue-600/20 border-blue-500 text-blue-400" 
        : "bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-gray-500 hover:bg-[#222]"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col gap-6 animate__animated animate__fadeIn">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <ModeBtn id="base64" label="Base64 Converter" icon={Binary} />
        <ModeBtn id="url" label="URL Encoder" icon={Link} />
        <ModeBtn id="jwt" label="JWT Debugger" icon={FileJson} />
      </div>

      {mode !== "jwt" && (
        <div className="flex justify-center">
          <button 
            onClick={() => setIsDecoding(!isDecoding)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-[#222] px-4 py-1 rounded-full border border-[#333] hover:border-blue-500 transition text-gray-400 hover:text-white"
          >
            <RefreshCw className={`w-3 h-3 ${isDecoding ? "rotate-180" : ""} transition-transform`} />
            Mode: <span className={isDecoding ? "text-yellow-400" : "text-green-400"}>
              {isDecoding ? "DECODE (Bongkar)" : "ENCODE (Bungkus)"}
            </span>
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 relative">
        
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase flex justify-between">
            <span>Input {mode === 'jwt' ? 'Token' : 'Text'}</span>
            {input && <span className="text-[10px] bg-[#222] px-2 rounded text-gray-400">{input.length} chars</span>}
          </label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 bg-[#0a0a0a] border border-[#333] rounded-xl p-4 text-gray-200 focus:border-blue-500 outline-none font-mono text-sm resize-none transition-colors placeholder:text-gray-700"
            placeholder={mode === 'jwt' ? "Paste eyJhbGciOi... di sini" : "Ketik sesuatu..."}
            spellCheck="false"
          />
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:block hidden z-10">
          <div className="bg-[#111] p-2 rounded-full border border-[#333]">
            <ArrowRightLeft className="w-5 h-5 text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
             <label className="text-xs font-bold text-blue-500 uppercase">
               Result {mode === 'jwt' ? '(Payload Data)' : ''}
             </label>
             {output && !output.startsWith("Error") && (
               <button 
                onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}
                className="flex items-center gap-1 text-[10px] bg-blue-900/30 text-blue-400 px-2 py-1 rounded hover:bg-blue-900/50 transition"
               >
                 <Copy className="w-3 h-3" /> COPY
               </button>
             )}
          </div>
          
          <div className="relative h-64 group">
            <textarea 
              readOnly
              value={output}
              className={`w-full h-full bg-[#151515] border rounded-xl p-4 font-mono text-sm resize-none outline-none
                ${output.startsWith("Error") ? "text-red-400 border-red-900/50" : "text-blue-400 border-[#333]"}
              `}
              placeholder="Hasil akan muncul di sini..."
            />
          </div>
        </div>

      </div>

      {mode === 'jwt' && (
        <div className="bg-blue-900/10 border border-blue-900/30 p-3 rounded-lg text-xs text-blue-300 text-center">
          ℹ️ <b>Info:</b> Fitur ini hanya men-decode bagian <i>Payload</i>. Signature tidak diverifikasi di sini (client-side only).
        </div>
      )}
    </div>
  );
}