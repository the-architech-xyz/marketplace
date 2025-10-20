/**
 * Resend + Next.js Connector Blueprint
 * 
 * This connector provides basic Resend email integration for Next.js:
 * - Resend SDK setup
 * - Next.js API route for sending emails
 * - Email configuration
 * 
 * This is a CONNECTOR (not backend feature) because it:
 * - Integrates external SDK (Resend)
 * - Wires it into specific framework (Next.js)
 * - Provides basic email sending only
 * - No custom business logic (templates/campaigns in feature backend)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/email/resend-nextjs'>
): BlueprintAction[] {
  const { params, features } = extractTypedModuleParameters(config);

  return [
    // NOTE: No package installation needed - adapter handles 'resend' package
    // We only add Next.js specific integration (API routes, configuration)
    
    // Resend configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/email/config.ts',
      template: 'templates/config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Email sender utility
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}/email/sender.ts',
      template: 'templates/email-sender.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Basic send email API route
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}api/email/send/route.ts',
      template: 'templates/send-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

