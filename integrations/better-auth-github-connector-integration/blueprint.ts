/**
 * Better Auth + GitHub Connector Integration Blueprint
 * 
 * Provides OAuth integration between Better Auth and GitHub
 * for Application Authorization (not user authentication)
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const betterAuthGitHubConnectorBlueprint: Blueprint = {
  id: 'better-auth-github-connector-setup',
  name: 'Better Auth + GitHub Connector Integration Setup',
  actions: [
    // Install OAuth dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: ['crypto', 'jose', 'oauth4webapi']
    },
    
    // Create OAuth configuration
    {
      type: 'CREATE_FILE',
      path: '{{paths.shared_library}}/auth/github-oauth-config.ts',
      template: 'templates/github-oauth-config.ts.tpl'
    },
    
    // Create OAuth service
    {
      type: 'CREATE_FILE',
      path: '{{paths.shared_library}}/auth/github-oauth-service.ts',
      template: 'templates/github-oauth-service.ts.tpl'
    },
    
    // Create token management service
    {
      type: 'CREATE_FILE',
      path: '{{paths.shared_library}}/auth/github-token-manager.ts',
      template: 'templates/github-token-manager.ts.tpl'
    },
    
    // Create API routes for OAuth flow
    {
      type: 'CREATE_FILE',
      path: '{{paths.api_routes}}/auth/github/authorize/route.ts',
      template: 'templates/github-authorize-route.ts.tpl'
    },
    
    {
      type: 'CREATE_FILE',
      path: '{{paths.api_routes}}/auth/github/callback/route.ts',
      template: 'templates/github-callback-route.ts.tpl'
    },
    
    {
      type: 'CREATE_FILE',
      path: '{{paths.api_routes}}/auth/github/revoke/route.ts',
      template: 'templates/github-revoke-route.ts.tpl'
    },
    
    // Create GitHub client with OAuth
    {
      type: 'CREATE_FILE',
      path: '{{paths.shared_library}}/auth/github-oauth-client.ts',
      template: 'templates/github-oauth-client.ts.tpl'
    },
    
    // Create types
    {
      type: 'CREATE_FILE',
      path: '{{paths.shared_library}}/auth/github-oauth-types.ts',
      template: 'templates/github-oauth-types.ts.tpl'
    },
    
    // Create main index file
    {
      type: 'CREATE_FILE',
      path: '{{paths.shared_library}}/auth/github-oauth-index.ts',
      template: 'templates/github-oauth-index.ts.tpl'
    },
    
    // Add environment variables
    {
      type: 'ADD_ENV_VAR',
      key: 'GITHUB_CLIENT_ID',
      value: '{{module.parameters.clientId}}',
      description: 'GitHub OAuth App Client ID'
    },
    
    {
      type: 'ADD_ENV_VAR',
      key: 'GITHUB_CLIENT_SECRET',
      value: '{{module.parameters.clientSecret}}',
      description: 'GitHub OAuth App Client Secret'
    },
    
    {
      type: 'ADD_ENV_VAR',
      key: 'GITHUB_REDIRECT_URI',
      value: '{{module.parameters.redirectUri}}',
      description: 'GitHub OAuth redirect URI'
    },
    
    {
      type: 'ADD_ENV_VAR',
      key: 'GITHUB_OAUTH_SCOPES',
      value: '{{module.parameters.scopes}}',
      description: 'GitHub OAuth scopes (comma-separated)'
    },
    
    {
      type: 'ADD_ENV_VAR',
      key: 'GITHUB_TOKEN_ENCRYPTION_KEY',
      value: '{{module.parameters.encryptionKey}}',
      description: 'Encryption key for storing GitHub tokens securely'
    }
  ]
};

export default betterAuthGitHubConnectorBlueprint;
