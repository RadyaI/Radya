import { Hash, Clock } from "lucide-react";

export default function RightSidebar({ isDark, post }) {
    const wordCount = post.content?.split(/\s+/).length || 0;
    const charCount = post.content?.length || 0;
    const readTime = Math.ceil(wordCount / 170);

    const sidebarBg = isDark ? 'bg-[#0a0a0a] border-neutral-800' : 'bg-[#f4f4f0] border-neutral-300';
    const textColor = isDark ? 'text-neutral-300' : 'text-neutral-800';

    return (
        <div className={`hidden lg:flex w-64 xl:w-80 flex-col p-8 border-l z-40 overflow-y-auto ${sidebarBg} ${textColor}`}>
            
            <div className="space-y-10 sticky top-8">
                <div>
                    <p className="text-xs font-bold uppercase mb-4 opacity-50">Penulis</p>
                    <div className={`flex items-center gap-4 p-4 border shadow-[4px_4px_0px_0px_currentColor]
                        ${isDark ? 'border-neutral-700 bg-[#111]' : 'border-black bg-white'}`}>
                        <div className={`w-10 h-10 flex items-center justify-center font-bold border
                            ${isDark ? 'bg-neutral-800 border-neutral-600' : 'bg-black text-white border-black'}
                        `}>
                            R
                        </div>
                        <div>
                            <p className="font-bold text-base leading-none">Radya</p>
                            <p className="text-xs opacity-60 mt-1">Web Developer</p>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-bold uppercase mb-4 opacity-50">Info Artikel</p>
                    <div className={`border text-sm
                        ${isDark ? 'border-neutral-700 bg-[#111]' : 'border-black bg-white'}
                    `}>
                        <div className={`flex justify-between items-center p-3 border-b ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                            <span className="opacity-50 flex items-center gap-2">Kata</span>
                            <span className="font-bold font-mono">{wordCount}</span>
                        </div>
                        <div className={`flex justify-between items-center p-3 border-b ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                            <span className="opacity-50 flex items-center gap-2">Karakter</span>
                            <span className="font-bold font-mono">{charCount}</span>
                        </div>
                        <div className={`flex justify-between items-center p-3 border-b ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                            <span className="opacity-50 flex items-center gap-2">Estimasi Baca</span>
                            <span className="font-bold font-mono">{readTime} Menit</span>
                        </div>
                        <div className={`flex justify-between items-center p-3 ${isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-800'}`}>
                            <span className="opacity-70 text-xs">Status</span>
                            <span className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-wider">
                                <span className="w-1.5 h-1.5 bg-green-500 animate-pulse"></span>
                                Publish
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}