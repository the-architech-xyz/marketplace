/**
 * Drizzle Database Client (SQLite)
 * 
 * SQLite database connection using better-sqlite3.
 * Perfect for local development and prototyping - zero configuration!
 */

import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// SQLite database file path
const dbPath = process.env.DATABASE_PATH || './local.db';
const sqlite = new Database(dbPath);

// Enable foreign keys (SQLite requires explicit enablement)
sqlite.pragma('foreign_keys = ON');

export const db = drizzle(sqlite, { schema });

// Export schema for use in other files
export * from './schema';

