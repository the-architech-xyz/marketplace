/**
 * Synap Capture Backend Blueprint (Hono)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/synap/capture/backend/hono'>
): BlueprintAction[] {
  return [
    // Thoughts router (Hono route)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.api.routes}routes/thoughts.ts',
      template: 'templates/thoughts-router.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Mount router in main app (this will be imported in app.ts)
    // Note: The app.ts template already has instructions to mount routes
  ];
}

