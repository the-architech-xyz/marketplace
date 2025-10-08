/**
 * Next.js Server Actions Feature Blueprint
 * 
 * Modern Server Actions implementation for Next.js 15+
 * Provides self-contained examples without external dependencies
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/marketplace/types';

export const nextjsServerActionsBlueprint: Blueprint = {
  id: 'nextjs-server-actions-setup',
  name: 'Next.js Server Actions',
  description: 'Modern Server Actions implementation for Next.js 15+',
  actions: [
    // Create server actions utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/server-actions.ts',
      template: 'templates/server-actions.ts.tpl'
    },
    // Create example server actions
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/example-actions.ts',
      template: 'templates/example-actions.ts.tpl'
    },
    // Create example form component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ExampleForm.tsx',
      template: 'templates/example-form.tsx.tpl'
    },
    // Create example page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/server-actions-example/page.tsx',
      template: 'templates/example-page.tsx.tpl'
    },
    // Create documentation
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'docs/server-actions.md',   
      template: 'templates/README.md.tpl'
    }
  ]
};