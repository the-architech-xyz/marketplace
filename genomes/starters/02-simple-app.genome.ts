/**
 * SIMPLE APP STARTER
 * 
 * Basic production-ready Next.js application with golden core.
 * Perfect for landing pages, marketing sites, and simple web applications.
 * 
 * Stack: Next.js + Golden Core (Zustand, Vitest, ESLint, Prettier, Zod) + Shadcn UI
 * Pattern: Simple but professional, ready for production
 * Use Case: Landing pages, marketing sites, simple web apps
 */

import { defineGenome } from '@thearchitech.xyz/marketplace/types';

export default defineGenome({
  version: '1.0.0',
  project: {
    name: 'simple-app',
    framework: 'nextjs',
    path: './simple-app',
    description: 'Simple production-ready app with golden core',
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
          accessibility: true,
        },
        prettier: {
          tailwind: true,
        },
      },
    },

    // UI Components
    {
      id: 'ui/shadcn-ui',
      parameters: {
        theme: 'default',
        components: [
          'button',
          'card',
          'input',
          'label',
          'alert',
          'badge',
          'separator',
          'dialog',
        ],
      },
    },

    // ============================================================================
    // OPERATIONS
    // ============================================================================

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

