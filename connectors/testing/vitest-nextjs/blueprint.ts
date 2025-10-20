import { BlueprintAction, BlueprintActionType, ModifierType, ConflictResolutionStrategy, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic Vitest-NextJS Connector Blueprint
 * 
 * Enhances Vitest testing with Next.js-specific utilities and configurations.
 * This connector enhances the core Vitest adapter instead of duplicating functionality.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'connectors/testing/vitest-nextjs'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  return [
    // Create consolidated testing hooks
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "${paths.hooks}use-test.ts",
      template: "templates/use-test.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    // Create testing API service layer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "${paths.shared_library}testing/api.ts",
      template: "templates/testing-api.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "${paths.shared_library}testing/types.ts",
      template: "templates/testing-types.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    // Create unified Vitest configuration for Next.js
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "vitest.config.ts",
      template: "templates/vitest.config.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    // Create Next.js-specific Test Utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "test-utils/nextjs-test-utils.ts",
      template: "templates/nextjs-test-utils.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "test-utils/mock-next-router.ts",
      template: "templates/mock-next-router.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "test-utils/mock-next-auth.ts",
      template: "templates/mock-next-auth.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "test-utils/mock-next-fetch.ts",
      template: "templates/mock-next-fetch.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "test-utils/nextjs-test-server.ts",
      template: "templates/nextjs-test-server.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "test-utils/nextjs-test-client.ts",
      template: "templates/nextjs-test-client.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "test-utils/nextjs-test-helpers.ts",
      template: "templates/nextjs-test-helpers.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "test-utils/nextjs-test-setup.ts",
      template: "templates/nextjs-test-setup.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: "test-utils/nextjs-test-teardown.ts",
      template: "templates/nextjs-test-teardown.ts.tpl",
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 1,
      },
    },
    // Install Next.js-specific Testing Dependencies
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        "@testing-library/react",
        "@testing-library/jest-dom",
        "@testing-library/user-event",
        "msw",
        "happy-dom",
      ],
      isDev: true,
    },
    // Add Test Scripts to package.json
    {
      type: BlueprintActionType.ENHANCE_FILE,
      path: "package.json",
      modifier: ModifierType.PACKAGE_JSON_MERGER,
      params: {
        scriptsToAdd: {
          "test": "vitest",
          "test:ui": "vitest --ui",
          "test:run": "vitest run",
          "test:coverage": "vitest run --coverage",
          "test:unit": "vitest run --config vitest.config.ts --testNamePattern=unit",
          "test:integration": "vitest run --config vitest.config.ts --testNamePattern=integration",
          "test:e2e": "vitest run --config vitest.config.ts --testNamePattern=e2e",
          "test:watch": "vitest --watch",
          "test:debug": "vitest --inspect-brk",
        },
      },
    }
  ];
}