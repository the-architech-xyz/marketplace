/**
 * Base types for The Architech Marketplace
 */

export enum BlueprintActionType {
  CREATE_FILE = 'CREATE_FILE',
  ENHANCE_FILE = 'ENHANCE_FILE',
  INSTALL_PACKAGES = 'INSTALL_PACKAGES',
  RUN_COMMAND = 'RUN_COMMAND',
  ADD_ENV_VAR = 'ADD_ENV_VAR',
  ADD_SCRIPT = 'ADD_SCRIPT',
  COPY_FILE = 'COPY_FILE',
  MOVE_FILE = 'MOVE_FILE',
  DELETE_FILE = 'DELETE_FILE',
  CREATE_DIRECTORY = 'CREATE_DIRECTORY',
  DELETE_DIRECTORY = 'DELETE_DIRECTORY'
}

export enum ConflictResolutionStrategy {
  REPLACE = 'REPLACE',
  MERGE = 'MERGE',
  SKIP = 'SKIP',
  FAIL = 'FAIL'
}

export enum ModifierType {
  JSON_MERGER = 'json-merger',
  YAML_MERGER = 'yaml-merger',
  PACKAGE_JSON_MERGER = 'package-json-merger',
  ENV_MERGER = 'env-merger',
  TEMPLATE_PROCESSOR = 'template-processor',
  DOCKERFILE_MERGER = 'dockerfile-merger',
  DOCKERIGNORE_MERGER = 'dockerignore-merger',
  TS_MODULE_ENHANCER = 'ts-module-enhancer',
  JSX_CHILDREN_WRAPPER = 'jsx-children-wrapper',
  CSS_ENHANCER = 'css-enhancer'
}

export enum EnhanceFileFallbackStrategy {
  CREATE = 'CREATE',
  SKIP = 'SKIP',
  FAIL = 'FAIL'
}

export interface ConflictResolution {
  strategy: ConflictResolutionStrategy;
  priority?: number;
}

export interface BlueprintAction {
  type: BlueprintActionType;
  path?: string;
  template?: string;
  content?: string;
  modifier?: ModifierType;
  params?: Record<string, any>;
  conflictResolution?: ConflictResolution;
  forEach?: string;
  workingDir?: string;
  packages?: string[];
  command?: string;
  envVars?: Record<string, string>;
  source?: string;
  destination?: string;
  key?: string;
  value?: string;
  isDev?: boolean;
  [key: string]: any; // Allow additional properties
}

export interface Blueprint {
  id: string;
  name: string;
  description?: string;
  version?: string;
  actions: BlueprintAction[];
}

export interface Module {
  id: string;
  category?: string;
  parameters?: Record<string, any>;
  features?: Record<string, any>;
}

export interface ProjectConfig {
  name: string;
  path: string;
  type: string;
  framework: string;
  modules: Module[];
}

export interface ModuleArtifacts {
  files: string[];
  capabilities: string[];
  dependencies: string[];
}
