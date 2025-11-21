/**
 * PROTOTYPE LOCAL WEBAPP GENOME - V2 Format
 * 
 * Enhanced prototype genome for local development with full-stack capabilities.
 * 
 * Stack: Next.js + Expo (Web) + Hono + tRPC + Drizzle (SQLite) + Tamagui + Better Auth + RevenueCat + Resend
 * Pattern: Monorepo with Turborepo
 * Use Case: Rapid prototyping with zero external dependencies (no Docker, no cloud services)
 * 
 * Architecture:
 * - Frontend Web: Next.js app in apps/web
 * - Frontend Mobile/Web: Expo app in apps/mobile (with web support)
 * - Backend: Hono standalone server in apps/api (runs on port 3001)
 * - Communication: tRPC for end-to-end type safety
 * - Database: SQLite (local.db file) - zero config, perfect for prototyping
 * - UI: Tamagui for cross-platform component library
 * - Auth: Better Auth with Next.js integration
 * - Payments: RevenueCat for subscription management
 * - Emailing: Resend for transactional emails
 */

import { defineV2Genome } from '@thearchitech.xyz/types';

export default defineV2Genome({
  workspace: {
    name: 'prototype-local-webapp',
    description: 'Local prototype webapp with Next.js, Expo, Hono, tRPC, SQLite, Better Auth, RevenueCat, and Resend'
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
        oauthProviders: ['google', 'github'],
        twoFactor: false,
        organizations: false,
        teams: false,
        sessionExpiry: 604800, // 7 days
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

    // Payments capability
    payments: {
      from: 'official',
      provider: 'custom', // RevenueCat is custom provider
      parameters: {
        webhooks: true,
        frontend: {
          features: {
            subscriptions: true,
            paymentMethods: true
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

    // Emailing capability
    emailing: {
      from: 'official',
      provider: 'resend',
      parameters: {
        apiKey: '',
        fromEmail: '',
        frontend: {
          features: {
            templates: true,
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
        provider: 'local',
        databaseType: 'postgresql',
        features: {
          core: true,
          migrations: true,
          relations: true,
          studio: true,
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
          mobile: true // Enable mobile support for cross-platform
        }
      }
    },

    // Data Fetching - tRPC
    'data-fetching': {
      from: 'official',
      provider: 'trpc',
      parameters: {
        transformer: 'superjson',
        abortOnUnmount: true,
        batchingEnabled: true
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
        packageManager: 'npm'
      }
    }
  },

  apps: {
    web: {
      type: 'web',
      framework: 'nextjs',
      package: 'apps/web',
      dependencies: ['auth', 'payments', 'emailing', 'database', 'ui', 'data-fetching', 'ai', 'monorepo'],
      parameters: {
        typescript: true,
        tailwind: false, // Using Tamagui instead
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
      dependencies: ['auth', 'payments', 'database', 'ui', 'data-fetching', 'ai', 'monorepo'],
      parameters: {
        typescript: true,
        expoRouter: true,
        platforms: {
          ios: true,
          android: true,
          web: true // Enable web support for Expo
        },
        alias: '@/'
      }
    },
    api: {
      type: 'api',
      framework: 'hono',
      package: 'apps/api',
      dependencies: ['auth', 'emailing', 'database', 'data-fetching', 'backend', 'monorepo'],
      parameters: {
        mode: 'standalone',
        port: 3001
      }
    }
  }
});
