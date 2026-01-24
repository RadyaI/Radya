"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

    const getBtnClass = (isActive, side) => {
        const base = "group relative w-full h-12 flex flex-col justify-center items-center transition-all duration-200 cursor-pointer";

        const activeColor = side === 'left'
            ? "bg-blue-100 text-black border-l-4 border-black font-bold"
            : "bg-purple-100 text-black border-r-4 border-black font-bold";

        const inactiveColor = "text-gray-400 hover:text-black hover:bg-black/5";

        return `${base} ${isActive ? activeColor : inactiveColor}`;
    };

    return (
        <>
            {isLoad && <Loader />}

            <div className="cursor-default w-[80px] h-[85vh] flex flex-col justify-between items-center py-4 bg-[#f4f1ea] border-2 border-black z-50 max-[700px]:hidden rounded-xl mx-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

                <div className="w-full flex flex-col gap-6 items-center justify-center flex-1 border-b-2 border-dashed border-gray-400">

                    <div className={getBtnClass(leftSelect === "1", 'left')} onClick={() => handleSelect('left', "1")}>
                        <Home className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform stroke-[2px]" />
                        <span className="text-[10px] font-bold tracking-wider font-mono">HOME</span>
                    </div>

                    <div className={getBtnClass(leftSelect === "2", 'left')} onClick={() => handleSelect('left', "2")}>
                        <User className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform stroke-[2px]" />
                        <span className="text-[10px] font-bold tracking-wider font-mono">ABOUT</span>
                    </div>

                    <div className={getBtnClass(leftSelect === "3", 'left')} onClick={() => handleSelect('left', "3")}>
                        <Globe className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform stroke-[2px]" />
                        <span className="text-[10px] font-bold tracking-wider font-mono">BLOG</span>
                    </div>

                </div>

                <Link
                    href="/tools"
                    className="relative group my-3 p-3 rounded-lg border-2 border-transparent hover:border-black hover:bg-yellow-300 hover:shadow-[2px_2px_0px_0px_black] transition-all duration-200 text-gray-500 hover:text-black cursor-pointer block hover:-rotate-3"
                >
                    <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300 stroke-[2.5px]" />

                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-max opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none z-[60]">

                        <div className="relative px-2 py-1 bg-yellow-300 text-black border border-black text-[9px] font-black tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            TOOLS

                            <div className="absolute top-1/2 -translate-y-1/2 -left-[6px] w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-black"></div>
                            <div className="absolute top-1/2 -translate-y-1/2 -left-[5px] w-0 h-0 border-t-[5px] border-b-[5px] border-r-[5px] border-t-transparent border-b-transparent border-r-yellow-300"></div>
                        </div>

                    </div>
                </Link>

                <div className="w-full flex flex-col gap-6 items-center justify-center flex-1 border-t-2 border-dashed border-gray-400">

                    <div className={getBtnClass(rightSelect === "1", 'right')} onClick={() => handleSelect('right', "1")}>
                        <Briefcase className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform stroke-[2px]" />
                        <span className="text-[10px] font-bold tracking-wider font-mono">WORK</span>
                    </div>

                    <div className={getBtnClass(rightSelect === "2", 'right')} onClick={() => handleSelect('right', "2")}>
                        <Mail className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform stroke-[2px]" />
                        <span className="text-[10px] font-bold tracking-wider font-mono">MAIL</span>
                    </div>

                    <div className={getBtnClass(rightSelect === "3", 'right')} onClick={() => handleSelect('right', "3")}>
                        <BookOpen className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform stroke-[2px]" />
                        <span className="text-[10px] font-bold tracking-wider font-mono">GUEST</span>
                    </div>

                </div>

            </div>
        </>
    );
}