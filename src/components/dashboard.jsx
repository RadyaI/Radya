"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

import Menu from "./menu";

import Home from "./left/home";
import About from "./left/about";
import Blog from "./left/blog";

import Project from "./right/project";
import Contact from "./right/contact";
import Guestbook from "./right/guestbook";

const LEFT = { "1": "home", "2": "about", "3": "blog" };
const RIGHT = { "1": "project", "2": "contact", "3": "guestbook" };

/* ---------- hook: satu layout aja yang di-mount ---------- */
function useIsMobile() {
    return useSyncExternalStore(
        (cb) => {
            const mq = window.matchMedia("(max-width: 767px)");
            mq.addEventListener("change", cb);
            return () => mq.removeEventListener("change", cb);
        },
        () => window.matchMedia("(max-width: 767px)").matches,
        () => false
    );
}

/* ---------- coretan SVG ---------- */
const Squiggle = ({ className = "" }) => (
    <svg viewBox="0 0 120 20" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M2 12 C 12 2, 20 22, 30 10 S 50 2, 60 12 S 80 22, 90 10 S 110 4, 118 12" />
    </svg>
);

const Arrow = ({ className = "" }) => (
    <svg viewBox="0 0 100 60" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 40 C 25 5, 60 5, 92 30" />
        <path d="M76 20 L93 31 L76 44" />
    </svg>
);

const Scribble = ({ className = "" }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M10 85 L90 15 M10 70 L75 15 M25 90 L90 30 M10 55 L58 12 M40 92 L92 45" />
    </svg>
);

const CircleScribble = ({ className = "" }) => (
    <svg viewBox="0 0 200 100" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M30 20 C 80 -5, 185 10, 190 50 C 195 90, 60 100, 15 65 C -5 40, 40 12, 120 8" />
    </svg>
);

/* ---------- panel ---------- */
function Panel({ side, label, file, rotate, children, className = "" }) {
    return (
        <section
            aria-label={label}
            className={`relative flex min-h-0 flex-1 flex-col border-4 border-black bg-white shadow-[10px_10px_0_0_#000] transition-transform duration-300 hover:rotate-0 max-md:w-full max-md:flex-none max-md:shadow-[6px_6px_0_0_#000] ${rotate} ${className}`}
        >
            {/* title bar */}
            <div className="flex shrink-0 items-center justify-between border-b-4 border-black bg-black px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-white">
                <span>{side} / {file}</span>
                <span className="flex gap-1" aria-hidden>
                    <i className="h-2.5 w-2.5 border-2 border-white" />
                    <i className="h-2.5 w-2.5 border-2 border-white" />
                    <i className="h-2.5 w-2.5 bg-white" />
                </span>
            </div>
            {children}
        </section>
    );
}

const Divider = ({ text }) => (
    <div className="flex items-center gap-3 font-mono text-xs uppercase text-black">
        <span className="h-[3px] flex-1 bg-black" />
        <span className="border-2 border-black px-2 py-0.5">{text}</span>
        <span className="h-[3px] flex-1 bg-black" />
    </div>
);

export default function Dashboard() {
    const [left, setLeft] = useState("1");
    const [right, setRight] = useState("1");
    const isMobile = useIsMobile();

    /* deep link: /#about, /#project, dst */
    useEffect(() => {
        const h = window.location.hash.replace("#", "");
        const l = Object.keys(LEFT).find((k) => LEFT[k] === h);
        const r = Object.keys(RIGHT).find((k) => RIGHT[k] === h);
        if (l) setLeft(l);
        if (r) setRight(r);
    }, []);

    const pickLeft = (v) => {
        setLeft(v);
        window.history.replaceState(null, "", `#${LEFT[v]}`);
    };
    const pickRight = (v) => {
        setRight(v);
        window.history.replaceState(null, "", `#${RIGHT[v]}`);
    };

    const ticker = "DATA ENGINEER ✕ PIPELINE: RUNNING ✕ NO FILTER ✕ SELECT * FROM RADYA ✕ ETL > ELT ✕ BUILT IN PUBLIC ✕ ";

    return (
        <>
            <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .marquee-track { animation: marquee 25s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }
      `}</style>

            <main
                className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white font-mono text-black selection:bg-black selection:text-white max-md:h-auto max-md:min-h-[100dvh] max-md:overflow-x-hidden max-md:overflow-y-auto"
            >
                {/* papan tulis: grid garis + dot, ringan di GPU */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.25]"
                    style={{
                        backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                        backgroundSize: "12px 12px",
                    }}
                />

                {/* coretan dekorasi (desktop aja) */}
                <div aria-hidden className="pointer-events-none absolute inset-0 z-20 max-md:hidden">
                    <Scribble className="absolute -left-2 bottom-10 h-28 w-28 -rotate-6 text-black/80" />
                    <Squiggle className="absolute right-[8%] top-12 w-32 rotate-3 text-black" />
                    <Arrow className="absolute left-[30%] top-4 w-24 -rotate-12 text-black" />
                    <CircleScribble className="absolute right-6 bottom-14 w-40 rotate-6 text-black/80" />
                    <div className="absolute right-[3%] top-[14%] rotate-12 border-4 border-black bg-white px-3 py-1 text-sm font-black uppercase tracking-widest shadow-[4px_4px_0_0_#000]">
                        v2.0 · no color
                    </div>
                </div>

                {/* h1 untuk SEO, tidak mengganggu desain */}
                <h1 className="sr-only">
                    Muhammad Radya Iftikhar, Data Engineering &amp; Software Engineering Portfolio
                </h1>

                {/* marquee strip */}
                <div className="relative z-10 shrink-0 overflow-hidden border-b-4 border-black bg-black py-1.5 text-xs uppercase tracking-[0.25em] text-white" aria-hidden>
                    <div className="marquee-track flex w-max whitespace-nowrap">
                        <span className="pr-6">{ticker.repeat(4)}</span>
                        <span className="pr-6">{ticker.repeat(4)}</span>
                    </div>
                </div>

                {/* area utama */}
                <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 items-stretch justify-between gap-5 px-5 py-8 max-md:flex-col max-md:px-4 max-md:pb-24 max-md:pt-6">
                    {/* LEFT */}
                    <Panel side="L" label="Panel kiri" file={`${LEFT[left]}.sql`} rotate="-rotate-[0.6deg] max-md:rotate-0">
                        <div className="absolute -top-3 left-8 h-6 w-24 -rotate-3 border-2 border-black bg-[repeating-linear-gradient(45deg,#000_0_6px,#fff_6px_12px)] max-md:hidden" aria-hidden />
                        <div className="relative min-h-0 flex-1 p-6 max-md:p-4">
                            {isMobile ? (
                                <div className="flex flex-col gap-10">
                                    <section id="home"><Home /></section>
                                    <Divider text="about" />
                                    <section id="about"><About /></section>
                                    <Divider text="blog" />
                                    <section id="blog"><Blog /></section>
                                </div>
                            ) : (
                                <div className="h-full overflow-hidden">
                                    {left === "1" && <Home />}
                                    {left === "2" && <About />}
                                    {left === "3" && <Blog />}
                                </div>
                            )}
                        </div>
                    </Panel>

                    <Menu
                        left={left}
                        right={right}
                        onLeftSelectChange={pickLeft}
                        onRightSelectChange={pickRight}
                    />
                    {/* RIGHT */}
                    <Panel side="R" label="Panel kanan" file={`${RIGHT[right]}.sql`} rotate="rotate-[0.6deg] max-md:rotate-0">
                        <div className="absolute -top-3 right-8 h-6 w-24 rotate-3 border-2 border-black bg-white shadow-[3px_3px_0_0_#000] max-md:hidden" aria-hidden />
                        <div className="relative min-h-0 flex-1 p-6 max-md:p-4">
                            {isMobile ? (
                                <div className="flex flex-col gap-10">
                                    <section id="project"><Project /></section>
                                    <Divider text="contact" />
                                    <section id="contact"><Contact /></section>
                                    <Divider text="guestbook" />
                                    <section id="guestbook"><Guestbook /></section>
                                </div>
                            ) : (
                                <div className="no-scrollbar h-full overflow-y-auto">
                                    {right === "1" && <Project />}
                                    {right === "2" && <Contact />}
                                    {right === "3" && <Guestbook />}
                                </div>
                            )}
                        </div>
                    </Panel>
                </div>

                {/* status bar */}
                <footer className="relative z-10 shrink-0 border-t-4 border-black bg-white px-4 py-1 text-[11px] uppercase tracking-widest max-md:hidden">
                    <span className="font-bold">status:</span> ok · <span className="font-bold">left:</span> {LEFT[left]} · <span className="font-bold">right:</span> {RIGHT[right]} · rows: ∞
                </footer>
            </main>
        </>
    );
}