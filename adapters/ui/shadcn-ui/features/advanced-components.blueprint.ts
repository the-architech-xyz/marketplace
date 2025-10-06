/**
 * Advanced Components Feature Blueprint
 * 
 * Adds advanced UI components as optional features
 * Only installed when explicitly requested in genome.yaml
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

export const advancedComponentsBlueprint: Blueprint = {
  id: 'shadcn-ui-advanced-components',
  name: 'Advanced Components Feature',
  actions: [
    // Install additional Radix UI dependencies for advanced components
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-label',
        '@radix-ui/react-select',
        '@radix-ui/react-separator',
        '@radix-ui/react-sheet',
        '@radix-ui/react-switch',
        '@radix-ui/react-tabs',
        '@radix-ui/react-toast',
        '@radix-ui/react-tooltip',
        '@radix-ui/react-accordion',
        '@radix-ui/react-alert-dialog',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-collapsible',
        '@radix-ui/react-context-menu',
        '@radix-ui/react-hover-card',
        '@radix-ui/react-menubar',
        '@radix-ui/react-navigation-menu',
        '@radix-ui/react-popover',
        '@radix-ui/react-progress',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-scroll-area',
        '@radix-ui/react-slider',
        '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group',
        'cmdk',
        'sonner'
      ]
    },
     // Install requested components
     {
       type: BlueprintActionType.RUN_COMMAND,
       command: 'npx shadcn@latest add {{#each module.features.advanced-components.parameters.components}}{{this}} {{/each}} --yes --overwrite --silent'
     }
  ]
};