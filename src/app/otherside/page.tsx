"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Head from 'next/head';

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: HYPER SCRAMBLE TEXT ---
// Efek teks ngacak dulu baru bener
const HyperText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  
  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startScramble = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3; // Kecepatan decoding
      }, 30);
    };

    // Trigger saat component masuk viewport (pake Intersection Observer simpel)
    // Atau pake timeout simple buat demo ini
    const timer = setTimeout(startScramble, delay * 1000);
    return () => {
        clearInterval(interval);
        clearTimeout(timer);
    }
  }, [text, delay]);

  return <span className={className}>{display}</span>;
};

export default function TheOtherSide() {
  const mainRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const bmwRef = useRef<HTMLDivElement>(null);
  const manhwaRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- 1. GLOBAL CURSOR FIX (No More Bugs) ---
      // Listener dipasang global, state visualnya yang diubah per section
      const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
      const ySet = gsap.quickSetter(cursorRef.current, "y", "px");

      window.addEventListener("mousemove", (e) => {
        xSet(e.clientX);
        ySet(e.clientY);
      });

      // --- 2. BACKGROUND COLOR LOGIC ---
      const sections = [bmwRef.current, manhwaRef.current, catRef.current];
      const bgColors = ["#0F1014", "#E5E5E5", "#D7CCC8"];
      const textColors = ["#F5F5F5", "#111111", "#3E2723"];

      sections.forEach((section, i) => {
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => gsap.to(mainRef.current, { backgroundColor: bgColors[i], color: textColors[i] }),
          onEnterBack: () => gsap.to(mainRef.current, { backgroundColor: bgColors[i], color: textColors[i] }),
          // Logic Cursor per Section
          onUpdate: ({ isActive }) => {
             if (i === 2 && isActive) { // Zona Kucing
                gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
             } else if (i !== 2) {
                gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
             }
          }
        });
      });

      // --- 3. VELOCITY SKEW (BMW) ---
      let proxy = { skew: 0 };
      let skewSetter = gsap.quickSetter(".bmw-text", "skewX", "deg");
      let clamp = gsap.utils.clamp(-20, 20);

      ScrollTrigger.create({
        trigger: bmwRef.current,
        onUpdate: (self) => {
          let skew = clamp(self.getVelocity() / -50);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, { skew: 0, duration: 0.5, ease: "power3", overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
          }
        }
      });

      // --- 4. PARALLAX TEXT (MANHWA) ---
      gsap.to(".manhwa-text-move", {
        xPercent: -20,
        scrollTrigger: {
            trigger: manhwaRef.current,
            scrub: 1
        }
      })

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen bg-[#0F1014] text-[#F5F5F5] transition-colors overflow-x-hidden selection:bg-red-500 selection:text-white relative">
      
      {/* FONTS & STYLES */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .font-anton { font-family: 'Anton', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        .text-stroke-white { -webkit-text-stroke: 1px white; color: transparent; }
        .text-stroke-black { -webkit-text-stroke: 1px black; color: transparent; }
        
        .bg-grid {
            background-size: 50px 50px; /* Grid lebih rapat */
            background-image: linear-gradient(to right, rgba(100, 100, 100, 0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(100, 100, 100, 0.05) 1px, transparent 1px);
        }
      `}</style>

      {/* FIXED ELEMENTS */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0"></div>
      <div ref={cursorRef} className="fixed top-0 left-0 w-24 h-24 bg-[#3E2723] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[#E6DCCA] font-bold text-sm mix-blend-hard-light scale-0 opacity-0">
          <span className="animate-spin">PET ME</span>
      </div>

      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-start z-50 mix-blend-difference text-white">
        <div>
            <span className="font-anton tracking-wide text-2xl block">RADYA <span className="font-mono text-sm opacity-60">/ OTHERSIDE</span></span>
            <div className="font-mono text-[10px] mt-2 max-w-[150px] leading-tight opacity-70">
                <HyperText text="INITIATING PROTOCOL: PERSONAL_INTERESTS_V2.0" />
            </div>
        </div>
        <div className="text-right hidden md:block">
            <span className="font-mono text-xs block">[ SYSTEM STATUS: ONLINE ]</span>
            <span className="font-mono text-xs block opacity-50">LAT: -7.250445 | LONG: 112.768845</span>
        </div>
      </div>

      {/* --- ZONE 1: BMW (DENSE LAYOUT) --- */}
      <section ref={bmwRef} className="relative min-h-screen flex items-center px-6 md:px-12 py-24 z-10 border-b border-white/10">
        <div className="absolute top-0 right-10 h-full flex gap-4 opacity-30 mix-blend-overlay pointer-events-none">
          <div className="w-1 h-full bg-[#5E87C8]"></div>
          <div className="w-1 h-full bg-[#280562]"></div>
          <div className="w-1 h-full bg-[#C91A25]"></div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            {/* Kolom Kiri: Teks Kecil (Filler/Texture) */}
            <div className="hidden md:col-span-2 md:flex flex-col justify-between h-[60vh] font-mono text-xs text-gray-500 border-r border-gray-800 pr-4">
                <div>
                    <p className="mb-4">PROJECT: GARAGE</p>
                    <p className="opacity-50">Precision engineering meets raw performance. Defining the ultimate driving machine through code and chassis dynamics.</p>
                </div>
                <div className="space-y-2">
                    <p>01. VANOS SYSTEM</p>
                    <p>02. INDIVIDUAL THROTTLE BODIES</p>
                    <p>03. 50:50 WEIGHT DIST.</p>
                </div>
            </div>

            {/* Kolom Tengah: Judul Besar */}
            <div className="col-span-12 md:col-span-8 relative">
                <div className="bmw-text">
                    <HyperText text="BAVARIAN" className="text-[12vw] leading-[0.8] font-anton block" delay={0.2} />
                    <h1 className="text-[12vw] leading-[0.8] font-anton block text-stroke-white opacity-80">MOTOR</h1>
                    <h1 className="text-[12vw] leading-[0.8] font-anton block text-[#C91A25]">WORKS</h1>
                </div>
                
                {/* Specs Grid yang Rapat */}
                <div className="grid grid-cols-3 md:grid-cols-3 gap-0 border-t border-b border-gray-700 mt-12">
                    <div className="p-4 border-r border-gray-700 hover:bg-white/5 transition-colors group">
                        <span className="font-mono text-[10px] text-gray-400 block mb-1">CHASSIS CODE</span>
                        <HyperText text="E46 M3" className="font-anton text-2xl group-hover:text-[#5E87C8]" />
                    </div>
                    <div className="p-4 border-r border-gray-700 hover:bg-white/5 transition-colors group">
                        <span className="font-mono text-[10px] text-gray-400 block mb-1">ENGINE</span>
                        <HyperText text="S54B32" className="font-anton text-2xl group-hover:text-[#280562]" delay={0.5} />
                    </div>
                    <div className="p-4 hover:bg-white/5 transition-colors group">
                        <span className="font-mono text-[10px] text-gray-400 block mb-1">OUTPUT</span>
                        <HyperText text="343 HP" className="font-anton text-2xl group-hover:text-[#C91A25]" delay={0.8} />
                    </div>
                </div>
            </div>

            {/* Kolom Kanan: Vertikal Text */}
            <div className="hidden md:col-span-2 md:flex flex-col justify-end items-end h-[50vh]">
                 <span className="writing-vertical font-mono text-xs tracking-widest opacity-50 rotate-180">
                    JOY IS BMW • FREUDE AM FAHREN
                 </span>
            </div>
        </div>
      </section>

      {/* --- ZONE 2: MANHWA (MAGAZINE LAYOUT) --- */}
      <section ref={manhwaRef} className="relative min-h-screen px-6 md:px-12 py-24 z-10 flex flex-col justify-center">
         <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Header Section */}
            <div className="col-span-12 mb-8 border-b-4 border-black pb-4 flex justify-between items-end">
                <h2 className="font-anton text-6xl text-black">WEEKLY<br/>UPDATE</h2>
                <div className="text-right font-mono text-xs text-black space-y-1">
                    <p>GENRE: ACTION / SYSTEM</p>
                    <p>TARGET: SHONEN</p>
                    <HyperText text="READING STATUS: OBSESSED" />
                </div>
            </div>

            {/* Panel 1: Text Heavy (Swiss Style Column) */}
            <div className="col-span-12 md:col-span-4 bg-white border-2 border-black p-6 flex flex-col justify-between min-h-[40vh]">
                <div>
                    <h3 className="font-anton text-3xl mb-4 bg-black text-white inline-block px-2">SOLO LEVELING</h3>
                    <p className="font-mono text-xs leading-relaxed text-justify">
                        In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race from certain annihilation, a notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless struggle for survival.
                    </p>
                </div>
                <div className="mt-8 pt-4 border-t border-black font-mono text-xs font-bold">
                    <HyperText text="RATING: SSS-CLASS" />
                </div>
            </div>

             {/* Panel 2: Visual Impact (Typography) */}
             <div className="col-span-12 md:col-span-5 bg-black text-white p-6 flex items-center justify-center relative overflow-hidden group border-2 border-black">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                <h2 className="manhwa-text-move font-anton text-[8vw] md:text-[5vw] whitespace-nowrap leading-none group-hover:text-red-500 transition-colors">
                    ARISE ARISE ARISE
                </h2>
             </div>

             {/* Panel 3: Stats */}
             <div className="col-span-12 md:col-span-3 bg-[#E5E5E5] border-2 border-black p-6 flex flex-col gap-2">
                <div className="bg-white border border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="block font-mono text-[10px] text-gray-500">MANHWA 01</span>
                    <span className="font-anton text-xl">OMNISCIENT READER</span>
                </div>
                <div className="bg-white border border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-2">
                    <span className="block font-mono text-[10px] text-gray-500">MANHWA 02</span>
                    <span className="font-anton text-xl">LOOKISM</span>
                </div>
                <div className="bg-white border border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-4">
                    <span className="block font-mono text-[10px] text-gray-500">MANHWA 03</span>
                    <span className="font-anton text-xl">WIND BREAKER</span>
                </div>
             </div>
         </div>
      </section>

      {/* --- ZONE 3: CAT (ORGANIC CHAOS) --- */}
      <section ref={catRef} className="relative min-h-screen px-6 md:px-12 py-24 z-10 flex flex-col justify-center cursor-none">
         <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Typography */}
            <div>
                <HyperText text="THE REAL BOSS" className="font-mono text-xs tracking-widest mb-4 block text-[#5D4037]" />
                <h1 className="font-anton text-[10vw] leading-[0.8] text-[#3E2723] mb-6">
                    FELINE<br/>SUPREMACY
                </h1>
                <div className="font-mono text-sm leading-relaxed text-[#5D4037] max-w-md">
                    <p className="mb-4">
                        A dedicated section for the creature that sleeps on my keyboard while I try to debug production code.
                    </p>
                    <ul className="list-disc pl-4 space-y-1 opacity-70 text-xs">
                        <li>Species: Felis catus</li>
                        <li>Role: Senior Supervisor</li>
                        <li>Skill: Ignoring me</li>
                    </ul>
                </div>
            </div>

            {/* Right: Abstract Playground */}
            <div className="relative h-[40vh] border-2 border-[#3E2723] border-dashed rounded-full flex items-center justify-center opacity-50">
                <span className="font-mono text-xs text-[#3E2723] animate-pulse">
                    [ HOVER HERE TO PLAY ]
                </span>
                {/* Decorative floating elements */}
                <div className="absolute top-10 right-20 w-4 h-4 bg-[#3E2723] rounded-full animate-bounce"></div>
                <div className="absolute bottom-20 left-10 w-8 h-8 bg-[#3E2723] rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            </div>

         </div>
      </section>

      <style jsx>{`
        .writing-vertical {
            writing-mode: vertical-rl;
            text-orientation: mixed;
        }
      `}</style>
    </main>
  );
}