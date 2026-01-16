import { useState, useEffect } from "react";
import { auth, db } from "@/utils/firebase";
import {
    deleteDoc,
    doc,
    collection,
    addDoc,
    updateDoc,
    serverTimestamp,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export function useAdmin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsAdmin(user?.email === "radyaiftikhar@gmail.com");
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return { isAdmin, loading };
}

export function useScrollProgress(contentRef) {
    const [progress, setProgress] = useState(0);

    const handleScroll = () => {
        if (contentRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
            const scrolled =
                (scrollTop / (scrollHeight - clientHeight)) * 100;
            setProgress(scrolled);
        }
    };

    return { progress, handleScroll };
}

export function useSyntaxHighlighting(content, contentRef) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!contentRef.current) return;

            const codeBlocks =
                contentRef.current.querySelectorAll("pre code");

            codeBlocks.forEach((block) => {
                hljs.highlightElement(block);

                const pre = block.parentElement;
                if (pre.querySelector(".copy-btn")) return;

                const button = document.createElement("button");
                button.className =
                    "copy-btn absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 backdrop-blur-md border border-white/10";

                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

                button.addEventListener("click", async () => {
                    await navigator.clipboard.writeText(block.innerText);
                    toast.success("Code copied! 📋", {
                        style: { background: "#333", color: "#fff" },
                    });

                    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

                    setTimeout(() => {
                        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
                    }, 2000);
                });

                pre.classList.add("group", "relative");
                pre.appendChild(button);
            });
        }, 100);

        return () => clearTimeout(timer);
    }, [content, contentRef]);
}

export function useDeleteArticle(isDark, router) {
    const deleteArticle = async (id) => {
        Swal.fire({
            title: "Delete Protocol Initiated",
            text: "Are you sure to purge this data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#3b82f6",
            confirmButtonText: "Yes, Purge!",
            background: isDark ? "#111" : "#fff",
            color: isDark ? "#fff" : "#000",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(doc(db, "articles", id));
                Swal.fire("Purged!", "Data has been deleted.", "success");
                router.push("/");
            }
        });
    };

    return deleteArticle;
}

export function useWritePost() {
    const { isAdmin, loading: adminLoading } = useAdmin();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("# Hello World!");
    const [tags, setTags] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [docId, setDocId] = useState(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const editSlug = searchParams.get("edit");

    useEffect(() => {
        if (adminLoading) return;

        if (!isAdmin) {
            toast.error("Restricted Access!");
            router.push("/");
            return;
        }

        if (!editSlug) return;

        const loadData = async () => {
            setIsEditMode(true);

            const q = query(
                collection(db, "articles"),
                where("slug", "==", editSlug)
            );

            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const docSnap = snapshot.docs[0];
                const data = docSnap.data();

                setDocId(docSnap.id);
                setTitle(data.title);
                setContent(data.content);
                setTags(data.tags.join(", "));
                toast.success("Data loaded for editing");
            }
        };

        loadData();
    }, [isAdmin, adminLoading, editSlug, router]);

    const handleSave = async () => {
        if (!title || !content) {
            toast.error("Judul & Isi wajib diisi!");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Saving...");

        try {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .trim()
                .replace(/\s+/g, "-");

            const payload = {
                title,
                slug,
                content,
                tags: tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                author: "Radya",
                updatedAt: serverTimestamp(),
            };

            if (isEditMode && docId) {
                await updateDoc(doc(db, "articles", docId), payload);
                toast.success("Updated successfully!", { id: toastId });
            } else {
                await addDoc(collection(db, "articles"), {
                    ...payload,
                    createdAt: serverTimestamp(),
                });
                toast.success("Published successfully!", { id: toastId });
            }

            setTimeout(() => router.push("/"), 1000);
        } catch (err) {
            toast.error("Error: " + err.message, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return {
        title,
        setTitle,
        content,
        setContent,
        tags,
        setTags,
        loading,
        isEditMode,
        handleSave,
    };
}
