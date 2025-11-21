# Payload CMS Setup Guide

## Overview

Payload CMS 3.0 is fully integrated into your Next.js application, providing a powerful headless CMS with an admin panel.

## Setup Instructions

### 1. Environment Variables

Add to `.env.local`:

```bash
# Database
DATABASE_URL=your_postgres_connection_string

# Payload
PAYLOAD_SECRET=your_secret_key_here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Optional
PAYLOAD_LIVE_PREVIEW=false
```

Generate a secret:
```bash
openssl rand -base64 32
```

### 2. Database Setup

Payload uses your existing Drizzle database connection.

Run migrations (Payload will create necessary tables):
```bash
npm run payload migrate
```

### 3. Create Admin User

Access the admin panel at `/admin` and create your first user.

Or use the CLI:
```bash
npx payload migrate
npx payload create:user
```

### 4. Access Admin Panel

Visit `http://localhost:3000/admin` to access the Payload admin panel.

## Usage

### Server Components

```tsx
import { getPayload } from 'payload';
import config from '@payload-config';

export default async function HomePage() {
  const payload = await getPayload({ config });
  
  // Fetch all pages
  const pages = await payload.find({
    collection: 'pages',
    where: {
      published: {
        equals: true,
      },
    },
  });

  return (
    <div>
      {pages.docs.map((page) => (
        <div key={page.id}>
          <h2>{page.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      ))}
    </div>
  );
}
```

### Fetch Single Page

```tsx
export default async function Page({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config });
  
  const pages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: params.slug,
      },
    },
  });

  const page = pages.docs[0];
  
  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <article>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </article>
  );
}
```

### Fetch Posts

```tsx
export default async function BlogPage() {
  const payload = await getPayload({ config });
  
  const posts = await payload.find({
    collection: 'posts',
    where: {
      publishedAt: {
        less_than: new Date().toISOString(),
      },
    },
    sort: '-publishedAt',
    limit: 10,
  });

  return (
    <div>
      {posts.docs.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          {post.featuredImage && (
            <img src={post.featuredImage.url} alt={post.featuredImage.alt} />
          )}
        </article>
      ))}
    </div>
  );
}
```

### Client Components

For client-side usage, fetch data from the API:

```tsx
'use client';

import { useEffect, useState } from 'react';

export function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data.docs));
  }, []);

  return (
    <div>
      {posts.map((post: any) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}
```

## Features

### ✅ Admin Panel
- Full-featured admin UI at `/admin`
- Content management
- Media uploads
- User management

### ✅ Local API
- Direct database access from server components
- No API calls needed for server-side rendering
- Optimized performance

### ✅ Draft Preview
- Preview unpublished content
- Share preview links with team

### ✅ SEO Plugin
- Built-in SEO fields
- Open Graph tags
- Twitter Cards
- JSON-LD structured data

### ✅ Media Management
- Image uploads
- File management
- CDN support (coming)

### ✅ Rich Text Editor
- Lexical editor
- Inline components
- Block-level components

## Adding Custom Collections

Create new collection in `collections/`:

```typescript
import { CollectionConfig } from 'payload/types';

export const Products: CollectionConfig = {
  slug: 'products',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
  ],
};
```

Then import in `payload.config.ts`:

```typescript
import { Products } from './collections/Products';

export default buildConfig({
  collections: [
    Pages,
    Posts,
    Media,
    Products, // Add here
  ],
});
```

## Documentation

- [Payload Docs](https://payloadcms.com/docs)
- [Next.js Integration](https://payloadcms.com/docs/guides/nextjs)
- [Examples](https://github.com/payloadcms/payload/tree/main/examples)






























