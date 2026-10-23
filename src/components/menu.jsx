"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wrench, Home, User, Globe, Briefcase, Mail, BookOpen } from "lucide-react";
import Loader from "./loader";

const LEFT_ITEMS = [
  { val: "1", label: "HOME", Icon: Home },
  { val: "2", label: "ABOUT", Icon: User },
  { val: "3", label: "BLOG", Icon: Globe },
];

const RIGHT_ITEMS = [
  { val: "1", label: "WORK", Icon: Briefcase },
  { val: "2", label: "MAIL", Icon: Mail },
  { val: "3", label: "GUEST", Icon: BookOpen },
];

/* nav mobile: anchor ke section di dashboard */
const MOBILE_ITEMS = [
  { href: "#home", label: "HOME", Icon: Home },
  { href: "#about", label: "ABOUT", Icon: User },
  { href: "#blog", label: "BLOG", Icon: Globe },
  { href: "#project", label: "WORK", Icon: Briefcase },
  { href: "#contact", label: "MAIL", Icon: Mail },
  { href: "#guestbook", label: "GUEST", Icon: BookOpen },
];

const Squiggle = ({ className = "" }) => (
  <svg viewBox="0 0 60 8" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
    <path d="M2 5 C 8 0, 12 8, 18 4 S 28 0, 34 4 S 46 8, 58 3" />
  </svg>
);

function NavButton({ item, index, active, onClick }) {
  const { label, Icon } = item;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={`group relative flex min-h-[40px] w-full flex-1 basis-0 cursor-pointer flex-col items-center justify-center gap-0.5 border-2 border-black font-mono text-[10px] font-black uppercase tracking-wider transition-all duration-150 [@media(min-height:820px)]:max-h-[68px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-black ${
        active
          ? "-rotate-2 bg-black text-white"
          : "bg-white text-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000] active:translate-x-0 active:translate-y-0 active:shadow-none"
      }`}
    >
      <span className={`absolute left-1 top-0.5 text-[8px] font-bold [@media(max-height:760px)]:hidden ${active ? "text-white/70" : "text-black/50"}`}>
        0{index + 1}
      </span>
      <Icon className="h-5 w-5 shrink-0 stroke-[2.5px] transition-transform group-hover:scale-110" />
      <span className="[@media(max-height:700px)]:hidden">{label}</span>
      {active && (
        <Squiggle className="absolute -bottom-2 left-1/2 w-9 -translate-x-1/2 text-black [@media(max-height:760px)]:hidden" />
      )}
    </button>
  );
}

function Group({ title, items, current, onPick }) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col justify-center gap-2 px-2">
      <p className="shrink-0 border-b-2 border-black pb-0.5 text-center font-mono text-[9px] font-black uppercase tracking-[0.2em]">
        {title}
      </p>
      {items.map((item, i) => (
        <NavButton
          key={item.val}
          item={item}
          index={i}
          active={current === item.val}
          onClick={() => onPick(item.val)}
        />
      ))}
    </div>
  );
}

export default function Menu({
  left = "1",
  right = "1",
  onLeftSelectChange,
  onRightSelectChange,
}) {
  const [isLoad, setIsLoad] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleSelect = (side, val) => {
    const current = side === "left" ? left : right;
    if (val === current) return;

    setIsLoad(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsLoad(false), 800);

    if (side === "left") onLeftSelectChange?.(val);
    else onRightSelectChange?.(val);
  };

  return (
    <>
      {isLoad && <Loader />}

      {/* ===== DESKTOP: strip vertikal di tengah ===== */}
      <nav
        aria-label="Navigasi utama"
        className="relative z-50 flex min-h-0 w-[92px] shrink-0 cursor-default flex-col items-center self-stretch border-4 border-black bg-white py-3 shadow-[8px_8px_0_0_#000] max-md:hidden"
      >
        <Group title="◀ L" items={LEFT_ITEMS} current={left} onPick={(v) => handleSelect("left", v)} />

        {/* tombol tools: pusat strip */}
        <div className="relative my-2 flex w-full shrink-0 items-center justify-center">
          <span aria-hidden className="absolute inset-x-0 top-1/2 h-[3px] bg-black" />
          <Link
            href="/tools"
            aria-label="Buka halaman tools"
            className="group relative z-10 -rotate-6 border-4 border-black bg-black p-3 text-white transition-all duration-150 hover:rotate-0 hover:bg-white hover:text-black hover:shadow-[4px_4px_0_0_#000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-black"
          >
            <Wrench className="h-5 w-5 stroke-[2.5px] transition-transform duration-300 group-hover:rotate-45" />

            {/* sticker tooltip */}
            <span className="pointer-events-none absolute left-full top-1/2 z-[60] ml-4 w-max -translate-x-2 -translate-y-1/2 rotate-3 border-2 border-black bg-white px-2 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-black opacity-0 shadow-[3px_3px_0_0_#000] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
              tools /// jangan dipencet*
            </span>
          </Link>
        </div>

        <Group title="R ▶" items={RIGHT_ITEMS} current={right} onPick={(v) => handleSelect("right", v)} />
      </nav>

      {/* ===== MOBILE: bottom bar ===== */}
      <nav
        aria-label="Navigasi mobile"
        className="fixed inset-x-0 bottom-0 z-50 border-t-4 border-black bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <ul className="grid grid-cols-7">
          {MOBILE_ITEMS.map(({ href, label, Icon }) => (
            <li key={href} className="border-r-2 border-black">
              <a
                href={href}
                className="flex h-14 flex-col items-center justify-center gap-0.5 font-mono text-[8px] font-black uppercase active:bg-black active:text-white"
              >
                <Icon className="h-4 w-4 stroke-[2.5px]" />
                {label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/tools"
              className="flex h-14 flex-col items-center justify-center gap-0.5 bg-black font-mono text-[8px] font-black uppercase text-white active:bg-white active:text-black"
            >
              <Wrench className="h-4 w-4 stroke-[2.5px]" />
              TOOLS
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}