/**
 * Dynamic Tailwind CSS Blueprint
 * 
 * Generates Tailwind CSS configuration based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy, MergedConfiguration } from '@thearchitech.xyz/types';

/**
 * Dynamic Tailwind CSS Blueprint
 * 
 * Generates Tailwind CSS configuration based on Constitutional Architecture configuration.
 * Core features are always included, optional features are conditionally generated.
 */
export default function generateBlueprint(config: MergedConfiguration): BlueprintAction[] {
  const actions: BlueprintAction[] = [];
  
  // Core is always generated
  actions.push(...generateCoreActions());
  
  // Optional features based on configuration
  if (config.activeFeatures.includes('typography')) {
    actions.push(...generateTypographyActions());
  }
  
  if (config.activeFeatures.includes('forms')) {
    actions.push(...generateFormsActions());
  }
  
  if (config.activeFeatures.includes('aspectRatio')) {
    actions.push(...generateAspectRatioActions());
  }
  
  if (config.activeFeatures.includes('darkMode')) {
    actions.push(...generateDarkModeActions());
  }
  
  return actions;
}

// ============================================================================
// CORE TAILWIND FEATURES (Always Generated)
// ============================================================================

function generateCoreActions(): BlueprintAction[] {
  return [
    // Install Tailwind CSS
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['tailwindcss', 'postcss', 'autoprefixer'],
      isDev: true
    },
    // Create Tailwind config
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'tailwind.config.js',
      template: 'templates/tailwind.config.js.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.MERGE,
        priority: 0
      }},
    // Create PostCSS config
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'postcss.config.js',
      template: 'templates/postcss.config.js.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }},
    // Create base CSS file
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}globals.css',
      template: 'templates/globals.css.tpl',
      conflictResolution: { strategy: ConflictResolutionStrategy.REPLACE }
    }
  ];
}

// ============================================================================
// TYPOGRAPHY FEATURES (Optional)
// ============================================================================

function generateTypographyActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@tailwindcss/typography'],
      isDev: true
    }
  ];
}

// ============================================================================
// FORMS FEATURES (Optional)
// ============================================================================

function generateFormsActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@tailwindcss/forms'],
      isDev: true
    }
  ];
}

// ============================================================================
// ASPECT RATIO FEATURES (Optional)
// ============================================================================

function generateAspectRatioActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['@tailwindcss/aspect-ratio'],
      isDev: true
    }
  ];
}

// ============================================================================
// DARK MODE FEATURES (Optional)
// ============================================================================

function generateDarkModeActions(): BlueprintAction[] {
  return [
    // Dark mode is handled in the template, no additional packages needed
  ];
}
