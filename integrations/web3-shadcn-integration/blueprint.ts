import { Blueprint } from '@thearchitech.xyz/types';

const web3ShadcnIntegrationBlueprint: Blueprint = {
  id: 'web3-shadcn-integration',
  name: 'Web3 Shadcn Integration',
  description: 'Technical bridge connecting Web3 and Shadcn/ui - configures Web3 utilities and styling',
  version: '2.0.0',
  actions: [
    // Configure Tailwind for Web3 components
    {
      type: 'ENHANCE_FILE',
      path: 'tailwind.config.js',
      modifier: 'ts-module-enhancer',
      params: {
        wrapperFunction: 'withWeb3Config',
        wrapperImport: {
          name: 'withWeb3Config',
          from: './lib/web3/tailwind-config',
          isDefault: false
        },
        wrapperOptions: {
          web3Styles: true,
          web3Utilities: true
        }
      }
    },
    // Create Web3-specific Tailwind configuration
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/tailwind-config.ts',
      template: 'templates/tailwind-config.ts.tpl'
    },
    // Create Web3 utility functions
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/utils.ts',
      template: 'templates/web3-utils.ts.tpl'
    },
    // Create Web3 component utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/component-utils.ts',
      template: 'templates/component-utils.ts.tpl'
    },
    // Create Web3 styling constants
    {
      type: 'CREATE_FILE',
      path: 'src/lib/web3/styles.ts',
      template: 'templates/web3-styles.ts.tpl'
    }
  ]
};

export default web3ShadcnIntegrationBlueprint;