import { Blueprint } from '@thearchitech.xyz/types';

const vercelAiSdkBlueprint: Blueprint = {
  id: 'vercel-ai-sdk',
  name: 'Vercel AI SDK',
  description: 'Pure Vercel AI SDK for building AI-powered applications',
  version: '1.0.0',
  actions: [
    // Install AI SDK packages
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'ai',
        '@ai-sdk/react',
        '@ai-sdk/openai',
        '@ai-sdk/anthropic'
      ]
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        '@types/node'
      ],
      isDev: true
    },
    // Create AI configuration
    {
      type: 'CREATE_FILE',
      path: 'src/lib/ai/config.ts',
      template: 'templates/ai-config.ts.tpl'
    },
    // Create AI providers
    {
      type: 'CREATE_FILE',
      path: 'src/lib/ai/providers.ts',
      template: 'templates/ai-providers.ts.tpl'
    },
    // Create chat hooks
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-chat.ts',
      template: 'templates/use-chat.ts.tpl'
    },
    // Create text generation hooks
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-completion.ts',
      template: 'templates/use-completion.ts.tpl'
    },
    // Create streaming hooks
    {
      type: 'CREATE_FILE',
      path: 'src/hooks/use-streaming.ts',
      template: 'templates/use-streaming.ts.tpl'
    },
    // Create AI utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/ai/utils.ts',
      template: 'templates/ai-utils.ts.tpl'
    },
    // Create AI types
    {
      type: 'CREATE_FILE',
      path: 'src/types/ai.ts',
      template: 'templates/ai-types.ts.tpl'
    },
    // Create API routes for AI
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/chat/route.ts',
      template: 'templates/chat-route.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/app/api/completion/route.ts',
      template: 'templates/completion-route.ts.tpl'
    },
    // Create AI context provider
    {
      type: 'CREATE_FILE',
      path: 'src/contexts/AIProvider.tsx',
      template: 'templates/AIProvider.tsx.tpl'
    },
    // Add environment variables
    {
      type: 'ENHANCE_FILE',
      path: '.env.example',
      modifier: 'env-merger',
      params: {
        variables: [
          {
            name: 'OPENAI_API_KEY',
            value: 'your-openai-api-key-here',
            description: 'OpenAI API key for text generation'
          },
          {
            name: 'ANTHROPIC_API_KEY',
            value: 'your-anthropic-api-key-here',
            description: 'Anthropic API key for Claude models'
          }
        ]
      }
    }
  ]
};

export default vercelAiSdkBlueprint;
