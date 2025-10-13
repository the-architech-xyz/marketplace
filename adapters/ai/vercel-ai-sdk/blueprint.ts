import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

/**
 * Dynamic AI/Vercel-AI-SDK Adapter Blueprint
 * 
 * Generates AI capabilities based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (config.activeFeatures.includes('streaming')) {
    actions.push(...generateStreamingActions());
  }
  
  if (config.activeFeatures.includes('advanced')) {
    actions.push(...generateAdvancedActions());
  }
  
  if (config.activeFeatures.includes('enterprise')) {
    actions.push(...generateEnterpriseActions());
  }
  
  return actions;
}

// Helper functions for each capability
function generateCoreActions(): BlueprintAction[] {
  return [
    // Install core AI SDK packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'ai',
        '@ai-sdk/react',
        '@ai-sdk/openai',
        '@ai-sdk/anthropic'
      ]
    },
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        '@types/node'
      ],
      isDev: true
    },
    // Core AI configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}ai/config.ts',
      template: 'templates/ai-config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}ai/types.ts',
      template: 'templates/ai-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-chat.ts',
      template: 'templates/use-chat.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api_routes}}chat/route.ts',
      template: 'templates/chat-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Optional examples file with advanced usage patterns
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}ai/examples.ts',
      template: 'templates/ai-examples.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

function generateStreamingActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-streaming.ts',
      template: 'templates/use-streaming.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

function generateAdvancedActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        '@ai-sdk/google',
        '@ai-sdk/cohere',
        '@ai-sdk/huggingface'
      ]
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}use-completion.ts',
      template: 'templates/use-completion.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.api_routes}}completion/route.ts',
      template: 'templates/completion-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

function generateEnterpriseActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}ai/providers.ts',
      template: 'templates/ai-providers.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}ai/utils.ts',
      template: 'templates/ai-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}AIProvider.tsx',
      template: 'templates/AIProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}
