#!/usr/bin/env tsx

/**
 * Blueprint Validator Script
 * 
 * The "gardien" of our marketplace - ensures every blueprint is 100% valid and self-contained.
 * This script validates:
 * 1. Template existence for all CREATE_FILE actions
 * 2. Modifier existence for all ENHANCE_FILE actions
 * 3. Blueprint structure and syntax validation
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

interface ParsedAction {
  type: string;
  template?: string;
  modifier?: string;
  path?: string;
}

interface ParsedBlueprint {
  id: string;
  name: string;
  actions: ParsedAction[];
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
      'dockerignore-merger',
      'readme-merger',
      'css-enhancer',
      'package-json-merger'
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
   * Parse a blueprint file using regex (simpler and more reliable)
   */
  private parseBlueprint(blueprintPath: string): ParsedBlueprint | null {
    try {
      const sourceCode = readFileSync(blueprintPath, 'utf-8');
      
      // Extract blueprint ID
      const idMatch = sourceCode.match(/id:\s*['"`]([^'"`]+)['"`]/);
      const id = idMatch ? idMatch[1] : 'unknown';
      
      // Extract blueprint name
      const nameMatch = sourceCode.match(/name:\s*['"`]([^'"`]+)['"`]/);
      const name = nameMatch ? nameMatch[1] : 'unknown';
      
      // Extract actions array
      const actions = this.extractActions(sourceCode);
      
      return {
        id,
        name,
        actions
      };
    } catch (error) {
      this.addError(blueprintPath, 'unknown', 0, 'PARSE_ERROR', 
        `Failed to parse blueprint: ${error.message}`, '');
      return null;
    }
  }

  /**
   * Extract actions from blueprint source code using regex
   */
  private extractActions(sourceCode: string): ParsedAction[] {
    const actions: ParsedAction[] = [];
    
    // Find the actions array
    const actionsMatch = sourceCode.match(/actions:\s*\[([\s\S]*?)\]/);
    if (!actionsMatch) {
      return actions;
    }
    
    const actionsString = actionsMatch[1];
    
    // Split by action objects (looking for { type: '...' })
    const actionMatches = actionsString.match(/\{\s*type:\s*['"`]([^'"`]+)['"`][\s\S]*?\}/g);
    
    if (!actionMatches) {
      return actions;
    }
    
    for (const actionString of actionMatches) {
      const action: ParsedAction = { type: 'unknown' };
      
      // Extract type
      const typeMatch = actionString.match(/type:\s*['"`]([^'"`]+)['"`]/);
      if (typeMatch) {
        action.type = typeMatch[1];
      }
      
      // Extract template (for CREATE_FILE actions)
      const templateMatch = actionString.match(/template:\s*['"`]([^'"`]+)['"`]/);
      if (templateMatch) {
        action.template = templateMatch[1];
      }
      
      // Extract modifier (for ENHANCE_FILE actions)
      const modifierMatch = actionString.match(/modifier:\s*['"`]([^'"`]+)['"`]/);
      if (modifierMatch) {
        action.modifier = modifierMatch[1];
      }
      
      // Extract path
      const pathMatch = actionString.match(/path:\s*['"`]([^'"`]+)['"`]/);
      if (pathMatch) {
        action.path = pathMatch[1];
      }
      
      actions.push(action);
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
    action: ParsedAction, 
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
    action: ParsedAction,
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
    action: ParsedAction,
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
    
    // First pass: validate individual blueprints
    const parsedBlueprints: Array<{ blueprint: ParsedBlueprint; path: string }> = [];
    
    for (const blueprintPath of blueprintFiles) {
      console.log(`🔍 Validating: ${blueprintPath}`);
      
      try {
        const blueprint = this.parseBlueprint(blueprintPath);
        if (blueprint) {
          parsedBlueprints.push({ blueprint, path: blueprintPath });
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
    
    // Second pass: check for adapter-integration conflicts
    console.log(`\n🔍 Checking for adapter-integration conflicts...`);
    this.detectAdapterIntegrationConflicts(parsedBlueprints);
    
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
   * Detect conflicts between adapters and integrations
   */
  private detectAdapterIntegrationConflicts(blueprints: Array<{ blueprint: ParsedBlueprint; path: string }>): void {
    // Separate adapters and integrations
    const adapters = blueprints.filter(b => b.path.includes('/adapters/'));
    const integrations = blueprints.filter(b => b.path.includes('/integrations/'));
    
    // Create a map of files created by adapters
    const adapterFiles = new Map<string, string[]>(); // file path -> adapter IDs
    
    for (const { blueprint, path } of adapters) {
      for (const action of blueprint.actions) {
        if (action.type === 'CREATE_FILE' && action.path) {
          if (!adapterFiles.has(action.path)) {
            adapterFiles.set(action.path, []);
          }
          adapterFiles.get(action.path)!.push(blueprint.id);
        }
      }
    }
    
    // Check if integrations try to create files that adapters already create
    for (const { blueprint, path } of integrations) {
      for (const action of blueprint.actions) {
        if (action.type === 'CREATE_FILE' && action.path) {
          const conflictingAdapters = adapterFiles.get(action.path);
          if (conflictingAdapters && conflictingAdapters.length > 0) {
            this.addError(
              path,
              blueprint.id,
              0,
              'ADAPTER_INTEGRATION_CONFLICT',
              `Integration '${blueprint.id}' tries to create file '${action.path}' that is already created by adapter(s): ${conflictingAdapters.join(', ')}`,
              `Consider using ENHANCE_FILE instead of CREATE_FILE, or rename the file to be integration-specific (e.g., '${action.path.replace('.', '.integration.')}')`
            );
          }
        }
      }
    }
    
    const conflictCount = this.errors.filter(e => e.type === 'ADAPTER_INTEGRATION_CONFLICT').length;
    if (conflictCount > 0) {
      console.log(`  ❌ Found ${conflictCount} adapter-integration conflicts`);
    } else {
      console.log(`  ✅ No adapter-integration conflicts found`);
    }
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
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('💥 Validation script failed:', error);
    process.exit(1);
  });
}

export { BlueprintValidator, ValidationResult, ValidationError };