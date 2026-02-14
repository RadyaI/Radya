"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import toast, { Toaster } from "react-hot-toast";
import { Home, TriangleAlert, Skull, Wind, Bug, ShieldAlert, ArchiveX, Clock } from "lucide-react";
import Link from "next/link";

export default function BrokenPage() {
  const roomRef = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLDivElement>(null);
  const debrisRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        roomRef.current,
        { opacity: 0, scale: 1.05, filter: "grayscale(100%) blur(5px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "grayscale(80%) blur(0px)",
          duration: 2.5,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        signRef.current,
        { rotation: -12, transformOrigin: "top left" },
        {
          rotation: -8,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }
      );

      if (debrisRef.current) {
        gsap.to(debrisRef.current.children, {
          y: 15,
          rotation: () => Math.random() * 30 - 15,
          duration: 2.5,
          stagger: 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    const timeoutId = setTimeout(() => {
      toast("The air is thick with dust...", {
        icon: <Wind className="text-stone-500 w-5 h-5" />,
        style: {
          background: "#1c1917",
          color: "#a8a29e",
          border: "1px solid #44403c",
        },
      });
    }, 3500);

    return () => {
      ctx.revert();
      clearTimeout(timeoutId);
    };
  }, []);

  const dustParticles = Array.from({ length: 40 });

  return (
    <div
      ref={roomRef}
      className="relative min-h-screen bg-stone-950 overflow-hidden flex items-center justify-center font-serif text-stone-300 selection:bg-stone-800 p-4"
    >
      <Toaster position="bottom-center" />

      {mounted && dustParticles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-stone-500 rounded-full opacity-20 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="absolute top-10 left-10 opacity-10 rotate-[-15deg] pointer-events-none">
        <h2 className="text-[10rem] font-bold text-stone-700 uppercase tracking-tighter leading-none">
          Condemned
        </h2>
      </div>
      
      <div className="absolute bottom-10 right-10 opacity-5 rotate-[10deg] pointer-events-none">
        <h2 className="text-[8rem] font-bold text-stone-700 uppercase tracking-tighter leading-none">
          Keep Out
        </h2>
      </div>

      <svg className="absolute top-0 left-0 w-80 h-80 text-stone-800 opacity-50 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M0,0 L100,100 M0,0 L50,100 M0,0 L100,50 M0,20 Q20,20 20,0 M0,40 Q40,40 40,0 M0,60 Q60,60 60,0 M0,80 Q80,80 80,0 M10,30 L30,10 M20,50 L50,20 M40,80 L80,40" />
      </svg>
      
      <svg className="absolute bottom-0 right-0 w-96 h-96 text-stone-800 opacity-40 pointer-events-none rotate-180" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M0,0 L100,100 M0,0 L50,100 M0,0 L100,50 M0,20 Q20,20 20,0 M0,40 Q40,40 40,0 M0,60 Q60,60 60,0 M0,80 Q80,80 80,0 M10,10 L90,90 M30,70 L70,30" />
      </svg>

      <svg className="absolute top-1/4 right-1/4 w-32 h-32 text-stone-900 opacity-60 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M50,0 L45,20 L55,40 L40,60 L60,80 L50,100" />
      </svg>

      <svg className="absolute bottom-1/4 left-1/4 w-40 h-40 text-stone-900 opacity-70 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M0,50 L20,45 L40,55 L60,40 L80,60 L100,50" />
      </svg>

      <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none opacity-20">
          <div className="flex justify-between w-full">
            <ShieldAlert className="w-24 h-24 text-stone-700" />
            <Clock className="w-16 h-16 text-stone-700" />
          </div>
          <div className="flex justify-between w-full">
            <ArchiveX className="w-20 h-20 text-stone-700" />
            <Bug className="w-12 h-12 text-stone-700" />
          </div>
      </div>

      <div className="relative z-10 max-w-3xl w-full p-8 flex flex-col items-center">
        
        <div className="w-full flex justify-between mb-8 opacity-30">
            <div className="w-32 h-4 bg-stone-800 rotate-12" />
            <div className="w-48 h-6 bg-stone-800 -rotate-6" />
        </div>

        <div
          ref={signRef}
          className="bg-stone-900 border-4 border-stone-800 p-10 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative mb-12"
        >
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-stone-600" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-stone-600" />
          
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-stone-700" />
          
          <div className="flex flex-col items-center gap-6 text-center">
            <TriangleAlert className="w-20 h-20 text-stone-600" strokeWidth={1} />
            <h1 className="text-5xl md:text-7xl font-bold tracking-[0.3em] text-stone-400 uppercase">
              Dead End
            </h1>
            <div className="w-full h-px bg-stone-700 my-4" />
            <p className="text-stone-500 tracking-widest text-lg">
              Nothing left to salvage here.
            </p>
          </div>
        </div>

        <div ref={debrisRef} className="absolute bottom-32 flex gap-16 opacity-30 items-end">
          <Skull className="w-12 h-12 text-stone-700" strokeWidth={1} />
          <div className="w-20 h-4 bg-stone-800 rotate-45 rounded-sm" />
          <div className="w-10 h-10 border-4 border-stone-800 rounded-full" />
          <div className="w-16 h-16 bg-stone-900 border border-stone-800 rotate-12 flex items-center justify-center">
              <ArchiveX className="w-6 h-6 text-stone-700" />
          </div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 z-20"
        >
          <Link
            href="/"
            className="group relative flex items-center gap-4 px-10 py-5 bg-stone-900 border-2 border-stone-700 text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-all duration-300"
          >
            <Home className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="tracking-[0.2em] uppercase text-base font-bold">
              Escape to Home
            </span>
            <div className="absolute inset-0 border-2 border-stone-600 opacity-0 group-hover:opacity-30 scale-110 group-hover:scale-100 transition-all duration-300" />
          </Link>
        </motion.div>
        
        <div className="w-full flex justify-center mt-12 opacity-20">
            <div className="w-64 h-2 bg-stone-800 -rotate-3" />
        </div>

      </div>

      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.95)]" />
    </div>
  );
}