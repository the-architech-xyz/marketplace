/**
 * FULL SAAS PLATFORM STARTER - Capability-Driven Version
 * 
 * The complete, production-ready SaaS application template.
 * Everything you need to launch: auth, payments, teams, monitoring, and more.
 * 
 * Stack: Next.js + Drizzle + Stripe + Better Auth + Full Feature Set
 * Pattern: Enterprise-grade, multi-tenant SaaS architecture
 * Use Case: B2B SaaS, productivity tools, collaboration platforms
 */

import { defineCapabilityGenome } from '@thearchitech.xyz/marketplace/types';

export default defineCapabilityGenome({
  version: "1.0.0",
  project: {
    name: "saas-platform",
    path: "./saas-app",
    description: "Complete SaaS platform with teams, billing, and monitoring",
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

  // Capability-driven approach - much cleaner and more declarative!
  capabilities: {
    auth: {
      provider: 'better-auth',
      adapter: {
        emailPassword: true,
        twoFactor: true,
        organizations: true,
        emailVerification: true,
      },
      frontend: {
        features: {
          signIn: true,
          signUp: true,
          passwordReset: true,
          twoFactor: true,
          profile: true,
          organizationManagement: true,
        },
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
        currency: "usd",
        mode: "test",
        webhooks: true,
        dashboard: true,
      },
      frontend: {
        features: {
          checkout: true,
          subscriptions: true,
          invoices: true,
          paymentMethods: true,
          billingPortal: true,
        },
      },
      techStack: {
        hasTypes: true,
        hasSchemas: true,
        hasHooks: true,
        hasStores: true,
      },
    },

    'teams-management': {
      provider: 'custom',
      adapter: {},
      frontend: {
        features: {
          teams: true,
          invitations: true,
          roles: true,
          members: true,
          billing: true,
          analytics: true,
        },
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
          campaigns: true,
        },
      },
      techStack: {
        hasTypes: true,
        hasSchemas: true,
        hasHooks: true,
      },
    },
    

    monitoring: {
      provider: 'custom',
      adapter: {},
      techStack: {
        hasTypes: true,
        hasSchemas: true,
      },
    },
  },
  // Infrastructure modules (framework, UI, database, connectors) are automatically
  // added via marketplace defaults and auto-inclusion system based on project.framework
});


