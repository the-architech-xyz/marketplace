import { Blueprint } from '@thearchitech.xyz/types';

const prismaNextjsIntegrationBlueprint: Blueprint = {
  id: 'prisma-nextjs-integration',
  name: 'Prisma Next.js Integration',
  description: 'Complete Prisma ORM integration with Next.js and standardized TanStack Query hooks',
  version: '3.0.0',
  actions: [
    // Create Prisma Configuration
    {
      type: 'CREATE_FILE',
      path: 'prisma/schema.prisma',
      template: 'templates/schema.prisma.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/lib/prisma.ts',
      template: 'templates/prisma.ts.tpl'
    },
    // Create standardized data fetching hooks (SAME AS DRIZZLE!)
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
    // Create API service layer (SAME AS DRIZZLE!)
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
    // Create Next.js API routes (SAME AS DRIZZLE!)
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
    // Create types (SAME AS DRIZZLE!)
    {
      type: 'CREATE_FILE',
      path: 'src/types/api.ts',
      template: 'templates/api-types.ts.tpl'
    },
    // Install Dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'prisma',
        '@prisma/client'
      ],
      isDev: false
    },
    // Add Scripts
    {
      type: 'ADD_SCRIPT',
      name: 'db:generate',
      command: 'prisma generate',
      description: 'Generate Prisma client'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'db:push',
      command: 'prisma db push',
      description: 'Push schema to database'
    },
    {
      type: 'ADD_SCRIPT',
      name: 'db:migrate',
      command: 'prisma migrate dev',
      description: 'Run database migrations'
    }
  ]
};

export default prismaNextjsIntegrationBlueprint;