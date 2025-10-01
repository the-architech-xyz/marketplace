/**
 * Drizzle ORM
 * 
 * TypeScript ORM with excellent developer experience
 */

export interface DatabaseDrizzleParams {

  /** Database provider */
  provider?: string;

  /** Enable database migrations */
  migrations?: boolean;

  /** Enable Drizzle Studio */
  studio?: boolean;

  /** Database type to use */
  databaseType: string;
}

export interface DatabaseDrizzleFeatures {}

// 🚀 Auto-discovered artifacts
export declare const DatabaseDrizzleArtifacts: {
  creates: [
    'src/lib/db/index.ts',
    'src/lib/db/schema.ts',
    'drizzle.config.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['drizzle-orm', 'pg'], isDev: false },
    { packages: ['drizzle-kit', '@types/pg'], isDev: true }
  ],
  envVars: [
    { key: 'DATABASE_URL', value: 'postgresql://username:password@localhost:5432/{{project.name}}', description: 'Database connection string' }
  ]
};

// Type-safe artifact access
export type DatabaseDrizzleCreates = typeof DatabaseDrizzleArtifacts.creates[number];
export type DatabaseDrizzleEnhances = typeof DatabaseDrizzleArtifacts.enhances[number];
