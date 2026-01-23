"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: CHAOTIC TEXT (HURUF MENCAR) ---
const ChaoticTitle = ({ text }: { text: string }) => {
    return (
        <div className="relative h-[20vh] md:h-[40vh] w-full pointer-events-none select-none">
            {text.split("").map((char, i) => {
                // Random position & rotation buat efek "Chaos"
                const randomRot = Math.random() * 20 - 10; 
                const randomY = Math.random() * 50; 
                return (
                    <span 
                        key={i} 
                        className="inline-block font-anton text-[15vw] leading-none absolute will-change-transform mix-blend-difference text-[#EAEAEA]"
                        style={{ 
                            left: `${i * 12}%`, 
                            top: `${randomY}px`,
                            transform: `rotate(${randomRot}deg)` 
                        }}
                    >
                        {char}
                    </span>
                )
            })}
        </div>
    )
}

// --- COMPONENT: STICKY NOTE (Konteks Penjelas) ---
const StickyNote = ({ title, text, rotation = "0deg" }: { title: string, text: string, rotation?: string }) => {
    return (
        <div 
            className="bg-[#FFFFF0] text-black p-6 w-64 md:w-80 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-20"
            style={{ transform: `rotate(${rotation})` }}
        >
            <div className="w-3 h-3 rounded-full bg-red-500 mb-4 border border-black"></div>
            <h4 className="font-anton text-2xl mb-2 uppercase">{title}</h4>
            <p className="font-mono text-xs leading-relaxed opacity-80">{text}</p>
        </div>
    )
}

export default function TheOtherSide() {
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Section Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const bmwRef = useRef<HTMLDivElement>(null);
  const manhwaRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO PARALLAX SCATTER
      // Huruf-huruf di Hero gerak mencar pas di scroll
      gsap.to(".hero-char", {
          y: (i) => (i + 1) * -100, // Tiap huruf beda speed
          x: (i) => (i % 2 === 0 ? -50 : 50), // Ganjil genap beda arah
          rotation: (i) => i * 10,
          opacity: 0,
          scrollTrigger: { trigger: heroRef.current, scrub: 0.5 }
      });

      // 2. BMW HORIZONTAL DRAG
      // Teks background gerak horizontal kenceng
      gsap.to(".bmw-bg-text", {
          xPercent: -50,
          scrollTrigger: { trigger: bmwRef.current, scrub: 1 }
      });
      // Gambar/Elemen miring ikut scroll
      gsap.to(".bmw-element", {
          yPercent: 30,
          rotation: 5,
          scrollTrigger: { trigger: bmwRef.current, scrub: 1 }
      });

      // 3. MANHWA PANELS FLOATING
      // Panel komik melayang floating
      gsap.utils.toArray<HTMLElement>(".manhwa-float").forEach((el, i) => {
          gsap.to(el, {
              y: (i + 1) * -50,
              rotation: (i % 2 === 0 ? -5 : 5),
              scrollTrigger: { trigger: manhwaRef.current, scrub: 1 }
          });
      });

      // 4. CAT CHAOS
      // Teks kucing "MEOW" ngikutin tapi delay (Magnetic)
      const catText = document.querySelector(".cat-giant-text") as HTMLElement;
      if (catText) {
          window.addEventListener("mousemove", (e) => {
              const x = (e.clientX / window.innerWidth - 0.5) * 50;
              const y = (e.clientY / window.innerHeight - 0.5) * 50;
              gsap.to(catText, { x: x, y: y, duration: 1, ease: "power2.out" });
          });
      }

    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen bg-[#111] text-[#EAEAEA] font-sans overflow-x-hidden selection:bg-[#FF4D00] selection:text-white">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        .font-anton { font-family: 'Anton', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        .text-stroke { -webkit-text-stroke: 1px rgba(255,255,255,0.2); color: transparent; }
        
        /* Noise Grain Texture */
        .noise {
             position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.05;
             background: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
        }
      `}</style>
      
      <div className="noise"></div>

      {/* NAV (MINIMALIST POJOK) */}
      <nav className="fixed top-6 left-6 z-50 mix-blend-difference">
          <span className="font-anton text-xl tracking-wide block">RADYA</span>
          <span className="font-mono text-xs opacity-50 block">/ OTHERSIDE</span>
      </nav>
      <div className="fixed top-6 right-6 z-50 font-mono text-xs border border-white/20 px-3 py-1 rounded-full hidden md:block mix-blend-difference">
          SCROLL TO DECONSTRUCT ↓
      </div>

      {/* --- SECTION 1: HERO (THE SCATTER) --- */}
      <section ref={heroRef} className="min-h-screen relative flex items-center justify-center overflow-hidden">
          {/* Background Chaos Text */}
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-10 pointer-events-none select-none">
             <div className="text-[20vw] font-anton leading-[0.8]">CHAOS</div>
             <div className="text-[20vw] font-anton leading-[0.8] ml-20">MODE</div>
          </div>

          <div className="relative z-10 text-center w-full max-w-5xl mx-auto mt-20 md:mt-0">
               {/* Huruf Mencar-mencar */}
               <div className="flex justify-center flex-wrap gap-x-2 md:gap-x-8 px-4">
                   {/* Huruf Manual satu-satu biar bisa dianimasiin mencar */}
                   {["U", "N", "F", "I", "L", "T", "E", "R", "E", "D"].map((char, i) => (
                       <span key={i} className="hero-char font-anton text-[12vw] md:text-[8vw] inline-block hover:text-[#FF4D00] transition-colors duration-300 cursor-default">
                           {char}
                       </span>
                   ))}
               </div>
               
               {/* Context Note (Miring dikit) */}
               <div className="mt-12 max-w-md mx-auto transform -rotate-2 bg-[#FF4D00] text-black p-4 inline-block shadow-[8px_8px_0px_0px_#fff]">
                   <p className="font-mono text-xs md:text-sm font-bold">
                       [ SYSTEM ALERT ] <br/>
                       This is the deconstructed version of Radya. 
                       No grid system found. Enter at your own risk.
                   </p>
               </div>
          </div>
      </section>

      {/* --- SECTION 2: BMW (THE ASYMMETRIC MACHINE) --- */}
      <section ref={bmwRef} className="min-h-[120vh] relative py-20 overflow-hidden">
          {/* Background Text Running Horizontal */}
          <div className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-10 font-anton text-[30vw] bmw-bg-text leading-none select-none pointer-events-none">
              GERMAN ENGINEERING PERFECTION M-POWER
          </div>

          <div className="container mx-auto px-6 h-full relative z-10">
              {/* Layout "Berantakan" */}
              
              {/* 1. Judul Gede di Kiri Atas */}
              <div className="absolute top-0 left-0 md:left-20">
                  <h2 className="font-anton text-[10vw] leading-[0.8] mix-blend-exclusion">
                      BAVARIAN<br/><span className="text-stroke">MOTOR</span>
                  </h2>
              </div>

              {/* 2. Elemen Visual (Kotak Miring) di Tengah Kanan */}
              <div className="bmw-element absolute top-[30%] right-0 md:right-[15%] w-[60vw] md:w-[30vw] h-[40vh] border-4 border-[#3E6299] flex items-center justify-center bg-[#111]/80 backdrop-blur-sm z-0">
                  <div className="font-mono text-[#3E6299] text-center">
                      <span className="text-6xl font-bold block">E46</span>
                      <span className="text-xs">CHASSIS CODE</span>
                  </div>
              </div>

              {/* 3. Sticky Note Penjelasan (Numpuk di atas elemen lain) */}
              <div className="absolute bottom-[10%] left-[10%] z-20">
                  <StickyNote 
                    title="The Machine" 
                    text="Why BMW? Because driving shouldn't be numb. It's about the feedback, the oil smell, and the raw mechanics of an inline-six engine."
                    rotation="3deg" 
                  />
              </div>

              {/* 4. Detail Spek (Nyelip di kanan bawah) */}
              <div className="absolute bottom-10 right-10 text-right font-mono text-xs text-[#FF4D00]">
                  <p>CYLINDERS: 6</p>
                  <p>ASPIRATION: N/A</p>
                  <p>LAYOUT: RWD</p>
              </div>
          </div>
      </section>

      {/* --- SECTION 3: MANHWA (THE FLOATING PANELS) --- */}
      <section ref={manhwaRef} className="min-h-[150vh] relative py-20 bg-[#EAEAEA] text-[#111] overflow-hidden">
          {/* Background Grid Line (Coretan) */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          <div className="container mx-auto px-6 relative h-full">
              
              {/* Judul Vertikal di Kanan */}
              <div className="absolute top-20 right-6 md:right-20 writing-vertical hidden md:block z-10">
                  <h2 className="font-anton text-[8vw] leading-none opacity-20">ESCAPISM</h2>
              </div>

              {/* Panel 1 (Kiri Atas) */}
              <div className="manhwa-float absolute top-[10%] left-[5%] md:left-[15%] w-[80vw] md:w-[35vw] bg-black text-white p-8 border-4 border-black shadow-[10px_10px_0px_0px_#FF4D00] z-10">
                  <span className="bg-[#FF4D00] text-black font-mono text-xs px-2 py-1 mb-4 inline-block font-bold">QUEST RECEIVED</span>
                  <h3 className="font-anton text-5xl md:text-6xl uppercase leading-[0.9]">Solo<br/>Leveling</h3>
              </div>

              {/* Panel 2 (Tengah, Numpuk Panel 1 dikit) */}
              <div className="manhwa-float absolute top-[40%] right-[5%] md:right-[30%] w-[70vw] md:w-[25vw] bg-white text-black p-6 border-4 border-black z-20 rotate-3">
                  <p className="font-mono text-xs md:text-sm leading-relaxed">
                      "I hope one day a quest board appears in front of me. A world where effort guarantees a level up."
                  </p>
              </div>

              {/* Panel 3 (Bawah Kiri) */}
              <div className="manhwa-float absolute bottom-[10%] left-[10%] md:left-[20%] w-[60vw] md:w-[30vw] border-4 border-black p-4 bg-transparent z-0">
                  <h3 className="font-anton text-4xl text-transparent md:text-stroke text-stroke-black">
                      OMNISCIENT<br/>READER
                  </h3>
              </div>
              
              {/* Konteks Penjelas (Sticky Note) */}
              <div className="absolute top-[60%] right-[10%] z-30">
                  <StickyNote 
                    title="The Escape" 
                    text="Logic is boring. Stories are wild. This is my cheat code to disconnect from reality."
                    rotation="-2deg" 
                  />
              </div>
          </div>
      </section>

      {/* --- SECTION 4: CAT (ZERO GRAVITY) --- */}
      <section ref={catRef} className="min-h-screen relative flex items-center justify-center bg-[#111] overflow-hidden">
          
          {/* Teks Gede di Tengah (Floating Magnetic) */}
          <div className="cat-giant-text relative z-10 text-center mix-blend-difference">
              <h2 className="font-anton text-[20vw] leading-[0.8] text-[#EAEAEA]">PAY</h2>
              <h2 className="font-anton text-[20vw] leading-[0.8] text-transparent text-stroke">TRIBUTE</h2>
          </div>

          {/* Elemen Floating di sekitarnya */}
          <div className="absolute top-[20%] left-[10%] font-mono text-xs text-[#FF4D00] animate-bounce">
              [ 🐈 FELINE DETECTED ]
          </div>

          {/* Sticky Note di Tengah Bawah */}
          <div className="absolute bottom-[20%] z-20">
               <StickyNote 
                 title="The Boss" 
                 text="He sleeps on my keyboard. He judges my code. He drains my wallet. Worth it."
                 rotation="0deg" 
               />
          </div>

          {/* Orbiting Circles (Abstract Cat Toys) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-white/10 rounded-full animate-spin-slow pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-white/10 rounded-full animate-spin-reverse pointer-events-none"></div>
      </section>

      <footer className="py-12 border-t border-white/10 text-center">
          <p className="font-mono text-xs opacity-50">RADYA.MY.ID / CHAOS_MODE / END</p>
      </footer>

      <style jsx>{`
        .writing-vertical { writing-mode: vertical-rl; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-spin-reverse { animation: spin 15s linear infinite reverse; }
        @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
        .text-stroke-black { -webkit-text-stroke: 1px black; color: transparent; }
      `}</style>
    </main>
  );
}