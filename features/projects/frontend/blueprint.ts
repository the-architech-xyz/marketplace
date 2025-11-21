/**
 * Projects Frontend Blueprint (Tamagui)
 * 
 * Generates UI components for Projects feature using Tamagui
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/projects/frontend'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Project List component (from UI marketplace) - ALL FRONTEND (Tamagui is universal)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.frontend.components}projects/ProjectList.tsx',
    template: 'ui/projects/ProjectList.tsx.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Project Card component (from UI marketplace) - ALL FRONTEND (Tamagui is universal)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.frontend.components}projects/ProjectCard.tsx',
    template: 'ui/projects/ProjectCard.tsx.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Project Form component (from UI marketplace) - ALL FRONTEND (Tamagui is universal)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.frontend.components}projects/ProjectForm.tsx',
    template: 'ui/projects/ProjectForm.tsx.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Index file - ALL FRONTEND (Tamagui is universal)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.frontend.components}projects/index.ts',
    content: `/**
 * Projects Frontend Components
 * 
 * Central export for Projects UI components
 * 
 * Note: Components are generated from UI marketplace templates
 */

export { ProjectList } from './ProjectList';
export { ProjectCard } from './ProjectCard';
export { ProjectForm } from './ProjectForm';
`,
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  return actions;
}

