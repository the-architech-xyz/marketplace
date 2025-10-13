/**
 * TypeORM
 * 
 * TypeScript ORM for Node.js with decorators and migrations
 */

export interface DatabaseTypeormParams {

  /** Enable schema synchronization */
  synchronize?: any;

  /** Enable query logging */
  logging?: any;

  /** Database type */
  databaseType?: any;
}

export interface DatabaseTypeormFeatures {}

// 🚀 Auto-discovered artifacts
export declare const DatabaseTypeormArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type DatabaseTypeormCreates = typeof DatabaseTypeormArtifacts.creates[number];
export type DatabaseTypeormEnhances = typeof DatabaseTypeormArtifacts.enhances[number];
