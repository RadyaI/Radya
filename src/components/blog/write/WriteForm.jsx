import MDEditor from "@uiw/react-md-editor";
import { Save, PenTool, Loader2 } from "lucide-react";
import BlogArticleHTML from "@/app/blog/[slug]/BlogArticleHTML"; 

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
    const renderPreview = (markdown) => {
        return (
            <div className="p-8 bg-[#0a0a0a] text-[#e5e5e5]">
                <div style={{
                    '--bg-primary': '#0a0a0a',
                    '--text-primary': '#e5e5e5',
                    '--text-secondary': '#a3a3a3',
                    '--border-color': '#262626',
                    '--code-bg': '#111',
                    '--accent': '#fff',
                }}>
                    <BlogArticleHTML content={markdown} />
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-12">
            
            <div className="space-y-8">
                <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#525252] mb-3">Judul Artikel</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Tulis judul yang menarik..."
                        className="w-full bg-transparent border-b-2 border-[#262626] py-4 text-4xl md:text-5xl font-black text-[#e5e5e5] placeholder-[#333] focus:border-[#e5e5e5] focus:outline-none transition-colors"
                    />
                </div>

                <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#525252] mb-3">Tags / Kategori</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Contoh: react, curhat, tutorial (pisahkan dengan koma)"
                        className="w-full bg-[#111] border-2 border-[#262626] p-4 text-sm text-[#e5e5e5] focus:border-[#e5e5e5] outline-none transition-colors"
                    />
                </div>
            </div>

            <div className="space-y-3" data-color-mode="dark">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#525252]">Konten Artikel</label>
                
                <div className="border-2 border-[#262626] focus-within:border-[#e5e5e5] transition-colors">
                    <MDEditor
                        value={content}
                        onChange={setContent}
                        height={600}
                        preview="live"
                        visibleDragbar={false}
                        components={{
                            preview: (source) => renderPreview(source)
                        }}
                        className="!bg-[#0a0a0a] !text-[#e5e5e5]"
                        textareaProps={{
                            placeholder: "Mulai menulis cerita...",
                            className: "!text-[#e5e5e5] !bg-[#0a0a0a] p-6 leading-relaxed"
                        }}
                    />
                </div>
            </div>

            <div className="flex justify-end pt-8">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="cursor-pointer px-8 py-4 bg-[#e5e5e5] text-[#0a0a0a] font-black uppercase tracking-widest border-2 border-transparent hover:bg-white hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0px_0px_#262626] flex items-center gap-3"
                >
                    {loading ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...</>
                    ) : (
                        isEditMode ? <><PenTool className="w-5 h-5" /> Simpan Perubahan</> : <><Save className="w-5 h-5" /> Terbitkan Sekarang</>
                    )}
                </button>
            </div>

            <style jsx global>{`
                .w-md-editor {
                    background-color: #0a0a0a !important;
                    color: #e5e5e5 !important;
                    border: none !important;
                    box-shadow: none !important;
                    border-radius: 0px !important;
                }
                .w-md-editor-toolbar {
                    background-color: #111 !important;
                    border-bottom: 2px solid #262626 !important;
                    padding: 10px !important;
                    border-radius: 0px !important;
                }
                .w-md-editor-toolbar li > button {
                    color: #a3a3a3 !important;
                    border-radius: 0px !important;
                }
                .w-md-editor-toolbar li > button:hover, .w-md-editor-toolbar li > button.active {
                    background-color: #262626 !important;
                    color: #e5e5e5 !important;
                }
                .w-md-editor-content { 
                    background-color: #0a0a0a !important;
                }
                .w-md-editor-preview {
                    background-color: #0a0a0a !important;
                    box-shadow: inset 1px 0 0 0 #262626 !important; 
                    padding: 0 !important;
                }
                .w-md-editor ::-webkit-scrollbar { width: 8px; height: 8px; }
                .w-md-editor ::-webkit-scrollbar-track { background: #0a0a0a; }
                .w-md-editor ::-webkit-scrollbar-thumb { background: #262626; border-radius: 0; }
                .w-md-editor ::-webkit-scrollbar-thumb:hover { background: #525252; }
            `}</style>
        </div>
    );
}