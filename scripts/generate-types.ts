/**
 * Type Generator for The Architech Marketplace
 * 
 * Generates TypeScript type definitions from adapter.json files.
 * This creates a type-safe development experience for genome authors.
 */

import { promises as fs } from 'fs';
import * as path from 'path';
import * as glob from 'glob';

// Configuration
const OUTPUT_DIR = path.resolve('./types');
const ADAPTERS_GLOB = 'adapters/**/adapter.json';
const INTEGRATIONS_GLOB = 'integrations/**/integration.json';

// Ensure output directories exist
async function ensureDirectoryExists(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    // Directory already exists or can't be created
    console.error(`Failed to create directory ${dirPath}:`, error);
  }
}

// High-fidelity JSON schema to TypeScript type converter
function jsonSchemaTypeToTypeScript(param: any, indent: string = ''): string {
  // Handle null/undefined
  if (!param || typeof param !== 'object') {
    return 'any';
  }

  // Handle direct enum values (not wrapped in type)
  if (Array.isArray(param)) {
    return param.map((v: any) => `'${v}'`).join(' | ');
  }

  // Handle default values that are arrays
  if (param.default && Array.isArray(param.default)) {
    return `Array<'${param.default.join("' | '")}'>`;
  }

  switch (param.type) {
    case 'string':
      if (param.enum) {
        return param.enum.map((v: string) => `'${v}'`).join(' | ');
      }
      return 'string';
    
    case 'boolean':
      return 'boolean';
    
    case 'number':
    case 'integer':
      return 'number';
    
    case 'array':
      if (param.items) {
        if (param.items.enum) {
          // Array of specific enum values
          return `Array<${param.items.enum.map((v: string) => `'${v}'`).join(' | ')}>`;
        } else if (param.items.type) {
          // Array of specific type
          return `Array<${jsonSchemaTypeToTypeScript(param.items, indent + '  ')}>`;
        } else if (Array.isArray(param.items)) {
          // Array with specific items
          return `Array<${param.items.map((item: any) => jsonSchemaTypeToTypeScript(item, indent + '  ')).join(' | ')}>`;
        }
      }
      // Check if default is an array with specific values
      if (param.default && Array.isArray(param.default)) {
        return `Array<'${param.default.join("' | '")}'>`;
      }
      return `Array<${jsonSchemaTypeToTypeScript(param.items || { type: 'any' }, indent + '  ')}>`;
    
    case 'object':
      if (param.properties) {
        let result = '{\n';
        for (const [key, prop] of Object.entries(param.properties)) {
          const isRequired = param.required?.includes(key) ?? false;
          const optional = isRequired ? '' : '?';
          // Quote property names that contain hyphens or other special characters
          const quotedKey = key.includes('-') || key.includes(' ') ? `'${key}'` : key;
          result += `${indent}  ${quotedKey}${optional}: ${jsonSchemaTypeToTypeScript(prop, indent + '  ')};\n`;
        }
        result += `${indent}}`;
        return result;
      }
      return 'Record<string, any>';
    
    default:
      // Handle cases where type is not specified but we have other clues
      if (param.enum) {
        return param.enum.map((v: string) => `'${v}'`).join(' | ');
      }
      if (param.default !== undefined) {
        if (typeof param.default === 'string') {
          return `'${param.default}'`;
        }
        if (typeof param.default === 'boolean') {
          return 'boolean';
        }
        if (typeof param.default === 'number') {
          return 'number';
        }
        if (Array.isArray(param.default)) {
          return `Array<'${param.default.join("' | '")}'>`;
        }
      }
      return 'any';
  }
}

// Generate JSDoc comment for a parameter
function generateJSDoc(param: any, indent: string = ''): string {
  if (!param.description) return '';
  
  const lines = param.description.split('\n');
  let result = `${indent}/**\n`;
  for (const line of lines) {
    result += `${indent} * ${line.trim()}\n`;
  }
  result += `${indent} */\n`;
  return result;
}

// Process an adapter.json file and generate types
async function processAdapterFile(adapterPath: string): Promise<any> {
  try {
    // Read adapter.json
    const content = await fs.readFile(adapterPath, 'utf-8');
    const adapter = JSON.parse(content);
    
    // Extract module ID and create type name
    const pathParts = adapterPath.split('/');
    const category = pathParts[0]; // 'adapters' or 'integrations'
    
    let moduleType, moduleName, typeName, moduleId;
    
    if (category === 'integrations') {
      // For integrations: integrations/web3-shadcn-integration/integration.json
      moduleType = 'integration';
      moduleName = pathParts[1]; // e.g., 'web3-shadcn-integration'
      const pascalModuleName = capitalize(moduleName.replace(/-/g, '_'));
      typeName = `${pascalModuleName}Integration`;
      moduleId = moduleName;
    } else {
      // For adapters: adapters/ui/shadcn-ui/adapter.json
      moduleType = pathParts[1]; // e.g., 'ui', 'database'
      moduleName = pathParts[2]; // e.g., 'shadcn-ui', 'drizzle'
      const pascalModuleName = capitalize(moduleName.replace(/-/g, '_'));
      const pascalModuleType = capitalize(moduleType);
      typeName = `${pascalModuleName}${pascalModuleType}`;
      moduleId = `${moduleType}/${moduleName}`;
    }
    
    // Create output directory
    let outputDir;
    if (category === 'integrations') {
      outputDir = path.join(OUTPUT_DIR, 'integrations', moduleName);
    } else {
      outputDir = path.join(OUTPUT_DIR, category, moduleType, moduleName);
    }
    await ensureDirectoryExists(outputDir);
    
    // Generate parameter types
    let typeContent = `/**
     * Generated TypeScript definitions for ${adapter.name || moduleName}
     * Generated from: ${adapterPath}
     */

`;
    
    // Generate parameter interface
    typeContent += `/**
     * Parameters for the ${adapter.name || moduleName} ${category === 'adapters' ? 'adapter' : 'integration'}
     */
export interface ${typeName}Params {\n`;
    
    // Handle different parameter structures for adapters vs integrations
    const parameters = adapter.parameters || adapter.sub_features || {};
    
    if (parameters && Object.keys(parameters).length > 0) {
      for (const [key, param] of Object.entries(parameters)) {
        const paramType = jsonSchemaTypeToTypeScript(param);
        const required = param.required ? '' : '?';
        
        // Generate JSDoc comment
        const jsdoc = generateJSDoc(param, '  ');
        typeContent += jsdoc;
        
        // Quote property names that contain hyphens or other special characters
        const quotedKey = key.includes('-') || key.includes(' ') ? `'${key}'` : key;
        typeContent += `  ${quotedKey}${required}: ${paramType};\n`;
      }
    }
    
    typeContent += `}\n\n`;
    
    // Generate features interface
    typeContent += `/**
     * Features for the ${adapter.name || moduleName} ${category === 'adapters' ? 'adapter' : 'integration'}
     */
export interface ${typeName}Features {\n`;
    
    // Handle different feature structures for adapters vs integrations
    const features = adapter.features || adapter.sub_features || {};
    
    if (features && Object.keys(features).length > 0) {
      for (const [key, feature] of Object.entries(features)) {
        // Generate JSDoc comment
        const jsdoc = generateJSDoc(feature, '  ');
        typeContent += jsdoc;
        
        // Quote property names that contain hyphens or other special characters
        const quotedKey = key.includes('-') || key.includes(' ') ? `'${key}'` : key;
        typeContent += `  ${quotedKey}?: boolean;\n`;
      }
    }
    
    typeContent += `}\n`;
    
    // Write the file
    await fs.writeFile(path.join(outputDir, 'index.d.ts'), typeContent);
    console.log(`✅ Generated types for ${moduleId}`);
    
    return {
      moduleId,
      typeName,
      category,
      moduleType,
      moduleName,
      outputPath: path.join(outputDir, 'index.d.ts')
    };
  } catch (error) {
    console.error(`❌ Failed to process ${adapterPath}:`, error);
    return null;
  }
}

// Generate the main index.d.ts file with the discriminated union
async function generateIndexFile(modules: any[]): Promise<void> {
  let content = `/**
 * Generated TypeScript definitions for The Architech Marketplace
 * This file provides a type-safe interface for working with genomes
 */

`;
  
  // Import all module types
  for (const module of modules) {
    if (!module) continue;
    
    const { category, moduleType, moduleName, typeName } = module;
    content += `import { ${typeName}Params, ${typeName}Features } from './${category}/${moduleType}/${moduleName}';\n`;
  }
  
  content += `\n`;
  
  // Generate discriminated union
  content += `/**
 * Module configuration type
 */
export type ModuleConfig =\n`;
  
  for (let i = 0; i < modules.length; i++) {
    if (!modules[i]) continue;
    
    const { moduleId, typeName } = modules[i];
    content += `  | { id: '${moduleId}'; parameters?: ${typeName}Params; features?: ${typeName}Features }${i < modules.length - 1 ? '\n' : ';\n\n'}`;
  }
  
  // Generate Genome type
  content += `/**
 * Genome type for The Architech
 */
export interface Genome {
  version: string;
  project: {
    name: string;
    description?: string;
    version?: string;
    framework: string;
    path?: string;
  };
  modules: ModuleConfig[];
}

/**
 * Extract parameters for a specific module
 */
export type ParamsFor<T extends ModuleConfig['id']> = 
  Extract<ModuleConfig, { id: T }>['parameters'];

/**
 * Extract features for a specific module
 */
export type FeaturesFor<T extends ModuleConfig['id']> = 
  Extract<ModuleConfig, { id: T }>['features'];
`;
  
  // Write the file
  await fs.writeFile(path.join(OUTPUT_DIR, 'index.d.ts'), content);
  console.log(`✅ Generated index file with ${modules.filter(Boolean).length} modules`);
}

// Utility function to capitalize a string
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Main function to generate all types
async function generateTypes(): Promise<void> {
  console.log('🔍 Generating TypeScript types from adapter schemas...');
  
  // Ensure output directory exists
  await ensureDirectoryExists(OUTPUT_DIR);
  
  // Find all adapter.json files
  const adapterFiles = glob.sync(ADAPTERS_GLOB);
  const integrationFiles = glob.sync(INTEGRATIONS_GLOB);
  
  console.log(`📦 Found ${adapterFiles.length} adapters and ${integrationFiles.length} integrations`);
  console.log(`🔍 Adapter files:`, adapterFiles.slice(0, 3));
  console.log(`🔍 Integration files:`, integrationFiles.slice(0, 3));
  
  // Process each adapter and integration
  const moduleResults = [];
  
  for (const adapterFile of adapterFiles) {
    const result = await processAdapterFile(adapterFile);
    if (result) moduleResults.push(result);
  }
  
  for (const integrationFile of integrationFiles) {
    const result = await processAdapterFile(integrationFile);
    if (result) moduleResults.push(result);
  }
  
  // Generate the main index file
  await generateIndexFile(moduleResults);
  
  console.log(`✅ TypeScript types generated in ${OUTPUT_DIR}`);
  console.log(`📊 Summary:`);
  console.log(`   - Adapters: ${adapterFiles.length}`);
  console.log(`   - Integrations: ${integrationFiles.length}`);
  console.log(`   - Total modules with types: ${moduleResults.length}`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateTypes().catch(console.error);
}

export { generateTypes };

