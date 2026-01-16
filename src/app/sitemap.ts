import { MetadataRoute } from 'next'

const baseUrl = 'https://radya.my.id'
export const runtime = 'nodejs'
export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // STATIC ROUTES
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/learning`,
      lastModified: new Date('2026-01-17'),
      changeFrequency: 'daily',
      priority: 0.6,
    }
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
    'qrcode',
  ]

  // BLOG
  const blogSlugs = [
    'kuliah-informatika-gimana',
  ]

  const toolsRoutes: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date('2024-01-01'),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))


  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))



  return [
    ...staticRoutes,
    ...toolsRoutes,
    ...blogRoutes,
  ]
}
