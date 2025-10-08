import { Genome } from "@thearchitech.xyz/types";
/**
 * E-commerce Application Template
 *
 * A complete e-commerce platform with product management, shopping cart, payments, and order tracking.
 * Perfect for building online stores and marketplaces.
 */
const ecommerceAppGenome: Genome = {
  version: "1.0.0",
  project: {
    name: "ecommerce-app",
    description:
      "Complete e-commerce platform with products, cart, and payments",
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
          "carousel",
        ],
      },
      features: {
        accessibility: true,
        theming: true,
      },
    },

    // === AUTHENTICATION ===
    {
      id: "auth/better-auth",
      parameters: {
        providers: ["email"],
      },
      features: {
        "email-verification": true,
        "password-reset": true,
        "session-management": true,
      },
    },

    // === DATABASE ===
    {
      id: "database/drizzle",
      parameters: {
        provider: "neon",
        databaseType: "postgresql",
      },
      features: {
        migrations: true,
        seeding: true,
        studio: true,
        relations: true,
      },
    },

    // === PAYMENTS ===
    {
      id: "payment/stripe",
      parameters: {
        currency: "usd",
        mode: "test",
        webhooks: true,
        dashboard: true,
      },
      features: {
        "one-time-payments": true,
        subscriptions: true,
        marketplace: true,
        invoicing: true,
      },
    },

    // === STATE MANAGEMENT ===
    {
      id: "state/zustand",
      parameters: {
        middleware: ["persist"],
      },
      features: {
        devtools: true,
        persistence: true,
      },
    },

    // === TESTING ===
    {
      id: "testing/vitest",
      parameters: {
        jsx: true,
        environment: "jsdom",
      },
      features: {
        coverage: true,
        ui: true,
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
      id: "core/forms",
      parameters: {
        zod: true,
        reactHookForm: true,
        resolvers: true,
        accessibility: true,
        devtools: true,
      },
    },

    // === INTEGRATIONS ===
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
        adminPanel: false,
        emailVerification: true,
        mfa: false,
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
        subscriptionCards: false,
        invoiceTables: true,
        pricingCards: true,
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

    // =============================================================================
    // FEATURE MODULES - E-commerce specific features
    // =============================================================================
    {
      id: "features/payments",
      parameters: {
        backend: "stripe-nextjs",
        frontend: "shadcn",
        features: {
          paymentForms: true,
          subscriptionManager: true,
          customerManager: true,
          planManager: true,
          invoiceViewer: true,
          analyticsDashboard: true
        }
      }
    },
    {
      id: "features/emailing",
      parameters: {
        backend: "resend-nextjs",
        frontend: "shadcn",
        features: {
          sendEmailForm: true,
          templateEditor: true,
          emailList: true,
          analyticsDashboard: true,
          subscriberForms: true
        }
      }
    },
    {
      id: "features/social-profile",
      parameters: {
        backend: "nextjs",
        frontend: "shadcn",
        features: {
          profileManagement: true,
          socialConnections: true,
          activityFeeds: true,
          notifications: true,
          privacyControls: true,
          socialSettings: true,
          avatarUpload: true,
          blocking: true,
          reporting: true
        }
      }
    },
    {
      id: "features/ecommerce",
      parameters: {
        backend: "database-nextjs",
        frontend: "shadcn",
        features: {
          productManagement: true,
          shoppingCart: true,
          orderManagement: true,
          inventoryTracking: true,
          reviews: true,
          search: true,
          categories: true
        }
      }
    },
  ],
};

export default ecommerceAppGenome;
