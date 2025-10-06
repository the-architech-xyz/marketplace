import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

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
      template: 'templates/FormField.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormInput.tsx',
      template: 'templates/FormInput.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormTextarea.tsx',
      template: 'templates/FormTextarea.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormSelect.tsx',
      template: 'templates/FormSelect.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormCheckbox.tsx',
      template: 'templates/FormCheckbox.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormRadio.tsx',
      template: 'templates/FormRadio.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormSwitch.tsx',
      template: 'templates/FormSwitch.tsx.tpl'
    },
    // Create form utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/form-utils.ts',
      template: 'templates/form-utils.ts.tpl'
    },
    // Create form hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/useFormValidation.ts',
      template: 'templates/useFormValidation.ts.tpl'
    },
    // Create form builder
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/FormBuilder.tsx',
      template: 'templates/FormBuilder.tsx.tpl'
    },
    // Create form types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/types/forms.ts',
      template: 'templates/form-types.ts.tpl'
    },
    // Create example form
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/forms/ExampleForm.tsx',
      template: 'templates/ExampleForm.tsx.tpl'
    }
  ]
};

export default rhfZodShadcnIntegrationBlueprint;
