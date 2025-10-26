import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Minimal Vercel AI SDK Adapter Blueprint
 * 
 * ARCHITECTURE NOTE:
 * This adapter ONLY provides SDK initialization and configuration.
 * 
 * It does NOT provide:
 * - API routes (those go in features/ai-chat/backend/)
 * - React hooks (Vercel AI SDK provides these directly via 'ai/react')
 * - Database persistence (that goes in features/ai-chat/database/)
 * 
 * This is a TRUE adapter - just SDK wiring, nothing more.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'ai/vercel-ai-sdk'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Extract module parameters
  const { params } = extractTypedModuleParameters(config);
  
  // Install Vercel AI SDK packages
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: [
      'ai',                    // Core Vercel AI SDK
      '@ai-sdk/openai',       // OpenAI provider
      '@ai-sdk/anthropic',    // Anthropic provider
    ]
  });
  
  // Install additional providers if specified
  if (params.providers) {
    const additionalPackages: string[] = [];
    
    if (params.providers.includes('google')) {
      additionalPackages.push('@ai-sdk/google');
    }
    if (params.providers.includes('cohere')) {
      additionalPackages.push('@ai-sdk/cohere');
    }
    if (params.providers.includes('huggingface')) {
      additionalPackages.push('@ai-sdk/huggingface');
    }
    
    if (additionalPackages.length > 0) {
      actions.push({
        type: BlueprintActionType.INSTALL_PACKAGES,
        packages: additionalPackages
      });
    }
  }
  
  // SDK Configuration (ONLY)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/ai/config.ts',
    template: 'templates/ai-config.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // SDK Client Instances (ONLY)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/ai/client.ts',
    template: 'templates/ai-client.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  // Types (ONLY)
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.lib}/ai/types.ts',
    template: 'templates/ai-types.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });
  
  return actions;
}
