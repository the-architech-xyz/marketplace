/**
 * Next.js Internationalization Blueprint
 * 
 * Sets up complete next-intl integration with advanced features
 * Includes pluralization, rich text, dynamic imports, and more
 */

import { Blueprint, BlueprintActionType, ConflictResolutionStrategy, ModifierType } from '@thearchitech.xyz/types';

const nextIntlBlueprint: Blueprint = {
  id: 'next-intl-base-setup',
  name: 'Next.js Internationalization Base Setup',
  actions: [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['next-intl']
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/i18n/request.ts',
      template: 'request.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/messages/en.json',
      template: 'templates/en.json.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/messages/es.json',
      template: 'templates/es.json.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'src/messages/fr.json',
      template: 'templates/fr.json.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.ENHANCE_FILE,
      path: 'next.config.ts',
      modifier: ModifierType.TS_MODULE_ENHANCER,
      context: {
        content: `import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);`,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    }
  },
  ]
};

export default nextIntlBlueprint;