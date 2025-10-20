/**
 * STANDARD APP STARTER ⭐ RECOMMENDED
 * 
 * The recommended foundation for most production applications.
 * Includes database, data fetching, and all infrastructure you need.
 * Ready to add any features (auth, payments, etc.)
 * 
 * Stack: Next.js + Database + Golden Core + TanStack Query + Infrastructure + Shadcn UI
 * Pattern: Production-ready foundation, feature-ready
 * Use Case: Most production apps, SaaS foundations, web applications
 */

import { defineGenome } from '@thearchitech.xyz/marketplace/types';

export default defineGenome({
  version: '1.0.0',
  project: {
    name: 'standard-app',
    framework: 'nextjs',
    path: './standard-app',
    description: 'Recommended production-ready foundation',
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
          devtools: false,
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
        },
      },
    },

    // Data Fetching (server state management)
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

    // TanStack Query + Next.js (SSR/hydration)
    {
      id: 'connectors/infrastructure/tanstack-query-nextjs',
      parameters: {
        ssr: true,
        hydration: true,
        errorBoundary: true,
      },
    },

    // Zustand + Next.js (SSR support)
    {
      id: 'connectors/infrastructure/zustand-nextjs',
      parameters: {
        persistence: true,
        ssr: true,
      },
    },

    // Form Infrastructure (RHF + Zod + Shadcn)
    {
      id: 'connectors/infrastructure/rhf-zod-shadcn',
      parameters: {
        validation: true,
        accessibility: true,
      },
    },

    // ============================================================================
    // UI & OPERATIONS
    // ============================================================================

    // UI Components
    {
      id: 'ui/shadcn-ui',
      parameters: {
        theme: 'default',
        components: [
          'button',
          'input',
          'card',
          'label',
          'alert',
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

    // Deployment
    {
      id: 'deployment/vercel',
      parameters: {
        framework: 'nextjs',
        buildCommand: 'npm run build',
        outputDirectory: '.next',
        functions: {
          regions: ['iad1'],
          maxDuration: 10,
        },
      },
    },
  ],
});

