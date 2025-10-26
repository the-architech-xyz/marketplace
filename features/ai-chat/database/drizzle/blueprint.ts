/**
 * AI Chat Database Layer Blueprint (Drizzle)
 * 
 * Database schema for AI chat conversations, messages, prompts, and usage tracking.
 * Independent of AI provider (OpenAI, Anthropic, Google, etc.)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/ai-chat/database/drizzle'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);

  return [
    // Database schema
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/db/schema/ai-chat.ts',
      template: 'templates/schema.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Database migrations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/db/migrations/001_ai_chat.sql',
      template: 'templates/migration.sql.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
  ];
}


