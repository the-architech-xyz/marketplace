/**
 * TAMAGUI MONOREPO - Capability-Driven Version
 * 
 * A full-stack monorepo with Next.js web app, Expo mobile app, and shared Tamagui UI components.
 * Perfect for teams building cross-platform applications with consistent design systems.
 * 
 * Stack: Next.js + Expo + Tamagui + tRPC + Turborepo + Auth + Payments + Emailing
 * Pattern: Monorepo with shared UI components and full-stack capabilities
 * Use Case: Cross-platform apps, design systems, team collaboration, SaaS platforms
 */

import { defineCapabilityGenome } from '@thearchitech.xyz/marketplace/types';

export default defineCapabilityGenome({
  version: '1.0.0',
  project: {
    name: 'tamagui-monorepo',
    description: 'A full-stack monorepo with Next.js web and Expo mobile apps using Tamagui',
    structure: 'monorepo',
    apps: [
      {
        id: 'web',
        type: 'web',
        framework: 'nextjs',
        package: 'apps/web',
        router: 'app',
        alias: '@/',
        parameters: {
          typescript: true,
          tailwind: true,
          eslint: true,
          srcDir: true,
          importAlias: '@/'
        }
      },
      {
        id: 'mobile',
        type: 'mobile',
        framework: 'expo',
        package: 'apps/mobile',
        alias: '@/',
        parameters: {
          workflow: 'managed'
        }
      }
    ],
    monorepo: {
      tool: 'turborepo',
      packages: {
        api: 'packages/api',
        web: 'apps/web',
        mobile: 'apps/mobile',
        shared: 'packages/shared',
        ui: 'packages/ui'
      }
    }
  },

  // Capability-driven approach - much cleaner and more declarative!
  capabilities: {
    auth: {
      provider: 'better-auth',
      adapter: {
        emailPassword: true,
        emailVerification: true,
        oauthProviders: ['github', 'google'],
        twoFactor: true,
        organizations: true,
      },
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
        hasStores: true,
      },
    },
    
    payments: {
      provider: 'stripe',
      adapter: {
        currency: 'usd',
        mode: 'test',
        webhooks: true,
        dashboard: true,
      },
      frontend: {
        features: {
          core: true,
          checkout: true,
          subscriptions: true,
          invoices: true,
          paymentMethods: true,
          billingPortal: true,
          webhooks: true,
          analytics: true,
        }
      },
      techStack: {
        hasTypes: true,
        hasSchemas: true,
        hasHooks: true,
        hasStores: true,
      },
    },

    emailing: {
      provider: 'resend',
      adapter: {
        apiKey: '',
        fromEmail: '',
      },
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
        hasHooks: true,
      },
    }
  }
});


