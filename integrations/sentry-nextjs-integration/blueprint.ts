import { Blueprint, BlueprintActionType, ModifierType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

const sentryNextjsIntegrationBlueprint: Blueprint = {
  id: 'sentry-nextjs-integration',
  name: 'Sentry Next.js Integration',
  description: 'Complete error monitoring and performance tracking for Next.js with standardized TanStack Query hooks',
  version: '3.0.0',
  actions: [
    // Install Next.js specific Sentry package
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@sentry/nextjs'],
      isDev: false
    },
    
    // Create standardized monitoring hooks (REVOLUTIONARY!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-error-tracking.ts',
      template: 'templates/use-error-tracking.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-performance-monitoring.ts',
      template: 'templates/use-performance-monitoring.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-user-feedback.ts',
      template: 'templates/use-user-feedback.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-sentry.ts',
      template: 'templates/use-sentry.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create Sentry API service layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/sentry/api.ts',
      template: 'templates/sentry-api.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/sentry/types.ts',
      template: 'templates/sentry-types.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    
    // Add Next.js specific environment variables
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'NEXT_PUBLIC_SENTRY_DSN',
      value: 'https://...@sentry.io/...',
      description: 'Sentry DSN for client-side error tracking'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'SENTRY_ORG',
      value: 'your-org',
      description: 'Sentry organization slug'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'SENTRY_PROJECT',
      value: 'your-project',
      description: 'Sentry project name'
    },
    {
      type: BlueprintActionType.ADD_ENV_VAR,

      key: 'SENTRY_AUTH_TOKEN',
      value: 'sntrys_...',
      description: 'Sentry auth token for releases'
    },
    
    // V1 MODIFIER: Wrap next.config.js with Sentry HOC
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'next.config.js',
      condition: '{{#if integration.features.errorTracking}}',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        wrapperFunction: 'withSentryConfig',
        wrapperImport: {
          name: 'withSentryConfig',
          from: '@sentry/nextjs',
          isDefault: false
        },
        wrapperOptions: {
          org: 'process.env.SENTRY_ORG',
          project: 'process.env.SENTRY_PROJECT',
          authToken: 'process.env.SENTRY_AUTH_TOKEN',
          silent: true,
          widenClientFileUpload: true,
          hideSourceMaps: true,
          disableLogger: true,
          automaticVercelMonitors: true
        }
      }
    },
    
    // V1 MODIFIER: Add Sentry client configuration
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'src/lib/sentry/client.ts',
      condition: '{{#if integration.features.errorTracking}}',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        importsToAdd: [
          { name: '* as Sentry', from: '@sentry/nextjs', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `// Next.js specific Sentry client configuration
export const sentryClientConfig = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: process.env.NODE_ENV === 'development',
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
};

// Initialize Sentry on the client side
if (typeof window !== 'undefined') {
  Sentry.init(sentryClientConfig);
}`
          }
        ]
      }
    },
    
    // V1 MODIFIER: Add Sentry server configuration
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'src/lib/sentry/server.ts',
      condition: '{{#if integration.features.errorTracking}}',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        importsToAdd: [
          { name: '* as Sentry', from: '@sentry/nextjs', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `// Next.js specific server-side Sentry configuration
export const sentryServerConfig = {
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: process.env.NODE_ENV === 'development',
};

// Initialize Sentry on the server side
Sentry.init(sentryServerConfig);`
          }
        ]
      }
    },
    
    // V1 MODIFIER: Add Sentry configuration utilities
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'src/lib/sentry/config.ts',
      condition: '{{#if integration.features.errorTracking}}',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        importsToAdd: [
          { name: '* as Sentry', from: '@sentry/nextjs', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `// Next.js specific Sentry configuration
export const nextjsSentryConfig = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.SENTRY_RELEASE,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: process.env.NODE_ENV === 'development',
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0.1,
  replaysOnErrorSampleRate: 1.0,
};

// Next.js specific error reporting
export const reportNextjsError = (error: Error, context?: Record<string, unknown>) => {
  Sentry.captureException(error, {
    tags: { framework: 'nextjs' },
    extra: context
  });
};

// Next.js specific performance monitoring
export const startNextjsSpan = (name: string, op: string) => {
  return Sentry.startSpan({ name, op }, () => {
    return { name, op, framework: 'nextjs' };
  });
};`
          }
        ]
      }
    },
    
    // V1 MODIFIER: Wrap layout children with Sentry provider
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'src/app/layout.tsx',
      condition: '{{#if integration.features.errorTracking}}',
      modifier: ModifierType.JSX_CHILDREN_WRAPPER,
      params: {
        providers: [
          {
            component: 'SentryProvider',
            import: {
              name: 'SentryProvider',
              from: '@sentry/nextjs'
            },
            props: {
              dsn: 'process.env.NEXT_PUBLIC_SENTRY_DSN'
            }
          }
        ],
        targetElement: 'body'
      }
    },
    
    // V1 MODIFIER: Create Next.js middleware for Sentry
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'src/middleware.ts',
      condition: '{{#if integration.features.middleware}}',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        importsToAdd: [
          { name: '* as Sentry', from: '@sentry/nextjs', type: 'import' },
          { name: 'NextRequest', from: 'next/server', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `// Initialize Sentry in middleware
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: process.env.NODE_ENV === 'development',
});

export async function middleware(request: NextRequest) {
  return Sentry.withSentryMiddleware(request);
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};`
          }
        ]
      }
    }
  ]
};

export const blueprint = sentryNextjsIntegrationBlueprint;