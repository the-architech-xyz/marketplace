/**
 * Better Auth Tech-Stack Override Blueprint
 * 
 * This overrides the standard tech-stack hooks with Better Auth SDK hooks.
 * These hooks are FRAMEWORK AGNOSTIC - they work with Next.js, Remix, Expo, etc.
 * 
 * Priority: 2 (overwrites standard tech-stack priority: 1)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration } from '../../../../types/blueprint-config-types';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/auth/tech-stack/overrides/better-auth'>
): BlueprintAction[] {
  return [
    // Install Better Auth React package
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['better-auth']
    },
    
    // Better Auth Client (framework agnostic)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/auth/client.ts',
      template: 'templates/client.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2  // Overwrites standard (priority: 1)
      }
    },
    
    // Better Auth Hooks (framework agnostic)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/auth/hooks.ts',
      template: 'templates/hooks.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2  // Overwrites standard tech-stack hooks (priority: 1)
      }
    }
  ];
}


