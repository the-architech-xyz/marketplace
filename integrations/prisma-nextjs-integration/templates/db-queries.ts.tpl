/**
 * Database Queries
 * 
 * Prisma ORM query utilities for common operations
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { prisma } from '@/lib/prisma';

// Generic query utilities
export const dbQueries = {
  // Find by ID
  async findById<T>(model: any, id: string): Promise<T | null> {
    const result = await model.findUnique({
      where: { id },
    });
    
    return result || null;
  },

  // Find all with filters
  async findAll<T>(
    model: any, 
    filters?: Record<string, any>,
    orderBy?: { field: string; direction: 'asc' | 'desc' }
  ): Promise<T[]> {
    const where: any = {};
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          where[key] = {
            contains: value,
            mode: 'insensitive',
          };
        } else {
          where[key] = value;
        }
      });
    }
    
    const orderByClause: any = {};
    if (orderBy) {
      orderByClause[orderBy.field] = orderBy.direction;
    } else {
      orderByClause.createdAt = 'desc';
    }
    
    return model.findMany({
      where,
      orderBy: orderByClause,
    });
  },

  // Count records
  async count(model: any, filters?: Record<string, any>): Promise<number> {
    const where: any = {};
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          where[key] = {
            contains: value,
            mode: 'insensitive',
          };
        } else {
          where[key] = value;
        }
      });
    }
    
    return model.count({ where });
  },

  // Paginate results
  async paginate<T>(
    model: any,
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
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          where[key] = {
            contains: value,
            mode: 'insensitive',
          };
        } else {
          where[key] = value;
        }
      });
    }
    
    const orderByClause: any = {};
    if (orderBy) {
      orderByClause[orderBy.field] = orderBy.direction;
    } else {
      orderByClause.createdAt = 'desc';
    }
    
    const [data, total] = await Promise.all([
      model.findMany({
        where,
        orderBy: orderByClause,
        skip,
        take: limit,
      }),
      model.count({ where }),
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

  // Search records
  async search<T>(
    model: any,
    searchTerm: string,
    searchFields: string[],
    filters?: Record<string, any>
  ): Promise<T[]> {
    const searchConditions = searchFields.map(field => ({
      [field]: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    }));
    
    const where: any = {
      OR: searchConditions,
    };
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          where[key] = {
            contains: value,
            mode: 'insensitive',
          };
        } else {
          where[key] = value;
        }
      });
    }
    
    return model.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  // Get statistics
  async getStats(model: any, groupBy?: string): Promise<Record<string, any>> {
    if (groupBy) {
      const stats = await model.groupBy({
        by: [groupBy],
        _count: {
          [groupBy]: true,
        },
      });
      
      const result: Record<string, number> = {};
      stats.forEach((stat: any) => {
        result[stat[groupBy]] = stat._count[groupBy];
      });
      return result;
    }
    
    const total = await model.count();
    return { total };
  },
};

// Specific query utilities for common operations
export const commonQueries = {
  // Get recent records
  async getRecent<T>(
    model: any,
    limit: number = 10,
    filters?: Record<string, any>
  ): Promise<T[]> {
    const where: any = {};
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          where[key] = {
            contains: value,
            mode: 'insensitive',
          };
        } else {
          where[key] = value;
        }
      });
    }
    
    return model.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  },

  // Get records by date range
  async getByDateRange<T>(
    model: any,
    startDate: Date,
    endDate: Date,
    dateField: string = 'createdAt',
    filters?: Record<string, any>
  ): Promise<T[]> {
    const where: any = {
      [dateField]: {
        gte: startDate,
        lte: endDate,
      },
    };
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          where[key] = {
            contains: value,
            mode: 'insensitive',
          };
        } else {
          where[key] = value;
        }
      });
    }
    
    return model.findMany({
      where,
      orderBy: {
        [dateField]: 'desc',
      },
    });
  },

  // Get records with relations
  async findWithRelations<T>(
    model: any,
    relations: { include: any },
    filters?: Record<string, any>
  ): Promise<T[]> {
    const where: any = {};
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === 'string' && value.includes('%')) {
          where[key] = {
            contains: value,
            mode: 'insensitive',
          };
        } else {
          where[key] = value;
        }
      });
    }
    
    return model.findMany({
      where,
      include: relations.include,
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  // Soft delete (if model has deletedAt field)
  async softDelete(model: any, id: string): Promise<void> {
    await model.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },

  // Restore soft deleted record
  async restore(model: any, id: string): Promise<void> {
    await model.update({
      where: { id },
      data: {
        deletedAt: null,
        updatedAt: new Date(),
      },
    });
  },
};
