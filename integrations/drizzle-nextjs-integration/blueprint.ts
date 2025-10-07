import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

const drizzleNextjsIntegrationBlueprint: Blueprint = {
  id: 'drizzle-nextjs-integration',
  name: 'Drizzle Next.js Integration',
  description: 'Complete Drizzle ORM integration for Next.js with standardized TanStack Query hooks',
  version: '3.0.0',
  actions: [
    // Note: Domain-specific hooks (use-products, use-users, use-posts) 
    // have been moved to features/ecommerce-core
    // Create generic data fetching hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-query.ts',
      template: 'templates/use-query.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-mutation.ts',
      template: 'templates/use-mutation.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    // Note: Domain-specific API services (products, users, posts) 
    // have been moved to features/ecommerce-core
    // Note: Domain-specific API routes (products, users, posts) 
    // have been moved to features/ecommerce-core
    // Create database utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/db/queries.ts',
      template: 'templates/db-queries.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/db/mutations.ts',
      template: 'templates/db-mutations.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }
    },
    // Create Next.js API route for migrations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/db/migrate/route.ts',
      template: 'templates/migrate-route.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create Next.js API route for seeding
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/db/seed/route.ts',
      template: 'templates/seed-route.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create database transaction utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/db/transactions.ts',
      template: 'templates/db-transactions.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/types/api.ts',
      template: 'templates/api-types.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }}
  ]
};

export const blueprint = drizzleNextjsIntegrationBlueprint;