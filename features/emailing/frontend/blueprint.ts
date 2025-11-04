/**
 * Emailing Frontend Implementation: Shadcn/ui
 * 
 * Complete email management system with composition, templates, and analytics
 * Uses UI marketplace templates via convention-based loading (`ui/...` prefix)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';
  
export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/emailing/frontend/shadcn'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  return [

    // Create email composer component (using UI marketplace template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}emailing/EmailComposer.tsx',
      template: 'ui/emailing/EmailComposer.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create email list component (using UI marketplace template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}emailing/EmailList.tsx',
      template: 'ui/emailing/EmailList.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create template manager component (using UI marketplace template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}emailing/TemplateManager.tsx',
      template: 'ui/emailing/TemplateManager.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create emailing dashboard page (using UI marketplace template)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}emailing/page.tsx',
      template: 'ui/emailing/emailing-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ]
}
