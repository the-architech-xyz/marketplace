/**
 * Prisma ORM
 * 
 * Next-generation ORM for Node.js and TypeScript
 */

export interface DatabasePrismaParams {

  /** Database provider */
  provider: string;

  /** Enable Prisma Studio */
  studio?: boolean;

  /** Enable database migrations */
  migrations?: boolean;

  /** Database type */
  databaseType: string;
}

export interface DatabasePrismaFeatures {}

// 🚀 Auto-discovered artifacts
export declare const DatabasePrismaArtifacts: {
  creates: [
    '{{paths.database_config}}/prisma.ts',
    'prisma/schema.prisma'
  ],
  enhances: [],
  installs: [
    { packages: ['prisma', '@prisma/client'], isDev: false }
  ],
  envVars: []
};

// Type-safe artifact access
export type DatabasePrismaCreates = typeof DatabasePrismaArtifacts.creates[number];
export type DatabasePrismaEnhances = typeof DatabasePrismaArtifacts.enhances[number];
