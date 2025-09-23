# Drizzle Relations Integration Guide

## Overview

This guide shows how to use Drizzle ORM relations effectively in your application.

## Prerequisites

- Drizzle ORM configured
- Database schema with relationships
- Understanding of SQL relationships

## Basic Setup

### 1. Schema Definition

\`\`\`typescript
// src/lib/db/schema.ts
import { pgTable, text, timestamp, uuid, boolean, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  slug: text('slug').notNull().unique(),
  published: boolean('published').default(false),
  authorId: uuid('author_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  postId: uuid('post_id').notNull().references(() => posts.id),
  authorId: uuid('author_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
});

export const postCategories = pgTable('post_categories', {
  postId: uuid('post_id').notNull().references(() => posts.id),
  categoryId: uuid('category_id').notNull().references(() => categories.id),
});
\`\`\

### 2. Relations Definition

\`\`\`typescript
// src/lib/db/relations.ts
import { relations } from 'drizzle-orm';
import { users, posts, comments, categories, postCategories } from './schema';

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
  categories: many(postCategories),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(postCategories),
}));

export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
  post: one(posts, {
    fields: [postCategories.postId],
    references: [posts.id],
  }),
  category: one(categories, {
    fields: [postCategories.categoryId],
    references: [categories.id],
  }),
}));
\`\`\

## Usage Examples

### Basic Queries with Relations

\`\`\`typescript
// Get user with posts
const userWithPosts = await db.query.users.findFirst({
  where: eq(users.id, userId),
  with: {
    posts: {
      orderBy: desc(posts.createdAt),
    },
  },
});

// Get post with author and comments
const postWithDetails = await db.query.posts.findFirst({
  where: eq(posts.id, postId),
  with: {
    author: true,
    comments: {
      with: {
        author: true,
      },
      orderBy: asc(comments.createdAt),
    },
    categories: {
      with: {
        category: true,
      },
    },
  },
});
\`\`\

### Advanced Queries

\`\`\`typescript
// Get posts by category with author info
const postsByCategory = await db.query.posts.findMany({
  where: eq(posts.published, true),
  with: {
    author: {
      columns: {
        id: true,
        name: true,
        email: true,
      },
    },
    categories: {
      where: eq(postCategories.categoryId, categoryId),
      with: {
        category: true,
      },
    },
  },
  limit: 10,
  offset: 0,
  orderBy: desc(posts.createdAt),
});

// Search posts with relationships
const searchResults = await db.query.posts.findMany({
  where: and(
    eq(posts.published, true),
    or(
      like(posts.title, \`%\${query}%\`),
      like(posts.content, \`%\${query}%\`)
    )
  ),
  with: {
    author: {
      columns: {
        id: true,
        name: true,
      },
    },
    categories: {
      with: {
        category: true,
      },
    },
  },
  limit: 10,
  orderBy: desc(posts.createdAt),
});
\`\`\

### Complex Aggregations

\`\`\`typescript
// Get user statistics
const userStats = await db
  .select({
    id: users.id,
    name: users.name,
    postCount: count(posts.id),
    commentCount: count(comments.id),
  })
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId))
  .leftJoin(comments, eq(users.id, comments.authorId))
  .where(eq(users.id, userId))
  .groupBy(users.id);

// Get popular posts by comment count
const popularPosts = await db
  .select({
    id: posts.id,
    title: posts.title,
    commentCount: count(comments.id),
  })
  .from(posts)
  .leftJoin(comments, eq(posts.id, comments.postId))
  .where(eq(posts.published, true))
  .groupBy(posts.id)
  .orderBy(desc(count(comments.id)))
  .limit(10);
\`\`\

## API Integration

### Database Functions with Relations

\`\`\`typescript
// Framework-agnostic database functions
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function getPostWithRelations(postId: string) {
  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
          with: {
            author: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: asc(comments.createdAt),
        },
        categories: {
          with: {
            category: true,
          },
        },
      },
    });

    if (!post) {
      return { success: false, error: 'Post not found' };
    }

    return { success: true, post };
  } catch (error) {
    return { success: false, error: 'Failed to fetch post' };
  }
}
\`\`\

### React Components with Relations

\`\`\`typescript
// src/components/PostCard.tsx
'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
  categories: Array<{
    category: {
      id: string;
      name: string;
    };
  }>;
  _count?: {
    comments: number;
  };
}

export function PostCard({ postId }: { postId: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(\`/api/posts/\${postId}\`);
      const data = await response.json();
      
      if (response.ok) {
        setPost(data.post);
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <article className="border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.content}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>By {post.author.name}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      
      {post.categories.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {post.categories.map(({ category }) => (
              <span
                key={category.id}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
\`\`\

## Best Practices

1. **Use selective columns** to avoid over-fetching data
2. **Implement proper indexing** on foreign key columns
3. **Use transactions** for complex operations involving multiple tables
4. **Cache frequently accessed data** to improve performance
5. **Use pagination** for large result sets

## Performance Tips

### Optimize Queries

\`\`\`typescript
// Good: Select only needed columns
const users = await db.query.users.findMany({
  columns: {
    id: true,
    name: true,
    email: true,
  },
  with: {
    posts: {
      columns: {
        id: true,
        title: true,
        createdAt: true,
      },
      limit: 5, // Limit related data
    },
  },
});

// Avoid: Fetching all columns
const users = await db.query.users.findMany({
  with: {
    posts: true, // This fetches all post columns
  },
});
\`\`\

### Use Indexes

\`\`\`typescript
// Add indexes for better performance
export const posts = pgTable('posts', {
  // ... columns
}, (table) => ({
  authorIdIdx: index('posts_author_id_idx').on(table.authorId),
  publishedIdx: index('posts_published_idx').on(table.published),
  createdAtIdx: index('posts_created_at_idx').on(table.createdAt),
}));
\`\`\

## Common Patterns

### Nested Relations

\`\`\`typescript
// Get deeply nested data
const postWithNestedData = await db.query.posts.findFirst({
  where: eq(posts.id, postId),
  with: {
    author: true,
    comments: {
      with: {
        author: true,
      },
    },
    categories: {
      with: {
        category: true,
      },
    },
  },
});
\`\`\

### Conditional Relations

\`\`\`typescript
// Only load relations when needed
const posts = await db.query.posts.findMany({
  with: {
    author: true,
    // Only load comments for published posts
    comments: posts.published ? {
      with: {
        author: true,
      },
    } : undefined,
  },
});
\`\`\

    }
  ]
};
export default relationsBlueprint;
