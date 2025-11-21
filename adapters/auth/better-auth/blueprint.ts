/**
 * Better Auth Adapter Blueprint
 * 
 * Universal Better Auth SDK configuration (framework-agnostic).
 * Connectors wire this to specific frameworks (Next.js, Express, SvelteKit, etc.)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'auth/better-auth'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const actions: BlueprintAction[] = [];

  // Install Better Auth SDK
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['better-auth']
  });

  // Environment variables
  actions.push(
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'BETTER_AUTH_SECRET',
      value: 'your-secret-key-change-in-production',
      description: 'Better Auth secret key for JWT signing'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'BETTER_AUTH_URL',
      value: 'http://localhost:3000',
      description: 'Better Auth base URL'
    }
  );

  // OAuth provider env vars
  if (params.oauthProviders?.includes('google')) {
    actions.push(
      {
        type: BlueprintActionType.ADD_ENV_VAR,
        key: 'GOOGLE_CLIENT_ID',
        value: 'your-google-client-id',
        description: 'Google OAuth Client ID'
      },
      {
        type: BlueprintActionType.ADD_ENV_VAR,
        key: 'GOOGLE_CLIENT_SECRET',
        value: 'your-google-client-secret',
        description: 'Google OAuth Client Secret'
      }
    );
  }

  if (params.oauthProviders?.includes('github')) {
    actions.push(
      {
        type: BlueprintActionType.ADD_ENV_VAR,
        key: 'GITHUB_CLIENT_ID',
        value: 'your-github-client-id',
        description: 'GitHub OAuth Client ID'
      },
      {
        type: BlueprintActionType.ADD_ENV_VAR,
        key: 'GITHUB_CLIENT_SECRET',
        value: 'your-github-client-secret',
        description: 'GitHub OAuth Client Secret'
      }
    );
  }

  // Better Auth server configuration
  // Use packages.auth.src (from recipe book targetPackage: "auth")
  // Renamed to server.ts for generic naming (matches exports)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.auth.src}server.ts',
    template: 'templates/better-auth-config.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });

  // Better Auth client (React)
  // Renamed to client.ts for generic naming (matches exports)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.auth.src}client.ts',
    template: 'templates/better-auth-client.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });

  // Type definitions
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.auth.src}types.ts',
    template: 'templates/types.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });

  return actions;
}

