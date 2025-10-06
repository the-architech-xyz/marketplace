/**
 * data-fetching/tanstack-query
 * 
 * Auto-generated adapter types
 */

export interface DataFetchingTanstackQueryParams {}

export interface DataFetchingTanstackQueryFeatures {}

// 🚀 Auto-discovered artifacts
export declare const DataFetchingTanstackQueryArtifacts: {
  creates: [
    'src/providers/QueryProvider.tsx',
    'src/lib/query-client.ts',
    'src/hooks/use-query.ts',
    'src/hooks/use-mutation.ts',
    'src/hooks/use-infinite-query.ts',
    'src/lib/optimistic-updates.ts',
    'src/lib/offline-support.ts',
    'src/lib/query-keys.ts',
    'src/components/QueryErrorBoundary.tsx',
    'src/components/QueryLoading.tsx',
    'src/types/query.ts',
    'src/hooks/use-query-invalidation.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['@tanstack/react-query'], isDev: false },
    { packages: ['@tanstack/react-query-devtools'], isDev: true }
  ],
  envVars: []
};

// Type-safe artifact access
export type DataFetchingTanstackQueryCreates = typeof DataFetchingTanstackQueryArtifacts.creates[number];
export type DataFetchingTanstackQueryEnhances = typeof DataFetchingTanstackQueryArtifacts.enhances[number];
