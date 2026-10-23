"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Github, Linkedin, Instagram, ArrowUpRight, ArrowRight, Terminal } from "lucide-react";

const SOCIALS = [
  { href: "https://instagram.com/radyaif", label: "IG", Icon: Instagram },
  { href: "https://www.linkedin.com/in/radyaa/", label: "IN", Icon: Linkedin },
  { href: "https://github.com/RadyaI", label: "GIT", Icon: Github },
];

const TAGS = ["#etl", "#sql", "#pipeline", "#data"];

/* ---------- coretan ---------- */
const Underline = ({ className = "" }) => (
  <svg viewBox="0 0 300 16" preserveAspectRatio="none" className={className} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" aria-hidden>
    <path d="M3 10 C 40 2, 70 16, 110 8 S 180 2, 220 9 S 280 14, 297 5" />
  </svg>
);

const Asterisk = ({ className = "" }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" aria-hidden>
    <path d="M25 3 V47 M5 14 L45 36 M45 14 L5 36" />
  </svg>
);

const LoopArrow = ({ className = "" }) => (
  <svg viewBox="0 0 80 50" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 8 C 30 -2, 60 10, 40 26 C 28 36, 20 22, 38 22 C 52 22, 62 32, 72 40" />
    <path d="M60 40 L73 41 L69 28" />
  </svg>
);

export default function Home() {
  const comp = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".paper-item", {
        y: 40,
        opacity: 0,
        scale: 0.94,
        duration: 0.7,
        ease: "back.out(1.6)",
        stagger: 0.08,
        clearProps: "transform,opacity",
      });

      gsap.fromTo(
        ".dot-ping",
        { scale: 1, opacity: 0.6 },
        { scale: 2.4, opacity: 0, duration: 1.2, repeat: -1, ease: "power1.out" }
      );

      gsap.to(".cursor", { opacity: 0, repeat: -1, yoyo: true, duration: 0.5, ease: "steps(1)" });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={comp}
      className="no-scrollbar @container relative flex h-full w-full select-none flex-col overflow-y-auto overflow-x-hidden"
    >
      {/* my-auto: konten center kalau muat, bisa di-scroll kalau tidak (tidak kepotong di atas) */}
      <div className="relative my-auto flex flex-col gap-5 py-2 @md:gap-7">
        {/* ===== status row ===== */}
        <div className="paper-item flex flex-wrap items-center gap-3">
          <div className="relative -rotate-1 border-2 border-black bg-white px-3 py-1.5 shadow-[3px_3px_0_0_#000]">
            <span aria-hidden className="absolute -top-2 left-1/2 h-3 w-12 -translate-x-1/2 rotate-2 border border-black/30 bg-[repeating-linear-gradient(45deg,#000_0_3px,#fff_3px_6px)]" />
            <span className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="dot-ping absolute h-full w-full rounded-full bg-black" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-black" />
              </span>
              online
            </span>
          </div>
          <span className="rotate-2 border-2 border-dashed border-black px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest">
            pipeline: running
          </span>
          <span className="hidden font-mono text-[10px] uppercase text-black/50 @md:inline">id: 001 // rev.2</span>
        </div>

        {/* ===== greeting + nama ===== */}
        <div className="relative">
          <p className="paper-item mb-3 w-fit -rotate-1 bg-black px-2 py-0.5 font-mono text-xs font-bold text-white @md:text-sm">
            {"// hello, i am"}
          </p>

          {/* h1 sudah ada di dashboard (sr-only), jadi ini h2 */}
          <h2 className="paper-item font-sans text-[clamp(2.25rem,17cqw,7rem)] font-black uppercase leading-[0.85] tracking-tighter">
            <span className="block">Radya</span>
            <span className="relative block w-fit text-transparent [-webkit-text-stroke:2px_#000] @md:[-webkit-text-stroke:3px_#000]">
              Iftikhar.
              <Underline className="absolute -bottom-2 left-0 h-3 w-full text-black @md:-bottom-3 @md:h-4" />
            </span>
          </h2>

          <Asterisk className="pointer-events-none absolute -right-1 -top-4 h-10 w-10 rotate-12 text-black @md:h-14 @md:w-14" />
        </div>

        {/* ===== tagline + role ===== */}
        <div className="paper-item flex flex-col gap-3">
          <div className="flex items-center gap-2 font-serif text-base font-bold italic">
            <span>&ldquo;In This Economy?&rdquo;</span>
            <span aria-hidden className="h-[3px] w-10 bg-black" />
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            <span className="-rotate-1 border-2 border-black bg-white px-2 py-0.5 text-lg font-black uppercase line-through decoration-black decoration-[4px] @md:text-2xl">
              Fullstack Dev
            </span>
            <LoopArrow className="h-8 w-12 text-black max-[420px]:hidden" aria-hidden />
            <span className="rotate-1 border-4 border-black bg-black px-3 py-1 text-lg font-black uppercase tracking-wide text-white shadow-[5px_5px_0_0_#000] outline-2 outline-offset-2 outline-dashed outline-black @md:text-2xl">
              Data Engineer
            </span>
          </div>
        </div>

        {/* ===== terminal card (disembunyiin di layar pendek) ===== */}
        <div className="paper-item w-full max-w-[26rem] rotate-1 border-2 border-black bg-white shadow-[5px_5px_0_0_#000] [@media(max-height:780px)]:hidden max-md:[@media(max-height:780px)]:block">
          <div className="flex items-center gap-2 border-b-2 border-black bg-black px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
            <Terminal className="h-3 w-3" aria-hidden />
            bash — radya
          </div>
          <div className="space-y-0.5 p-3 font-mono text-xs font-bold @md:text-sm">
            <p>$ whoami</p>
            <p className="text-black/60">&gt; radya</p>
            <p>$ ngoding --apa-aja</p>
            <p className="text-black/60">
              &gt; dah.<span className="cursor ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 bg-black" />
            </p>
          </div>
        </div>

        {/* ===== tags ===== */}
        <div className="paper-item flex flex-wrap gap-2">
          {TAGS.map((t, i) => (
            <span
              key={t}
              className={`border-2 border-black px-2 py-0.5 font-mono text-[11px] font-bold uppercase ${
                i % 2 ? "rotate-2 bg-black text-white" : "-rotate-2 bg-white"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* ===== sosmed ===== */}
        <div className="paper-item flex flex-wrap gap-3 pb-2">
          {SOCIALS.map(({ href, label, Icon }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`group relative flex h-14 w-14 items-center justify-center border-2 border-black bg-white shadow-[4px_4px_0_0_#000] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-[6px_6px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-black @md:h-16 @md:w-16 ${
                i % 2 ? "rotate-2" : "-rotate-2"
              }`}
            >
              <Icon className="h-6 w-6 stroke-[2.5px]" />
              <ArrowUpRight className="absolute right-0.5 top-0.5 h-3 w-3 opacity-60" aria-hidden />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 border border-black bg-white px-1 font-mono text-[8px] font-black text-black">
                {label}
              </span>
            </a>
          ))}
          <span className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase text-black/60">
            <ArrowRight className="h-3 w-3" aria-hidden /> find me here
          </span>
        </div>
      </div>
    </div>
  );
}