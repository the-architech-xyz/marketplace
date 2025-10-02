/**
 * Users API Service
 * 
 * API service layer for users using Prisma ORM
 * EXTERNAL API IDENTICAL TO DRIZZLE - Features work with ANY database!
 */

import { prisma } from '@/lib/prisma';
import type { User, CreateUserData, UpdateUserData, UserFilters } from '@/types/api';

export const usersApi = {
  // Get all users with optional filters
  async getAll(filters?: UserFilters): Promise<User[]> {
    const where: any = {};
    
    if (filters) {
      if (filters.role) {
        where.role = filters.role;
      }
      
      if (filters.status) {
        where.status = filters.status;
      }
      
      if (filters.search) {
        where.OR = [
          {
            name: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
        ];
      }
    }
    
    const users = await prisma.user.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return users;
  },

  // Get user by ID
  async getById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    
    return user;
  },

  // Get current user (placeholder - implement based on your auth system)
  async getCurrent(): Promise<User> {
    // This should be implemented based on your authentication system
    // For now, return a placeholder
    throw new Error('getCurrent not implemented - integrate with your auth system');
  },

  // Create new user
  async create(data: CreateUserData): Promise<User> {
    const user = await prisma.user.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    return user;
  },

  // Update user
  async update(id: string, data: UpdateUserData): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    
    return user;
  },

  // Delete user
  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  },

  // Update user profile (placeholder - implement based on your auth system)
  async updateProfile(data: UpdateUserData): Promise<User> {
    // This should be implemented based on your authentication system
    // For now, return a placeholder
    throw new Error('updateProfile not implemented - integrate with your auth system');
  },

  // Change user password (placeholder - implement based on your auth system)
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    // This should be implemented based on your authentication system
    // For now, return a placeholder
    throw new Error('changePassword not implemented - integrate with your auth system');
  },

  // Search users
  async search(query: string): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return users;
  },

  // Get users by role
  async getByRole(role: string): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: { role },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return users;
  },

  // Get user statistics
  async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    roles: { [key: string]: number };
  }> {
    const [total, active, inactive, roleStats] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'active' } }),
      prisma.user.count({ where: { status: 'inactive' } }),
      prisma.user.groupBy({
        by: ['role'],
        _count: {
          role: true,
        },
      }),
    ]);
    
    const roles = roleStats.reduce((acc, stat) => {
      acc[stat.role] = stat._count.role;
      return acc;
    }, {} as { [key: string]: number });
    
    return {
      total,
      active,
      inactive,
      roles,
    };
  },

  // Get user permissions (placeholder - implement based on your auth system)
  async getPermissions(userId: string): Promise<string[]> {
    // This should be implemented based on your authentication system
    // For now, return a placeholder
    throw new Error('getPermissions not implemented - integrate with your auth system');
  },
};
