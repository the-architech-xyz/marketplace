/**
 * SYNAP MVP GENOME - V2 Format
 * 
 * Complete genome for generating the Synap MVP application using V2 Composition Engine.
 * 
 * Stack: Next.js + Expo + Hono API + Neon PostgreSQL + Inngest + Cloudflare R2
 * Pattern: Monorepo with Turborepo, 3-layer architecture
 * Use Case: Personal knowledge management with AI-powered organization
 */

import { defineV2Genome } from '@thearchitech.xyz/types';

export default defineV2Genome({
  workspace: {
    name: 'synap',
    description: 'Synap - Your second brain with AI-powered organization'
  },

  marketplaces: {
    official: {
      type: 'local',
      path: '../marketplace'
    }
  },

  packages: {
    // Auth capability
    auth: {
      from: 'official',
      provider: 'better-auth',
      parameters: {
        emailPassword: true,
        emailVerification: true,
        oauthProviders: [],
        twoFactor: false,
        organizations: false,
        teams: false,
        frontend: {
          features: {
            signIn: true,
            signUp: true,
            passwordReset: true,
            profile: true
          }
        },
        techStack: {
          hasTypes: true,
          hasSchemas: true,
          hasHooks: true,
          hasStores: true
        }
      }
    },

    // AI Chat capability
    'ai-chat': {
      from: 'official',
      provider: 'custom',
      parameters: {
        frontend: {
          features: {
            core: true,
            context: true,
            media: true,
            voice: true,
            history: true,
            input: true,
            toolbar: true,
            settings: true,
            prompts: true,
            export: true
          }
        }
      }
    },

    // Emailing capability
    emailing: {
      from: 'official',
      provider: 'resend',
      parameters: {
        apiKey: '',
        fromEmail: '',
        frontend: {
          features: {
            templates: false,
            analytics: false,
            campaigns: false
          }
        },
        techStack: {
          hasTypes: true,
          hasSchemas: true,
          hasHooks: true
        }
      }
    },

    // Database
    database: {
      from: 'official',
      provider: 'drizzle',
      parameters: {
        provider: 'neon',
        databaseType: 'postgresql',
        features: {
          core: true,
          migrations: true,
          relations: false,
          studio: false,
          seeding: false
        }
      }
    },

    // UI Library
    ui: {
      from: 'official',
      provider: 'tamagui',
      parameters: {
        theme: 'default',
        platforms: {
          web: true,
          mobile: true
        }
      }
    },

    // AI SDK
    ai: {
      from: 'official',
      provider: 'vercel-ai-sdk',
      parameters: {
        providers: ['openai'],
        defaultModel: 'gpt-4-turbo',
        features: {
          core: true,
          streaming: true,
          embeddings: true,
          tools: false,
          advanced: false
        }
      }
    },

    // Data Fetching
    'data-fetching': {
      from: 'official',
      provider: 'tanstack-query',
      parameters: {
        devtools: true
      }
    },

    // Jobs
    jobs: {
      from: 'official',
      provider: 'inngest',
      parameters: {
        framework: 'hono'
      }
    },

    // Storage
    storage: {
      from: 'official',
      provider: 's3-compatible',
      parameters: {
        provider: 'r2'
      }
    },

    // Backend - Hono
    backend: {
      from: 'official',
      provider: 'hono',
      parameters: {
        mode: 'standalone',
        port: 3001
      }
    },

    // Monorepo tool
    monorepo: {
      from: 'official',
      provider: 'turborepo',
      parameters: {
        packageManager: 'pnpm'
      }
    }
  },

  apps: {
    web: {
      type: 'web',
      framework: 'nextjs',
      package: 'apps/web',
      dependencies: ['auth', 'ai-chat', 'emailing', 'database', 'ui', 'ai', 'data-fetching', 'monorepo'],
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        srcDir: true,
        importAlias: '@/',
        reactVersion: '18',
        router: 'app',
        alias: '@/'
      }
    },
    mobile: {
      type: 'mobile',
      framework: 'expo',
      package: 'apps/mobile',
      dependencies: ['auth', 'ai-chat', 'database', 'ui', 'data-fetching', 'monorepo'],
      parameters: {
        typescript: true,
        platforms: {
          ios: true,
          android: true,
          web: false
        },
        alias: '@/'
      }
    },
    api: {
      type: 'api',
      framework: 'nextjs',
      package: 'apps/api',
      dependencies: ['auth', 'emailing', 'database', 'jobs', 'storage', 'backend', 'monorepo'],
      parameters: {
        typescript: true,
        tailwind: false,
        eslint: true,
        srcDir: true,
        importAlias: '@/',
        reactVersion: '18',
        router: 'app',
        alias: '@/'
      }
    }
  }
});
