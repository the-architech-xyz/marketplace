/**
 * Drizzle Next.js Integration
 * 
 * Complete Drizzle ORM integration for Next.js with API routes, middleware, and database utilities
 */

export interface DrizzleNextjsIntegrationParams {

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
export declare const DrizzleNextjsIntegrationArtifacts: {
  creates: [
    'src/app/api/db/migrate/route.ts',
    'src/app/api/db/seed/route.ts'
  ],
  enhances: [
    { path: 'src/lib/db/index.ts' }
  ],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type DrizzleNextjsIntegrationCreates = typeof DrizzleNextjsIntegrationArtifacts.creates[number];
export type DrizzleNextjsIntegrationEnhances = typeof DrizzleNextjsIntegrationArtifacts.enhances[number];
