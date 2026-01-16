"use client";

import { Toaster } from "react-hot-toast";
import { useWritePost } from "@/hooks/useBlog";
import WriteHeader from "./WriteHeader";
import WriteForm from "./WriteForm";

export default function WritePost() {
    const write = useWritePost();

    return (
        <div className="cursor-default min-h-screen bg-[#050505] text-gray-200 p-6 pt-24 font-sans">
            <Toaster position="top-center" />

            <div className="max-w-5xl mx-auto animate__animated animate__fadeIn">
                <WriteHeader
                    isEditMode={write.isEditMode}
                />

                <WriteForm {...write} />
            </div>
        </div>
    );
}
