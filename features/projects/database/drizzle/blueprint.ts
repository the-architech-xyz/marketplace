/**
 * Projects Database Layer Blueprint (Drizzle)
 * 
 * Database schema for projects feature.
 * Stores projects (genomes), generations, and metadata.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/projects/database/drizzle'>
): BlueprintAction[] {
  return [
    // Database schema
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.database.src}db/schema/projects.ts',
      template: 'templates/schema.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Database migrations
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.database.src}db/migrations/001_projects.sql',
      template: 'templates/migration.sql.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
  ];
}

