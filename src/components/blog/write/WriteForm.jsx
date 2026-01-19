import MDEditor from "@uiw/react-md-editor";
import { Save, PenTool, Loader2 } from "lucide-react";

export default function WriteForm({
    title,
    setTitle,
    tags,
    setTags,
    content,
    setContent,
    handleSave,
    loading,
    isEditMode
}) {
    return (
        <div className="space-y-6 bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 shadow-2xl">
                    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Article Title..."
                        className="w-full bg-[#151515] border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none font-bold text-lg transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Tags</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="React, Firebase..."
                        className="w-full bg-[#151515] border border-white/10 rounded-xl p-4 text-sm text-blue-400 focus:ring-2 focus:ring-blue-500/50 outline-none font-mono"
                    />
                </div>
            </div>

            <div className="space-y-2" data-color-mode="dark">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Content (Markdown)</label>
                <MDEditor
                    value={content}
                    onChange={setContent}
                    height={500}
                    preview="live"
                    hideToolbar={true}
                    visibleDragbar={false} 
                    className="rounded-xl border border-white/10 overflow-hidden shadow-inner !bg-[#111]"
                />
            </div>

            <button
                onClick={handleSave}
                disabled={loading}
                className="cursor-pointer w-full py-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01]"
            >
                {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                ) : (
                    isEditMode ? <><PenTool className="w-5 h-5" /> UPDATE SYSTEM</> : <><Save className="w-5 h-5" /> PUBLISH</>
                )}
            </button>
        </div>
    );
}
