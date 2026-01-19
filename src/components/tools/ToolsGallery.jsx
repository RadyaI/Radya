"use client"

import { useState } from "react";
import { Book, Binary, Keyboard, ArrowUpRight, Palette, ScanLine, Zap, Gauge, Pen, LucideKanbanSquareDashed, File, Signature, AlertTriangle, Rocket, Search, QrCode, LucideMapPlus } from "lucide-react"; // Tambah 'Search' di sini
import Cursor from "../cursor";
import Link from "next/link";

export default function ToolsGallery() {

    const [searchQuery, setSearchQuery] = useState("");

    const tools = [
        {
            id: 0,
            title: "My Learning Path",
            desc: "Sistem rencana belajar, menentukan target, dan mencatat progress.",
            link: "/learning",
            icon: Book,
            color: "from-blue-500 to-green-500",
            rotate: "hover:-rotate-2",
            delay: "animate-delay-100"
        },
        {
            id: 11,
            title: "Is This Map?",
            desc: "Experimen menggunakan library leaflet, melihat seberapa jauh kamu dari lokasi tertentu dan random lokasi.",
            link: "/isthismap",
            icon: LucideMapPlus,
            color: "from-blue-600 to-orange-400",
            rotate: "hover:-rotate-2",
            delay: "animate-delay-100"
        },
        {
            id: 1,
            title: "QR Code Generator",
            desc: "QR Code Generator gratis untuk link, teks, email, phone dan wifi.",
            link: "/tools/qrcode",
            icon: QrCode,
            color: "from-red-500 to-white-500",
            rotate: "hover:-rotate-2",
            delay: "animate-delay-100"
        },
        {
            id: 2,
            title: "SignPDF",
            desc: "Tanda tangan pdf online, client side 100% aman, tidak tersimpan di server",
            link: "/tools/signpdf",
            icon: Signature,
            color: "from-blue-600 to-pink-600",
            rotate: "hover:rotate-1",
            delay: "animate-delay-1000"
        },
        {
            id: 3,
            title: "Speed Typer",
            desc: "Uji kecepatan jari. Mode 'Stop-on-Error' & Bank kata dinamis (ID/EN).",
            link: "/tools/speedtyper",
            icon: Zap,
            color: "from-yellow-500 to-orange-500",
            rotate: "hover:-rotate-2",
            delay: "animate-delay-900"
        },
        {
            id: 4,
            title: "CryptoLab",
            desc: "Playground enkripsi. Hashing, Encoding, dan Cipher klasik.",
            link: "/tools/cryptolab",
            icon: Binary,
            color: "from-emerald-500 to-green-500",
            rotate: "hover:rotate-2",
            delay: "animate-delay-200"
        },
        {
            id: 5,
            title: "Don't Click",
            desc: "Ada tombol jangan diklik (klik aja gapapa).",
            link: "/tools/dont-click",
            icon: AlertTriangle,
            color: "from-neutral-800 to-red-600",
            rotate: "hover:-rotate-2",
            delay: "animate-delay-1100"
        },
        {
            id: 6,
            title: "KeyCodes",
            desc: "Visualizer event keyboard JS. Cek e.key & e.code realtime.",
            link: "/tools/keycodes",
            icon: Keyboard,
            color: "from-purple-500 to-pink-500",
            rotate: "hover:-rotate-1",
            delay: "animate-delay-300"
        },
        {
            id: 7,
            title: "Glass Generator",
            desc: "CSS Glassmorphism generator. Atur blur & opacity untuk UI modern.",
            link: "/tools/glassmorphism",
            icon: Palette,
            color: "from-pink-500 to-rose-500",
            rotate: "hover:rotate-2",
            delay: "animate-delay-500"
        },
        {
            id: 8,
            title: "WhoAmI",
            desc: "Network & System Identity Scanner. IP, OS, dan Battery check.",
            link: "/tools/whoami",
            icon: ScanLine,
            color: "from-cyan-500 to-blue-500",
            rotate: "hover:rotate-1",
            delay: "animate-delay-700"
        },
        {
            id: 9,
            title: "Street Racer",
            desc: "Tes refleks ala drag race. Tunggu lampu hijau, jangan asal starrttt!",
            link: "/tools/reactionrace",
            icon: Gauge,
            color: "from-red-600 to-rose-600",
            rotate: "hover:rotate-1",
            delay: "animate-delay-1000"
        },
        {
            id: 10,
            title: "Gravity Playground",
            desc: "Simulasi icon. Kamu bisa Drag, lempar, dan matiin gravitasinya.",
            link: "/tools/gravity",
            icon: Rocket,
            color: "from-indigo-500 to-violet-600",
            rotate: "hover:rotate-2",
            delay: "animate-delay-1200"
        }
    ];

    const filteredTools = tools.filter((tool) =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Cursor />
            <div className="min-h-screen w-full bg-[#050505] text-white relative overflow-hidden font-sans selection:bg-white/20">

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#00000000,transparent_0%,#050505_100%)] pointer-events-none"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

                    <div className="text-center mb-16 animate__animated animate__fadeInDown">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                            Uhuy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Playground.</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                            List *micro-tools* buat eksperimen aja.
                            <br className="hidden md:block" /> Dibuat untuk mempermudah hidup (semoga).
                        </p>

                        <div className="relative max-w-md mx-auto group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                            <div className="relative flex items-center bg-[#111] border border-[#222] rounded-2xl px-4 py-3 shadow-2xl focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 transition-all duration-300">
                                <Search className="w-5 h-5 text-gray-500 mr-3" />
                                <input
                                    type="text"
                                    placeholder="Cari tools..."
                                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {filteredTools.length > 0 ? (
                            filteredTools.map((item) => (
                                <Link
                                    href={item.link}
                                    key={item.id}
                                    className={`group relative h-[300px] w-full perspective-1000 animate__animated animate__fadeInUp ${item.delay}`}
                                >
                                    <div className={`
                                        relative w-full h-full bg-[#111] border border-[#222] rounded-3xl p-8 
                                        transition-all duration-500 ease-out transform
                                        ${item.rotate} hover:scale-105 hover:border-gray-600 hover:shadow-2xl
                                        flex flex-col justify-between overflow-hidden
                                    `}>

                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${item.color} transition-opacity duration-500`}></div>

                                        <div className="relative z-10 flex justify-between items-start">
                                            <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}>
                                                <item.icon className="w-8 h-8 text-white" />
                                            </div>

                                            <div className="p-2 bg-[#222] rounded-full border border-[#333] group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <div className="relative z-10 mt-auto">
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-500"></div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center animate__animated animate__fadeIn">
                                <div className="inline-block p-6 rounded-full bg-[#111] border border-[#222] mb-4">
                                    <Search className="w-8 h-8 text-gray-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-300">Wah, nggak nemu nih.</h3>
                                <p className="text-gray-500">Coba kata kunci lain bro.</p>
                            </div>
                        )}

                        {searchQuery === "" && (
                            <div className="group relative h-[300px] w-full flex items-center justify-center border border-dashed border-[#333] rounded-3xl p-8 hover:bg-[#111] transition cursor-default opacity-50 hover:opacity-100">
                                <div className="text-center">
                                    <span className="text-4xl mb-2 block">🚧</span>
                                    <p className="font-bold text-gray-500 group-hover:text-gray-300">More Tools Soon...</p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}