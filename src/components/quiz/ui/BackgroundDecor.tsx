"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

export default function BackgroundDecor({ isDark }: { isDark: boolean }) {
  const containerRef = useRef(null);
  
  const textColor = isDark ? "text-white" : "text-black";
  const opacity = isDark ? "opacity-5" : "opacity-5";

  useGSAP(() => {
    gsap.to(".giant-ring", { rotation: 360, duration: 60, repeat: -1, ease: "linear" });
    
    gsap.to(".float-shape", { 
        y: "50px", 
        rotation: 10, 
        duration: 5, 
        yoyo: true, 
        repeat: -1, 
        ease: "sine.inOut",
        stagger: 1
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`giant-ring absolute -right-20 -top-20 w-[600px] h-[600px] border-2 border-dashed ${isDark ? 'border-white/10' : 'border-black/10'} rounded-full flex items-center justify-center`}>
            <div className={`absolute inset-0 m-auto w-[500px] h-[500px] border border-dotted ${isDark ? 'border-white/10' : 'border-black/10'} rounded-full`} />
        </div>

        <h1 className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black font-serif whitespace-nowrap ${textColor} ${opacity} -rotate-12 select-none`}>
            RADYA.MY.ID
        </h1>

        <div className={`float-shape absolute top-20 left-10 w-24 h-24 border-4 ${isDark ? 'border-white/10' : 'border-black/10'} rounded-full`}></div>
        
        <div className={`float-shape absolute bottom-40 -left-10 text-[10rem] font-black ${textColor} ${opacity} leading-none`}>?</div>

        <div className={`float-shape absolute bottom-20 right-10 w-32 h-32 border-4 border-dashed ${isDark ? 'border-white/10' : 'border-black/10'} rotate-12`}></div>
        
        <div className={`float-shape absolute top-40 right-20 text-6xl ${textColor} ${opacity}`}>❋</div>
    </div>
  );
}