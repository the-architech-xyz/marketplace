/**
     * Generated TypeScript definitions for Zustand State Management
     * Generated from: adapters/state/zustand/adapter.json
     */

/**
     * Parameters for the Zustand State Management adapter
     */
export interface ZustandStateParams {
  /**
   * Enable state persistence
   */
  persistence?: boolean;
  /**
   * Enable Redux DevTools
   */
  devtools?: boolean;
  /**
   * Middleware to use
   */
  middleware?: Array<any>;
}

/**
     * Features for the Zustand State Management adapter
     */
export interface ZustandStateFeatures {
  /**
   * Persist state to localStorage, sessionStorage, or custom storage
   */
  persistence?: boolean;
  /**
   * Integration with Redux DevTools for debugging
   */
  devtools?: boolean;
}
