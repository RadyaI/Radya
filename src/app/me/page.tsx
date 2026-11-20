import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Plus } from "lucide-react";
import foto from "@/assets/foto2.jpg";
import ViewCounter from "@/components/me/ViewCounter";

export const metadata: Metadata = {
  title: "Me",
  description:
    "Informatics student at UMM currently focused on Data Engineering: journey, projects, and things beyond the screen.",
  alternates: { canonical: "/me" },
};

/* ====== DATA (edit di sini aja) ====== */
const FACTS: [string, string][] = [
  ["Name", "Muhammad Radya Iftikhar"],
  ["Nickname", "Radya"],
  ["Location", "Malang, Indonesia"],
  ["University", "Universitas Muhammadiyah Malang"],
  ["Status", "Informatics student, 5th semester"],
  ["Focus", "Data Engineering"],
];

const NOW = [
  "Studying, while working as an Informatics laboratory assistant.",
  "Focusing on Data Engineering, while trying out Machine Learning.",
  "Looking for industry experience through an internship.",
];

const JOURNEY = [
  {
    when: "Nov 2022 - Apr 2023",
    title: "Junior SEO Specialist Intern",
    note: "PT Ozami Inti Sinergi.",
  },
  {
    when: "2025 - present",
    title: "Informatics Laboratory Assistant",
    note: "Universitas Muhammadiyah Malang.",
  },
];

const EXPLORED: [string, string][] = [
  ["Web", "Next.js, React, Tailwind CSS"],
  ["Mobile", "React Native, Expo"],
  ["Backend & DB", "Firebase, Firestore, Supabase"],
  ["Languages", "JavaScript, Python"],
  ["AI", "Gemini and Groq integration, Machine Learning exploration"],
];

const PROJECTS = [
  {
    title: "AI HRD Simulator",
    tag: "Exploration",
    desc: "Exploration of an AI-based job interview simulation app.",
    link: "https://github.com/RadyaI/hrdai",
  },
  {
    title: "Kompresin",
    tag: "Desktop app",
    desc: "Desktop app built with Python and FFmpeg for media compression.",
    link: "https://github.com/RadyaI/kompresin",
  },
  {
    title: "Axon",
    tag: "Data Visualization",
    desc: "Teacher dashboard for monitoring students' focus levels using pose estimation and facial pattern detection.",
    link: "https://github.com/RadyaI/axon-be",
  },
];

const INTERESTS: [string, string][] = [
  ["Automotive", "Especially the world of cars."],
  ["Reptiles and Amphibians", "I have a leopard gecko and a pacman frog."],
  ["K-Drama", "I like movies about law, lawyers, and courtroom trials and stuff like that"],
  ["Comics & novels", "Haven't read that many yet, honestly"],
  ["Technology", "And exploring new things."],
];

const RABBIT_HOLES = [
  { href: "/tools", label: "Tools", note: "Small tools: crypto, QR, PDF signing" },
  { href: "/isthismap", label: "Isthismap", note: "Absurd geography experiments" },
  { href: "/tools/signpdf", label: "Sign PDF", note: "Sign or password-protect your PDF" },
  { href: "/quiz", label: "Quiz", note: "Self-made quizzes" },
  { href: "/learning", label: "Learning", note: "Study plans and journal" },
];

const FAQ = [
  {
    q: "What are you focusing on?",
    a: "Data Engineering. Besides that, I'm also interested in Data Science and Machine Learning.",
  },
  {
    q: "Are you already working as a Data Engineer?",
    a: "Not yet. Data Engineering is still the direction I'm learning toward and aiming for in my career. That's why I'm currently looking for industry experience through an internship.",
  },
  {
    q: "Since when have you been coding?",
    a: "Since vocational high school in 2021, and it has continued through university.",
  },
  {
    q: "How can I contact Radya?",
    a: "Through the email at the bottom of this page, or through Instagram, LinkedIn, and GitHub.",
  },
];

const SOCIALS = [
  { href: "https://instagram.com/radyaif", label: "Instagram" },
  { href: "https://linkedin.com/in/radyaa", label: "LinkedIn" },
  { href: "https://github.com/radyai", label: "GitHub" },
];

/* ====== util ====== */
const FOCUS = "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black";
const pad = (n: number) => String(n).padStart(2, "0");

/* satu sel grid: label kecil di atas, isi di bawah */
function Cell({
  no,
  title,
  id,
  className = "",
  children,
}: {
  no: string;
  title: string;
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={`min-w-0 bg-white p-4 ${className}`}>
      <header className="mb-3 flex items-baseline justify-between border-b-2 border-black pb-1.5 text-[10px] font-bold uppercase tracking-[0.12em]">
        <h2 id={id}>{title}</h2>
        <span className="tabular-nums">{no}</span>
      </header>
      {children}
    </section>
  );
}

export default function MePage() {
  return (
    <main
      className="min-h-[100dvh] w-full bg-white text-[13px] leading-snug text-black selection:bg-black selection:text-white"
      style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif' }}
    >
      <div className="mx-auto w-full max-w-[1400px] p-3 md:p-5">
        {/* ===== top bar ===== */}
        <nav
          aria-label="Page navigation"
          className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.12em]"
        >
          <Link href="/" className={`flex items-center gap-1.5 hover:underline ${FOCUS}`}>
            <ArrowLeft className="h-3 w-3 stroke-[3px]" aria-hidden />
            Back
          </Link>
          <span className="hidden sm:inline">Personal Index</span>
          <span className="tabular-nums">Radya / 2026</span>
        </nav>

        {/* ===== GRID: gap-px di atas bg hitam = garis 1px antar sel ===== */}
        <div className="grid grid-cols-1 gap-px border-2 border-black bg-black lg:grid-cols-12">
          {/* hero */}
          <header className="flex min-w-0 flex-col justify-between gap-8 bg-white p-4 lg:col-span-8">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.12em]">
              <span>About / Me</span>
              <span className="tabular-nums">00</span>
            </div>
            <div>
              <h1 className="text-[clamp(3rem,9.5vw,9rem)] font-bold leading-[0.84] tracking-[-0.055em]">
                Radya
                <br />
                Iftikhar.
              </h1>
              <p className="mt-6 max-w-[36rem] text-base font-medium leading-tight tracking-[-0.01em] md:text-lg">
                Informatics student at UMM, currently focused on Data Engineering. This page is a more personal
                version of the portfolio: the journey, and everything besides college, basically.
              </p>
            </div>
          </header>

          {/* foto: menempel penuh di sel, span 2 baris */}
          <figure className="relative min-h-[22rem] bg-white lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:min-h-0">
            <Image
              src={foto}
              alt="Photo of Radya"
              fill
              priority
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover grayscale contrast-110"
            />
            <figcaption className="absolute bottom-0 left-0 bg-white px-2 py-1 text-[10px] font-bold uppercase tabular-nums tracking-[0.08em]">
              Fig. 1 — Radya, Malang
            </figcaption>
          </figure>

          {/* fakta */}
          <Cell no="01" title="Quick facts" id="me-facts" className="lg:col-span-4">
            <dl>
              {FACTS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-x-3 border-b border-black py-1.5 last:border-0">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em]">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </Cell>

          {/* now */}
          <Cell no="02" title="Currently" id="me-now" className="lg:col-span-4">
            <ol>
              {NOW.map((n, i) => (
                <li key={n} className="grid grid-cols-[2.25rem_1fr] items-start gap-x-3 border-b border-black py-2 last:border-0">
                  <span className="text-3xl font-bold leading-none tracking-[-0.05em] tabular-nums">{i + 1}</span>
                  <p className="text-sm leading-tight">{n}</p>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-[10px] tabular-nums">Updated Nov 2026.</p>
          </Cell>

          {/* perjalanan */}
          <Cell no="03" title="Experience" id="me-journey" className="lg:col-span-7">
            <ol>
              {JOURNEY.map((j) => (
                <li
                  key={j.title}
                  className="grid grid-cols-[6.5rem_1fr] gap-x-3 border-b border-black py-2 last:border-0"
                >
                  <span className="text-[10px] font-bold uppercase leading-tight tracking-[0.1em] tabular-nums">
                    {j.when}
                  </span>
                  <div>
                    <p className="font-bold tracking-[-0.01em]">{j.title}</p>
                    {j.note && <p className="mt-0.5 leading-snug">{j.note}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </Cell>

          {/* pernah dieksplorasi */}
          <Cell no="04" title="Explored" id="me-explored" className="lg:col-span-5">
            <dl>
              {EXPLORED.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-x-3 border-b border-black py-1.5 last:border-0">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em]">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-[10px]">
              A list of things I&apos;ve studied and tried. Experience levels vary.
            </p>
          </Cell>

          {/* proyek */}
          <Cell no="05" title="Projects" id="me-projects" className="lg:col-span-7">
            <ul>
              {PROJECTS.map((p, i) => (
                <li
                  key={p.title}
                  className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 border-b border-black py-2 last:border-0"
                >
                  <span className="text-[10px] font-bold tabular-nums">{pad(i + 1)}</span>
                  <h3 className="text-lg font-bold leading-none tracking-[-0.03em]">{p.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-[0.06em]">{p.tag}</span>
                  <p className="col-span-2 col-start-2 mt-1 leading-snug">{p.desc}</p>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} on GitHub`}
                    className={`group col-span-2 col-start-2 mt-2 inline-flex items-center gap-1 justify-self-start border-2 border-black px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-black hover:text-white ${FOCUS}`}
                  >
                    GitHub
                    <ArrowUpRight
                      className="h-3 w-3 stroke-[3px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Cell>

          {/* di luar kode */}
          <Cell no="06" title="Beyond code" id="me-interests" className="lg:col-span-5">
            <ul>
              {INTERESTS.map(([k, note]) => (
                <li key={k} className="border-b border-black py-1.5 last:border-0">
                  <span className="font-bold tracking-[-0.01em]">{k}</span>
                  {note && <span className="block text-[12px]">{note}</span>}
                </li>
              ))}
            </ul>
          </Cell>

          {/* rabbit holes */}
          <Cell no="07" title="Rabbit holes" id="me-holes" className="lg:col-span-7">
            <ul>
              {RABBIT_HOLES.map((r, i) => (
                <li key={r.href} className="border-b border-black last:border-0">
                  <Link
                    href={r.href}
                    className={`group -mx-4 grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 px-4 py-2 transition-colors hover:bg-black hover:text-white sm:grid-cols-[2rem_8rem_1fr_auto] ${FOCUS}`}
                  >
                    <span className="text-[10px] font-bold tabular-nums">{pad(i + 1)}</span>
                    <span className="text-lg font-bold leading-none tracking-[-0.03em]">{r.label}</span>
                    <span className="col-span-3 col-start-2 row-start-2 text-[11px] sm:col-span-1 sm:col-start-3 sm:row-start-1">
                      {r.note}
                    </span>
                    <ArrowUpRight
                      className="col-start-3 row-start-1 h-4 w-4 stroke-[2.5px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:col-start-4"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Cell>

          {/* faq */}
          <Cell no="08" title="FAQ" id="me-faq" className="lg:col-span-5">
            <div>
              {FAQ.map((f, i) => (
                <details key={f.q} className="group border-b border-black last:border-0">
                  <summary
                    className={`-mx-4 flex cursor-pointer list-none items-baseline justify-between gap-3 px-4 py-2 marker:content-none hover:bg-black hover:text-white [&::-webkit-details-marker]:hidden ${FOCUS}`}
                  >
                    <span className="flex gap-3">
                      <span className="text-[10px] font-bold tabular-nums">Q{i + 1}</span>
                      <span className="font-bold tracking-[-0.01em]">{f.q}</span>
                    </span>
                    <Plus
                      className="h-4 w-4 shrink-0 stroke-[2.5px] transition-transform duration-200 group-open:rotate-45"
                      aria-hidden
                    />
                  </summary>
                  <p className="pb-3 pl-7 pr-2 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </Cell>

          {/* kontak: satu-satunya sel hitam sebagai jangkar */}
          <footer className="flex min-w-0 flex-col gap-8 bg-black p-4 text-white lg:col-span-12">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.12em]">
              <span>Contact</span>
              <span className="tabular-nums">09</span>
            </div>
            <a
              href="mailto:radyaiftikhar@gmail.com"
              className="break-all text-[clamp(1.75rem,6.5vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.05em] hover:underline hover:decoration-[0.05em] hover:underline-offset-[0.1em] focus-visible:outline-2 focus-visible:outline-white"
            >
              radyaiftikhar@gmail.com
            </a>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] font-bold uppercase tracking-[0.12em]">
                {SOCIALS.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline focus-visible:outline-2 focus-visible:outline-white"
                    >
                      {s.label}
                      <ArrowUpRight className="h-3 w-3 stroke-[3px]" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] tabular-nums sm:text-right">
                <p>Malang, ID</p>
                <p>© 2026</p>
                <ViewCounter />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}