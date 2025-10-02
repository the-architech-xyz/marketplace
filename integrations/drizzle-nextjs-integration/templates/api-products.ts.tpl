/**
 * Products API Service
 * 
 * API service layer for products using Drizzle ORM
 */

import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq, and, like, desc, asc } from 'drizzle-orm';
import type { Product, CreateProductData, UpdateProductData, ProductFilters } from '@/types/api';

export const productsApi = {
  // Get all products with optional filters
  async getAll(filters?: ProductFilters): Promise<Product[]> {
    let query = db.select().from(products);
    
    if (filters) {
      const conditions = [];
      
      if (filters.category) {
        conditions.push(eq(products.category, filters.category));
      }
      
      if (filters.search) {
        conditions.push(
          like(products.name, `%${filters.search}%`)
        );
      }
      
      if (filters.featured !== undefined) {
        conditions.push(eq(products.featured, filters.featured));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    const result = await query.orderBy(desc(products.createdAt));
    return result;
  },

  // Get product by ID
  async getById(id: string): Promise<Product> {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    
    if (result.length === 0) {
      throw new Error(`Product with id ${id} not found`);
    }
    
    return result[0];
  },

  // Create new product
  async create(data: CreateProductData): Promise<Product> {
    const result = await db
      .insert(products)
      .values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    
    return result[0];
  },

  // Update product
  async update(id: string, data: UpdateProductData): Promise<Product> {
    const result = await db
      .update(products)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`Product with id ${id} not found`);
    }
    
    return result[0];
  },

  // Delete product
  async delete(id: string): Promise<void> {
    const result = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`Product with id ${id} not found`);
    }
  },

  // Bulk delete products
  async bulkDelete(ids: string[]): Promise<void> {
    await db
      .delete(products)
      .where(and(...ids.map(id => eq(products.id, id))));
  },

  // Search products
  async search(query: string): Promise<Product[]> {
    const result = await db
      .select()
      .from(products)
      .where(
        and(
          like(products.name, `%${query}%`),
          eq(products.published, true)
        )
      )
      .orderBy(desc(products.createdAt));
    
    return result;
  },

  // Get products by category
  async getByCategory(category: string): Promise<Product[]> {
    const result = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.category, category),
          eq(products.published, true)
        )
      )
      .orderBy(desc(products.createdAt));
    
    return result;
  },

  // Get featured products
  async getFeatured(): Promise<Product[]> {
    const result = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.featured, true),
          eq(products.published, true)
        )
      )
      .orderBy(desc(products.createdAt));
    
    return result;
  },

  // Get product statistics
  async getStats(): Promise<{
    total: number;
    published: number;
    featured: number;
    categories: { [key: string]: number };
  }> {
    const allProducts = await db.select().from(products);
    
    const stats = {
      total: allProducts.length,
      published: allProducts.filter(p => p.published).length,
      featured: allProducts.filter(p => p.featured).length,
      categories: {} as { [key: string]: number },
    };
    
    // Count products by category
    allProducts.forEach(product => {
      if (product.category) {
        stats.categories[product.category] = (stats.categories[product.category] || 0) + 1;
      }
    });
    
    return stats;
  },

  // Get products with pagination
  async getPaginated(page: number = 1, limit: number = 10, filters?: ProductFilters): Promise<{
    data: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    let query = db.select().from(products);
    let countQuery = db.select({ count: products.id }).from(products);
    
    if (filters) {
      const conditions = [];
      
      if (filters.category) {
        conditions.push(eq(products.category, filters.category));
      }
      
      if (filters.search) {
        conditions.push(
          like(products.name, `%${filters.search}%`)
        );
      }
      
      if (filters.featured !== undefined) {
        conditions.push(eq(products.featured, filters.featured));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
        countQuery = countQuery.where(and(...conditions));
      }
    }
    
    const [data, countResult] = await Promise.all([
      query
        .orderBy(desc(products.createdAt))
        .limit(limit)
        .offset((page - 1) * limit),
      countQuery
    ]);
    
    const total = countResult.length;
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
