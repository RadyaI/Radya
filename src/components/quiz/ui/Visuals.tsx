"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function SpinningBadge({ isDark }: { isDark: boolean }) {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.to(ref.current, { rotation: 360, duration: 20, ease: "linear", repeat: -1 });
  }, { scope: ref });

  return (
    <div ref={ref} className={`absolute top-6 right-6 w-24 h-24 border border-dashed rounded-full flex items-center justify-center opacity-30 select-none pointer-events-none ${isDark ? 'border-white' : 'border-black'}`}>
      <div className={`w-20 h-20 border border-dotted rounded-full ${isDark ? 'border-white' : 'border-black'}`} />
      <span className={`absolute font-mono text-[10px] tracking-widest ${isDark ? 'text-white' : 'text-black'}`}>RADYA.MY.ID</span>
    </div>
  );
}

export function StatBox({ label, value, isDark }: { label: string, value: string | number, isDark: boolean }) {
    return (
        <div className={`p-4 border-2 transition-all hover:-translate-y-1 ${isDark ? 'border-gray-700 bg-zinc-800' : 'border-black bg-white'}`}>
            <p className={`text-xs font-mono mb-1 opacity-60 uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
            <p className={`text-2xl font-black ${isDark ? 'text-white' : 'text-black'}`}>{value}</p>
        </div>
    )
}