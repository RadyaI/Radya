"use client"

import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { collection, addDoc, updateDoc, doc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { Save, ArrowLeft, PenTool, Loader2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("**Hello World!**");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [docId, setDocId] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const editSlug = searchParams.get('edit');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user || user.email !== "radyaiftikhar@gmail.com") {
                toast.error("Restricted Access! 😤");
                router.push("/");
                return;
            }

            if (editSlug) {
                setIsEditMode(true);
                const q = query(collection(db, "articles"), where("slug", "==", editSlug));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const data = querySnapshot.docs[0].data();
                    setDocId(querySnapshot.docs[0].id);
                    setTitle(data.title);
                    setContent(data.content);
                    setTags(data.tags.join(', '));
                    toast.success("Data loaded for editing");
                }
            }
        });
        return () => unsubscribe();
    }, [editSlug, router]);

    const handleSave = async () => {
        if (!title || !content) return toast.error("Judul & Isi wajib diisi!");

        setLoading(true);
        const toastId = toast.loading("Saving transmission...");

        try {
            const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

            const dataPayload = {
                title,
                slug,
                content, // Isinya sekarang Markdown string
                tags: tags.split(',').map(t => t.trim()).filter(t => t),
                author: "Radya",
                updatedAt: serverTimestamp()
            };

            if (isEditMode && docId) {
                await updateDoc(doc(db, "articles", docId), dataPayload);
                toast.success("Updated successfully!", { id: toastId });
            } else {
                await addDoc(collection(db, "articles"), {
                    ...dataPayload,
                    createdAt: serverTimestamp()
                });
                toast.success("Published successfully! 🚀", { id: toastId });
            }

            setTimeout(() => router.push("/"), 1000);

        } catch (error) {
            console.error(error);
            toast.error("Error: " + error.message, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cursor-default min-h-screen bg-[#050505] text-gray-200 p-6 pt-24 font-sans">
            <Toaster position="top-center" />
            
            <div className="max-w-5xl mx-auto animate__animated animate__fadeIn">
                <div className="flex justify-between items-center mb-8">
                    <button onClick={() => router.push('/')} className="flex items-center gap-2 text-gray-500 hover:text-white transition group">
                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition">
                            <ArrowLeft className="w-5 h-5" /> 
                        </div>
                        <span className="font-bold">Cancel</span>
                    </button>
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        {isEditMode ? "Edit Transmission" : "New Transmission"}
                    </h1>
                </div>

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

                    <div className="space-y-2" data-color-mode="dark"> {/* Attribute ini PENTING buat Dark Mode */}
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Content (Markdown)</label>
                        <MDEditor
                            value={content}
                            onChange={setContent}
                            height={500}
                            preview="live"
                            className="rounded-xl border border-white/10 overflow-hidden shadow-inner !bg-[#111]"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="w-full py-4 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01]"
                    >
                        {loading ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                        ) : (
                            isEditMode ? <><PenTool className="w-5 h-5" /> UPDATE SYSTEM</> : <><Save className="w-5 h-5" /> PUBLISH TO NET</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}