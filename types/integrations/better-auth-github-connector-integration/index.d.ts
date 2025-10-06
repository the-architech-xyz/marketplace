/**
 * Better Auth + GitHub Connector Integration
 * 
 * OAuth integration between Better Auth and GitHub for Application Authorization
 */

export interface BetterAuthGithubConnectorIntegrationParams {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const BetterAuthGithubConnectorIntegrationArtifacts: {
  creates: [
    '{{paths.shared_library}}/auth/github-oauth-config.ts',
    '{{paths.shared_library}}/auth/github-oauth-service.ts',
    '{{paths.shared_library}}/auth/github-token-manager.ts',
    '{{paths.api_routes}}/auth/github/authorize/route.ts',
    '{{paths.api_routes}}/auth/github/callback/route.ts',
    '{{paths.api_routes}}/auth/github/revoke/route.ts',
    '{{paths.shared_library}}/auth/github-oauth-client.ts',
    '{{paths.shared_library}}/auth/github-oauth-types.ts',
    '{{paths.shared_library}}/auth/github-oauth-index.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['crypto', 'jose', 'oauth4webapi'], isDev: false }
  ],
  envVars: [
    { key: 'GITHUB_CLIENT_ID', value: '{{module.parameters.clientId}}', description: 'GitHub OAuth App Client ID' },
    { key: 'GITHUB_CLIENT_SECRET', value: '{{module.parameters.clientSecret}}', description: 'GitHub OAuth App Client Secret' },
    { key: 'GITHUB_REDIRECT_URI', value: '{{module.parameters.redirectUri}}', description: 'GitHub OAuth redirect URI' },
    { key: 'GITHUB_OAUTH_SCOPES', value: '{{module.parameters.scopes}}', description: 'GitHub OAuth scopes (comma-separated)' },
    { key: 'GITHUB_TOKEN_ENCRYPTION_KEY', value: '{{module.parameters.encryptionKey}}', description: 'Encryption key for storing GitHub tokens securely' }
  ]
};

// Type-safe artifact access
export type BetterAuthGithubConnectorIntegrationCreates = typeof BetterAuthGithubConnectorIntegrationArtifacts.creates[number];
export type BetterAuthGithubConnectorIntegrationEnhances = typeof BetterAuthGithubConnectorIntegrationArtifacts.enhances[number];
