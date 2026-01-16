import { useState, useEffect } from "react";
import { BookOpen, Calendar, Clock, ArrowUpRight, Hash, Feather, Loader2 } from "lucide-react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import 'animate.css';
import { format } from "date-fns";
import Link from "next/link";

export default function Blog() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
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

    const getTheme = (tag) => {
        if (!tag) return { color: 'text-gray-400', border: 'border-gray-500/30', bg: 'bg-gray-500/10' };
        const t = tag.toUpperCase();
        if (t.includes('REACT')) return { color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' };
        if (t.includes('JAVA')) return { color: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/10' };
        if (t.includes('C LANG')) return { color: 'text-gray-400', border: 'border-gray-500/30', bg: 'bg-gray-500/10' };
        return { color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10' };
    };

    return (
        <div className="h-full relative overflow-hidden bg-[#0a0a0a]">
            <style>{`
                .scroll-left-container { direction: rtl; overflow-y: auto; height: 100%; padding-left: 8px; }
                .content-fix { direction: ltr; }
                .scroll-left-container::-webkit-scrollbar { width: 4px; }
                .scroll-left-container::-webkit-scrollbar-track { background: transparent; }
                .scroll-left-container::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 10px; }
            `}</style>

            <div className="scroll-left-container">
                <div className="content-fix px-2 md:px-4 pb-10 font-sans text-gray-300">

                    <div className="mb-8 animate__animated animate__fadeInDown flex justify-between items-end">
                        <div>
                            <div className="relative z-10 flex items-center gap-3">
                                <span className="text-purple-400 font-mono text-sm">03 //</span>
                                <h3 className="text-2xl font-bold text-white">Archive Logs.</h3>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-purple-500" /></div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
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
                                        className="group relative block p-5 rounded-2xl bg-[#111] border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer animate__animated animate__fadeInUp"
                                        style={{ animationDelay: `${idx * 50}ms` }}
                                    >
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-transparent via-transparent to-${theme.color.split('-')[1]}-900/10 pointer-events-none rounded-2xl`}></div>

                                        <div className="flex justify-between items-start mb-3">
                                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold tracking-widest ${theme.bg} ${theme.color} ${theme.border} border`}>
                                                <Hash className="w-3 h-3" /> {tag}
                                            </div>
                                            {isInternal ? (
                                                <div className="bg-purple-500/20 text-purple-400 p-1 rounded-full animate-pulse" title="Radya's Original">
                                                    <Feather className="w-3 h-3" />
                                                </div>
                                            ) : (
                                                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition" />
                                            )}
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-200 group-hover:text-white mb-2 leading-snug transition-colors">
                                            {item.title}
                                        </h3>

                                        <div className="flex items-center gap-4 text-xs font-mono text-gray-500 border-t border-white/5 pt-3">
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
        </div>
    );
}