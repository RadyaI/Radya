import { useState } from "react";
import { Github, Globe, Box, Layers, Code2 } from "lucide-react";
import 'animate.css';

export default function Project() {

    const [projectData] = useState([
        {
            no: 1,
            title: "Portfolio Web",
            desc: "Yes, this is the website you are currently viewing.",
            tech: "React",
            color: "#61DAFB",
            live_link: "https://radya.vercel.app",
            repo_link: "https://github.com/RadyaI/portfolio-web",
            tag: ["React", "Firebase", "Tailwind"],
        },
        {
            no: 2,
            title: "whoschat",
            desc: "An anonymous chatroom you can create, share, and delete anytime.",
            tech: "Nextjs",
            color: "#0070F3",
            live_link: "https://whoschat.vercel.app/",
            repo_link: "https://github.com/RadyaI/whoschat",
            tag: ["Nextjs", "Firebase", "anonim-chat"],
        },
        {
            no: 3,
            title: "Student API",
            desc: "REST API providing CRUD operations for student entity. Built for learning purposes.",
            tech: "Javascript",
            color: "#F7DF1E",
            live_link: "https://radya-api.vercel.app/student",
            repo_link: "https://github.com/RadyaI/student-api-fastify",
            tag: ["Fastify", "api"],
        },
        {
            no: 4,
            title: "Send Email API",
            desc: "API service to send emails efficiently using MailerSend.",
            tech: "Typescript",
            color: "#3178C6",
            live_link: "https://send4email.vercel.app/",
            repo_link: "https://github.com/RadyaI/send-email",
            tag: ["Fastify", "Typescript", "api"],
        },
        {
            no: 5,
            title: "CryptoJS Demo",
            desc: "Encryption & Decryption playground/demo using CryptoJS library.",
            tech: "Javascript",
            color: "#F7DF1E",
            live_link: "https://demo-enkripsi.radya.fun",
            repo_link: "https://github.com/RadyaI/encryption-decryption",
            tag: ["Vue", "Crypto-Js", "JS"],
        },
        {
            no: 6,
            title: "Cara Bertanya",
            desc: "Don't ask to ask! A guide on how to ask programming questions properly.",
            tech: "React",
            color: "#61DAFB",
            live_link: "https://kodingankuerror.vercel.app/",
            repo_link: "https://github.com/RadyaI/cara-bertanya",
            tag: ["Javascript", "Tailwind", "Guide"],
        },
        {
            no: 7,
            title: "Online Polling",
            desc: "Real-time polling app. Create polls, invite friends, vote instantly.",
            tech: "React",
            color: "#61DAFB",
            live_link: "https://onlinepoll.vercel.app/",
            repo_link: "https://github.com/RadyaI/polling",
            tag: ["React", "Firebase"],
        },
        {
            no: 8,
            title: "Uareshort",
            desc: "Efficient URL shortener with analytics tracking. Built with Prisma & MySQL.",
            tech: "Typescript",
            color: "#3b82f6",
            live_link: "https://usrt.vercel.app/",
            repo_link: "https://github.com/RadyaI/uareshort",
            tag: ["Express", "TS", "MySQL"],
        },
        {
            no: 9,
            title: "YourList API",
            desc: "TodoList API with auth & task categorization.",
            tech: "Typescript",
            color: "#3b82f6",
            live_link: "-",
            repo_link: "https://github.com/RadyaI/yourlist-api",
            tag: ["Express", "TS", "MySQL"],
        },
        {
            no: 10,
            title: "User Analytics API",
            desc: "API for managing user data and tracking engagement activities.",
            tech: "Typescript",
            color: "#3b82f6",
            live_link: "-",
            repo_link: "https://github.com/RadyaI/user-analytics-api",
            tag: ["Express", "TS", "MySQL"],
        },
    ]);

    return (
        <div className="h-full relative overflow-hidden">
            
            <style>{`
                .scroll-container {
                    overflow-y: auto;
                    height: 100%;
                    padding-right: 8px; /* Jarak scrollbar kanan */
                }
                
                .scroll-container::-webkit-scrollbar { width: 4px; }
                .scroll-container::-webkit-scrollbar-track { background: transparent; }
                .scroll-container::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 10px; }
                .scroll-container::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }
            `}</style>

            <div className="scroll-container">
                <div className="px-2 md:px-4 pb-10 font-sans text-gray-300">
                    
                    <div className="mb-8 animate__animated animate__fadeInDown">
                        <div className="relative z-10 flex justify-end items-center gap-3">
                            <span className="text-purple-400 font-mono text-sm">// 04</span>
                            <h3 className="text-2xl font-bold text-white text-right">Selected Works.</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {projectData.map((item, idx) => (
                            <div 
                                key={idx}
                                className="group relative bg-[#111] border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate__animated animate__fadeInUp"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div 
                                    className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full shadow-[0_0_10px_currentColor] opacity-60 group-hover:opacity-100 transition duration-500"
                                    style={{ backgroundColor: item.color, color: item.color }}
                                ></div>

                                <div className="flex justify-between items-start mb-3 pl-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition">
                                        {item.title}
                                    </h3>
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400">
                                        {item.tech.includes('React') || item.tech.includes('Next') ? <Box className="w-4 h-4"/> : 
                                         item.tech.includes('Typescript') || item.tech.includes('Javascript') ? <Code2 className="w-4 h-4"/> : 
                                         <Layers className="w-4 h-4"/>}
                                    </div>
                                </div>

                                <p className="text-sm text-gray-400 leading-relaxed mb-6 pl-4 line-clamp-3">
                                    {item.desc}
                                </p>

                                <div className="flex flex-wrap gap-2 pl-4 mb-6">
                                    {item.tag.map((t, i) => (
                                        <span key={i} className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-gray-300 bg-white/5 border border-white/10 rounded-md">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3 pl-4 pt-4 border-t border-white/5">
                                    <a 
                                        href={item.repo_link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-[#1a1a1a] hover:bg-[#222] border border-white/10 rounded-lg text-gray-300 hover:text-white transition"
                                    >
                                        <Github className="w-3 h-3" />
                                        <span>Code</span>
                                    </a>

                                    {item.live_link !== "-" && (
                                        <a 
                                            href={item.live_link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg transition"
                                        >
                                            <Globe className="w-3 h-3" />
                                            <span>Live Demo</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}