import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/ai-chat/backend/nextjs'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  return [
    // Create AI chat API routes - BACKEND API (resolves to apps.api.routes or apps.web.app/api)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.backend.api}chat/route.ts',
      template: 'templates/api-chat-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.backend.api}chat/conversations/route.ts',
      template: 'templates/api-conversations-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.backend.api}chat/messages/route.ts',
      template: 'templates/api-messages-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.backend.api}chat/analytics/route.ts',
      template: 'templates/api-analytics-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}