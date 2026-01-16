import { Calendar, User, Clock } from "lucide-react";
import { format } from "date-fns";

export default function ArticleHeader({ post, isDark }) {
    return (
        <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-6">
                {post.tags && post.tags.map((tag, i) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border ${isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                        #{tag}
                    </span>
                ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
                {post.title}
            </h1>
            <div className={`flex items-center gap-6 text-sm font-mono border-l-2 pl-4 ${isDark ? 'border-white/10 text-gray-400' : 'border-black/10 text-gray-500'}`}>
                <div className="flex gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author || "Radya"}</span>
                </div>
                <div className="flex gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.createdAt ? format(new Date(post.createdAt), "MMM d, yyyy") : "Draft"}</span>
                </div>
                <div className="flex gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{Math.ceil((post.content?.split(/\s+/).length || 0) / 170)} min read</span>
                </div>
            </div>
        </div>
    );
}