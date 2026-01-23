"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CONTENT = {
  hero: {
    big: "Yo\n oY",
    sub: "PROGRAMMER BY DAY / DREAMER BY NIGHT",
    tags: ["NEXT.JS", "GSAP", "BMW", "MANHWA", "CATS", "CARS", "SPEED"],
  },
  cats: {
    title: "THE\nFELINE\nDYNASTY",
    stats: [
      { label: "Cuteness", val: "100%" },
      { label: "Meow", val: "999%" },
      { label: "Nap Time", val: "18h" },
    ],
    desc: "A cat (Felis catus) is a small, carnivorous mammal from the Felidae family, known for being a popular companion animal due to its independence, agility, and hunting skills, characterized by sharp claws, excellent senses, and a flexible body, living as pets, farm cats, or feral cats.",
  },
  bmw: {
    title: "GERMAN\nPRECISION",
    sub: "THE ULTIMATE DRIVING MACHINE",
    specs: [
      "INLINE 6 CYLINDER",
      "REAR WHEEL DRIVE",
      "DRIVING",
      "BRUUUM"
    ],
    review: "A car (or automobile) is a wheeled motor vehicle, typically with four wheels, designed primarily to transport people on roads, powered by an engine or motor, and seating a small number of passengers (usually 1 to 8)."
  },
  manhwa: {
    title: "VISUAL\nOVERDOSE",
    list: ["SOLO LEVELING", "WINDBREAKER", "LOOKISM", "NANO MACHINE", "TOWER OF GOD", "ELECEED"]
  }
};

export default function MaximalistPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      gsap.to(".marquee-track", {
        xPercent: -50,
        ease: "none",
        duration: 10,
        repeat: -1
      });

      gsap.from(".hero-block", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "elastic.out(1, 0.7)"
      });

      gsap.utils.toArray(".cat-card").forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          },
          rotation: i % 2 === 0 ? -10 : 10,
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        });
      });

      gsap.utils.toArray(".bmw-img-wrapper img").forEach((img: any) => {
        gsap.to(img, {
          scale: 1.1,
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

      gsap.utils.toArray(".highlight-text").forEach((el: any) => {
        gsap.to(el, {
          backgroundSize: "100% 100%",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          duration: 0.5,
          ease: "power2.out"
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-black min-h-screen overflow-x-hidden font-sans selection:bg-black selection:text-white">

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;700&display=swap');
        .font-heavy { font-family: 'Archivo Black', sans-serif; }
        .font-mono-pop { font-family: 'Space Grotesk', monospace; }
        
        .stroke-text {
          -webkit-text-stroke: 2px black;
          color: transparent;
        }
        .stroke-text:hover {
          color: #FF5500;
        }
      `}</style>

      <section className="min-h-screen pt-20 flex flex-col justify-between border-b-4 border-black relative">
        <div className="px-4 md:px-10">
          <div className="flex flex-wrap gap-4 mb-4">
            {["RADYA"].map((tag, i) => (
              <span key={i} className="hero-block inline-block px-4 py-1 border-2 border-black bg-yellow-300 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="hero-block font-heavy text-[15vw] leading-[0.8] tracking-tighter text-black mix-blend-hard-light z-10 relative">
            {CONTENT.hero.big}
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-10 border-t-4 border-black pt-6">
            <p className="hero-block font-mono-pop text-2xl md:text-4xl font-bold max-w-lg leading-tight uppercase">
              {CONTENT.hero.sub}
            </p>
            <div className="hero-block mt-6 md:mt-0 flex flex-col text-right">
              <span className="font-heavy text-6xl text-orange-600">100%</span>
              <span className="font-bold border-b-4 border-orange-600">PASSION RATE</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-black text-white py-4 overflow-hidden border-y-4 border-black mt-10 rotate-1 scale-105 origin-left">
          <div className="marquee-track flex gap-8 whitespace-nowrap font-heavy text-4xl">
            {[...CONTENT.hero.tags, ...CONTENT.hero.tags, ...CONTENT.hero.tags].map((t, i) => (
              <span key={i} className="mx-4">{t} /// </span>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 px-4 md:px-10 bg-yellow-50 border-b-4 border-black">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          <div className="md:col-span-8 flex flex-col justify-center">
            <h2 className="font-heavy text-7xl md:text-9xl mb-6 leading-[0.85]">
              {CONTENT.cats.title}
            </h2>
            <p className="font-mono-pop text-xl md:text-2xl font-bold border-l-8 border-black pl-6 py-2 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {CONTENT.cats.desc}
            </p>
          </div>

          <div className="md:col-span-4 bg-black text-white p-8 shadow-[10px_10px_0px_0px_#FF5500]">
            <h3 className="font-heavy text-4xl mb-6 text-yellow-300">STATS_</h3>
            {CONTENT.cats.stats.map((s, i) => (
              <div key={i} className="flex justify-between items-end border-b border-gray-700 py-3 font-mono-pop text-xl">
                <span>{s.label}</span>
                <span className="font-bold text-2xl">{s.val}</span>
              </div>
            ))}
          </div>

          <div className="cat-card md:col-span-5 relative h-[400px] border-4 border-black bg-white p-2 rotate-[-2deg]">
            <div className="absolute -top-4 -left-4 bg-orange-500 text-white font-bold px-4 py-2 border-2 border-black z-20">Apa sih</div>
            <img src="/images/cat.png" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
            <h4 className="absolute bottom-2 right-2 font-heavy text-5xl text-white stroke-black" style={{ WebkitTextStroke: "2px black" }}>MEOW</h4>
          </div>

          <div className="cat-card md:col-span-4 relative h-[400px] border-4 border-black bg-white p-2 rotate-[2deg] top-10">
            <img src="/images/cat2.png" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50">
              <span className="font-heavy text-white text-4xl">SLEEPING...</span>
            </div>
          </div>

          <div className="cat-card md:col-span-3 relative h-[400px] border-4 border-black bg-white p-2 rotate-[-1deg]">
            <img src="/images/cat3.png" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 w-full bg-yellow-400 border-t-4 border-black p-2 text-center font-bold">WARNING</div>
          </div>

        </div>
      </section>


      <section className="py-20 bg-blue-600 text-white border-b-4 border-black overflow-hidden relative">
        <div className="absolute top-0 right-0 font-heavy text-[30vw] opacity-10 leading-none select-none">READ</div>

        <div className="px-4 md:px-10 relative z-10">
          <h2 className="font-heavy text-6xl md:text-8xl mb-10 text-white stroke-text" style={{ WebkitTextStroke: "2px white", color: "transparent" }}>
            {CONTENT.manhwa.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {CONTENT.manhwa.list.map((item, i) => (
              <div key={i} className="group border-b-2 border-white/30 py-6 flex items-center justify-between hover:bg-black hover:px-4 transition-all duration-300 cursor-pointer">
                <span className="font-heavy text-3xl md:text-5xl uppercase">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-20 p-6 border-4 border-white bg-black w-full md:w-1/2 ml-auto rotate-1">
            <p className="font-mono-pop text-xl md:text-2xl leading-relaxed">
              "Manhwa (만화) is the Korean word for comics and print cartoons, similar to Japanese manga or Chinese manhua, covering diverse genres like action, romance, and fantasy, typically read from left to right."
            </p>
          </div>
        </div>
      </section>


      <section className="py-20 px-4 md:px-10 bg-white min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-end border-b-8 border-black pb-6 mb-10">
          <h2 className="font-heavy text-7xl md:text-[10vw] leading-[0.8]">
            BMW<br /><span className="text-orange-600">SERIES</span>
          </h2>
          <div className="text-right mb-2">
            <p className="font-bold text-xl uppercase tracking-widest">{CONTENT.bmw.sub}</p>
            <div className="flex gap-2 justify-end mt-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-black"></div>
              <div className="w-8 h-8 bg-black rounded-full border-2 border-black"></div>
              <div className="w-8 h-8 bg-white rounded-full border-2 border-black"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 grid-rows-[auto_auto]">

          <div className="md:col-span-8 border-4 border-black relative h-[300px] md:h-[500px] overflow-hidden group bmw-img-wrapper">
            <img src="/images/bmw1.png" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-bold text-sm">FIG 01. SIDE PROFILE</div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="bg-gray-100 border-4 border-black p-6 h-full flex flex-col justify-center">
              <h3 className="font-heavy text-3xl mb-4 underline decoration-4 decoration-orange-500">SPECIFICATION</h3>
              <ul className="space-y-3 font-mono-pop font-bold text-lg">
                {CONTENT.bmw.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-black"></span> {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 border-4 border-black bg-black relative h-[300px] overflow-hidden group bmw-img-wrapper">
            <img src="/images/bmw2.png" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 right-4 bg-white text-black px-3 py-1 font-bold text-sm border-2 border-black">FIG 02. DETAIL</div>
          </div>

          <div className="md:col-span-4 border-4 border-black bg-orange-600 p-8 flex items-center text-white">
            <p className="font-heavy text-2xl md:text-1xl leading-tight">
              "{CONTENT.bmw.review}"
            </p>
          </div>

          <div className="md:col-span-4 border-4 border-black bg-white relative h-[300px] overflow-hidden group bmw-img-wrapper">
            <img src="/images/bmw3.png" className="w-full h-full object-cover group-hover:rotate-1 transition-transform" />
            <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 font-bold text-sm border-2 border-black">FIG 03. ANGLE</div>
          </div>

        </div>

        <div className="mt-20 border-t-4 border-black pt-10 flex justify-center">
          <div className="w-40 h-40 rounded-full border-4 border-black flex items-center justify-center animate-spin-slow bg-black text-white">
            <span className="font-heavy text-center leading-none">THE<br />END</span>
          </div>
        </div>

      </section>

    </div>
  );
}