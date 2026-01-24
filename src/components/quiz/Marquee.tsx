"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Marquee({ text }: { text: string }) {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if(!textRef.current) return;
    const width = textRef.current.offsetWidth;
    
    gsap.to(textRef.current, {
      x: -width / 2,
      duration: 20,
      ease: "none",
      repeat: -1
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full overflow-hidden bg-black text-[#f0eee5] py-3 border-y-2 border-black rotate-1 my-8">
      <div ref={textRef} className="whitespace-nowrap flex text-2xl font-mono font-bold tracking-widest uppercase">
        {Array(10).fill(text).map((t, i) => (
          <span key={i} className="mx-8">★ {t}</span>
        ))}
      </div>
    </div>
  );
}