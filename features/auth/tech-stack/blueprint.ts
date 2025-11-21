/**
 * Auth Feature Technology Stack Blueprint
 * 
 * This blueprint automatically adds the technology-agnostic stack layer
 * (types, schemas, hooks, stores) to any Auth implementation.
 * 
 * This ensures consistency across all frontend/backend technologies.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/auth/tech-stack'>
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
    path: '${paths.packages.auth.src}types.ts',
    content: `/**
 * Auth Types
 * Re-exported from contract for convenience
 */
export type { 
  User, Session, ConnectedAccount, TwoFactorSecret, Organization, Team, Member, TeamMember, Invitation, TeamInvitation,
  SignInData, SignUpData, SignInResult, SignUpResult, SessionResult, PasswordResetData, UpdateProfileData,
  AuthStatus, OAuthProvider, SessionStatus, TwoFactorMethod,
  IAuthService
} from '@/features/auth/contract';
`,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Schemas - Zod validation (client-side form validation)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.auth.src}schemas.ts',
    template: 'templates/schemas.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
  
  // Generic fallback hooks (can be overwritten by backend if SDK provides native hooks)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.auth.src}hooks.ts',
    template: 'templates/hooks.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,  // Backend can overwrite
      priority: 1  // Lower than backend's priority: 2
    }
  });
  
  // Stores - Zustand state management (tech-agnostic UI state)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.packages.auth.src}stores.ts',
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
    path: '${paths.packages.auth.src}index.ts',
    content: `/**
 * Auth Feature - Tech Stack Layer
 * 
 * ARCHITECTURE: Tech-Agnostic with Backend Overrides
 * - Exports generic types from contract
 * - Exports Zod schemas for form validation (work with any auth SDK)
 * - Exports UI stores for state management (work with any auth SDK)
 * - Exports hooks (generic OR overwritten by backend)
 * 
 * HOOKS STRATEGY:
 * - Tech-stack provides FALLBACK fetch-based hooks (priority: 1)
 * - Backend can OVERWRITE with SDK-native hooks (priority: 2)
 * - Frontend always imports from '@/lib/auth' and gets the right hooks!
 * 
 * Examples:
 * - Better Auth backend → overwrites with authClient.useSession()
 * - Supabase backend → overwrites with Supabase hooks
 * - Custom REST API → uses these generic fetch hooks
 */

// Generic types from contract
export * from './types';

// Zod schemas for validation (work with any auth SDK)
export * from './schemas';

// UI stores (work with any auth SDK)
export * from './stores';

// Hooks (generic fallback OR overwritten by backend)
export * from './hooks';

// Server-side auth instance and client (re-exported from adapter/connector)
// Adapter creates server.ts and client.ts (generic naming)
// Connector may create config.ts for framework-specific setup
export { auth } from './server';
export { authClient } from './client';
`,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
  
  return actions;
}
