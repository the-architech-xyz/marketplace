/**
 * AI-POWERED APPLICATION STARTER
 * 
 * A showcase for AI capabilities: chat interface, completions, analytics.
 * Perfect for building ChatGPT-like applications, AI assistants, or AI-powered tools.
 * 
 * Stack: Next.js + Vercel AI SDK + Drizzle + Stripe (AI usage billing)
 * Pattern: AI-first architecture with streaming, persistence, and monetization
 * Use Case: AI chatbots, AI writing tools, AI coding assistants, AI analytics
 */

import { defineGenome } from '@thearchitech.xyz/marketplace/types';

export default defineGenome({
  version: '1.0.0',
  project: {
    name: 'ai-powered-app',
    framework: 'nextjs',
    path: './ai-app',
    description: 'AI-powered application with chat, completions, and usage-based billing',
  },
  
  modules: [
    // ============================================================================
    // FOUNDATION
    // ============================================================================

    // Framework
    {
      id: 'framework/nextjs',
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        appRouter: true,
        srcDir: true,
        importAlias: '@',
        features: {
          streaming: true,       // Essential for AI responses
          performance: true,
        },
      },
    },

    // Database (for conversation history)
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'neon',
        databaseType: 'postgresql',
        features: {
          migrations: true,
          relations: true,       // Conversations → Messages → Users
        },
      },
    },

    // Golden Core: Essential tech stack
    {
      id: 'core/golden-stack',
      parameters: {
        zustand: {
          persistence: true,     // Persist chat history
          devtools: true,
          immer: true,
        },
        vitest: {
          coverage: true,
        },
        eslint: {
          strict: true,
        },
        prettier: {
          tailwind: true,
        },
      },
    },

    // Data Fetching
    {
      id: 'data-fetching/tanstack-query',
      parameters: {
        devtools: true,
        suspense: true,
      },
    },

    // UI
    {
      id: 'ui/shadcn-ui',
      parameters: {
        theme: 'default',
        components: [
          'button', 'card', 'input', 'textarea', 'label',
          'avatar', 'badge', 'separator', 'scroll-area',
          'dialog', 'dropdown-menu', 'tabs', 'slider',
          'switch', 'sonner'
        ],
      },
    },

    // ============================================================================
    // AI CAPABILITIES
    // ============================================================================

    // AI SDK
    {
      id: 'ai/vercel-ai-sdk',
      parameters: {
        providers: ['openai', 'anthropic'],  // Multiple providers
        features: {
          streaming: true,
          tools: true,          // Function calling
          embeddings: false,    // Keep it simple
        },
      },
    },

    // AI Chat Feature (Full-Featured)
    {
      id: 'connectors/ai/vercel-ai-nextjs',
      parameters: {},
    },

    {
      id: 'features/ai-chat/backend/nextjs',
      parameters: {
        streaming: true,
        fileUpload: true,       // Upload images/docs to chat
        voiceInput: false,      // Voice can be added later
        voiceOutput: false,
        exportImport: true,     // Export conversations
      },
    },

    {
      id: 'features/ai-chat/frontend/shadcn',
      parameters: {
        features: {
          core: true,
          media: true,          // File attachments
          voice: false,         // Defer to v2
        },
        theme: 'default',
      },
    },

    // ============================================================================
    // MONETIZATION (Usage-Based Billing)
    // ============================================================================

    // Authentication (required for billing)
    {
      id: 'auth/better-auth',
      parameters: {
        emailPassword: true,
      },
    },

    {
      id: 'connectors/auth/better-auth-nextjs',
      parameters: {},
    },

    {
      id: 'features/auth/tech-stack',
      parameters: {},
    },

    {
      id: 'features/auth/frontend/shadcn',
      parameters: {
        features: {
          signIn: true,
          signUp: true,
          profile: true,
        },
      },
    },

    // Payments (Usage-Based for AI Tokens)
    {
      id: 'payment/stripe',
      parameters: {
        currency: 'usd',
        mode: 'test',
        webhooks: true,
        dashboard: true,
      },
    },

    {
      id: 'features/payments/backend/stripe-nextjs',
      parameters: {
        features: {
          organizationBilling: true,
          seats: true,
          usage: true,           // Critical for AI billing
          webhooks: true,
        },
      },
    },

    {
      id: 'features/payments/frontend/shadcn',
      parameters: {
        features: {
          checkout: true,
          subscriptions: true,
          analytics: true,       // Show token usage
        },
      },
    },

    // ============================================================================
    // DEVELOPER EXPERIENCE
    // ============================================================================

    // Monitoring (track AI errors and latency)
    {
      id: 'observability/sentry',
      parameters: {
        features: {
          errorTracking: true,
          performance: true,     // Monitor AI response times
        },
      },
    },

    {
      id: 'features/monitoring/shadcn',
      parameters: {
        features: {
          performance: true,     // Track AI latency
          errors: true,
        },
      },
    },

    // NOTE: Testing and Quality tools are included in core/golden-stack above
  ],
});

