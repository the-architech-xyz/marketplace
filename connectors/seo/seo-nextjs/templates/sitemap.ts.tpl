import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo/config';
import type { SitemapEntry } from '@/lib/seo/types';

/**
 * Generate sitemap.xml for Next.js App Router
 * 
 * This file generates the sitemap dynamically.
 * Add your routes to the routes array.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl || 'https://example.com';

  // Define your routes here
  // You can fetch these from a CMS, database, or generate them dynamically
  const routes: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Add more routes as needed
    // Example: Fetch from CMS
    // const posts = await fetchPosts();
    // ...posts.map(post => ({
    //   url: `${baseUrl}/blog/${post.slug}`,
    //   lastModified: post.updatedAt,
    //   changeFrequency: 'weekly',
    //   priority: 0.6,
    // }))
  ];

  return routes.map((route) => ({
    url: route.url,
    lastModified: route.lastModified
      ? typeof route.lastModified === 'string'
        ? route.lastModified
        : route.lastModified.toISOString()
      : new Date().toISOString(),
    changeFrequency: route.changeFrequency || 'weekly',
    priority: route.priority ?? 0.5,
  }));
}




