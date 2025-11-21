/**
 * Semantic Search Database Blueprint (pgvector)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/semantic-search/pgvector/database/drizzle'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const tableName = params?.tableName || 'documents';
  
  return [
    // Migration SQL for pgvector extension
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.database.src}migrations/enable_pgvector.sql',
      template: 'templates/pgvector-migration.sql.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Helper for adding vector column
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.database.src}helpers/pgvector.ts',
      template: 'templates/pgvector-helper.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}



