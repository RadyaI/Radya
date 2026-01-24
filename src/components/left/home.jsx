import { Github, Linkedin, Instagram, Terminal, ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
    const comp = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".paper-item", {
                y: 50,
                opacity: 0,
                rotation: () => Math.random() * 6 - 3, 
                duration: 1,
                ease: "back.out(1.4)",
                stagger: 0.1,
            });

            gsap.to(".badge-pulse", {
                scale: 1.2,
                repeat: -1,
                yoyo: true,
                duration: 0.8,
                ease: "power1.inOut"
            });
        }, comp);

        return () => ctx.revert();
    }, []);

    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1.05, rotation: 2, x: 2, y: -2, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)", duration: 0.2 });
    };
    
    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1, rotation: 0, x: 0, y: 0, boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)", duration: 0.2 });
    };

    return (
        <div ref={comp} className="bg-yellow-50 relative w-full h-full flex flex-col justify-center px-2 md:px-4 font-sans select-none overflow-x-hidden overflow-y-auto no-scrollbar">
            
            <div className="absolute inset-0 opacity-5 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="paper-item mb-6 w-fit">
                <div className="relative group cursor-default">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-yellow-200/80 rotate-2 z-10 opacity-80 backdrop-blur-[1px]"></div>
                    
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] transition-transform group-hover:rotate-0">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="badge-pulse absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-black"></span>
                        </span>
                        <span className="text-[10px] font-black font-mono uppercase tracking-widest text-black">Online</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 w-full">
                
                <p className="paper-item text-blue-700 font-mono text-xs md:text-sm mb-3 font-bold bg-blue-100 w-fit px-2 border border-blue-300 -rotate-1">
                    &lt;😼 /&gt; Hello, I am
                </p>

                <h1 className="paper-item text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter mb-4 text-neutral-900 break-words mix-blend-multiply">
                    RADYA <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-900" style={{ WebkitTextStroke: '1.5px black' }}>
                        IFTIKHAR.
                    </span>
                </h1>

                <div className="paper-item flex flex-col gap-2 mb-8">
                    <div className="flex items-center gap-2 text-base font-bold text-neutral-500">
                        <span className="italic font-serif">"In This Economy?"</span>
                        <span className="w-8 h-[2px] bg-black"></span>
                    </div>
                    
                    <div className="relative w-fit max-w-full">
                        <div className="absolute inset-0 bg-yellow-300 -rotate-1 skew-x-3 h-full w-full -z-10 border-2 border-black translate-y-1 rounded-sm"></div>
                        <div className="text-xl md:text-3xl font-black text-black px-2 decoration-wavy decoration-red-500 line-through decoration-2 break-words">
                            FULLSTACK DEV
                        </div>
                    </div>
                </div>

                <div className="paper-item inline-flex items-center gap-2 bg-white border-2 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-1 max-w-full">
                    <Terminal className="w-4 h-4 text-black flex-shrink-0" />
                    <span className="font-mono text-xs md:text-sm font-bold text-neutral-700 truncate">"Ngoding apa aja dah."</span>
                </div>
            </div>

            <div className="paper-item flex flex-wrap gap-3 mt-8 pb-4">
                <SocialLink href="https://instagram.com/radyaif" icon={Instagram} label="IG" onEnter={onEnter} onLeave={onLeave} color="bg-pink-100" />
                <SocialLink href="https://www.linkedin.com/in/radyaa/" icon={Linkedin} label="IN" onEnter={onEnter} onLeave={onLeave} color="bg-blue-100" />
                <SocialLink href="https://github.com/RadyaI" icon={Github} label="GIT" onEnter={onEnter} onLeave={onLeave} color="bg-gray-100" />
            </div>

        </div>
    );
}

function SocialLink({ href, icon: Icon, onEnter, onLeave, color = "bg-white" }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className={`relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center ${color} border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors`}
        >
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-black stroke-[2.5px]" />
            <ArrowUpRight className="absolute top-0.5 right-0.5 w-3 h-3 text-black opacity-60" />
        </a>
    )
}