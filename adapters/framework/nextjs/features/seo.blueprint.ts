/**
 * Next.js SEO Feature Blueprint
 * 
 * Provides SEO optimization tools specific to Next.js
 * Includes next-seo and next-sitemap for better search engine visibility
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const nextjsSeoBlueprint: Blueprint = {
  id: 'nextjs-seo-setup',
  name: 'Next.js SEO Setup',
  actions: [
    // Install SEO packages
    {
      type: 'INSTALL_PACKAGES',
      packages: ['next-seo', 'next-sitemap']
    },
    // Create SEO configuration
    {
      type: 'CREATE_FILE',
      path: 'src/lib/seo.ts',
      content: `import { NextSeoProps } from 'next-seo';

export interface SeoConfig {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    type?: string;
    locale?: string;
    url?: string;
    siteName?: string;
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    handle?: string;
    site?: string;
    cardType?: 'summary' | 'summary_large_image';
  };
  additionalMetaTags?: Array<{
    name: string;
    content: string;
  }>;
}

export const defaultSeoConfig: SeoConfig = {
  title: '{{project.name}}',
  description: '{{project.description}}',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://{{project.domain}}',
    siteName: '{{project.name}}',
    title: '{{project.name}}',
    description: '{{project.description}}',
    images: [
      {
        url: 'https://{{project.domain}}/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '{{project.name}}',
      },
    ],
  },
  twitter: {
    handle: '@{{project.twitter}}',
    site: '@{{project.twitter}}',
    cardType: 'summary_large_image',
  },
};

export function createSeoProps(config: Partial<SeoConfig> = {}): NextSeoProps {
  const seoConfig = { ...defaultSeoConfig, ...config };
  
  return {
    title: seoConfig.title,
    description: seoConfig.description,
    canonical: seoConfig.canonical,
    openGraph: seoConfig.openGraph,
    twitter: seoConfig.twitter,
    additionalMetaTags: seoConfig.additionalMetaTags,
  };
}
`
    },
    // Create sitemap configuration
    {
      type: 'CREATE_FILE',
      path: 'next-sitemap.config.js',
      content: `/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://{{project.domain}}',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://{{project.domain}}/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
`
    },
    // Create robots.txt
    {
      type: 'CREATE_FILE',
      path: 'public/robots.txt',
      content: `User-agent: *
Allow: /

Sitemap: https://{{project.domain}}/sitemap.xml
`
    },
    // Update package.json scripts
    {
      type: 'MODIFY_FILE',
      path: 'package.json',
      content: `{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}`,
      action: 'merge'
    }
  ]
};
