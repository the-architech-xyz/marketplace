import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo/config';

/**
 * Generate robots.txt for Next.js App Router
 * 
 * This file generates the robots.txt dynamically.
 * Configure crawler access and sitemap location.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO_CONFIG.siteUrl || 'https://example.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      // Add specific rules for bots
      // {
      //   userAgent: 'Googlebot',
      //   allow: '/',
      //   disallow: ['/private/'],
      // },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}






























