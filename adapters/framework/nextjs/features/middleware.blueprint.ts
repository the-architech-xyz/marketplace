/**
 * Next.js Middleware Feature
 * 
 * Adds middleware for auth, redirects, and more to Next.js
 */

import { Blueprint } from '@thearchitech.xyz/types';

const middlewareBlueprint: Blueprint = {
  id: 'nextjs-middleware',
  name: 'Next.js Middleware',
  actions: [
    {
      type: 'CREATE_FILE',
      path: 'middleware.ts',
      template: 'adapters/framework/nextjs/features/templates/middleware.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/middleware/auth.ts',
      template: 'adapters/framework/nextjs/features/templates/auth-middleware.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/middleware/redirects.ts',
      template: 'adapters/framework/nextjs/features/templates/redirect-middleware.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/middleware/security.ts',
      template: 'adapters/framework/nextjs/features/templates/security-middleware.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'docs/middleware.md',
      template: 'adapters/framework/nextjs/features/templates/README.md.tpl'
    }
  ]
};

export default middlewareBlueprint;