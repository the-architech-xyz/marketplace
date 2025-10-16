import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'features/ai-chat/frontend/shadcn'>
): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);
  
  // ============================================================================
  // MODULAR AI CHAT IMPLEMENTATION
  // ============================================================================
  // Note: Technology stack layer is automatically included by the CLI
  
  // Core is always generated (essential chat functionality)
  actions.push(...generateCoreActions());
  
  // Context is always generated (required for core functionality)
  actions.push(...generateContextActions());
  
  // Optional features based on enabled capabilities
  if (features.media) {
    actions.push(...generateMediaActions());
  }
  
  if (features.voice) {
    actions.push(...generateVoiceActions());
  }
  
  if (features.history) {
    actions.push(...generateHistoryActions());
  }
  
  if (features.input) {
    actions.push(...generateInputActions());
  }
  
  if (features.toolbar) {
    actions.push(...generateToolbarActions());
  }
  
  if (features.settings) {
    actions.push(...generateSettingsActions());
  }
  
  if (features.prompts) {
    actions.push(...generatePromptsActions());
  }
  
  if (features.export) {
    actions.push(...generateExportActions());
  }
  
  if (features.analytics) {
    actions.push(...generateAnalyticsActions());
  }
  
  if (features.projects) {
    actions.push(...generateProjectsActions());
  }
  
  if (features.middleware) {
    actions.push(...generateMiddlewareActions());
  }
  
  if (features.services) {
    actions.push(...generateServicesActions());
  }
  
  if (features.completion) {
    actions.push(...generateCompletionActions());
  }
  
  return actions;
}

// ============================================================================
// CORE CAPABILITY - Essential chat interface with basic messaging
// ============================================================================
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
      path: '{{paths.components}}ai-chat/MessageBubble.tsx',
      template: 'templates/MessageBubble.tsx.tpl',
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
    },
    // Core chat page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}chat/page.tsx',
      template: 'templates/chat-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// CONTEXT CAPABILITY - Chat context and provider management
// ============================================================================
function generateContextActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatContext.tsx',
      template: 'templates/ChatContext.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatProvider.tsx',
      template: 'templates/ChatProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/AIProvider.tsx',
      template: 'templates/AIProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// MEDIA CAPABILITY - File upload and media preview capabilities
// ============================================================================
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
      path: '{{paths.components}}ai-chat/FileUpload.tsx',
      template: 'templates/FileUpload.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/MediaPreview.tsx',
      template: 'templates/MediaPreview.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.hooks}}useFileUpload.ts',
      template: 'templates/useFileUpload.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// VOICE CAPABILITY - Voice input and output functionality
// ============================================================================
function generateVoiceActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-speech-recognition',
        'react-speech-kit'
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

// ============================================================================
// HISTORY CAPABILITY - Advanced conversation history and management
// ============================================================================
function generateHistoryActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatHistory.tsx',
      template: 'templates/ChatHistory.tsx.tpl',
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
      path: '{{paths.components}}ai-chat/MessageList.tsx',
      template: 'templates/MessageList.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}chat/[id]/page.tsx',
      template: 'templates/chat-detail-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// INPUT CAPABILITY - Advanced message input with features
// ============================================================================
function generateInputActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/MessageInput.tsx',
      template: 'templates/MessageInput.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/MarkdownRenderer.tsx',
      template: 'templates/MarkdownRenderer.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/CodeBlock.tsx',
      template: 'templates/CodeBlock.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// TOOLBAR CAPABILITY - Chat toolbar and controls
// ============================================================================
function generateToolbarActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatToolbar.tsx',
      template: 'templates/ChatToolbar.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
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
    }
  ];
}

// ============================================================================
// SETTINGS CAPABILITY - Chat settings and configuration
// ============================================================================
function generateSettingsActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatSettings.tsx',
      template: 'templates/ChatSettings.tsx.tpl',
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
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}ai-chat/ai-config.ts',
      template: 'templates/ai-config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// PROMPTS CAPABILITY - Custom prompts and templates
// ============================================================================
function generatePromptsActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/CustomPrompts.tsx',
      template: 'templates/CustomPrompts.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// EXPORT CAPABILITY - Chat export and import functionality
// ============================================================================
function generateExportActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatExport.tsx',
      template: 'templates/ChatExport.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatImport.tsx',
      template: 'templates/ChatImport.tsx.tpl',
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
    }
  ];
}

// ============================================================================
// ANALYTICS CAPABILITY - Chat analytics and insights
// ============================================================================
function generateAnalyticsActions(): BlueprintAction[] {
  return [
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

// ============================================================================
// PROJECTS CAPABILITY - Project-based chat organization
// ============================================================================
function generateProjectsActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}projects/page.tsx',
      template: 'templates/projects-page.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// MIDDLEWARE CAPABILITY - Chat middleware and routing
// ============================================================================
function generateMiddlewareActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.middleware}}chat-middleware.ts',
      template: 'templates/chat-middleware.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// SERVICES CAPABILITY - AI chat service utilities
// ============================================================================
function generateServicesActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}ai-chat/ai-chat-services.ts',
      template: 'templates/ai-chat-services.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}ai-chat/ai-chat-utils.ts',
      template: 'templates/ai-chat-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}ai-chat/ai-providers.ts',
      template: 'templates/ai-providers.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.lib}}ai-chat/ai-types.ts',
      template: 'templates/ai-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// COMPLETION CAPABILITY - Text completion and generation
// ============================================================================
function generateCompletionActions(): BlueprintAction[] {
  return [
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
      path: '{{paths.hooks}}use-completion.ts',
      template: 'templates/use-completion.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/completion/route.ts',
      template: 'templates/completion-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}