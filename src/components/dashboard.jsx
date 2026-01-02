"use client"

import { useEffect, useState } from "react";

import Menu from "./menu";
// import Cursor from "./components/cursor";

import Home from "./left/home";
import About from "./left/about";
import Blog from "./left/blog";

import Project from "./right/project";
import Contact from "./right/contact";
import Guestbook from "./right/guestbook";

// import Assistant from "./components/tools/AiChat/Assistant";

export default function Dashboard() {

    const [leftSelect, setLeftSelect] = useState('1');
    const [rightSelect, setRightSelect] = useState('1');

    const handleLeftSelectChange = (val) => setLeftSelect(val);
    const handleRightSelectChange = (val) => setRightSelect(val);

    useEffect(() => {
        console.log(`%cSystem Ready.`, "color: green; font-size: 20px; font-weight: bold;");
    }, []);

    // ✅ FIX 1: Hapus enter/spasi berlebih di variabel class biar string-nya bersih
    const panelClass = "relative flex-1 h-full bg-[#111]/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 max-[700px]:w-full max-[700px]:flex-none max-[700px]:h-auto max-[700px]:bg-[#111]";

    return (
        <>
            {/* <Cursor /> */}
            {/* ✅ FIX 2: Hapus komentar CSS di dalam className dan jadikan satu baris panjang */}
            <div className="h-[100dvh] w-full relative bg-[#050505] text-white overflow-hidden flex justify-center items-center font-sans selection:bg-blue-500/30 max-[700px]:overflow-y-auto max-[700px]:overflow-x-hidden max-[700px]:h-auto max-[700px]:block">

                <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 bg-[url('https://assets.iceable.com/img/noise-transparent.png')] animate-noise"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 w-[95%] h-[90%] flex items-center justify-between gap-4 max-w-[1600px] max-[700px]:flex-col max-[700px]:mt-10 max-[700px]:pb-20 max-[700px]:w-full max-[700px]:px-4">

                    <div className={`${panelClass} group hover:border-blue-500/30`}>
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent opacity-50"></div>

                        <div className="w-full h-full p-6 relative">

                            <div className="w-full h-full max-[700px]:hidden relative overflow-hidden">
                                {leftSelect === "1" && <Home />}
                                {leftSelect === "2" && <About />}
                                {leftSelect === "3" && <Blog />}
                            </div>

                            <div className="min-[700px]:hidden flex flex-col gap-10">
                                <section id="home"><Home /></section>
                                <div className="border-b border-white/10"></div>
                                <section id="about"><About /></section>
                                <div className="border-b border-white/10"></div>
                                <section id="blog"><Blog /></section>
                            </div>
                        </div>
                    </div>

                    <Menu
                        onLeftSelectChange={handleLeftSelectChange}
                        onRightSelectChange={handleRightSelectChange}
                    />

                    <div className={`${panelClass} group hover:border-purple-500/30`}>
                        <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-purple-500 to-transparent opacity-50"></div>

                        <div className="w-full h-full p-6 relative">
                            <div className="max-[700px]:hidden h-full overflow-y-auto no-scrollbar">
                                {rightSelect === "1" && <Project />}
                                {rightSelect === "2" && <Contact />}
                                {rightSelect === "3" && <Guestbook />}
                            </div>

                            <div className="min-[700px]:hidden flex flex-col gap-10">
                                <section id="project"><Project /></section>
                                <div className="border-b border-white/10"></div>
                                <section id="contact"><Contact /></section>
                                <div className="border-b border-white/10"></div>
                                <section id="guestbook"><Guestbook /></section>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <Assistant /> */}
            </div>
        </>
    );
}