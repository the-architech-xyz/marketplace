/**
 * Products API Service
 * 
 * API service layer for products using Prisma ORM
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { prisma } from '@/lib/prisma';
import type { Product, CreateProductData, UpdateProductData, ProductFilters } from '@/types/api';

export const productsApi = {
  // Get all products with optional filters
  async getAll(filters?: ProductFilters): Promise<Product[]> {
    const where: any = {};
    
    if (filters) {
      if (filters.category) {
        where.category = filters.category;
      }
      
      if (filters.search) {
        where.name = {
          contains: filters.search,
          mode: 'insensitive',
        };
      }
      
      if (filters.featured !== undefined) {
        where.featured = filters.featured;
      }
      
      if (filters.published !== undefined) {
        where.published = filters.published;
      }
    }
    
    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return products;
  },

  // Get product by ID
  async getById(id: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    
    return product;
  },

  // Create new product
  async create(data: CreateProductData): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    return product;
  },

  // Update product
  async update(id: string, data: UpdateProductData): Promise<Product> {
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    
    return product;
  },

  // Delete product
  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  },

  // Bulk delete products
  async bulkDelete(ids: string[]): Promise<void> {
    await prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  },

  // Search products
  async search(query: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            published: true,
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return products;
  },

  // Get products by category
  async getByCategory(category: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            category: category,
          },
          {
            published: true,
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return products;
  },

  // Get featured products
  async getFeatured(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            featured: true,
          },
          {
            published: true,
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return products;
  },

  // Get product statistics
  async getStats(): Promise<{
    total: number;
    published: number;
    featured: number;
    categories: { [key: string]: number };
  }> {
    const [total, published, featured, categoryStats] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { published: true } }),
      prisma.product.count({ where: { featured: true } }),
      prisma.product.groupBy({
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

  // Get products with pagination
  async getPaginated(page: number = 1, limit: number = 10, filters?: ProductFilters): Promise<{
    data: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (filters) {
      if (filters.category) {
        where.category = filters.category;
      }
      
      if (filters.search) {
        where.name = {
          contains: filters.search,
          mode: 'insensitive',
        };
      }
      
      if (filters.featured !== undefined) {
        where.featured = filters.featured;
      }
      
      if (filters.published !== undefined) {
        where.published = filters.published;
      }
    }
    
    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);
    
    const totalPages = Math.ceil(total / limit);
    
    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  },
};
