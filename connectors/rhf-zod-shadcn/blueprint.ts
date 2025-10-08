import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'connector:rhf-zod-shadcn',
  name: 'React Hook Form + Zod + Shadcn Connector',
  description: 'React Hook Form, Zod validation, and Shadcn form components setup for NextJS',
  version: '1.0.0',
  actions: [
    // Create form utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}forms/utils.ts',
      template: 'templates/form-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create form components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/Form.tsx',
      template: 'templates/form.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create validation schemas
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}forms/schemas.ts',
      template: 'templates/validation-schemas.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },

    // Create form field components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/FormField.tsx',
      template: 'templates/form-field.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    }
  ]
};
