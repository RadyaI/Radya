"use client"

import { useState } from "react";
import CryptoJS from "crypto-js";
import toast from "react-hot-toast";
import { Copy, CheckCircle2, XCircle, Fingerprint } from "lucide-react";

export default function Hashing() {
  const [input, setInput] = useState("");
  const [compareHash, setCompareHash] = useState(""); 

  const HashRow = ({ label, algo, color }) => {
    const hashValue = input ? algo(input).toString() : "-";
    
    const isMatch = compareHash && hashValue === compareHash.toLowerCase().trim();
    const isMismatch = compareHash && !isMatch;

    return (
      <div className={`group relative bg-[#151515] border rounded-xl p-4 transition-all duration-300
        ${isMatch ? "border-green-500 bg-green-900/10" : ""} 
        ${isMismatch ? "border-red-900/30 opacity-50" : "border-[#333] hover:border-gray-500"}
      `}>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</span>
            {input && <span className="text-[10px] bg-[#222] px-2 rounded text-gray-500">{hashValue.length * 4} bits</span>}
          </div>
          
          {isMatch && <span className="flex items-center gap-1 text-xs font-bold text-green-400"><CheckCircle2 className="w-3 h-3"/> MATCH</span>}
        </div>

        <div className="flex justify-between items-end gap-4">
          <code className={`text-sm font-mono break-all leading-relaxed ${color} ${isMatch ? "font-bold" : ""}`}>
            {hashValue}
          </code>
          
          {input && (
            <button 
              onClick={() => { navigator.clipboard.writeText(hashValue); toast.success(`Copied ${label}!`); }}
              className="p-2 bg-[#222] hover:bg-[#333] rounded-lg text-gray-400 hover:text-white transition opacity-0 group-hover:opacity-100 shrink-0"
              title="Copy Hash"
            >
              <Copy className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 animate__animated animate__fadeIn">
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase">Input Text (Source)</label>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-12 bg-[#0a0a0a] border border-[#333] rounded-xl px-4 text-white focus:border-blue-500 outline-none transition placeholder:text-gray-700"
            placeholder="Ketik password atau teks di sini..."
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
            <Fingerprint className="w-3 h-3" />
            Compare with Hash (Optional)
          </label>
          <input 
            type="text" 
            value={compareHash}
            onChange={(e) => setCompareHash(e.target.value)}
            className={`w-full h-12 bg-[#0a0a0a] border rounded-xl px-4 text-white outline-none transition placeholder:text-gray-700 font-mono text-sm
              ${compareHash ? "border-blue-900/50 focus:border-blue-500" : "border-[#333] focus:border-gray-500"}
            `}
            placeholder="Paste hash MD5/SHA di sini untuk mencocokkan..."
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <HashRow label="MD5" algo={CryptoJS.MD5} color="text-pink-400" />
        <HashRow label="SHA-1" algo={CryptoJS.SHA1} color="text-purple-400" />
        <HashRow label="SHA-256" algo={CryptoJS.SHA256} color="text-blue-400" />
        <HashRow label="SHA-512" algo={CryptoJS.SHA512} color="text-emerald-400" />
      </div>

      <div className="text-center text-xs text-gray-600 mt-4">
        Hashing bersifat satu arah (One-Way). Tidak bisa dikembalikan ke teks asal (Decrypt).
      </div>

    </div>
  );
}