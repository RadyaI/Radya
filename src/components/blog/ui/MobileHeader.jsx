import { ArrowLeft, Moon, Sun, Edit } from "lucide-react";

export default function MobileHeader({ router, isDark, setIsDark, isAdmin, post }) {
    return (
        <div className={`lg:hidden flex justify-between items-center p-4 sticky top-0 z-30 border-b-2
            ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-[#f4f4f0] border-black/10'}
        `}>
            <button onClick={() => router.push('/')} className="p-2 border border-transparent active:border-current">
                <ArrowLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-4">
                <button onClick={() => setIsDark(!isDark)} className="p-2 border border-transparent active:border-current">
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                {isAdmin && (
                    <button onClick={() => router.push(`/blog/write?edit=${post.slug}`)} className="p-2 border border-transparent active:border-current text-red-500">
                        <Edit className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}