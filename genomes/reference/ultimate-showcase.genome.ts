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
  version: "1.0.0",
  project: {
    name: "ultimate-showcase",
    framework: "nextjs",
    path: "./ultimate-app",
    description: "The complete showcase of every Architech capability",
  },

  modules: [
    // ============================================================================
    // FOUNDATION (The Essentials)
    // ============================================================================

    {
      id: "framework/nextjs",
      parameters: {
        typescript: true,
        tailwind: true,
        eslint: true,
        appRouter: true,
        srcDir: true,
        importAlias: "@",
        reactVersion: "18", // Use React 18 for Radix UI compatibility
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
      id: "database/drizzle",
      parameters: {
        provider: "neon",
        databaseType: "postgresql",
        features: {
          migrations: true,
          relations: true,
          seeding: true,
          studio: true,
        },
      },
    },

    // Golden Core: Essential tech stack (Zustand, Vitest, ESLint, Prettier, Zod)
    {
      id: "core/golden-stack",
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
        },
      },
    },

    // Data Fetching (conditional - needed for features with server state)
    {
      id: "data-fetching/tanstack-query",
      parameters: {
        devtools: true,
        suspense: true,
      },
    },

    {
      id: "ui/shadcn-ui",
      parameters: {
        theme: "default",
        components: [
          "button",
          "input",
          "card",
          "label",
          "alert",
          "alert-dialog",
          "accordion",
          "avatar",
          "badge",
          "calendar",
          "carousel",
          "checkbox",
          "collapsible",
          "context-menu",
          "dialog",
          "dropdown-menu",
          "form",
          "hover-card",
          "menubar",
          "navigation-menu",
          "pagination",
          "popover",
          "progress",
          "radio-group",
          "scroll-area",
          "separator",
          "sheet",
          "slider",
          "sonner",
          "switch",
          "table",
          "tabs",
          "textarea",
          "toggle",
          "toggle-group",
        ],
      },
    },

    {
      id: "content/next-intl",
      parameters: {
        locales: ["en", "fr", "es", "de", "ja", "zh"],
        defaultLocale: "en",
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

    // Authentication (Complete Integration via Connector)
    {
      id: "connectors/auth/better-auth-nextjs",
      parameters: {
        emailVerification: true,
        oauthProviders: ["google", "github"],
        twoFactor: true,
        organizations: true,
        teams: true,
      },
    },

    {
      id: "connectors/integrations/better-auth-github",
    },

    {
      id: "features/auth/frontend/shadcn",
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
      id: "payment/stripe",
      parameters: {
        currency: "usd",
        mode: "test",
        webhooks: true,
        dashboard: true,
      },
    },

    {
      id: "features/payments/backend/stripe-nextjs",
      parameters: {
        features: {
          organizationBilling: true,
          seatManagement: true,
          usageTracking: true,
          webhooks: true,
        },
      },
    },

    {
      id: "features/payments/frontend/shadcn",
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

    // Teams (Complete Suite - Custom Business Logic)
    {
      id: "features/teams-management/backend/nextjs",
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
      id: "features/teams-management/frontend/shadcn",
      parameters: {
        features: {
          teams: true,
          members: true,
          invitations: true,
          roles: true,
        },
      },
    },

    // Email (Connector for basic sending + Backend for templates)
    {
      id: "connectors/email/resend-nextjs",
      parameters: {
        apiKey: process.env.RESEND_API_KEY || "",
      },
    },

    {
      id: "features/emailing/backend/resend-nextjs",
      parameters: {
        features: {
          templates: true,
          campaigns: true,
          analytics: true,
        },
      },
    },

    {
      id: "features/emailing/frontend/shadcn",
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

    // AI Chat (Connector for SDK + Backend for persistence)
    {
      id: "connectors/ai/vercel-ai-nextjs",
      parameters: {
        providers: ["openai", "anthropic"],
        streaming: true,
      },
    },

    {
      id: "features/ai-chat/backend/nextjs",
      parameters: {
        features: {
          conversationPersistence: true,
          messageHistory: true,
          analytics: true,
        },
      },
    },

    {
      id: "features/ai-chat/frontend/shadcn",
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
      id: "blockchain/web3",
      parameters: {
        networks: ["ethereum", "polygon", "optimism", "base", "arbitrum"],  // All valid now with expanded schema
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
      id: "features/web3/shadcn",
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

    // NOTE: graph-visualizer and repo-analyzer features are planned but not yet implemented
    // They have been removed from this genome until they are available in the marketplace
    
    // ============================================================================
    // OPERATIONS & QUALITY (Production-Grade)
    // ============================================================================

    // Monitoring (Full Suite)
    {
      id: "observability/sentry",
      parameters: {
        dsn: process.env.SENTRY_DSN || "",
        features: {
          errorTracking: true,
          replay: true,
        },
      },
    },

    {
      id: "observability/sentry",
      parameters: {
        dsn: process.env.SENTRY_DSN || "",
        features: {
          dashboard: true,
          errorBrowser: true,
          performance: true,
          alerts: true,
        },
        dashboardPath: "/sentry",
        refreshInterval: 10000,
      },
    },

    {
      id: "features/monitoring/shadcn",
      parameters: {
        backend: "sentry-nextjs",
        frontend: "shadcn",
        features: {
          performance: true,
          errorBrowser: true,
          alerts: true,
        },
      },
      dashboardPath: "/sentry",
      refreshInterval: 10000,
    },

    // NOTE: Testing and Quality tools are included in core/golden-stack above
    // (Vitest, ESLint, Prettier are part of the golden core)

    // Git Integration
    {
      id: "core/git",
      parameters: {
        userName: "Architech User",
        userEmail: "user@architech.xyz",
        defaultBranch: "main",
        autoInit: true,
      },
    },

    // Deployment (All Options)
    {
      id: "deployment/vercel",
      parameters: {
        framework: "nextjs",
        buildCommand: "npm run build",
        outputDirectory: ".next",
        installCommand: "npm install",
        devCommand: "npm run dev",
        functions: {
          regions: ["iad1"],
          memory: 1024,
          maxDuration: 30,
        },
      },
    },

    {
      id: "deployment/docker",
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

