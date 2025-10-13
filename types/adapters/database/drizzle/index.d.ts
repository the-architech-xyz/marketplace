/**
 * Drizzle ORM
 * 
 * TypeScript ORM with excellent developer experience
 */

export interface DatabaseDrizzleParams {

  /** Database provider */
  provider?: any;

  /** Database type to use */
  databaseType?: any;
  /** Constitutional Architecture features configuration */
  features?: {

    /** Essential database functionality (schema, queries, types) */
    core?: boolean;

    /** Database schema migrations and versioning */
    migrations?: boolean;

    /** Visual database browser and query interface */
    studio?: boolean;

    /** Advanced relationship management and queries */
    relations?: boolean;

    /** Data seeding and fixtures management */
    seeding?: boolean;
  };
}

export interface DatabaseDrizzleFeatures {

  /** Essential database functionality (schema, queries, types) */
  core: boolean;

  /** Database schema migrations and versioning */
  migrations: boolean;

  /** Visual database browser and query interface */
  studio: boolean;

  /** Advanced relationship management and queries */
  relations: boolean;

  /** Data seeding and fixtures management */
  seeding: boolean;
}

// 🚀 Auto-discovered artifacts
export declare const DatabaseDrizzleArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type DatabaseDrizzleCreates = typeof DatabaseDrizzleArtifacts.creates[number];
export type DatabaseDrizzleEnhances = typeof DatabaseDrizzleArtifacts.enhances[number];
