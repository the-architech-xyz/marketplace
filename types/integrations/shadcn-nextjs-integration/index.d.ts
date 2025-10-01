/**
 * Shadcn Next.js Integration
 * 
 * Integrates Shadcn/ui with Next.js by configuring Tailwind and providing theme providers
 */

export interface ShadcnNextjsIntegrationParams {}

// 🚀 Auto-discovered artifacts with ownership info
export declare const ShadcnNextjsIntegrationArtifacts: {
  creates: [],
  enhances: [
    { path: 'tsconfig.json' },
    { path: 'src/app/globals.css' },
    { path: 'components.json' },
    { path: 'src/app/layout.tsx' }
  ],
  installs: [],
  envVars: []
};

// Type-safe artifact access
export type ShadcnNextjsIntegrationCreates = typeof ShadcnNextjsIntegrationArtifacts.creates[number];
export type ShadcnNextjsIntegrationEnhances = typeof ShadcnNextjsIntegrationArtifacts.enhances[number];
