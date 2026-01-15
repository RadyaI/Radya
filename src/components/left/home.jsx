import { Github, Linkedin, Instagram, Terminal, ArrowUpRight } from "lucide-react";
import 'animate.css';

export default function Home() {
    return (
        <div className="relative h-full flex flex-col justify-center px-2 md:px-4 font-sans select-none">
            
            <div className="animate__animated animate__fadeInDown">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm mb-6 hover:bg-white/10 transition cursor-default">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Online</span>
                </div>
            </div>

            <div className="mb-8 relative z-10">
                
                <p className="text-blue-400 font-mono text-sm mb-2 animate__animated animate__fadeInLeft">
                    &lt;😼 /&gt; I am
                </p>

                <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-4 animate__animated animate__fadeInUp animate__delay-1s mix-blend-overlay opacity-90">
                    RADYA <br /> IFTIKHAR.
                </h1>

                <div className="flex flex-col gap-1 animate__animated animate__fadeInUp animate__delay-2s">
                    <div className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-500">
                        <span className="relative italic opacity-60">
                            In This Economy?
                        </span>
                        <span className="hidden md:inline-block w-8 h-[1px] bg-gray-700"></span>
                    </div>
                    
                    <div className="text-2xl decoration-red-500/80 decoration-2 line-through md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white">
                        FULLSTACK DEV
                    </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-gray-500 font-mono text-sm border-l-2 border-gray-700 pl-4 animate__animated animate__fadeIn animate__delay-3s">
                    <Terminal className="w-4 h-4" />
                    <span>"Ngoding apa aja dah."</span>
                </div>
            </div>

            <div className="flex gap-4 animate__animated animate__fadeInUp animate__delay-4s">
                <SocialLink href="https://instagram.com/radyaif" icon={Instagram} label="IG" />
                <SocialLink href="https://www.linkedin.com/in/radyaa/" icon={Linkedin} label="IN" />
                <SocialLink href="https://github.com/RadyaI" icon={Github} label="GIT" />
            </div>

            <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none -z-10 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 flex gap-1 opacity-20">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

        </div>
    );
}

function SocialLink({ href, icon: Icon, label }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative w-14 h-14 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-110 hover:border-blue-500/50 hover:bg-white/10"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors relative z-10" />
            
            <ArrowUpRight className="absolute top-1 right-1 w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
    )
}