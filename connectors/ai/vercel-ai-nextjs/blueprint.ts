/**
 * Vercel AI SDK + Next.js Connector Blueprint
 * 
 * This connector provides COMPLETE Vercel AI integration for Next.js:
 * - Vercel AI SDK setup and configuration
 * - Next.js API routes for chat and completion
 * - React hooks (useChat, useCompletion) with custom config
 * - Streaming support
 * 
 * This is a CONNECTOR because it:
 * - Integrates external SDK (Vercel AI)
 * - Wires it into specific framework (Next.js)
 * - Provides complete ready-to-use integration
 * - No custom business logic (just SDK usage)
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/ai/vercel-ai-nextjs'>
): BlueprintAction[] {
  const { params, features } = extractTypedModuleParameters(config);

  return [
    // NOTE: No package installation needed - adapter handles 'ai' and AI SDK packages
    // We only add Next.js specific integration (API routes, streaming)
    
    // NOTE: AI config and types come from adapter (src/lib/ai/config.ts, src/lib/ai/types.ts)
    // Connector just uses them, doesn't recreate them
    
    // Re-export adapter's useChat hook for convenience
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.packages.shared.src}ai/hooks.ts',
      content: `/**
 * AI Hooks - Next.js Connector
 * 
 * Re-exports AI hooks from adapter.
 * The adapter provides the React hooks (useChat, useCompletion),
 * we just re-export for convenience.
 */
export { useChat, useCompletion } from 'ai/react';
`,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Chat API route (streaming) - BACKEND API (resolves to apps.api.routes or apps.web.app/api)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.backend.api}chat/route.ts',
      template: 'templates/chat-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // Completion API route (if advanced features enabled) - BACKEND API
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.backend.api}completion/route.ts',
      template: 'templates/completion-route.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },
    
    // AI Provider component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.apps.web.components}providers/AIProvider.tsx',
      template: 'templates/AIProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ];
}

