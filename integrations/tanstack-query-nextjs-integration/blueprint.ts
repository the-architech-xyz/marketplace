import { Blueprint, BlueprintActionType, ModifierType } from '@thearchitech.xyz/types';

const tanstackQueryNextjsIntegrationBlueprint: Blueprint = {
  id: 'tanstack-query-nextjs-integration',
  name: 'TanStack Query Next.js Integration',
  description: 'Golden Core integrator that configures TanStack Query for Next.js applications',
  version: '1.0.0',
  actions: [
    // Create QueryClient configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/query-client.ts',
      template: 'templates/query-client.ts.tpl',
      conflictResolution: {
        strategy: 'replace',
        priority: 1
      }
    },
    // Create QueryClientProvider component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/providers/QueryProvider.tsx',
      template: 'templates/QueryProvider.tsx.tpl',
      conflictResolution: {
        strategy: 'replace',
        priority: 1
      }
    },
    // Create SSR utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/query-ssr.ts',
      template: 'templates/query-ssr.ts.tpl'
    },
    // Create hydration utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/query-hydration.ts',
      template: 'templates/query-hydration.ts.tpl'
    },
    // Create error boundary
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/QueryErrorBoundary.tsx',
      template: 'templates/QueryErrorBoundary.tsx.tpl',
      conflictResolution: {
        strategy: 'replace',
        priority: 1
      }
    },
    // Create query keys utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/query-keys.ts',
      template: 'templates/query-keys.ts.tpl',
      conflictResolution: {
        strategy: 'replace',
        priority: 1
      }
    },
    // Create prefetching utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/query-prefetch.ts',
      template: 'templates/query-prefetch.ts.tpl'
    },
    // Update root layout with QueryProvider
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'src/app/layout.tsx',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        importsToAdd: [
          { name: 'QueryProvider', from: '@/components/providers/QueryProvider', type: 'import' }
        ],
        statementsToAppend: [
          {
            type: 'raw',
            content: `// Wrap app with QueryProvider for TanStack Query
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}`
          }
        ]
      }
    },
    // Add React Query DevTools in development
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/components/devtools/ReactQueryDevtools.tsx',
      template: 'templates/ReactQueryDevtools.tsx.tpl'
    },
    // Create query prefetching utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/query-prefetching.ts',
      template: 'templates/query-prefetching.ts.tpl'
    }
  ]
};

export default tanstackQueryNextjsIntegrationBlueprint;
