"use client"

import { useEffect, useState } from "react";

import Menu from "./menu";

import Home from "./left/home";
import About from "./left/about";
import Blog from "./left/blog";

import Project from "./right/project";
import Contact from "./right/contact";
import Guestbook from "./right/guestbook";


export default function Dashboard() {

    const [leftSelect, setLeftSelect] = useState('1');
    const [rightSelect, setRightSelect] = useState('1');

    const handleLeftSelectChange = (val) => setLeftSelect(val);
    const handleRightSelectChange = (val) => setRightSelect(val);

    useEffect(() => {
        console.log(`%cSystem Ready (Style Only Update).`, "color: black; font-size: 20px; font-weight: bold; background: yellow; padding: 4px;");
    }, []);

    const panelClass = "relative flex-1 h-full bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all duration-500 max-[700px]:w-full max-[700px]:flex-none max-[700px]:h-auto max-[700px]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";

    return (
        <>            
            <div className="h-[100dvh] w-full relative bg-[#f4f1ea] text-neutral-900 overflow-hidden flex justify-center items-center font-sans selection:bg-yellow-300 selection:text-black max-[700px]:overflow-y-auto max-[700px]:overflow-x-hidden max-[700px]:h-auto max-[700px]:block">

                <div className="absolute inset-0 opacity-40 pointer-events-none z-0 mix-blend-multiply">
                    <svg className="w-full h-full">
                        <filter id="noise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noise)"/>
                    </svg>
                </div>
                <div className="absolute inset-0 opacity-10 pointer-events-none z-0" 
                     style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="relative z-10 w-[95%] h-[90%] flex items-center justify-between gap-4 max-w-[1600px] max-[700px]:flex-col max-[700px]:mt-10 max-[700px]:pb-20 max-[700px]:w-full max-[700px]:px-4">

                    <div className={`${panelClass} group hover:border-black/70`}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-yellow-200/90 border-b-2 border-l-2 border-r-2 border-black/10 rounded-b-sm"></div>

                        <div className="w-full h-full p-6 relative">
                            <div className="w-full h-full max-[700px]:hidden relative overflow-hidden">
                                {leftSelect === "1" && <Home />}
                                {leftSelect === "2" && <About />}
                                {leftSelect === "3" && <Blog />}
                            </div>

                            <div className="min-[700px]:hidden flex flex-col gap-10">
                                <section id="home"><Home /></section>
                                <div className="border-b-2 border-dashed border-gray-400"></div>
                                <section id="about"><About /></section>
                                <div className="border-b-2 border-dashed border-gray-400"></div>
                                <section id="blog"><Blog /></section>
                            </div>
                        </div>
                    </div>

                    <Menu
                        onLeftSelectChange={handleLeftSelectChange}
                        onRightSelectChange={handleRightSelectChange}
                    />

                    <div className={`${panelClass} group hover:border-black/70`}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-blue-200/90 border-b-2 border-l-2 border-r-2 border-black/10 rounded-b-sm"></div>

                        <div className="w-full h-full p-6 relative">
                            <div className="max-[700px]:hidden h-full overflow-y-auto no-scrollbar">
                                {rightSelect === "1" && <Project />}
                                {rightSelect === "2" && <Contact />}
                                {rightSelect === "3" && <Guestbook />}
                            </div>

                            <div className="min-[700px]:hidden flex flex-col gap-10">
                                <section id="project"><Project /></section>
                                <div className="border-b-2 border-dashed border-gray-400"></div>
                                <section id="contact"><Contact /></section>
                                <div className="border-b-2 border-dashed border-gray-400"></div>
                                <section id="guestbook"><Guestbook /></section>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}