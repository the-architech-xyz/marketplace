import { Genome } from "@thearchitech.xyz/types";
/**
 * SaaS Starter Genome
 *
 * The perfect, production-ready foundation for your next subscription-based application.
 * Perfect for Indie Hackers, Startups, and SaaS founders.
 *
 * Features:
 * - Secure User Authentication (Email/Password + OAuth)
 * - Team Management & Invitations
 * - Subscription Payments powered by Stripe
 * - Modern, themeable UI with Shadcn/UI
 * - Type-safe from database to frontend
 * - Email management and notifications
 * - User profile management
 * - Admin dashboard for user management
 * - Comprehensive testing setup
 * - Production-ready deployment configuration
 */
const saasStarterGenome: Genome = {
  version: "1.0.0",
  project: {
    name: "saas-starter",
    description:
      "A modern SaaS application with authentication, payments, and team management",
    version: "1.0.0",
    framework: "nextjs",
  },
  modules: [
    // === CORE FRAMEWORK ===
    {
      id: "framework/nextjs",
      parameters: {
        appRouter: true,
        typescript: true,
        tailwind: true,
        eslint: true,
        srcDir: true,
        importAlias: "@/",
      },
      features: {
        "api-routes": true,
        middleware: true,
        performance: true,
        security: true,
        seo: true,
        "server-actions": true,
      },
    },

    // === UI FRAMEWORK ===
    {
      id: "ui/shadcn-ui",
      parameters: {
        components: [
          "button",
          "input",
          "card",
          "form",
          "table",
          "dialog",
          "dropdown-menu",
          "badge",
          "avatar",
          "toast",
          "sheet",
          "tabs",
          "accordion",
          "carousel",
          "calendar",
          "date-picker",
          "alert-dialog",
          "checkbox",
          "collapsible",
          "context-menu",
          "hover-card",
          "menubar",
          "navigation-menu",
          "popover",
          "progress",
          "radio-group",
          "scroll-area",
          "slider",
          "toggle",
          "toggle-group",
        ],
      },
      features: {
        accessibility: true,
        theming: true,
      },
    },

    // === DATABASE ===
    {
      id: "database/drizzle",
      parameters: {
        provider: "neon",
        databaseType: "postgresql",
        migrations: true,
        studio: true,
      },
      features: {
        migrations: true,
        seeding: true,
        studio: true,
        relations: true,
      },
    },

    // === AUTHENTICATION ===
    {
      id: "auth/better-auth",
      parameters: {
        providers: ["email", "google", "github"],
        session: "jwt",
        csrf: true,
        rateLimit: true,
      },
      features: {
        "oauth-providers": true,
        "email-verification": true,
        "password-reset": true,
        "multi-factor": true,
        "session-management": true,
        "admin-panel": true,
      },
    },

    // === PAYMENT PROCESSING ===
    {
      id: "payment/stripe",
      parameters: {
        currency: "usd",
        mode: "test",
        webhooks: true,
        dashboard: true,
      },
      features: {
        subscriptions: true,
        "one-time-payments": true,
        marketplace: true,
        invoicing: true,
      },
    },

    // === EMAIL MANAGEMENT ===
    {
      id: "email/resend",
      parameters: {
        apiKey: "re_...",
        fromEmail: "noreply@yourdomain.com",
      },
      features: {
        templates: true,
        analytics: true,
        webhooks: true,
      },
    },

    // === GOLDEN CORE ADAPTERS ===
    {
      id: "data-fetching/tanstack-query",
      parameters: {
        devtools: true,
        suspense: false,
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            retry: 3,
            refetchOnWindowFocus: false,
          },
        },
      },
      features: {
        core: true,
        infinite: true,
        optimistic: true,
        offline: true,
      },
    },

    {
      id: "state/zustand",
      parameters: {
        persistence: true,
        devtools: true,
        immer: true,
        middleware: ["persist", "devtools"],
      },
      features: {
        persistence: true,
        devtools: true,
      },
    },

    {
      id: "core/forms",
      parameters: {
        zod: true,
        reactHookForm: true,
        resolvers: true,
        accessibility: true,
        devtools: true,
      },
    },

    // === TESTING & QUALITY ===
    {
      id: "testing/vitest",
      parameters: {
        jsx: true,
        environment: "jsdom",
        coverage: true,
      },
      features: {
        coverage: true,
        ui: true,
      },
    },

    {
      id: "quality/eslint",
      parameters: {
        typescript: true,
        react: true,
        accessibility: true,
      },
    },

    {
      id: "quality/prettier",
      parameters: {
        typescript: true,
        tailwind: true,
      },
    },

    // === OBSERVABILITY ===
    {
      id: "observability/sentry",
      parameters: {
        dsn: "https://...@sentry.io/...",
        environment: "development",
      },
      features: {
        errorTracking: true,
        performance: true,
        releases: true,
      },
    },

    // === INTEGRATORS ===
    {
      id: "integrations/drizzle-nextjs-integration",
      parameters: {
        apiRoutes: true,
        middleware: true,
        queries: true,
        transactions: true,
        migrations: true,
        seeding: false,
        validators: true,
        adminPanel: false,
        healthChecks: true,
        connectionPooling: true,
      },
    },

    {
      id: "integrations/better-auth-nextjs-integration",
      parameters: {
        apiRoutes: true,
        middleware: true,
        uiComponents: "shadcn",
        adminPanel: true,
        emailVerification: true,
        mfa: true,
        passwordReset: true,
      },
    },

    {
      id: "integrations/stripe-nextjs-integration",
      parameters: {
        webhooks: true,
        apiRoutes: true,
        customerManagement: true,
      },
    },

    {
      id: "integrations/stripe-shadcn-integration",
      parameters: {
        paymentForms: true,
        subscriptionCards: true,
        invoiceTables: true,
        pricingCards: true,
      },
    },

    {
      id: "integrations/resend-nextjs-integration",
      parameters: {
        apiRoutes: true,
        templates: true,
        analytics: true,
      },
    },

    {
      id: "integrations/resend-shadcn-integration",
      parameters: {
        composer: true,
        templates: true,
        analytics: true,
      },
    },

    {
      id: "integrations/tanstack-query-nextjs-integration",
      parameters: {
        devtools: true,
        ssr: true,
        hydration: true,
        prefetching: true,
        errorBoundary: true,
      },
    },

    {
      id: "integrations/zustand-nextjs-integration",
      parameters: {
        persistence: true,
        devtools: true,
        ssr: true,
      },
    },

    {
      id: "integrations/rhf-zod-shadcn-integration",
      parameters: {
        formComponents: true,
        validation: true,
        accessibility: true,
      },
    },

    {
      id: "integrations/sentry-nextjs-integration",
      parameters: {
        errorTracking: true,
        performance: true,
        releases: true,
      },
    },

    {
      id: "integrations/vitest-nextjs-integration",
      parameters: {
        testing: true,
        coverage: true,
        mocking: true,
      },
    },

    // === FEATURES ===
    {
      id: "features/auth-ui/shadcn",
      parameters: {
        theme: "default",
        features: {
          loginForm: true,
          registerForm: true,
          userMenu: true,
          authProvider: true,
        },
      },
    },

    {
      id: "features/teams-dashboard/nextjs-shadcn",
      parameters: {
        theme: "default",
        features: {
          analytics: true,
          goals: true,
          permissions: true,
          invitations: true,
        },
      },
    },

    {
      id: "features/teams-data/drizzle",
      parameters: {
        database: "postgresql",
        features: {
          teams: true,
          members: true,
          invitations: true,
          permissions: true,
        },
      },
    },

    {
      id: "features/user-profile/nextjs-shadcn",
      parameters: {
        theme: "default",
        features: {
          avatarUpload: true,
          preferences: true,
          security: true,
          notifications: true,
          exportData: true,
        },
      },
    },

    {
      id: "features/payment-management/nextjs-shadcn",
      parameters: {
        theme: "default",
        features: {
          paymentForms: true,
          subscriptionCards: true,
          invoiceTables: true,
          pricingCards: true,
        },
      },
    },

    {
      id: "features/email-management/nextjs-shadcn",
      parameters: {
        theme: "default",
        features: {
          composer: true,
          templates: true,
          analytics: true,
          settings: true,
        },
      },
    },
  ],
};

export default saasStarterGenome;
