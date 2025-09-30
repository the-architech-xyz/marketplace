import { Blueprint } from '@thearchitech.xyz/types';

const vitestNextjsIntegrationBlueprint: Blueprint = {
  id: 'vitest-nextjs-integration',
  name: 'Vitest Next.js Integration',
  description: 'Complete Vitest testing setup for Next.js applications with unit tests, integration tests, and coverage reporting',
  version: '1.0.0',
  actions: [
    // Create Vitest Configuration Files
    {
      type: 'CREATE_FILE',
      path: 'vitest.config.ts',
      template: 'templates/vitest.config.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.config.unit.ts',
      template: 'templates/vitest.config.unit.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.config.integration.ts',
      template: 'templates/vitest.config.integration.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.config.e2e.ts',
      template: 'templates/vitest.config.e2e.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.setup.ts',
      template: 'templates/vitest.setup.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.teardown.ts',
      template: 'templates/vitest.teardown.ts.tpl'
    },
    // Create Test Utilities
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-utils.tsx',
      template: 'templates/test-utils.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/mock-next-router.ts',
      template: 'templates/mock-next-router.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/mock-next-auth.ts',
      template: 'templates/mock-next-auth.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/mock-fetch.ts',
      template: 'templates/mock-fetch.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-db.ts',
      template: 'templates/test-db.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-server.ts',
      template: 'templates/test-server.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-client.ts',
      template: 'templates/test-client.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-helpers.ts',
      template: 'templates/test-helpers.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-fixtures.ts',
      template: 'templates/test-fixtures.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-mocks.ts',
      template: 'templates/test-mocks.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-setup.ts',
      template: 'templates/test-setup.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-teardown.ts',
      template: 'templates/test-teardown.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-constants.ts',
      template: 'templates/test-constants.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-types.ts',
      template: 'templates/test-types.ts.tpl'
    },
    // Create Sample Test Files
    {
      type: 'CREATE_FILE',
      path: 'tests/unit/components/Button.test.tsx',
      template: 'templates/Button.test.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/unit/components/Input.test.tsx',
      template: 'templates/Input.test.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/unit/hooks/useAuth.test.ts',
      template: 'templates/useAuth.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/unit/utils/formatDate.test.ts',
      template: 'templates/formatDate.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/unit/lib/api.test.ts',
      template: 'templates/api.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/integration/pages/home.test.tsx',
      template: 'templates/home.test.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/integration/pages/about.test.tsx',
      template: 'templates/about.test.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/integration/api/auth.test.ts',
      template: 'templates/auth.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/integration/api/users.test.ts',
      template: 'templates/users.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/e2e/auth.spec.ts',
      template: 'templates/auth.spec.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/e2e/navigation.spec.ts',
      template: 'templates/navigation.spec.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/e2e/forms.spec.ts',
      template: 'templates/forms.spec.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/e2e/api.spec.ts',
      template: 'templates/api.spec.ts.tpl'
    },
    // Create Test Fixtures
    {
      type: 'CREATE_FILE',
      path: 'tests/fixtures/users.json',
      template: 'templates/users.json.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/fixtures/posts.json',
      template: 'templates/posts.json.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/fixtures/comments.json',
      template: 'templates/comments.json.tpl'
    },
    // Install Testing Dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'vitest',
        '@testing-library/react',
        '@testing-library/jest-dom',
        '@testing-library/user-event',
        'jsdom',
        '@vitejs/plugin-react',
        'happy-dom',
        'msw'
      ],
      isDev: true
    },
    // Add Test Scripts to package.json
    {
      type: 'ENHANCE_FILE',
      path: 'package.json',
      modifier: 'package-json-merger',
      params: {
        scriptsToAdd: {
          'test': 'vitest',
          'test:ui': 'vitest --ui',
          'test:run': 'vitest run',
          'test:coverage': 'vitest run --coverage',
          'test:unit': 'vitest run --config vitest.config.unit.ts',
          'test:integration': 'vitest run --config vitest.config.integration.ts',
          'test:e2e': 'vitest run --config vitest.config.e2e.ts',
          'test:watch': 'vitest --watch',
          'test:debug': 'vitest --inspect-brk'
        }
      }
    }
  ]
};

export default vitestNextjsIntegrationBlueprint;