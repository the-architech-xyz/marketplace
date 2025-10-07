import { Blueprint, BlueprintActionType, ModifierType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';

const vitestNextjsIntegrationBlueprint: Blueprint = {
  id: 'vitest-nextjs-integration',
  name: 'Vitest Next.js Integration',
  description: 'Complete Vitest testing setup for Next.js applications with standardized testing hooks',
  version: '2.0.0',
  actions: [
    // Create standardized testing hooks (REVOLUTIONARY!)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-test.ts',
      template: 'templates/use-test.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE, 
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-test-suite.ts',
      template: 'templates/use-test-suite.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-test-runner.ts',
      template: 'templates/use-test-runner.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-test-coverage.ts',
      template: 'templates/use-test-coverage.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/hooks/use-test-mocks.ts',
      template: 'templates/use-test-mocks.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create testing API service layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/testing/api.ts',
      template: 'templates/testing-api.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/lib/testing/types.ts',
      template: 'templates/testing-types.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Enhance existing Vitest configuration for Next.js
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'vitest.config.ts',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      params: {
        enhancements: [
          {
            type: 'addImport',
            module: './vitest.nextjs.config.ts',
            name: 'nextjsConfig'
          },
          {
            type: 'mergeConfig',
            path: 'test.nextjs',
            value: 'nextjsConfig'
          }
        ]
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'vitest.nextjs.config.ts',
      template: 'templates/vitest.nextjs.config.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'vitest.config.unit.ts',
      template: 'templates/vitest.config.unit.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'vitest.config.integration.ts',
      template: 'templates/vitest.config.integration.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'vitest.config.e2e.ts',
      template: 'templates/vitest.config.e2e.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Create Next.js-specific Test Utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'test-utils/nextjs-test-utils.ts',
      template: 'templates/nextjs-test-utils.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'test-utils/mock-next-router.ts',
      template: 'templates/mock-next-router.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'test-utils/mock-next-auth.ts',
      template: 'templates/mock-next-auth.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'test-utils/mock-next-fetch.ts',
      template: 'templates/mock-next-fetch.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'test-utils/nextjs-test-server.ts',
      template: 'templates/nextjs-test-server.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'test-utils/nextjs-test-client.ts',
      template: 'templates/nextjs-test-client.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'test-utils/nextjs-test-helpers.ts',
      template: 'templates/nextjs-test-helpers.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'test-utils/nextjs-test-setup.ts',
      template: 'templates/nextjs-test-setup.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'test-utils/nextjs-test-teardown.ts',
      template: 'templates/nextjs-test-teardown.ts.tpl'
    ,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1
      }},
    // Install Next.js-specific Testing Dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        '@testing-library/next',
        'next-test-utils',
        'msw',
        'happy-dom'
      ],
      isDev: true
    },
    // Add Test Scripts to package.json
    {
      type: BlueprintActionType.ENHANCE_FILE,

      path: 'package.json',
      modifier: ModifierType.PACKAGE_JSON_MERGER,
      params: {
        scriptsToAdd: {
          'test:nextjs': 'vitest --config vitest.nextjs.config.ts',
          'test:nextjs:ui': 'vitest --ui --config vitest.nextjs.config.ts',
          'test:nextjs:run': 'vitest run --config vitest.nextjs.config.ts',
          'test:nextjs:coverage': 'vitest run --coverage --config vitest.nextjs.config.ts',
          'test:nextjs:unit': 'vitest run --config vitest.config.unit.ts',
          'test:nextjs:integration': 'vitest run --config vitest.config.integration.ts',
          'test:nextjs:e2e': 'vitest run --config vitest.config.e2e.ts',
          'test:nextjs:watch': 'vitest --watch --config vitest.nextjs.config.ts',
          'test:nextjs:debug': 'vitest --inspect-brk --config vitest.nextjs.config.ts'
        }
      }
    }
  ]
};

export default vitestNextjsIntegrationBlueprint;