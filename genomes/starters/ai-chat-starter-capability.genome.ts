/**
 * AI CHAT STARTER - V2 Format
 * 
 * Next.js + Shadcn UI based AI chat starter using Vercel AI SDK (optional auth)
 */

import { defineV2Genome } from '@thearchitech.xyz/types';

export default defineV2Genome({
  workspace: {
    name: 'ai-chat-starter',
    description: 'AI chat starter with optional auth and monitoring'
  },

  marketplaces: {
    official: {
      type: 'local',
      path: '../marketplace'
    }
  },

  packages: {
    // AI Chat capability
    'ai-chat': {
      from: 'official',
      provider: 'custom',
      parameters: {
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
      }
    },

    // Optional auth capability
    auth: {
      from: 'official',
      provider: 'better-auth',
      parameters: {
        emailPassword: true,
        emailVerification: false,
        oauthProviders: [],
        twoFactor: false,
        organizations: false,
        teams: false,
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
  },

  apps: {
    web: {
      type: 'web',
      framework: 'nextjs',
      package: 'apps/web',
      dependencies: ['ai-chat', 'auth'],
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        srcDir: true,
        importAlias: '@/',
        reactVersion: '18',
        router: 'app'
      }
    }
  }
});
