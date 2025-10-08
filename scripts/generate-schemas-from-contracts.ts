#!/usr/bin/env tsx

/**
 * Contract-to-Schema Generator
 * 
 * This script implements the "Active Contracts, Generated Schemas" architecture:
 * 1. Reads TypeScript contract.ts files from features
 * 2. Extracts hook signatures and type definitions using AST analysis
 * 3. Auto-generates and injects contract definitions into backend schema.json files
 * 4. Ensures consistency between TypeScript contracts and JSON schemas
 */

import { Project, SourceFile, InterfaceDeclaration, TypeAliasDeclaration, SyntaxKind } from 'ts-morph';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { glob } from 'glob';

interface ContractHook {
  name: string;
  parameters: string[];
  returnType: string;
  isAsync: boolean;
  isMutation: boolean;
  isQuery: boolean;
}

interface ContractType {
  name: string;
  definition: string;
  isEnum: boolean;
  isInterface: boolean;
  isTypeAlias: boolean;
}

interface ContractDefinition {
  hooks: ContractHook[];
  types: ContractType[];
  interfaces: ContractType[];
}

interface SchemaContract {
  hooks: {
    [hookName: string]: {
      parameters: string[];
      returnType: string;
      isAsync: boolean;
      isMutation: boolean;
      isQuery: boolean;
    };
  };
  types: {
    [typeName: string]: {
      definition: string;
      isEnum: boolean;
      isInterface: boolean;
      isTypeAlias: boolean;
    };
  };
}

class ContractToSchemaGenerator {
  private project: Project;
  private marketplaceRoot: string;

  constructor(marketplaceRoot: string) {
    this.marketplaceRoot = marketplaceRoot;
    this.project = new Project({
      tsConfigFilePath: join(marketplaceRoot, 'tsconfig.json'),
    });
  }

  public async generateAllSchemas(): Promise<void> {
    console.log('🚀 Contract-to-Schema Generator');
    console.log('================================\n');

    // Find all contract.ts files
    const contractFiles = await glob('features/*/contract.ts', { cwd: this.marketplaceRoot });
    
    console.log(`📁 Found ${contractFiles.length} contract files:`);
    for (const contractFile of contractFiles) {
      console.log(`  - ${contractFile}`);
    }
    console.log('');

    for (const contractFile of contractFiles) {
      await this.processContractFile(contractFile);
    }

    console.log('\n✅ Schema generation complete!');
  }

  private async processContractFile(contractPath: string): Promise<void> {
    const fullPath = join(this.marketplaceRoot, contractPath);
    const featureName = basename(dirname(contractPath));
    
    console.log(`🔍 Processing contract: ${featureName}`);
    console.log(`   📄 File: ${contractPath}`);

    try {
      // Parse the contract.ts file
      const contractDefinition = await this.parseContractFile(fullPath);
      
      if (!contractDefinition) {
        console.log(`   ⚠️ No contract definition found in ${contractPath}`);
        return;
      }

      console.log(`   📋 Extracted: ${contractDefinition.hooks.length} hooks, ${contractDefinition.types.length} types, ${contractDefinition.interfaces.length} interfaces`);

      // Find backend implementations for this feature
      const backendImplementations = await this.findBackendImplementations(featureName);
      
      console.log(`   🏗️ Found ${backendImplementations.length} backend implementations:`);
      for (const impl of backendImplementations) {
        console.log(`     - ${impl}`);
      }

      // Update each backend implementation's schema.json
      for (const backendPath of backendImplementations) {
        await this.updateBackendSchema(backendPath, contractDefinition);
      }

    } catch (error) {
      console.error(`   ❌ Error processing ${contractPath}:`, error);
    }
  }

  private async parseContractFile(filePath: string): Promise<ContractDefinition | null> {
    if (!existsSync(filePath)) {
      return null;
    }

    const sourceFile = this.project.addSourceFileAtPath(filePath);
    
    const hooks: ContractHook[] = [];
    const types: ContractType[] = [];
    const interfaces: ContractType[] = [];

    // Find service interfaces (e.g., IPaymentService, PaymentHooksContract)
    const serviceInterfaces = sourceFile.getInterfaces().filter(interfaceDecl => 
      interfaceDecl.getName().endsWith('HooksContract') || interfaceDecl.getName().startsWith('I') && interfaceDecl.getName().endsWith('Service')
    );

    for (const interfaceDecl of serviceInterfaces) {
      console.log(`   🔍 Found hook interface: ${interfaceDecl.getName()}`);
      
      // Extract hooks from interface properties
      for (const property of interfaceDecl.getProperties()) {
        const hook = this.extractHookFromProperty(property);
        if (hook) {
          hooks.push(hook);
          console.log(`     📌 Hook: ${hook.name}`);
        }
      }
    }

    // Find type aliases
    const typeAliases = sourceFile.getTypeAliases();
    for (const typeAlias of typeAliases) {
      const type = this.extractTypeFromAlias(typeAlias);
      if (type) {
        types.push(type);
        console.log(`     📌 Type: ${type.name}`);
      }
    }

    // Find interfaces (data interfaces)
    const dataInterfaces = sourceFile.getInterfaces().filter(interfaceDecl => 
      !interfaceDecl.getName().endsWith('HooksContract')
    );

    for (const interfaceDecl of dataInterfaces) {
      const interfaceType = this.extractTypeFromInterface(interfaceDecl);
      if (interfaceType) {
        interfaces.push(interfaceType);
        console.log(`     📌 Interface: ${interfaceType.name}`);
      }
    }

    return {
      hooks,
      types,
      interfaces
    };
  }

  private extractHookFromProperty(property: any): ContractHook | null {
    const name = property.getName();
    const typeNode = property.getTypeNode();
    
    if (!typeNode) return null;

    const typeText = typeNode.getText();
    
    // Parse function type: () => UseQueryResult<Type, Error>
    const isAsync = typeText.includes('Promise') || typeText.includes('UseQueryResult') || typeText.includes('UseMutationResult');
    const isMutation = typeText.includes('UseMutationResult');
    const isQuery = typeText.includes('UseQueryResult');

    // Extract parameters and return type
    const parameters: string[] = [];
    let returnType = 'unknown';

    if (typeText.includes('=>')) {
      const parts = typeText.split('=>');
      if (parts.length === 2) {
        const paramPart = parts[0].trim();
        returnType = parts[1].trim();

        // Extract parameters from function signature
        if (paramPart.includes('(') && paramPart.includes(')')) {
          const paramContent = paramPart.substring(paramPart.indexOf('(') + 1, paramPart.lastIndexOf(')'));
          if (paramContent.trim()) {
            parameters.push(paramContent.trim());
          }
        }
      }
    }

    return {
      name,
      parameters,
      returnType,
      isAsync,
      isMutation,
      isQuery
    };
  }

  private extractTypeFromAlias(typeAlias: TypeAliasDeclaration): ContractType | null {
    const name = typeAlias.getName();
    const definition = typeAlias.getTypeNode()?.getText() || '';

    return {
      name,
      definition,
      isEnum: false,
      isInterface: false,
      isTypeAlias: true
    };
  }

  private extractTypeFromInterface(interfaceDecl: InterfaceDeclaration): ContractType | null {
    const name = interfaceDecl.getName();
    const definition = interfaceDecl.getText();

    return {
      name,
      definition,
      isEnum: false,
      isInterface: true,
      isTypeAlias: false
    };
  }

  private async findBackendImplementations(featureName: string): Promise<string[]> {
    const pattern = `features/${featureName}/backend/*/capability.json`;
    const schemaFiles = await glob(pattern, { cwd: this.marketplaceRoot });
    
    return schemaFiles.map(file => dirname(file));
  }

  private async updateBackendSchema(backendPath: string, contractDefinition: ContractDefinition): Promise<void> {
    const schemaPath = join(this.marketplaceRoot, backendPath, 'capability.json');
    
    if (!existsSync(schemaPath)) {
      console.log(`     ⚠️ Capability file not found: ${schemaPath}`);
      return;
    }

    try {
      // Read existing schema
      const schemaContent = readFileSync(schemaPath, 'utf8');
      const schema = JSON.parse(schemaContent);

      // Convert contract definition to schema format
      const contractSchema: SchemaContract = {
        hooks: {},
        types: {}
      };

      // Add hooks
      for (const hook of contractDefinition.hooks) {
        contractSchema.hooks[hook.name] = {
          parameters: hook.parameters,
          returnType: hook.returnType,
          isAsync: hook.isAsync,
          isMutation: hook.isMutation,
          isQuery: hook.isQuery
        };
      }

      // Add types and interfaces
      const allTypes = [...contractDefinition.types, ...contractDefinition.interfaces];
      for (const type of allTypes) {
        contractSchema.types[type.name] = {
          definition: type.definition,
          isEnum: type.isEnum,
          isInterface: type.isInterface,
          isTypeAlias: type.isTypeAlias
        };
      }

      // Inject contract into schema
      schema.contract = contractSchema;

      // Write updated schema
      writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
      console.log(`     ✅ Updated capability schema: ${backendPath}/capability.json`);

    } catch (error) {
      console.error(`     ❌ Error updating schema ${schemaPath}:`, error);
    }
  }
}

async function main() {
  const generator = new ContractToSchemaGenerator(process.cwd());
  await generator.generateAllSchemas();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
