import WritePost from "@/components/blog/write/WritePost"
import { Suspense } from "react"

export default function Write() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <WritePost />
        </Suspense>
    )
}
