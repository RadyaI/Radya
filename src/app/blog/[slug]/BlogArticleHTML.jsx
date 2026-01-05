export default function BlogArticleHTML({ html }) {
  return (
    <div
      className="article-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}