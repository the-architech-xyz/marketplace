/**
 * Forms Blueprint
 * 
 * Golden Core form handling with validation using React Hook Form and Zod
 * Provides powerful, type-safe, and accessible form utilities
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const formsBlueprint: Blueprint = {
  id: 'forms-golden-core-setup',
  name: 'Forms Golden Core Setup',
  description: 'Complete form handling setup with React Hook Form, Zod validation, and accessibility',
  version: '2.0.0',
  actions: [
    // Install core packages
    {
      type: 'INSTALL_PACKAGES',
      packages: ['zod'],
      condition: '{{#if module.parameters.zod}}'
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['react-hook-form'],
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@hookform/resolvers'],
      condition: '{{#if module.parameters.resolvers}}'
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@hookform/devtools'],
      isDev: true,
      condition: '{{#if module.parameters.devtools}}'
    },
    // Create core form utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/forms/core.ts',
      template: 'templates/core.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/forms/validation.ts',
      template: 'templates/validation.ts.tpl',
      condition: '{{#if module.parameters.zod}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/forms/hooks.ts',
      template: 'templates/hooks.ts.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/forms/accessibility.ts',
      template: 'templates/accessibility.ts.tpl',
      condition: '{{#if module.parameters.accessibility}}'
    },
    // Create form components
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormProvider.tsx',
      template: 'templates/FormProvider.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormField.tsx',
      template: 'templates/FormField.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormInput.tsx',
      template: 'templates/FormInput.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormTextarea.tsx',
      template: 'templates/FormTextarea.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormSelect.tsx',
      template: 'templates/FormSelect.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormCheckbox.tsx',
      template: 'templates/FormCheckbox.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormRadio.tsx',
      template: 'templates/FormRadio.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/FormError.tsx',
      template: 'templates/FormError.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    // Create form types
    {
      type: 'CREATE_FILE',
      path: 'src/types/forms.ts',
      template: 'templates/types.ts.tpl'
    },
    // Create example forms
    {
      type: 'CREATE_FILE',
      path: 'src/examples/ContactForm.tsx',
      template: 'templates/ContactForm.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/examples/LoginForm.tsx',
      template: 'templates/LoginForm.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    // Create form index
    {
      type: 'CREATE_FILE',
      path: 'src/lib/forms/index.ts',
      template: 'templates/index.ts.tpl'
    }
  ]
};
