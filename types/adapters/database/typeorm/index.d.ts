/**
     * Generated TypeScript definitions for TypeORM
     * Generated from: adapters/database/typeorm/adapter.json
     */

/**
     * Parameters for the TypeORM adapter
     */
export interface TypeormDatabaseParams {
  /**
   * Enable schema synchronization
   */
  synchronize?: boolean;
  /**
   * Enable query logging
   */
  logging?: boolean;
  /**
   * Database type
   */
  databaseType: string;
}

/**
     * Features for the TypeORM adapter
     */
export interface TypeormDatabaseFeatures {
  /**
   * Advanced entity management with decorators and relationships
   */
  entity-management?: boolean;
  /**
   * Database migrations and schema versioning
   */
  migration-system?: boolean;
  /**
   * Advanced query building and optimization tools
   */
  query-builder?: boolean;
}
