/**
 * Hono API Adapter Blueprint
 * 
 * Generates Hono API application for Vercel Edge Functions
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'backend/api-hono'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const mode = params?.mode || 'standalone';
  const port = params?.port || 3001;
  
  const actions: BlueprintAction[] = [];
  
  // Create minimal package.json FIRST (before installing packages)
  // This is needed because apps don't have package.json created by StructureInitializationLayer
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.api.root}package.json',
    content: JSON.stringify({
      name: '@repo/api',
      version: '1.0.0',
      private: true,
      type: 'module',
      scripts: {
        dev: 'node --watch server.js',
        start: 'node server.js'
      },
      dependencies: {},
      devDependencies: {}
    }, null, 2),
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Install Hono packages
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['hono']
  });
  
  // Always install node-server for standalone mode
  if (mode === 'standalone' || mode === 'both') {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@hono/node-server']
    });
  }
  
  // CORS middleware
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['@hono/cors']
  });
  
  // Main Hono app (use api_src if available, otherwise api)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.api.src}app.ts',
    template: 'templates/app.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Middleware
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.api.src}middleware.ts',
    template: 'templates/middleware.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Standalone server (default)
  if (mode === 'standalone' || mode === 'both') {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.api.src}server.ts',
      template: 'templates/server.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
    
    // Update package.json with full template (will merge with minimal one created above)
    // The merge will happen automatically since we use MERGE strategy and package.json is detected
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.api.root}package.json',
      template: 'templates/package.json.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.MERGE,
        priority: 1
        // mergeInstructions will be auto-detected for package.json files by create-file-handler
      }
    });
    
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.api.root}tsconfig.json',
      template: 'templates/tsconfig.json.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
    
    // Add environment variable for API URL
    actions.push({
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'API_PORT',
      value: port.toString(),
      description: 'Port for standalone API server'
    });
    
    actions.push({
      type: BlueprintActionType.ADD_ENV_VAR,
      key: 'API_URL',
      value: `http://localhost:${port}`,
      description: 'API server URL'
    });
  }
  
  // Vercel Edge Function route (optional)
  if (mode === 'vercel-edge' || mode === 'both') {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.api.routes}api/[...all]/route.ts',
      template: 'templates/api-route-vercel.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }
  
  // Types
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.apps.api.src}types.ts',
    template: 'templates/types.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  return actions;
}

