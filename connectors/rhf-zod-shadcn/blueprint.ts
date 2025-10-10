import { BlueprintAction, BlueprintActionType, ModifierType, ConflictResolutionStrategy, EnhanceFileFallbackStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

/**
 * Dynamic RHF-Zod-Shadcn Connector Blueprint
 * 
 * Enhances core forms system with Shadcn UI components.
 * This connector enhances the core forms adapter instead of duplicating functionality.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Enhance core forms with Shadcn-specific components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/ShadcnForm.tsx',
      template: 'templates/ShadcnForm.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 1
      }
    },
    
    // Create Shadcn-specific form field components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/ShadcnFormField.tsx',
      template: 'templates/form-field.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 1
      }
    },
    
    // Create Shadcn form input components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/ShadcnFormInput.tsx',
      template: 'templates/ShadcnFormInput.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 1
      }
    },
    
    // Create Shadcn form textarea component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/ShadcnFormTextarea.tsx',
      template: 'templates/ShadcnFormTextarea.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 1
      }
    },
    
    // Create Shadcn form select component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/ShadcnFormSelect.tsx',
      template: 'templates/ShadcnFormSelect.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 1
      }
    },
    
    // Create Shadcn form checkbox component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/ShadcnFormCheckbox.tsx',
      template: 'templates/ShadcnFormCheckbox.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 1
      }
    },
    
    // Create Shadcn form radio component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}forms/ShadcnFormRadio.tsx',
      template: 'templates/ShadcnFormRadio.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 1
      }
    },
    
    // Enhance core forms index with Shadcn exports
    {
      type: BlueprintActionType.ENHANCE_FILE,
      path: '{{paths.shared_library}}forms/index.ts',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      fallback: EnhanceFileFallbackStrategy.SKIP,
      params: {
        enhancements: [
          {
            type: 'addExport',
            module: '../components/forms/ShadcnForm',
            name: '{ ShadcnForm }',
          },
          {
            type: 'addExport',
            module: '../components/forms/ShadcnFormField',
            name: '{ ShadcnFormField }',
          },
          {
            type: 'addExport',
            module: '../components/forms/ShadcnFormInput',
            name: '{ ShadcnFormInput }',
          },
          {
            type: 'addExport',
            module: '../components/forms/ShadcnFormTextarea',
            name: '{ ShadcnFormTextarea }',
          },
          {
            type: 'addExport',
            module: '../components/forms/ShadcnFormSelect',
            name: '{ ShadcnFormSelect }',
          },
          {
            type: 'addExport',
            module: '../components/forms/ShadcnFormCheckbox',
            name: '{ ShadcnFormCheckbox }',
          },
          {
            type: 'addExport',
            module: '../components/forms/ShadcnFormRadio',
            name: '{ ShadcnFormRadio }',
          },
        ],
      },
    }
  ];
}
