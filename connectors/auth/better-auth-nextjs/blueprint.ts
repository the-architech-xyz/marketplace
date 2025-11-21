/**
 * Better Auth + Next.js Connector Blueprint
 * 
 * This connector provides Next.js-SPECIFIC Better Auth integration:
 * - Server: Next.js config with nextCookies plugin
 * - API Routes: Next.js API route handler
 * - Middleware: Next.js middleware for auth
 * - Provider: React provider for client-side
 * 
 * ARCHITECTURE NOTE:
 * - Hooks and client are in tech-stack/overrides/better-auth (framework agnostic)
 * - This connector only handles Next.js-specific wiring
 * - Easy to add better-auth-remix, better-auth-expo, etc.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/auth/better-auth-nextjs'>
): BlueprintAction[] {
  const { params, features } = extractTypedModuleParameters(config);

  return [
    // NOTE: Better Auth package installed by tech-stack override
    // We only add Next.js specific integration
    
    // Server-side Next.js config (nextCookies plugin)
    // Use packages.auth.src (from recipe book targetPackage: "auth")
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.auth.src}config.ts',
      template: 'templates/config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 3  // Higher than tech-stack override (priority: 2)
      }
    },
    
    // Next.js API route handler - WEB-ONLY (Next.js API routes are web-specific)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.app}api/auth/[...all]/route.ts',
      template: 'templates/auth-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 3
      }
    },
    
    // Next.js middleware for auth - WEB-ONLY (Next.js middleware is web-specific)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.middleware}middleware.ts',
      template: 'templates/middleware.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 3
      }
    },
    
    // React Auth Provider (client-side) - semantic category
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.frontend.components}providers/AuthProvider.tsx',
      template: 'templates/AuthProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 3
      }
    }
  ];
}

