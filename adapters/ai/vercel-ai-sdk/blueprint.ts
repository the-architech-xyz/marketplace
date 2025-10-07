import { Blueprint, BlueprintActionType, ModifierType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

const vercelAiSdkBlueprint: Blueprint = {
  id: 'vercel-ai-sdk',
  name: 'Vercel AI SDK',
  description: 'Pure Vercel AI SDK for building AI-powered applications',
  version: '1.0.0',
  actions: [
    // Install AI SDK packages
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
    // Create AI configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/ai/config.ts',
      template: 'templates/ai-config.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create AI providers
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/ai/providers.ts',
      template: 'templates/ai-providers.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create chat hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-chat.ts',
      template: 'templates/use-chat.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create text generation hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-completion.ts',
      template: 'templates/use-completion.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create streaming hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-streaming.ts',
      template: 'templates/use-streaming.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create AI utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/ai/utils.ts',
      template: 'templates/ai-utils.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create AI types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/types/ai.ts',
      template: 'templates/ai-types.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }},
    // Create API routes for AI
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/chat/route.ts',
      template: 'templates/chat-route.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/app/api/completion/route.ts',
      template: 'templates/completion-route.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    // Create AI context provider
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/contexts/AIProvider.tsx',
      template: 'templates/AIProvider.tsx.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    // Add environment variables
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: '.env.example',
      modifier: ModifierType.ENV_MERGER,
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
