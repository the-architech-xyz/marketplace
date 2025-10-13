/**
 * Sequelize ORM
 * 
 * Promise-based Node.js ORM for PostgreSQL, MySQL, MariaDB, SQLite and Microsoft SQL Server
 */

export interface DatabaseSequelizeParams {

  /** Database host */
  host?: any;

  /** Database port */
  port?: any;

  /** Database username */
  username?: any;

  /** Database password */
  password?: any;

  /** Database name */
  databaseName?: any;

  /** Enable SQL logging */
  logging?: any;

  /** Enable connection pooling */
  pool?: any;

  /** Database type */
  databaseType?: any;
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
