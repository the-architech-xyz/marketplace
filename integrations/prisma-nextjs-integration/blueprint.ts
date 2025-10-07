import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

const prismaNextjsIntegrationBlueprint: Blueprint = {
  id: 'prisma-nextjs-integration',
  name: 'Prisma Next.js Integration',
  description: 'Complete Prisma ORM integration with Next.js and standardized TanStack Query hooks',
  version: '3.0.0',
  actions: [
    // Create Prisma Configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'prisma/schema.prisma',
      template: 'templates/schema.prisma.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/prisma.ts',
      template: 'templates/prisma.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create standardized data fetching hooks (SAME AS DRIZZLE!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-products.ts',
      template: 'templates/use-products.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-users.ts',
      template: 'templates/use-users.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-posts.ts',
      template: 'templates/use-posts.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create generic data fetching hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-query.ts',
      template: 'templates/use-query.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-mutation.ts',
      template: 'templates/use-mutation.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create API service layer (SAME AS DRIZZLE!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/api/products.ts',
      template: 'templates/api-products.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/api/users.ts',
      template: 'templates/api-users.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/api/posts.ts',
      template: 'templates/api-posts.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create Next.js API routes (SAME AS DRIZZLE!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/products/route.ts',
      template: 'templates/api-products-route.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/products/[id]/route.ts',
      template: 'templates/api-product-route.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/users/route.ts',
      template: 'templates/api-users-route.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/users/[id]/route.ts',
      template: 'templates/api-user-route.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/posts/route.ts',
      template: 'templates/api-posts-route.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/posts/[id]/route.ts',
      template: 'templates/api-post-route.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create database utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/db/queries.ts',
      template: 'templates/db-queries.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/db/mutations.ts',
      template: 'templates/db-mutations.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create types (SAME AS DRIZZLE!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/types/api.ts',
      template: 'templates/api-types.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Install Dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'prisma',
        '@prisma/client'
      ],
      isDev: false
    },
    // Add Scripts
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'db:generate',
      command: 'prisma generate'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'db:push',
      command: 'prisma db push'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,

      name: 'db:migrate',
      command: 'prisma migrate dev'
    }
  ]
};

export default prismaNextjsIntegrationBlueprint;