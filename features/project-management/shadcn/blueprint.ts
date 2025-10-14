/**
 * Project Management Frontend Implementation: Shadcn/ui
 * 
 * Complete project management system with kanban boards, task management, and team collaboration
 * Uses template-based component generation for maintainability
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/project-management/shadcn'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  
  return actions;
}

function generateCoreActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-beautiful-dnd',
        '@types/react-beautiful-dnd',
        'react-hook-form',
        '@hookform/resolvers',
        'zod',
        'date-fns',
        'lucide-react',
        'recharts'
      ]
    },

    // Core project management components (only existing templates)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}projects/ProjectBoard.tsx',
      template: 'templates/ProjectBoard.tsx.tpl',
      context: { 
        features: ['core'],
        hasKanbanBoard: true,
        hasTaskCreation: true,
        hasTaskManagement: true,
        hasProjectOrganization: true,
        hasTeamCollaboration: true,
        hasBasicAnalytics: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Project management pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}projects/page.tsx',
      template: 'templates/projects-page.tsx.tpl',
      context: { 
        features: ['core'],
        hasKanbanBoard: true,
        hasTaskCreation: true,
        hasTaskManagement: true,
        hasProjectOrganization: true,
        hasTeamCollaboration: true,
        hasBasicAnalytics: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Project management hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}projects/use-projects.ts',
      template: 'templates/use-projects.ts.tpl',
      context: { 
        features: ['core'],
        hasKanbanBoard: true,
        hasTaskCreation: true,
        hasTaskManagement: true,
        hasProjectOrganization: true,
        hasTeamCollaboration: true,
        hasBasicAnalytics: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ];
}

