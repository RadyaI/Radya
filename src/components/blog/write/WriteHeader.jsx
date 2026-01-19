'use client'

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function WriteHeader({ isEditMode }) {
    const router = useRouter()

    return (
        <div className="flex justify-between items-center mb-8">
            <button
                onClick={() => router.push('/')}
                className="cursor-pointer flex items-center gap-2 text-gray-500 hover:text-white transition group"
            >
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition">
                    <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="font-bold">Cancel</span>
            </button>

            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {isEditMode ? "Edit Blog" : "New Blog"}
            </h1>
        </div>
    )
}
