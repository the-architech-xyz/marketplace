/**
 * Teams Management Feature Technology Stack Blueprint
 * 
 * This blueprint automatically adds the technology-agnostic stack layer
 * (types, schemas, hooks, stores) to any Teams Management implementation.
 * 
 * This ensures consistency across all frontend/backend technologies.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/teams-management/tech-stack'>
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
    path: '{{paths.lib}}/teams-management/types.ts',
    content: `/**
 * Teams Management Types
 * Re-exported from contract for convenience
 */
export type { 
  Team, TeamMember, TeamInvitation, TeamActivity, TeamAnalytics,
  CreateTeamData, UpdateTeamData, InviteMemberData, UpdateMemberData,
  AcceptInvitationData, DeclineInvitationData,
  TeamFilters, MemberFilters, InvitationFilters, ActivityFilters,
  TeamRole, TeamStatus, InvitationStatus, Permission,
  ITeamsService
} from '@/features/teams-management/contract';
`,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Schemas - Zod validation schemas
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '{{paths.lib}}/teams-management/schemas.ts',
    template: 'templates/schemas.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Service - Cohesive Services (wraps backend with TanStack Query)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '{{paths.lib}}/teams-management/TeamsService.ts',
    template: 'templates/TeamsService.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
  
  // Stores - Zustand state management
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '{{paths.lib}}/teams-management/stores.ts',
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
    path: '{{paths.lib}}/teams-management/index.ts',
    content: `/**
 * Teams Management Feature - Tech Stack Layer
 * 
 * This module provides the client-side abstraction layer for teams management.
 * Import the TeamsService to access all teams-related operations.
 */

// Re-export types from contract
export * from './types';

// Re-export schemas for validation
export * from './schemas';

// Re-export Zustand stores
export * from './stores';

// Export the main Cohesive Service
export { TeamsService } from './TeamsService';
`,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.REPLACE,
      priority: 1
    }
  });
      
  // ============================================================================
  // DOCUMENTATION
  // ============================================================================
      
  // README for the tech stack layer
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '{{paths.lib}}/teams-management/README.md',
    content: `# Teams Management Feature - Technology Stack Layer

This directory contains the technology-agnostic stack layer for the Teams Management feature. These files provide consistent types, validation, data fetching, and state management across all implementations.

## Files

### \`types.ts\`
- Technology-agnostic TypeScript type definitions
- Generated from the feature contract
- Used by all frontend/backend implementations

### \`schemas.ts\`
- Zod validation schemas for runtime type checking
- Provides safe data validation and parsing
- Used for API request/response validation

### \`hooks.ts\`
- TanStack Query hooks for data fetching
- Provides consistent data fetching patterns
- Handles caching, loading states, and error handling

### \`stores.ts\`
- Zustand stores for state management
- Provides consistent state patterns
- Handles UI state, data state, and computed values

### \`index.ts\`
- Centralized exports for easy importing
- Re-exports commonly used types, schemas, hooks, and stores

## Usage

\`\`\`typescript
// Import types
import type { Team, TeamMember, TeamInvitation } from '@/lib/teams-management';

// Import schemas for validation
import { TeamSchema, TeamMemberSchema } from '@/lib/teams-management';

// Import hooks for data fetching
import { useTeams, useTeamMembers, useCreateTeam } from '@/lib/teams-management';

// Import stores for state management
import { useTeamStore, useMemberStore } from '@/lib/teams-management';
\`\`\`

## Technology Integration

This tech stack layer is designed to work with any frontend or backend technology:

- **Frontend**: React, Vue, Svelte, etc.
- **Backend**: Node.js, Python, Go, etc.
- **State Management**: Zustand, Redux, Pinia, etc.
- **Data Fetching**: TanStack Query, SWR, Apollo, etc.
- **Validation**: Zod, Yup, Joi, etc.

## Contract Compliance

All files in this layer are generated from and comply with the feature contract (\`contract.ts\`). Any changes to the contract should be reflected in these files to maintain consistency.

## Contributing

When modifying this tech stack layer:

1. Ensure all changes comply with the feature contract
2. Update types, schemas, hooks, and stores consistently
3. Test with multiple technology implementations
4. Update documentation as needed
`,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  return actions;
}
