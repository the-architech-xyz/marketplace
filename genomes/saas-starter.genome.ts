import { defineGenome } from "@thearchitech.xyz/types";
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
const saasStarterGenome= defineGenome({
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
      id: "integrations/vitest-nextjs-integration",
      parameters: {
        testing: true,
        coverage: true,
        mocking: true,
      },
    },

    // === TWO-HEADED FEATURES ===
    {
      id: "features/auth",
      parameters: {
        backend: "better-auth-nextjs",
        frontend: "shadcn",
        features: {
          loginForm: true,
          signupForm: true,
          passwordReset: true,
          profileManagement: true,
          emailVerification: true,
          twoFactorAuth: false,
          oauthProviders: ["google", "github"]
        }
      }
    },

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
      id: "features/monitoring",
      parameters: {
        backend: "sentry-nextjs",
        frontend: "shadcn",
        features: {
          errorTracking: true,
          performanceMonitoring: true,
          userFeedback: true,
          monitoringAnalytics: true
        }
      }
    },

    // === COHESIVE BUSINESS MODULES ===
    {
      id: "features/teams-management",
      parameters: {
        theme: "default",
        features: {
          teamCreation: true,
          memberManagement: true,
          invitationSystem: true,
          roleManagement: true,
          teamSettings: true,
          analytics: true
        }
      }
    },

    {
      id: "features/project-management",
      parameters: {
        theme: "default",
        features: {
          projectCreation: true,
          taskManagement: true,
          kanbanBoard: true,
          teamCollaboration: true,
          progressTracking: true,
          reporting: true
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

    {
      id: "features/graph-visualizer",
      parameters: {
        backend: "nextjs",
        frontend: "react-flow",
        features: {
          interactiveGraph: true,
          nodeTypes: true,
          edgeTypes: true,
          minimap: true,
          controls: true,
          background: true,
          selection: true,
          dragging: true,
          zooming: true,
          panning: true,
          export: true,
          import: true
        }
      }
    },

    {
      id: "features/ai-chat",
      parameters: {
        backend: "vercel-ai-sdk",
        frontend: "shadcn",
        features: {
          chatInterface: true,
          messageHistory: true,
          streaming: true,
          fileUpload: true,
          voiceInput: false,
          voiceOutput: false,
          codeHighlighting: true,
          markdownSupport: true
        }
      }
    },

    {
      id: "features/architech-welcome",
      parameters: {
        theme: "default",
        features: {
          welcomePage: true,
          documentationLinks: true,
          capabilitiesShowcase: true,
          quickStart: true
        }
      }
    },
  ],
});  

export default saasStarterGenome;
