/**
 * TAMAGUI MONOREPO - V2 Format
 * 
 * A full-stack monorepo with Next.js web app, Expo mobile app, and shared Tamagui UI components.
 * Perfect for teams building cross-platform applications with consistent design systems.
 * 
 * Stack: Next.js + Expo + Tamagui + tRPC + Turborepo + Auth + Payments + Emailing
 * Pattern: Monorepo with shared UI components and full-stack capabilities
 * Use Case: Cross-platform apps, design systems, team collaboration, SaaS platforms
 */

import { defineV2Genome } from '@thearchitech.xyz/types';

export default defineV2Genome({
  workspace: {
    name: 'tamagui-monorepo',
    description: 'A full-stack monorepo with Next.js web and Expo mobile apps using Tamagui'
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
        oauthProviders: ['github', 'google'],
        twoFactor: true,
        organizations: true,
        teams: false,
        frontend: {
          features: {
            signIn: true,
            signUp: true,
            passwordReset: true,
            profile: true,
            socialLogins: true,
            organizationManagement: true
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
      provider: 'stripe',
      parameters: {
        currency: 'usd',
        mode: 'test',
        webhooks: true,
        dashboard: true,
        frontend: {
          features: {
            core: true,
            checkout: true,
            subscriptions: true,
            invoices: true,
            paymentMethods: true,
            billingPortal: true,
            webhooks: true,
            analytics: true
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
            analytics: true,
            campaigns: true
          }
        },
        techStack: {
          hasTypes: true,
          hasSchemas: true,
          hasHooks: true
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

    // Backend - Hono
    backend: {
      from: 'official',
      provider: 'hono',
      parameters: {
        mode: 'standalone',
        port: 3001
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
          relations: true,
          studio: false,
          seeding: false
        }
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
      dependencies: ['auth', 'payments', 'emailing', 'ui', 'data-fetching', 'database', 'monorepo'],
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        srcDir: true,
        importAlias: '@/',
        reactVersion: '18',
        router: 'app'
      }
    },
    mobile: {
      type: 'mobile',
      framework: 'expo',
      package: 'apps/mobile',
      dependencies: ['auth', 'payments', 'emailing', 'ui', 'data-fetching', 'database', 'monorepo'],
      parameters: {
        typescript: true,
        expoRouter: true,
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
