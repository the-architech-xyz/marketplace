import { db } from './index';
import { users, posts, comments, categories, postCategories } from './schema';
import { eq, and, or, desc, asc, count, like, inArray } from 'drizzle-orm';

// Query builders for common relationship queries
export class RelationshipQueries {
  // Get user with all their posts
  static async getUserWithPosts(userId: string) {
    return await db.query.users.findFirst({
      where: eq(users.id, userId),
      with: {
        posts: {
          orderBy: desc(posts.createdAt),
        },
      },
    });
  }

  // Get post with author and comments
  static async getPostWithDetails(postId: string) {
    return await db.query.posts.findFirst({
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
  }

  // Get posts by category
  static async getPostsByCategory(categoryId: string, limit = 10, offset = 0) {
    return await db.query.posts.findMany({
      where: eq(posts.published, true),
      with: {
        author: true,
        categories: {
          where: eq(postCategories.categoryId, categoryId),
          with: {
            category: true,
          },
        },
      },
      limit,
      offset,
      orderBy: desc(posts.createdAt),
    });
  }

  // Get user's posts with comment counts
  static async getUserPostsWithStats(userId: string) {
    return await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        published: posts.published,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        commentCount: count(comments.id),
      })
      .from(posts)
      .leftJoin(comments, eq(posts.id, comments.postId))
      .where(eq(posts.authorId, userId))
      .groupBy(posts.id)
      .orderBy(desc(posts.createdAt));
  }

  // Search posts with author info
  static async searchPosts(query: string, limit = 10, offset = 0) {
    return await db.query.posts.findMany({
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
            email: true,
          },
        },
        categories: {
          with: {
            category: true,
          },
        },
      },
      limit,
      offset,
      orderBy: desc(posts.createdAt),
    });
  }

  // Get category with post counts
  static async getCategoriesWithPostCounts() {
    return await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        description: categories.description,
        postCount: count(postCategories.postId),
      })
      .from(categories)
      .leftJoin(postCategories, eq(categories.id, postCategories.categoryId))
      .groupBy(categories.id)
      .orderBy(asc(categories.name));
  }

  // Get recent activity (posts and comments)
  static async getRecentActivity(limit = 20) {
    const recentPosts = await db.query.posts.findMany({
      where: eq(posts.published, true),
      with: {
        author: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
      limit: Math.ceil(limit / 2),
      orderBy: desc(posts.createdAt),
    });

    const recentComments = await db.query.comments.findMany({
      with: {
        author: {
          columns: {
            id: true,
            name: true,
          },
        },
        post: {
          columns: {
            id: true,
            title: true,
          },
        },
      },
      limit: Math.ceil(limit / 2),
      orderBy: desc(comments.createdAt),
    });

    // Combine and sort by date
    const activity = [...recentPosts, ...recentComments]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);

    return activity;
  }

  // Get user statistics
  static async getUserStats(userId: string) {
    const [postCount] = await db
      .select({ count: count() })
      .from(posts)
      .where(eq(posts.authorId, userId));

    const [commentCount] = await db
      .select({ count: count() })
      .from(comments)
      .where(eq(comments.authorId, userId));

    const [publishedPostCount] = await db
      .select({ count: count() })
      .from(posts)
      .where(and(eq(posts.authorId, userId), eq(posts.published, true)));

    return {
      totalPosts: postCount.count,
      publishedPosts: publishedPostCount.count,
      totalComments: commentCount.count,
    };
  }

  // Bulk operations
  static async assignCategoriesToPost(postId: string, categoryIds: string[]) {
    const categoryAssignments = categoryIds.map(categoryId => ({
      postId,
      categoryId,
    }));

    return await db.insert(postCategories).values(categoryAssignments);
  }

  static async removeCategoriesFromPost(postId: string, categoryIds: string[]) {
    return await db
      .delete(postCategories)
      .where(
        and(
          eq(postCategories.postId, postId),
          inArray(postCategories.categoryId, categoryIds)
        )
      );
  }

  // Advanced queries
  static async getPopularPosts(days = 30, limit = 10) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        createdAt: posts.createdAt,
        commentCount: count(comments.id),
      })
      .from(posts)
      .leftJoin(comments, eq(posts.id, comments.postId))
      .where(
        and(
          eq(posts.published, true),
          eq(posts.createdAt, cutoffDate)
        )
      )
      .groupBy(posts.id)
      .orderBy(desc(count(comments.id)))
      .limit(limit);
  }

  static async getUsersWithMostPosts(limit = 10) {
    return await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        postCount: count(posts.id),
      })
      .from(users)
      .leftJoin(posts, eq(users.id, posts.authorId))
      .groupBy(users.id)
      .orderBy(desc(count(posts.id)))
      .limit(limit);
  }
}
    },
    {
