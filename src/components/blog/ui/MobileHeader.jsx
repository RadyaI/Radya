import { ArrowLeft, Moon, Sun, Edit } from "lucide-react";

export default function MobileHeader({ router, isDark, setIsDark, isAdmin, post }) {
    return (
        <div className="lg:hidden flex justify-between items-center p-4 sticky top-0 z-30 backdrop-blur-md bg-opacity-80 border-b border-white/5">
            <button onClick={() => router.push('/')}><ArrowLeft className="w-6 h-6" /></button>
            <div className="flex gap-2">
                <button onClick={() => setIsDark(!isDark)}>{isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                {isAdmin && <button onClick={() => router.push(`/blog/write?edit=${post.slug}`)}><Edit className="w-5 h-5" /></button>}
            </div>
        </div>
    );
}