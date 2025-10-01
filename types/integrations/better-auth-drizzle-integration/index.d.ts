/**
 * Better Auth Drizzle Integration
 * 
 * Complete Drizzle ORM integration for Better Auth with database schema and adapter
 */

export interface BetterAuthDrizzleIntegrationParams {

  /** Drizzle schema for users, sessions, and accounts tables */
  userSchema: boolean;

  /** Drizzle adapter implementation for Better Auth */
  adapterLogic: boolean;

  /** SQL migrations for auth tables */
  migrations: boolean;

  /** Performance indexes for auth queries */
  indexes: boolean;

  /** Sample data for development and testing */
  seedData: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const BetterAuthDrizzleIntegrationArtifacts: {
  creates: [],
  enhances: [
    { path: 'src/lib/db/schema.ts' },
    { path: 'src/lib/auth/config.ts' },
    { path: 'src/lib/auth/config.ts' }
  ],
  installs: [
    { packages: ['better-auth'], isDev: false }
  ],
  envVars: [
    { key: 'GOOGLE_CLIENT_ID', value: 'your-google-client-id', description: 'Google OAuth client ID' },
    { key: 'GOOGLE_CLIENT_SECRET', value: 'your-google-client-secret', description: 'Google OAuth client secret' },
    { key: 'GITHUB_CLIENT_ID', value: 'your-github-client-id', description: 'GitHub OAuth client ID' },
    { key: 'GITHUB_CLIENT_SECRET', value: 'your-github-client-secret', description: 'GitHub OAuth client secret' }
  ]
};

// Type-safe artifact access
export type BetterAuthDrizzleIntegrationCreates = typeof BetterAuthDrizzleIntegrationArtifacts.creates[number];
export type BetterAuthDrizzleIntegrationEnhances = typeof BetterAuthDrizzleIntegrationArtifacts.enhances[number];
