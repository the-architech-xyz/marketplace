import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// Database connection for Neon (Serverless PostgreSQL)
const connectionString = process.env.DATABASE_URL!;
const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

// Export schema for use in other files
export * from './schema';



