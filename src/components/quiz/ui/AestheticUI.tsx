"use client";
import { ArrowUpRight } from 'lucide-react';

export function AccentContainer({ children, color, className = "" }: any) {
  const colorMap: Record<string, string> = {
    "bg-yellow-300": "border-yellow-400 shadow-yellow-200",
    "bg-blue-300": "border-blue-400 shadow-blue-200",
    "bg-blue-400": "border-blue-500 shadow-blue-300",
    "bg-pink-400": "border-pink-500 shadow-pink-300",
    "bg-green-300": "border-green-400 shadow-green-200",
    "bg-green-400": "border-green-500 shadow-green-300",
    "bg-orange-300": "border-orange-400 shadow-orange-200",
  };
  const accent = colorMap[color] || "border-black shadow-gray-200";

  return (
    <div className={`border-2 ${accent} bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] ${className}`}>
      {children}
    </div>
  );
}

export function StatTag({ label, value, color }: { label: string, value: string | number, color: string }) {
  return (
    <div className="flex flex-col">
        <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-1">{label}</span>
        <div className={`inline-flex items-center self-start px-3 py-1 font-bold text-lg border-2 border-black ${color} shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
            {value}
        </div>
    </div>
  );
}

export function FancyLink({ href, text }: { href: string, text: string }) {
    return (
        <a href={href} className="group inline-flex items-center gap-1 font-mono font-bold text-sm relative overflow-hidden">
            <span className="relative z-10 transition-transform group-hover:-translate-x-1">{text}</span>
            <ArrowUpRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black origin-right transform scale-x-0 transition-transform group-hover:scale-x-100 group-hover:origin-left"></div>
        </a>
    )
}