/**
 * TanStack Query Next.js Integration
 * 
 * Golden Core integrator that configures TanStack Query for Next.js applications
 */

export interface TanstackQueryNextjsIntegrationParams {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const TanstackQueryNextjsIntegrationArtifacts: {
  creates: [
    'src/lib/query-client.ts',
    'src/components/providers/QueryProvider.tsx',
    'src/lib/query-ssr.ts',
    'src/lib/query-hydration.ts',
    'src/components/QueryErrorBoundary.tsx',
    'src/lib/query-keys.ts',
    'src/lib/query-prefetch.ts',
    'src/components/devtools/ReactQueryDevtools.tsx'
  ],
  enhances: [
    { path: 'src/app/layout.tsx' }
  ],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type TanstackQueryNextjsIntegrationCreates = typeof TanstackQueryNextjsIntegrationArtifacts.creates[number];
export type TanstackQueryNextjsIntegrationEnhances = typeof TanstackQueryNextjsIntegrationArtifacts.enhances[number];
