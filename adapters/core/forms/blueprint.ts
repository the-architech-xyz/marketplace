/**
 * Forms Blueprint
 * 
 * Golden Core form handling with validation using React Hook Form and Zod
 * Provides powerful, type-safe, and accessible form utilities
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'core/forms'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core packages are always installed
  actions.push(
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['zod']
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['react-hook-form']
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@hookform/resolvers']
    }
  );
  
  // Dev tools are optional
  if (params.devtools) {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@hookform/devtools'],
      isDev: true
    });
  }
  
  // Core form utilities
  actions.push(
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}forms/core.ts',
      template: 'templates/core.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}forms/validation.ts',
      template: 'templates/validation.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}forms/hooks.ts',
      template: 'templates/hooks.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  );
  
  // Accessibility features are optional
  if (params.accessibility) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}forms/accessibility.ts',
      template: 'templates/accessibility.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }
  

  
  // Form types
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.types}forms.ts',
    template: 'templates/types.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Configurable validation schemas with context
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.shared_library}forms/validation-schemas.ts',
    template: 'templates/validation-schemas.ts.tpl',
    context: {
      params: params,
      hasAdvancedValidation: params.advancedValidation
    },
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Validation examples
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.shared_library}forms/validation-examples.ts',
    template: 'templates/validation-examples.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Form index
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.shared_library}forms/index.ts',
    template: 'templates/index.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  return actions;
}