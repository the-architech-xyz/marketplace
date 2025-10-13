import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic Sentry Next.js Connector Blueprint
 * 
 * Implements Sentry specifically for the Next.js framework.
 * Handles the complexity of Next.js integration with @sentry/nextjs.
 * 
 * NOTE: This connector only handles package installation.
 * File generation is handled by other modules (sentry-nextjs, monitoring, etc.)
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/sentry/nextjs'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  return [
    // Install Next.js-specific Sentry packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@sentry/nextjs']
    }
    
    // NOTE: All file creation actions removed due to missing templates
    // This connector now only handles package installation
    // File generation is handled by other modules (sentry-nextjs, monitoring, etc.)
  ];
}