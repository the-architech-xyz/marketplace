/**
 * AI Chat Feature Technology Stack Blueprint
 * 
 * This blueprint automatically adds the technology-agnostic stack layer
 * (types, schemas, hooks, stores) to any AI Chat implementation.
 * 
 * This ensures consistency across all frontend/backend technologies.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import {
  TypedMergedConfiguration,
  extractTypedModuleParameters,
} from "blueprint-config-types";

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
    path: '{{paths.lib}}/ai-chat/types.ts',
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
    path: '{{paths.lib}}/ai-chat/schemas.ts',
    template: 'templates/schemas.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Service - Cohesive Services (wraps backend with TanStack Query)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '{{paths.lib}}/ai-chat/AIChatService.ts',
    template: 'templates/AIChatService.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
  
  // Stores - Zustand state management
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '{{paths.lib}}/ai-chat/stores.ts',
    template: 'templates/stores.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // ============================================================================
  // UTILITY FILES
  // ============================================================================
  
  // Index file for easy imports
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '{{paths.lib}}/ai-chat/index.ts',
    content: `/**
 * AI Chat Feature - Tech Stack Layer
 * 
 * This module provides the client-side abstraction layer for AI chat.
 * Import the AIChatService to access all AI chat operations.
 */

// Re-export types from contract
export * from './types';

// Re-export schemas for validation
export * from './schemas';

// Re-export Zustand stores
export * from './stores';

// Export the main Cohesive Service
export { AIChatService } from './AIChatService';
`,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
  
  return actions;
}
