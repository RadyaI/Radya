"use client"

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from 'react-hot-toast';
import 'animate.css';

import { useAdmin, useScrollProgress, useSyntaxHighlighting, useDeleteArticle } from "@/hooks/useBlog";
import BlogStyles from "@/components/blog/ui/BlogStyles";
import LeftSidebar from "@/components/blog/ui/LeftSidebar";
import RightSidebar from "@/components/blog/ui/RightSidebar";
import ArticleHeader from "@/components/blog/ui/ArticleHeader";
import MobileHeader from "@/components/blog/ui/MobileHeader";

export default function BlogDetail({ post, children }) {
    const router = useRouter();
    const contentRef = useRef(null);
    const [isDark, setIsDark] = useState(true);

    const {isAdmin, isLoading} = useAdmin();
    const { progress, handleScroll } = useScrollProgress(contentRef);
    const handleDelete = useDeleteArticle(isDark, router);
    
    useSyntaxHighlighting(post?.content, contentRef);

    if (!post) return null;

    return (
        <div className={`h-screen w-full fixed inset-0 z-50 overflow-hidden font-sans flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#050505] text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
            <Toaster />
            
            <BlogStyles isDark={isDark} />

            <div className="w-full h-1 bg-transparent fixed top-0 left-0 z-[60]">
                <div className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6] transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex h-full w-full bg-grid">
                
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
                    className="flex-1 overflow-y-auto custom-scroll relative"
                >
                    <MobileHeader 
                        router={router} 
                        isDark={isDark} 
                        setIsDark={setIsDark} 
                        isAdmin={isAdmin} 
                        post={post} 
                    />

                    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate__animated animate__fadeIn">
                        
                        <ArticleHeader post={post} isDark={isDark} />

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

                <RightSidebar isDark={isDark} post={post} />
                
            </div>
        </div>
    );
}