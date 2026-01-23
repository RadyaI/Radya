'use client';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TextStagger = ({ children, className = "", delay = 0 }: { children: string, className?: string, delay?: number }) => {
  const el = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (el.current) {
      const chars = el.current.querySelectorAll('.char');
      gsap.fromTo(chars, 
        { yPercent: 100, opacity: 0 },
        { 
          yPercent: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.03, 
          ease: "power3.out",
          delay: delay,
          scrollTrigger: {
            trigger: el.current,
            start: "top 85%",
          }
        }
      );
    }
  }, [delay]);

  return (
    <div ref={el} className={`overflow-hidden flex flex-wrap ${className}`}>
      {children.split("").map((char, i) => (
        <span key={i} className="char inline-block whitespace-pre relative">
          {char}
        </span>
      ))}
    </div>
  );
};

export default function BMWBrutalistPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      
      const heroTl = gsap.timeline();
      heroTl
        .to(".hero-overlay", { scaleY: 0, duration: 1.5, ease: "expo.inOut" })
        .from(".hero-img", { scale: 1.5, duration: 2, ease: "power2.out" }, "-=1")
        .from(".hero-title-char", { yPercent: 100, stagger: 0.1, duration: 1, ease: "power4.out" }, "-=1.5");

      gsap.utils.toArray('.parallax-section').forEach((sec: any) => {
        const img = sec.querySelector('.parallax-img');
        const txt = sec.querySelector('.parallax-text');
        
        gsap.to(img, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        if(txt) {
          gsap.to(txt, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

      const evoSection = document.querySelector('.evolution-section');
      const evoTrack = document.querySelector('.evolution-track');
      
      if(evoSection && evoTrack) {
        gsap.to(evoTrack, {
            xPercent: -100,
            x: () => window.innerWidth, 
            ease: "none",
            scrollTrigger: {
                trigger: evoSection,
                start: "top top",
                end: "+=2000", 
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });
      }

      gsap.utils.toArray('.grid-item').forEach((item: any, i) => {
          gsap.from(item, {
              clipPath: "inset(0 100% 0 0)", 
              duration: 1,
              ease: "power4.inOut",
              scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
              }
          })
      });

    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-[#E0E0E0] text-[#111] min-h-screen w-full overflow-x-hidden selection:bg-black selection:text-white font-sans">
      
      {}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] z-[9999] mix-blend-multiply" 
           style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}>
      </div>

      {}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end border-b-8 border-black">
         {}
         <div className="hero-overlay absolute inset-0 bg-black z-50 origin-top"></div>
         
         {}
         <div className="absolute inset-0 z-0">
            <Image 
                src="/images/bmw/m4_g82.png" 
                alt="M4 G82" 
                fill 
                className="hero-img object-cover object-center grayscale contrast-125"
                priority
            />
            {}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
         </div>

         {}
         <div className="relative z-10 px-6 md:px-12 pb-12 w-full">
            <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/50 pb-8 mb-8">
                <div className="overflow-hidden">
                    <h1 className="text-[15vw] leading-[0.8] font-black uppercase text-white tracking-tighter mix-blend-difference">
                        <span className="hero-title-char inline-block">M</span>
                        <span className="hero-title-char inline-block">4</span>
                        <span className="hero-title-char inline-block text-transparent stroke-white" style={{WebkitTextStroke: '2px white'}}>.</span>
                        <span className="hero-title-char inline-block">G</span>
                        <span className="hero-title-char inline-block">8</span>
                        <span className="hero-title-char inline-block">2</span>
                    </h1>
                </div>
                <div className="text-right text-white font-mono text-xs md:text-sm uppercase tracking-widest mb-2">
                    <p>Bavarian Motor Works</p>
                    <p>M-Division // Est. 1972</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-white">
                 <div className="col-span-12 md:col-span-4">
                     <TextStagger className="text-xl font-bold uppercase leading-tight">
                         The controversial grille. The undeniable performance. Love it or hate it, you will respect it.
                     </TextStagger>
                 </div>
                 <div className="col-span-12 md:col-span-8 flex justify-end">
                     <div className="h-16 w-1 bg-[#0066B1] mr-1"></div> {}
                     <div className="h-16 w-1 bg-[#003882] mr-1"></div> {}
                     <div className="h-16 w-1 bg-[#E82C2A]"></div>    {}
                 </div>
            </div>
         </div>
      </section>


      {}
      {}
      <section className="evolution-section relative h-screen bg-[#111] overflow-hidden text-[#E0E0E0]">
          <div className="evolution-track flex h-full w-[200vw]">
              
              {}
              <div className="w-screen h-full relative border-r-4 border-[#333] flex items-center justify-center overflow-hidden">
                  <div className="absolute top-10 left-10 z-20 mix-blend-difference">
                      <h2 className="text-[10vw] font-black uppercase text-white opacity-50">F80</h2>
                  </div>
                  <div className="relative w-[80%] h-[60%]">
                      <Image 
                        src="/images/bmw/m3_f80.png" 
                        alt="M3 F80" 
                        fill 
                        className="object-contain object-center hover:scale-105 transition-transform duration-700"
                      />
                  </div>
                  <div className="absolute bottom-20 right-20 max-w-md text-right z-20">
                      <h3 className="text-4xl font-bold uppercase mb-4">The Aggressive Classic</h3>
                      <p className="font-mono text-sm text-gray-400">
                          The last of the "traditional" kidney grilles. A silhouette that defined a generation of street performance.
                      </p>
                  </div>
                  {}
                  <div className="absolute bottom-0 left-0 text-[20vw] font-black leading-none text-[#222] -z-10 select-none">
                      LEGACY
                  </div>
              </div>

              {}
              <div className="w-screen h-full relative bg-[#E0E0E0] text-[#111] flex items-center justify-center overflow-hidden">
                   <div className="absolute top-10 right-10 z-20">
                      <h2 className="text-[10vw] font-black uppercase text-black opacity-10">G80</h2>
                  </div>
                  <div className="relative w-[80%] h-[60%] z-10">
                      <Image 
                        src="/images/bmw/m3_g80.png" 
                        alt="M3 G80" 
                        fill 
                        className="object-contain object-center hover:scale-105 transition-transform duration-700 filter drop-shadow-2xl"
                      />
                  </div>
                  <div className="absolute top-1/4 left-20 max-w-md z-20">
                      <h3 className="text-4xl font-bold uppercase mb-4 border-l-4 border-black pl-4">The Radical Shift</h3>
                      <p className="font-mono text-sm text-gray-600">
                          503 Horsepower. S58 Engine. A design that screams in your face. It doesn't ask for permission.
                      </p>
                  </div>
                   {}
                  <div className="absolute top-0 right-0 text-[20vw] font-black leading-none text-[#CCC] -z-10 select-none">
                      FUTURE
                  </div>
              </div>

          </div>
      </section>


      {}
      <section className="parallax-section relative min-h-[120vh] bg-black text-white overflow-hidden border-b-8 border-[#E0E0E0]">
          {}
          <div className="parallax-img absolute inset-0 h-[120%] w-full opacity-60">
               <Image src="/images/bmw/m2.png" alt="M2" fill className="object-cover object-center grayscale" />
          </div>
          
          <div className="absolute inset-0 grid grid-cols-6 pointer-events-none">
              <div className="border-r border-white/10 h-full"></div>
              <div className="border-r border-white/10 h-full"></div>
              <div className="border-r border-white/10 h-full"></div>
              <div className="border-r border-white/10 h-full"></div>
              <div className="border-r border-white/10 h-full"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full pt-40 px-6">
              {}
              <h2 className="parallax-text text-[18vw] font-black uppercase leading-none text-center mix-blend-overlay">
                  POCKET<br/>ROCKET
              </h2>
              
              <div className="bg-[#E0E0E0] text-black p-8 max-w-2xl mx-auto mt-[-5vw] relative z-20 shadow-[20px_20px_0px_0px_rgba(255,255,255,0.2)]">
                  <h3 className="text-3xl font-bold uppercase mb-4">BMW M2: Pure Driving.</h3>
                  <TextStagger className="text-lg font-medium leading-relaxed text-justify">
                      Short wheelbase. Rear-wheel drive. Manual transmission option. In a world of digital numbness, the M2 remains analog. It is the spiritual successor to the legendary 2002 Turbo.
                  </TextStagger>
                  <div className="mt-8 flex justify-between border-t border-black pt-4 font-mono font-bold">
                      <span>0-60: 3.9s</span>
                      <span>Weight: 1700kg</span>
                  </div>
              </div>
          </div>
      </section>


      {}
      <section className="py-24 px-4 md:px-12 bg-[#E0E0E0]">
          <div className="mb-12 border-b-4 border-black pb-4 flex justify-between items-end">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Business<br/>Class.</h2>
              <span className="font-mono text-xs uppercase tracking-widest bg-black text-white p-2">V8 Twin Turbo Section</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              
              {}
              <div className="col-span-1 md:col-span-2 relative h-[60vh] bg-black group overflow-hidden grid-item">
                  <Image src="/images/bmw/m5.png" alt="M5" fill className="object-cover object-center opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-center items-start p-12">
                      <h3 className="text-8xl font-black text-transparent stroke-white uppercase" style={{WebkitTextStroke: '2px white'}}>M5</h3>
                      <p className="text-white bg-black p-2 font-mono text-sm mt-4 inline-block">THE SUPER SEDAN</p>
                  </div>
              </div>

              {}
              <div className="col-span-1 relative h-[50vh] bg-black group overflow-hidden grid-item">
                   <Image src="/images/bmw/m8_front.png" alt="M8 Front" fill className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700" />
                   <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black to-transparent">
                       <h3 className="text-5xl font-black text-white uppercase mb-2">M8 comp.</h3>
                       <p className="text-gray-300 font-mono text-xs">The Flagship Coupe.</p>
                   </div>
              </div>

              {}
              <div className="col-span-1 relative h-[50vh] bg-black group overflow-hidden grid-item">
                   <Image src="/images/bmw/m8_back.png" alt="M8 Back" fill className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700" />
                   <div className="absolute top-0 right-0 p-8">
                        <div className="w-20 h-20 rounded-full border border-white flex items-center justify-center animate-spin-slow">
                            <span className="text-white font-mono text-xs">V8</span>
                        </div>
                   </div>
              </div>
          </div>
      </section>


      {}
      <section className="relative py-32 bg-[#111] overflow-hidden border-t-8 border-black">
          {}
          <div className="absolute top-1/2 -translate-y-1/2 w-full overflow-hidden whitespace-nowrap opacity-10 pointer-events-none">
              <h2 className="text-[20vw] font-black text-white uppercase leading-none">
                 Sheer Driving Pleasure Sheer Driving Pleasure
              </h2>
          </div>

          <div className="relative z-10 container mx-auto px-6">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                   <div className="col-span-12 w-97 md:col-span-4 text-white z-20 mix-blend-difference">
                       <h3 className="text-4xl font-bold uppercase mb-6 border-l-4 border-white pl-4">The Silhouette</h3>
                       <TextStagger className="text-gray-400 leading-relaxed text-justify">
                           Perfect 50:50 weight distribution. The Hofmeister kink. The long hood and short overhangs. Every line serves a purpose: aerodynamics or cooling. Form follows function.
                       </TextStagger>
                   </div>
                   
                   <div className="col-span-12 md:col-span-8">
                       <div className="relative h-[40vh] w-full">
                           {}
                           <Image 
                            src="/images/bmw/bmw_left_side.png" 
                            alt="Side Profile" 
                            fill 
                            className="object-contain object-center scale-125"
                           />
                       </div>
                   </div>
               </div>
          </div>
      </section>


      {}
      <footer className="relative min-h-[80vh] bg-[#E0E0E0] text-black flex flex-col justify-between p-6 md:p-12 border-t-8 border-black">
           
           <div className="absolute top-0 right-0 w-[50vw] h-full opacity-20 pointer-events-none">
               <Image src="/images/bmw/m4_f82.png" alt="M4 F82" fill className="object-cover object-left grayscale" />
           </div>

           <div className="relative z-10 grid grid-cols-2 gap-20">
               <div>
                   <h2 className="text-8xl font-black uppercase mb-8 tracking-tighter">M-Power.</h2>
                   <div className="space-y-4 font-mono font-bold uppercase">
                       <a href="#" className="block hover:pl-4 transition-all duration-300">Models</a>
                       <a href="#" className="block hover:pl-4 transition-all duration-300">Configurator</a>
                       <a href="#" className="block hover:pl-4 transition-all duration-300">Track Days</a>
                   </div>
               </div>
           </div>

           <div className="relative z-10 mt-20 border-t-4 border-black pt-8 flex flex-col md:flex-row justify-between items-end">
               <div className="text-[12vw] leading-none font-black uppercase">
                   B.M.W.
               </div>
           </div>
      </footer>

    </main>
  );
}