/**
 * Shadcn/ui Accessibility Feature Blueprint
 * 
 * Pure installer for accessibility dependencies - only installs packages
 * Configuration and integration is handled by integrators
 */

import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/marketplace/types';

export const accessibilityBlueprint: Blueprint = {
  id: 'shadcn-ui-accessibility-installer',
  name: 'Shadcn/ui Accessibility Installer',
  description: 'Pure installer for accessibility dependencies',
  actions: [
    // Install accessibility dependencies only
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'eslint-plugin-jsx-a11y@^6.8.0',
        '@types/eslint-plugin-jsx-a11y@^6.0.0'
      ],
      isDev: true
    }
  ]
};