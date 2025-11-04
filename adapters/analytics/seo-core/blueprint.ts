import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic SEO Core Adapter Blueprint
 * 
 * Provides tech-agnostic SEO utilities, structured data schemas, and metadata types.
 * Framework-specific implementations (Next.js Metadata API, sitemap generation) handled by Connectors.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'analytics/seo-core'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [
    // Core SEO configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}seo/config.ts',
      template: 'templates/config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // SEO types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}seo/types.ts',
      template: 'templates/types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // SEO utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}seo/utils.ts',
      template: 'templates/utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];

  // Add structured data if enabled
  if (features?.structuredData !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}seo/structured-data.ts',
      template: 'templates/structured-data.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    });
  }

  // Add metadata helpers if enabled
  if (features?.metadataHelpers !== false) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.shared_library}seo/metadata-helpers.ts',
      template: 'templates/metadata-helpers.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    });
  }

  return actions;
}




