"use client"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function BlogArticleHTML({ content }) {
  
  const textClass = "text-[var(--text-primary)]";
  const borderClass = "border-[var(--border-color)]";

  const components = {
    h1: ({node, ...props}) => <h1 className={`text-3xl md:text-4xl font-black mt-12 mb-6 tracking-tight ${textClass}`} {...props} />,
    h2: ({node, ...props}) => <h2 className={`text-2xl md:text-3xl font-bold mt-12 mb-4 tracking-tight border-b pb-2 ${textClass} ${borderClass}`} {...props} />,
    h3: ({node, ...props}) => <h3 className={`text-xl md:text-2xl font-bold mt-8 mb-3 ${textClass}`} {...props} />,
    
    p: ({node, ...props}) => <p className={`text-base md:text-lg leading-8 mb-6 font-medium opacity-90 ${textClass}`} {...props} />,
    
    ul: ({node, ...props}) => <ul className={`list-disc list-outside ml-5 mb-6 space-y-2 marker:text-[var(--text-secondary)] ${textClass}`} {...props} />,
    ol: ({node, ...props}) => <ol className={`list-decimal list-outside ml-5 mb-6 space-y-2 marker:font-bold marker:text-[var(--text-secondary)] ${textClass}`} {...props} />,
    
    strong: ({node, ...props}) => <strong className={`font-black ${textClass}`} {...props} />,
    em: ({node, ...props}) => <em className={`italic opacity-80 ${textClass}`} {...props} />,
    
    blockquote: ({node, ...props}) => (
      <blockquote className={`border-l-4 pl-6 my-8 py-2 italic text-lg opacity-80 bg-[var(--border-color)]/20 ${textClass} ${borderClass}`} {...props} />
    ),
    
    a: ({node, ...props}) => (
      <a className={`font-bold underline decoration-2 underline-offset-4 hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all px-1 ${textClass} decoration-[var(--text-secondary)]`} {...props} />
    ),

    code: ({node, inline, className, children, ...props}) => {
      return !inline ? (
        <div className={`my-8 border-2 bg-[var(--code-bg)] overflow-x-auto text-sm p-4 shadow-[4px_4px_0px_0px_var(--text-primary)] ${borderClass}`}>
          <code className={`${className} text-[#abb2bf] dark:text-[#e5e5e5]`} {...props}>
            {children}
          </code>
        </div>
      ) : (
        <code className={`font-mono text-sm bg-[var(--border-color)]/30 px-1.5 py-0.5 border border-[var(--border-color)] rounded-none ${textClass}`} {...props}>
          {children}
        </code>
      )
    },

    img: ({node, ...props}) => (
      <span className="block my-10">
        <img className={`w-full h-auto border-2 shadow-[6px_6px_0px_0px_var(--text-primary)] ${borderClass}`} {...props} />
        {props.alt && <span className="block text-sm text-center mt-3 opacity-60 italic text-[var(--text-secondary)]">{props.alt}</span>}
      </span>
    ),
    
    hr: ({node, ...props}) => <hr className={`border-t-2 border-dashed opacity-30 my-12 ${borderClass}`} {...props} />
  }

  return (
    <div className={`article-content max-w-none w-full ${textClass}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}