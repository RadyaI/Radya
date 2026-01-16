import { cache } from 'react'
import { notFound } from 'next/navigation'
import { db } from '@/utils/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import BlogDetailShell from './BlogDetailShell'
import BlogArticleHTML from './BlogArticleHTML'

export const revalidate = 300

const getPost = cache(async (slug) => {
  if (!slug) return null

  const q = query(
    collection(db, 'articles'),
    where('slug', '==', slug)
  )

  const snap = await getDocs(q)
  if (snap.empty) return null

  const doc = snap.docs[0]
  const data = doc.data()

  return {
    id: doc.id,
    slug: data.slug,
    title: data.title,
    author: data.author || 'Radya',
    content: data.content,
    tags: data.tags || [],
    type: data.type || 'article',
    createdAt: data.createdAt
      ? data.createdAt.seconds * 1000
      : null,
    updatedAt: data.updatedAt
      ? data.updatedAt.seconds * 1000
      : null,
  }
})

export async function generateStaticParams() {
  const snap = await getDocs(collection(db, 'articles'))
  return snap.docs.map(d => ({ slug: d.data().slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Not Found',
      description: 'Article not found'
    }
  }

  const desc = post.content
    ?.replace(/[#*`_~\[\]]/g, '')
    .slice(0, 160)

  return {
    title: post.title,
    description: desc,
    alternates: {
      canonical: `https://radya.my.id/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: desc,
      type: 'article',
      url: `https://radya.my.id/blog/${post.slug}`,
      publishedTime: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
    }
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            url: `https://radya.my.id/blog/${post.slug}`,
            datePublished: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
            dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
            author: {
              "@type": "Person",
              name: post.author || "Radya"
            }
          })
        }}
      />

      <BlogDetailShell post={post}>
        <BlogArticleHTML content={post.content} />
      </BlogDetailShell>
    </>
  )
}