import { Blueprint, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

const aiChatBlueprint: Blueprint = {
  id: 'ai-chat-shadcn',
  name: 'AI Chat Interface (Shadcn)',
  description: 'Complete AI chat interface using Vercel AI SDK and Shadcn UI',
  version: '1.0.0',
  actions: [
    // Install AI SDK and dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'ai',
        '@ai-sdk/openai',
        '@ai-sdk/anthropic',
        '@ai-sdk/cohere',
        'react-markdown',
        'remark-gfm',
        'rehype-highlight',
        'rehype-raw',
        'react-syntax-highlighter',
        'lucide-react',
        'class-variance-authority',
        'clsx',
        'tailwind-merge'
      ],
    },

    // Create AI chat types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}ai-chat/types.ts',
      template: 'templates/ai-chat-types.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create AI chat hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}ai-chat/hooks.ts',
      template: 'templates/ai-chat-hooks.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create AI chat store
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}ai-chat/store.ts',
      template: 'templates/ai-chat-store.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create AI chat utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}ai-chat/utils.ts',
      template: 'templates/ai-chat-utils.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create AI chat services
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}ai-chat/services.ts',
      template: 'templates/ai-chat-services.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/chat/route.ts',
      template: 'templates/api-chat.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/chat/messages/route.ts',
      template: 'templates/api-chat-messages.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/chat/stream/route.ts',
      template: 'templates/api-chat-stream.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/chat/export/route.ts',
      template: 'templates/api-chat-export.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/chat/import/route.ts',
      template: 'templates/api-chat-import.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/chat/upload/route.ts',
      template: 'templates/api-chat-upload.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}api/chat/voice/route.ts',
      template: 'templates/api-chat-voice.ts.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create AI chat components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatInterface.tsx',
      template: 'templates/ChatInterface.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/MessageList.tsx',
      template: 'templates/MessageList.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/MessageInput.tsx',
      template: 'templates/MessageInput.tsx.tpl',

      conflictResolution: {
        strategy  : ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/MessageBubble.tsx',
      template: 'templates/MessageBubble.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatToolbar.tsx',
      template: 'templates/ChatToolbar.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/FileUpload.tsx',
      template: 'templates/FileUpload.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/VoiceInput.tsx',
      template: 'templates/VoiceInput.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/VoiceOutput.tsx',
      template: 'templates/VoiceOutput.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/CodeBlock.tsx',
      template: 'templates/CodeBlock.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/MarkdownRenderer.tsx',
      template: 'templates/MarkdownRenderer.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatExport.tsx',
      template: 'templates/ChatExport.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatImport.tsx',
      template: 'templates/ChatImport.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatHistory.tsx',
      template: 'templates/ChatHistory.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}ai-chat/ChatSettings.tsx',
      template: 'templates/ChatSettings.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create AI chat pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}chat/page.tsx',
      template: 'templates/chat-page.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}chat/[id]/page.tsx',
      template: 'templates/chat-detail-page.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create AI chat context
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/contexts/ChatContext.tsx',
      template: 'templates/ChatContext.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create AI chat provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/providers/ChatProvider.tsx',
      template: 'templates/ChatProvider.tsx.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create AI chat middleware
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.middleware}}chat-middleware.ts',
      template: 'templates/chat-middleware.ts.tpl',

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }}
  ]
};

export default aiChatBlueprint;
