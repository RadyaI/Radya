import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Hammer, ArrowLeft, Cpu, Terminal } from "lucide-react";

export default function UnderConstruction() {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  // const logs = [
  //   "Initialising core modules...",
  //   "Loading quantum assets...",
  //   "Optimizing dark mode css...",
  //   "Fixing bugs (hopefully)...",
  //   "Brewing digital coffee...",
  //   "Compiling react components...",
  //   "Almost there..."
  // ];

  const logs = [
    "3",
    "2",
    "1",
    "Pssshh",
    "Duaaarr",
    "💥💥💥💥",
    "Dah balik sana, belum jadi ini..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + Math.floor(Math.random() * 5);
      });
    }, 500);

    const logTimer = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-lg w-full text-center">
        
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
          <div className="relative bg-[#111] p-6 rounded-2xl border border-[#333] shadow-2xl">
            <Hammer className="w-16 h-16 text-blue-500 animate-[wiggle_1s_ease-in-out_infinite]" />
          </div>
          <div className="absolute -right-4 -top-4 bg-[#222] p-2 rounded-lg border border-[#333] animate-bounce">
             <Cpu className="w-6 h-6 text-purple-400" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
          Work in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Progress.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Halaman ini sedang dikoding oleh Radya. Balik lagi nanti ya!
        </p>

        <div className="bg-[#0f0f0f] rounded-xl border border-[#333] p-4 mb-8 text-left font-mono text-sm shadow-xl max-w-sm mx-auto">
          <div className="flex items-center gap-2 mb-3 border-b border-[#333] pb-2">
            <Terminal className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500">system_log.exe</span>
          </div>
          <div className="space-y-1">
             {logs.slice(0, logIndex + 1).map((log, i) => (
               <div key={i} className="flex gap-2">
                 <span className="text-blue-500">➜</span>
                 <span className={i === logIndex ? "text-white animate-pulse" : "text-gray-500"}>
                   {log}
                 </span>
               </div>
             ))}
          </div>
        </div>

        <div className="w-full max-w-sm mx-auto mb-10">
            <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase">
                <span>Compiling...</span>
                <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-[#1a1a1a] rounded-full overflow-hidden border border-[#333]">
                <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      
      </div>

      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
      `}</style>

    </div>
  );
}