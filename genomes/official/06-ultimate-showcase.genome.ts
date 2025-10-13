/**
 * ULTIMATE SHOWCASE / KITCHEN SINK
 * 
 * The most comprehensive demonstration of The Architech platform.
 * Every advanced feature, every integration pattern, every capability.
 * 
 * Stack: Everything (Next.js + ALL modules + ALL features)
 * Pattern: Showcase platform capabilities and architectural flexibility
 * Use Case: Platform demonstration, learning, reference implementation
 */

import { defineGenome } from '@thearchitech.xyz/marketplace/types';

export default defineGenome({
  version: '1.0.0',
  project: {
    name: 'ultimate-showcase',
    framework: 'nextjs',
    path: './ultimate-app',
    description: 'The complete showcase of every Architech capability',
  },
  
  modules: [
    // ============================================================================
    // FOUNDATION (The Essentials)
    // ============================================================================

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
          mdx: true,
          performance: true,
          i18n: true,
        },
      },
    },

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

    {
      id: 'data-fetching/tanstack-query',
      parameters: {
        devtools: true,
        suspense: true,
      },
    },

    {
      id: 'state/zustand',
      parameters: {
        persistence: true,
        devtools: true,
        immer: true,
      },
    },

    {
      id: 'ui/shadcn-ui',
      parameters: {
        theme: 'default',
        components: [
          'button', 'input', 'card', 'label', 'alert', 'alert-dialog', 'accordion', 'avatar', 'badge',
          'calendar', 'carousel', 'checkbox', 'collapsible', 'context-menu', 'date-picker', 'dialog',
          'dropdown-menu', 'form', 'hover-card', 'menubar', 'navigation-menu', 'pagination', 'popover',
          'progress', 'radio-group', 'scroll-area', 'separator', 'sheet', 'slider', 'sonner', 'switch',
          'table', 'tabs', 'textarea', 'toggle', 'toggle-group'
        ],
      },
    },

    {
      id: 'content/next-intl',
      parameters: {
        locales: ['en', 'fr', 'es', 'de', 'ja', 'zh'],
        defaultLocale: 'en',
        features: {
          routing: true,
          dateFormatting: true,
          numberFormatting: true,
        },
      },
    },

    // ============================================================================
    // BUSINESS FEATURES (Complete Suite)
    // ============================================================================

    // Authentication (All Features)
    {
      id: 'auth/better-auth',
      parameters: {
        providers: ['email'],
        session: 'jwt',
        csrf: true,
      },
    },

    {
      id: 'connectors/better-auth-github',
    },

    {
      id: 'features/auth/backend/better-auth-nextjs',
      parameters: {
        apiRoutes: true,
        middleware: true,
        emailVerification: true,
        mfa: true,
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
          profileManagement: true,
          socialLogins: true,
        },
      },
    },

    // Payments (Complete Suite)
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
        analytics: true,
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
          analytics: true,
        },
      },
    },

    // Teams (Complete Suite)
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
        },
      },
    },

    // Email (Complete Suite)
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
    // ADVANCED FEATURES (Showcase Everything)
    // ============================================================================

    // AI Chat
    {
      id: 'ai/vercel-ai-sdk',
      parameters: {
        providers: ['openai', 'anthropic', 'google'],
        features: {
          streaming: true,
          tools: true,
          embeddings: true,  // For RAG
        },
      },
    },

    {
      id: 'features/ai-chat/backend/vercel-ai-nextjs',
      parameters: {
        streaming: true,
        fileUpload: true,
        voiceInput: true,
        voiceOutput: true,
        exportImport: true,
      },
    },

    {
      id: 'features/ai-chat/frontend/shadcn',
      parameters: {
        features: {
          core: true,
          media: true,
          voice: true,
          advanced: true,
        },
      },
    },

    // Web3 & Blockchain
    {
      id: 'blockchain/web3',
      parameters: {
        networks: ['ethereum', 'polygon', 'optimism', 'base', 'arbitrum'],
        features: {
          walletConnect: true,
          smartContracts: true,
          transactions: true,
          events: true,
          ens: true,
          nft: true,
        },
      },
    },

    {
      id: 'features/web3/shadcn',
      parameters: {
        features: {
          walletConnect: true,
          networkSwitch: true,
          transactionHistory: true,
          tokenBalances: true,
          nftGallery: true,
        },
      },
    },

    // Graph Visualization (Architecture Diagram)
    {
      id: 'features/graph-visualizer/shadcn',
      parameters: {
        features: {
          interactiveGraph: true,
          nodeTypes: true,
          minimap: true,
          export: true,
        },
      },
    },

    // Repository Analyzer
    {
      id: 'services/github-api',
    },

    {
      id: 'features/repo-analyzer/shadcn',
      parameters: {
        enableVisualization: true,
        enableExport: true,
        confidenceThreshold: 80,
      },
    },

    // Project Management
    {
      id: 'features/project-management/shadcn',
      parameters: {
        features: {
          kanban: true,
          timeline: true,
          sprint: true,
        },
      },
    },

    // Social Profile
    {
      id: 'features/social-profile/shadcn',
      parameters: {
        features: {
          walletProfile: true,
          web3Social: true,
          achievements: true,
        },
      },
    },

    // ============================================================================
    // OPERATIONS & QUALITY (Production-Grade)
    // ============================================================================

    // Monitoring (Full Suite)
    {
      id: 'observability/sentry',
      parameters: {
        features: {
          errorTracking: true,
          replay: true,
        },
      },
    },

    {
      id: 'features/monitoring/shadcn',
      parameters: {
        features: {
          performance: true,
          errors: true,
          feedback: true,
          analytics: true,
        },
      },
    },

    // Testing (Comprehensive)
    {
      id: 'testing/vitest',
      parameters: {
        features: {
          unitTests: true,
          e2e: true,
        },
      },
    },

    // Quality (Strict)
    {
      id: 'quality/eslint',
      parameters: {
        strict: true,
        react: true,
        nextjs: true,
        typescript: true,
        accessibility: true,
      },
    },

    {
      id: 'quality/prettier',
      parameters: {
        tailwind: true,
        organizeImports: true,
        plugins: ['prettier-plugin-tailwindcss'],
      },
    },

    // Git Integration
    {
      id: 'core/git',
      parameters: {
        userName: 'Architech User',
        userEmail: 'user@architech.xyz',
        defaultBranch: 'main',
        autoInit: true,
      },
    },

    // Deployment (All Options)
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

