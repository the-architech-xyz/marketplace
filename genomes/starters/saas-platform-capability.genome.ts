/**
 * FULL SAAS PLATFORM STARTER - V2 Format
 * 
 * The complete, production-ready SaaS application template.
 * Everything you need to launch: auth, payments, teams, monitoring, and more.
 * 
 * Stack: Next.js + Drizzle + Stripe + Better Auth + Full Feature Set
 * Pattern: Enterprise-grade, multi-tenant SaaS architecture
 * Use Case: B2B SaaS, productivity tools, collaboration platforms
 */

import { defineV2Genome } from '@thearchitech.xyz/types';

export default defineV2Genome({
  workspace: {
    name: 'saas-platform',
    description: 'Complete SaaS platform with teams, billing, and monitoring'
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
        twoFactor: true,
        organizations: true,
        teams: false,
        frontend: {
          features: {
            signIn: true,
            signUp: true,
            passwordReset: true,
            twoFactor: true,
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
            teams: true,
            invitations: true,
            roles: true,
            members: true,
            billing: true,
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

    // Data Fetching
    'data-fetching': {
      from: 'official',
      provider: 'tanstack-query',
      parameters: {
        devtools: true
      }
    }
  },

  apps: {
    web: {
      type: 'web',
      framework: 'nextjs',
      package: 'apps/web',
      dependencies: ['auth', 'payments', 'teams-management', 'emailing', 'monitoring', 'database', 'data-fetching'],
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
