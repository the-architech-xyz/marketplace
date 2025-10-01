/**
 * Zustand Next.js Integration
 * 
 * Complete Zustand state management integration for Next.js with SSR support, hydration, and middleware
 */

export interface ZustandNextjsIntegrationParams {

  /** Authentication state management with user data and session handling */
  authStore: boolean;

  /** UI state management for modals, loading states, and UI preferences */
  uiStore: boolean;

  /** Shopping cart state management with persistence */
  cartStore: boolean;

  /** User profile and preferences state management */
  userStore: boolean;

  /** Theme and appearance state management with persistence */
  themeStore: boolean;

  /** Notification and toast state management */
  notificationStore: boolean;

  /** Server-side rendering support with hydration */
  ssrSupport: boolean;

  /** Redux DevTools integration for debugging */
  devtools: boolean;

  /** State persistence to localStorage/sessionStorage */
  persistence: boolean;

  /** Custom middleware for logging, analytics, and state management */
  middleware: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ZustandNextjsIntegrationArtifacts: {
  creates: [
    'src/stores/auth-store.ts',
    'src/stores/ui-store.ts',
    'src/stores/data-store.ts',
    'src/lib/ssr-store.ts',
    'src/lib/hydration.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['zustand', 'immer', 'js-cookie'], isDev: false }
  ],
  envVars: []
};

// Type-safe artifact access
export type ZustandNextjsIntegrationCreates = typeof ZustandNextjsIntegrationArtifacts.creates[number];
export type ZustandNextjsIntegrationEnhances = typeof ZustandNextjsIntegrationArtifacts.enhances[number];
