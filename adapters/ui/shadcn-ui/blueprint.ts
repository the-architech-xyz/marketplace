/**
 * Shadcn/ui Adapter Blueprint
 * 
 * Pure installer for Shadcn/ui components - only installs components and dependencies
 * Configuration and integration is handled by integrators
 */

import { Blueprint } from '@thearchitech.xyz/types';

const shadcnUiBlueprint: Blueprint = {
  id: 'shadcn-ui-installer',
  name: 'Shadcn/ui Component Installer',
  description: 'Pure installer for Shadcn/ui components and dependencies',
  actions: [
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
    // Initialize Shadcn/ui (non-interactive, Tailwind v4 compatible)
    {
      type: 'RUN_COMMAND',
      command: 'npx shadcn@latest init --yes --defaults --force --silent --src-dir --css-variables --base-color slate'
    },
    // Install components from genome parameters using forEach pattern
    // This will be dynamically expanded by the BlueprintExecutor
    {
      type: 'RUN_COMMAND',
      command: 'npx shadcn@latest add {{item}} --yes --overwrite',
      forEach: 'module.parameters.components'
    }
  ]
};

export default shadcnUiBlueprint;