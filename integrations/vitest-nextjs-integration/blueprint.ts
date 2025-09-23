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
      template: 'vitest.config.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.config.unit.ts',
      template: 'vitest.config.unit.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.config.integration.ts',
      template: 'vitest.config.integration.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.config.e2e.ts',
      template: 'vitest.config.e2e.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.setup.ts',
      template: 'vitest.setup.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.teardown.ts',
      template: 'vitest.teardown.ts.tpl'
    },
    // Create Test Utilities
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-utils.tsx',
      template: 'test-utils.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/mock-next-router.ts',
      template: 'mock-next-router.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/mock-next-auth.ts',
      template: 'mock-next-auth.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/mock-fetch.ts',
      template: 'mock-fetch.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-db.ts',
      template: 'test-db.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-server.ts',
      template: 'test-server.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-client.ts',
      template: 'test-client.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-helpers.ts',
      template: 'test-helpers.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-fixtures.ts',
      template: 'test-fixtures.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-mocks.ts',
      template: 'test-mocks.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-setup.ts',
      template: 'test-setup.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-teardown.ts',
      template: 'test-teardown.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-constants.ts',
      template: 'test-constants.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/test-types.ts',
      template: 'test-types.ts.tpl'
    },
    // Create Sample Test Files
    {
      type: 'CREATE_FILE',
      path: 'tests/unit/components/Button.test.tsx',
      template: 'Button.test.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/unit/components/Input.test.tsx',
      template: 'Input.test.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/unit/hooks/useAuth.test.ts',
      template: 'useAuth.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/unit/utils/formatDate.test.ts',
      template: 'formatDate.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/unit/lib/api.test.ts',
      template: 'api.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/integration/pages/home.test.tsx',
      template: 'home.test.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/integration/pages/about.test.tsx',
      template: 'about.test.tsx.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/integration/api/auth.test.ts',
      template: 'auth.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/integration/api/users.test.ts',
      template: 'users.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/e2e/auth.spec.ts',
      template: 'auth.spec.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/e2e/navigation.spec.ts',
      template: 'navigation.spec.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/e2e/forms.spec.ts',
      template: 'forms.spec.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/e2e/api.spec.ts',
      template: 'api.spec.ts.tpl'
    },
    // Create Test Fixtures
    {
      type: 'CREATE_FILE',
      path: 'tests/fixtures/users.json',
      template: 'users.json.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/fixtures/posts.json',
      template: 'posts.json.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/fixtures/comments.json',
      template: 'comments.json.tpl'
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
      modifier: 'json-enhancer',
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