"use client"

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Copy, ArrowRight, RefreshCw, Lock, Unlock, Settings2 } from "lucide-react";

export default function ClassicCipher() {
  const [algo, setAlgo] = useState("caesar");
  const [input, setInput] = useState("HALO DUNIA");
  const [isDecrypt, setIsDecrypt] = useState(false);
  
  const [shift, setShift] = useState(3);
  
  const [keyword, setKeyword] = useState("KUNCI");

  const [output, setOutput] = useState("");

  useEffect(() => {
    let result = "";
    
    const mod = (n, m) => ((n % m) + m) % m;

    if (algo === "caesar") {
      result = input.replace(/[a-zA-Z]/g, (char) => {
        const base = char <= 'Z' ? 65 : 97;
        const offset = isDecrypt ? -shift : shift;
        return String.fromCharCode(mod(char.charCodeAt(0) - base + offset, 26) + base);
      });
    } else {
      if (!keyword) {
        result = input; 
      } else {
        const cleanKey = keyword.toUpperCase().replace(/[^A-Z]/g, ""); 
        let keyIndex = 0;

        result = input.replace(/[a-zA-Z]/g, (char) => {
          const base = char <= 'Z' ? 65 : 97;
          const shiftAmount = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
          keyIndex++;
          
          const offset = isDecrypt ? -shiftAmount : shiftAmount;
          return String.fromCharCode(mod(char.charCodeAt(0) - base + offset, 26) + base);
        });
      }
    }

    setOutput(result);
  }, [input, shift, keyword, algo, isDecrypt]);

  return (
    <div className="flex flex-col gap-6 animate__animated animate__fadeIn">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1a1a] p-4 rounded-xl border border-[#333]">
        
        <div className="flex bg-[#0a0a0a] p-1 rounded-lg border border-[#333]">
          <button 
            onClick={() => setAlgo("caesar")}
            className={`px-4 py-2 rounded-md text-sm font-bold transition ${algo === 'caesar' ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Caesar
          </button>
          <button 
            onClick={() => setAlgo("vigenere")}
            className={`px-4 py-2 rounded-md text-sm font-bold transition ${algo === 'vigenere' ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Vigenère
          </button>
        </div>

        <button 
          onClick={() => setIsDecrypt(!isDecrypt)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border transition ${
            isDecrypt 
            ? "bg-red-900/20 text-red-400 border-red-900/50" 
            : "bg-green-900/20 text-green-400 border-green-900/50"
          }`}
        >
          {isDecrypt ? <Unlock className="w-4 h-4"/> : <Lock className="w-4 h-4"/>}
          {isDecrypt ? "MODE DECRYPT" : "MODE ENCRYPT"}
        </button>
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333] relative overflow-hidden">

        <div className="relative z-10">
            <label className="text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                Configuration
            </label>

            {algo === "caesar" ? (
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                        <span className="text-sm text-gray-400">Shift (Geser): <b className="text-white text-lg">{shift}</b></span>
                        <div className="flex gap-4 text-sm font-mono bg-black/30 px-3 py-1 rounded border border-[#333]">
                            <span>A <ArrowRight className="w-3 h-3 inline mx-1"/> {String.fromCharCode(65 + parseInt(shift))}</span>
                        </div>
                    </div>
                    <input 
                        type="range" min="0" max="25" 
                        value={shift} 
                        onChange={(e) => setShift(parseInt(e.target.value))}
                        className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                        <span>0</span><span>13</span><span>25</span>
                    </div>
                </div>
            ) : (
                <div>
                    <label className="text-xs text-gray-500 block mb-2">Keyword (Kata Kunci)</label>
                    <input 
                        type="text" 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value.toUpperCase())}
                        className="w-full h-12 bg-[#0a0a0a] border border-[#333] rounded-lg px-4 text-white font-mono tracking-widest uppercase focus:border-blue-500 outline-none"
                        placeholder="CONTOH: KUNCI"
                    />
                    <p className="text-[10px] text-gray-500 mt-2">*Hanya huruf A-Z yang akan digunakan sebagai kunci.</p>
                </div>
            )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-500 uppercase">
            {isDecrypt ? "Cipher Text (Pesan Sandi)" : "Plain Text (Pesan Asli)"}
          </label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            className="w-full h-40 bg-[#0a0a0a] border border-[#333] rounded-xl p-4 text-white focus:border-blue-500 outline-none font-mono text-lg transition placeholder:text-gray-700 uppercase"
            placeholder="KETIK PESAN..."
          />
        </div>

        <div className="flex flex-col gap-2">
           <div className="flex justify-between items-center">
             <label className={`text-xs font-bold uppercase ${isDecrypt ? "text-green-400" : "text-red-400"}`}>
               {isDecrypt ? "Result (Terbaca)" : "Result (Terenkripsi)"}
             </label>
             <button 
              onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }}
              className="text-[10px] bg-[#222] text-gray-300 px-2 py-1 rounded hover:bg-[#333] transition flex items-center gap-1"
             >
               <Copy className="w-3 h-3" /> COPY
             </button>
          </div>
          <textarea 
            readOnly
            value={output}
            className={`w-full h-40 bg-[#151515] border rounded-xl p-4 font-mono text-lg outline-none uppercase resize-none
              ${isDecrypt ? "text-green-400 border-green-900/30" : "text-red-400 border-red-900/30"}
            `}
          />
        </div>

      </div>
    </div>
  );
}