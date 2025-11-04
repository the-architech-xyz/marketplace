/**
 * AI CHAT STARTER - Capability-Driven
 * 
 * Next.js + Shadcn UI based AI chat starter using Vercel AI SDK (optional auth)
 */

import { defineCapabilityGenome } from '@thearchitech.xyz/marketplace/types';

export default defineCapabilityGenome({
  version: '1.0.0',
  project: {
    name: 'ai-chat-starter',
    description: 'AI chat starter with optional auth and monitoring',
    path: './ai-chat',
    structure: 'single-app',
    apps: [
      {
        id: 'web',
        type: 'web',
        framework: 'nextjs',
        package: '.',
        router: 'app',
        alias: '@/',
        parameters: {
          typescript: true,
          tailwind: true,
          eslint: true,
          srcDir: true,
          importAlias: '@/'
        }
      }
    ]
  },

  capabilities: {
    'ai-chat': {
      provider: 'custom',
      adapter: {},
      frontend: {
        features: {
          chat: true,
          services: true,
          completion: true
        }
      },
      techStack: {
        hasTypes: true,
        hasHooks: true,
        hasStores: true
      }
    },

    // Optional auth (comment out to disable)
    auth: {
      provider: 'better-auth',
      adapter: {
        emailPassword: true
      },
      frontend: {
        features: {
          signIn: true,
          signUp: true
        }
      },
      techStack: {
        hasTypes: true,
        hasSchemas: true,
        hasHooks: true,
        hasStores: true
      }
    }
  }
});


