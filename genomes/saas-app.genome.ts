import { defineGenome } from "@thearchitech.xyz/types";
/**
 * SaaS Application Template
 *
 * A complete SaaS application with authentication, payments, dashboard, and admin panel.
 * Perfect for building subscription-based software products.
 */
const saasAppGenome = defineGenome({
  version: "1.0.0",
  project: {
    name: "saas-app",
    description:
      "Complete SaaS application with authentication, payments, and dashboard",
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
        "multi-factor": true,
        "session-management": true,
        "admin-panel": true,
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
        subscriptions: true,
        "one-time-payments": true,
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

    // === INTEGRATIONS ===
    {
      id: "connectors/better-auth-github",
      parameters: {
        features: {
          userManagement: true,
          sessionStorage: true,
          accountLinking: true,
        },
      },
    },

    {
      id: "connectors/stripe-nextjs",
      parameters: {
        features: {
          subscriptionTracking: true,
          paymentHistory: true,
          customerManagement: true,
        },
      },
    },

    {
      id: "connectors/zustand-nextjs",
      parameters: {
        features: {
          formManagement: true,
          modalState: true,
          toastNotifications: true,
        },
      },
    },

    // =============================================================================
    // COHESIVE BUSINESS MODULES - Complete SaaS functionality
    // =============================================================================
    
    // === AUTHENTICATION BACKEND ===
    {
      id: "features/auth/backend/better-auth-nextjs",
      parameters: {
        providers: ["email", "google", "github"],
        features: {
          "email-verification": true,
          "password-reset": true,
          "multi-factor": true,
          "session-management": true,
          "admin-panel": true
        }
      }
    },
    
    // === AUTHENTICATION FRONTEND ===
    {
      id: "features/auth/frontend/shadcn",
      parameters: {
        theme: "default",
        features: {
          loginForm: true,
          signupForm: true,
          passwordReset: true,
          profileManagement: true,
          userSettings: true,
          sessionManagement: true
        }
      }
    },
    
    // === TEAMS MANAGEMENT BACKEND ===
    {
      id: "features/teams-management/backend/better-auth-nextjs",
      parameters: {
        features: {
          teamCreation: true,
          memberManagement: true,
          teamSettings: true,
          teamDashboard: true,
          teamInvitations: true
        }
      }
    },
    
    // === TEAMS MANAGEMENT FRONTEND ===
    {
      id: "features/teams-management/frontend/shadcn",
      parameters: {
        theme: "default",
        features: {
          'team-billing': true,
          'advanced-permissions': true,
          'team-analytics': true
        }
      }
    },
    
    // === PAYMENTS BACKEND ===
    {
      id: "features/payments/backend/stripe-nextjs",
      parameters: {
        currency: "usd",
        mode: "test",
        webhooks: true,
        features: {
          subscriptions: true,
          "one-time-payments": true,
          marketplace: true,
          invoicing: true
        }
      }
    },
    
    // === PAYMENTS FRONTEND ===
    {
      id: "features/payments/frontend/shadcn",
      parameters: {
        theme: "default",
        features: {
          paymentForms: true,
          subscriptionManagement: true,
          invoiceDisplay: true,
          billingHistory: true,
          paymentMethods: true,
          basicAnalytics: true
        }
      }
    },
    
    // === EMAILING BACKEND ===
    {
      id: "features/emailing/backend/resend-nextjs",
      parameters: {
        features: {
          emailComposition: true,
          emailTemplates: true,
          emailSending: true,
          emailList: true,
          basicAnalytics: true
        }
      }
    },
    
    // === EMAILING FRONTEND ===
    {
      id: "features/emailing/frontend/shadcn",
      parameters: {
        theme: "default",
        features: {
          'advanced-analytics': true,
          'email-campaigns': true,
          'email-automation': true
        }
      }
    },
    
    {
      id: "features/project-management/shadcn",
      parameters: {
        theme: "default",
        features: {
          kanbanBoard: true,
          taskCreation: true,
          taskManagement: true,
          projectOrganization: true,
          teamCollaboration: true,
          basicAnalytics: true
        }
      }
    },
    
    {
      id: "features/architech-welcome/shadcn",
      parameters: {
        showTechStack: true,
        showComponents: true,
        showProjectStructure: true,
        showQuickStart: true,
        customTitle: "Welcome to {{project.name}}",
        customDescription: "Your complete SaaS application is ready! Explore all the features and start building your business.",
        primaryColor: "blue",
        showArchitechBranding: true
      }
    }
  ],
});

export default saasAppGenome;
