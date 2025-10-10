/**
 * The Architech Capability Types
 * 
 * Auto-generated TypeScript definitions for marketplace capabilities
 */

// Individual capability types
export type AuthNextjsIntegration = 'auth-nextjs-integration';
export type UserAuthentication = 'user-authentication';
export type ApiRoutes = 'api-routes';
export type Containerization = 'containerization';
export type DatabaseOrm = 'database-orm';
export type ReactFramework = 'react-framework';
export type DatabaseNextjsIntegration = 'database-nextjs-integration';
export type EmailService = 'email-service';
export type SentryNextjsIntegration = 'sentry-nextjs-integration';
export type ErrorMonitoring = 'error-monitoring';
export type PerformanceTracking = 'performance-tracking';
export type PaymentProcessing = 'payment-processing';
export type TestingFramework = 'testing-framework';
export type WalletConnection = 'wallet-connection';
export type WelcomePage = 'welcome-page';
export type ProjectAnalyzer = 'project-analyzer';
export type DataPersistence = 'data-persistence';
export type FileStorage = 'file-storage';
export type DatabaseOperations = 'database-operations';
export type UiComponents = 'ui-components';
export type BlockchainInteraction = 'blockchain-interaction';

// Capability union type
export type Capability = '0' | '1' | '2' | '3' | '4' | '5' | 'auth-nextjs-integration' | 'user-authentication' | 'api-routes' | 'containerization' | 'database-orm' | 'react-framework' | 'database-nextjs-integration' | 'email-service' | 'sentry-nextjs-integration' | 'error-monitoring' | 'performance-tracking' | 'payment-processing' | 'testing-framework' | 'wallet-connection' | 'welcome-page' | 'project-analyzer' | 'data-persistence' | 'file-storage' | 'database-operations' | 'ui-components' | 'blockchain-interaction';

// Module capability mappings
export interface ModuleCapabilities {
  '0': ['integrations/better-auth-github-connector-integration'];
  '1': ['integrations/better-auth-github-connector-integration'];
  '2': ['integrations/better-auth-github-connector-integration'];
  '3': ['integrations/better-auth-github-connector-integration'];
  '4': ['integrations/better-auth-github-connector-integration'];
  '5': ['integrations/better-auth-github-connector-integration'];
  'auth-nextjs-integration': ['integrations/better-auth-nextjs-integration'];
  'database-nextjs-integration': ['integrations/drizzle-nextjs-integration'];
  'sentry-nextjs-integration': ['integrations/sentry-nextjs-integration'];
  'welcome-page': ['features/architech-welcome'];
  'project-analyzer': ['features/architech-welcome'];
}

// Capability provider mappings
export interface CapabilityProviders {
  '0': ['integrations/better-auth-github-connector-integration'];
  '1': ['integrations/better-auth-github-connector-integration'];
  '2': ['integrations/better-auth-github-connector-integration'];
  '3': ['integrations/better-auth-github-connector-integration'];
  '4': ['integrations/better-auth-github-connector-integration'];
  '5': ['integrations/better-auth-github-connector-integration'];
  'auth-nextjs-integration': ['integrations/better-auth-nextjs-integration'];
  'database-nextjs-integration': ['integrations/drizzle-nextjs-integration'];
  'sentry-nextjs-integration': ['integrations/sentry-nextjs-integration'];
  'welcome-page': ['features/architech-welcome'];
  'project-analyzer': ['features/architech-welcome'];
}

// Capability registry (for runtime use)
export const CAPABILITY_REGISTRY: Record<string, {
  providers: Array<{
    moduleId: string;
    capabilityVersion: string;
    confidence: number;
    metadata: {
      description?: string;
      provides?: string[];
      requires?: string[];
    };
  }>;
  consumers: Array<{
    moduleId: string;
    requiredVersion: string;
    metadata: {
      description?: string;
      context?: string;
    };
  }>;
  conflicts: Array<{
    capability: string;
    providers: any[];
    severity: 'error' | 'warning';
    message: string;
  }>;
}> = {
  "0": {
    "providers": [
      {
        "moduleId": "integrations/better-auth-github-connector-integration",
        "capabilityVersion": "1.0.0",
        "confidence": 95,
        "metadata": {
          "provides": [],
          "requires": []
        }
      }
    ],
    "consumers": [],
    "conflicts": []
  },
  "1": {
    "providers": [
      {
        "moduleId": "integrations/better-auth-github-connector-integration",
        "capabilityVersion": "1.0.0",
        "confidence": 95,
        "metadata": {
          "provides": [],
          "requires": []
        }
      }
    ],
    "consumers": [],
    "conflicts": []
  },
  "2": {
    "providers": [
      {
        "moduleId": "integrations/better-auth-github-connector-integration",
        "capabilityVersion": "1.0.0",
        "confidence": 95,
        "metadata": {
          "provides": [],
          "requires": []
        }
      }
    ],
    "consumers": [],
    "conflicts": []
  },
  "3": {
    "providers": [
      {
        "moduleId": "integrations/better-auth-github-connector-integration",
        "capabilityVersion": "1.0.0",
        "confidence": 95,
        "metadata": {
          "provides": [],
          "requires": []
        }
      }
    ],
    "consumers": [],
    "conflicts": []
  },
  "4": {
    "providers": [
      {
        "moduleId": "integrations/better-auth-github-connector-integration",
        "capabilityVersion": "1.0.0",
        "confidence": 95,
        "metadata": {
          "provides": [],
          "requires": []
        }
      }
    ],
    "consumers": [],
    "conflicts": []
  },
  "5": {
    "providers": [
      {
        "moduleId": "integrations/better-auth-github-connector-integration",
        "capabilityVersion": "1.0.0",
        "confidence": 95,
        "metadata": {
          "provides": [],
          "requires": []
        }
      }
    ],
    "consumers": [],
    "conflicts": []
  },
  "auth-nextjs-integration": {
    "providers": [
      {
        "moduleId": "integrations/better-auth-nextjs-integration",
        "capabilityVersion": "1.0.0",
        "confidence": 95,
        "metadata": {
          "description": "Complete Next.js integration for Better Auth",
          "provides": [
            "auth-api-routes",
            "auth-middleware",
            "session-management"
          ],
          "requires": []
        }
      }
    ],
    "consumers": [],
    "conflicts": []
  },
  "user-authentication": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "integrations/better-auth-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/better-auth-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "features/auth",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/auth",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "features/teams-management",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/teams-management",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "api-routes": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "integrations/better-auth-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/better-auth-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "integrations/drizzle-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/drizzle-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "integrations/prisma-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/prisma-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "integrations/resend-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/resend-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "integrations/sentry-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/sentry-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "integrations/stripe-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/stripe-nextjs-integration",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "containerization": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "integrations/docker-drizzle-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/docker-drizzle-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "integrations/docker-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/docker-nextjs-integration",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "database-orm": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "integrations/docker-drizzle-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/docker-drizzle-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "integrations/drizzle-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/drizzle-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "integrations/prisma-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/prisma-nextjs-integration",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "react-framework": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "integrations/docker-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/docker-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "integrations/vitest-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/vitest-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "integrations/web3-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/web3-nextjs-integration",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "database-nextjs-integration": {
    "providers": [
      {
        "moduleId": "integrations/drizzle-nextjs-integration",
        "capabilityVersion": "1.0.0",
        "confidence": 95,
        "metadata": {
          "description": "Complete Drizzle ORM integration for Next.js",
          "provides": [
            "database-api-routes",
            "database-middleware",
            "database-queries",
            "database-transactions",
            "teams-data-hooks"
          ],
          "requires": []
        }
      }
    ],
    "consumers": [],
    "conflicts": []
  },
  "email-service": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "integrations/resend-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/resend-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "features/emailing",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/emailing",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "sentry-nextjs-integration": {
    "providers": [
      {
        "moduleId": "integrations/sentry-nextjs-integration",
        "capabilityVersion": "1.0.0",
        "confidence": 95,
        "metadata": {
          "description": "Complete Sentry integration for Next.js",
          "provides": [
            "error-tracking",
            "performance-monitoring",
            "sentry-middleware",
            "sentry-components"
          ],
          "requires": []
        }
      }
    ],
    "consumers": [],
    "conflicts": []
  },
  "error-monitoring": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "integrations/sentry-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/sentry-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "features/monitoring",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/monitoring",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "performance-tracking": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "integrations/sentry-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/sentry-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "features/monitoring",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/monitoring",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "payment-processing": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "integrations/stripe-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/stripe-nextjs-integration",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "features/payments",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/payments",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "testing-framework": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "integrations/vitest-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/vitest-nextjs-integration",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "wallet-connection": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "integrations/web3-nextjs-integration",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by integrations/web3-nextjs-integration",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "welcome-page": {
    "providers": [
      {
        "moduleId": "features/architech-welcome",
        "capabilityVersion": "1.0.0",
        "confidence": 95,
        "metadata": {
          "description": "Interactive welcome page with project showcase",
          "provides": [
            "welcome-page",
            "tech-stack-visualizer",
            "component-showcase",
            "project-structure",
            "quick-start-guide"
          ],
          "requires": []
        }
      }
    ],
    "consumers": [],
    "conflicts": []
  },
  "project-analyzer": {
    "providers": [
      {
        "moduleId": "features/architech-welcome",
        "capabilityVersion": "1.0.0",
        "confidence": 95,
        "metadata": {
          "description": "Analyzes generated project to extract technology stack and features",
          "provides": [
            "project-analysis",
            "module-detection",
            "capability-mapping"
          ],
          "requires": []
        }
      }
    ],
    "consumers": [],
    "conflicts": []
  },
  "data-persistence": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "features/ecommerce",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/ecommerce",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "file-storage": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "features/ecommerce",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/ecommerce",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "database-operations": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "features/project-management",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/project-management",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "features/teams-management",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/teams-management",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "ui-components": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "features/project-management",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/project-management",
          "context": "prerequisite"
        }
      },
      {
        "moduleId": "features/teams-management",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/teams-management",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  },
  "blockchain-interaction": {
    "providers": [],
    "consumers": [
      {
        "moduleId": "features/web3",
        "requiredVersion": "1.0.0",
        "metadata": {
          "description": "Required by features/web3",
          "context": "prerequisite"
        }
      }
    ],
    "conflicts": []
  }
};

// Utility types
export type CapabilityProvider = {
  moduleId: string;
  capabilityVersion: string;
  confidence: number;
  metadata: {
    description?: string;
    provides?: string[];
    requires?: string[];
  };
};

export type CapabilityConsumer = {
  moduleId: string;
  requiredVersion: string;
  metadata: {
    description?: string;
    context?: string;
  };
};

// Helper functions
export function getCapabilityProviders(capability: Capability): CapabilityProvider[] {
  return CAPABILITY_REGISTRY[capability]?.providers || [];
}

export function getCapabilityConsumers(capability: Capability): CapabilityConsumer[] {
  return CAPABILITY_REGISTRY[capability]?.consumers || [];
}

export function hasCapabilityProvider(capability: Capability): boolean {
  return (CAPABILITY_REGISTRY[capability]?.providers.length || 0) > 0;
}

export function getModuleCapabilities(moduleId: string): Capability[] {
  const capabilities: Capability[] = [];
  for (const [capability, data] of Object.entries(CAPABILITY_REGISTRY)) {
    if (data.providers.some(p => p.moduleId === moduleId)) {
      capabilities.push(capability as Capability);
    }
  }
  return capabilities;
}
