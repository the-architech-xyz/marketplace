/**
 * Shadcn/ui Theming Feature Blueprint
 * 
 * Pure installer for theming dependencies - only installs packages
 * Configuration and integration is handled by integrators
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const themingBlueprint: Blueprint = {
  id: 'shadcn-ui-theming-installer',
  name: 'Shadcn/ui Theming Installer',
  description: 'Pure installer for theming dependencies',
  actions: [
    // Install theming dependencies only
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'next-themes@^0.2.1'
      ]
    }
  ]
};