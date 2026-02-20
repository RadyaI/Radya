import { Calendar, User, Clock } from "lucide-react";
import { format } from "date-fns";

export default function ArticleHeader({ post, isDark }) {
    const tagStyle = isDark 
        ? 'bg-neutral-900 text-neutral-400 border-neutral-800' 
        : 'bg-white text-black border-black';
        
    const titleColor = isDark ? 'text-neutral-100' : 'text-neutral-900';
    const metaColor = isDark ? 'text-neutral-500 border-neutral-800' : 'text-neutral-500 border-neutral-300';

    return (
        <div className="mb-8 w-full">
            <div className="flex flex-wrap gap-2 mb-8">
                {post.tags && post.tags.map((tag, i) => (
                    <span key={i} className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase border ${tagStyle}`}>
                        #{tag}
                    </span>
                ))}
            </div>

            <h1 className={`text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 leading-[1.1] ${titleColor}`}>
                {post.title}
            </h1>

            <div className={`flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono font-medium border-y py-4 ${metaColor}`}>
                <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    <span className="uppercase tracking-wider">{post.author || "Radya"}</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    <span>{post.createdAt ? format(new Date(post.createdAt), "MMM d, yyyy") : "Draft"}</span>
                </div>
                
                <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{Math.ceil((post.content?.split(/\s+/).length || 0) / 170)} min read</span>
                </div>
            </div>
        </div>
    );
}