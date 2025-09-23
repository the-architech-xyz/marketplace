/**
     * Generated TypeScript definitions for Prisma ORM
     * Generated from: adapters/database/prisma/adapter.json
     */

/**
     * Parameters for the Prisma ORM adapter
     */
export interface PrismaDatabaseParams {
  /**
   * Database provider
   */
  provider: string;
  /**
   * Enable Prisma Studio
   */
  studio?: boolean;
  /**
   * Enable database migrations
   */
  migrations?: boolean;
  /**
   * Database type
   */
  databaseType: string;
}

/**
     * Features for the Prisma ORM adapter
     */
export interface PrismaDatabaseFeatures {
  /**
   * Advanced schema management with Prisma schema and migrations
   */
  schema-management?: boolean;
  /**
   * Advanced query building and optimization tools
   */
  query-optimization?: boolean;
  /**
   * Database management interface and admin tools
   */
  studio-integration?: boolean;
}
