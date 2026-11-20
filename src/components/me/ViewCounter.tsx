"use client";

import { useEffect, useRef, useState } from "react";
import { doc, getDoc, increment, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

const COLLECTION = "me_view_count";
const DOC_ID = "total";
const STORAGE_KEY = "me_last_counted";
const OWNER_KEY = "me_owner";
const COOLDOWN_MS = 30 * 60 * 1000; // 30 menit

/* Cek apakah kunjungan ini layak dihitung. Sebisanya aja, bukan anti-spam sempurna. */
function shouldCount(): boolean {
  if (process.env.NODE_ENV !== "production") return false; // dev nggak dihitung
  try {
    if (navigator.webdriver) return false;
    if (/bot|crawl|spider|slurp|headless|preview|lighthouse/i.test(navigator.userAgent)) return false;
    if (localStorage.getItem(OWNER_KEY) === "1") return false; // device sendiri

    const last = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
    if (Date.now() - last < COOLDOWN_MS) return false;

    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    return true;
  } catch {
    return false; // storage diblokir, jangan hitung
  }
}

export default function ViewCounter({ className = "" }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const ref = doc(db, COLLECTION, DOC_ID);

    (async () => {
      if (shouldCount()) {
        try {
          await setDoc(ref, { count: increment(1) }, { merge: true });
        } catch (err) {
          console.error("Gagal menambah view count:", err);
        }
      }
      try {
        const snap = await getDoc(ref);
        setCount(snap.exists() ? (snap.data().count as number) : 0);
      } catch (err) {
        console.error("Gagal membaca view count:", err);
      }
    })();
  }, []);

  return (
    <p className={className} aria-live="polite">
      Dibuka {count === null ? "—" : count.toLocaleString("id-ID")} kali
    </p>
  );
}