/**
 * Database Seeding
 * 
 * Populates the database with initial data
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from './config.js';
import { users, posts } from './schema.js';

const connection = postgres(config.databaseUrl, { max: 1 });
const db = drizzle(connection);

export async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');
    
    // Insert sample users
    const [user1, user2] = await db.insert(users).values([
      {
        id: '1',
        email: 'john@example.com',
        name: 'John Doe',
        createdAt: new Date(),
      },
      {
        id: '2',
        email: 'jane@example.com',
        name: 'Jane Smith',
        createdAt: new Date(),
      },
    ]).returning();

    // Insert sample posts
    await db.insert(posts).values([
      {
        id: '1',
        title: 'Welcome to our platform!',
        content: 'This is the first post on our platform.',
        authorId: user1.id,
        published: true,
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Getting started with Drizzle',
        content: 'Drizzle ORM makes database management easy.',
        authorId: user2.id,
        published: true,
        createdAt: new Date(),
      },
    ]);

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(console.error);
}
