"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import gsap from "gsap";
import { Mail, MapPin, Copy, Check, Send } from "lucide-react";

const EMAILS = [
  { email: "radyaiftikhar@gmail.com", label: "Personal", field: "to_1" },
  { email: "radyaproject@gmail.com", label: "Work / Project", field: "to_2" },
];

const Squiggle = ({ className = "" }) => (
  <svg viewBox="0 0 120 12" preserveAspectRatio="none" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden>
    <path d="M3 7 C 20 1, 35 12, 55 6 S 90 2, 117 8" />
  </svg>
);

const Cross = ({ className = "" }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" aria-hidden>
    <path d="M6 6 L34 34 M34 6 L6 34" />
  </svg>
);

const SectionTitle = ({ icon: Icon, no, children }) => (
  <div className="mb-4 flex items-center gap-2">
    <span className="border-2 border-black bg-black px-1.5 py-0.5 font-mono text-[10px] font-black text-white">{no}</span>
    <Icon className="h-4 w-4 shrink-0 stroke-[2.5px]" aria-hidden />
    <h3 className="font-mono text-xs font-black uppercase tracking-widest">{children}</h3>
    <span aria-hidden className="h-[3px] flex-1 bg-black" />
  </div>
);

export default function Contact() {
  const [copied, setCopied] = useState(null);
  const [failed, setFailed] = useState(false);
  const containerRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setFailed(false);
      setCopied(email);
    } catch {
      setCopied(null);
      setFailed(true);
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(null);
      setFailed(false);
    }, 2000);
  };

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.3)",
        clearProps: "transform,opacity",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="@container relative w-full text-black md:h-full">
      <style>{`
        .contact-scroll::-webkit-scrollbar { width: 8px; }
        .contact-scroll::-webkit-scrollbar-track { background: #fff; border-left: 2px solid #000; }
        .contact-scroll::-webkit-scrollbar-thumb { background: #000; }
        .contact-scroll { scrollbar-width: thin; scrollbar-color: #000 #fff; }
      `}</style>

      <div className="contact-scroll md:h-full md:overflow-y-auto md:overflow-x-hidden md:pr-3">
        <div className="pb-10">
          {/* ===== header (sticky di desktop) ===== */}
          <div className="contact-item z-20 mb-8 flex items-center gap-3 border-b-4 border-black bg-white pb-2 md:sticky md:top-0 md:pt-1">
            <span className="bg-black px-2 py-0.5 font-mono text-sm font-bold text-white">{"// 05"}</span>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Contact.</h2>
            <span className="ml-auto hidden font-mono text-[10px] uppercase text-black/50 @md:inline">
              table: contact
            </span>
          </div>

          <div className="flex flex-col gap-10">
            {/* ===== lokasi ===== */}
            <div className="contact-item group relative -rotate-[0.5deg] border-4 border-black bg-white p-5 shadow-[6px_6px_0_0_#000] transition-transform duration-200 hover:rotate-0 @md:p-6">
              <span aria-hidden className="absolute -top-3.5 left-8 h-5 w-24 -rotate-3 border-2 border-black bg-[repeating-linear-gradient(45deg,#000_0_4px,#fff_4px_8px)]" />
              <Cross className="pointer-events-none absolute -bottom-3 -right-3 h-7 w-7 bg-white" />

              <div className="flex items-center gap-4">
                <div className="shrink-0 -rotate-6 border-4 border-black bg-black p-3 text-white transition-transform duration-200 group-hover:rotate-6">
                  <MapPin className="h-6 w-6 stroke-[2.5px]" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="mb-1 w-fit bg-black px-1.5 font-mono text-[10px] font-black uppercase tracking-widest text-white">
                    base_location
                  </h3>
                  <p className="relative w-fit text-xl font-black uppercase leading-tight @md:text-2xl">
                    Malang, Indonesia
                    <Squiggle className="absolute -bottom-2 left-0 h-2 w-full" />
                  </p>
                  <p className="mt-3 font-mono text-xs font-bold">postal_code: 65139</p>
                </div>
              </div>
            </div>

            {/* ===== email ===== */}
            <div className="contact-item">
              <SectionTitle icon={Mail} no="01">
                Email Frequency
              </SectionTitle>

              <ul className="flex flex-col gap-7">
                {EMAILS.map((item, i) => (
                  <EmailCard
                    key={item.email}
                    {...item}
                    index={i}
                    isCopied={copied === item.email}
                    isFailed={failed}
                    onCopy={handleCopy}
                  />
                ))}
              </ul>

              {/* pesan status copy untuk screen reader */}
              <p className="sr-only" role="status" aria-live="polite">
                {copied ? `Email ${copied} disalin` : failed ? "Gagal menyalin email" : ""}
              </p>
            </div>

            {/* ===== footer coretan ===== */}
            <p className="contact-item text-center font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
              -- end of table: contact --
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailCard({ email, label, field, index, isCopied, isFailed, onCopy }) {
  return (
    <li
      className={`group relative border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:rotate-0 hover:shadow-[7px_7px_0_0_#000] ${
        index % 2 ? "rotate-[0.5deg]" : "-rotate-[0.5deg]"
      }`}
    >
      {/* tape */}
      <span
        aria-hidden
        className={`absolute -top-3 h-4 w-14 border border-black bg-[repeating-linear-gradient(45deg,#000_0_4px,#fff_4px_8px)] ${
          index % 2 ? "-right-2 rotate-[8deg]" : "-left-2 -rotate-[10deg]"
        }`}
      />

      {/* label field */}
      <span className="absolute -bottom-3 right-3 border-2 border-black bg-white px-1.5 font-mono text-[9px] font-black uppercase">
        {field}
      </span>

      <div className="mb-3 flex items-center gap-2">
        <span className="bg-black px-1.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest text-white">
          {label}
        </span>
        <span aria-hidden className="h-[3px] flex-1 bg-black" />
      </div>

      <a
        href={`mailto:${email}`}
        className="block break-all font-mono text-sm font-bold decoration-[3px] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-black @md:text-base"
      >
        {email}
      </a>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onCopy(email)}
          className={`flex items-center gap-2 border-2 border-black px-3 py-2 font-mono text-xs font-black uppercase shadow-[3px_3px_0_0_#000] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none ${
            isCopied ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"
          }`}
        >
          {isCopied ? (
            <>
              <Check className="h-3.5 w-3.5 stroke-[3px]" aria-hidden /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 stroke-[3px]" aria-hidden /> Copy
            </>
          )}
        </button>

        <a
          href={`mailto:${email}`}
          className="flex items-center gap-2 border-2 border-black bg-black px-3 py-2 font-mono text-xs font-black uppercase text-white shadow-[3px_3px_0_0_#000] transition-all duration-150 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-black active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
        >
          <Send className="h-3.5 w-3.5 stroke-[3px]" aria-hidden /> Send Mail
        </a>

        {isFailed && (
          <span className="flex items-center border-2 border-dashed border-black px-2 font-mono text-[10px] font-bold uppercase">
            gagal copy, salin manual
          </span>
        )}
      </div>
    </li>
  );
}