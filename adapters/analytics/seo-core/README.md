# SEO Core Adapter

Tech-agnostic SEO utilities, structured data schemas, and metadata types.

## Overview

This adapter provides reusable SEO utilities that work with any framework. Framework-specific implementations (Next.js Metadata API, sitemap generation) are handled by connectors.

## Features

- ✅ **Metadata Types**: TypeScript interfaces for SEO metadata
- ✅ **Structured Data**: JSON-LD schema generators (Website, Article, Organization, Breadcrumb, Product)
- ✅ **Metadata Helpers**: Functions to generate common metadata patterns
- ✅ **SEO Utilities**: Canonical URLs, metadata validation, meta tag generation

## Installation

This adapter is automatically installed when included in your genome:

```typescript
{
  id: 'analytics/seo-core',
  parameters: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'My App',
    features: {
      structuredData: true,
      metadataHelpers: true,
    },
  },
}
```

## Configuration

### Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_SITE_NAME=My App
NEXT_PUBLIC_TWITTER_HANDLE=@myapp
NEXT_PUBLIC_TWITTER_SITE=@myapp
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```

### Parameters

- `siteUrl` (string): Base URL of the site
- `siteName` (string): Site name for Open Graph and structured data
- `defaultLocale` (string): Default locale (default: `en`)
- `features` (object):
  - `core` (boolean): Essential SEO utilities (default: `true`)
  - `structuredData` (boolean): Structured data generators (default: `true`)
  - `metadataHelpers` (boolean): Metadata generation helpers (default: `true`)
  - `sitemap` (boolean): Sitemap utilities (default: `false`)

## Usage

This adapter is framework-agnostic and provides base utilities. For Next.js usage, use the connector:

```typescript
{
  id: 'connectors/seo/seo-nextjs',
  requires: ['analytics/seo-core'],
}
```

## Generated Files

- `lib/seo/config.ts` - SEO configuration
- `lib/seo/types.ts` - TypeScript types
- `lib/seo/utils.ts` - SEO utilities
- `lib/seo/structured-data.ts` - Structured data generators (if enabled)
- `lib/seo/metadata-helpers.ts` - Metadata helpers (if enabled)

## Example Usage

```typescript
import { generateArticleStructuredData } from '@/lib/seo/structured-data';
import { generateArticleMetadata } from '@/lib/seo/metadata-helpers';

// Generate structured data
const structuredData = generateArticleStructuredData({
  headline: 'My Article Title',
  description: 'Article description',
  author: { name: 'John Doe', type: 'Person' },
  datePublished: new Date(),
});

// Generate metadata
const metadata = generateArticleMetadata({
  title: 'My Article Title',
  description: 'Article description',
  path: '/blog/my-article',
  publishedTime: new Date(),
});
```

## Dependencies

None (pure TypeScript utilities)

## Limitations

- Tech-agnostic core only. Requires connector for framework-specific implementation.
- Meta tag generation returns strings (for non-React frameworks).
- Next.js Metadata API integration requires the connector.

## Next Steps

After installing this adapter, add the framework connector:

- **Next.js**: `connectors/seo/seo-nextjs`
- More connectors coming soon...






























