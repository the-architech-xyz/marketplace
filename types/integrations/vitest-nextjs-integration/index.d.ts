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
  creates: [
    'src/hooks/use-test.ts',
    'src/hooks/use-test-suite.ts',
    'src/hooks/use-test-runner.ts',
    'src/hooks/use-test-coverage.ts',
    'src/hooks/use-test-mocks.ts',
    'src/lib/testing/api.ts',
    'src/lib/testing/types.ts',
    'vitest.nextjs.config.ts',
    'vitest.config.unit.ts',
    'vitest.config.integration.ts',
    'vitest.config.e2e.ts',
    'test-utils/nextjs-test-utils.ts',
    'test-utils/mock-next-router.ts',
    'test-utils/mock-next-auth.ts',
    'test-utils/mock-next-fetch.ts',
    'test-utils/nextjs-test-server.ts',
    'test-utils/nextjs-test-client.ts',
    'test-utils/nextjs-test-helpers.ts',
    'test-utils/nextjs-test-setup.ts',
    'test-utils/nextjs-test-teardown.ts'
  ],
  enhances: [
    { path: 'vitest.config.ts' },
    { path: 'package.json' }
  ],
  installs: [
    { packages: ['@testing-library/next', 'next-test-utils', 'msw', 'happy-dom'], isDev: true }
  ],
  envVars: []
};

// Type-safe artifact access
export type VitestNextjsIntegrationCreates = typeof VitestNextjsIntegrationArtifacts.creates[number];
export type VitestNextjsIntegrationEnhances = typeof VitestNextjsIntegrationArtifacts.enhances[number];
