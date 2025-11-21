/**
 * Semantic Search Tech-Stack Blueprint
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/semantic-search/pgvector/tech-stack'>
): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}semantic-search/hooks.ts',
      template: 'templates/hooks.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}semantic-search/schemas.ts',
      template: 'templates/schemas.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}



