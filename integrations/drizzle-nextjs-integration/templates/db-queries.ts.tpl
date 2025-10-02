/**
 * Database Queries
 * 
 * Drizzle ORM query utilities for common operations
 */

import { db } from '@/lib/db';
import { products, users, posts } from '@/lib/db/schema';
import { eq, and, like, desc, asc, count, sql } from 'drizzle-orm';

// Generic query utilities
export const dbQueries = {
  // Find by ID
  async findById<T>(table: any, id: string): Promise<T | null> {
    const result = await db
      .select()
      .from(table)
      .where(eq(table.id, id))
      .limit(1);
    
    return result[0] || null;
  },

  // Find all with filters
  async findAll<T>(
    table: any, 
    filters?: Record<string, any>,
    orderBy?: { field: string; direction: 'asc' | 'desc' }
  ): Promise<T[]> {
    let query = db.select().from(table);
    
    if (filters) {
      const conditions = Object.entries(filters).map(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          return like(table[key], value);
        }
        return eq(table[key], value);
      });
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    if (orderBy) {
      const { field, direction } = orderBy;
      query = query.orderBy(
        direction === 'asc' ? asc(table[field]) : desc(table[field])
      );
    }
    
    return query;
  },

  // Count records
  async count(table: any, filters?: Record<string, any>): Promise<number> {
    let query = db.select({ count: count() }).from(table);
    
    if (filters) {
      const conditions = Object.entries(filters).map(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          return like(table[key], value);
        }
        return eq(table[key], value);
      });
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    const result = await query;
    return result[0].count;
  },

  // Paginate results
  async paginate<T>(
    table: any,
    page: number = 1,
    limit: number = 10,
    filters?: Record<string, any>,
    orderBy?: { field: string; direction: 'asc' | 'desc' }
  ): Promise<{
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;
    
    // Build conditions
    let conditions = [];
    if (filters) {
      conditions = Object.entries(filters).map(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          return like(table[key], value);
        }
        return eq(table[key], value);
      });
    }
    
    // Get data
    let dataQuery = db.select().from(table);
    if (conditions.length > 0) {
      dataQuery = dataQuery.where(and(...conditions));
    }
    if (orderBy) {
      const { field, direction } = orderBy;
      dataQuery = dataQuery.orderBy(
        direction === 'asc' ? asc(table[field]) : desc(table[field])
      );
    }
    const data = await dataQuery.limit(limit).offset(offset);
    
    // Get total count
    let countQuery = db.select({ count: count() }).from(table);
    if (conditions.length > 0) {
      countQuery = countQuery.where(and(...conditions));
    }
    const countResult = await countQuery;
    const total = countResult[0].count;
    
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  // Search records
  async search<T>(
    table: any,
    searchTerm: string,
    searchFields: string[],
    filters?: Record<string, any>
  ): Promise<T[]> {
    const searchConditions = searchFields.map(field => 
      like(table[field], `%${searchTerm}%`)
    );
    
    let conditions = [sql`(${searchConditions.join(' OR ')})`];
    
    if (filters) {
      const filterConditions = Object.entries(filters).map(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          return like(table[key], value);
        }
        return eq(table[key], value);
      });
      conditions.push(...filterConditions);
    }
    
    return db
      .select()
      .from(table)
      .where(and(...conditions))
      .orderBy(desc(table.createdAt));
  },

  // Get statistics
  async getStats(table: any, groupBy?: string): Promise<Record<string, any>> {
    const stats = await db
      .select({
        total: count(),
        ...(groupBy && { [groupBy]: table[groupBy] }),
      })
      .from(table)
      .groupBy(groupBy ? table[groupBy] : undefined);
    
    if (groupBy) {
      const result: Record<string, number> = {};
      stats.forEach(stat => {
        result[stat[groupBy]] = stat.total;
      });
      return result;
    }
    
    return { total: stats[0].total };
  },
};

// Specific query utilities for common operations
export const commonQueries = {
  // Get recent records
  async getRecent<T>(
    table: any,
    limit: number = 10,
    filters?: Record<string, any>
  ): Promise<T[]> {
    let query = db.select().from(table);
    
    if (filters) {
      const conditions = Object.entries(filters).map(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          return like(table[key], value);
        }
        return eq(table[key], value);
      });
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return query
      .orderBy(desc(table.createdAt))
      .limit(limit);
  },

  // Get records by date range
  async getByDateRange<T>(
    table: any,
    startDate: Date,
    endDate: Date,
    dateField: string = 'createdAt',
    filters?: Record<string, any>
  ): Promise<T[]> {
    let query = db.select().from(table);
    
    const conditions = [
      sql`${table[dateField]} >= ${startDate}`,
      sql`${table[dateField]} <= ${endDate}`,
    ];
    
    if (filters) {
      const filterConditions = Object.entries(filters).map(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          return like(table[key], value);
        }
        return eq(table[key], value);
      });
      conditions.push(...filterConditions);
    }
    
    return query
      .where(and(...conditions))
      .orderBy(desc(table[dateField]));
  },

  // Get records with relations
  async findWithRelations<T>(
    table: any,
    relations: { table: any; foreignKey: string; localKey: string }[],
    filters?: Record<string, any>
  ): Promise<T[]> {
    let query = db.select().from(table);
    
    // Add joins for relations
    relations.forEach(relation => {
      query = query.leftJoin(
        relation.table,
        eq(table[relation.localKey], relation.table[relation.foreignKey])
      );
    });
    
    if (filters) {
      const conditions = Object.entries(filters).map(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          return like(table[key], value);
        }
        return eq(table[key], value);
      });
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return query.orderBy(desc(table.createdAt));
  },

  // Soft delete (if table has deletedAt field)
  async softDelete(table: any, id: string): Promise<void> {
    await db
      .update(table)
      .set({ 
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(table.id, id));
  },

  // Restore soft deleted record
  async restore(table: any, id: string): Promise<void> {
    await db
      .update(table)
      .set({ 
        deletedAt: null,
        updatedAt: new Date(),
      })
      .where(eq(table.id, id));
  },
};
