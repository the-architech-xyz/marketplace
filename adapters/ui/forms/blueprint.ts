/**
 * Forms Blueprint
 * 
 * Provides form handling with validation using Zod and React Hook Form
 * Framework-agnostic form utilities that work with any React project
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const formsBlueprint: Blueprint = {
  id: 'forms-setup',
  name: 'Forms Setup',
  actions: [
    // Install Zod
    {
      type: 'INSTALL_PACKAGES',
      packages: ['zod'],
      condition: '{{#if module.parameters.zod}}'
    },
    // Install React Hook Form
    {
      type: 'INSTALL_PACKAGES',
      packages: ['react-hook-form'],
      condition: '{{#if module.parameters.reactHookForm}}'
    },
    // Install resolvers
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@hookform/resolvers'],
      condition: '{{#if module.parameters.resolvers}}'
    },
    // Create form utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/forms.ts',
      template: 'templates/forms.ts.tpl',
      condition: '{{#if module.parameters.zod}}'
    },
    // Create example form components
    {
      type: 'CREATE_FILE',
      path: 'src/components/forms/ContactForm.tsx',
      template: 'templates/ContactForm.tsx.tpl',
      condition: '{{#if module.parameters.reactHookForm}}'
    }
  ]
};
