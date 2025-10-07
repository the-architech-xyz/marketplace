import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

const rhfZodShadcnIntegrationBlueprint: Blueprint = {
  id: 'rhf-zod-shadcn-integration',
  name: 'RHF + Zod + Shadcn Integration',
  description: 'Golden Core integrator that connects React Hook Form, Zod validation, and Shadcn UI components',
  version: '1.0.0',
  actions: [
    // Create form field components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormField.tsx',
      template: 'templates/FormField.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormInput.tsx',
      template: 'templates/FormInput.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormTextarea.tsx',
      template: 'templates/FormTextarea.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormSelect.tsx',
      template: 'templates/FormSelect.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormCheckbox.tsx',
      template: 'templates/FormCheckbox.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormRadio.tsx',
      template: 'templates/FormRadio.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormSwitch.tsx',
      template: 'templates/FormSwitch.tsx.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create form utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/form-utils.ts',
      template: 'templates/form-utils.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create form hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/useFormValidation.ts',
      template: 'templates/useFormValidation.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create form builder
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormBuilder.tsx',
      template: 'templates/FormBuilder.tsx.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create form types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/types/forms.ts',
      template: 'templates/form-types.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create example form
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/ExampleForm.tsx',
      template: 'templates/ExampleForm.tsx.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }}
  ]
};

export default rhfZodShadcnIntegrationBlueprint;
