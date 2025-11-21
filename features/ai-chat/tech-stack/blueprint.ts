/**
 * AI Chat Feature Technology Stack Blueprint
 * 
 * This blueprint automatically adds the technology-agnostic stack layer
 * (types, schemas, hooks, stores) to any AI Chat implementation.
 * 
 * This ensures consistency across all frontend/backend technologies.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/ai-chat/tech-stack'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);
  
  // ============================================================================
  // TECHNOLOGY STACK LAYER DEPENDENCIES
  // ============================================================================
  
  // Install tech-stack layer dependencies
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: [
      'zod',
      '@tanstack/react-query',
      'zustand',
      'immer',
      'sonner'
    ]
  });
  
  // ============================================================================
  // TECHNOLOGY STACK LAYER FILES
  // ============================================================================
  
  // Types - Re-exported from contract (single source of truth)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}ai-chat/types.ts',
    content: `/**
 * AI Chat Types
 * Re-exported from contract for convenience
 */
export type { 
  Message, Conversation, ChatModel, StreamingResponse,
  SendMessageData, CreateConversationData, UploadFileData,
  MessageRole, ConversationStatus, ModelProvider,
  IAIChatService
} from '@/features/ai-chat/contract';
`,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Schemas - Zod validation schemas
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}ai-chat/schemas.ts',
    template: 'templates/schemas.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Hooks - Direct TanStack Query hooks (best practice pattern)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}ai-chat/hooks.ts',
    template: 'templates/hooks.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
  
  // Stores - Zustand state management
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}ai-chat/stores.ts',
    template: 'templates/stores.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // ============================================================================
  // UTILITY FILES
  // ============================================================================
  
  // Index file for easy imports (from template)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.shared.src}ai-chat/index.ts',
    template: 'templates/index.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
  
  return actions;
}
