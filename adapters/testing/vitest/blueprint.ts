/**
 * Vitest Testing Adapter Blueprint
 * 
 * Implements capability-based generation with dependency resolution
 * Core features are always included, optional features are conditionally generated
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

/**
 * Dynamic Vitest Testing Adapter Blueprint
 * 
 * Generates testing configuration based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */
export default function generateBlueprint(
  config: TypedMergedConfiguration<'testing/vitest'>
): BlueprintAction[] {
  // Extract module parameters for cleaner access
  const { params, features } = extractTypedModuleParameters(config);

  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (features.coverage) {
    actions.push(...generateCoverageActions());
  }
  
  if (features.ui) {
    actions.push(...generateUIActions());
  }
  
  if (features.e2e) {
    actions.push(...generateE2EActions());
  }
  
  return actions;
}

// ============================================================================
// CORE TESTING FEATURES (Always Generated)
// ============================================================================

function generateCoreActions(): BlueprintAction[] {
  return [
    // Install core packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['vitest', '@vitejs/plugin-react', 'jsdom', '@testing-library/react', '@testing-library/jest-dom', '@testing-library/user-event', '@types/react', '@types/react-dom'],
      isDev: true
    },

    // Core testing files
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'vitest.config.ts',
      template: 'templates/vitest.config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'tests/setup/setup.ts',
      template: 'templates/setup.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'tests/setup/utils.tsx',
      template: 'templates/utils.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'tests/setup/mocks.ts',
      template: 'templates/setup.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'tests/unit/example.test.tsx',
      template: 'templates/example.test.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },

    // Core scripts
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test',
      command: 'vitest'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test:run',
      command: 'vitest run'
    }
  ];
}

// ============================================================================
// COVERAGE FEATURES (Optional)
// ============================================================================

function generateCoverageActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@vitest/coverage-v8'],
      isDev: true
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test:coverage',
      command: 'vitest run --coverage'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test:coverage:ui',
      command: 'vitest run --coverage --reporter=html'
    }
  ];
}

// ============================================================================
// UI FEATURES (Optional)
// ============================================================================

function generateUIActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@vitest/ui'],
      isDev: true
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test:ui',
      command: 'vitest --ui'
    }
  ];
}

// ============================================================================
// E2E FEATURES (Optional)
// ============================================================================

function generateE2EActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@playwright/test', 'playwright'],
      isDev: true
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test:e2e',
      command: 'playwright test'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test:e2e:ui',
      command: 'playwright test --ui'
    }
  ];
}
