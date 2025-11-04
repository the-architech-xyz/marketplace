/**
 * Payments Database Layer Blueprint (Drizzle)
 * 
 * Provider-agnostic database schema for payments feature.
 * Works with ANY payment provider (Stripe, Paddle, custom, etc.)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

export default function generateBlueprint(): BlueprintAction[] {
  return [
    // Database schema
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/db/schema/payments.ts',
      template: 'templates/schema.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Database migrations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/db/migrations/001_payments.sql',
      template: 'templates/migration.sql.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
  ];
}



