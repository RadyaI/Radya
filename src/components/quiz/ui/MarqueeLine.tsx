"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function MarqueeLine({ isDark }: { isDark: boolean }) {
    const textRef = useRef(null);

    useGSAP(() => {
        gsap.to(textRef.current, { xPercent: -50, duration: 20, ease: "none", repeat: -1 });
    });

    const content = " // KEEP FOCUS // DO NOT PANIC // TRUST YOUR BRAIN // MIAW // ";
    const repeatedContent = content.repeat(10);

    return (
        <div className={`fixed bottom-8 left-0 w-full overflow-hidden whitespace-nowrap border-y-2 py-2 z-10 ${isDark ? 'bg-zinc-900 border-white text-white' : 'bg-white border-black text-black'} -rotate-1 shadow-lg`}>
            <div ref={textRef} className="font-mono font-bold text-sm tracking-widest uppercase">
                {repeatedContent}
            </div>
        </div>
    );
}