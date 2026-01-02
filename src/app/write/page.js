import CreatePost from "@/components/tools/blog/CreatePost"
import { Suspense } from "react"

export default function Write(params) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreatePost />
        </Suspense>
    )
}