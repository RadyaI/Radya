"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { format } from "date-fns";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Calendar, Clock, ArrowUpRight, Hash, Feather } from "lucide-react";
import { db } from "@/utils/firebase";

const mediumBlogs = [
  {
    title: "Memahami Percabangan pada Bahasa Pemrograman Java",
    date: "Aug 19, 2025",
    read: "4 min read",
    link: "https://medium.com/@radyaiftikhar/memahami-percabangan-pada-bahasa-pemrograman-java-3c44926c67f7",
    type: "medium",
    tags: ["JAVA"],
  },
  {
    title: "Mengenal Variabel dan Tipe Data pada Bahasa Pemrograman Java",
    date: "Aug 17, 2025",
    read: "5 min read",
    link: "https://medium.com/@radyaiftikhar/mengenal-variabel-dan-tipe-data-pada-bahasa-pemrograman-java-23a82d232e12",
    type: "medium",
    tags: ["JAVA"],
  },
  {
    title: "20 Ide Project Menggunakan React: Mulai dari Pemula Sampai Advance",
    date: "Aug 31, 2024",
    read: "4 min read",
    link: "https://medium.com/@radyaiftikhar/20-ide-project-menggunakan-react-mulai-dari-pemula-sampai-advance-0bde3f6392bc",
    type: "medium",
    tags: ["REACT"],
  },
  {
    title: "Node.js: Framework JavaScript atau Runtime JavaScript?",
    date: "Aug 29, 2024",
    read: "3 min read",
    link: "https://medium.com/@radyaiftikhar/node-js-framework-javascript-atau-runtime-javascript-e511828d8e7d",
    type: "medium",
    tags: ["NODE.JS"],
  },
  {
    title: "Cara Menghitung Selisih Tanggal Menggunakan JavaScript",
    date: "Aug 29, 2024",
    read: "3 min read",
    link: "https://medium.com/@radyaiftikhar/cara-menghitung-selisih-tanggal-menggunakan-javascript-e9355c444ed9",
    type: "medium",
    tags: ["JAVASCRIPT"],
  },
  {
    title: "Apa Itu Pointer dalam Bahasa C?",
    date: "Oct 5, 2024",
    read: "2 min read",
    link: "https://medium.com/@radyaiftikhar/apa-itu-pointers-dalam-bahasa-c-0519f8895b90",
    type: "medium",
    tags: ["C LANG"],
  },
  {
    title: "Apa Itu Fungsi dalam Bahasa C?",
    date: "Oct 5, 2024",
    read: "3 min read",
    link: "https://medium.com/@radyaiftikhar/apa-itu-fungsi-dalam-bahasa-c-42368d611ef3",
    type: "medium",
    tags: ["C LANG"],
  },
];

const pad = (n) => String(n).padStart(3, "0");

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState(mediumBlogs);
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const fetchArticles = async () => {
      try {
        if (!db) return;

        const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);

        const firebaseArticles = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            slug: data.slug,
            date: data.createdAt
              ? format(new Date(data.createdAt.seconds * 1000), "MMM d, yyyy")
              : "New",
            read: "5 min read",
            link: `/blog/${data.slug}`,
            type: "internal",
            tags: data.tags || ["Article"],
          };
        });

        if (!cancelled) setBlogs([...firebaseArticles, ...mediumBlogs]);
      } catch (error) {
        console.error("Gagal ambil blog:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchArticles();
    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    if (loading || !containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
        clearProps: "transform,opacity",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  const originals = blogs.filter((b) => b.type === "internal").length;

  return (
    <div ref={containerRef} className="@container flex w-full flex-col text-black md:h-full">
      <style>{`
        .blog-scroll::-webkit-scrollbar { width: 8px; }
        .blog-scroll::-webkit-scrollbar-track { background: #fff; border-left: 2px solid #000; }
        .blog-scroll::-webkit-scrollbar-thumb { background: #000; }
        .blog-scroll { scrollbar-width: thin; scrollbar-color: #000 #fff; }
        @keyframes blog-blink { 50% { opacity: 0.2; } }
        .blog-blink { animation: blog-blink 0.9s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) { .blog-blink { animation: none; } }
      `}</style>

      {/* ===== header ===== */}
      <div className="z-20 flex shrink-0 flex-wrap items-center gap-3 border-b-4 border-black bg-white pb-2 md:pt-1">
        <span className="bg-black px-2 py-0.5 font-mono text-sm font-bold text-white">03 //</span>
        <h2 className="text-2xl font-black uppercase tracking-tighter">Archive Logs.</h2>
        <span className="ml-auto hidden font-mono text-[10px] uppercase text-black/50 @md:inline">
          table: articles
        </span>
      </div>

      {/* stat strip */}
      <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 border-b-2 border-dashed border-black py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest">
        <span>rows: {loading ? "…" : blogs.length}</span>
        <span>original: {loading ? "…" : originals}</span>
        <span>medium: {mediumBlogs.length}</span>
        <span className="ml-auto flex items-center gap-1">
          <span className={`h-2 w-2 bg-black ${loading ? "blog-blink" : ""}`} aria-hidden />
          {loading ? "fetching…" : "synced"}
        </span>
      </div>

      {/* ===== list ===== */}
      <div className="blog-scroll pb-10 pt-6 md:min-h-0 md:flex-1 md:overflow-y-auto md:overflow-x-hidden md:pr-3">
        {loading ? (
          <ul className="grid gap-6" aria-busy="true" aria-label="Memuat artikel">
            {[0, 1, 2].map((i) => (
              <li
                key={i}
                className="h-28 border-2 border-black bg-[repeating-linear-gradient(135deg,#fff_0_8px,#e5e5e5_8px_16px)] shadow-[4px_4px_0_0_#000]"
              />
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-1 gap-7">
            {blogs.map((item, idx) => {
              const tag = item.tags?.[0] || "General";
              const isInternal = item.type === "internal";
              const Component = isInternal ? Link : "a";
              const linkProps = isInternal
                ? { href: item.link }
                : { href: item.link, target: "_blank", rel: "noopener noreferrer" };

              return (
                <li key={item.id || item.link}>
                  <Component
                    {...linkProps}
                    className={`blog-card group relative block bg-white p-5 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_#000] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dashed focus-visible:outline-black active:translate-x-1 active:translate-y-1 active:shadow-none ${
                      isInternal
                        ? "border-4 border-black shadow-[6px_6px_0_0_#000]"
                        : "border-2 border-black shadow-[4px_4px_0_0_#000]"
                    } ${idx % 2 ? "rotate-[0.4deg]" : "-rotate-[0.4deg]"} hover:rotate-0`}
                  >
                    {/* tape belang */}
                    <span
                      aria-hidden
                      className={`absolute -top-3 h-4 w-16 border border-black bg-[repeating-linear-gradient(45deg,#000_0_4px,#fff_4px_8px)] ${
                        idx % 2 ? "-right-2 rotate-[8deg]" : "-left-2 -rotate-[10deg]"
                      }`}
                    />

                    {/* nomor baris */}
                    <span className="absolute -bottom-3 right-3 border-2 border-black bg-white px-1.5 font-mono text-[9px] font-black">
                      row_{pad(blogs.length - idx)}
                    </span>

                    <div className="relative z-10 mb-3 flex items-start justify-between gap-3">
                      <span className="flex items-center gap-1 border-2 border-black bg-black px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest text-white">
                        <Hash className="h-3 w-3" aria-hidden /> {tag}
                      </span>

                      {isInternal ? (
                        <span className="flex rotate-3 items-center gap-1 border-2 border-black bg-white px-1.5 py-0.5 font-mono text-[9px] font-black uppercase">
                          <Feather className="h-3 w-3" aria-hidden /> original
                        </span>
                      ) : (
                        <ArrowUpRight
                          className="h-5 w-5 shrink-0 stroke-[3px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-125"
                          aria-label="Link eksternal ke Medium"
                        />
                      )}
                    </div>

                    <h3 className="mb-4 text-lg font-black leading-snug decoration-[3px] underline-offset-4 group-hover:underline @md:text-xl">
                      {item.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t-2 border-dashed border-black pt-3 font-mono text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" aria-hidden /> {item.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" aria-hidden /> {item.read}
                      </span>
                      <span className="ml-auto text-[10px] uppercase text-black/50">
                        src: {isInternal ? "radya.my.id" : "medium"}
                      </span>
                    </div>
                  </Component>
                </li>
              );
            })}
          </ul>
        )}

        {!loading && (
          <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
            -- end of table: articles --
          </p>
        )}
      </div>
    </div>
  );
}