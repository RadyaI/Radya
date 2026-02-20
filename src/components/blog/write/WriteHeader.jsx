'use client'

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function WriteHeader({ isEditMode }) {
    const router = useRouter()

    return (
        <div className="flex justify-between items-end mb-12 border-b-2 border-[#262626] pb-6">
            <div>
                <h1 className="text-4xl md:text-6xl font-black text-[#e5e5e5] tracking-tight mb-2">
                    {isEditMode ? "Edit Artikel" : "Tulis Artikel"}
                </h1>
                <p className="font-bold text-[#525252] text-sm uppercase tracking-widest">
                    Dashboard Penulis
                </p>
            </div>

            <button
                onClick={() => router.push('/')}
                className="group flex items-center gap-2 text-[#525252] hover:text-[#e5e5e5] transition-colors pb-2"
            >
                <div className="p-2 border border-transparent group-hover:border-[#e5e5e5] transition-all">
                    <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm hidden md:inline">Batal & Kembali</span>
            </button>
        </div>
    )
}