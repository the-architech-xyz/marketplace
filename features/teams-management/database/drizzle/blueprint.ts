/**
 * Teams Management Database Layer Blueprint (Drizzle)
 * 
 * Database-agnostic schema for teams management feature.
 * Independent of backend implementation.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/teams-management/database/drizzle'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);

  return [
    // Database schema
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/db/schema/teams.ts',
      template: 'templates/schema.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Database migrations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/db/migrations/001_teams.sql',
      template: 'templates/migration.sql.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
  ];
}



