import { MetadataRoute } from 'next'
import { db } from '@/lib/firebase'
import { collection, getDocs, Timestamp } from 'firebase/firestore'

const baseUrl = 'https://radya.my.id'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // STATIC ROUTES
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  // TOOLS ROUTES
  const tools = [
    'cryptolab',
    'dont-click',
    'glassmorphism',
    'gravity',
    'keycodes',
    'reactionrace',
    'signpdf',
    'speedtyper',
    'whoami',
  ]

  const toolsRoutes: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date('2024-01-01'),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // BLOG DYNAMIC ROUTES
  const snapshot = await getDocs(collection(db, 'blogs'))

  const blogRoutes: MetadataRoute.Sitemap = snapshot.docs.map(doc => {
    const data = doc.data()

    const updatedAt =
      data.updatedAt instanceof Timestamp
        ? data.updatedAt.toDate()
        : new Date()

    return {
      url: `${baseUrl}/blog/${data.slug}`,
      lastModified: updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  })

  return [
    ...staticRoutes,
    ...toolsRoutes,
    ...blogRoutes,
  ]
}
