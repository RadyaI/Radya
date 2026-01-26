import { ArrowBigLeft } from "lucide-react"
import Link from "next/link"

export default function LearningButton() {
    return (
        <Link
            href="/learning"
            className="fixed top-6 left-6 z-50 px-4 py-2 
            bg-white border-2 border-black font-black text-lg
            shadow-[4px_4px_0px_0px_#000]
            hover:bg-yellow-300 hover:shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5
            active:translate-x-0 active:translate-y-0 active:shadow-none
            transition-all"
        >
            <span className="flex items-center gap-2">
                <ArrowBigLeft className="w-6 h-6" />
                <span className="leading-none">Learning</span>
            </span>
        </Link>
    )
}