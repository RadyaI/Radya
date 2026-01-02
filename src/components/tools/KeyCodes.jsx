"use client"
import { useState, useEffect } from "react";
import { Keyboard } from "lucide-react";

export default function KeyCodes() {
  const [eventData, setEventData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();

      const newData = {
        key: e.key === " " ? "(Space)" : e.key,
        code: e.code,
        which: e.which,
        location: e.location,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey, 
        shiftKey: e.shiftKey,
        altKey: e.altKey,
      };

      setEventData(newData);
      
      setHistory((prev) => [newData, ...prev].slice(0, 5));
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-gray-200 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {!eventData ? (
        <div className="text-center animate-pulse z-10">
          <div className="bg-[#111] p-6 rounded-2xl border border-[#333] shadow-2xl inline-block mb-4">
            <Keyboard className="w-16 h-16 text-gray-500 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Press Any Key</h1>
          <p className="text-gray-500">Tekan tombol keyboard apa saja untuk melihat detail event.</p>
        </div>
      ) : (
        
        <div className="w-full max-w-4xl z-10 animate__animated animate__fadeIn">
          
          <div className="flex flex-col items-center mb-12">
            <span className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">JavaScript KeyCode (e.which)</span>
            <div className="text-[150px] leading-none font-bold text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              {eventData.which}
            </div>
            <div className="text-3xl font-mono text-gray-400 mt-2">
              {eventData.key}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <InfoCard label="e.key" value={eventData.key} desc="Nilai karakter" />
            <InfoCard label="e.code" value={eventData.code} desc="Posisi fisik tombol" />
            <InfoCard label="e.location" value={eventData.location} desc="0=Standard, 1=Left, 2=Right" />
            <InfoCard label="Modifier" 
              value={
                [
                  eventData.ctrlKey ? "CTRL" : null,
                  eventData.shiftKey ? "SHIFT" : null,
                  eventData.altKey ? "ALT" : null,
                  eventData.metaKey ? "META" : null
                ].filter(Boolean).join(" + ") || "None"
              } 
              desc="Tombol kombinasi"
            />
          </div>

          <div className="bg-[#111] border border-[#222] rounded-xl p-4 max-w-lg mx-auto">
             <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 border-b border-[#333] pb-2">Recent Keystrokes</h3>
             <div className="flex flex-col gap-2">
                {history.map((h, i) => (
                    <div key={i} className="flex justify-between text-sm font-mono text-gray-400">
                        <span>{h.code}</span>
                        <span className="text-gray-600">({h.which})</span>
                    </div>
                ))}
             </div>
          </div>

        </div>
      )}

      <button 
        onClick={() => { setEventData(null); setHistory([]); }}
        className="absolute bottom-8 text-xs text-gray-600 hover:text-white transition uppercase tracking-widest"
      >
        [ Click to Reset ]
      </button>

    </div>
  );
}

function InfoCard({ label, value, desc }) {
  return (
    <div className="bg-[#111] border border-[#222] p-4 rounded-xl text-center hover:border-blue-500/50 transition duration-300 group">
      <p className="text-xs font-bold text-gray-500 uppercase mb-1">{label}</p>
      <p className="text-xl font-bold text-white font-mono break-all group-hover:text-blue-400 transition">{value}</p>
      <p className="text-[10px] text-gray-600 mt-2">{desc}</p>
    </div>
  );
}