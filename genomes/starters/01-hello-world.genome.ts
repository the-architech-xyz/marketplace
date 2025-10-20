/**
 * HELLO WORLD STARTER
 * 
 * The most minimal, production-ready Next.js application.
 * Perfect for learning The Architech or starting a simple project.
 * 
 * Stack: Next.js + TypeScript + Tailwind + Shadcn UI
 * Pattern: Minimal complexity, maximum clarity
 * Use Case: First-time users, prototypes, simple landing pages
 */

import { defineGenome } from '@thearchitech.xyz/marketplace/types';  

export default defineGenome({
  version: '1.0.0',
  project: {
    name: 'hello-world-starter',
    description: 'A minimal, production-ready Next.js starter',
    version: '1.0.0',
    framework: 'nextjs',
  },
  
  modules: [
    // Core Framework with React 18 for Radix UI compatibility
    {
      id: 'framework/nextjs',
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        appRouter: true,
        srcDir: true,
        importAlias: '@',
        reactVersion: '18', // Use React 18 for Radix UI compatibility
      },
    },

    // UI Foundation
    {
      id: 'ui/shadcn-ui',
      parameters: {
        theme: 'default',
        components: ['button', 'card', 'input', 'label'],
      },
    },
    // Quality Tools (auto-included by marketplace defaults)
    // No need to specify - they're automatically included for all Next.js projects

    // Welcome Screen
    {
      id: 'features/architech-welcome/shadcn',
      parameters: {
        showTechStack: true,
        showComponents: true,
        showProjectStructure: true,
        showQuickStart: true,
        showArchitechBranding: true,
      },
    },
  ],
});

