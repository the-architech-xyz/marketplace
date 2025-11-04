/**
 * Helper functions for Constitutional Architecture Type Generator
 */

import * as fs from 'fs';
import * as path from 'path';
import { BlueprintAnalysisResult, ModuleArtifacts } from '@thearchitech.xyz/types';

export class ConstitutionalTypeGeneratorHelpers {
  /**
   * Generate master index file with Constitutional Architecture support
   */
  static async generateConstitutionalMasterIndex(
    analysisResults: BlueprintAnalysisResult[], 
    outputPath: string, 
    moduleIds: string[]
  ): Promise<void> {
    const exports: string[] = [];
    const artifactExports: string[] = [];
    const contractExports: string[] = [];
    
    // Generate exports for all modules
    for (const analysis of analysisResults) {
      const moduleId = analysis.moduleId;
      const moduleType = analysis.moduleType;
      
      // Build the correct path based on module type and moduleId
      // NOTE: moduleId for connectors/features ALREADY includes the prefix
      // Adapters: 'database/drizzle' (no prefix) → 'adapters/database/drizzle'
      // Connectors: 'connectors/sentry/nextjs' (has prefix) → use as-is
      // Features: 'features/auth/frontend/shadcn' (has prefix) → use as-is
      let modulePath: string;
      if (moduleType === 'adapter') {
        modulePath = `adapters/${moduleId}`;
      } else if (moduleType === 'connector') {
        modulePath = moduleId; // Already has 'connectors/' prefix
      } else if (moduleType === 'feature') {
        modulePath = moduleId; // Already has 'features/' prefix
      } else {
        // Skip unknown types
        continue;
      }
      
      exports.push(`export * from './${modulePath}';`);
      artifactExports.push(`  '${moduleId}': (): Promise<ModuleArtifacts> => import('./${modulePath}').then(m => m.${this.getArtifactsExportName(moduleId)}),`);
    }
    
    // Generate contract exports for features
    const contractExportsResult = await this.generateContractExports(outputPath);
    contractExports.push(...contractExportsResult);
    
    const tsContent = `/**
 * The Architech Marketplace Types - Constitutional Architecture
 * 
 * Auto-generated TypeScript definitions with Constitutional Architecture support
 */

// Import base types from the types package
import { Module, ProjectConfig, ModuleArtifacts as ModuleArtifactsType } from '@thearchitech.xyz/types';

${exports.join('\n')}

// 🎯 Cohesive Contract Exports
${contractExports.join('\n')}

// 🚀 Auto-discovered module artifacts
export declare const ModuleArtifacts: {
  [key: string]: () => Promise<ModuleArtifactsType>;
};

export type ModuleId = keyof typeof ModuleArtifacts;

// Re-export base types for convenience
export { Module, ProjectConfig } from '@thearchitech.xyz/types';

// Re-export Genome type from shared types package
export { Genome } from '@thearchitech.xyz/types';

// Re-export defineGenome function (module-focused)
export * from './define-genome';

// Re-export capability types (capability-focused)
export * from './capability-types';
`;

    const outputFile = path.join(outputPath, 'index.d.ts');
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log('📝 Generated Constitutional Architecture master index');
  }

  /**
   * Generate Constitutional Architecture TypeScript content for an adapter
   */
  static generateConstitutionalAdapterTypeContent(moduleId: string, adapterJson: any, artifacts: ModuleArtifacts): string {
    const moduleName = this.toPascalCase(moduleId.replace(/\//g, ' '));
    const paramsInterface = `${moduleName}Params`;
    const featuresInterface = `${moduleName}Features`;
    const artifactsConst = `${moduleName}Artifacts`;
    
    // Generate Constitutional Architecture parameters interface
    const paramsContent = this.generateConstitutionalParametersInterface(adapterJson.parameters || {}, paramsInterface);
    
    // Generate Constitutional Architecture features interface
    const featuresContent = this.generateConstitutionalFeaturesInterface(adapterJson.parameters?.features || {}, featuresInterface);
    
    // Generate artifacts constant
    const artifactsContent = this.generateArtifactsConstant(artifacts, artifactsConst);
    
    return `/**
 * ${adapterJson.name || moduleId}
 * 
 * ${adapterJson.description || 'Auto-generated adapter types with Constitutional Architecture support'}
 */

${paramsContent}

${featuresContent}

// 🚀 Auto-discovered artifacts
${artifactsContent}

// Type-safe artifact access
export type ${moduleName}Creates = typeof ${artifactsConst}.creates[number];
export type ${moduleName}Enhances = typeof ${artifactsConst}.enhances[number];
`;
  }

  /**
   * Generate Constitutional Architecture TypeScript content for an integration
   */
  static generateConstitutionalIntegrationTypeContent(moduleId: string, integrationJson: any, artifacts: ModuleArtifacts): string {
    const moduleName = this.toPascalCase(moduleId.replace(/\//g, ' '));
    const paramsInterface = `${moduleName}Params`;
    const featuresInterface = `${moduleName}Features`;
    const artifactsConst = `${moduleName}Artifacts`;
    
    // Generate Constitutional Architecture parameters interface
    const paramsContent = this.generateConstitutionalParametersInterface(integrationJson.parameters || {}, paramsInterface);
    
    // Generate Constitutional Architecture features interface
    const featuresContent = this.generateConstitutionalFeaturesInterface(integrationJson.parameters?.features || {}, featuresInterface);
    
    // Generate artifacts constant with ownership info
    const artifactsContent = this.generateIntegrationArtifactsConstant(artifacts, artifactsConst);
    
    return `/**
 * ${integrationJson.name || moduleId}
 * 
 * ${integrationJson.description || 'Auto-generated integration types with Constitutional Architecture support'}
 */

${paramsContent}

${featuresContent}

// 🚀 Auto-discovered artifacts with ownership info
${artifactsContent}

// Type-safe artifact access
export type ${moduleName}Creates = typeof ${artifactsConst}.creates[number];
export type ${moduleName}Enhances = typeof ${artifactsConst}.enhances[number];
`;
  }

  /**
   * Generate Constitutional Architecture TypeScript content for a connector
   */
  static generateConstitutionalConnectorTypeContent(moduleId: string, connectorJson: any, artifacts: ModuleArtifacts): string {
    const moduleName = this.toPascalCase(moduleId.replace(/\//g, ' '));
    const paramsInterface = `${moduleName}Params`;
    const featuresInterface = `${moduleName}Features`;
    const artifactsConst = `${moduleName}Artifacts`;
    
    // Generate Constitutional Architecture parameters interface
    const paramsContent = this.generateConstitutionalParametersInterface(connectorJson.parameters || {}, paramsInterface);
    
    // Generate Constitutional Architecture features interface
    const featuresContent = this.generateConstitutionalFeaturesInterface(connectorJson.parameters?.features || {}, featuresInterface);
    
    // Generate artifacts constant with ownership info
    const artifactsContent = this.generateIntegrationArtifactsConstant(artifacts, artifactsConst);
    
    return `/**
 * ${connectorJson.name || moduleId}
 * 
 * ${connectorJson.description || 'Auto-generated connector types with Constitutional Architecture support'}
 */

${paramsContent}

${featuresContent}

// 🚀 Auto-discovered artifacts with ownership info
${artifactsContent}

// Type-safe artifact access
export type ${moduleName}Creates = typeof ${artifactsConst}.creates[number];
export type ${moduleName}Enhances = typeof ${artifactsConst}.enhances[number];
`;
  }

  /**
   * Generate Constitutional Architecture TypeScript content for a feature
   */
  static generateConstitutionalFeatureTypeContent(moduleId: string, featureJson: any, artifacts: ModuleArtifacts): string {
    const moduleName = this.toPascalCase(moduleId.replace(/\//g, ' '));
    const paramsInterface = `${moduleName}Params`;
    const featuresInterface = `${moduleName}Features`;
    const artifactsConst = `${moduleName}Artifacts`;
    
    // Generate Constitutional Architecture parameters interface
    const paramsContent = this.generateConstitutionalParametersInterface(featureJson.parameters || {}, paramsInterface);
    
    // Generate Constitutional Architecture features interface
    const featuresContent = this.generateConstitutionalFeaturesInterface(featureJson.parameters?.features || {}, featuresInterface);
    
    // Generate artifacts constant with ownership info
    const artifactsContent = this.generateIntegrationArtifactsConstant(artifacts, artifactsConst);
    
    return `/**
 * ${featureJson.name || moduleId}
 * 
 * ${featureJson.description || 'Auto-generated feature types with Constitutional Architecture support'}
 */

${paramsContent}

${featuresContent}

// 🚀 Auto-discovered artifacts with ownership info
${artifactsContent}

// Type-safe artifact access
export type ${moduleName}Creates = typeof ${artifactsConst}.creates[number];
export type ${moduleName}Enhances = typeof ${artifactsConst}.enhances[number];
`;
  }

  /**
   * Generate Constitutional Architecture parameters interface
   */
  private static generateConstitutionalParametersInterface(parameters: any, interfaceName: string): string {
    if (!parameters || Object.keys(parameters).length === 0) {
      return `export interface ${interfaceName} {}`;
    }
    
    const properties = Object.entries(parameters).map(([key, value]: [string, any]) => {
      if (key === 'features') {
        // Handle Constitutional Architecture features structure
        return this.generateConstitutionalFeaturesProperty(value);
      }
      
      const type = this.getTypeScriptType(value);
      const optional = (value.required === false || value.default !== undefined) ? '?' : '';
      const description = value.description ? `\n  /** ${value.description} */` : '';
      // Quote property names that contain hyphens or other special characters
      const quotedKey = key.includes('-') ? `'${key}'` : key;
      return `${description}\n  ${quotedKey}${optional}: ${type};`;
    }).join('\n');
    
    return `export interface ${interfaceName} {\n${properties}\n}`;
  }

  /**
   * Generate Constitutional Architecture features property
   */
  private static generateConstitutionalFeaturesProperty(features: any): string {
    if (!features || Object.keys(features).length === 0) {
      return `  /** Constitutional Architecture features configuration */
  features?: {};`;
    }
    
    const featureProperties = Object.entries(features).map(([featureName, featureConfig]: [string, any]) => {
      const description = featureConfig.description ? `\n    /** ${featureConfig.description} */` : '';
      const type = this.getConstitutionalFeatureType(featureConfig);
      const optional = (featureConfig.required === false || featureConfig.default !== undefined) ? '?' : '';
      // Quote property names that contain hyphens or other special characters
      const quotedName = featureName.includes('-') ? `'${featureName}'` : featureName;
      return `${description}\n    ${quotedName}${optional}: ${type};`;
    }).join('\n');
    
    return `  /** Constitutional Architecture features configuration */
  features?: {
${featureProperties}
  };`;
  }

  /**
   * Generate Constitutional Architecture features interface
   */
  private static generateConstitutionalFeaturesInterface(features: any, interfaceName: string): string {
    if (!features || Object.keys(features).length === 0) {
      return `export interface ${interfaceName} {}`;
    }
    
    const properties = Object.entries(features).map(([featureName, featureConfig]: [string, any]) => {
      const description = featureConfig.description ? `\n  /** ${featureConfig.description} */` : '';
      const type = this.getConstitutionalFeatureType(featureConfig);
      // Quote property names that contain hyphens or other special characters
      const quotedName = featureName.includes('-') ? `'${featureName}'` : featureName;
      return `${description}\n  ${quotedName}: ${type};`;
    }).join('\n');
    
    return `export interface ${interfaceName} {\n${properties}\n}`;
  }

  /**
   * Get TypeScript type for Constitutional Architecture feature
   */
  private static getConstitutionalFeatureType(featureConfig: any): string {
    if (featureConfig.type === 'boolean') {
      return 'boolean';
    } else if (featureConfig.type === 'string') {
      if (featureConfig.enum && Array.isArray(featureConfig.enum)) {
        return featureConfig.enum.map((v: any) => `'${v}'`).join(' | ');
      }
      return 'string';
    } else if (featureConfig.type === 'array') {
      if (featureConfig.items && featureConfig.items.enum && Array.isArray(featureConfig.items.enum)) {
        const unionType = featureConfig.items.enum.map((v: any) => `'${v}'`).join(' | ');
        return `Array<${unionType}>`;
      }
      return 'string[]';
    } else if (featureConfig.type === 'object') {
      return 'Record<string, any>';
    }
    
    // Default to boolean for Constitutional Architecture features
    return 'boolean';
  }

  /**
   * Load Constitutional Architecture schema file
   */
  static loadConstitutionalSchema(filePath: string): any {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  /**
   * Generate artifacts constant
   */
  private static generateArtifactsConstant(artifacts: ModuleArtifacts, constName: string): string {
    const creates = this.formatFileArtifacts(artifacts.creates);
    const enhances = this.formatEnhancedFileArtifacts(artifacts.enhances);
    const installs = this.formatPackageArtifacts(artifacts.installs);
    const envVars = this.formatEnvVarArtifacts(artifacts.envVars);
    
    return `export declare const ${constName}: {
  creates: ${creates},
  enhances: ${enhances},
  installs: ${installs},
  envVars: ${envVars}
};`;
  }

  /**
   * Generate integration artifacts constant with ownership info
   */
  private static generateIntegrationArtifactsConstant(artifacts: ModuleArtifacts, constName: string): string {
    const creates = this.formatFileArtifacts(artifacts.creates);
    const enhances = this.formatEnhancedFileArtifacts(artifacts.enhances);
    const installs = this.formatPackageArtifacts(artifacts.installs);
    const envVars = this.formatEnvVarArtifacts(artifacts.envVars);
    
    return `export declare const ${constName}: {
  creates: ${creates},
  enhances: ${enhances},
  installs: ${installs},
  envVars: ${envVars}
};`;
  }

  /**
   * Format file artifacts for TypeScript
   */
  private static formatFileArtifacts(files: any[]): string {
    if (files.length === 0) return '[]';
    
    const formatted = files.map(file => `'${file.path}'`).join(',\n    ');
    return `[\n    ${formatted}\n  ]`;
  }

  /**
   * Format enhanced file artifacts with ownership info
   */
  private static formatEnhancedFileArtifacts(files: any[]): string {
    if (files.length === 0) return '[]';
    
    const formatted = files.map(file => {
      const parts = [`path: '${file.path}'`];
      if (file.owner) parts.push(`owner: '${file.owner}'`);
      if (file.description) parts.push(`description: '${file.description}'`);
      return `{ ${parts.join(', ')} }`;
    }).join(',\n    ');
    
    return `[\n    ${formatted}\n  ]`;
  }

  /**
   * Format package artifacts for TypeScript
   */
  private static formatPackageArtifacts(packages: any[]): string {
    if (packages.length === 0) return '[]';
    
    const formatted = packages.map(pkg => {
      const packagesStr = pkg.packages.map((p: string) => `'${p}'`).join(', ');
      return `{ packages: [${packagesStr}], isDev: ${pkg.isDev} }`;
    }).join(',\n    ');
    
    return `[\n    ${formatted}\n  ]`;
  }

  /**
   * Format environment variable artifacts for TypeScript
   */
  private static formatEnvVarArtifacts(envVars: any[]): string {
    if (envVars.length === 0) return '[]';
    
    const formatted = envVars.map(env => {
      const parts = [`key: '${env.key}'`, `value: '${env.value}'`];
      if (env.description) parts.push(`description: '${env.description}'`);
      return `{ ${parts.join(', ')} }`;
    }).join(',\n    ');
    
    return `[\n    ${formatted}\n  ]`;
  }

  /**
   * Get TypeScript type from parameter definition
   */
  private static getTypeScriptType(param: any): string {
    switch (param.type) {
      case 'string':
        // Check if it has enum values (options array)
        if (param.options && Array.isArray(param.options)) {
          return param.options.map((v: any) => `'${v}'`).join(' | ');
        }
        // Check if it has enum values (legacy)
        if (param.enum && Array.isArray(param.enum)) {
          return param.enum.map((v: any) => `'${v}'`).join(' | ');
        }
        return 'string';
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'array':
        // Check if it has items with enum values
        if (param.items && param.items.enum && Array.isArray(param.items.enum)) {
          const unionType = param.items.enum.map((v: any) => `'${v}'`).join(' | ');
          return `Array<${unionType}>`;
        }
        // Check if it has items with options
        if (param.items && param.items.options && Array.isArray(param.items.options)) {
          const unionType = param.items.options.map((v: any) => `'${v}'`).join(' | ');
          return `Array<${unionType}>`;
        }
        return 'string[]';
      case 'object':
        return 'Record<string, any>';
      default:
        return 'any';
    }
  }


  /**
   * Get artifacts export name for module
   */
  private static getArtifactsExportName(moduleId: string): string {
    const moduleName = this.toPascalCase(moduleId.replace(/\//g, ' '));
    return `${moduleName}Artifacts`;
  }

  /**
   * Convert string to PascalCase
   */
  private static toPascalCase(str: string): string {
    return str
      .replace(/[-\s]/g, ' ') // Replace hyphens and spaces with spaces
      .replace(/(?:^|\s)(\w)/g, (_, letter) => letter.toUpperCase()) // Convert to PascalCase
      .replace(/\s/g, ''); // Remove spaces
  }

  /**
   * Generate contract exports for features
   */
  static async generateContractExports(outputPath: string): Promise<string[]> {
    const contractExports: string[] = [];
    const featuresPath = path.join(outputPath, '..', 'features');
    
    try {
      // Find all contract.ts files in features
      const contractFiles = await this.findContractFiles(featuresPath);
      
      for (const contractFile of contractFiles) {
        const featureName = this.extractFeatureName(contractFile);
        if (featureName) {
          // Create individual contract type file
          await this.generateContractTypeFile(contractFile, featureName, outputPath);
          
          // Add export to master index
          contractExports.push(`export * from './contracts/${featureName}';`);
        }
      }
    } catch (error) {
      console.warn('⚠️ Could not generate contract exports:', error);
    }
    
    return contractExports;
  }

  /**
   * Find all contract.ts files in features directory
   */
  private static async findContractFiles(featuresPath: string): Promise<string[]> {
    const contractFiles: string[] = [];
    
    try {
      const features = await fs.promises.readdir(featuresPath);
      
      for (const feature of features) {
        const featurePath = path.join(featuresPath, feature);
        const stat = await fs.promises.stat(featurePath);
        
        if (stat.isDirectory()) {
          const contractPath = path.join(featurePath, 'contract.ts');
          try {
            await fs.promises.access(contractPath);
            contractFiles.push(contractPath);
          } catch {
            // Contract file doesn't exist, skip
          }
        }
      }
    } catch (error) {
      console.warn('⚠️ Could not scan features directory:', error);
    }
    
    return contractFiles;
  }

  /**
   * Extract feature name from contract file path
   */
  private static extractFeatureName(contractPath: string): string | null {
    const pathParts = contractPath.split(path.sep);
    const featuresIndex = pathParts.indexOf('features');
    
    if (featuresIndex === -1 || featuresIndex === pathParts.length - 2) {
      return null;
    }
    
    return pathParts[featuresIndex + 1];
  }

  /**
   * Generate contract type file
   */
  private static async generateContractTypeFile(contractPath: string, featureName: string, outputPath: string): Promise<void> {
    try {
      const contractContent = await fs.promises.readFile(contractPath, 'utf-8');
      
      // Create contracts directory
      const contractsDir = path.join(outputPath, 'contracts');
      await fs.promises.mkdir(contractsDir, { recursive: true });
      
      // Write contract type file
      const contractTypeFile = path.join(contractsDir, `${featureName}.d.ts`);
      await fs.promises.writeFile(contractTypeFile, contractContent);
    } catch (error) {
      console.warn(`⚠️ Could not generate contract type file for ${featureName}:`, error);
    }
  }

  /**
   * Generate ModuleParameters mapped type from all schema files
   */
  static async generateModuleParametersType(
    analysisResults: BlueprintAnalysisResult[], 
    marketplacePath: string
  ): Promise<string> {
    const moduleParameters: string[] = [];
    
    for (const analysis of analysisResults) {
      const moduleId = analysis.moduleId;
      const moduleType = analysis.moduleType;
      
      // Determine the schema file path based on module type
      let schemaPath: string;
      if (moduleType === 'adapter') {
        schemaPath = path.join(marketplacePath, 'adapters', moduleId, 'adapter.json');
      } else if (moduleType === 'connector') {
        // Try both connector.json and integration.json
        const connectorPath = path.join(marketplacePath, 'connectors', moduleId.replace('connectors/', ''), 'connector.json');
        const integrationPath = path.join(marketplacePath, 'connectors', moduleId.replace('connectors/', ''), 'integration.json');
        schemaPath = fs.existsSync(connectorPath) ? connectorPath : integrationPath;
      } else if (moduleType === 'feature') {
        schemaPath = path.join(marketplacePath, 'features', moduleId.replace('features/', ''), 'feature.json');
      } else {
        continue; // Skip other types for now
      }
      
      try {
        const schema = this.loadConstitutionalSchema(schemaPath);
        if (schema && schema.parameters) {
          const parameterType = this.generateModuleParameterType(moduleId, schema.parameters);
          moduleParameters.push(`  '${moduleId}': ${parameterType};`);
        }
      } catch (error) {
        console.warn(`⚠️ Could not load schema for ${moduleId}:`, error);
      }
    }
    
    return `export type ModuleParameters = {
${moduleParameters.join('\n')}
};`;
  }

  /**
   * Generate BlueprintParameter types for each module
   */
  static async generateBlueprintParameterTypes(
    analysisResults: BlueprintAnalysisResult[], 
    marketplacePath: string
  ): Promise<string> {
    const blueprintParameterTypes: string[] = [];
    
    for (const analysis of analysisResults) {
      const moduleId = analysis.moduleId;
      const moduleType = analysis.moduleType;
      
      // Determine the schema file path based on module type
      let schemaPath: string;
      if (moduleType === 'adapter') {
        schemaPath = path.join(marketplacePath, 'adapters', moduleId, 'adapter.json');
      } else if (moduleType === 'connector') {
        // Try both connector.json and integration.json
        const connectorPath = path.join(marketplacePath, 'connectors', moduleId.replace('connectors/', ''), 'connector.json');
        const integrationPath = path.join(marketplacePath, 'connectors', moduleId.replace('connectors/', ''), 'integration.json');
        schemaPath = fs.existsSync(connectorPath) ? connectorPath : integrationPath;
      } else if (moduleType === 'feature') {
        schemaPath = path.join(marketplacePath, 'features', moduleId.replace('features/', ''), 'feature.json');
      } else {
        continue; // Skip other types for now
      }
      
      try {
        const schema = this.loadConstitutionalSchema(schemaPath);
        if (schema && schema.parameters) {
          const typeName = this.getBlueprintParameterTypeName(moduleId);
          const parameterType = this.generateBlueprintParameterType(moduleId, schema.parameters);
          blueprintParameterTypes.push(`export interface ${typeName} ${parameterType}`);
        }
      } catch (error) {
        console.warn(`⚠️ Could not load schema for ${moduleId}:`, error);
      }
    }
    
    return blueprintParameterTypes.join('\n\n');
  }

  /**
   * Get the TypeScript type name for a module's blueprint parameters
   */
  private static getBlueprintParameterTypeName(moduleId: string): string {
    // Convert module ID to PascalCase type name
    // e.g., 'features/architech-welcome/shadcn' → 'ArchitechWelcomeShadcnParameters'
    const parts = moduleId.split('/');
    const typeName = parts
      .map(part => part.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''))
      .join('');
    return `${typeName}Parameters`;
  }

  /**
   * Generate TypeScript interface for blueprint parameters
   */
  private static generateBlueprintParameterType(moduleId: string, parameters: any): string {
    const properties: string[] = [];
    
    // Handle features object
    if (parameters.features) {
      properties.push('  features: {');
      for (const [featureName, featureConfig] of Object.entries(parameters.features)) {
        if (typeof featureConfig === 'object' && featureConfig !== null) {
          const config = featureConfig as any;
          const type = config.type || 'boolean';
          const required = config.required !== false ? '' : '?';
          // Quote property names that contain hyphens or other special characters
          const quotedName = featureName.includes('-') ? `'${featureName}'` : featureName;
          properties.push(`    ${quotedName}${required}: ${type};`);
        }
      }
      properties.push('  };');
    }
    
    // Handle other parameters
    for (const [paramName, paramConfig] of Object.entries(parameters)) {
      if (paramName === 'features') continue; // Already handled above
      
      if (typeof paramConfig === 'object' && paramConfig !== null) {
        const config = paramConfig as any;
        const type = this.getTypeScriptType(config);
        const required = config.required !== false ? '' : '?';
        // Quote property names that contain hyphens or other special characters
        const quotedName = paramName.includes('-') ? `'${paramName}'` : paramName;
        properties.push(`  ${quotedName}${required}: ${type};`);
      }
    }
    
    return `{\n${properties.join('\n')}\n}`;
  }


  /**
   * Generate discriminated union types for better IDE support
   */
  static async generateDiscriminatedUnionTypes(
    analysisResults: BlueprintAnalysisResult[], 
    marketplacePath: string
  ): Promise<string> {
    const moduleTypes: string[] = [];
    
    for (const analysis of analysisResults) {
      const moduleId = analysis.moduleId;
      const moduleType = analysis.moduleType;
      
      // Determine the schema file path based on module type
      let schemaPath: string;
      if (moduleType === 'adapter') {
        schemaPath = path.join(marketplacePath, 'adapters', moduleId, 'adapter.json');
      } else if (moduleType === 'connector') {
        // Try both connector.json and integration.json
        const connectorPath = path.join(marketplacePath, 'connectors', moduleId.replace('connectors/', ''), 'connector.json');
        const integrationPath = path.join(marketplacePath, 'connectors', moduleId.replace('connectors/', ''), 'integration.json');
        schemaPath = fs.existsSync(connectorPath) ? connectorPath : integrationPath;
      } else if (moduleType === 'feature') {
        schemaPath = path.join(marketplacePath, 'features', moduleId.replace('features/', ''), 'feature.json');
      } else {
        continue; // Skip other types for now
      }
      
      try {
        const schema = this.loadConstitutionalSchema(schemaPath);
        if (schema && schema.parameters) {
          const parameterType = this.generateModuleParameterType(moduleId, schema.parameters);
          moduleTypes.push(`  | { id: '${moduleId}'; parameters?: ${parameterType}; }`);
        }
      } catch (error) {
        console.warn(`⚠️ Could not load schema for ${moduleId}:`, error);
      }
    }
    
    console.log(`🔍 Generated ${moduleTypes.length} discriminated union types`);
    
    return `export type TypedGenomeModule = 
${moduleTypes.join('\n')};`;
  }

  /**
   * Generate parameter type for a specific module
   */
  private static generateModuleParameterType(moduleId: string, parameters: any): string {
    if (!parameters || Object.keys(parameters).length === 0) {
      return '{}';
    }
    
    const properties = Object.entries(parameters).map(([key, value]: [string, any]) => {
      if (key === 'features') {
        // Handle Constitutional Architecture features structure
        return this.generateConstitutionalFeaturesProperty(value);
      }
      
      const type = this.getTypeScriptType(value);
      const optional = (value.required === false || value.default !== undefined) ? '?' : '';
      const description = value.description ? `\n  /** ${value.description} */` : '';
      // Quote property names that contain hyphens or other special characters
      const quotedKey = key.includes('-') ? `'${key}'` : key;
      return `${description}\n  ${quotedKey}${optional}: ${type};`;
    }).join('\n');
    
    return `{\n${properties}\n  }`;
  }

  /**
   * Generate runtime JavaScript files for type modules
   * 
   * This ensures that type modules can be imported at runtime (by tsx/Node.js)
   * even though they primarily contain type definitions.
   */
  static async generateRuntimeFiles(outputPath: string): Promise<void> {
    console.log('📝 Generating runtime companion files...');
    
    // 1. genome-types.js - Runtime companion for genome-types.d.ts
    const genomeTypesJs = `/**
 * Genome Types - Runtime Exports
 * 
 * This file provides runtime companion for genome-types.d.ts
 * The types (ModuleId, ModuleParameters, TypedGenomeModule, TypedGenome) are type-only
 * and don't have runtime values.
 */

// This file is required for ESM module resolution but exports nothing at runtime
// All exports in genome-types.d.ts are type-only
export {};
`;
    
    await fs.promises.writeFile(
      path.join(outputPath, 'genome-types.js'),
      genomeTypesJs
    );
    
    // 2. blueprint-config-types.d.ts - Type declarations
    const blueprintConfigTypesDts = `/**
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
`;
    
    await fs.promises.writeFile(
      path.join(outputPath, 'blueprint-config-types.d.ts'),
      blueprintConfigTypesDts
    );
    
    // 3. blueprint-config-types.js - Runtime implementation
    const blueprintConfigTypesJs = `/**
 * Blueprint Configuration Types - Runtime Implementation
 */

export function extractTypedModuleParameters(config) {
  return {
    params: config.parameters || {},
    features: config.features || {},
    framework: config.framework,
    paths: config.paths || {},
  };
}
`;
    
    await fs.promises.writeFile(
      path.join(outputPath, 'blueprint-config-types.js'),
      blueprintConfigTypesJs
    );
    
    // 4. capability-types.js - Runtime companion for capability-types.ts
    // TypeScript will use .d.ts for types, Node.js will use .js for runtime
    const capabilityTypesJs = `/**
 * Capability Types - Runtime Exports
 * 
 * This file provides runtime companion for capability-types.ts
 * The defineCapabilityGenome function is exported here for runtime use.
 */

export function defineCapabilityGenome(genome) {
  return genome;
}
`;
    
    await fs.promises.writeFile(
      path.join(outputPath, 'capability-types.js'),
      capabilityTypesJs
    );
    
    // 5. index.ts - Entry point (will compile to index.js)
    const indexTs = `/**
 * The Architech Marketplace Types - Runtime Entry Point
 * 
 * This file serves as the main entry point for importing marketplace types.
 * It re-exports from all type modules.
 */

// Re-export genome types (includes ModuleId, ModuleParameters, Genome, TypedGenomeModule, TypedGenome)
export * from './genome-types.js';

// Re-export defineGenome function
export * from './define-genome.js';

// Re-export capability types
export * from './capability-types.js';

// Re-export blueprint configuration utilities
export type { TypedMergedConfiguration } from './blueprint-config-types.js';
export { extractTypedModuleParameters } from './blueprint-config-types.js';
`;
    
    await fs.promises.writeFile(
      path.join(outputPath, 'index.ts'),
      indexTs
    );
    
    console.log('✅ Generated runtime files: genome-types.js, blueprint-config-types.d.ts, blueprint-config-types.js, capability-types.js, index.ts');
  }
}
