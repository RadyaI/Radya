"use client";

import { useState, useRef, useLayoutEffect, useMemo } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Github, Globe, Box, Layers, Code2, FolderOpen, ArrowUpRight } from "lucide-react";

const projectData = [
  {
    title: "Portfolio Web",
    desc: "Yes, this is the website you are currently viewing.",
    tech: "React",
    live_link: "https://radya.my.id",
    repo_link: "https://github.com/RadyaI/portfolio-web",
    tag: ["React", "Firebase", "Tailwind"],
  },
  {
    title: "My Learning Plan",
    desc: "Personalized learning management system to organize your studies, track progress, and achieve your goals.",
    tech: "Nextjs",
    live_link: "/learning",
    repo_link: "https://github.com/RadyaI/Radya/tree/master/src/app/learning",
    tag: ["Nextjs", "Firebase", "Tailwind", "Learning"],
  },
  {
    title: "Is This Map",
    desc: "An absurd geography experiment. Checking distances to random middle-of-nowhere places or getting lost in random coordinates.",
    tech: "Nextjs",
    live_link: "/isthismap",
    repo_link: "https://github.com/RadyaI/Radya/tree/master/src/app/isthismap",
    tag: ["Nextjs", "leaflet", "Tailwind", "Maps", "Earth"],
  },
  {
    title: "whoschat",
    desc: "An anonymous chatroom you can create, share, and delete anytime.",
    tech: "Nextjs",
    live_link: "https://whoschat.vercel.app/",
    repo_link: "https://github.com/RadyaI/whoschat",
    tag: ["Nextjs", "Firebase", "anonim-chat"],
  },
  {
    title: "SignPdf",
    desc: "online pdf signature, client side 100% secure, not stored.",
    tech: "Nextjs",
    live_link: "/tools/signpdf",
    repo_link: "-",
    tag: ["pdf-lib-plus-encrypt", "react-signature-canvas", "Nextjs"],
  },
  {
    title: "Speed Typer",
    desc: "Finger speed test. Stop-on-error mode & dynamic word bank (ID/EN).",
    tech: "Nextjs",
    live_link: "/tools/speedtyper",
    repo_link: "-",
    tag: ["Typing Test", "Word per Minute", "Nextjs"],
  },
  {
    title: "Send Email API",
    desc: "API service to send emails efficiently using MailerSend.",
    tech: "Typescript",
    live_link: "https://send4email.vercel.app/",
    repo_link: "https://github.com/RadyaI/send-email",
    tag: ["Fastify", "Typescript", "api"],
  },
  {
    title: "CryptoLab",
    desc: "Encryption & Decryption playground/demo.",
    tech: "Javascript",
    live_link: "/tools/cryptolab",
    repo_link: "https://github.com/RadyaI/encryption-decryption",
    tag: ["Base64", "URL Encoder", "JWT Debugger", "Hashing", "Classic Cipher"],
  },
  {
    title: "Cara Bertanya",
    desc: "Don't ask to ask! A guide on how to ask programming questions properly.",
    tech: "React",
    live_link: "https://kodingankuerror.vercel.app/",
    repo_link: "https://github.com/RadyaI/cara-bertanya",
    tag: ["Javascript", "Tailwind", "Guide"],
  },
  {
    title: "Online Polling",
    desc: "Real-time polling app. Create polls, invite friends, vote instantly.",
    tech: "React",
    live_link: "https://onlinepoll.vercel.app/",
    repo_link: "https://github.com/RadyaI/polling",
    tag: ["React", "Firebase"],
  },
  {
    title: "Uareshort",
    desc: "Efficient URL shortener with analytics tracking. Built with Prisma & MySQL.",
    tech: "Typescript",
    live_link: "https://usrt.vercel.app/",
    repo_link: "https://github.com/RadyaI/uareshort",
    tag: ["Express", "TS", "MySQL"],
  },
  {
    title: "YourList API",
    desc: "TodoList API with auth & task categorization.",
    tech: "Typescript",
    live_link: "-",
    repo_link: "https://github.com/RadyaI/yourlist-api",
    tag: ["Express", "TS", "MySQL"],
  },
];

const FILTERS = ["ALL", "Nextjs", "React", "Typescript", "Javascript"];

const pad = (n) => String(n).padStart(2, "0");
const isInternal = (url) => url.startsWith("/");

const TechIcon = ({ tech }) => {
  const cls = "h-4 w-4 stroke-[2.5px]";
  if (tech.includes("React") || tech.includes("Next")) return <Box className={cls} aria-hidden />;
  if (tech.includes("Typescript") || tech.includes("Javascript")) return <Code2 className={cls} aria-hidden />;
  return <Layers className={cls} aria-hidden />;
};

export default function Project() {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState("ALL");

  const list = useMemo(
    () =>
      projectData
        .map((p, i) => ({ ...p, no: i + 1 }))
        .filter((p) => filter === "ALL" || p.tech === filter),
    [filter]
  );

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [filter]);

  const btn =
    "flex items-center gap-2 border-2 border-black px-3 py-2 font-mono text-xs font-black uppercase transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none";

  return (
    <div ref={containerRef} className="@container relative w-full text-black md:h-full">
      <style>{`
        .proj-scroll::-webkit-scrollbar { width: 8px; }
        .proj-scroll::-webkit-scrollbar-track { background: #fff; border-left: 2px solid #000; }
        .proj-scroll::-webkit-scrollbar-thumb { background: #000; }
        .proj-scroll { scrollbar-width: thin; scrollbar-color: #000 #fff; }
      `}</style>

      <div className="proj-scroll md:h-full md:overflow-y-auto md:overflow-x-hidden md:pr-3">
        {/* ===== header (sticky di desktop) ===== */}
        <div className="z-20 bg-white pb-2 md:sticky md:top-0 md:pt-1">
          <div className="flex items-end justify-between gap-3 border-b-4 border-black pb-2">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-6 w-6 shrink-0 stroke-[2.5px]" aria-hidden />
              <h2 className="text-2xl font-black uppercase tracking-tighter">Selected Works</h2>
            </div>
            <span className="bg-black px-2 py-0.5 font-mono text-sm font-bold text-white">{"// 04"}</span>
          </div>

          {/* filter */}
          <div className="flex flex-wrap items-center gap-2 pt-2.5" role="group" aria-label="Filter proyek">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
              where tech =
            </span>
            {FILTERS.map((f, i) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`border-2 border-black px-2 py-0.5 font-mono text-[10px] font-black uppercase transition-colors ${
                  filter === f ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"
                } ${i % 2 ? "rotate-1" : "-rotate-1"}`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto font-mono text-[10px] font-bold uppercase text-black/50">
              rows: {list.length}
            </span>
          </div>
        </div>

        {/* ===== list ===== */}
        <ul className="grid grid-cols-1 gap-9 pb-10 pt-8">
          {list.map((item, idx) => {
            const internal = isInternal(item.live_link);
            return (
              <li key={item.title}>
                <article
                  className={`project-card group relative border-4 border-black bg-white p-5 shadow-[6px_6px_0_0_#000] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:rotate-0 hover:shadow-[9px_9px_0_0_#000] @md:p-6 ${
                    idx % 2 ? "rotate-[0.4deg]" : "-rotate-[0.4deg]"
                  }`}
                >
                  {/* tape */}
                  <span
                    aria-hidden
                    className={`absolute -top-3.5 h-5 w-20 border-2 border-black bg-[repeating-linear-gradient(45deg,#000_0_4px,#fff_4px_8px)] ${
                      idx % 2 ? "right-6 rotate-[6deg]" : "left-6 -rotate-[6deg]"
                    }`}
                  />

                  {/* nomor besar outline */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-4 right-3 select-none font-sans text-6xl font-black leading-none text-transparent [-webkit-text-stroke:2px_#000] @md:text-7xl"
                  >
                    {pad(item.no)}
                  </span>

                  <div className="relative z-10 mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-black uppercase leading-tight tracking-tight decoration-[3px] underline-offset-4 group-hover:underline @md:text-2xl">
                      {item.title}
                    </h3>
                    <span className="flex shrink-0 rotate-2 items-center gap-1.5 border-2 border-black bg-black px-2 py-1 font-mono text-[10px] font-black uppercase text-white">
                      <TechIcon tech={item.tech} />
                      {item.tech}
                    </span>
                  </div>

                  <p className="relative z-10 mb-5 max-w-[90%] font-sans text-sm leading-relaxed @md:text-base">
                    {item.desc}
                  </p>

                  <ul className="relative z-10 mb-5 flex flex-wrap gap-2">
                    {item.tag.map((t, i) => (
                      <li
                        key={t}
                        className={`border-2 border-black px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                          i % 2 ? "rotate-1" : "-rotate-1"
                        }`}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <div className="relative z-10 flex flex-wrap gap-3 border-t-2 border-dashed border-black pt-4">
                    {item.repo_link !== "-" && (
                      <a
                        href={item.repo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${btn} bg-white shadow-[3px_3px_0_0_#000] hover:bg-black hover:text-white`}
                      >
                        <Github className="h-3.5 w-3.5 stroke-[3px]" aria-hidden />
                        Code
                      </a>
                    )}

                    {item.live_link !== "-" &&
                      (internal ? (
                        <Link
                          href={item.live_link}
                          className={`${btn} bg-black text-white shadow-[3px_3px_0_0_#000] hover:bg-white hover:text-black`}
                        >
                          <Globe className="h-3.5 w-3.5 stroke-[3px]" aria-hidden />
                          Live Demo
                          <ArrowUpRight className="h-3.5 w-3.5 stroke-[3px]" aria-hidden />
                        </Link>
                      ) : (
                        <a
                          href={item.live_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${btn} bg-black text-white shadow-[3px_3px_0_0_#000] hover:bg-white hover:text-black`}
                        >
                          <Globe className="h-3.5 w-3.5 stroke-[3px]" aria-hidden />
                          Live Demo
                          <ArrowUpRight className="h-3.5 w-3.5 stroke-[3px]" aria-hidden />
                        </a>
                      ))}

                    {item.live_link === "-" && (
                      <span className="flex items-center border-2 border-dashed border-black px-3 py-2 font-mono text-[10px] font-bold uppercase text-black/60">
                        api only // no demo
                      </span>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>

        {list.length === 0 && (
          <p className="py-10 text-center font-mono text-xs font-bold uppercase">0 rows returned.</p>
        )}

        <p className="pb-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
          -- end of table: projects --
        </p>
      </div>
    </div>
  );
}