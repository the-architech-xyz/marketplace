import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/ai-chat/frontend/shadcn'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on schema parameters
  if (features.media) {
    actions.push(...generateMediaActions());
  }
  
  if (features.voice) {
    actions.push(...generateVoiceActions());
  }
  
  if (features.advanced) {
    actions.push(...generateAdvancedActions());
  }
  
  return actions;
}

// Helper functions for each capability
function generateCoreActions(): BlueprintAction[] {
  return [
    // Install core AI chat packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'ai',
        '@ai-sdk/react',
        '@ai-sdk/openai',
        '@ai-sdk/anthropic',
        'react-markdown',
        'remark-gfm',
        'rehype-highlight',
        'rehype-raw',
        'react-syntax-highlighter',
        'lucide-react',
        'class-variance-authority',
        'clsx',
        'tailwind-merge'
      ]
    },
    // Core AI chat types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}ai-chat/types.ts',
      template: 'templates/types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Core AI chat components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatInterface.tsx',
      template: 'templates/ChatInterface.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/MessageHistory.tsx',
      template: 'templates/MessageHistory.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ConversationSidebar.tsx',
      template: 'templates/ConversationSidebar.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Core AI chat hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}useAIChatExtended.ts',
      template: 'templates/useAIChatExtended.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

function generateMediaActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-dropzone',
        'file-type',
        'image-size'
      ]
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/MediaPreview.tsx',
      template: 'templates/MediaPreview.tsx.tpl',
      context: {
        features: ['media'],
        hasMedia: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}useFileUpload.ts',
      template: 'templates/useFileUpload.ts.tpl',
      context: {
        features: ['media'],
        hasMedia: true
      },
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

function generateVoiceActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-speech-recognition',
        'react-speech-kit',
        'web-speech-api'
      ]
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/VoiceInput.tsx',
      template: 'templates/VoiceInput.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/VoiceOutput.tsx',
      template: 'templates/VoiceOutput.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}useVoice.ts',
      template: 'templates/useVoice.ts.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

function generateAdvancedActions(): BlueprintAction[] {
  return [
    // Phase 2: Essential Features
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/CustomPrompts.tsx',
      template: 'templates/CustomPrompts.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ExportImport.tsx',
      template: 'templates/ExportImport.tsx.tpl',
 
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/SettingsPanel.tsx',
      template: 'templates/SettingsPanel.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Phase 3: Advanced Features
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/LoadingIndicator.tsx',
      template: 'templates/LoadingIndicator.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ErrorDisplay.tsx',
      template: 'templates/ErrorDisplay.tsx.tpl',
  
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatAnalytics.tsx',
      template: 'templates/ChatAnalytics.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}