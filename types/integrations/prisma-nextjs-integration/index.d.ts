/**
 * Prisma Next.js Integration
 * 
 * Complete Prisma ORM integration for Next.js with API routes, middleware, and database utilities
 */

export interface PrismaNextjsIntegrationParams {

  /** Database API routes for health checks, migrations, and seeding */
  apiRoutes: boolean;

  /** Database connection middleware and error handling */
  middleware: boolean;

  /** Pre-built query utilities and helpers */
  queries: boolean;

  /** Transaction management and utilities */
  transactions: boolean;

  /** Database migration management and utilities */
  migrations: boolean;

  /** Database seeding utilities and sample data */
  seeding: boolean;

  /** Database schema validation utilities */
  validators: boolean;

  /** Database administration interface */
  adminPanel: boolean;

  /** Database health monitoring and status checks */
  healthChecks: boolean;

  /** Database connection pooling and management */
  connectionPooling: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const PrismaNextjsIntegrationArtifacts: {
  creates: [
    'prisma/schema.prisma',
    'src/lib/prisma.ts',
    'src/hooks/use-products.ts',
    'src/hooks/use-users.ts',
    'src/hooks/use-posts.ts',
    'src/hooks/use-query.ts',
    'src/hooks/use-mutation.ts',
    'src/lib/api/products.ts',
    'src/lib/api/users.ts',
    'src/lib/api/posts.ts',
    'src/app/api/products/route.ts',
    'src/app/api/products/[id]/route.ts',
    'src/app/api/users/route.ts',
    'src/app/api/users/[id]/route.ts',
    'src/app/api/posts/route.ts',
    'src/app/api/posts/[id]/route.ts',
    'src/lib/db/queries.ts',
    'src/lib/db/mutations.ts',
    'src/types/api.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['prisma', '@prisma/client'], isDev: false }
  ],
  envVars: []
};

// Type-safe artifact access
export type PrismaNextjsIntegrationCreates = typeof PrismaNextjsIntegrationArtifacts.creates[number];
export type PrismaNextjsIntegrationEnhances = typeof PrismaNextjsIntegrationArtifacts.enhances[number];
