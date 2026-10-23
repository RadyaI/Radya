"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import gsap from "gsap";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { Send, Trash2, LogIn, MessageSquare, User, Loader2 } from "lucide-react";
import { auth, db } from "../../utils/firebase";

const ADMIN_EMAIL = "radyaiftikhar@gmail.com";
const MAX_LEN = 280;

const Squiggle = ({ className = "" }) => (
  <svg viewBox="0 0 120 12" preserveAspectRatio="none" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden>
    <path d="M3 7 C 20 1, 35 12, 55 6 S 90 2, 117 8" />
  </svg>
);

const toUser = (u) =>
  u && {
    displayName: u.displayName,
    email: u.email,
    photoURL: u.photoURL,
  };

export default function Guestbook() {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef(null);
  const listRef = useRef(null);
  const animated = useRef(false);

  const isAdmin = user?.email === ADMIN_EMAIL;

  /* ---------- auth: sumber kebenaran = Firebase, bukan cookie ---------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(toUser(u)));
    return () => unsub();
  }, []);

  async function handleLogin() {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const userData = result.user.providerData[0];
      // tetap diset supaya halaman lain (quiz, dll) yang baca cookie ini nggak rusak
      Cookies.set("loginData", JSON.stringify(userData));
      Cookies.set("isLoggedIn", "true");
    } catch (error) {
      if (error?.code !== "auth/popup-closed-by-user") {
        console.error("Login Failed:", error);
        toast.error("Login gagal, coba lagi");
      }
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      Cookies.remove("isLoggedIn");
      toast.success("Berhasil logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  /* ---------- realtime messages ---------- */
  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("time", "asc"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setMessages(snapshot.docs.map((d) => ({ ...d.data(), id: d.id })));
        setLoaded(true);
      },
      (error) => {
        console.error("Snapshot error:", error);
        setLoaded(true);
      }
    );
    return () => unsub();
  }, []);

  /* auto-scroll ke bawah: hanya di desktop & hanya di dalam list (tidak menggeser halaman) */
  useEffect(() => {
    const el = listRef.current;
    if (!el || !window.matchMedia("(min-width: 768px)").matches) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  /* animasi masuk, cuma sekali */
  useLayoutEffect(() => {
    if (!loaded || messages.length === 0 || animated.current) return;
    animated.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".msg-card", {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: "back.out(1.2)",
        clearProps: "transform,opacity",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loaded, messages.length]);

  async function handleSend(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || !user || isLoading) return;
    setIsLoading(true);

    try {
      await addDoc(collection(db, "guestbook"), {
        time: Timestamp.now().toMillis(),
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        msg: text.slice(0, MAX_LEN),
      });
      setInput("");
    } catch (error) {
      console.error("Send Failed:", error);
      toast.error("Gagal kirim pesan");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!isAdmin) return;
    if (!confirm("Hapus pesan ini permanen?")) return;
    try {
      await deleteDoc(doc(db, "guestbook", id));
    } catch (error) {
      console.error("Delete Failed:", error);
      toast.error("Gagal hapus pesan");
    }
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: "3px solid #000",
            borderRadius: 0,
            background: "#fff",
            color: "#000",
            fontFamily: "ui-monospace, monospace",
            fontWeight: 800,
            fontSize: "12px",
            boxShadow: "4px 4px 0 0 #000",
          },
          iconTheme: { primary: "#000", secondary: "#fff" },
        }}
      />

      <div ref={containerRef} className="@container relative flex w-full flex-col text-black md:h-full">
        <style>{`
          .gb-scroll::-webkit-scrollbar { width: 8px; }
          .gb-scroll::-webkit-scrollbar-track { background: #fff; border-left: 2px solid #000; }
          .gb-scroll::-webkit-scrollbar-thumb { background: #000; }
          .gb-scroll { scrollbar-width: thin; scrollbar-color: #000 #fff; }
        `}</style>

        {/* ===== header ===== */}
        <div className="z-20 flex shrink-0 items-end justify-between gap-3 border-b-4 border-black bg-white pb-2 md:pt-1">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="bg-black px-2 py-0.5 font-mono text-sm font-bold text-white">06 //</span>
              <span className="font-mono text-[10px] font-black uppercase tracking-widest">public logs</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Guestbook</h2>
          </div>
          <div className="flex rotate-2 items-center gap-2 border-2 border-black bg-white px-2.5 py-1 font-mono text-xs font-black shadow-[3px_3px_0_0_#000]">
            <MessageSquare className="h-3 w-3" aria-hidden />
            {loaded ? messages.length : "…"} msgs
          </div>
        </div>

        {/* ===== list ===== */}
        <div
          ref={listRef}
          className="gb-scroll py-6 md:min-h-0 md:flex-1 md:overflow-y-auto md:overflow-x-hidden md:pr-3"
          aria-live="polite"
        >
          {!loaded ? (
            <ul className="grid gap-6" aria-busy="true" aria-label="Memuat pesan">
              {[0, 1, 2].map((i) => (
                <li
                  key={i}
                  className="h-20 border-2 border-black bg-[repeating-linear-gradient(135deg,#fff_0_8px,#e5e5e5_8px_16px)] shadow-[4px_4px_0_0_#000]"
                />
              ))}
            </ul>
          ) : messages.length === 0 ? (
            <div className="rotate-1 border-4 border-dashed border-black p-8 text-center font-mono text-sm font-bold">
              {"<0 rows returned. be the first./>"}
            </div>
          ) : (
            <ul className="flex flex-col gap-7">
              {messages.map((msg, idx) => {
                const owner = msg.email === ADMIN_EMAIL;
                return (
                  <li
                    key={msg.id}
                    className={`msg-card group relative flex gap-3 border-2 border-black bg-white p-4 shadow-[4px_4px_0_0_#000] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:rotate-0 hover:shadow-[7px_7px_0_0_#000] ${
                      owner ? "border-4" : ""
                    } ${idx % 2 ? "rotate-[0.4deg]" : "-rotate-[0.4deg]"}`}
                  >
                    <span
                      aria-hidden
                      className={`absolute -top-3 h-4 w-12 border border-black bg-[repeating-linear-gradient(45deg,#000_0_4px,#fff_4px_8px)] ${
                        idx % 2 ? "-right-2 rotate-[8deg]" : "-left-2 -rotate-[10deg]"
                      }`}
                    />

                    <div className="relative z-10 shrink-0">
                      {msg.photoURL ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={msg.photoURL}
                          alt=""
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="h-10 w-10 border-2 border-black bg-white object-cover grayscale contrast-125"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white">
                          <User className="h-5 w-5" aria-hidden />
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 min-w-0 flex-1">
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-sm font-black uppercase">{msg.name}</span>
                          {owner && (
                            <span className="-rotate-2 bg-black px-1.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider text-white">
                              owner
                            </span>
                          )}
                        </div>

                        {isAdmin && (
                          <button
                            type="button"
                            onClick={() => handleDelete(msg.id)}
                            aria-label={`Hapus pesan dari ${msg.name}`}
                            className="shrink-0 border-2 border-black bg-white p-1 transition-all hover:bg-black hover:text-white focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                          >
                            <Trash2 className="h-3 w-3" aria-hidden />
                          </button>
                        )}
                      </div>

                      <p className="break-words font-sans text-sm leading-relaxed @md:text-base">{msg.msg}</p>

                      {msg.time && (
                        <p className="mt-2 font-mono text-[10px] font-bold uppercase text-black/50">
                          ts: {format(new Date(msg.time), "MMM d, HH:mm")}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* ===== input bar ===== */}
        <div className="relative z-30 shrink-0 border-t-4 border-black bg-white pb-1 pt-4">
          <Squiggle className="pointer-events-none absolute -top-[10px] right-6 h-2 w-20 bg-white text-black" />

          {!user ? (
            <button
              type="button"
              onClick={handleLogin}
              className="flex w-full items-center justify-center gap-2 border-2 border-black bg-black py-3 font-mono text-sm font-black uppercase text-white shadow-[4px_4px_0_0_#000] transition-all duration-150 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
            >
              <LogIn className="h-4 w-4 stroke-[3px]" aria-hidden />
              Sign in with Google to write
            </button>
          ) : (
            <form onSubmit={handleSend} className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="min-w-0 truncate">
                  as: <span className="bg-black px-1 text-white">{user.email}</span>
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="shrink-0 border-b-2 border-black font-black hover:bg-black hover:text-white"
                >
                  sign out
                </button>
              </div>

              <div className="flex items-stretch gap-3">
                <label htmlFor="gb-input" className="sr-only">
                  Tulis pesan
                </label>
                <input
                  id="gb-input"
                  type="text"
                  value={input}
                  maxLength={MAX_LEN}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="> write a message..."
                  disabled={isLoading}
                  autoComplete="off"
                  className="min-w-0 flex-1 border-2 border-black bg-white px-3 py-3 font-mono text-sm font-bold placeholder:text-black/40 focus:shadow-[4px_4px_0_0_#000] focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Kirim pesan"
                  className="flex w-12 shrink-0 items-center justify-center border-2 border-black bg-black text-white shadow-[4px_4px_0_0_#000] transition-all duration-150 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed focus-visible:outline-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                  ) : (
                    <Send className="h-5 w-5 stroke-[2.5px]" aria-hidden />
                  )}
                </button>
              </div>

              <p className="text-right font-mono text-[10px] font-bold text-black/50">
                {input.length}/{MAX_LEN}
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}