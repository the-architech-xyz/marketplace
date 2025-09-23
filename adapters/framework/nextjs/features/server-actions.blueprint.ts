/**
 * Next.js Server Actions Feature Blueprint
 * 
 * Modern Server Actions implementation for Next.js 15+
 * Provides self-contained examples without external dependencies
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const nextjsServerActionsBlueprint: Blueprint = {
  id: 'nextjs-server-actions-setup',
  name: 'Next.js Server Actions',
  description: 'Modern Server Actions implementation for Next.js 15+',
  actions: [
    // Create server actions utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/server-actions.ts',
      template: 'adapters/framework/nextjs/features/templates/server-actions.ts.tpl'
    },
    // Create example server actions
    {
      type: 'CREATE_FILE',
      path: 'src/lib/example-actions.ts',
      template: 'adapters/framework/nextjs/features/templates/example-actions.ts.tpl'
    },
    // Create example form component
    {
      type: 'CREATE_FILE',
      path: 'src/components/ExampleForm.tsx',
      template: 'adapters/framework/nextjs/features/templates/example-form.tsx.tpl'
    },
    // Create example page
    {
      type: 'CREATE_FILE',
      path: 'src/app/server-actions-example/page.tsx',
      template: 'adapters/framework/nextjs/features/templates/example-page.tsx.tpl'
    },
    // Create documentation
    {
      type: 'CREATE_FILE',
      path: 'docs/server-actions.md',
      template: 'adapters/framework/nextjs/features/templates/README.md.tpl'
    }
  ]
};