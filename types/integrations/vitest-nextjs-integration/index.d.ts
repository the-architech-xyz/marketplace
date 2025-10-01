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
    'vitest.config.ts',
    'vitest.config.unit.ts',
    'vitest.config.integration.ts',
    'vitest.config.e2e.ts',
    'vitest.setup.ts',
    'vitest.teardown.ts',
    'test-utils/test-utils.tsx',
    'test-utils/mock-next-router.ts',
    'test-utils/mock-next-auth.ts',
    'test-utils/mock-fetch.ts',
    'test-utils/test-db.ts',
    'test-utils/test-server.ts',
    'test-utils/test-client.ts',
    'test-utils/test-helpers.ts',
    'test-utils/test-fixtures.ts',
    'test-utils/test-mocks.ts',
    'test-utils/test-setup.ts',
    'test-utils/test-teardown.ts',
    'test-utils/test-constants.ts',
    'test-utils/test-types.ts',
    'tests/unit/components/Button.test.tsx',
    'tests/unit/components/Input.test.tsx',
    'tests/unit/hooks/useAuth.test.ts',
    'tests/unit/utils/formatDate.test.ts',
    'tests/unit/lib/api.test.ts',
    'tests/integration/pages/home.test.tsx',
    'tests/integration/pages/about.test.tsx',
    'tests/integration/api/auth.test.ts',
    'tests/integration/api/users.test.ts',
    'tests/e2e/auth.spec.ts',
    'tests/e2e/navigation.spec.ts',
    'tests/e2e/forms.spec.ts',
    'tests/e2e/api.spec.ts',
    'tests/fixtures/users.json',
    'tests/fixtures/posts.json',
    'tests/fixtures/comments.json'
  ],
  enhances: [
    { path: 'package.json' }
  ],
  installs: [
    { packages: ['vitest', '@testing-library/react', '@testing-library/jest-dom', '@testing-library/user-event', 'jsdom', '@vitejs/plugin-react', 'happy-dom', 'msw'], isDev: true }
  ],
  envVars: []
};

// Type-safe artifact access
export type VitestNextjsIntegrationCreates = typeof VitestNextjsIntegrationArtifacts.creates[number];
export type VitestNextjsIntegrationEnhances = typeof VitestNextjsIntegrationArtifacts.enhances[number];
