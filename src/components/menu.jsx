"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Import icon dari Lucide
import {
    Wrench,
    Home,
    User,
    Globe,
    Briefcase,
    Mail,
    BookOpen
} from "lucide-react";
import Loader from "./loader";
import Link from "next/link";

export default function Menu({ onLeftSelectChange, onRightSelectChange }) {

    const [leftSelect, setLeftSelect] = useState("1");
    const [rightSelect, setRightSelect] = useState("1");
    const [isLoad, setIsLoad] = useState(false);

    const router = useRouter();

    const handleSelect = (side, val) => {
        setIsLoad(true);
        setTimeout(() => setIsLoad(false), 800);

        if (side === 'left') {
            setLeftSelect(val);
            onLeftSelectChange(val);
        } else {
            setRightSelect(val);
            onRightSelectChange(val);
        }
    };

    // Helper buat class biar rapi dan aman dari error spasi
    const getBtnClass = (isActive, side) => {
        const base = "group relative w-full h-12 flex flex-col justify-center items-center transition-all duration-300 cursor-pointer";
        const activeColor = side === 'left'
            ? "text-blue-400 border-l-2 border-blue-400 bg-blue-500/10"
            : "text-purple-400 border-r-2 border-purple-400 bg-purple-500/10";
        const inactiveColor = "text-gray-500 hover:text-gray-200 hover:bg-white/5";

        return `${base} ${isActive ? activeColor : inactiveColor}`;
    };

    return (
        <>
            {isLoad && <Loader />}

            <div className="cursor-default w-[80px] h-[80vh] flex flex-col justify-between items-center py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-x border-white/5 z-50 max-[700px]:hidden rounded-2xl mx-4 shadow-2xl">

                {/* --- LEFT MENU (Home, About, Blog) --- */}
                <div className="w-full flex flex-col gap-6 items-center justify-center flex-1 border-b border-white/10">

                    <div className={getBtnClass(leftSelect === "1", 'left')} onClick={() => handleSelect('left', "1")}>
                        <Home className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold tracking-wider">HOME</span>
                    </div>

                    <div className={getBtnClass(leftSelect === "2", 'left')} onClick={() => handleSelect('left', "2")}>
                        <User className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold tracking-wider">ABOUT</span>
                    </div>

                    <div className={getBtnClass(leftSelect === "3", 'left')} onClick={() => handleSelect('left', "3")}>
                        <Globe className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold tracking-wider">BLOG</span>
                    </div>

                </div>

                {/* --- TOOLS BUTTON (Center) --- */}
                <Link
                    href="/tools"
                    className="relative group my-3 p-3 rounded-xl transition-all duration-300 hover:bg-yellow-500/10 text-gray-700 hover:text-yellow-400 cursor-pointer block"
                >
                    <Wrench className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />

                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-max opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-[60]">
                        <div className="px-2 py-1 bg-yellow-500 text-black text-[9px] font-black tracking-widest rounded shadow-[0_0_15px_rgba(234,179,8,0.6)]">
                            TOOLS
                            <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-yellow-500"></div>
                        </div>
                    </div>
                </Link>

                {/* --- RIGHT MENU (Work, Mail, Guest) --- */}
                <div className="w-full flex flex-col gap-6 items-center justify-center flex-1 border-t border-white/10">

                    <div className={getBtnClass(rightSelect === "1", 'right')} onClick={() => handleSelect('right', "1")}>
                        <Briefcase className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold tracking-wider">WORK</span>
                    </div>

                    <div className={getBtnClass(rightSelect === "2", 'right')} onClick={() => handleSelect('right', "2")}>
                        <Mail className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold tracking-wider">MAIL</span>
                    </div>

                    <div className={getBtnClass(rightSelect === "3", 'right')} onClick={() => handleSelect('right', "3")}>
                        <BookOpen className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold tracking-wider">GUEST</span>
                    </div>

                </div>

            </div>
        </>
    );
}