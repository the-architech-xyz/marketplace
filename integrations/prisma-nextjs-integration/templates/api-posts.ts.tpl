/**
 * Posts API Service
 * 
 * API service layer for posts using Prisma ORM
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { prisma } from '@/lib/prisma';
import type { Post, CreatePostData, UpdatePostData, PostFilters } from '@/types/api';

export const postsApi = {
  // Get all posts with optional filters
  async getAll(filters?: PostFilters): Promise<Post[]> {
    const where: any = {};
    
    if (filters) {
      if (filters.author) {
        where.authorId = filters.author;
      }
      
      if (filters.category) {
        where.category = filters.category;
      }
      
      if (filters.status) {
        where.published = filters.status === 'published';
      }
      
      if (filters.published !== undefined) {
        where.published = filters.published;
      }
      
      if (filters.featured !== undefined) {
        where.featured = filters.featured;
      }
      
      if (filters.search) {
        where.OR = [
          {
            title: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
        ];
      }
    }
    
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return posts;
  },

  // Get post by ID
  async getById(id: string): Promise<Post> {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    
    if (!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    
    return post;
  },

  // Get published posts
  async getPublished(filters?: { category?: string; search?: string }): Promise<Post[]> {
    const where: any = { published: true };
    
    if (filters) {
      if (filters.category) {
        where.category = filters.category;
      }
      
      if (filters.search) {
        where.OR = [
          {
            title: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
        ];
      }
    }
    
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return posts;
  },

  // Get posts by author
  async getByAuthor(authorId: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: { authorId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return posts;
  },

  // Create new post
  async create(data: CreatePostData): Promise<Post> {
    const post = await prisma.post.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        author: true,
      },
    });
    
    return post;
  },

  // Update post
  async update(id: string, data: UpdatePostData): Promise<Post> {
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        author: true,
      },
    });
    
    return post;
  },

  // Delete post
  async delete(id: string): Promise<void> {
    await prisma.post.delete({
      where: { id },
    });
  },

  // Publish post
  async publish(id: string): Promise<Post> {
    const post = await prisma.post.update({
      where: { id },
      data: {
        published: true,
        publishedAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        author: true,
      },
    });
    
    return post;
  },

  // Unpublish post
  async unpublish(id: string): Promise<Post> {
    const post = await prisma.post.update({
      where: { id },
      data: {
        published: false,
        publishedAt: null,
        updatedAt: new Date(),
      },
      include: {
        author: true,
      },
    });
    
    return post;
  },

  // Get post comments
  async getComments(postId: string): Promise<any[]> {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return comments;
  },

  // Add comment to post
  async addComment(postId: string, content: string, authorId: string): Promise<any> {
    const comment = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        author: true,
      },
    });
    
    return comment;
  },

  // Search posts
  async search(query: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                title: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                content: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          },
          {
            published: true,
          },
        ],
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return posts;
  },

  // Get posts by category
  async getByCategory(category: string): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          { category },
          { published: true },
        ],
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return posts;
  },

  // Get featured posts
  async getFeatured(): Promise<Post[]> {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          { featured: true },
          { published: true },
        ],
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return posts;
  },

  // Get post statistics
  async getStats(): Promise<{
    total: number;
    published: number;
    featured: number;
    categories: { [key: string]: number };
  }> {
    const [total, published, featured, categoryStats] = await Promise.all([
      prisma.post.count(),
      prisma.post.count({ where: { published: true } }),
      prisma.post.count({ where: { featured: true } }),
      prisma.post.groupBy({
        by: ['category'],
        _count: {
          category: true,
        },
      }),
    ]);
    
    const categories = categoryStats.reduce((acc, stat) => {
      acc[stat.category] = stat._count.category;
      return acc;
    }, {} as { [key: string]: number });
    
    return {
      total,
      published,
      featured,
      categories,
    };
  },
};
