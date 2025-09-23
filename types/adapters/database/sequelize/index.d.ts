/**
     * Generated TypeScript definitions for Sequelize ORM
     * Generated from: adapters/database/sequelize/adapter.json
     */

/**
     * Parameters for the Sequelize ORM adapter
     */
export interface SequelizeDatabaseParams {
  /**
   * Database host
   */
  host?: string;
  /**
   * Database port
   */
  port?: number;
  /**
   * Database username
   */
  username?: string;
  /**
   * Database password
   */
  password?: string;
  /**
   * Database name
   */
  databaseName: string;
  /**
   * Enable SQL logging
   */
  logging?: boolean;
  /**
   * Enable connection pooling
   */
  pool?: boolean;
  /**
   * Database type
   */
  databaseType: string;
}

/**
     * Features for the Sequelize ORM adapter
     */
export interface SequelizeDatabaseFeatures {
  /**
   * Automated database schema migrations and versioning
   */
  migrations?: boolean;
  /**
   * Advanced model relationships and associations
   */
  associations?: boolean;
  /**
   * Advanced query building and optimization tools
   */
  query-optimization?: boolean;
}
