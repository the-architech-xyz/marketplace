/**
 * Database Mutations
 * 
 * Prisma ORM mutation utilities for common operations
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { prisma } from '@/lib/prisma';

// Generic mutation utilities
export const dbMutations = {
  // Create record
  async create<T>(model: any, data: any): Promise<T> {
    const result = await model.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    return result;
  },

  // Update record
  async update<T>(model: any, id: string, data: any): Promise<T> {
    const result = await model.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    
    return result;
  },

  // Delete record
  async delete(model: any, id: string): Promise<void> {
    await model.delete({
      where: { id },
    });
  },

  // Bulk create
  async bulkCreate<T>(model: any, data: any[]): Promise<T[]> {
    const result = await model.createMany({
      data: data.map(item => ({
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    });
    
    return result;
  },

  // Bulk update
  async bulkUpdate<T>(model: any, ids: string[], data: any): Promise<T[]> {
    const result = await model.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    
    return result;
  },

  // Bulk delete
  async bulkDelete(model: any, ids: string[]): Promise<void> {
    await model.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  },

  // Upsert record
  async upsert<T>(model: any, where: any, create: any, update: any): Promise<T> {
    const result = await model.upsert({
      where,
      create: {
        ...create,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        ...update,
        updatedAt: new Date(),
      },
    });
    
    return result;
  },
};

// Specific mutation utilities for common operations
export const commonMutations = {
  // Create with relations
  async createWithRelations<T>(
    model: any,
    data: any,
    relations: { include: any }
  ): Promise<T> {
    const result = await model.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: relations.include,
    });
    
    return result;
  },

  // Update with relations
  async updateWithRelations<T>(
    model: any,
    id: string,
    data: any,
    relations: { include: any }
  ): Promise<T> {
    const result = await model.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: relations.include,
    });
    
    return result;
  },

  // Create or update
  async createOrUpdate<T>(
    model: any,
    where: any,
    data: any
  ): Promise<T> {
    const result = await model.upsert({
      where,
      create: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        ...data,
        updatedAt: new Date(),
      },
    });
    
    return result;
  },

  // Increment field
  async increment<T>(
    model: any,
    id: string,
    field: string,
    value: number = 1
  ): Promise<T> {
    const result = await model.update({
      where: { id },
      data: {
        [field]: {
          increment: value,
        },
        updatedAt: new Date(),
      },
    });
    
    return result;
  },

  // Decrement field
  async decrement<T>(
    model: any,
    id: string,
    field: string,
    value: number = 1
  ): Promise<T> {
    const result = await model.update({
      where: { id },
      data: {
        [field]: {
          decrement: value,
        },
        updatedAt: new Date(),
      },
    });
    
    return result;
  },

  // Toggle boolean field
  async toggle<T>(
    model: any,
    id: string,
    field: string
  ): Promise<T> {
    const current = await model.findUnique({
      where: { id },
      select: { [field]: true },
    });
    
    const result = await model.update({
      where: { id },
      data: {
        [field]: !current[field],
        updatedAt: new Date(),
      },
    });
    
    return result;
  },

  // Set field value
  async setField<T>(
    model: any,
    id: string,
    field: string,
    value: any
  ): Promise<T> {
    const result = await model.update({
      where: { id },
      data: {
        [field]: value,
        updatedAt: new Date(),
      },
    });
    
    return result;
  },
};
