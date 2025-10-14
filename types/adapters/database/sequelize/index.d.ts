/**
 * Sequelize ORM
 * 
 * Promise-based Node.js ORM for PostgreSQL, MySQL, MariaDB, SQLite and Microsoft SQL Server
 */

export interface DatabaseSequelizeParams {

  /** Database host */
  host?: string;

  /** Database port */
  port?: number;

  /** Database username */
  username?: string;

  /** Database password */
  password?: string;

  /** Database name */
  databaseName?: string;

  /** Enable SQL logging */
  logging?: boolean;

  /** Enable connection pooling */
  pool?: boolean;

  /** Database type */
  databaseType?: 'postgresql' | 'mysql' | 'sqlite' | 'mariadb' | 'mssql';
}

export interface DatabaseSequelizeFeatures {}

// 🚀 Auto-discovered artifacts
export declare const DatabaseSequelizeArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type DatabaseSequelizeCreates = typeof DatabaseSequelizeArtifacts.creates[number];
export type DatabaseSequelizeEnhances = typeof DatabaseSequelizeArtifacts.enhances[number];
