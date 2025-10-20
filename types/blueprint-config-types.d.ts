/**
 * Blueprint Configuration Types
 */

import type { ModuleId, ModuleParameters } from './genome-types';

export type TypedMergedConfiguration<T extends ModuleId> = {
  moduleId: T;
  parameters: T extends keyof ModuleParameters ? ModuleParameters[T] : never;
  features?: Record<string, unknown>;
  framework?: string;
  paths?: Record<string, string>;
};

export function extractTypedModuleParameters<T extends ModuleId>(
  config: TypedMergedConfiguration<T>
): {
  params: T extends keyof ModuleParameters ? ModuleParameters[T] : never;
  features: Record<string, unknown>;
  framework: string | undefined;
  paths: Record<string, string>;
};

export type { ModuleId, ModuleParameters } from './genome-types';
