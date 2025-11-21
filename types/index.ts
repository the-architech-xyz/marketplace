/**
 * The Architech Marketplace Types - Runtime Entry Point
 * 
 * This file serves as the main entry point for importing marketplace types.
 * It re-exports from all type modules.
 */

// Re-export shared helpers (defineGenome, Module, etc.)
export { defineGenome } from '@thearchitech.xyz/types';

// Re-export genome-specific marketplace types (ModuleId, ModuleParameters, etc.)
export * from './genome-types.js';

// Re-export capability types
export * from './capability-types.js';

// Re-export blueprint configuration utilities
export type { TypedMergedConfiguration } from './blueprint-config-types.js';
export { extractTypedModuleParameters } from './blueprint-config-types.js';
