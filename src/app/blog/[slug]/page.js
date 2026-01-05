import { db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { notFound } from "next/navigation";
import BlogDetail from "@/components/tools/blog/BlogDetail";

async function getPost(slug) {
  try {
    const decodedSlug = decodeURIComponent(slug);
    
    const q = query(collection(db, "articles"), where("slug", "==", decodedSlug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }

    const docData = querySnapshot.docs[0];
    const data = docData.data();
    
    return { 
      id: docData.id, 
      ...data,
      createdAt: data.createdAt ? { seconds: data.createdAt.seconds } : null,
      updatedAt: data.updatedAt ? { seconds: data.updatedAt.seconds } : null
    };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(props) {
  const params = await props.params;
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Not Found',
      description: 'Article not found'
    }
  }

  const plainText = post.content?.replace(/<[^>]*>?/gm, '').substring(0, 160) + "...";

  return {
    title: post.title,
    description: plainText,
    openGraph: {
      title: post.title,
      description: plainText,
      type: 'article',
      authors: [post.author || 'Radya'],
      publishedTime: post.createdAt ? new Date(post.createdAt.seconds * 1000).toISOString() : null,
      tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: plainText,
    }
  }
}

export default async function BlogPage(props) {
  const params = await props.params;
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
     <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "datePublished": post.createdAt ? new Date(post.createdAt.seconds * 1000).toISOString() : null,
              "author": {
                "@type": "Person",
                "name": post.author || "Radya"
              }
            })
          }}
        />
        <BlogDetail initialPost={post} />
     </>
  );
}