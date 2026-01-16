import { Hash, Clock } from "lucide-react";

export default function RightSidebar({ isDark, post }) {
    const wordCount = post.content?.split(/\s+/).length || 0;
    const charCount = post.content?.length || 0;
    const readTime = Math.ceil(wordCount / 170);

    return (
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
                            <span className="opacity-60 flex items-center gap-2"><Hash className="w-3 h-3" /> Words</span>
                            <span className="font-mono font-bold">{wordCount}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="opacity-60 flex items-center gap-2"><span className="text-[10px]">Az</span> Chars</span>
                            <span className="font-mono font-bold">{charCount}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="opacity-60 flex items-center gap-2"><Clock className="w-3 h-3" /> Read Time</span>
                            <span className="font-mono font-bold text-green-500">{readTime} min</span>
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
    );
}