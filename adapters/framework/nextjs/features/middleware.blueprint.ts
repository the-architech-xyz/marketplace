/**
 * Next.js Middleware Feature
 * 
 * Adds middleware for auth, redirects, and more to Next.js
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/marketplace/types';

const middlewareBlueprint: Blueprint = {
  id: 'nextjs-middleware',
  name: 'Next.js Middleware',
  actions: [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'middleware.ts',
      template: 'templates/middleware.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/middleware/auth.ts',
      template: 'templates/auth-middleware.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/middleware/redirects.ts',
      template: 'templates/redirect-middleware.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/middleware/security.ts',
      template: 'templates/security-middleware.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'docs/middleware.md',
      template: 'templates/README.md.tpl'
    } 
  ]
};

export default middlewareBlueprint;