export default function BlogStyles({ isDark }) {
    return (
        <style>{`
            * { cursor: default; }
            .bg-grid {
                background-size: 40px 40px;
                background-image: ${isDark
                ? 'linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)'
                : 'linear-gradient(to right, #00000005 1px, transparent 1px), linear-gradient(to bottom, #00000005 1px, transparent 1px)'};
            }
            .custom-scroll::-webkit-scrollbar { width: 6px; }
            .custom-scroll::-webkit-scrollbar-track { background: transparent; }
            .custom-scroll::-webkit-scrollbar-thumb { background: ${isDark ? '#333' : '#ccc'}; border-radius: 10px; }
            .custom-scroll::-webkit-scrollbar-thumb:hover { background: ${isDark ? '#555' : '#999'}; }

            /* MARKDOWN TYPOGRAPHY */
            .article-content h1 { font-size: 2.25rem; font-weight: 800; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.2; letter-spacing: -0.02em; color: ${isDark ? '#fff' : '#111'}; }
            .article-content h2 { font-size: 1.75rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; letter-spacing: -0.01em; color: ${isDark ? '#e5e7eb' : '#1f2937'}; border-bottom: 1px solid ${isDark ? '#333' : '#e5e7eb'}; padding-bottom: 0.5rem; }
            .article-content h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: ${isDark ? '#d1d5db' : '#374151'}; }
            .article-content p { margin-bottom: 1.5rem; line-height: 1.8; font-size: 1.1rem; opacity: 0.9; }
            .article-content strong { font-weight: 700; color: ${isDark ? '#fff' : '#000'}; }
            .article-content em { font-style: italic; opacity: 0.8; }
            .article-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
            .article-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
            .article-content blockquote { border-left: 4px solid #3b82f6; padding-left: 1.5rem; font-style: italic; background: ${isDark ? '#1a1a1a' : '#f3f4f6'}; padding: 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1.5rem; color: ${isDark ? '#9ca3af' : '#4b5563'}; }
            
            /* CODE BLOCKS */
            .article-content pre { 
                background: #1e1e1e !important; 
                color: #abb2bf;
                padding: 1.5rem; 
                border-radius: 12px; 
                overflow-x: auto; 
                margin: 1.5rem 0; 
                border: 1px solid ${isDark ? '#333' : '#ddd'};
                position: relative; 
            }
            .article-content code { font-family: 'Consolas', 'Monaco', monospace; font-size: 0.9em; }
            .article-content :not(pre) > code {
                background: ${isDark ? '#334155' : '#e2e8f0'};
                color: ${isDark ? '#e2e8f0' : '#0f172a'};
                padding: 0.2rem 0.4rem;
                border-radius: 4px;
                font-weight: 600;
            }
            .copy-btn { cursor: pointer; }
            .article-content img { border-radius: 12px; width: 100%; border: 1px solid ${isDark ? '#333' : '#ddd'}; margin: 1rem 0; }
            .article-content a { cursor: pointer; color: #3b82f6; text-decoration: none; border-bottom: 1px solid transparent; transition: all 0.2s; }
            .article-content a:hover { border-bottom-color: #3b82f6; }
            .article-content table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
            .article-content th, .article-content td { border: 1px solid ${isDark ? '#333' : '#ddd'}; padding: 0.75rem; text-align: left; }
            .article-content th { background: ${isDark ? '#1a1a1a' : '#f3f4f6'}; font-weight: 700; }
        `}</style>
    );
}