# Payload CMS Next.js Connector

Complete Payload CMS 3.0 integration for Next.js with local API, collections, and admin panel.

## Overview

This connector provides full Payload CMS 3.0 integration for Next.js:

- ✅ **Payload Config**: Complete configuration setup
- ✅ **Local API**: Server-side database access
- ✅ **Admin Panel**: Full admin UI at `/admin`
- ✅ **Collections**: Pages, Posts, Media
- ✅ **Draft Preview**: Preview unpublished content
- ✅ **SEO Plugin**: Built-in SEO fields
- ✅ **Media Management**: File uploads and management

## Installation

This connector requires Next.js and Drizzle:

```typescript
{
  id: 'framework/nextjs',
  parameters: {
    appRouter: true,
  },
},
{
  id: 'database/drizzle',
  parameters: {
    provider: 'postgres',
  },
},
{
  id: 'connectors/cms/payload-nextjs',
  requires: ['framework/nextjs', 'database/drizzle'],
  parameters: {
    collections: true,
    media: true,
    auth: true,
    adminPanel: true,
    draftPreview: true,
  },
}
```

## Features

### Admin Panel

Access the full admin UI at `/admin`:

```bash
http://localhost:3000/admin
```

### Local API

Query Payload directly from server components:

```tsx
import { getPayload } from 'payload';
import config from '@payload-config';

export default async function HomePage() {
  const payload = await getPayload({ config });
  
  const pages = await payload.find({
    collection: 'pages',
    where: {
      published: { equals: true },
    },
  });

  return (
    <div>
      {pages.docs.map((page) => (
        <div key={page.id}>{page.title}</div>
      ))}
    </div>
  );
}
```

### Collections

Pre-configured collections:
- **Pages**: Website pages with SEO
- **Posts**: Blog posts with categories
- **Media**: File uploads and management

### Draft Preview

Preview unpublished content:

```tsx
import { draftMode } from 'next/headers';

export async function Page() {
  const { isEnabled } = await draftMode();
  
  // Fetch draft or published content
  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: 'pages',
    draft: isEnabled,
  });
  
  return <div>...</div>;
}
```

## Parameters

- `collections` (boolean): Generate default collections (default: `true`)
- `media` (boolean): Enable media collection (default: `true`)
- `auth` (boolean): Enable authentication (default: `true`)
- `adminPanel` (boolean): Enable admin panel (default: `true`)
- `localApi` (boolean): Configure local API (default: `true`)
- `draftPreview` (boolean): Enable draft preview (default: `true`)
- `livePreview` (boolean): Enable live preview beta (default: `false`)

## Generated Files

- `payload.config.ts` - Payload configuration
- `lib/payload/index.ts` - Payload initialization
- `app/admin/[[...segments]]/page.tsx` - Admin panel route
- `app/api/payload/[[...segments]]/route.ts` - API route
- `collections/Pages.ts` - Pages collection
- `collections/Posts.ts` - Posts collection
- `collections/Media.ts` - Media collection
- `api/draft/route.ts` - Draft preview route
- `docs/payload-setup.md` - Setup guide

## Requirements

- `framework/nextjs` (App Router)
- `database/drizzle` (PostgreSQL)

## Dependencies

- `payload@beta` - Payload CMS 3.0
- `@payloadcms/db-postgres` - PostgreSQL adapter
- `@payloadcms/plugin-seo` - SEO plugin

## Setup

1. Set environment variables
2. Run `npm run payload migrate`
3. Create admin user at `/admin`
4. Start using Payload!

## Next Steps

See `docs/payload-setup.md` for detailed setup instructions and examples.




