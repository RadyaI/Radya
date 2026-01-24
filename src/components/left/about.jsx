import foto from "@/assets/foto2.jpg";
import { Code2, GraduationCap, Heart, Cat, Car } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import FunText from "@/utils/FunText";

const linkCat = "https://www.google.com/search?q=cat";

export default function About() {
    const containerRef = useRef(null);

    const education = [
        {
            year: "2024 - Present",
            school: "Universitas Muhammadiyah Malang",
            role: "Informatics Student",
            desc: "Focusing on Data & Backend Engineering."
        },
        {
            year: "2021 - 2024",
            school: "SMK Telkom Malang",
            role: "Software Engineering",
            desc: "Foundation in Web Development."
        }
    ];

    const techStack = [
        "JavaScript", "TypeScript", "React",
        "Next.js", "Firebase", "Supabase", "SQL",
        "NoSQL", "Python"
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".about-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="h-full relative overflow-hidden bg-white text-neutral-900">

            <style>{`
                .scroll-left-container {
                    direction: rtl;       /* Scrollbar di kiri */
                    overflow-y: auto;
                    height: 100%;
                    padding-left: 12px;
                    padding-right: 4px;
                }
                
                .content-fix {
                    direction: ltr;       /* Teks tetap kiri-ke-kanan */
                }

                .scroll-left-container::-webkit-scrollbar { width: 6px; }
                .scroll-left-container::-webkit-scrollbar-track { background: transparent; }
                .scroll-left-container::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; border: 1px solid #000; }
                .scroll-left-container::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
            `}</style>

            <div className="scroll-left-container">

                <div className="content-fix px-2 md:px-4 pb-10 font-serif">

                    <div className="about-item mb-8 pt-4 flex items-center gap-3 border-b-2 border-black pb-2 sticky top-0 bg-white/95 backdrop-blur-sm z-20">
                        <span className="font-mono text-sm font-bold bg-black text-white px-2 py-0.5 rounded-sm">02 //</span>
                        <h3 className="text-2xl font-black text-black uppercase tracking-tighter">
                            <FunText hoverColor="#a855f7">About Me.</FunText>
                        </h3>
                    </div>

                    <div className="about-item flex flex-col md:flex-row items-center gap-6 mb-10">
                        <div className="relative shrink-0 group">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-pink-200/80 rotate-2 z-20 shadow-sm border-l border-r border-white/40"></div>

                            <div className="relative w-28 h-28 md:w-32 md:h-32 bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] transition-transform group-hover:rotate-0">
                                <div className="relative w-full h-full overflow-hidden border border-gray-200">
                                    <Image
                                        src={foto}
                                        alt="Radya"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover grayscale group-hover:grayscale-0 transition duration-500"
                                    />
                                </div>
                            </div>

                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center z-20">
                                <div className="w-3 h-3 bg-green-500 rounded-full border border-black animate-pulse"></div>
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h4 className="text-xl font-black text-black mb-1">
                                <FunText hoverColor="#3b82f6">Muhammad Radya <br /> Iftikhar</FunText>
                            </h4>
                            <p className="text-sm text-gray-600 font-mono mb-3 bg-gray-100 px-2 py-0.5 w-fit mx-auto md:mx-0 border border-gray-300 rounded">@radyaif</p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                <span className="px-3 py-1 text-[10px] uppercase font-bold bg-blue-100 text-blue-800 border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    Developer
                                </span>
                                <span className="px-3 py-1 text-[10px] uppercase font-bold bg-purple-100 text-purple-800 border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    Student
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="about-item space-y-4 text-sm leading-relaxed text-gray-800 mb-10 text-justify font-sans">
                        <p>
                            Hi, you can call me <b className="bg-yellow-200 px-1 border border-black rounded-sm inline-block"><FunText>Radya</FunText></b>.
                            I'm a second-year Informatics student with a growing passion for coding, especially in
                            <span className="font-bold underline decoration-2 decoration-blue-500 mx-1 inline-block"><FunText hoverColor="#3b82f6">DATA</FunText></span>
                            and
                            <span className="font-bold underline decoration-2 decoration-purple-500 mx-1 inline-block"><FunText hoverColor="#a855f7">Backend</FunText></span>.
                        </p>
                        <p>
                            Lately, I've been focusing on building <span className="font-bold border-b-2 border-black border-dashed pb-0.5">personal web projects</span> that simplify my daily life. While I'm still exploring different aspects of the tech world, I'm excited about continuing to learn and improve.
                        </p>

                        <div className="flex items-center gap-3 p-3 bg-red-50 border-2 border-red-200 rounded-lg mt-4 border-dashed">
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            <span className="text-xs flex gap-1 font-bold text-red-900">
                                Hobbies: <a target="_blank" href={linkCat} className="flex gap-1 border-b border-red-400 hover:text-red-600">Cats <Cat className="w-4 h-4" /></a> & <a className="flex gap-1 border-b border-red-400 hover:text-red-600" target="blank_" href="https://www.google.com/search?q=bmw">BMW <Car className="w-4 h-4" /></a>.
                            </span>
                        </div>
                    </div>

                    <div className="about-item mb-10">
                        <div className="flex items-center gap-2 mb-4 border-b-2 border-black w-fit pr-4 pb-1">
                            <Code2 className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-widest">Tech Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((tech) => (
                                <div key={tech} className="px-3 py-1.5 bg-white border border-black rounded text-xs font-bold font-mono text-black shadow-[2px_2px_0px_0px_#ccc] hover:shadow-[2px_2px_0px_0px_#000] hover:-translate-y-0.5 transition-all cursor-default">
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="about-item">
                        <div className="flex items-center gap-2 mb-6 border-b-2 border-black w-fit pr-4 pb-1">
                            <GraduationCap className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-widest">Education Log</span>
                        </div>

                        <div className="relative border-l-2 border-dashed border-gray-400 ml-3 space-y-8">
                            {education.map((edu, idx) => (
                                <div key={idx} className="relative pl-8 group">
                                    <div className="absolute -left-[7px] top-1.5 w-3 h-3 bg-white border-2 border-black rounded-full group-hover:bg-purple-500 transition duration-300"></div>

                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-bold font-mono text-black bg-gray-200 w-fit px-2 py-0.5 rounded border border-gray-400">
                                            {edu.year}
                                        </span>
                                        <h4 className="text-base font-black text-black group-hover:underline decoration-2 underline-offset-2 transition">
                                            {edu.school}
                                        </h4>
                                        <p className="text-xs font-bold text-gray-700 bg-purple-50 w-fit px-1">
                                            {edu.role}
                                        </p>
                                        <p className="text-[11px] text-gray-600 mt-1 italic">
                                            "{edu.desc}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}