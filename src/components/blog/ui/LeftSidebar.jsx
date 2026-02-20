import { ArrowLeft, Moon, Sun, Edit, Trash2, Share2 } from "lucide-react";
import toast from 'react-hot-toast';

export default function LeftSidebar({ isDark, setIsDark, isAdmin, isLoading, router, post, onDelete }) {
    
    const btnStyle = `flex items-center gap-3 p-3 transition-all text-sm font-bold border border-transparent 
        ${isDark 
            ? 'text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-800' 
            : 'text-neutral-600 hover:text-black hover:border-neutral-300 hover:bg-white'
        }`;
    
    const sidebarBg = isDark ? 'bg-[#0a0a0a] border-neutral-800' : 'bg-[#f4f4f0] border-neutral-300';

    return (
        <div className={`hidden lg:flex w-24 xl:w-64 flex-col justify-between p-6 border-r z-40 ${sidebarBg}`}>
            
            <div className="space-y-8">
                <button onClick={() => router.push('/')} className={`group flex items-center gap-3 font-bold transition-all px-2 ${isDark ? 'text-white' : 'text-black'}`}>
                    <div className={`p-2 border-2 transition-all group-hover:-translate-y-1 group-hover:shadow-[3px_3px_0px_0px_currentColor]
                        ${isDark ? 'border-neutral-200' : 'border-black'}`}>
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="hidden xl:inline">Kembali</span>
                </button>

                <div className="hidden xl:block mt-12">
                    <p className={`text-xs font-bold uppercase mb-4 pl-3 opacity-50 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Menu</p>
                    <div className="flex flex-col gap-1">
                        <button onClick={() => setIsDark(!isDark)} className={btnStyle}>
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            <span>{isDark ? "Mode Terang" : "Mode Gelap"}</span>
                        </button>
                        
                        <button onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.success("Link tersalin!");
                        }} className={btnStyle}>
                            <Share2 className="w-4 h-4" />
                            <span>Bagikan</span>
                        </button>
                    </div>
                </div>
            </div>

            {isAdmin && (
                <div className="p-4 border border-red-500/50 bg-red-500/10 text-red-500 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest">Admin</p>
                    <button onClick={() => router.push(`/blog/write?edit=${post.slug}`)} className="flex items-center gap-2 text-xs font-bold hover:underline">
                        <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button onClick={() => onDelete(post.id)} className="flex items-center gap-2 text-xs font-bold hover:underline">
                        <Trash2 className="w-3 h-3" /> Hapus
                    </button>
                </div>
            )}
        </div>
    );
}