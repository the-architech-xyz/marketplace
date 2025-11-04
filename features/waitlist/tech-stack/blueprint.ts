/**
 * Waitlist Feature Technology Stack Blueprint
 * 
 * This blueprint automatically adds the technology-agnostic stack layer
 * (types, schemas, hooks, stores) to any Waitlist implementation.
 * 
 * This ensures consistency across all frontend/backend technologies.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/waitlist/tech-stack'>
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
    path: '${paths.lib}/waitlist/types.ts',
    content: `/**
 * Waitlist Types
 * Re-exported from contract for convenience
 */
export type { 
  WaitlistUser, WaitlistReferral, WaitlistStats,
  JoinWaitlistData, UpdateWaitlistUserData,
  JoinWaitlistResult, GetWaitlistUserResult,
  WaitlistFilters, WaitlistConfig,
  WaitlistStatus, ReferralSource,
  IWaitlistService, WaitlistError
} from '@/features/waitlist/contract';
`,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Schemas - Zod validation schemas
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/waitlist/schemas.ts',
    template: 'templates/schemas.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Hooks - Direct TanStack Query hooks (best practice pattern)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/waitlist/hooks.ts',
    template: 'templates/hooks.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
  
  // Stores - Zustand state management
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/waitlist/stores.ts',
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
    path: '${paths.lib}/waitlist/index.ts',
    template: 'templates/index.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
  
  return actions;
}


