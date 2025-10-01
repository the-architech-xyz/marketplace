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
  databaseName: string;

  /** Enable SQL logging */
  logging?: boolean;

  /** Enable connection pooling */
  pool?: boolean;

  /** Database type */
  databaseType: string;
}

export interface DatabaseSequelizeFeatures {}

// 🚀 Auto-discovered artifacts
export declare const DatabaseSequelizeArtifacts: {
  creates: [
    '{{paths.database_config}}/sequelize.ts',
    '{{paths.database_config}}/index.ts',
    '.sequelizerc'
  ],
  enhances: [],
  installs: [
    { packages: ['sequelize', '{{module.parameters.databaseType}}'], isDev: false },
    { packages: ['sequelize-cli', '@types/sequelize'], isDev: true }
  ],
  envVars: [
    { key: 'DB_HOST', value: '{{module.parameters.host}}', description: 'Database host' },
    { key: 'DB_PORT', value: '{{module.parameters.port}}', description: 'Database port' },
    { key: 'DB_USERNAME', value: '{{module.parameters.username}}', description: 'Database username' },
    { key: 'DB_PASSWORD', value: '{{module.parameters.password}}', description: 'Database password' },
    { key: 'DB_NAME', value: '{{module.parameters.databaseName}}', description: 'Database name' },
    { key: 'DB_LOGGING', value: '{{module.parameters.logging}}', description: 'Sequelize logging' },
    { key: 'DB_POOL', value: '{{module.parameters.pool}}', description: 'Sequelize connection pool' }
  ]
};

// Type-safe artifact access
export type DatabaseSequelizeCreates = typeof DatabaseSequelizeArtifacts.creates[number];
export type DatabaseSequelizeEnhances = typeof DatabaseSequelizeArtifacts.enhances[number];
