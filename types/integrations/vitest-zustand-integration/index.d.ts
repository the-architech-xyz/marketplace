/**
 * Vitest Zustand Integration
 * 
 * Complete Vitest testing setup for Zustand state management with store testing, middleware testing, and persistence testing
 */

export interface VitestZustandIntegrationParams {

  /** Unit tests for Zustand stores and actions */
  storeTesting: boolean;

  /** Tests for Zustand middleware (persist, devtools, etc.) */
  middlewareTesting: boolean;

  /** Tests for state persistence across storage types */
  persistenceTesting: boolean;

  /** Integration tests for store interactions */
  integrationTesting: boolean;

  /** Mock utilities for stores, storage, and middleware */
  mocking: boolean;

  /** Test fixtures and sample data for stores */
  fixtures: boolean;

  /** Code coverage reporting for store logic */
  coverageReporting: boolean;

  /** Watch mode for development testing */
  watchMode: boolean;

  /** Parallel test execution for faster runs */
  parallelTesting: boolean;

  /** Full TypeScript support for store tests */
  typescriptSupport: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const VitestZustandIntegrationArtifacts: {
  creates: [
    'vitest.config.zustand.ts',
    'vitest.setup.zustand.ts',
    'test-utils/store-test-utils.ts',
    'test-utils/store-mock-utils.ts',
    'tests/stores/store.test.ts',
    'tests/stores/store-actions.test.ts',
    'tests/stores/store-integration.test.ts'
  ],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type VitestZustandIntegrationCreates = typeof VitestZustandIntegrationArtifacts.creates[number];
export type VitestZustandIntegrationEnhances = typeof VitestZustandIntegrationArtifacts.enhances[number];
