"use client"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from 'react-hot-toast';
import 'animate.css';

import { useAdmin, useScrollProgress, useSyntaxHighlighting, useDeleteArticle } from "@/hooks/useBlog";
import LeftSidebar from "@/components/blog/ui/LeftSidebar";
import RightSidebar from "@/components/blog/ui/RightSidebar";
import MobileHeader from "@/components/blog/ui/MobileHeader";
import ArticleHeader from "@/components/blog/ui/ArticleHeader";

export default function BlogDetailShell({ post, children }) {
    const router = useRouter();
    const contentRef = useRef(null);
    const [isDark, setIsDark] = useState(true);

    const { isAdmin, isLoading } = useAdmin();
    const { progress, handleScroll } = useScrollProgress(contentRef);
    const handleDelete = useDeleteArticle(isDark, router);

    useSyntaxHighlighting(post?.content, contentRef);

    if (!post) return null;

    const colorVars = {
        '--bg-primary': isDark ? '#0a0a0a' : '#f4f4f0',
        '--text-primary': isDark ? '#e5e5e5' : '#171717',
        '--text-secondary': isDark ? '#a3a3a3' : '#525252',
        '--border-color': isDark ? '#262626' : '#d4d4d4',
        '--code-bg': isDark ? '#111' : '#e5e5e5',
        '--accent': isDark ? '#fff' : '#000',
    };

    return (
        <div
            className="h-screen w-full fixed inset-0 z-50 overflow-hidden font-sans flex flex-col transition-colors duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]"
            style={colorVars}
        >
            <style jsx global>{`
                .custom-scroll::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scroll::-webkit-scrollbar-thumb {
                    background-color: var(--border-color);
                    border-radius: 0px;
                }
                .custom-scroll::-webkit-scrollbar-thumb:hover {
                    background-color: var(--text-secondary);
                }
                .custom-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: var(--border-color) transparent;
                }
            `}</style>

            <Toaster
                toastOptions={{
                    style: {
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0px',
                    }
                }}
            />

            <div className="w-full h-1 fixed top-0 left-0 z-[60] border-b border-[var(--border-color)] opacity-50">
                <div
                    className={`h-full transition-all duration-100 ease-out ${isDark ? 'bg-neutral-500' : 'bg-orange-600'}`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex h-full w-full">

                <LeftSidebar
                    isDark={isDark}
                    setIsDark={setIsDark}
                    isAdmin={isAdmin}
                    isLoading={isLoading}
                    router={router}
                    post={post}
                    onDelete={handleDelete}
                />

                <div
                    ref={contentRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto custom-scroll relative scroll-smooth text-[var(--text-primary)]"
                >
                    <MobileHeader
                        router={router}
                        isDark={isDark}
                        setIsDark={setIsDark}
                        isAdmin={isAdmin}
                        post={post}
                    />

                    <div className="max-w-3xl mx-auto px-6 pt-24 pb-32 animate__animated animate__fadeIn">

                        <ArticleHeader post={post} isDark={isDark} />

                        <hr className="my-12 border-t-2 border-dashed border-[var(--border-color)]" />

                        <div className="min-h-[50vh] text-[var(--text-primary)]">
                            {children}
                        </div>

                        <div className="mt-12 relative h-40 border-y-2 border-[var(--border-color)] overflow-hidden select-none bg-[var(--bg-primary)]">

                            <div className="absolute inset-0 flex items-center justify-between gap-[2px] px-4">

                                {Array.from({ length: 50 }).map((_, i) => {
                                    const heightClass = [
                                        'h-4', 'h-8', 'h-6', 'h-10', 'h-5'
                                    ][i % 5];

                                    return (
                                        <div
                                            key={i}
                                            className={`
                                                        w-full 
                                                        ${heightClass} /* Tinggi awal */
                                                        bg-[var(--border-color)] /* Warna default agak samar */
                                                        
                                                        /* Animasi Transisi */
                                                        transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                                                        
                                                        /* State Hover: Memanjang Penuh & Warna Jadi Solid */
                                                        hover:h-32 
                                                        hover:bg-[var(--text-primary)]
                                                        hover:scale-x-125
                                                    `}
                                        ></div>
                                    );
                                })}
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-secondary)] bg-[var(--bg-primary)] px-4 mix-blend-hard-light">
                                    END
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <RightSidebar isDark={isDark} post={post} />

            </div>
        </div>
    );
}