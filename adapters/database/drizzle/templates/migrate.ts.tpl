/**
 * Database Migration Utilities
 * 
 * Handles database migrations using Drizzle ORM
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { config } from './config.js';

const connection = postgres(config.databaseUrl, { max: 1 });
const db = drizzle(connection);

export async function runMigrations() {
  try {
    console.log('🔄 Running database migrations...');
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Database migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Run migrations if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations().catch(console.error);
}
