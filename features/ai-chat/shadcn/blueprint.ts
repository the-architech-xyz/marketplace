import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

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
      path: 'src/lib/ai-chat/types.ts',
      template: 'templates/ai-chat-types.ts.tpl'
    },

    // Create AI chat hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/ai-chat/hooks.ts',
      template: 'templates/ai-chat-hooks.ts.tpl'
    },

    // Create AI chat store
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/ai-chat/store.ts',
      template: 'templates/ai-chat-store.ts.tpl'
    },

    // Create AI chat utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/ai-chat/utils.ts',
      template: 'templates/ai-chat-utils.ts.tpl'
    },

    // Create AI chat services
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/ai-chat/services.ts',
      template: 'templates/ai-chat-services.ts.tpl'
    },

    // Create API routes
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/chat/route.ts',
      template: 'templates/api-chat.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/chat/messages/route.ts',
      template: 'templates/api-chat-messages.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/chat/stream/route.ts',
      template: 'templates/api-chat-stream.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/chat/export/route.ts',
      template: 'templates/api-chat-export.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/chat/import/route.ts',
      template: 'templates/api-chat-import.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/chat/upload/route.ts',
      template: 'templates/api-chat-upload.ts.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/chat/voice/route.ts',
      template: 'templates/api-chat-voice.ts.tpl'
    },

    // Create AI chat components
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/ChatInterface.tsx',
      template: 'templates/ChatInterface.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/MessageList.tsx',
      template: 'templates/MessageList.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/MessageInput.tsx',
      template: 'templates/MessageInput.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/MessageBubble.tsx',
      template: 'templates/MessageBubble.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/ChatToolbar.tsx',
      template: 'templates/ChatToolbar.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/FileUpload.tsx',
      template: 'templates/FileUpload.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/VoiceInput.tsx',
      template: 'templates/VoiceInput.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/VoiceOutput.tsx',
      template: 'templates/VoiceOutput.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/CodeBlock.tsx',
      template: 'templates/CodeBlock.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/MarkdownRenderer.tsx',
      template: 'templates/MarkdownRenderer.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/ChatExport.tsx',
      template: 'templates/ChatExport.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/ChatImport.tsx',
      template: 'templates/ChatImport.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/ChatHistory.tsx',
      template: 'templates/ChatHistory.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/ai-chat/ChatSettings.tsx',
      template: 'templates/ChatSettings.tsx.tpl'
    },

    // Create AI chat pages
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/chat/page.tsx',
      template: 'templates/chat-page.tsx.tpl'
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/chat/[id]/page.tsx',
      template: 'templates/chat-detail-page.tsx.tpl'
    },

    // Create AI chat context
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/contexts/ChatContext.tsx',
      template: 'templates/ChatContext.tsx.tpl'
    },

    // Create AI chat provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/providers/ChatProvider.tsx',
      template: 'templates/ChatProvider.tsx.tpl'
    },

    // Create AI chat middleware
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/middleware/chat-middleware.ts',
      template: 'templates/chat-middleware.ts.tpl'
    }
  ]
};

export default aiChatBlueprint;
