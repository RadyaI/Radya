"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Code2, GraduationCap, Heart, Cat, Car } from "lucide-react";
import foto from "@/assets/foto2.jpg";
import FunText from "@/utils/FunText";

const linkCat = "https://www.google.com/search?q=cat";
const linkBmw = "https://www.google.com/search?q=bmw";

const education = [
  {
    year: "2024 - Present",
    school: "Universitas Muhammadiyah Malang",
    role: "Informatics Student",
    desc: "Focusing on Data & Backend Engineering.",
  },
  {
    year: "2021 - 2024",
    school: "SMK Telkom Malang",
    role: "Software Engineering",
    desc: "Foundation in Web Development.",
  },
];

const techStack = [
  "JavaScript", "TypeScript", "React", "Next.js", "Firebase",
  "Supabase", "SQL", "NoSQL", "Python",
];

/* ---------- coretan ---------- */
const Underline = ({ className = "" }) => (
  <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden>
    <path d="M3 7 C 30 1, 55 12, 90 6 S 150 2, 197 8" />
  </svg>
);

const Cross = ({ className = "" }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" aria-hidden>
    <path d="M6 6 L34 34 M34 6 L6 34" />
  </svg>
);

const SectionTitle = ({ icon: Icon, children, no }) => (
  <div className="mb-4 flex items-center gap-2">
    <span className="border-2 border-black bg-black px-1.5 py-0.5 font-mono text-[10px] font-black text-white">{no}</span>
    <Icon className="h-4 w-4 shrink-0 stroke-[2.5px]" aria-hidden />
    <h3 className="font-mono text-xs font-black uppercase tracking-widest">{children}</h3>
    <span aria-hidden className="h-[3px] flex-1 bg-black" />
  </div>
);

export default function About() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="@container relative h-full text-black">
      <style>{`
        .about-scroll::-webkit-scrollbar { width: 8px; }
        .about-scroll::-webkit-scrollbar-track { background: #fff; border-left: 2px solid #000; }
        .about-scroll::-webkit-scrollbar-thumb { background: #000; }
        .about-scroll { scrollbar-width: thin; scrollbar-color: #000 #fff; }
      `}</style>

      <div className="about-scroll h-full md:overflow-y-auto md:overflow-x-hidden md:pr-3">
        <div className="pb-10">
          {/* ===== header (sticky di desktop) ===== */}
          <div className="about-item z-20 mb-8 flex items-center gap-3 border-b-4 border-black bg-white pb-2 md:sticky md:top-0 md:pt-1">
            <span className="bg-black px-2 py-0.5 font-mono text-sm font-bold text-white">02 //</span>
            <h2 className="relative text-2xl font-black uppercase tracking-tighter">
              <FunText hoverColor="#000">About Me.</FunText>
            </h2>
            <span className="ml-auto hidden font-mono text-[10px] uppercase text-black/50 @md:inline">
              table: profile
            </span>
          </div>

          {/* ===== profil ===== */}
          <div className="about-item mb-10 flex flex-col items-center gap-7 @md:flex-row @md:items-start">
            <div className="group relative shrink-0">
              <span aria-hidden className="absolute -top-3 left-1/2 z-20 h-5 w-20 -translate-x-1/2 rotate-2 border-2 border-black bg-[repeating-linear-gradient(45deg,#000_0_4px,#fff_4px_8px)]" />
              <div className="relative h-32 w-32 -rotate-3 border-4 border-black bg-white p-1 shadow-[6px_6px_0_0_#000] transition-transform duration-200 group-hover:rotate-0 @md:h-36 @md:w-36">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={foto}
                    alt="Foto Muhammad Radya Iftikhar"
                    fill
                    sizes="144px"
                    className="object-cover grayscale contrast-125"
                  />
                </div>
              </div>
              <Cross className="pointer-events-none absolute -bottom-3 -left-3 h-7 w-7 text-black" />
              <span className="absolute -bottom-3 -right-4 rotate-6 border-2 border-black bg-white px-1.5 py-0.5 font-mono text-[9px] font-black uppercase shadow-[2px_2px_0_0_#000]">
                id: 001
              </span>
            </div>

            <div className="min-w-0 text-center @md:text-left">
              <h3 className="mb-2 text-2xl font-black uppercase leading-[0.95] tracking-tighter @md:text-3xl">
                <FunText hoverColor="#000">Muhammad Radya</FunText>
                <br />
                <span className="relative inline-block">
                  <FunText hoverColor="#000">Iftikhar</FunText>
                  <Underline className="absolute -bottom-2 left-0 h-2 w-full" />
                </span>
              </h3>

              <p className="mx-auto mb-3 mt-4 w-fit border-2 border-black px-2 py-0.5 font-mono text-sm font-bold @md:mx-0">
                @radyaif
              </p>

              <div className="flex flex-wrap justify-center gap-2 @md:justify-start">
                <span className="-rotate-2 border-2 border-black bg-black px-3 py-1 font-mono text-[10px] font-black uppercase text-white shadow-[3px_3px_0_0_#000]">
                  Developer
                </span>
                <span className="rotate-2 border-2 border-black bg-white px-3 py-1 font-mono text-[10px] font-black uppercase shadow-[3px_3px_0_0_#000]">
                  Student
                </span>
              </div>
            </div>
          </div>

          {/* ===== bio ===== */}
          <div className="about-item mb-10 space-y-4 font-sans text-sm leading-relaxed @md:text-base">
            <p>
              Hi, you can call me{" "}
              <b className="inline-block -rotate-1 bg-black px-1.5 text-white">Radya</b>. I&apos;m a second-year
              Informatics student with a growing passion for coding, especially in{" "}
              <span className="inline-block border-2 border-black px-1 font-black">
                <FunText hoverColor="#000">DATA</FunText>
              </span>{" "}
              and{" "}
              <span className="inline-block font-black underline decoration-wavy decoration-2 underline-offset-4">
                <FunText hoverColor="#000">Backend</FunText>
              </span>
              .
            </p>
            <p>
              Lately, I&apos;ve been focusing on building{" "}
              <span className="border-b-[3px] border-dashed border-black font-bold">personal web projects</span> that
              simplify my daily life. While I&apos;m still exploring different aspects of the tech world, I&apos;m
              excited about continuing to learn and improve.
            </p>

            <div className="relative mt-5 rotate-[0.6deg] border-2 border-dashed border-black p-3">
              <span className="absolute -top-2.5 left-3 bg-white px-1 font-mono text-[9px] font-black uppercase tracking-widest">
                hobbies.csv
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs font-bold">
                <Heart className="h-4 w-4 fill-black" aria-hidden />
                <a
                  href={linkCat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 border-2 border-black px-2 py-0.5 transition-colors hover:bg-black hover:text-white"
                >
                  Cats <Cat className="h-4 w-4" aria-hidden />
                </a>
                <span aria-hidden>&amp;</span>
                <a
                  href={linkBmw}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 border-2 border-black px-2 py-0.5 transition-colors hover:bg-black hover:text-white"
                >
                  BMW <Car className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>

          {/* ===== tech stack ===== */}
          <div className="about-item mb-10">
            <SectionTitle icon={Code2} no="01">
              Tech Stack
            </SectionTitle>
            <ul className="flex flex-wrap gap-2.5">
              {techStack.map((tech, i) => (
                <li
                  key={tech}
                  className={`cursor-default border-2 border-black px-3 py-1.5 font-mono text-xs font-bold shadow-[3px_3px_0_0_#000] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-[5px_5px_0_0_#000] ${
                    i % 3 === 0 ? "-rotate-1" : i % 3 === 1 ? "rotate-1" : ""
                  }`}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* ===== education ===== */}
          <div className="about-item">
            <SectionTitle icon={GraduationCap} no="02">
              Education Log
            </SectionTitle>

            <ol className="relative ml-2 space-y-8 border-l-4 border-dashed border-black">
              {education.map((edu, idx) => (
                <li key={edu.school} className="group relative pl-7">
                  <span
                    aria-hidden
                    className="absolute -left-[13px] top-1 h-5 w-5 border-4 border-black bg-white transition-colors group-hover:bg-black"
                  />
                  <div className="flex flex-col items-start gap-1.5">
                    <span className="bg-black px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                      {edu.year}
                    </span>
                    <h4 className="text-base font-black uppercase leading-tight @md:text-lg">{edu.school}</h4>
                    <p
                      className={`border-2 border-black px-1.5 font-mono text-xs font-bold ${
                        idx % 2 ? "rotate-1" : "-rotate-1"
                      }`}
                    >
                      {edu.role}
                    </p>
                    <p className="font-serif text-xs italic text-black/70">&ldquo;{edu.desc}&rdquo;</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* ===== footer coretan ===== */}
          <p className="about-item mt-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
            -- end of table: profile --
          </p>
        </div>
      </div>
    </div>
  );
}