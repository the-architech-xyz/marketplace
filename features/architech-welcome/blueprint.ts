/**
 * Architech Welcome Tech-Stack Blueprint
 * 
 * This is the CORE version that:
 * - Extracts project data (tech stack, modules, etc.)
 * - Provides data utilities and types
 * - **ARCHITECTURAL PRINCIPLE**: Uses convention-based UI template loading
 *   Templates with `ui/` prefix are automatically resolved from UI marketplace
 *   Core marketplace controls WHERE files are created (framework-aware paths)
 *   UI marketplaces provide template CONTENT (technology-specific rendering)
 * 
 * UI implementations are in:
 * - marketplace-shadcn/ui/architech-welcome/
 * - marketplace-tamagui/ui/architech-welcome/
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const blueprint: Blueprint = {
  id: "architech-welcome",
  name: "Architech Welcome",
  description: "Core welcome page logic and data extraction (framework-agnostic)",
  actions: [
    // Install dependencies for data extraction and analysis
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'react-syntax-highlighter@^15.5.0',
        '@types/react-syntax-highlighter@^15.5.0',
        'framer-motion@^11.0.0'
      ]
    },

    // Create data extractor utility
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}welcome/data-extractor.ts',
      template: 'templates/data-extractor.ts.tpl'
    },

    // Create TypeScript types
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}welcome/types.ts',
      template: 'templates/types.ts.tpl'
    },

    // Create index export
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}welcome/index.ts',
      template: 'templates/index.ts.tpl'
    },

    // Create project analyzer (alias for data-extractor for UI compatibility)
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.lib}project-analyzer.ts',
      template: 'templates/project-analyzer.ts.tpl'
    },

    // UI Components from UI Marketplace
    // Convention: Templates with `ui/` prefix are automatically resolved from UI marketplace
    // Core marketplace declares WHERE files go (framework-aware paths)
    // UI marketplace provides template CONTENT (technology-specific)
    
    // Main welcome page - replaces default route page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.app_root}page.tsx',
      template: 'ui/architech-welcome/welcome-page.tsx.tpl',
      overwrite: true
    },

    // Welcome layout component
    {
      type: BlueprintActionType.CREATE_FILE,  
      path: '${paths.components}welcome/welcome-layout.tsx',
      template: 'ui/architech-welcome/welcome-layout.tsx.tpl'
    },

    // Component showcase
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}welcome/component-showcase.tsx',  
      template: 'ui/architech-welcome/component-showcase.tsx.tpl'
    },

    // Tech stack card
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}welcome/tech-stack-card.tsx',
      template: 'ui/architech-welcome/tech-stack-card.tsx.tpl'
    },

    // Project structure component
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}welcome/project-structure.tsx',
      template: 'ui/architech-welcome/project-structure.tsx.tpl'
    },

    // Quick start guide
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.components}welcome/quick-start-guide.tsx',
      template: 'ui/architech-welcome/quick-start-guide.tsx.tpl'
    }
  ]
};

export default blueprint;

