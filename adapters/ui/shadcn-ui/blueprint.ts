/**
 * Shadcn/ui Adapter Blueprint - Schema-Driven Version
 * 
 * Self-schematizing blueprint with type-safe parameter validation
 * This blueprint automatically validates component names and provides defaults
 */

import { defineBlueprint, type BlueprintSchema, type BlueprintAction } from '@thearchitech.xyz/types';

// Define valid Shadcn components with 'as const' for type inference
const VALID_SHADCN_COMPONENTS = [
  'button', 'input', 'card', 'dialog', 'form', 'table', 'badge', 'avatar', 
  'dropdown-menu', 'sonner', 'sheet', 'tabs', 'accordion', 'carousel', 
  'calendar', 'alert-dialog', 'checkbox', 'collapsible', 'context-menu', 
  'hover-card', 'menubar', 'navigation-menu', 'popover', 'progress', 
  'radio-group', 'scroll-area', 'slider', 'toggle', 'toggle-group'
] as const;

// Define the schema with type-safe validation
const schema: BlueprintSchema = {
  parameters: {
    theme: {
      type: 'string',
      enum: ['default', 'dark', 'light'] as const,
      default: 'default',
      description: 'UI theme variant'
    },
    components: {
      type: 'array',
      items: {
        type: 'string',
        enum: VALID_SHADCN_COMPONENTS
      },
      default: ['button', 'card', 'input'],
      description: 'Shadcn components to install'
    },
    darkMode: {
      type: 'boolean',
      default: true,
      description: 'Enable dark mode support'
    }
  },
  features: {
    theming: {
      type: 'boolean',
      default: true,
      description: 'Enable theming capabilities'
    },
    accessibility: {
      type: 'boolean',
      default: true,
      description: 'Enable accessibility features'
    }
  }
};

// Create the schema-driven blueprint
export const blueprint = defineBlueprint({
  id: 'shadcn-ui-installer',
  name: 'Shadcn/ui Component Installer',
  description: 'Pure installer for Shadcn/ui components and dependencies',
  schema,
  actions: (params) => [
    // Install core Shadcn/ui dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        '@radix-ui/react-slot@^1.0.2',
        'class-variance-authority@^0.7.0',
        'clsx@^2.0.0',
        'tailwind-merge@^2.0.0',
        'tailwindcss-animate@^1.0.7',
        'lucide-react@^0.294.0'
      ]
    },
    // Install core Radix UI primitives
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        '@radix-ui/react-dialog@^1.0.5',
        '@radix-ui/react-dropdown-menu@^2.0.6',
        '@radix-ui/react-label@^2.0.2',
        '@radix-ui/react-select@^2.0.0',
        '@radix-ui/react-separator@^1.0.3',
        '@radix-ui/react-switch@^1.0.3',
        '@radix-ui/react-tabs@^1.0.4',
        '@radix-ui/react-toast@^1.1.5',
        '@radix-ui/react-tooltip@^1.0.7',
        '@radix-ui/react-accordion@^1.1.2',
        '@radix-ui/react-alert-dialog@^1.0.5',
        '@radix-ui/react-avatar@^1.0.4',
        '@radix-ui/react-checkbox@^1.0.4',
        '@radix-ui/react-collapsible@^1.0.3',
        '@radix-ui/react-context-menu@^2.1.5',
        '@radix-ui/react-hover-card@^1.0.7',
        '@radix-ui/react-menubar@^1.0.4',
        '@radix-ui/react-navigation-menu@^1.1.4',
        '@radix-ui/react-popover@^1.0.7',
        '@radix-ui/react-progress@^1.0.3',
        '@radix-ui/react-radio-group@^1.1.3',
        '@radix-ui/react-scroll-area@^1.0.5',
        '@radix-ui/react-slider@^1.1.2',
        '@radix-ui/react-toggle@^1.0.3',
        '@radix-ui/react-toggle-group@^1.0.4'
      ]
    },
    // Install additional utilities
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'cmdk@^0.2.0',
        'date-fns@^2.30.0',
        'react-day-picker@^8.9.1',
        'react-hook-form@^7.48.2',
        '@hookform/resolvers@^3.3.2',
        'zod@^3.22.4',
        'sonner@^1.2.4',
        'tailwindcss-animate@^1.0.7'
      ]
    },
    // Set npm to use legacy peer deps for React 19 compatibility
    {
      type: 'RUN_COMMAND',
      command: 'npm config set legacy-peer-deps true'
    },
    // Initialize Shadcn/ui (non-interactive, Tailwind v4 compatible)
    {
      type: 'RUN_COMMAND',
      command: 'npx shadcn@latest init --yes --defaults --force --silent --src-dir --css-variables --base-color slate'
    },
    // Install components from validated parameters
    // The params.components is now type-safe and validated
    ...(Array.isArray(params.components) ? params.components.map(component => ({
      type: 'RUN_COMMAND' as const,
      command: `npx shadcn@latest add ${component} --yes --overwrite`,
      workingDir: '.'
    })) : [])
  ]
});