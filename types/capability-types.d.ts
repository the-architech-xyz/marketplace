/**
 * Capability-Driven Genome Types
 * 
 * Auto-generated type definitions for capability-driven genome authoring.
 * Provides strict type safety for capability IDs and their parameters.
 */

import { Genome } from '@thearchitech.xyz/types';

// Capability ID union type (for strict typing)
export type CapabilityId = 
;

// Framework parameter types (for project.apps[])


export type FrameworkId = 'nextjs' | 'expo';

// Discriminated app type based on framework id
export type FrameworkApp =
  | { id: string; type: 'web' | 'mobile' | 'api' | 'desktop' | 'worker'; framework: FrameworkId; package?: string; router?: 'app' | 'pages'; alias?: string; parameters?: Record<string, unknown>; };

// Generated capability schema
export interface CapabilitySchema {
}

// Provider-discriminated adapter unions per capability

export type CapabilityAdapterUnion = {

};

// Capability-driven genome interface with strict typing
export interface CapabilityGenome {
  version: string;
  project: {
    name: string;
    description?: string;
    path?: string;
    structure?: 'monorepo' | 'single-app';
    // Multiple apps instead of single framework
    apps: FrameworkApp[];
    monorepo?: {
      tool: 'turborepo' | 'nx' | 'pnpm' | 'yarn';
      packages?: {
        api?: string;
        web?: string;
        mobile?: string;
        shared?: string;
        ui?: string;
        [key: string]: string | undefined;
      };
    };
  };
  // Strict typing: capability schema with provider-discriminated adapter typing
  capabilities: {
    [K in CapabilityId]?: Omit<CapabilitySchema[K], 'adapter' | 'provider'> & CapabilityAdapterUnion[K];
  };
  // Legacy support
  modules?: any[];
}

// Type-safe defineGenome function for capabilities
// Enforces strict capability ID and parameter typing
export declare function defineCapabilityGenome<T extends CapabilityGenome>(genome: T): T;

// Re-export for convenience
export type { Genome } from '@thearchitech.xyz/types';
