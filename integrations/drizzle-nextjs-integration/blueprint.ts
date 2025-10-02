import { Blueprint } from '@thearchitech.xyz/types';

const drizzleNextjsIntegrationBlueprint: Blueprint = {
  id: 'drizzle-nextjs-integration',
  name: 'Drizzle Next.js Integration',
  description: 'Complete Drizzle ORM integration for Next.js with standardized TanStack Query hooks',
  version: '3.0.0',
  actions: [
    // Create standardized data fetching hooks
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-products.ts',
      template: 'templates/use-products.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-users.ts',
      template: 'templates/use-users.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-posts.ts',
      template: 'templates/use-posts.ts.tpl'
    },
    // Create generic data fetching hooks
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-query.ts',
      template: 'templates/use-query.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-mutation.ts',
      template: 'templates/use-mutation.ts.tpl'
    },
    // Create API service layer
    {
      type: 'CREATE_FILE',
      path: 'src/lib/api/products.ts',
      template: 'templates/api-products.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/api/users.ts',
      template: 'templates/api-users.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/api/posts.ts',
      template: 'templates/api-posts.ts.tpl'
    },
    // Create Next.js API routes
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/products/route.ts',
      template: 'templates/api-products-route.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/products/[id]/route.ts',
      template: 'templates/api-product-route.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/users/route.ts',
      template: 'templates/api-users-route.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/users/[id]/route.ts',
      template: 'templates/api-user-route.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/posts/route.ts',
      template: 'templates/api-posts-route.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/posts/[id]/route.ts',
      template: 'templates/api-post-route.ts.tpl'
    },
    // Create database utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/queries.ts',
      template: 'templates/db-queries.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/db/mutations.ts',
      template: 'templates/db-mutations.ts.tpl'
    },
    // Create Next.js API route for migrations
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/db/migrate/route.ts',
      template: 'templates/migrate-route.ts.tpl'
    },
    // Create Next.js API route for seeding
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/db/seed/route.ts',
      template: 'templates/seed-route.ts.tpl'
    },
    // Create types
    {
      type: 'CREATE_FILE',
      path: 'src/types/api.ts',
      template: 'templates/api-types.ts.tpl'
    }
  ]
};

export const blueprint = drizzleNextjsIntegrationBlueprint;