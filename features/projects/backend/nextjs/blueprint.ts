/**
 * Projects Backend Blueprint (Next.js)
 * 
 * Generates API routes for Projects feature: CRUD and generation
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/projects/backend/nextjs'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // CRUD routes - BACKEND API (resolves to apps.api.routes or apps.web.app/api)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.api}projects/route.ts',
    template: 'templates/api-projects-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Single project route - BACKEND API
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.api}projects/[id]/route.ts',
    template: 'templates/api-project-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Generate route - BACKEND API
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.api}projects/[id]/generate/route.ts',
    template: 'templates/api-generate-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Generation status route - BACKEND API
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.api}projects/[id]/generation/status/route.ts',
    template: 'templates/api-generation-status-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Duplicate route - BACKEND API
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.backend.api}projects/[id]/duplicate/route.ts',
    template: 'templates/api-duplicate-route.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  return actions;
}

