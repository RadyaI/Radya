"use client";

import { Toaster } from "react-hot-toast";
import { useWritePost } from "@/hooks/useBlog";
import WriteHeader from "./WriteHeader";
import WriteForm from "./WriteForm";

export default function WritePost() {
    const write = useWritePost();

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] p-6 pt-24 pb-32 font-sans selection:bg-[#e5e5e5] selection:text-[#0a0a0a]">
            <Toaster 
                position="bottom-right" 
                toastOptions={{
                    style: {
                        background: '#111',
                        color: '#fff',
                        border: '1px solid #333',
                        borderRadius: '0px',
                    }
                }}
            />

            <div className="max-w-6xl mx-auto animate__animated animate__fadeIn">
                <WriteHeader
                    isEditMode={write.isEditMode}
                />

                <WriteForm {...write} />
            </div>
        </div>
    );
}