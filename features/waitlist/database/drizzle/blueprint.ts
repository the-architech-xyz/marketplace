/**
 * Waitlist Database Layer Blueprint (Drizzle)
 * 
 * Database schema for waitlist feature with viral referral system.
 * Stores users, referrals, position tracking, and analytics.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/waitlist/database/drizzle'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);

  return [
    // Database schema
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/db/schema/waitlist.ts',
      template: 'templates/schema.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Database migrations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/db/migrations/001_waitlist.sql',
      template: 'templates/migration.sql.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
  ];
}


