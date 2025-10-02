#!/usr/bin/env tsx

/**
 * Blueprint Validator Script V2
 * 
 * Enhanced version that uses TypeScript compiler API to properly parse blueprints
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import * as ts from 'typescript';

interface ValidationError {
  blueprintPath: string;
  blueprintId: string;
  actionIndex: number;
  actionType: string;
  error: string;
  details: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  summary: {
    totalBlueprints: number;
    validBlueprints: number;
    invalidBlueprints: number;
    totalErrors: number;
  };
}

interface ParsedBlueprint {
  id: string;
  name: string;
  actions: Array<{
    type: string;
    template?: string;
    modifier?: string;
    path?: string;
  }>;
}

class BlueprintValidator {
  private errors: ValidationError[] = [];
  private availableModifiers: Set<string> = new Set();

  constructor() {
    this.loadAvailableModifiers();
  }

  /**
   * Load available modifiers
   */
  private loadAvailableModifiers(): void {
    const knownModifiers = [
      'js-config-merger',
      'ts-module-enhancer', 
      'json-merger',
      'jsx-children-wrapper',
      'ts-interface-merger',
      'ts-import-merger',
      'css-class-merger',
      'html-attribute-merger',
      'yaml-merger',
      'env-merger',
      'dockerfile-merger',
      'readme-merger'
    ];
    knownModifiers.forEach(modifier => this.availableModifiers.add(modifier));
  }

  /**
   * Find all blueprint files
   */
  private findBlueprintFiles(): string[] {
    const blueprintFiles: string[] = [];
    const marketplaceRoot = resolve(__dirname, '..');
    
    // Search in adapters directory
    const adaptersDir = join(marketplaceRoot, 'adapters');
    if (existsSync(adaptersDir)) {
      this.scanDirectoryForBlueprints(adaptersDir, blueprintFiles);
    }
    
    // Search in integrations directory
    const integrationsDir = join(marketplaceRoot, 'integrations');
    if (existsSync(integrationsDir)) {
      this.scanDirectoryForBlueprints(integrationsDir, blueprintFiles);
    }
    
    return blueprintFiles;
  }

  /**
   * Recursively scan directory for blueprint.ts files
   */
  private scanDirectoryForBlueprints(dir: string, blueprintFiles: string[]): void {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        
        if (entry.isDirectory()) {
          this.scanDirectoryForBlueprints(fullPath, blueprintFiles);
        } else if (entry.isFile() && entry.name === 'blueprint.ts') {
          blueprintFiles.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not scan directory ${dir}: ${error.message}`);
    }
  }

  /**
   * Parse a blueprint file using TypeScript compiler API
   */
  private parseBlueprint(blueprintPath: string): ParsedBlueprint | null {
    try {
      const sourceCode = readFileSync(blueprintPath, 'utf-8');
      
      // Create a TypeScript source file
      const sourceFile = ts.createSourceFile(
        blueprintPath,
        sourceCode,
        ts.ScriptTarget.Latest,
        true
      );
      
      // Find the blueprint object
      let blueprint: ParsedBlueprint | null = null;
      
      const visit = (node: ts.Node) => {
        if (ts.isVariableDeclaration(node) && node.name.getText() === 'blueprint') {
          const initializer = node.initializer;
          if (initializer && ts.isObjectLiteralExpression(initializer)) {
            blueprint = this.extractBlueprintFromObjectLiteral(initializer);
          }
        } else if (ts.isExportAssignment(node) && node.expression) {
          if (ts.isObjectLiteralExpression(node.expression)) {
            blueprint = this.extractBlueprintFromObjectLiteral(node.expression);
          }
        }
        
        ts.forEachChild(node, visit);
      };
      
      visit(sourceFile);
      
      return blueprint;
    } catch (error) {
      this.addError(blueprintPath, 'unknown', 0, 'PARSE_ERROR', 
        `Failed to parse blueprint: ${error.message}`, '');
      return null;
    }
  }

  /**
   * Extract blueprint data from TypeScript object literal
   */
  private extractBlueprintFromObjectLiteral(obj: ts.ObjectLiteralExpression): ParsedBlueprint {
    const blueprint: ParsedBlueprint = {
      id: 'unknown',
      name: 'unknown',
      actions: []
    };
    
    for (const property of obj.properties) {
      if (ts.isPropertyAssignment(property)) {
        const name = property.name.getText();
        const value = property.initializer;
        
        if (name === 'id' && ts.isStringLiteral(value)) {
          blueprint.id = value.text;
        } else if (name === 'name' && ts.isStringLiteral(value)) {
          blueprint.name = value.text;
        } else if (name === 'actions' && ts.isArrayLiteralExpression(value)) {
          blueprint.actions = this.extractActionsFromArray(value);
        }
      }
    }
    
    return blueprint;
  }

  /**
   * Extract actions from TypeScript array literal
   */
  private extractActionsFromArray(array: ts.ArrayLiteralExpression): Array<{
    type: string;
    template?: string;
    modifier?: string;
    path?: string;
  }> {
    const actions: Array<{
      type: string;
      template?: string;
      modifier?: string;
      path?: string;
    }> = [];
    
    for (const element of array.elements) {
      if (ts.isObjectLiteralExpression(element)) {
        const action: any = {};
        
        for (const property of element.properties) {
          if (ts.isPropertyAssignment(property)) {
            const propName = property.name.getText();
            const propValue = property.initializer;
            
            if (ts.isStringLiteral(propValue)) {
              action[propName] = propValue.text;
            }
          }
        }
        
        actions.push(action);
      }
    }
    
    return actions;
  }

  /**
   * Validate a single blueprint
   */
  private validateBlueprint(blueprintPath: string, blueprint: ParsedBlueprint): void {
    blueprint.actions.forEach((action, index) => {
      this.validateAction(blueprintPath, blueprint.id, action, index);
    });
  }

  /**
   * Validate a single blueprint action
   */
  private validateAction(
    blueprintPath: string, 
    blueprintId: string, 
    action: any, 
    actionIndex: number
  ): void {
    // Validate CREATE_FILE actions with templates
    if (action.type === 'CREATE_FILE' && action.template) {
      this.validateTemplateExistence(blueprintPath, blueprintId, action, actionIndex);
    }
    
    // Validate ENHANCE_FILE actions with modifiers
    if (action.type === 'ENHANCE_FILE' && action.modifier) {
      this.validateModifierExistence(blueprintPath, blueprintId, action, actionIndex);
    }
  }

  /**
   * Validate that a template file exists
   */
  private validateTemplateExistence(
    blueprintPath: string,
    blueprintId: string,
    action: any,
    actionIndex: number
  ): void {
    const templatePath = action.template;
    if (!templatePath) return;
    
    // Resolve template path relative to blueprint directory
    const blueprintDir = resolve(blueprintPath, '..');
    const fullTemplatePath = resolve(blueprintDir, templatePath);
    
    if (!existsSync(fullTemplatePath)) {
      this.addError(
        blueprintPath,
        blueprintId,
        actionIndex,
        'CREATE_FILE',
        `Template file not found: ${templatePath}`,
        `Expected at: ${fullTemplatePath}`
      );
    }
  }

  /**
   * Validate that a modifier exists
   */
  private validateModifierExistence(
    blueprintPath: string,
    blueprintId: string,
    action: any,
    actionIndex: number
  ): void {
    const modifier = action.modifier;
    if (!modifier) return;
    
    if (!this.availableModifiers.has(modifier)) {
      this.addError(
        blueprintPath,
        blueprintId,
        actionIndex,
        'ENHANCE_FILE',
        `Unknown modifier: ${modifier}`,
        `Available modifiers: ${Array.from(this.availableModifiers).join(', ')}`
      );
    }
  }

  /**
   * Add a validation error
   */
  private addError(
    blueprintPath: string,
    blueprintId: string,
    actionIndex: number,
    actionType: string,
    error: string,
    details: string
  ): void {
    this.errors.push({
      blueprintPath,
      blueprintId,
      actionIndex,
      actionType,
      error,
      details
    });
  }

  /**
   * Run the complete validation
   */
  public async validate(): Promise<ValidationResult> {
    console.log('🔍 Starting Blueprint Validation...\n');
    
    const blueprintFiles = this.findBlueprintFiles();
    console.log(`📋 Found ${blueprintFiles.length} blueprint files to validate\n`);
    
    let validBlueprints = 0;
    let invalidBlueprints = 0;
    
    for (const blueprintPath of blueprintFiles) {
      console.log(`🔍 Validating: ${blueprintPath}`);
      
      try {
        const blueprint = this.parseBlueprint(blueprintPath);
        if (blueprint) {
          this.validateBlueprint(blueprintPath, blueprint);
          
          // Check if this blueprint has any errors
          const blueprintErrors = this.errors.filter(e => e.blueprintPath === blueprintPath);
          if (blueprintErrors.length === 0) {
            console.log(`  ✅ Valid`);
            validBlueprints++;
          } else {
            console.log(`  ❌ Invalid (${blueprintErrors.length} errors)`);
            invalidBlueprints++;
          }
        } else {
          console.log(`  ❌ Failed to load`);
          invalidBlueprints++;
        }
      } catch (error) {
        console.log(`  ❌ Error: ${error.message}`);
        invalidBlueprints++;
      }
    }
    
    const result: ValidationResult = {
      isValid: this.errors.length === 0,
      errors: this.errors,
      summary: {
        totalBlueprints: blueprintFiles.length,
        validBlueprints,
        invalidBlueprints,
        totalErrors: this.errors.length
      }
    };
    
    this.printResults(result);
    return result;
  }

  /**
   * Print validation results
   */
  private printResults(result: ValidationResult): void {
    console.log('\n' + '='.repeat(80));
    console.log('📊 VALIDATION RESULTS');
    console.log('='.repeat(80));
    
    console.log(`\n📈 Summary:`);
    console.log(`  Total Blueprints: ${result.summary.totalBlueprints}`);
    console.log(`  Valid Blueprints: ${result.summary.validBlueprints}`);
    console.log(`  Invalid Blueprints: ${result.summary.invalidBlueprints}`);
    console.log(`  Total Errors: ${result.summary.totalErrors}`);
    
    if (result.errors.length > 0) {
      console.log(`\n❌ ERRORS FOUND:`);
      console.log('-'.repeat(80));
      
      // Group errors by blueprint
      const errorsByBlueprint = result.errors.reduce((acc, error) => {
        if (!acc[error.blueprintPath]) {
          acc[error.blueprintPath] = [];
        }
        acc[error.blueprintPath].push(error);
        return acc;
      }, {} as Record<string, ValidationError[]>);
      
      for (const [blueprintPath, errors] of Object.entries(errorsByBlueprint)) {
        console.log(`\n📁 ${blueprintPath}:`);
        errors.forEach(error => {
          console.log(`  ❌ Action ${error.actionIndex} (${error.actionType}): ${error.error}`);
          if (error.details) {
            console.log(`     Details: ${error.details}`);
          }
        });
      }
    } else {
      console.log(`\n✅ ALL BLUEPRINTS ARE VALID!`);
    }
    
    console.log('\n' + '='.repeat(80));
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  const validator = new BlueprintValidator();
  const result = await validator.validate();
  
  if (!result.isValid) {
    console.log('\n❌ VALIDATION FAILED');
    console.log('Please fix the errors above before proceeding.');
    process.exit(1);
  } else {
    console.log('\n✅ VALIDATION PASSED');
    console.log('All blueprints are valid and self-contained!');
    process.exit(0);
  }
}

// Run the validator
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Validation script failed:', error);
    process.exit(1);
  });
}

export { BlueprintValidator, ValidationResult, ValidationError };
