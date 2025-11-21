/**
 * Synap Capture Jobs Blueprint (Inngest)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/synap/capture/jobs/inngest'>
): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src.jobs}inngest/functions/analyze-thought.ts',
      template: 'templates/analyze-thought.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}



