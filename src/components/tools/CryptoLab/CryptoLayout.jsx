"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Binary, Fingerprint, FileKey, ShieldCheck } from "lucide-react";
import Cursor from "@/components/cursor"; 

import Encoders from "./features/Encoders";
import Hashing from "./features/Hashing";
import ClassicCipher from "./features/ClassicCipher";

export default function CryptoPage() {
  const [activeTab, setActiveTab] = useState("encoders");

  const getNavClass = (tabName) => {
    const isActive = activeTab === tabName;
    return `cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
        : "text-gray-400 hover:text-gray-100 hover:bg-[#222]"
    }`;
  };

  return (
    <>
      <Cursor />
      <div className="min-h-screen w-full bg-[#0b0b0b] text-gray-200 font-sans selection:bg-blue-500/30">
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />

        <div className="max-w-6xl mx-auto p-4 md:p-8">
          
          <div className="mb-8 flex items-center gap-3 border-b border-[#222] pb-6">
            <div className="p-3 bg-blue-900/20 rounded-xl border border-blue-900/50">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Crypto<span className="text-blue-500">Lab</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Modular Encryption, Hashing & Encoding Playground.
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2 mb-8">
            <div 
                onClick={() => setActiveTab("encoders")} 
                className={getNavClass("encoders")}
            >
              <Binary className="w-4 h-4" />
              <span>Encoders</span>
            </div>

            <div 
                onClick={() => setActiveTab("hashing")} 
                className={getNavClass("hashing")}
            >
              <Fingerprint className="w-4 h-4" />
              <span>Hashing</span>
            </div>

            <div 
                onClick={() => setActiveTab("classic")} 
                className={getNavClass("classic")}
            >
              <FileKey className="w-4 h-4" />
              <span>Classic Cipher</span>
            </div>
          </nav>

          <div className="bg-[#121212] border border-[#222] rounded-2xl min-h-[500px] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div className="relative z-10 p-6">
              {activeTab === "encoders" && <Encoders />}
              {activeTab === "hashing" && <Hashing />}
              {activeTab === "classic" && <ClassicCipher />}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}