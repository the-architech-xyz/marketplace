/**
 * TypeORM
 * 
 * TypeScript ORM for Node.js with decorators and migrations
 */

export interface DatabaseTypeormParams {

  /** Enable schema synchronization */
  synchronize?: boolean;

  /** Enable query logging */
  logging?: boolean;

  /** Database type */
  databaseType: string;
}

export interface DatabaseTypeormFeatures {}

// 🚀 Auto-discovered artifacts
export declare const DatabaseTypeormArtifacts: {
  creates: [
    '{{paths.database_config}}/typeorm.ts',
    '{{paths.database_config}}/entities/User.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['typeorm', 'reflect-metadata', '{{module.parameters.databaseType}}'], isDev: false }
  ],
  envVars: []
};

// Type-safe artifact access
export type DatabaseTypeormCreates = typeof DatabaseTypeormArtifacts.creates[number];
export type DatabaseTypeormEnhances = typeof DatabaseTypeormArtifacts.enhances[number];
