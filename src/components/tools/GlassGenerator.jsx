"use client"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Copy, Code2, Palette } from "lucide-react";

export default function GlassGenerator() {
  const [blur, setBlur] = useState(16);
  const [transparency, setTransparency] = useState(0.25);
  const [saturation, setSaturation] = useState(180);
  const [radius, setRadius] = useState(24);

  const cssCode = `
background: rgba(255, 255, 255, ${transparency});
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border-radius: ${radius}px;
border: 1px solid rgba(255, 255, 255, 0.125);
  `.trim();

  const tailwindCode = `bg-white/${Math.round(transparency * 100)} backdrop-blur-[${blur}px] backdrop-saturate-[${saturation/100}] rounded-[${radius}px] border border-white/10`;

  return (
    <div className="min-h-screen w-full bg-[#111] text-gray-200 p-6 md:p-10 font-sans relative overflow-hidden flex flex-col items-center">
      <Toaster position="bottom-right" />

      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
         <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center h-full mt-10">
        
        <div className="order-2 md:order-1 flex justify-center">
          <div 
            className="w-full h-80 md:w-96 md:h-96 flex flex-col items-center justify-center p-8 text-center shadow-2xl transition-all duration-200"
            style={{
              background: `rgba(255, 255, 255, ${transparency})`,
              backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
              WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
              borderRadius: `${radius}px`,
              border: '1px solid rgba(255, 255, 255, 0.125)'
            }}
          >
            <Palette className="w-12 h-12 text-white mb-4 drop-shadow-lg" />
            <h2 className="text-3xl font-bold text-white drop-shadow-md mb-2">Glassmorphism</h2>
            <p className="text-white/80 drop-shadow-sm">
              Geser slider di sebelah untuk mengatur efek kaca ini secara realtime.
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2 bg-[#0a0a0a]/90 border border-[#333] backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-blue-500">✨</span> Generator
          </h1>

          <div className="space-y-6 mb-8">
            <SliderControl label="Blur (Buram)" val={blur} setVal={setBlur} min={0} max={40} unit="px" />
            <SliderControl label="Transparency (Tembus)" val={transparency} setVal={setTransparency} min={0} max={1} step={0.01} unit="" />
            <SliderControl label="Saturation (Warna)" val={saturation} setVal={setSaturation} min={0} max={200} unit="%" />
            <SliderControl label="Border Radius (Lengkung)" val={radius} setVal={setRadius} min={0} max={100} unit="px" />
          </div>

          <div className="bg-[#151515] rounded-xl p-4 border border-[#333] relative group">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                    <Code2 className="w-3 h-3" /> CSS Result
                </span>
                <button 
                    onClick={() => { navigator.clipboard.writeText(cssCode); toast.success("CSS Copied!"); }}
                    className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded transition flex items-center gap-1"
                >
                    <Copy className="w-3 h-3" /> Copy CSS
                </button>
            </div>
            <pre className="text-xs text-blue-300 font-mono overflow-x-auto whitespace-pre-wrap break-all">
                {cssCode}
            </pre>
            
             <div className="mt-4 pt-4 border-t border-[#333]">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-500 uppercase">Tailwind Class (Approx)</span>
                    <button 
                        onClick={() => { navigator.clipboard.writeText(tailwindCode); toast.success("Tailwind Class Copied!"); }}
                        className="text-[10px] text-gray-400 hover:text-white underline"
                    >
                        Copy
                    </button>
                </div>
                <code className="text-[10px] text-green-400 font-mono block break-all">
                    {tailwindCode}
                </code>
             </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

function SliderControl({ label, val, setVal, min, max, step = 1, unit }) {
    return (
        <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>{label}</span>
                <span className="text-white font-mono">{val}{unit}</span>
            </div>
            <input 
                type="range"
                min={min} max={max} step={step}
                value={val}
                onChange={(e) => setVal(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
            />
        </div>
    )
}