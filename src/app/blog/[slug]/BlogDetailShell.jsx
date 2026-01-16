"use client"

import { useEffect, useState, useRef } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { ArrowLeft, Calendar, User, Moon, Sun, Edit, Trash2, Share2, Hash, Clock } from "lucide-react";
import { format } from "date-fns";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import 'animate.css';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { useRouter } from "next/navigation";

export default function BlogDetail({ post, children }) {
    const router = useRouter();
    const [isDark, setIsDark] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user?.email === "radyaiftikhar@gmail.com") setIsAdmin(true);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (contentRef.current) {
                const codeBlocks = contentRef.current.querySelectorAll('pre code');

                codeBlocks.forEach((block) => {
                    hljs.highlightElement(block);

                    const pre = block.parentElement;
                    if (pre.querySelector('.copy-btn')) return;

                    const button = document.createElement('button');
                    button.className = 'copy-btn absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 backdrop-blur-md border border-white/10';
                    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

                    button.addEventListener('click', async () => {
                        const code = block.innerText;
                        await navigator.clipboard.writeText(code);
                        toast.success("Code copied! 📋", { style: { background: '#333', color: '#fff' } });

                        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
                        setTimeout(() => {
                            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
                        }, 2000);
                    });

                    pre.classList.add('group', 'relative');
                    pre.appendChild(button);
                });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [post?.content]);

    const handleScroll = () => {
        if (contentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
            const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setScrollProgress(scrolled);
        }
    };

    const handleDelete = () => {
        Swal.fire({
            title: 'Delete Protocol Initiated',
            text: "Are you sure to purge this data?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: 'Yes, Purge!',
            background: isDark ? '#111' : '#fff',
            color: isDark ? '#fff' : '#000'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(doc(db, "articles", post.id));
                Swal.fire('Purged!', 'Data has been deleted.', 'success');
                router.push("/");
            }
        })
    };

    if (!post) return null;

    return (
        <div className={`h-screen w-full fixed inset-0 z-50 overflow-hidden font-sans flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#050505] text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
            <Toaster />

            <style>{`
                * { cursor: default; }
                
                .bg-grid {
                    background-size: 40px 40px;
                    background-image: ${isDark
                    ? 'linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)'
                    : 'linear-gradient(to right, #00000005 1px, transparent 1px), linear-gradient(to bottom, #00000005 1px, transparent 1px)'};
                }

                .custom-scroll::-webkit-scrollbar { width: 6px; }
                .custom-scroll::-webkit-scrollbar-track { background: transparent; }
                .custom-scroll::-webkit-scrollbar-thumb { background: ${isDark ? '#333' : '#ccc'}; border-radius: 10px; }
                .custom-scroll::-webkit-scrollbar-thumb:hover { background: ${isDark ? '#555' : '#999'}; }

                /* STYLE MARKDOWN */
                .article-content h1 { font-size: 2.25rem; font-weight: 800; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.2; letter-spacing: -0.02em; color: ${isDark ? '#fff' : '#111'}; }
                .article-content h2 { font-size: 1.75rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; letter-spacing: -0.01em; color: ${isDark ? '#e5e7eb' : '#1f2937'}; border-bottom: 1px solid ${isDark ? '#333' : '#e5e7eb'}; padding-bottom: 0.5rem; }
                .article-content h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: ${isDark ? '#d1d5db' : '#374151'}; }
                .article-content p { margin-bottom: 1.5rem; line-height: 1.8; font-size: 1.1rem; opacity: 0.9; }
                .article-content strong { font-weight: 700; color: ${isDark ? '#fff' : '#000'}; }
                .article-content em { font-style: italic; opacity: 0.8; }
                .article-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
                .article-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
                .article-content blockquote { border-left: 4px solid #3b82f6; padding-left: 1.5rem; font-style: italic; background: ${isDark ? '#1a1a1a' : '#f3f4f6'}; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem; color: ${isDark ? '#9ca3af' : '#4b5563'}; }
                
                .article-content pre { 
                    background: #1e1e1e !important; 
                    color: #abb2bf;
                    padding: 1.5rem; 
                    border-radius: 12px; 
                    overflow-x: auto; 
                    margin: 1.5rem 0; 
                    border: 1px solid ${isDark ? '#333' : '#ddd'};
                    position: relative; 
                }
                
                .article-content code { 
                    font-family: 'Consolas', 'Monaco', monospace; 
                    font-size: 0.9em; 
                }

                .article-content :not(pre) > code {
                    background: ${isDark ? '#334155' : '#e2e8f0'};
                    color: ${isDark ? '#e2e8f0' : '#0f172a'};
                    padding: 0.2rem 0.4rem;
                    border-radius: 4px;
                    font-weight: 600;
                }

                .copy-btn { cursor: pointer; }
                .article-content img { border-radius: 12px; width: 100%; border: 1px solid ${isDark ? '#333' : '#ddd'}; margin: 1rem 0; }
                .article-content a { color: #3b82f6; text-decoration: none; border-bottom: 1px solid transparent; transition: all 0.2s; }
                .article-content a:hover { border-bottom-color: #3b82f6; }
                
                /* Table Style */
                .article-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
                .article-content th, .article-content td { border: 1px solid ${isDark ? '#333' : '#ddd'}; padding: 0.75rem; text-align: left; }
                .article-content th { background: ${isDark ? '#1a1a1a' : '#f3f4f6'}; font-weight: 700; }
            `}</style>

            <div className="w-full h-1 bg-transparent fixed top-0 left-0 z-[60]">
                <div className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="flex h-full w-full bg-grid">

                <div className={`hidden lg:flex w-24 xl:w-64 flex-col justify-between p-6 border-r ${isDark ? 'border-white/5 bg-[#050505]/80' : 'border-black/5 bg-white/80'} backdrop-blur-sm z-40`}>
                    <div className="space-y-6">
                        <button onClick={() => router.push('/')} className={`group flex items-center gap-3 font-bold transition-all ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}>
                            <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'}`}>
                                <ArrowLeft className="w-5 h-5" />
                            </div>
                            <span className="hidden xl:inline">Back</span>
                        </button>

                        <div className="hidden xl:block mt-10">
                            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Actions</p>
                            <div className="flex flex-col gap-2">
                                <button onClick={() => setIsDark(!isDark)} className={`flex items-center gap-3 p-2 rounded-lg transition-all text-sm font-medium ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                                    {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
                                    <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                                </button>
                                <button onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success("Link copied!");
                                }} className={`flex items-center gap-3 p-2 rounded-lg transition-all text-sm font-medium ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                                    <Share2 className="w-4 h-4 text-blue-400" />
                                    <span>Share Article</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {isAdmin && (
                        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-2">
                            <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Admin Zone</p>
                            <button onClick={() => router.push(`/blog/write?edit=${post.slug}`)} className="w-full flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300">
                                <Edit className="w-3 h-3" /> Edit Post
                            </button>
                            <button onClick={handleDelete} className="w-full flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300">
                                <Trash2 className="w-3 h-3" /> Delete
                            </button>
                        </div>
                    )}
                </div>

                <div
                    ref={contentRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto custom-scroll relative"
                >
                    <div className="lg:hidden flex justify-between items-center p-4 sticky top-0 z-30 backdrop-blur-md bg-opacity-80 border-b border-white/5">
                        <button onClick={() => router.push('/')}><ArrowLeft className="w-6 h-6" /></button>
                        <div className="flex gap-2">
                            <button onClick={() => setIsDark(!isDark)}>{isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                            {isAdmin && <button onClick={() => router.push(`/write?edit=${post.slug}`)}><Edit className="w-5 h-5" /></button>}
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate__animated animate__fadeIn">

                        <div className="mb-10">
                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags && post.tags.map((tag, i) => (
                                    <span key={i} className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border ${isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
                                {post.title}
                            </h1>

                            <div className={`flex items-center gap-6 text-sm font-mono border-l-2 pl-4 ${isDark ? 'border-white/10 text-gray-400' : 'border-black/10 text-gray-500'}`}>
                                <div className="flex gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{post.author || "Radya"}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {post.createdAt
                                            ? format(new Date(post.createdAt), "MMM d, yyyy")
                                            : "Draft"}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{Math.ceil((post.content?.length || 0) / 1000)} min read</span>
                                </div>
                            </div>
                        </div>

                        <hr className={`my-10 border-dashed ${isDark ? 'border-white/10' : 'border-black/10'}`} />

                        {children}

                        <div className={`mt-20 p-8 rounded-2xl text-center border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                            <p className="text-lg font-bold mb-2">Thanks for reading!</p>
                            <p className="text-sm opacity-60 mb-6">Hope you learned something new today.</p>
                            <button onClick={() => router.push('/')} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all text-sm">
                                Read Other Articles
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`hidden lg:flex w-64 xl:w-80 flex-col p-8 border-l ${isDark ? 'border-white/5 bg-[#050505]/80' : 'border-black/5 bg-white/80'} backdrop-blur-sm z-40 overflow-y-auto`}>
                    <div className="space-y-8 sticky top-8">

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Author</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-500/20">
                                    R
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Radya</p>
                                    <p className="text-xs opacity-60">Software Engineer</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Tags / Keywords</p>
                            <div className="flex flex-wrap gap-2">
                                {post.tags && post.tags.length > 0 ? (
                                    post.tags.map((t, i) => (
                                        <span key={i} className={`text-xs px-2 py-1 rounded cursor-default border transition-colors ${isDark
                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20'
                                            : 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200'
                                            }`}>
                                            #{t}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs opacity-50 italic">No tags attached.</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">System Metadata</p>
                            <div className={`rounded-xl p-4 border space-y-3 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-60 flex items-center gap-2">
                                        <Hash className="w-3 h-3" /> Words
                                    </span>
                                    <span className="font-mono font-bold">
                                        {post.content?.split(/\s+/).length || 0}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-60 flex items-center gap-2">
                                        <span className="text-[10px]">Az</span> Chars
                                    </span>
                                    <span className="font-mono font-bold">
                                        {post.content?.length || 0}
                                    </span>
                                </div>

                                <div className="pt-2 mt-2 border-t border-dashed border-gray-500/30 flex justify-between items-center text-xs">
                                    <span className="opacity-40">Status</span>
                                    <span className="flex items-center gap-1.5 text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        Published
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}