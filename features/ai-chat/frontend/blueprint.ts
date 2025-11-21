import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * AI Chat Frontend Implementation: Shadcn/ui
 * 
 * Complete modular AI chat interface using Shadcn components
 * Uses UI marketplace templates via convention-based loading (`ui/...` prefix)
 */
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
      path: '${paths.apps.web.components}ai-chat/ChatInterface.tsx',
      template: 'ui/ai-chat/ChatInterface.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/MessageBubble.tsx',
      template: 'ui/ai-chat/MessageBubble.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/ConversationSidebar.tsx',
      template: 'ui/ai-chat/ConversationSidebar.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Core AI chat hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src.hooks}useAIChatExtended.ts',
      template: 'ui/ai-chat/useAIChatExtended.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    // Core chat page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.app}chat/page.tsx',
      template: 'ui/ai-chat/chat-page.tsx.tpl',
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
      path: '${paths.apps.web.components}ai-chat/ChatContext.tsx',
      template: 'ui/ai-chat/ChatContext.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/ChatProvider.tsx',
      template: 'ui/ai-chat/ChatProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/AIProvider.tsx',
      template: 'ui/ai-chat/AIProvider.tsx.tpl',
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
      path: '${paths.apps.web.components}ai-chat/FileUpload.tsx',
      template: 'ui/ai-chat/FileUpload.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/MediaPreview.tsx',
      template: 'ui/ai-chat/MediaPreview.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src.hooks}useFileUpload.ts',
      template: 'ui/ai-chat/useFileUpload.ts.tpl',
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
      path: '${paths.apps.web.components}ai-chat/VoiceInput.tsx',
      template: 'ui/ai-chat/VoiceInput.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/VoiceOutput.tsx',
      template: 'ui/ai-chat/VoiceOutput.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src.hooks}useVoice.ts',
      template: 'ui/ai-chat/useVoice.ts.tpl',
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
      path: '${paths.apps.web.components}ai-chat/ChatHistory.tsx',
      template: 'ui/ai-chat/ChatHistory.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/MessageHistory.tsx',
      template: 'ui/ai-chat/MessageHistory.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/MessageList.tsx',
      template: 'ui/ai-chat/MessageList.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.app}chat/[id]/page.tsx',
      template: 'ui/ai-chat/chat-detail-page.tsx.tpl',
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
      path: '${paths.apps.web.components}ai-chat/MessageInput.tsx',
      template: 'ui/ai-chat/MessageInput.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/MarkdownRenderer.tsx',
      template: 'ui/ai-chat/MarkdownRenderer.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/CodeBlock.tsx',
      template: 'ui/ai-chat/CodeBlock.tsx.tpl',
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
      path: '${paths.apps.web.components}ai-chat/ChatToolbar.tsx',
      template: 'ui/ai-chat/ChatToolbar.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/LoadingIndicator.tsx',
      template: 'ui/ai-chat/LoadingIndicator.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/ErrorDisplay.tsx',
      template: 'ui/ai-chat/ErrorDisplay.tsx.tpl',
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
      path: '${paths.apps.web.components}ai-chat/ChatSettings.tsx',
      template: 'ui/ai-chat/ChatSettings.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/SettingsPanel.tsx',
      template: 'ui/ai-chat/SettingsPanel.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}ai-chat/ai-config.ts',
      template: 'ui/ai-chat/ai-config.ts.tpl',
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
      path: '${paths.apps.web.components}ai-chat/CustomPrompts.tsx',
      template: 'ui/ai-chat/CustomPrompts.tsx.tpl',
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
      path: '${paths.apps.web.components}ai-chat/ChatExport.tsx',
      template: 'ui/ai-chat/ChatExport.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/ChatImport.tsx',
      template: 'ui/ai-chat/ChatImport.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}ai-chat/ExportImport.tsx',
      template: 'ui/ai-chat/ExportImport.tsx.tpl',
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
      path: '${paths.apps.web.components}ai-chat/ChatAnalytics.tsx',
      template: 'ui/ai-chat/ChatAnalytics.tsx.tpl',
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
      path: '${paths.apps.web.app}projects/page.tsx',
      template: 'ui/ai-chat/projects-page.tsx.tpl',
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
      path: '${paths.apps.web.middleware}chat-middleware.ts',
      template: 'ui/ai-chat/chat-middleware.ts.tpl',
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
      path: '${paths.packages.shared.src}ai-chat/ai-chat-services.ts',
      template: 'ui/ai-chat/ai-chat-services.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}ai-chat/ai-chat-utils.ts',
      template: 'ui/ai-chat/ai-chat-utils.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}ai-chat/ai-providers.ts',
      template: 'ui/ai-chat/ai-providers.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}ai-chat/ai-types.ts',
      template: 'ui/ai-chat/ai-types.ts.tpl',
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
      path: '${paths.packages.shared.src.hooks}use-chat.ts',
      template: 'ui/ai-chat/use-chat.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src.hooks}use-completion.ts',
      template: 'ui/ai-chat/use-completion.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.backend.api}completion/route.ts', // BACKEND API (resolves to apps.api.routes or apps.web.app/api)
      template: 'ui/ai-chat/completion-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  ];
}