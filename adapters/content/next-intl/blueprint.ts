/**
 * Next.js Internationalization Blueprint
 * 
 * Sets up complete next-intl integration with advanced features
 * Includes pluralization, rich text, dynamic imports, and more
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const nextIntlBlueprint: Blueprint = {
  id: 'next-intl-base-setup',
  name: 'Next.js Internationalization Base Setup',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['next-intl']
    },
    {
      type: 'CREATE_FILE',
      path: 'src/i18n/request.ts',
      template: 'request.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/messages/en.json',
      template: 'templates/en.json.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/messages/es.json',
      template: 'templates/es.json.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'src/messages/fr.json',
      template: 'templates/fr.json.tpl'
    }
  ]
};