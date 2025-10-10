import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Create the main AIChatService that implements IAIChatService
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}services/AIChatService.ts',
      template: 'templates/AIChatService.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create AI chat API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/chat/route.ts',
      template: 'templates/api-chat-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/chat/conversations/route.ts',
      template: 'templates/api-conversations-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/chat/messages/route.ts',
      template: 'templates/api-messages-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/chat/analytics/route.ts',
      template: 'templates/api-analytics-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}