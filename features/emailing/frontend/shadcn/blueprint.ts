/**
 * Emailing Frontend Implementation: Shadcn/ui
 * 
 * Complete email management system with composition, templates, and analytics
 * Uses template-based component generation for maintainability
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';
  
export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/emailing/frontend/shadcn'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  return [

    // Create email composer component (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}emailing/EmailComposer.tsx',
      template: 'templates/EmailComposer.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create email list component (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}emailing/EmailList.tsx',
      template: 'templates/EmailList.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create template manager component (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}emailing/TemplateManager.tsx',
      template: 'templates/TemplateManager.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create emailing dashboard page (using template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}emailing/page.tsx',
      template: 'templates/emailing-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ]
}
