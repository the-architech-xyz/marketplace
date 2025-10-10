/**
 * Dynamic ESLint Adapter Blueprint
 * 
 * Generates ESLint configuration based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

/**
 * Dynamic ESLint Adapter Blueprint
 * 
 * Generates ESLint configuration based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (config.activeFeatures.includes('typescript')) {
    actions.push(...generateTypeScriptActions());
  }
  
  if (config.activeFeatures.includes('react')) {
    actions.push(...generateReactActions());
  }
  
  if (config.activeFeatures.includes('nextjs')) {
    actions.push(...generateNextJSActions());
  }
  
  if (config.activeFeatures.includes('nodejs')) {
    actions.push(...generateNodeJSActions());
  }
  
  if (config.activeFeatures.includes('accessibility')) {
    actions.push(...generateAccessibilityActions());
  }
  
  if (config.activeFeatures.includes('imports')) {
    actions.push(...generateImportActions());
  }
  
  if (config.activeFeatures.includes('format')) {
    actions.push(...generateFormatActions());
  }
  
  return actions;
}

// ============================================================================
// CORE ESLINT FEATURES (Always Generated)
// ============================================================================

function generateCoreActions(): BlueprintAction[] {
  return [
    // Install ESLint and core packages
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint'],
      isDev: true
    },
    // Create unified ESLint configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'eslint.config.mjs',
      template: 'templates/eslint.config.mjs.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.eslintignore',
      template: 'templates/.eslintignore.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    // Create ESLint rules configuration
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'eslint-rules.js',
      template: 'templates/eslint-rules.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    // Create ESLint utilities
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.scripts}}lint-staged.js',
      template: 'templates/lint-staged.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.scripts}}eslint-fix.js',
      template: 'templates/eslint-fix.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    }
  ];
}

// ============================================================================
// TYPESCRIPT FEATURES (Optional)
// ============================================================================

function generateTypeScriptActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@typescript-eslint/parser', '@typescript-eslint/eslint-plugin'],
      isDev: true
    }
  ];
}

// ============================================================================
// REACT FEATURES (Optional)
// ============================================================================

function generateReactActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
      isDev: true
    }
  ];
}

// ============================================================================
// NEXTJS FEATURES (Optional)
// ============================================================================

function generateNextJSActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-config-next'],
      isDev: true
    }
  ];
}

// ============================================================================
// NODEJS FEATURES (Optional)
// ============================================================================

function generateNodeJSActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-plugin-node'],
      isDev: true
    }
  ];
}

// ============================================================================
// ACCESSIBILITY FEATURES (Optional)
// ============================================================================

function generateAccessibilityActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-plugin-jsx-a11y'],
      isDev: true
    }
  ];
}

// ============================================================================
// IMPORT FEATURES (Optional)
// ============================================================================

function generateImportActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-plugin-import', 'eslint-plugin-import-resolver-typescript'],
      isDev: true
    }
  ];
}

// ============================================================================
// FORMAT FEATURES (Optional)
// ============================================================================

function generateFormatActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['eslint-plugin-prettier', 'eslint-config-prettier'],
      isDev: true
    }
  ];
}
