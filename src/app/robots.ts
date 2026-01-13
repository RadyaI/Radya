import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/blog/write',
          '/tools/password'
        ],
      },
    ],
    sitemap: 'https://radya.my.id/sitemap.xml',
  }
}
