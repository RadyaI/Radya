import { useState, useRef, useLayoutEffect } from "react";
import { Github, Globe, Box, Layers, Code2, FolderOpen } from "lucide-react";
import gsap from "gsap";

export default function Project() {
    const containerRef = useRef(null);

    const [projectData] = useState([
        {
            no: 1,
            title: "Portfolio Web",
            desc: "Yes, this is the website you are currently viewing.",
            tech: "React",
            color: "#61DAFB",
            live_link: "https://radya.my.id",
            repo_link: "https://github.com/RadyaI/portfolio-web",
            tag: ["React", "Firebase", "Tailwind"],
        },
        {
            title: "My Learning Plan",
            desc: "Personalized learning management system to organize your studies, track progress, and achieve your goals.",
            tech: "Nextjs",
            color: "#00f310",
            live_link: "/learning",
            repo_link: "https://github.com/RadyaI/Radya/tree/master/src/app/isthismap",
            tag: ["Nextjs", "Firebase", "Tailwind", "Learning"],
        },
        {
            title: "Is This Map",
            desc: "An absurd geography experiment. Checking distances to random middle-of-nowhere places or getting lost in random coordinates.",
            tech: "Nextjs",
            color: "#bf9e31",
            live_link: "/isthismap",
            repo_link: "https://github.com/RadyaI/Radya/tree/master/src/app/learning",
            tag: ["Nextjs", "leaflet", "Tailwind", "Maps", "Earth"],

        },
        {
            no: 2,
            title: "whoschat",
            desc: "An anonymous chatroom you can create, share, and delete anytime.",
            tech: "Nextjs",
            color: "#f3007a",
            live_link: "https://whoschat.vercel.app/",
            repo_link: "https://github.com/RadyaI/whoschat",
            tag: ["Nextjs", "Firebase", "anonim-chat"],
        },
        {
            no: 3,
            title: "SignPdf",
            desc: "online pdf signature, client side 100% secure, not stored.",
            tech: "Nextjs",
            color: "#0070F3",
            live_link: "/tools/signpdf",
            repo_link: "-",
            tag: ["pdf-lib-plus-encrypt", "react-signature-canvas", "Nextjs"]
        },
        {
            no: 4,
            title: "Speed Typer",
            desc: "Finger speed test. Stop-on-error mode & dynamic word bank (ID/EN).",
            tech: "Nextjs",
            color: "#a0991e",
            live_link: "/tools/speedtyper",
            repo_link: "-",
            tag: ["Typing Test", "Word per Minute", "Nextjs"]
        },
        {
            no: 5,
            title: "Send Email API",
            desc: "API service to send emails efficiently using MailerSend.",
            tech: "Typescript",
            color: "#3178C6",
            live_link: "https://send4email.vercel.app/",
            repo_link: "https://github.com/RadyaI/send-email",
            tag: ["Fastify", "Typescript", "api"],
        },
        {
            no: 6,
            title: "CryptoLab",
            desc: "Encryption & Decryption playground/demo.",
            tech: "Javascript",
            color: "#F7DF1E",
            live_link: "/tools/cryptolab",
            repo_link: "https://github.com/RadyaI/encryption-decryption",
            tag: ["Base64", "URL Encoder", "JWT Debugger", "Hashing", "Classic Cipher"],
        },
        {
            no: 7,
            title: "Cara Bertanya",
            desc: "Don't ask to ask! A guide on how to ask programming questions properly.",
            tech: "React",
            color: "#61DAFB",
            live_link: "https://kodingankuerror.vercel.app/",
            repo_link: "https://github.com/RadyaI/cara-bertanya",
            tag: ["Javascript", "Tailwind", "Guide"],
        },
        {
            no: 8,
            title: "Online Polling",
            desc: "Real-time polling app. Create polls, invite friends, vote instantly.",
            tech: "React",
            color: "#61DAFB",
            live_link: "https://onlinepoll.vercel.app/",
            repo_link: "https://github.com/RadyaI/polling",
            tag: ["React", "Firebase"],
        },
        {
            no: 9,
            title: "Uareshort",
            desc: "Efficient URL shortener with analytics tracking. Built with Prisma & MySQL.",
            tech: "Typescript",
            color: "#3b82f6",
            live_link: "https://usrt.vercel.app/",
            repo_link: "https://github.com/RadyaI/uareshort",
            tag: ["Express", "TS", "MySQL"],
        },
        {
            no: 10,
            title: "YourList API",
            desc: "TodoList API with auth & task categorization.",
            tech: "Typescript",
            color: "#3b82f6",
            live_link: "-",
            repo_link: "https://github.com/RadyaI/yourlist-api",
            tag: ["Express", "TS", "MySQL"],
        },
    ]);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".project-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1, translateY: 3, translateX: 1, boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.8)", duration: 0.2 });
    };

    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, { scale: 1, translateY: 0, translateX: 0, rotation: 0, boxShadow: "8px 8px 0px 0px rgba(0,0,0,8)", duration: 0.2 });
    };

    return (
        <div ref={containerRef} className="h-full relative overflow-hidden bg-white text-neutral-900">

            <style>{`
                .scroll-container {
                    overflow-y: auto;
                    height: 100%;
                    padding-right: 8px;
                    padding-left: 2px;
                    padding-bottom: 20px;
                }
                .scroll-container::-webkit-scrollbar { width: 6px; }
                .scroll-container::-webkit-scrollbar-track { background: transparent; }
                .scroll-container::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; border: 1px solid #000; }
                .scroll-container::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
            `}</style>

            <div className="scroll-container px-2 md:px-4 pb-10">

                <div className="mb-8 pt-4 flex justify-between items-end border-b-2 border-black pb-2 sticky top-0 bg-white/90 backdrop-blur-sm z-20">
                    <div className="flex items-center gap-2">
                        <FolderOpen className="w-6 h-6 text-black" strokeWidth={2.5} />
                        <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Selected Works</h3>
                    </div>
                    <span className="font-mono text-sm font-bold bg-black text-white px-2 py-0.5 rounded-sm">// 04</span>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {projectData.map((item, idx) => (
                        <div
                            key={idx}
                            className="project-card group relative bg-white border-2 border-black rounded-lg p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            onMouseEnter={onEnter}
                            onMouseLeave={onLeave}
                        >
                            <div
                                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rotate-1 opacity-90 shadow-sm z-10 border-l border-r border-white/30 backdrop-blur-[1px]"
                                style={{ backgroundColor: item.color }}
                            ></div>

                            <div className="flex justify-between items-start mb-3 mt-2">
                                <h3 className="text-xl font-black text-black group-hover:underline decoration-2 underline-offset-2">
                                    {item.title}
                                </h3>

                                <div className="p-1.5 rounded bg-gray-100 border border-black text-black">
                                    {item.tech.includes('React') || item.tech.includes('Next') ? <Box className="w-4 h-4" strokeWidth={2.5} /> :
                                        item.tech.includes('Typescript') || item.tech.includes('Javascript') ? <Code2 className="w-4 h-4" strokeWidth={2.5} /> :
                                            <Layers className="w-4 h-4" strokeWidth={2.5} />}
                                </div>
                            </div>

                            <p className="text-sm font-serif text-gray-700 leading-relaxed mb-6 line-clamp-3">
                                {item.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {item.tag.map((t, i) => (
                                    <span key={i} className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-black bg-gray-100 border border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-4 border-t-2 border-dashed border-gray-300">
                                {item.repo_link !== "-" && (
                                    <a
                                        href={item.repo_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold bg-white hover:bg-black hover:text-white border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                                    >
                                        <Github className="w-3 h-3" strokeWidth={3} />
                                        <span>Code</span>
                                    </a>
                                )}

                                {item.live_link !== "-" && (
                                    <a
                                        href={item.live_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold bg-yellow-200 hover:bg-yellow-300 border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-black transition-all"
                                    >
                                        <Globe className="w-3 h-3" strokeWidth={3} />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}