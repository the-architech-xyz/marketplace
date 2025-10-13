import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic Resend Email Adapter Blueprint
 * 
 * Generates tech-agnostic email functionality with Resend.
 * Core features are always included, optional features are conditionally generated.
 * 
 * NOTE: Only includes actions with existing templates.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'email/resend'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  return [
    // Install Resend SDK (NO React dependencies)
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['resend']
    },
    
    // Core Resend client wrapper
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/resend-client.ts',
      template: 'templates/resend-client.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Email configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/email-config.ts',
      template: 'templates/email-config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Email types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/email-types.ts',
      template: 'templates/email-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Email sender
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/email-sender.ts',
      template: 'templates/email-sender.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Sender utility
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/sender.ts',
      template: 'templates/sender.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Config utility
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}email/config.ts',
      template: 'templates/config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
    
    // NOTE: All other actions removed due to missing templates
    // Templates, Analytics, and Campaigns features are handled by other modules
  ];
}