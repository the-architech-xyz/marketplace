/**
 * Better Auth + Next.js Connector Blueprint
 * 
 * This connector provides COMPLETE Better Auth integration for Next.js:
 * - Server: Better Auth config, API routes, middleware
 * - Client: Better Auth React hooks, client instance
 * - Framework: Next.js specific wiring
 * 
 * This is a CONNECTOR (not adapter or backend feature) because it:
 * - Integrates external SDK (Better Auth)
 * - Wires it into specific framework (Next.js)
 * - Provides complete ready-to-use integration
 * - No custom business logic
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/auth/better-auth-nextjs'>
): BlueprintAction[] {
  const { params, features } = extractTypedModuleParameters(config);

  return [
    // NOTE: No package installation needed - adapter handles 'better-auth' package
    // We only add Next.js specific integration (API routes, middleware, providers)
    
    // Server-side Better Auth config
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/auth/config.ts',
      template: 'templates/config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Client-side Better Auth client
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/auth/client.ts',
      template: 'templates/client.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Better Auth native hooks (OVERWRITES tech-stack fallback)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/auth/hooks.ts',
      template: 'templates/hooks.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2  // Higher than tech-stack (priority: 1)
      }
    },
    
    // Next.js API route
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}api/auth/[...all]/route.ts',
      template: 'templates/auth-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Next.js middleware
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/middleware.ts',
      template: 'templates/middleware.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // React Auth Provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}providers/AuthProvider.tsx',
      template: 'templates/AuthProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

