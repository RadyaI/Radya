import { ArrowLeft, Moon, Sun, Edit, Trash2, Share2 } from "lucide-react";
import toast from 'react-hot-toast';

export default function LeftSidebar({ isDark, setIsDark, isAdmin, router, post, onDelete }) {
    return (
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
                    <button onClick={() => onDelete(post.id)} className="w-full flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300">
                        <Trash2 className="w-3 h-3" /> Delete
                    </button>
                </div>
            )}
        </div>
    );
}