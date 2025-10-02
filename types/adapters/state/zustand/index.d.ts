/**
 * Zustand State Management
 * 
 * Golden Core state management with Zustand - powerful, performant, and minimal boilerplate
 */

export interface StateZustandParams {

  /** Enable state persistence */
  persistence?: boolean;

  /** Enable Redux DevTools */
  devtools?: boolean;

  /** Enable Immer for immutable updates */
  immer?: boolean;

  /** Middleware to use */
  middleware?: string[];
}

export interface StateZustandFeatures {}

// 🚀 Auto-discovered artifacts
export declare const StateZustandArtifacts: {
  creates: [
    'src/lib/stores/create-store.ts',
    'src/lib/stores/store-types.ts',
    'src/stores/use-app-store.ts',
    'src/stores/use-ui-store.ts',
    'src/stores/use-auth-store.ts',
    'src/lib/stores/persistence.ts',
    'src/lib/stores/middleware.ts',
    'src/hooks/use-store.ts',
    'src/providers/StoreProvider.tsx',
    'src/stores/index.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['zustand'], isDev: false },
    { packages: ['immer'], isDev: false },
    { packages: ['zustand/middleware'], isDev: false }
  ],
  envVars: []
};

// Type-safe artifact access
export type StateZustandCreates = typeof StateZustandArtifacts.creates[number];
export type StateZustandEnhances = typeof StateZustandArtifacts.enhances[number];
