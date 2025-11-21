# SEO Integration Guide

## Setup Instructions

### 1. Add Default Metadata to Root Layout

Edit `app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import { defaultMetadata } from '@/lib/seo/metadata';
import { StructuredDataServer } from '@/components/seo/StructuredData';
import { generateWebsiteStructuredData } from '@/lib/seo/structured-data';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteStructuredData = generateWebsiteStructuredData({
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'My App',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  });

  return (
    <html lang="en">
      <body>
        <StructuredDataServer data={websiteStructuredData} />
        {children}
      </body>
    </html>
  );
}
```

### 2. Add Metadata to Pages

#### Standard Page

```tsx
import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn more about our company',
  path: '/about',
});

export default function AboutPage() {
  return <div>About Us</div>;
}
```

#### Article/Blog Post

```tsx
import type { Metadata } from 'next';
import { generateArticleNextMetadata } from '@/lib/seo/metadata';
import { StructuredDataServer } from '@/components/seo/StructuredData';
import { generateArticleStructuredData } from '@/lib/seo/structured-data';

export const metadata: Metadata = generateArticleNextMetadata({
  title: 'My Article Title',
  description: 'Article description',
  path: '/blog/my-article',
  publishedTime: new Date('2024-01-01'),
  authors: ['John Doe'],
});

export default function ArticlePage() {
  const structuredData = generateArticleStructuredData({
    headline: 'My Article Title',
    description: 'Article description',
    author: { name: 'John Doe', type: 'Person' },
    datePublished: new Date('2024-01-01'),
    url: 'https://example.com/blog/my-article',
  });

  return (
    <article>
      <StructuredDataServer data={structuredData} />
      <h1>My Article Title</h1>
      <p>Article content...</p>
    </article>
  );
}
```

### 3. Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_SITE_NAME=My App
NEXT_PUBLIC_TWITTER_HANDLE=@myapp
NEXT_PUBLIC_TWITTER_SITE=@myapp
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```

### 4. Customize Sitemap

Edit `app/sitemap.ts` to add your routes:

```tsx
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Fetch routes from CMS, database, or define statically
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Add more routes...
  ];
}
```

### 5. Customize Robots.txt

Edit `app/robots.ts` to configure crawler access:

```tsx
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

## Features

- ✅ **Automatic Sitemap**: Generated at `/sitemap.xml`
- ✅ **Automatic Robots.txt**: Generated at `/robots.txt`
- ✅ **Metadata API**: Full Next.js Metadata API support
- ✅ **Open Graph**: Automatic OG tags generation
- ✅ **Twitter Cards**: Automatic Twitter Card generation
- ✅ **Structured Data**: JSON-LD schema support
- ✅ **Type Safety**: Full TypeScript support

## Documentation

- [Next.js Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Structured Data](https://schema.org/)
- [Google Search Console](https://search.google.com/search-console)






























