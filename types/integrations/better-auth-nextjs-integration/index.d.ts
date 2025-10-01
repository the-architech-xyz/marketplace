/**
 * Better Auth Next.js Integration
 * 
 * Complete Next.js integration for Better Auth with API routes, middleware, and UI components
 */

export interface BetterAuthNextjsIntegrationParams {

  /** Next.js API routes for authentication endpoints */
  apiRoutes: boolean;

  /** Next.js middleware for authentication and route protection */
  middleware: boolean;

  /** React components for authentication UI */
  uiComponents: string;

  /** Admin API routes for user management */
  adminPanel: boolean;

  /** Email verification API routes and components */
  emailVerification: boolean;

  /** MFA API routes and components */
  mfa: boolean;

  /** Password reset API routes and components */
  passwordReset: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const BetterAuthNextjsIntegrationArtifacts: {
  creates: [
    'src/app/api/auth/[...all]/route.ts',
    'src/middleware.ts',
    'src/components/auth/auth-provider.tsx'
  ],
  enhances: [
    { path: 'src/lib/auth/config.ts' }
  ],
  installs: [],
  envVars: [
    { key: 'BETTER_AUTH_SECRET', value: 'your-secret-key', description: 'Better Auth secret key for JWT signing' },
    { key: 'BETTER_AUTH_URL', value: 'http://localhost:3000', description: 'Better Auth base URL' }
  ]
};

// Type-safe artifact access
export type BetterAuthNextjsIntegrationCreates = typeof BetterAuthNextjsIntegrationArtifacts.creates[number];
export type BetterAuthNextjsIntegrationEnhances = typeof BetterAuthNextjsIntegrationArtifacts.enhances[number];
