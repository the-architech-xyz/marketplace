/**
 * FULL SAAS PLATFORM STARTER
 * 
 * The complete, production-ready SaaS application template.
 * Everything you need to launch: auth, payments, teams, monitoring, and more.
 * 
 * Stack: Next.js + Drizzle + Stripe + Better Auth + Full Feature Set
 * Pattern: Enterprise-grade, multi-tenant SaaS architecture
 * Use Case: B2B SaaS, productivity tools, collaboration platforms
 */

import { defineGenome } from '@thearchitech.xyz/marketplace/types';

export default defineGenome({
  version: '1.0.0',
  project: {
    name: 'saas-platform',
    framework: 'nextjs',
    path: './saas-app',
    description: 'Complete SaaS platform with teams, billing, and monitoring',
  },
  
  modules: [
    // ============================================================================
    // FOUNDATION LAYER
    // ============================================================================

    // Core Framework
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
          seo: true,
          imageOptimization: true,
          performance: true,
        },
      },
    },

    // Database
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'neon',        // Database service provider
        databaseType: 'postgresql',  // Database type
        features: {
          migrations: true,
          relations: true,
          seeding: true,
          studio: true,           // Drizzle Studio for admin
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

    // State Management
    {
      id: 'state/zustand',
      parameters: {
        persistence: true,      // Persist user preferences
        devtools: true,
        immer: true,
      },
    },

    // UI Foundation
    {
      id: 'ui/shadcn-ui',
      parameters: {
        theme: 'default',
        components: [
          'button', 'input', 'card', 'label', 'alert', 'switch', 'textarea', 
          'separator', 'pagination', 'dialog', 'dropdown-menu', 'form', 
          'tabs', 'table', 'badge', 'avatar', 'calendar', 'checkbox'
        ],
      },
    },

    // ============================================================================
    // BUSINESS FEATURES
    // ============================================================================

    // Authentication
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['email'],
        session: 'jwt',
        csrf: true,
      },
    },

    {
      id: 'features/auth/backend/better-auth-nextjs',
      parameters: {
        features: {
          emailPassword: true,
          emailVerification: true,
          passwordReset: true,
          twoFactor: true,
          sessions: true,
          organizations: true,
        },
      },
    },

    {
      id: 'features/auth/frontend/shadcn',
      parameters: {
        features: {
          signIn: true,
          signUp: true,
          passwordReset: true,
          twoFactor: true,
          profile: true,
          organizationManagement: true,
        },
      },
    },

    // Payments & Billing
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
      id: 'connectors/stripe/nextjs-drizzle',
      parameters: {
        features: {
          organizationBilling: true,
          seats: true,
          usage: true,
          webhooks: true,
        },
      },
    },

    {
      id: 'features/payments/backend/stripe-nextjs',
      parameters: {
        checkout: true,
        subscriptions: true,
        invoices: true,
        paymentMethods: true,
        analytics: true,
        organizationBilling: true,
      },
    },

    {
      id: 'features/payments/frontend/shadcn',
      parameters: {
        features: {
          checkout: true,
          subscriptions: true,
          invoices: true,
          paymentMethods: true,
          billingPortal: true,
        },
      },
    },

    // Team Management
    {
      id: 'features/teams-management/backend/better-auth-nextjs',
      parameters: {
        features: {
          teams: true,
          invitations: true,
          roles: true,
          permissions: true,
        },
      },
    },

    {
      id: 'features/teams-management/frontend/shadcn',
      parameters: {
        features: {
          teams: true,
          members: true,
          invitations: true,
          roles: true,
          billing: true,           // Requires payments
          analytics: true,
        },
      },
    },

    // Email Communications
    {
      id: 'email/resend',
      parameters: {
        features: {
          templates: true,
          analytics: true,
        },
      },
    },

    {
      id: 'features/emailing/backend/resend-nextjs',
    },

    {
      id: 'features/emailing/frontend/shadcn',
      parameters: {
        features: {
          templates: true,
          campaigns: true,
          analytics: true,
        },
      },
    },

    // ============================================================================
    // DEVELOPER EXPERIENCE & OPERATIONS
    // ============================================================================

    // Monitoring & Observability
    {
      id: 'observability/sentry',
      parameters: {
        features: {
          errorTracking: true,
          performance: true,
          replay: true,            // Session replay for debugging
        },
      },
    },

    {
      id: 'features/monitoring/shadcn',
      parameters: {
        features: {
          performance: true,
          errors: true,
          feedback: true,          // User feedback widget
        },
      },
    },

    // Testing
    {
      id: 'testing/vitest',
      parameters: {
        features: {
          unitTests: true,
          integrationTests: true,
          coverage: true,
        },
      },
    },

    // Quality Tools
    {
      id: 'quality/prettier',
      parameters: {
        tailwind: true,
        organizeImports: true,
      },
    },

    {
      id: 'quality/eslint',
      parameters: {
        strict: true,
        react: true,
        nextjs: true,
        typescript: true,
      },
    },

    // Deployment
    {
      id: 'deployment/vercel',
      parameters: {
        framework: 'nextjs',
        buildCommand: 'npm run build',
        outputDirectory: '.next',
        installCommand: 'npm install',
        devCommand: 'npm run dev',
        functions: {
          regions: ['iad1'],
          memory: 1024,
          maxDuration: 30
        },
      },
    },

    // ============================================================================
    // OPTIONAL: DOCKER FOR SELF-HOSTING
    // ============================================================================

    {
      id: 'deployment/docker',
      parameters: {
        features: {
          development: true,
          production: true,
          compose: true,          // docker-compose with postgres
        },
      },
    },
  ],
});

