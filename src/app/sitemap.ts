import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://radya.my.id'
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/tools/signpdf`,
      lastModified: new Date(),
      priority: 0.9,
    },
  ]
}