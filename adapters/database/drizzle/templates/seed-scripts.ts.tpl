/**
 * Database Seeding Scripts
 * 
 * Simple database seeding utilities for development and testing
 */

import { db } from './db';
import { users, posts, categories } from './schema';

/**
 * Seed the database with sample data
 */
export async function seedDatabase() {
  console.log('🌱 Seeding database...');
  
  try {
    // Seed categories
    const category1 = await db.insert(categories).values({
      name: 'Technology',
      description: 'Tech-related posts',
      slug: 'technology',
    }).returning();
    
    const category2 = await db.insert(categories).values({
      name: 'Design',
      description: 'Design-related posts',
      slug: 'design',
    }).returning();

    // Seed users
    const user1 = await db.insert(users).values({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
    }).returning();
    
    const user2 = await db.insert(users).values({
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'admin',
    }).returning();

    // Seed posts
    await db.insert(posts).values({
      title: 'Welcome to our platform',
      content: 'This is a sample post to get you started.',
      authorId: user1[0].id,
      categoryId: category1[0].id,
      published: true,
    });
    
    await db.insert(posts).values({
      title: 'Design principles',
      content: 'Here are some key design principles to follow.',
      authorId: user2[0].id,
      categoryId: category2[0].id,
      published: true,
    });

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

/**
 * Clear all data from the database
 */
export async function clearDatabase() {
  console.log('🧹 Clearing database...');
  
  try {
    await db.delete(posts);
    await db.delete(users);
    await db.delete(categories);
    
    console.log('✅ Database cleared successfully');
  } catch (error) {
    console.error('❌ Clearing failed:', error);
    throw error;
  }
}

/**
 * Reset database (clear + seed)
 */
export async function resetDatabase() {
  await clearDatabase();
  await seedDatabase();
}
