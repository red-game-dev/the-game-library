import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://redgame.dev';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',           // API routes
          '/login',          // Login page
          '/register',       // Register page
          '/_next/',         // Next.js internal files
          '/admin/',         // Admin routes (if any)
          '/private/',       // Private routes
          '/*.json',         // JSON files
          '/tmp/',           // Temporary files
        ],
      },
      // Special rules for search engines
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/login', '/register', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/login', '/register', '/admin/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}