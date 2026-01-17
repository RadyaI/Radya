import foto from "@/assets/foto2.jpg";
import { Code2, GraduationCap, Heart, Cat, Car } from "lucide-react";
import 'animate.css';
import Image from "next/image";

const linkCat = "https://www.google.com/search?sca_esv=3752bc17590d0ff6&sxsrf=ANbL-n7AxoCLJwQnlcdo9ofc53hBy4vnRQ:1768665117614&udm=2&fbs=ADc_l-ZfIPzv45NHkpmEx1uvAy1Y0jSl1hx3Xkmo2lpunDqItvmOdSOit7muIXZsXvpLBdHparcpJwBJPZvwUJitlUSAbiBz4yxtwJoaKDXX2EwzhCrqLz9MmXxhasEAw1gLUfB7AOeO_QAzl7XjjVYp04Y0XMMHPxLtQL079J3Z9MGKcPR9IIpxWL021vypQVdohqtsDokBRDRROkXq3Rum2GUHsPh31w&q=cat&sa=X&ved=2ahUKEwiJoL-A95KSAxXp1TgGHacvAjUQtKgLegQIKRAB&biw=1280&bih=598&dpr=1.5&aic=0"

export default function About() {

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

    return (
        <div className="h-full relative overflow-hidden">

            <style>{`
                .scroll-left-container {
                    direction: rtl;       /* Kunci: Pindah scrollbar ke kiri */
                    overflow-y: auto;     /* Aktifin scroll */
                    height: 100%;
                    padding-left: 8px;    /* Jarak antara scrollbar & konten */
                }
                
                .content-fix {
                    direction: ltr;       /* Balikin teks jadi normal (Kiri ke Kanan) */
                }

                /* Styling Scrollbar Tipis */
                .scroll-left-container::-webkit-scrollbar {
                    width: 4px;
                }
                .scroll-left-container::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scroll-left-container::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 10px;
                }
                .scroll-left-container::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.4);
                }
            `}</style>

            <div className="scroll-left-container">

                <div className="content-fix px-2 md:px-4 pb-10 font-sans text-gray-300">

                    <div className="mb-8 animate__animated animate__fadeInDown">
                        <div className="relative z-10 flex items-center gap-3">
                            <span className="text-purple-400 font-mono text-sm">02 //</span>
                            <h3 className="text-2xl font-bold text-white">About Me.</h3>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6 mb-10 animate__animated animate__fadeInUp">
                        <div className="relative shrink-0 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-500"></div>
                            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-white/10 overflow-hidden bg-black p-1">
                                <Image
                                    src={foto}
                                    alt="Radya"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover rounded-full grayscale group-hover:grayscale-0 transition duration-500"
                                />
                            </div>
                            <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#111] rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h4 className="text-xl font-bold text-white mb-1">Muhammad Radya Iftikhar</h4>
                            <p className="text-sm text-gray-500 font-mono mb-2">@radyaif</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                <span className="px-3 py-1 text-[10px] uppercase font-bold bg-blue-900/20 text-blue-400 rounded-full border border-blue-900/50">
                                    Developer
                                </span>
                                <span className="px-3 py-1 text-[10px] uppercase font-bold bg-purple-900/20 text-purple-400 rounded-full border border-purple-900/50">
                                    Student
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 text-sm leading-relaxed text-gray-400 mb-10 animate__animated animate__fadeInUp animate__delay-1s text-justify">
                        <p>
                            Hi, you can call me <b className="text-white">Radya</b>. I'm a second-year Informatics student with a growing passion for coding, especially in <span className="text-white font-bold">DATA</span> and <span className="text-white font-bold">Backend</span>. I enjoy diving into projects that allow me to build creative solutions using technology.
                        </p>
                        <p>
                            Lately, I've been focusing on building <span className="text-white border-b border-white/20 border-dashed pb-0.5">personal web projects</span> that simplify my daily life. While I'm still exploring different aspects of the tech world, I'm excited about continuing to learn and improve.
                        </p>

                        <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/5 mt-4">
                            <Heart className="w-4 h-4 text-pink-500" />
                            <span className="text-xs flex gap-1">
                                Hobbies: <a target="_blank" href={linkCat} className="flex gap-1 border-[gray] border-b border-dashed">Cats <Cat className="w-4 h-4"></Cat></a> & <a className="border-b border-dashed border-[grey] flex gap-1" target="blank_" href="https://www.google.com/search?q=bmw&oq=bmw&gs_lcrp=EgZjaHJvbWUqBwgAEAAYjwIyBwgAEAAYjwIyFQgBEC4YQxjHARixAxjRAxiABBiKBTIMCAIQIxgnGIAEGIoFMhEIAxBFGDsYQxixAxiABBiKBTIMCAQQIxgnGIAEGIoFMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEIMTcyOWowajmoAgawAgHxBVX2q0w5-D_w&sourceid=chrome&ie=UTF-8">BMW <Car className="w-4 h-4"></Car></a>.
                            </span>
                        </div>
                    </div>

                    <div className="mb-10 animate__animated animate__fadeInUp animate__delay-2s"> 
                        <div className="flex items-center gap-2 mb-4 text-gray-500 text-xs font-bold uppercase tracking-widest">
                            <Code2 className="w-4 h-4" /> Tech
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((tech) => (
                                <div key={tech} className="px-3 py-1.5 bg-[#151515] border border-[#222] rounded-md text-xs font-mono text-gray-300 hover:border-blue-500/50 hover:text-white transition cursor-default">
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="animate__animated animate__fadeInUp animate__delay-3s">
                        <div className="flex items-center gap-2 mb-6 text-gray-500 text-xs font-bold uppercase tracking-widest">
                            <GraduationCap className="w-4 h-4" /> Education Log
                        </div>

                        <div className="relative border-l border-white/10 ml-3 space-y-8">
                            {education.map((edu, idx) => (
                                <div key={idx} className="relative pl-8 group">
                                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 bg-[#222] border border-gray-600 rounded-full group-hover:bg-purple-500 group-hover:border-purple-400 transition duration-300"></div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-mono text-purple-400 bg-purple-900/10 w-fit px-2 py-0.5 rounded border border-purple-900/30">
                                            {edu.year}
                                        </span>
                                        <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                                            {edu.school}
                                        </h4>
                                        <p className="text-xs text-gray-400">
                                            {edu.role}
                                        </p>
                                        <p className="text-[11px] text-gray-600 mt-1">
                                            {edu.desc}
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