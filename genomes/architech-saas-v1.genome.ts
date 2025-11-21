/**
 * ARCHITECH SAAS V1 GENOME - V2 Format
 * 
 * Complete genome for generating The Architech SaaS V1 platform using V2 Composition Engine.
 * 
 * Stack: Next.js + Tamagui + Drizzle (Neon) + BullMQ + Better Auth + Stripe
 * Pattern: Monorepo with Turborepo, 3-layer architecture
 * Use Case: SaaS platform for generating applications with The Architech CLI
 * 
 * Architecture:
 * - "Cockpit" (SaaS App): Dashboard, auth, billing, project management
 * - Worker (External): Service that consumes BullMQ queue (not in this genome)
 */

import { defineV2Genome } from '@thearchitech.xyz/types';

export default defineV2Genome({
  workspace: {
    name: 'architech-saas',
    description: 'The Architech SaaS Platform V1 - Generate applications with AI'
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
        organizations: true,
        teams: true,
        frontend: {
          features: {
            signIn: true,
            signUp: true,
            passwordReset: true,
            profile: true,
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
            checkout: true,
            subscriptions: true,
            invoices: true,
            paymentMethods: true,
            billingPortal: true
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

    // Teams Management capability
    'teams-management': {
      from: 'official',
      provider: 'custom',
      parameters: {
        frontend: {
          features: {
            core: true,
            teams: true,
            members: true,
            invitations: true,
            roles: true,
            billing: false,
            analytics: false,
            advanced: true
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

    // Monitoring capability
    monitoring: {
      from: 'official',
      provider: 'custom',
      parameters: {
        techStack: {
          hasTypes: true,
          hasSchemas: true
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
          relations: true,
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
          mobile: false
        }
      }
    },

    // Jobs
    jobs: {
      from: 'official',
      provider: 'bullmq',
      parameters: {
        redisUrl: 'redis://localhost:6379',
        defaultQueue: 'project-generation',
        features: {
          retry: true,
          priorities: true,
          delayed: true
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

    // Observability
    observability: {
      from: 'official',
      provider: 'sentry',
      parameters: {
        features: {
          errorTracking: true,
          performance: true,
          releases: true
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
      dependencies: ['auth', 'payments', 'teams-management', 'emailing', 'database', 'ui', 'data-fetching', 'monorepo'],
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
    api: {
      type: 'api',
      framework: 'nextjs',
      package: 'apps/api',
      dependencies: ['auth', 'payments', 'emailing', 'database', 'jobs', 'observability', 'monorepo'],
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
