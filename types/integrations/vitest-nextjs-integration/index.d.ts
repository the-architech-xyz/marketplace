/**
 * Vitest Next.js Integration
 * 
 * Complete Vitest testing setup for Next.js applications with unit tests, integration tests, and coverage reporting
 */

export interface VitestNextjsIntegrationParams {

  /** Unit tests for components, hooks, and utilities */
  unitTesting: boolean;

  /** Integration tests for pages and API routes */
  integrationTesting: boolean;

  /** End-to-end tests with Playwright */
  e2eTesting: boolean;

  /** Code coverage reporting with HTML and LCOV reports */
  coverageReporting: boolean;

  /** Watch mode for development testing */
  watchMode: boolean;

  /** Vitest UI for interactive testing */
  uiMode: boolean;

  /** Mock utilities for Next.js, APIs, and external services */
  mocking: boolean;

  /** Snapshot testing for components */
  snapshots: boolean;

  /** Parallel test execution for faster runs */
  parallelTesting: boolean;

  /** Full TypeScript support for tests */
  typescriptSupport: boolean;
}

// 🚀 Auto-discovered artifacts with ownership info
export declare const VitestNextjsIntegrationArtifacts: {
  creates: [],
  enhances: [],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type VitestNextjsIntegrationCreates = typeof VitestNextjsIntegrationArtifacts.creates[number];
export type VitestNextjsIntegrationEnhances = typeof VitestNextjsIntegrationArtifacts.enhances[number];
