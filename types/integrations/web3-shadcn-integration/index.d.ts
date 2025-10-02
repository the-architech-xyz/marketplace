/**
 * Web3 Shadcn Integration
 * 
 * Web3 UI components with Shadcn/ui for modern blockchain applications
 */

export interface Web3ShadcnIntegrationParams {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const Web3ShadcnIntegrationArtifacts: {
  creates: [
    'src/lib/web3/tailwind-config.ts',
    'src/lib/web3/utils.ts',
    'src/lib/web3/component-utils.ts',
    'src/lib/web3/styles.ts'
  ],
  enhances: [
    { path: 'tailwind.config.js' }
  ],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type Web3ShadcnIntegrationCreates = typeof Web3ShadcnIntegrationArtifacts.creates[number];
export type Web3ShadcnIntegrationEnhances = typeof Web3ShadcnIntegrationArtifacts.enhances[number];
