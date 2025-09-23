/**
     * Generated TypeScript definitions for Drizzle ORM
     * Generated from: adapters/database/drizzle/adapter.json
     */

/**
     * Parameters for the Drizzle ORM adapter
     */
export interface DrizzleDatabaseParams {
  /**
   * Database provider
   */
  provider?: string;
  /**
   * Enable database migrations
   */
  migrations?: boolean;
  /**
   * Enable Drizzle Studio
   */
  studio?: boolean;
  /**
   * Database type to use
   */
  databaseType: string;
}

/**
     * Features for the Drizzle ORM adapter
     */
export interface DrizzleDatabaseFeatures {
  /**
   * Automated database schema migrations and versioning
   */
  migrations?: boolean;
  /**
   * Visual database browser and query interface
   */
  studio?: boolean;
  /**
   * Advanced relationship management and queries
   */
  relations?: boolean;
  /**
   * Data seeding and fixtures management
   */
  seeding?: boolean;
}
