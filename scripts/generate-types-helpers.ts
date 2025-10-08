/**
 * Helper functions for Smart Type Generator
 */

import * as fs from 'fs';
import * as path from 'path';
import { BlueprintAnalysisResult, ModuleArtifacts } from '@thearchitech.xyz/marketplace/types';

export class TypeGeneratorHelpers {
  /**
   * Generate master index file
   */
  static async generateMasterIndex(analysisResults: BlueprintAnalysisResult[], outputPath: string): Promise<void> {
    const exports: string[] = [];
    const artifactExports: string[] = [];
    const contractExports: string[] = [];
    
    // Generate exports for all modules
    for (const analysis of analysisResults) {
      const moduleId = analysis.moduleId;
      const moduleType = analysis.moduleType;
      
      // Build the correct path based on module type and moduleId
      let modulePath: string;
      if (moduleType === 'adapter') {
        modulePath = `adapters/${moduleId}`;
      } else if (moduleType === 'connector') {
        modulePath = `connectors/${moduleId}`;
      } else if (moduleType === 'feature') {
        modulePath = `features/${moduleId}`;
      } else {
        // For integrations, use the moduleId as-is
        modulePath = moduleId;
      }
      
      exports.push(`export * from './${modulePath}';`);
      artifactExports.push(`  '${moduleId}': (): Promise<ModuleArtifacts> => import('./${modulePath}').then(m => m.${this.getArtifactsExportName(moduleId)}),`);
    }
    
    // Generate contract exports for features
    const contractExportsResult = await this.generateContractExports(outputPath);
    contractExports.push(...contractExportsResult);
    
    const tsContent = `/**
 * The Architech Marketplace Types
 * 
 * Auto-generated TypeScript definitions with artifact discovery
 */

// Import base types from the types package
import { Module, ProjectConfig, ModuleArtifacts as ModuleArtifactsType } from '@thearchitech.xyz/marketplace/types';

${exports.join('\n')}

// 🎯 Cohesive Contract Exports
${contractExports.join('\n')}

// 🚀 Auto-discovered module artifacts
export declare const ModuleArtifacts: {
  [key: string]: () => Promise<ModuleArtifactsType>;
};

export type ModuleId = keyof typeof ModuleArtifacts;

// Re-export base types for convenience
export { Module, ProjectConfig } from '@thearchitech.xyz/marketplace/types';

// Re-export Genome type from shared types package
export { Genome } from '@thearchitech.xyz/marketplace/types';
`;

    const outputFile = path.join(outputPath, 'index.d.ts');
    await fs.promises.writeFile(outputFile, tsContent);
    
    console.log('📝 Generated master index');
  }

  /**
   * Generate TypeScript content for an adapter
   */
  static generateAdapterTypeContent(moduleId: string, adapterJson: any, artifacts: ModuleArtifacts): string {
    const moduleName = this.toPascalCase(moduleId.replace(/\//g, ' '));
    const paramsInterface = `${moduleName}Params`;
    const featuresInterface = `${moduleName}Features`;
    const artifactsConst = `${moduleName}Artifacts`;
    
    // Generate parameters interface
    const paramsContent = this.generateParametersInterface(adapterJson.parameters || {}, paramsInterface);
    
    // Generate features interface
    const featuresContent = this.generateFeaturesInterface(adapterJson.sub_features || {}, featuresInterface);
    
    // Generate artifacts constant
    const artifactsContent = this.generateArtifactsConstant(artifacts, artifactsConst);
    
    return `/**
 * ${adapterJson.name || moduleId}
 * 
 * ${adapterJson.description || 'Auto-generated adapter types'}
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
   * Generate TypeScript content for an integration
   */
  static generateIntegrationTypeContent(moduleId: string, integrationJson: any, artifacts: ModuleArtifacts): string {
    const moduleName = this.toPascalCase(moduleId.replace(/\//g, ' '));
    const paramsInterface = `${moduleName}Params`;
    const artifactsConst = `${moduleName}Artifacts`;
    
    // Generate parameters interface
    const paramsContent = this.generateParametersInterface(integrationJson.sub_features || {}, paramsInterface);
    
    // Generate artifacts constant with ownership info
    const artifactsContent = this.generateIntegrationArtifactsConstant(artifacts, artifactsConst);
    
    return `/**
 * ${integrationJson.name || moduleId}
 * 
 * ${integrationJson.description || 'Auto-generated integration types'}
 */

${paramsContent}

// 🚀 Auto-discovered artifacts with ownership info
${artifactsContent}

// Type-safe artifact access
export type ${moduleName}Creates = typeof ${artifactsConst}.creates[number];
export type ${moduleName}Enhances = typeof ${artifactsConst}.enhances[number];
`;
  }

  /**
   * Generate parameters interface
   */
  private static generateParametersInterface(parameters: any, interfaceName: string): string {
    if (!parameters || Object.keys(parameters).length === 0) {
      return `export interface ${interfaceName} {}`;
    }
    
    const properties = Object.entries(parameters).map(([key, value]: [string, any]) => {
      const type = this.getTypeScriptType(value);
      const optional = value.required === false ? '?' : '';
      const description = value.description ? `\n  /** ${value.description} */` : '';
      return `${description}\n  ${key}${optional}: ${type};`;
    }).join('\n');
    
    return `export interface ${interfaceName} {\n${properties}\n}`;
  }

  /**
   * Generate features interface
   */
  private static generateFeaturesInterface(features: any, interfaceName: string): string {
    if (!features || Object.keys(features).length === 0) {
      return `export interface ${interfaceName} {}`;
    }
    
    const properties = Object.entries(features).map(([key, value]: [string, any]) => {
      const type = this.getTypeScriptType(value);
      const optional = value.required === false ? '?' : '';
      const description = value.description ? `\n  /** ${value.description} */` : '';
      return `${description}\n  ${key}${optional}: ${type};`;
    }).join('\n');
    
    return `export interface ${interfaceName} {\n${properties}\n}`;
  }

  /**
   * Generate artifacts constant
   */
  private static generateArtifactsConstant(artifacts: ModuleArtifacts, constName: string): string {
    const creates = this.formatFileArtifacts(artifacts.creates);
    const enhances = this.formatFileArtifacts(artifacts.enhances);
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
        // Check if it has enum values
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
   * Load adapter.json file
   */
  static loadAdapterJson(filePath: string): any {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  /**
   * Load integration.json file
   */
  static loadIntegrationJson(filePath: string): any {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return {};
    }
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
    const match = contractPath.match(/features\/([^\/]+)\/contract\.ts$/);
    return match ? match[1] : null;
  }

  /**
   * Generate individual contract type file
   */
  private static async generateContractTypeFile(contractPath: string, featureName: string, outputPath: string): Promise<void> {
    try {
      // Read the contract file
      const contractContent = await fs.promises.readFile(contractPath, 'utf-8');
      
      // Create contracts directory
      const contractsDir = path.join(outputPath, 'contracts');
      await fs.promises.mkdir(contractsDir, { recursive: true });
      
      // Generate the contract type file
      const contractTypeContent = this.generateContractTypeContent(contractContent, featureName);
      
      // Write the file
      const outputFile = path.join(contractsDir, `${featureName}.d.ts`);
      await fs.promises.writeFile(outputFile, contractTypeContent);
      
      console.log(`📝 Generated contract types for: ${featureName}`);
    } catch (error) {
      console.warn(`⚠️ Could not generate contract types for ${featureName}:`, error);
    }
  }

  /**
   * Generate contract type content
   */
  private static generateContractTypeContent(contractContent: string, featureName: string): string {
    // Extract all exported interfaces and types from the contract
    const lines = contractContent.split('\n');
    const exports: string[] = [];
    
    // Add header
    exports.push(`/**
 * ${featureName} Contract Types
 * 
 * Auto-generated from contract.ts
 */`);
    
    // Add all non-import lines that contain exports
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Skip imports and comments
      if (trimmed.startsWith('import ') || 
          trimmed.startsWith('//') || 
          trimmed.startsWith('/*') ||
          trimmed === '' ||
          trimmed.startsWith('*')) {
        continue;
      }
      
      // Include all other lines (interfaces, types, etc.)
      exports.push(line);
    }
    
    return exports.join('\n');
  }
}
