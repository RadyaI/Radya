import { ArrowBigLeft } from "lucide-react"
import Link from "next/link"

export default function LearningButton() {
    return (
        <>
            <Link
                href="/learning"
                className="absolute -top-4 left-3 px-4 py-2 border-2 border-black font-black text-lg
             hover:bg-yellow-300 shadow-[6px_6px_0px_0px_#000]
             active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
             transition-all"
            >
                <span className="flex items-center gap-2">
                    <ArrowBigLeft className="w-6 h-6" />
                    <span className="leading-none">Back To Learning</span>
                </span>
            </Link>

        </>
    )
}