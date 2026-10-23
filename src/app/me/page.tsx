import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Plus } from "lucide-react";
import foto from "@/assets/foto2.jpg";

export const metadata: Metadata = {
  title: "Me | Radya",
  description:
    "Sedikit lebih personal soal Radya: lagi ngapain, suka apa, dan proyek-proyek iseng yang dibuat di luar jam kuliah.",
  alternates: { canonical: "/me" },
};

/* ====== DATA (edit di sini aja) ====== */
const FACTS: [string, string][] = [
  ["Nama", "Muhammad Radya Iftikhar"],
  ["Panggilan", "Radya"],
  ["Domisili", "Malang, Indonesia"],
  ["Status", "Mahasiswa Informatika"],
  ["Minat", "Data Engineering"],
  ["Motto", "“In This Economy?”"],
  ["Bahan bakar", "Ngoding apa aja dah"],
];

const NOW = [
  "Belajar data pipeline dan ETL, pelan-pelan tapi konsisten.",
  "Merapikan personal web ini, sekarang versi tanpa warna.",
  "Mendalami SQL supaya nggak cuma SELECT *.",
];

const LIKES = ["Kucing", "BMW", "Bikin tools aneh yang nggak diminta siapa-siapa", "Data yang rapi", "Kopi sambil debugging"];
const DISLIKES = ["Bug yang cuma muncul di production", "Variabel bernama data2_final_fix", "Deploy hari Jumat", "Spreadsheet dengan merge cell berlebihan"];

const BUGS = [
  { id: "001", title: "Bilang “sebentar lagi selesai” padahal masih setengah", status: "Won’t fix" },
  { id: "002", title: "Mulai proyek baru sebelum yang lama kelar", status: "Known issue" },
  { id: "003", title: "Ketemu kucing, produktivitas turun 80%", status: "Feature" },
  { id: "004", title: "Dependency di package.json terus bertambah", status: "In progress" },
];

const FAQ = [
  {
    q: "Kenapa webnya hitam putih?",
    a: "Awalnya warna-warni dan terasa seperti portfolio UI/UX. Minatku sekarang data engineering, jadi aku ingin tampilan yang lebih tenang dan presisi, seperti diagram pipeline.",
  },
  {
    q: "Kenapa banyak tools dan game aneh?",
    a: "Karena belajar paling cepat saat lagi iseng. Hampir semuanya lahir dari pikiran “kayaknya seru kalau ada ini”, lalu jadi.",
  },
  {
    q: "Boleh diajak kolaborasi atau ngobrol?",
    a: "Boleh banget. Kirim email atau tulis di guestbook di halaman utama.",
  },
];

const RABBIT_HOLES = [
  { href: "/tools", label: "Tools", note: "Alat kecil: crypto, QR, sign PDF" },
  { href: "/isthismap", label: "Isthismap", note: "Eksperimen geografi absurd" },
  { href: "/3d", label: "3D", note: "Mini game 3D" },
  { href: "/cat", label: "Cat", note: "Ya, soal kucing" },
  { href: "/bmw", label: "BMW", note: "Ya, soal BMW" },
  { href: "/quiz", label: "Quiz", note: "Kuis buatan sendiri" },
  { href: "/learning", label: "Learning", note: "Rencana belajar dan jurnal" },
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
          aria-label="Navigasi halaman"
          className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.12em]"
        >
          <Link href="/" className={`flex items-center gap-1.5 hover:underline ${FOCUS}`}>
            <ArrowLeft className="h-3 w-3 stroke-[3px]" aria-hidden />
            Kembali
          </Link>
          <span className="hidden sm:inline">Personal Index</span>
          <span className="tabular-nums">Radya / 2026</span>
        </nav>

        {/* ===== GRID: gap-px di atas bg hitam = garis 1px antar sel ===== */}
        <div className="grid grid-cols-1 gap-px border-2 border-black bg-black lg:grid-cols-12">
          {/* hero */}
          <header className="flex min-w-0 flex-col justify-between gap-8 bg-white p-4 lg:col-span-8">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.12em]">
              <span>Tentang / Me</span>
              <span className="tabular-nums">00</span>
            </div>
            <div>
              <h1 className="text-[clamp(3rem,9.5vw,9rem)] font-bold leading-[0.84] tracking-[-0.055em]">
                Radya
                <br />
                Iftikhar.
              </h1>
              <p className="mt-6 max-w-[36rem] text-base font-medium leading-tight tracking-[-0.01em] md:text-lg">
                Halaman yang lebih santai dari portfolio. Tanpa jargon, hanya sedikit soal siapa Radya di luar
                kode: lagi ngapain, suka apa, dan bug apa saja yang masih ada.
              </p>
            </div>
          </header>

          {/* foto: menempel penuh di sel, span 2 baris */}
          <figure className="relative min-h-[22rem] bg-white lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:min-h-0">
            <Image
              src={foto}
              alt="Foto Radya"
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
          <Cell no="01" title="Fakta singkat" id="me-facts" className="lg:col-span-4">
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
          <Cell no="02" title="Lagi ngapain" id="me-now" className="lg:col-span-4">
            <ol>
              {NOW.map((n, i) => (
                <li key={n} className="grid grid-cols-[2.25rem_1fr] items-start gap-x-3 border-b border-black py-2 last:border-0">
                  <span className="text-3xl font-bold leading-none tracking-[-0.05em] tabular-nums">{i + 1}</span>
                  <p className="text-sm leading-tight">{n}</p>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-[10px] tabular-nums">Diperbarui Okt 2026.</p>
          </Cell>

          {/* suka */}
          <Cell no="03" title="Suka" id="me-likes" className="lg:col-span-3">
            <ul>
              {LIKES.map((l) => (
                <li key={l} className="border-b border-black py-1.5 last:border-0">
                  {l}
                </li>
              ))}
            </ul>
          </Cell>

          {/* tidak suka */}
          <Cell no="04" title="Tidak suka" id="me-dislikes" className="lg:col-span-3">
            <ul>
              {DISLIKES.map((d) => (
                <li key={d} className="border-b border-black py-1.5 last:border-0">
                  {d}
                </li>
              ))}
            </ul>
          </Cell>

          {/* bugs */}
          <Cell no="05" title="Known bugs" id="me-bugs" className="lg:col-span-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[26rem] border-collapse text-left">
                <caption className="sr-only">Daftar bug yang masih ada pada diri Radya</caption>
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.1em]">
                    <th scope="col" className="w-10 pb-1.5 pr-3 font-bold">ID</th>
                    <th scope="col" className="pb-1.5 pr-3 font-bold">Masalah</th>
                    <th scope="col" className="w-24 pb-1.5 text-right font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {BUGS.map((b) => (
                    <tr key={b.id} className="border-t border-black">
                      <td className="py-1.5 pr-3 font-bold tabular-nums">{b.id}</td>
                      <td className="py-1.5 pr-3">{b.title}</td>
                      <td className="py-1.5 text-right text-[10px] font-bold uppercase tracking-[0.06em]">{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Cell>

          {/* rabbit holes */}
          <Cell no="06" title="Rabbit holes" id="me-holes" className="lg:col-span-7">
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
          <Cell no="07" title="FAQ" id="me-faq" className="lg:col-span-5">
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
          <footer className="flex min-w-0 flex-col justify-between gap-8 bg-black p-4 text-white lg:col-span-12 lg:flex-row lg:items-end">
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.12em] lg:flex-col lg:gap-1">
              <span>Kontak</span>
              <span className="tabular-nums">08</span>
            </div>
            <a
              href="mailto:radyaiftikhar@gmail.com"
              className="break-all text-[clamp(1.75rem,6.5vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.05em] hover:underline hover:decoration-[0.05em] hover:underline-offset-[0.1em] focus-visible:outline-2 focus-visible:outline-white"
            >
              radyaiftikhar@gmail.com
            </a>
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] tabular-nums lg:text-right">
              <p>Malang, ID</p>
              <p>© 2026</p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}