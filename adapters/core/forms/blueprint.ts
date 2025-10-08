/**
 * Forms Blueprint
 * 
 * Golden Core form handling with validation using React Hook Form and Zod
 * Provides powerful, type-safe, and accessible form utilities
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const formsBlueprint: Blueprint = {
  id: 'forms-golden-core-setup',
  name: 'Forms Golden Core Setup',
  description: 'Complete form handling setup with React Hook Form, Zod validation, and accessibility',
  version: '2.0.0',
  actions: [
    // Install core packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['zod'],
      condition: '{{#if module.parameters.zod}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['react-hook-form'],
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@hookform/resolvers'],
      condition: '{{#if module.parameters.resolvers}}'
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@hookform/devtools'],
      isDev: true,
      condition: '{{#if module.parameters.devtools}}'
    },
    // Create core form utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}forms/core.ts',
      template: 'templates/core.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}forms/validation.ts',
      template: 'templates/validation.ts.tpl',
      condition: '{{#if module.parameters.zod}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}forms/hooks.ts',
      template: 'templates/hooks.ts.tpl',
      condition: '{{#if module.parameters.reactHookForm}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}forms/accessibility.ts',
      template: 'templates/accessibility.ts.tpl',
      condition: '{{#if module.parameters.accessibility}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create form components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/FormProvider.tsx',
      template: 'templates/FormProvider.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/FormField.tsx',
      template: 'templates/FormField.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }, 
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/FormInput.tsx',
      template: 'templates/FormInput.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/FormTextarea.tsx',
      template: 'templates/FormTextarea.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/FormSelect.tsx',
      template: 'templates/FormSelect.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/FormCheckbox.tsx',
      template: 'templates/FormCheckbox.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/FormRadio.tsx',
      template: 'templates/FormRadio.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/FormError.tsx',
      template: 'templates/FormError.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create form types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.types}}forms.ts',
      template: 'templates/types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create example forms
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/examples/ContactForm.tsx',
      template: 'templates/ContactForm.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/examples/LoginForm.tsx',
      template: 'templates/LoginForm.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    // Create configurable validation schemas
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}forms/validation-schemas.ts',
      template: 'templates/validation-schemas.ts.tpl',
      condition: '{{#if module.parameters.zod}}',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create validation examples
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}forms/validation-examples.ts',
      template: 'templates/validation-examples.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Create form index
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}forms/index.ts',
      template: 'templates/index.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ]
};
