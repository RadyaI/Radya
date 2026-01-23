'use client';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const TextReveal = ({ children, className = "" }: { children: string, className?: string }) => {
    const element = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (element.current) {
            gsap.fromTo(element.current.children,
                { y: "100%", opacity: 0, rotate: 5 },
                {
                    y: "0%",
                    opacity: 1,
                    rotate: 0,
                    duration: 0.8,
                    stagger: 0.02,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element.current,
                        start: "top 90%",
                    }
                }
            );
        }
    }, []);

    const words = children.split(" ");

    return (
        <div ref={element} className={`flex flex-wrap overflow-hidden ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] origin-top-left will-change-transform">
                    {word}
                </span>
            ))}
        </div>
    );
};

const ScrambleTitle = ({ text, className }: { text: string, className?: string }) => {
    const el = useRef<HTMLHeadingElement>(null);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el.current,
                start: "top 85%",
            }
        });

        let iterations = 0;
        tl.to(el.current, {
            duration: 1.5,
            onUpdate: () => {
                if (el.current) {
                    el.current.innerText = text.split("")
                        .map((char, index) => {
                            if (index < iterations) return text[index];
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("");
                    iterations += 1 / 2;
                }
            }
        });
    }, [text]);

    return <h2 ref={el} className={className}>{text}</h2>;
}


export default function MaximalistFixedPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
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

            gsap.to(".hero-img-container", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            const marqueeInner = marqueeRef.current;
            if (marqueeInner) {
                gsap.to(marqueeInner, {
                    xPercent: -50,
                    repeat: -1,
                    duration: 15,
                    ease: "linear"
                });
            }

            gsap.utils.toArray('.reveal-image').forEach((img: any) => {
                gsap.fromTo(img,
                    { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                    {
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        duration: 1.2,
                        ease: "power4.inOut",
                        scrollTrigger: {
                            trigger: img,
                            start: "top 70%"
                        }
                    }
                );
            });

        }, containerRef);

        return () => {
            ctx.revert();
            lenis.destroy();
        };
    }, []);


    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const footerLinks = [
        { name: "INSTAGRAM", url: "#", img: "/images/cats/cat2.png" },
        { name: "BEHANCE", url: "#", img: "/images/cats/cat3.png" },
        { name: "TWITTER", url: "#", img: "/images/cats/cat4.png" },
        { name: "EMAIL", url: "#", img: "/images/cats/cat5.png" },
    ];

    return (
        <main ref={containerRef} className="bg-[#EAEAEA] text-[#050505] min-h-screen w-full overflow-x-hidden selection:bg-[#FF4400] selection:text-white font-sans">

            { }
            <div className="fixed inset-0 grid grid-cols-6 md:grid-cols-12 pointer-events-none z-0 px-4 md:px-12 opacity-10">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="border-r border-black h-full last:border-r-0"></div>
                ))}
            </div>

            { }
            <section className="hero-section relative min-h-screen w-full flex flex-col pt-24 px-4 md:px-12 overflow-hidden border-b-4 border-black">

                { }
                <div className="absolute top-0 right-0 opacity-5 font-black text-[20vw] leading-none select-none pointer-events-none z-0">
                    FELIS
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 h-full">

                    { }
                    <div className="col-span-12 md:col-span-5 flex flex-col justify-center z-20 order-2 md:order-1 pb-12 md:pb-0">
                        <div className="mb-6 border-l-4 border-[#FF4400] pl-6">
                            <p className="font-mono text-xs uppercase tracking-widest text-[#FF4400] mb-2">/// Classified: Apex Predator</p>
                            { }
                            <ScrambleTitle text="PURE INSTINCT." className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter" />
                        </div>

                        { }
                        <div className="relative bg-[#EAEAEA]/80 backdrop-blur-sm p-4 md:p-0 rounded-lg md:bg-transparent">
                            <TextReveal className="text-lg md:text-xl font-medium leading-tight text-justify">
                                The domestic cat is a small carnivorous mammal. It is the only domesticated species in the family Felidae. Even in a home environment, their biological engineering remains that of a lethal hunter.
                            </TextReveal>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full animate-bounce">↓</div>
                            <p className="font-mono text-xs uppercase max-w-[150px]">Scroll to witness the anatomy of silence.</p>
                        </div>
                    </div>

                    { }
                    <div className="col-span-12 md:col-span-7 relative h-[50vh] md:h-[80vh] w-full order-1 md:order-2 z-10">
                        <div className="hero-img-container relative w-full h-full overflow-hidden border border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                            <Image
                                src="/images/cats/cat.png"
                                alt="Hero Cat"
                                fill
                                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                                priority
                            />
                            { }
                            <div className="absolute top-0 right-0 bg-[#FF4400] text-white p-4 font-black text-4xl">
                                FIG. A
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            { }
            <section className="py-8 bg-black text-[#EAEAEA] overflow-hidden border-b-4 border-[#FF4400]">
                { }
                <div className="w-full overflow-hidden whitespace-nowrap">
                    <div ref={marqueeRef} className="flex w-max">
                        { }
                        <div className="flex shrink-0">
                            <span className="text-6xl md:text-9xl font-black uppercase tracking-tighter mx-8">Dominance — Elegance — Silence — </span>
                            <span className="text-6xl md:text-9xl font-black uppercase tracking-tighter mx-8 text-[#FF4400]">Hunter — Killer — Lover — </span>
                        </div>
                        <div className="flex shrink-0">
                            <span className="text-6xl md:text-9xl font-black uppercase tracking-tighter mx-8">Dominance — Elegance — Silence — </span>
                            <span className="text-6xl md:text-9xl font-black uppercase tracking-tighter mx-8 text-[#FF4400]">Hunter — Killer — Lover — </span>
                        </div>
                    </div>
                </div>
            </section>


            { }
            <section className="min-h-screen bg-[#EAEAEA] border-b-4 border-black">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">

                    { }
                    <div className="relative h-[80vh] md:h-auto border-r border-black overflow-hidden group">
                        <div className="reveal-image w-full h-full relative">
                            <Image src="/images/cats/cat2.png" alt="Strip 1" fill className="object-cover grayscale group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                        </div>
                        <div className="absolute bottom-10 left-10 z-20">
                            <ScrambleTitle text="VERTICAL AGILITY" className="text-4xl md:text-6xl font-black text-white stroke-black" />
                        </div>
                    </div>

                    { }
                    <div className="flex flex-col h-full border-l border-black">

                        <div className="p-8 md:p-16 flex flex-col justify-center bg-white h-auto flex-shrink-0 border-b border-black">
                            <p className="font-mono text-[#FF4400] text-sm mb-4">/// DATA POINT: 0992</p>
                            <h3 className="text-4xl font-bold uppercase mb-6 leading-none">
                                Designed for <br />Zero Error.
                            </h3>
                            <TextReveal className="text-lg text-[#333] leading-relaxed">
                                A cat's skeleton is not just bone; it is a system of levers and fulcrums designed for explosive power. They do not run; they flow. They do not jump; they levitate.
                            </TextReveal>
                        </div>
                        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] flex-grow overflow-hidden group">
                            <div className="reveal-image w-full h-full relative">
                                <Image src="/images/cats/cat3.png" alt="Strip 2" fill className="object-cover object-center sepia group-hover:sepia-0 transition-all" />
                            </div>
                            <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-30">
                                <div className="border-r border-white/50 h-full"></div>
                                <div className="border-r border-white/50 h-full"></div>
                                <div className="border-r border-white/50 h-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            { }
            <section className="py-24 px-4 md:px-12 bg-[#111] text-[#EAEAEA]">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#333] pb-8">
                    <ScrambleTitle text="SPECIMEN ARCHIVE." className="text-5xl md:text-8xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-[#333]" />
                    <div className="text-right font-mono text-xs text-[#FF4400] mt-4 md:mt-0">
                        <p>ACCESS GRANTED</p>
                        <p>LEVEL 5 CLEARANCE</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    { }
                    <div className="col-span-12 md:col-span-8 relative group">
                        <div className="reveal-image relative aspect-video w-full overflow-hidden border border-[#333]">
                            <Image src="/images/cats/cat4.png" alt="Specimen 4" fill className="object-cover grayscale" />

                            { }
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                                <div className="text-center">
                                    <h4 className="text-4xl font-black text-[#FF4400]">THE STARE</h4>
                                    <p className="font-mono text-sm mt-2">Target Acquisition Locked.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between font-mono text-xs border-t border-[#333] pt-2">
                            <span>FIG 4.0</span>
                            <span>RETINA SCAN COMPLETE</span>
                        </div>
                    </div>

                    { }
                    <div className="col-span-12 md:col-span-4 relative mt-12 md:mt-0">
                        <div className="reveal-image relative h-[60vh] w-full overflow-hidden border-2 border-[#FF4400]">
                            <Image src="/images/cats/cat5.png" alt="Specimen 5" fill className="object-cover" />
                            <div className="absolute top-4 right-4 animate-pulse">
                                <div className="w-3 h-3 bg-[#FF4400] rounded-full"></div>
                            </div>
                        </div>
                        <div className="p-4 bg-[#222] border-l-2 border-[#FF4400] mt-4">
                            <p className="font-bold uppercase text-sm mb-1">Observation Note:</p>
                            <TextReveal className="text-xs text-[#999]">
                                Subject displays zero hesitation. Movement is fluid. Sound emission is minimal. The perfect biological machine.
                            </TextReveal>
                        </div>
                    </div>

                </div>
            </section>


            { }
            { }
            { }
            <footer className="relative bg-[#0a0a0a] text-[#EAEAEA] border-t-8 border-[#FF4400] overflow-hidden min-h-screen flex flex-col">

                { }
                { }
                <div className="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out opacity-30 pointer-events-none">

                    { }
                    <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 ${hoveredLink === null ? 'block' : 'hidden'}`}></div>

                    { }
                    {[
                        { id: 'hero', img: '/images/cats/cat.png' },
                        { id: 'strip', img: '/images/cats/cat2.png' },
                        { id: 'grid', img: '/images/cats/cat4.png' },
                        { id: 'gallery', img: '/images/cats/cat3.png' }
                    ].map((item) => (
                        <div key={item.id} className={`absolute inset-0 transition-opacity duration-500 ${hoveredLink === item.id ? 'opacity-100' : 'opacity-0'}`}>
                            <Image src={item.img} alt="Preview" fill className="object-cover grayscale" />
                            { }
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 background-size-[100%_2px,3px_100%] pointer-events-none"></div>
                        </div>
                    ))}
                </div>


                { }
                <div className="relative z-20 bg-[#FF4400] text-black py-3 overflow-hidden border-b border-black">
                    <div className="flex whitespace-nowrap animate-marquee-fast font-mono text-xs md:text-sm font-black uppercase tracking-widest">
                        {[...Array(6)].map((_, i) => (
                            <span key={i} className="mx-8">
                         /// SYSTEM INTEGRITY: 100% — FELINE OBSERVER ACTIVE — DO NOT DISTURB — NO EXIT STRATEGY —
                            </span>
                        ))}
                    </div>
                </div>


                { }
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 flex-grow">

                    { }
                    <div className="p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#333] bg-black/40 backdrop-blur-md">

                        <div>
                            <h2 className="text-[12vw] leading-[0.8] font-black uppercase tracking-tighter text-[#EAEAEA] mb-8 mix-blend-difference">
                                End of<br /><span className="text-[#FF4400]">Line.</span>
                            </h2>

                            <div className="border-l-2 border-[#FF4400] pl-6 py-2">
                                <p className="font-mono text-xs text-[#FF4400] mb-2">/// STATUS REPORT</p>
                                <p className="text-xl md:text-2xl font-medium leading-tight max-w-md text-justify">
                                    "You have reached the bottom of the observation deck. There is nothing else. The cat is watching you."
                                </p>
                            </div>
                        </div>

                        { }
                        <div className="mt-12 grid grid-cols-2 gap-4 font-mono text-[10px] md:text-xs text-[#666] uppercase">
                            <div className="border border-[#333] p-4">
                                <p className="mb-2 text-[#EAEAEA]">Memory Usage</p>
                                <div className="w-full h-1 bg-[#333] mb-1"><div className="w-[80%] h-full bg-[#FF4400] animate-pulse"></div></div>
                                <p>842 MB / 1024 MB</p>
                            </div>
                            <div className="border border-[#333] p-4">
                                <p className="mb-2 text-[#EAEAEA]">Scroll Depth</p>
                                <div className="w-full h-1 bg-[#333] mb-1"><div className="w-[100%] h-full bg-[#FF4400]"></div></div>
                                <p>100% COMPLETE</p>
                            </div>
                            <div className="border border-[#333] p-4 col-span-2 flex justify-between items-center">
                                <span>Connection</span>
                                <span className="text-[#FF4400] animate-pulse">● SECURE (LOCALHOST)</span>
                            </div>
                        </div>
                    </div>


                    { }
                    <div className="flex flex-col bg-black/60 backdrop-blur-xl">

                        { }
                        <div className="p-4 border-b border-[#333] font-mono text-xs text-[#666] uppercase tracking-widest text-center">
                            Select Sector to Re-Initialize
                        </div>

                        { }
                        {[
                            { id: 'hero', label: '01. ORIGIN', desc: 'Top Level' },
                            { id: 'strip', label: '02. HUNTER', desc: 'Evolution Data' },
                            { id: 'grid', label: '03. ANATOMY', desc: 'Biological Grid' },
                            { id: 'gallery', label: '04. GALLERY', desc: 'Visual Evidence' }
                        ].map((sector) => (
                            <button
                                key={sector.id}
                                onMouseEnter={() => setHoveredLink(sector.id)}
                                onMouseLeave={() => setHoveredLink(null)}
                                onClick={() => {
                                    const target = document.querySelector(sector.id === 'hero' ? '.hero-section'
                                        : sector.id === 'strip' ? '.strip-section'
                                            : sector.id === 'grid' ? '.grid-reveal-img'
                                                : '.reveal-image'
                                    );
                                    target?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="group flex-grow relative border-b border-[#333] flex items-center px-8 md:px-16 hover:bg-[#FF4400] transition-colors duration-300 text-left"
                            >
                                <div className="relative z-10 w-full flex justify-between items-baseline">
                                    <span className="text-4xl md:text-5xl font-black italic uppercase text-[#EAEAEA] group-hover:text-black transition-colors duration-300">
                                        {sector.label}
                                    </span>
                                    <span className="font-mono text-xs text-[#666] group-hover:text-black transition-colors duration-300 hidden md:block">
                                        [{sector.desc}]
                                    </span>
                                </div>
                                { }
                                <div className="absolute inset-0 bg-[#EAEAEA] transform scale-x-0 group-hover:scale-x-0 transition-transform origin-left duration-500"></div>
                            </button>
                        ))}

                        { }
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="h-32 bg-[#111] hover:bg-[#EAEAEA] text-[#EAEAEA] hover:text-black transition-colors duration-500 flex flex-col items-center justify-center border-t border-[#333] group relative overflow-hidden"
                        >
                            <span className="relative z-10 text-2xl font-black uppercase tracking-[0.5em] group-hover:tracking-[1em] transition-all duration-500">
                                SYSTEM REBOOT
                            </span>
                            <span className="relative z-10 text-[10px] font-mono mt-2 opacity-50">
                                ( RETURN TO SURFACE )
                            </span>
                            { }
                            <div className="absolute inset-0 bg-[#FF4400] opacity-0 group-hover:opacity-10 mix-blend-overlay transition-opacity"></div>
                        </button>

                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full pointer-events-none overflow-hidden">
                    <h1 className="text-[25vw] leading-[0.7] font-black text-[#1a1a1a] select-none text-center transform translate-y-1/3">
                        WATCHING
                    </h1>
                </div>

            </footer>

            <style jsx global>{`
        @keyframes marqueeFast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fast {
          display: flex;
          width: max-content;
          animation: marqueeFast 15s linear infinite;
        }
      `}</style>

        </main>
    );
}