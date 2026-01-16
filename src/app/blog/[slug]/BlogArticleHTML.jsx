"use client"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function BlogArticleHTML({ content }) {
  return (
    <div className="article-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}