import WritePost from "@/components/blog/write/WritePost"
import { Suspense } from "react"

export default function Write() {
    return (
        <Suspense fallback={
            <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center font-bold text-[#e5e5e5] animate-pulse uppercase tracking-widest">
                Memuat Editor...
            </div>
        }>
            <WritePost />
        </Suspense>
    )
}