/**
 * Inngest Jobs Adapter Blueprint
 * 
 * Generates Inngest client and webhook endpoint for background jobs
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'jobs/inngest'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const framework = params?.framework || 'hono';
  
  const actions: BlueprintAction[] = [
    // Install Inngest packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['inngest']
    },
    
    // Inngest client
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}jobs/inngest/client.ts',
      template: 'templates/client.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Inngest config
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}jobs/inngest/config.ts',
      template: 'templates/config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Functions directory structure
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}jobs/inngest/functions/index.ts',
      template: 'templates/functions-index.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    
    // Environment variables
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'INNGEST_EVENT_KEY',
      value: '',
      description: 'Inngest event key (get from Inngest dashboard)'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'INNGEST_SIGNING_KEY',
      value: '',
      description: 'Inngest signing key (get from Inngest dashboard)'
    }
  ];
  
  // Install framework-specific adapter
  if (framework === 'hono') {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@inngest/hono']
    });
  } else if (framework === 'nextjs') {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@inngest/next']
    });
  }
  
  // Add webhook endpoint based on framework
  if (framework === 'hono') {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.api.routes}api/inngest/route.ts',
      template: 'templates/webhook-hono.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  } else if (framework === 'nextjs') {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.api.routes}api/inngest/route.ts',
      template: 'templates/webhook-nextjs.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }
  
  return actions;
}



