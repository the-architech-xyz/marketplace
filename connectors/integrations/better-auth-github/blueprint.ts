/**
 * Better Auth + GitHub Connector Integration Blueprint
 * 
 * Provides OAuth integration between Better Auth and GitHub
 * for Application Authorization (not user authentication)
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const betterAuthGitHubConnectorBlueprint: Blueprint = {
  id: 'better-auth-github-connector-setup',
  name: 'Better Auth + GitHub Connector Integration Setup',
  actions: [
    // Install OAuth dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['jose', 'oauth4webapi']
    },
    
    // Create OAuth configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}/auth/github-oauth-config.ts',
      template: 'templates/github-oauth-config.ts.tpl',
    },
    
    // Create OAuth service
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}/auth/github-oauth-service.ts',
      template: 'templates/github-oauth-service.ts.tpl',
    },
    
    // Create token management service
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}/auth/github-token-manager.ts',
      template: 'templates/github-token-manager.ts.tpl',
    },
    
    // Create API routes for OAuth flow
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}/auth/github/authorize/route.ts',
      template: 'templates/github-authorize-route.ts.tpl',
    },
    
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}/auth/github/callback/route.ts',
      template: 'templates/github-callback-route.ts.tpl',
    },
    
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.api_routes}/auth/github/revoke/route.ts',
      template: 'templates/github-revoke-route.ts.tpl',
    },
    
    // Create GitHub client with OAuth
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}/auth/github-oauth-client.ts',
      template: 'templates/github-oauth-client.ts.tpl',
    },
    
    // Create types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}/auth/github-oauth-types.ts',
      template: 'templates/github-oauth-types.ts.tpl',
    },
    
    // Create main index file
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}/auth/github-oauth-index.ts',
      template: 'templates/github-oauth-index.ts.tpl',
    },
    
    // Add environment variables
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'GITHUB_CLIENT_ID',
      value: '${context..clientId}',
      description: 'GitHub OAuth App Client ID'
    },
    
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'GITHUB_CLIENT_SECRET',
      value: '${context..clientSecret}',
      description: 'GitHub OAuth App Client Secret'
    },
    
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'GITHUB_REDIRECT_URI',
      value: '${context..redirectUri}',
      description: 'GitHub OAuth redirect URI'
    },
    
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'GITHUB_OAUTH_SCOPES',
      value: '${context..scopes}',
      description: 'GitHub OAuth scopes (comma-separated)'
    },
    
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'GITHUB_TOKEN_ENCRYPTION_KEY',
      value: '${context..encryptionKey}',
      description: 'Encryption key for storing GitHub tokens securely'
    }
  ]
};

export default betterAuthGitHubConnectorBlueprint;
