import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Calendar, Clock, ArrowUpRight, Hash, Feather, Loader2 } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import gsap from "gsap";

export default function Blog() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    const mediumBlogs = [
        {
            title: "Memahami Percabangan pada Bahasa Pemrograman Java",
            date: "Aug 19, 2025",
            read: "4 min read",
            link: "https://medium.com/@radyaiftikhar/memahami-percabangan-pada-bahasa-pemrograman-java-3c44926c67f7",
            type: "medium",
            tags: ["JAVA"]
        },
        {
            title: "Mengenal Variabel dan Tipe Data pada Bahasa Pemrograman Java",
            date: "Aug 17, 2025",
            read: "5 min read",
            link: "https://medium.com/@radyaiftikhar/mengenal-variabel-dan-tipe-data-pada-bahasa-pemrograman-java-23a82d232e12",
            type: "medium",
            tags: ["JAVA"]
        },
        {
            title: "20 Ide Project Menggunakan React: Mulai dari Pemula Sampai Advance",
            date: "Aug 31, 2024",
            read: "4 min read",
            link: "https://medium.com/@radyaiftikhar/20-ide-project-menggunakan-react-mulai-dari-pemula-sampai-advance-0bde3f6392bc",
            type: "medium",
            tags: ["REACT"]
        },
        {
            title: "Node.js: Framework JavaScript atau Runtime JavaScript?",
            date: "Aug 29, 2024",
            read: "3 min read",
            link: "https://medium.com/@radyaiftikhar/node-js-framework-javascript-atau-runtime-javascript-e511828d8e7d",
            type: "medium",
            tags: ["NODE.JS"]
        },
        {
            title: "Cara Menghitung Selisih Tanggal Menggunakan JavaScript",
            date: "Aug 29, 2024",
            read: "3 min read",
            link: "https://medium.com/@radyaiftikhar/cara-menghitung-selisih-tanggal-menggunakan-javascript-e9355c444ed9",
            type: "medium",
            tags: ["JAVASCRIPT"]
        },
        {
            title: "Apa Itu Pointer dalam Bahasa C?",
            date: "Oct 5, 2024",
            read: "2 min read",
            link: "https://medium.com/@radyaiftikhar/apa-itu-pointers-dalam-bahasa-c-0519f8895b90",
            type: "medium",
            tags: ["C LANG"]
        },
        {
            title: "Apa Itu Fungsi dalam Bahasa C?",
            date: "Oct 5, 2024",
            read: "3 min read",
            link: "https://medium.com/@radyaiftikhar/apa-itu-fungsi-dalam-bahasa-c-42368d611ef3",
            type: "medium",
            tags: ["C LANG"]
        }
    ];

    const [blogs, setBlogs] = useState(mediumBlogs);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                if (!db) {
                    console.log("Firebase DB not initialized yet");
                    setLoading(false);
                    return;
                }

                const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);

                const firebaseArticles = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title,
                        slug: data.slug,
                        date: data.createdAt ? format(new Date(data.createdAt.seconds * 1000), "MMM d, yyyy") : "New",
                        read: "5 min read",
                        link: `/blog/${data.slug}`,
                        type: "internal",
                        tags: data.tags || ["Article"]
                    };
                });

                setBlogs([...firebaseArticles, ...mediumBlogs]);
            } catch (error) {
                console.error("Gagal ambil blog:", error);
                setBlogs(mediumBlogs);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    useLayoutEffect(() => {
        if (!loading && containerRef.current) {
            let ctx = gsap.context(() => {
                gsap.from(".blog-card", {
                    y: 50,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    clearProps: "all"
                });
            }, containerRef);
            return () => ctx.revert();
        }
    }, [loading]);

    const getTheme = (tag) => {
        if (!tag) return { color: 'text-gray-900', bg: 'bg-gray-200', tape: '#9ca3af' };
        const t = tag.toUpperCase();
        if (t.includes('REACT')) return { color: 'text-blue-900', bg: 'bg-blue-100', tape: '#60a5fa' };
        if (t.includes('JAVA') || t.includes('SCRIPT')) return { color: 'text-yellow-900', bg: 'bg-yellow-100', tape: '#facc15' };
        if (t.includes('C LANG')) return { color: 'text-gray-900', bg: 'bg-gray-200', tape: '#9ca3af' };
        return { color: 'text-purple-900', bg: 'bg-purple-100', tape: '#a855f7' };
    };

    return (
        <div ref={containerRef} className="h-full w-full bg-white text-neutral-900 flex flex-col">
            
            <div className="px-2 md:px-4 pt-4 pb-2 border-b-2 border-black bg-white/95 backdrop-blur-sm z-30 shrink-0 flex items-center gap-3">
                <span className="font-mono text-sm font-bold bg-black text-white px-2 py-0.5 rounded-sm">03 //</span>
                <h3 className="text-2xl font-black text-black uppercase tracking-tighter">Archive Logs.</h3>
            </div>

            <div className="flex-1 overflow-y-auto px-2 md:px-4 pb-10 pt-4 custom-scrollbar">
                
                <style>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; border: 1px solid #000; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
                    
                    /* Untuk Firefox */
                    .custom-scrollbar {
                        scrollbar-width: thin;
                        scrollbar-color: #d1d5db transparent;
                    }
                `}</style>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-black w-8 h-8" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {blogs.map((item, idx) => {
                            const tag = item.tags[0] || "General";
                            const theme = getTheme(tag);
                            const isInternal = item.type === "internal";
                            const Component = isInternal ? Link : 'a';
                            const linkProps = isInternal
                                ? { href: item.link }
                                : { href: item.link, target: "_blank", rel: "noopener noreferrer" };

                            return (
                                <Component
                                    key={idx}
                                    {...linkProps}
                                    className="blog-card group relative block p-5 rounded-lg bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all duration-200 cursor-pointer"
                                >
                                    <div 
                                        className="absolute -top-2.5 -left-2 w-16 h-4 rotate-[-10deg] shadow-sm opacity-90 z-10 border-l border-r border-white/40"
                                        style={{ backgroundColor: theme.tape }}
                                    ></div>

                                    <div className="flex justify-between items-start mb-3 relative z-10">
                                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border border-black ${theme.bg} ${theme.color}`}>
                                            <Hash className="w-3 h-3" /> {tag}
                                        </div>
                                        {isInternal ? (
                                            <div className="bg-black text-white p-1 rounded-full shadow-sm" title="Original Article">
                                                <Feather className="w-3 h-3" />
                                            </div>
                                        ) : (
                                            <ArrowUpRight className="w-4 h-4 text-black group-hover:scale-125 transition-transform" />
                                        )}
                                    </div>

                                    <h3 className="text-lg font-black text-black mb-3 leading-snug group-hover:underline decoration-2 underline-offset-2 transition-all">
                                        {item.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-xs font-mono font-bold text-gray-500 border-t-2 border-dashed border-gray-300 pt-3 group-hover:border-black transition-colors">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" /> <span>{item.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3" /> <span>{item.read}</span>
                                        </div>
                                    </div>
                                </Component>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}