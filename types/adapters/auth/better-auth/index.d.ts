/**
 * Better Auth
 * 
 * Modern authentication library for TypeScript
 */

export interface AuthBetterAuthParams {

  /** Authentication providers to enable */
  providers?: string[];

  /** Session management strategy */
  session?: any;

  /** Enable CSRF protection */
  csrf?: boolean;

  /** Enable rate limiting */
  rateLimit?: boolean;
}

export interface AuthBetterAuthFeatures {}

// 🚀 Auto-discovered artifacts
export declare const AuthBetterAuthArtifacts: {
  creates: [
    '{{paths.auth_config}}/config.ts',
    '{{paths.auth_config}}/api.ts',
    '{{paths.auth_config}}/client.ts',
    '{{paths.auth_config}}/INTEGRATION_GUIDE.md'
  ],
  enhances: [],
  installs: [
    { packages: ['better-auth'], isDev: false }
  ],
  envVars: [
    { key: 'AUTH_SECRET', value: 'your-secret-key-here', description: 'Better Auth secret key' },
    { key: 'AUTH_URL', value: '{{env.APP_URL}}', description: 'Authentication base URL' },
    { key: 'DATABASE_URL', value: 'postgresql://username:password@localhost:5432/{{project.name}}', description: 'Database connection string (if using Drizzle)' }
  ]
};

// Type-safe artifact access
export type AuthBetterAuthCreates = typeof AuthBetterAuthArtifacts.creates[number];
export type AuthBetterAuthEnhances = typeof AuthBetterAuthArtifacts.enhances[number];
