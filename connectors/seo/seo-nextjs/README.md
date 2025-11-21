# SEO Next.js Connector

Complete SEO implementation for Next.js App Router with Metadata API, sitemap generation, robots.txt, and structured data.

## Overview

This connector enhances the SEO adapter with Next.js-specific features:

- ✅ **Next.js Metadata API**: Full integration with App Router metadata
- ✅ **Sitemap Generation**: Automatic sitemap.xml at `/sitemap.xml`
- ✅ **Robots.txt**: Automatic robots.txt at `/robots.txt`
- ✅ **Structured Data**: JSON-LD components for rich snippets
- ✅ **Type Safety**: Full TypeScript support

## Installation

This connector requires the SEO adapter:

```typescript
{
  id: 'analytics/seo-core',
  parameters: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'My App',
  },
},
{
  id: 'connectors/seo/seo-nextjs',
  requires: ['analytics/seo-core'],
  parameters: {
    sitemap: true,
    robots: true,
    structuredData: true,
    defaultMetadata: true,
  },
}
```

## Features

### Metadata API

Generate metadata for pages using Next.js Metadata API:

```tsx
import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'My Page',
  description: 'Page description',
  path: '/my-page',
});
```

### Sitemap

Automatic sitemap generation at `/sitemap.xml`:

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];
}
```

### Robots.txt

Automatic robots.txt generation at `/robots.txt`:

```tsx
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

### Structured Data

Add JSON-LD structured data to pages:

```tsx
import { StructuredDataServer } from '@/components/seo/StructuredData';
import { generateArticleStructuredData } from '@/lib/seo/structured-data';

export default function ArticlePage() {
  const structuredData = generateArticleStructuredData({
    headline: 'Article Title',
    author: { name: 'John Doe' },
    datePublished: new Date(),
  });

  return (
    <>
      <StructuredDataServer data={structuredData} />
      <article>...</article>
    </>
  );
}
```

## Parameters

- `sitemap` (boolean): Generate sitemap.xml (default: `true`)
- `robots` (boolean): Generate robots.txt (default: `true`)
- `structuredData` (boolean): Enable structured data helpers (default: `true`)
- `defaultMetadata` (boolean): Add default metadata to root layout (default: `true`)
- `dynamicMetadata` (boolean): Generate dynamic metadata helpers (default: `true`)
- `openGraph` (boolean): Generate Open Graph metadata (default: `true`)
- `twitter` (boolean): Generate Twitter Card metadata (default: `true`)

## Generated Files

- `app/sitemap.ts` - Sitemap generation (if enabled)
- `app/robots.ts` - Robots.txt generation (if enabled)
- `lib/seo/metadata.ts` - Next.js Metadata API helpers
- `components/seo/StructuredData.tsx` - Structured data component
- `config/next-sitemap.config.js` - next-sitemap configuration (if enabled)
- `docs/seo-integration.md` - Setup guide

## Requirements

- `framework/nextjs`
- `analytics/seo-core`

## Dependencies

- `next-sitemap` - Sitemap generation utility

## Next Steps

1. Add default metadata to your root layout
2. Generate metadata for each page
3. Add structured data to important pages (articles, products, etc.)
4. Submit sitemap to Google Search Console
5. Monitor SEO performance






























