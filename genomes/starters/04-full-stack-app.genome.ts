/**
 * FULL STACK APP STARTER
 * 
 * Enterprise-grade infrastructure with monitoring, Docker, and internationalization.
 * Everything you need for complex SaaS applications at scale.
 * 
 * Stack: Standard App + Docker + Monitoring + i18n
 * Pattern: Enterprise-grade, production at scale
 * Use Case: Enterprise SaaS, complex applications, production at scale
 */

import { defineGenome } from '@thearchitech.xyz/marketplace/types';

export default defineGenome({
  version: '1.0.0',
  project: {
    name: 'full-stack-app',
    framework: 'nextjs',
    path: './full-stack-app',
    description: 'Enterprise-grade full stack foundation',
  },

  modules: [
    // ============================================================================
    // FOUNDATION
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
        reactVersion: '18',
        features: {
          seo: true,
          imageOptimization: true,
          performance: true,
          i18n: true,
        },
      },
    },

    // Database
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'neon',
        databaseType: 'postgresql',
        features: {
          migrations: true,
          relations: true,
          seeding: true,
          studio: true,
        },
      },
    },

    // Golden Core: Essential production tech
    {
      id: 'core/golden-stack',
      parameters: {
        zustand: {
          persistence: true,
          devtools: true,
          immer: true,
        },
        vitest: {
          coverage: true,
          ui: false,
        },
        eslint: {
          strict: true,
          typescript: true,
          react: true,
          nextjs: true,
          accessibility: true,
        },
        prettier: {
          tailwind: true,
          organizeImports: true,
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

    // ============================================================================
    // INFRASTRUCTURE
    // ============================================================================

    // TanStack Query + Next.js
    {
      id: 'connectors/infrastructure/tanstack-query-nextjs',
      parameters: {
        ssr: true,
        hydration: true,
        errorBoundary: true,
        devtools: true,
      },
    },

    // Zustand + Next.js
    {
      id: 'connectors/infrastructure/zustand-nextjs',
      parameters: {
        persistence: true,
        devtools: true,
        ssr: true,
      },
    },

    // Form Infrastructure
    {
      id: 'connectors/infrastructure/rhf-zod-shadcn',
      parameters: {
        validation: true,
        accessibility: true,
        devtools: false,
      },
    },

    // ============================================================================
    // OBSERVABILITY & DEPLOYMENT
    // ============================================================================

    // Error Monitoring
    {
      id: 'observability/sentry',
      parameters: {
        dsn: process.env.SENTRY_DSN || '',
        features: {
          errorTracking: true,
          replay: true,
        },
      },
    },

    // Sentry + Next.js
    {
      id: 'connectors/monitoring/sentry-nextjs',
      parameters: {},
    },

    // Internationalization
    {
      id: 'content/next-intl',
      parameters: {
        locales: ['en', 'fr', 'es', 'de'],
        defaultLocale: 'en',
        features: {
          routing: true,
          dateFormatting: true,
          numberFormatting: true,
        },
      },
    },

    // ============================================================================
    // UI & OPERATIONS
    // ============================================================================

    // UI Components (comprehensive)
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: [
          'button',
          'input',
          'card',
          'label',
          'alert',
          'alert-dialog',
          'dialog',
          'dropdown-menu',
          'form',
          'table',
          'tabs',
          'badge',
          'avatar',
          'separator',
          'switch',
          'checkbox',
          'textarea',
          'calendar',
          'popover',
          'sonner',
        ],
      },
    },

    // Git Integration
    {
      id: 'core/git',
      parameters: {
        userName: 'Developer',
        userEmail: 'dev@example.com',
        defaultBranch: 'main',
        autoInit: true,
      },
    },

    // Deployment (Vercel)
    {
      id: 'deployment/vercel',
      parameters: {
        framework: 'nextjs',
        buildCommand: 'npm run build',
        outputDirectory: '.next',
        functions: {
          regions: ['iad1'],
          maxDuration: 30,
        },
      },
    },

    // Deployment (Docker)
    {
      id: 'deployment/docker',
      parameters: {
        features: {
          development: true,
          production: true,
          compose: true,
        },
      },
    },
  ],
});

