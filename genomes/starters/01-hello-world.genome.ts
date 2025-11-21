/**
 * HELLO WORLD STARTER - V2 Format
 * 
 * The most minimal, production-ready Next.js application.
 * Perfect for learning The Architech or starting a simple project.
 * 
 * Stack: Next.js + TypeScript + Tailwind + Shadcn UI
 * Pattern: Minimal complexity, maximum clarity
 * Use Case: First-time users, prototypes, simple landing pages
 */

import { defineV2Genome } from '@thearchitech.xyz/types';

export default defineV2Genome({
  workspace: {
    name: 'hello-world-starter',
    description: 'A minimal, production-ready Next.js starter'
  },

  marketplaces: {
    official: {
      type: 'local',
      path: '../marketplace'
    }
  },

  packages: {
    // UI Library - Shadcn UI
    ui: {
      from: 'official',
      provider: 'shadcn',
      parameters: {
        theme: 'default',
        components: ['button', 'card', 'input', 'label']
      }
    },

    // Welcome Screen feature (auto-included)
    'architech-welcome': {
      from: 'official',
      provider: 'default',
      parameters: {
        features: {
          techStack: true,
          componentShowcase: true,
          projectStructure: true,
          quickStart: true,
          architechBranding: true
        }
      }
    }
  },

  apps: {
    web: {
      type: 'web',
      framework: 'nextjs',
      package: 'apps/web',
      dependencies: ['ui', 'architech-welcome'],
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        appRouter: true,
        srcDir: true,
        importAlias: '@',
        reactVersion: '18' // Use React 18 for Radix UI compatibility
      }
    }
  }
});
