import { BlueprintAction, BlueprintActionType, MergedConfiguration, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

/**
 * Dynamic Sentry React Connector Blueprint
 * 
 * Implements Sentry specifically for pure React applications (Vite, CRA, etc.).
 * Handles React-specific integration with @sentry/react.
 * 
 * NOTE: This connector only handles package installation.
 * File generation is handled by other modules (sentry-nextjs, monitoring, etc.)
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  return [
    // Install React-specific Sentry packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@sentry/react']
    }
    
    // NOTE: All file creation actions removed due to missing templates
    // This connector now only handles package installation
    // File generation is handled by other modules (sentry-nextjs, monitoring, etc.)
  ];
}