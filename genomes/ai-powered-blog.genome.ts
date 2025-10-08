import { Genome } from "@thearchitech.xyz/marketplace/types";
/**
 * AI-Powered Blog Genome
 *
 * A modern content platform with AI-powered features and seamless content management.
 * Perfect for Content creators, Bloggers, Content marketers, and AI enthusiasts.
 *
 * Features:
 * - AI-powered content generation and chat
 * - Multi-language support with next-intl
 * - Content management system
 * - SEO optimization tools
 * - Modern, responsive design
 * - Email newsletter management
 * - User engagement analytics
 * - Comment system and user interactions
 * - Content scheduling and publishing
 * - Social media integration
 */
const aiPoweredBlogGenome: Genome = {
  version: "1.0.0",
  project: {
    name: "ai-powered-blog",
    description:
      "An AI-powered blog platform with content generation and management",
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
        "session-management": true,
      },
    },

    // === AI INTEGRATION ===
    {
      id: "ai/vercel-ai-sdk",
      parameters: {
        apiKey: "sk-...",
        model: "gpt-4",
        streaming: true,
      },
      features: {
        chat: true,
        completions: true,
        functionCalling: true,
        imageGeneration: true,
      },
    },

    // === EMAIL MANAGEMENT ===
    {
      id: "email/resend",
      parameters: {
        apiKey: "re_...",
        fromEmail: "newsletter@yourdomain.com",
      },
      features: {
        templates: true,
        analytics: true,
        webhooks: true,
      },
    },

    // === INTERNATIONALIZATION ===
    {
      id: "content/next-intl",
      parameters: {
        locales: ["en", "es", "fr"],
        defaultLocale: "en",
      },
      features: {
        "dynamic-imports": true,
        routing: true,
        "seo-optimization": true,
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
        seeding: true,
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

    {
      id: "features/ai-chat/shadcn",
      parameters: {
        theme: "default",
        features: {
          chatInterface: true,
          messageHistory: true,
          aiSuggestions: true,
          contentGeneration: true,
        },
      },
    },
  ],
};

export default aiPoweredBlogGenome;
