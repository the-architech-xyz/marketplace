/**
 * Blueprint Configuration Types
 * 
 * Automatically typed MergedConfiguration based on module schemas.
 * This leverages the existing ModuleParameters type generation system.
 */

import { MergedConfiguration } from '@thearchitech.xyz/types';
import { ModuleParameters, ModuleId } from './genome-types.js';

/**
 * Automatically typed MergedConfiguration for a specific module
 * 
 * This uses the existing ModuleParameters mapping to provide type safety
 * for blueprint functions based on their module ID.
 */
export type TypedMergedConfiguration<TModuleId extends ModuleId> = MergedConfiguration & {
  templateContext: {
    module: {
      id: TModuleId;
      parameters: TModuleId extends keyof ModuleParameters ? ModuleParameters[TModuleId] : any;
    };
    project: any;
    modules: any[];
  };
};

/**
 * Blueprint function signature with automatic typing
 * 
 * Usage in blueprints:
 * ```typescript
 * export default function generateBlueprint(
 *   config: TypedMergedConfiguration<'features/architech-welcome/shadcn'>
 * ): BlueprintAction[] {
 *   // config.templateContext.module.parameters is now fully typed!
 *   const { params, features } = extractModuleParameters(config);
 *   // features.techStack ✅ - IDE knows this exists
 *   // features.invalidParam ❌ - IDE shows error
 * }
 * ```
 */
export type TypedBlueprintFunction<TModuleId extends ModuleId> = (
  config: TypedMergedConfiguration<TModuleId>
) => import('@thearchitech.xyz/types').BlueprintAction[];

/**
 * Helper to extract module parameters with full type safety
 */
export function extractTypedModuleParameters<TModuleId extends ModuleId>(
  config: TypedMergedConfiguration<TModuleId>
): {
  params: TModuleId extends keyof ModuleParameters ? ModuleParameters[TModuleId] : any;
  features: TModuleId extends keyof ModuleParameters 
    ? ModuleParameters[TModuleId] extends { features?: infer F } 
      ? F extends Record<string, any> 
        ? F 
        : never
      : never
    : never;
  project: any;
  modules: any[];
} {
  const templateContext = config.templateContext || {};
  const module = (templateContext as any).module || {};
  const params = module.parameters || {};
  const features = (params as any).features || {};
  
  return {
    params: params as TModuleId extends keyof ModuleParameters ? ModuleParameters[TModuleId] : any,
    features: features as TModuleId extends keyof ModuleParameters 
      ? ModuleParameters[TModuleId] extends { features?: infer F } 
        ? F extends Record<string, any> 
          ? F 
          : never
        : never
      : never,
    project: (templateContext as any).project || {},
    modules: (templateContext as any).modules || []
  };
}

/**
 * Type-safe blueprint parameter extractor (generic version)
 */
export function extractModuleParameters<TModuleId extends ModuleId>(
  config: TypedMergedConfiguration<TModuleId>
) {
  return extractTypedModuleParameters(config);
}
