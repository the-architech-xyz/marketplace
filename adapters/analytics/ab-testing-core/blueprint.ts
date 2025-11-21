import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic A/B Testing Core Adapter Blueprint
 * 
 * Provides tech-agnostic A/B testing utilities, types, and experiment management.
 * Framework-specific implementations (Vercel Edge Config, Next.js Middleware) handled by Connectors.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'analytics/ab-testing-core'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [
    // Core A/B testing configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}ab-testing/config.ts',
      template: 'templates/config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // A/B testing types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}ab-testing/types.ts',
      template: 'templates/types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // A/B testing utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}ab-testing/utils.ts',
      template: 'templates/utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];

  // Add experiment management if enabled
  if (features?.experimentManagement !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}ab-testing/experiments.ts',
      template: 'templates/experiments.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    });
  }

  // Add variant assignment if enabled
  if (features?.variantAssignment !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}ab-testing/variant-assignment.ts',
      template: 'templates/variant-assignment.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    });
  }

  return actions;
}






























