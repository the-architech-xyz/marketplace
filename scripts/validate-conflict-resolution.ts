#!/usr/bin/env tsx

/**
 * Conflict Resolution Validator
 * 
 * Validates that all CREATE_FILE actions in blueprints have proper conflict resolution
 * strategies defined. This prevents "file already exists" errors during execution.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ValidationError {
  blueprintPath: string;
  blueprintId: string;
  actionIndex: number;
  actionType: string;
  error: string;
  details: string;
  suggestion?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  summary: {
    totalBlueprints: number;
    validBlueprints: number;
    invalidBlueprints: number;
    totalErrors: number;
    missingConflictResolution: number;
  };
}

interface ParsedAction {
  type: string;
  path?: string;
  template?: string;
  conflictResolution?: {
    strategy: string;
    priority?: number;
  };
}

interface ParsedBlueprint {
  id: string;
  name: string;
  actions: ParsedAction[];
}

class ConflictResolutionValidator {
  private errors: ValidationError[] = [];
  private marketplaceRoot: string;

  constructor() {
    this.marketplaceRoot = path.resolve(__dirname, '..');
  }

  /**
   * Find all blueprint files in the marketplace
   */
  private findBlueprintFiles(): string[] {
    const patterns = [
      'adapters/**/blueprint.ts',
      'integrations/**/blueprint.ts',
      'features/**/blueprint.ts'
    ];
    
    const files: string[] = [];
    for (const pattern of patterns) {
      const matches = glob.sync(pattern, { cwd: this.marketplaceRoot });
      files.push(...matches.map(file => path.join(this.marketplaceRoot, file)));
    }
    
    return files;
  }

  /**
   * Parse a blueprint file and extract actions
   */
  private parseBlueprint(blueprintPath: string): ParsedBlueprint | null {
    try {
      const content = fs.readFileSync(blueprintPath, 'utf-8');
      
      // Extract blueprint ID
      const idMatch = content.match(/id:\s*['"`]([^'"`]+)['"`]/);
      const nameMatch = content.match(/name:\s*['"`]([^'"`]+)['"`]/);
      
      if (!idMatch) {
        console.warn(`⚠️  Could not extract ID from ${blueprintPath}`);
        return null;
      }

      // Extract actions using regex patterns
      const actions = this.extractActions(content);
      
      return {
        id: idMatch[1],
        name: nameMatch?.[1] || 'Unknown',
        actions
      };
    } catch (error) {
      console.error(`❌ Error parsing ${blueprintPath}:`, error);
      return null;
    }
  }

  /**
   * Extract actions from blueprint content
   */
  private extractActions(content: string): ParsedAction[] {
    const actions: ParsedAction[] = [];
    
    // Find all action objects in the actions array
    const actionRegex = /\{\s*type:\s*BlueprintActionType\.(\w+),[\s\S]*?\}/g;
    let match;
    
    while ((match = actionRegex.exec(content)) !== null) {
      const actionString = match[0];
      const actionType = match[1];
      
      const action: ParsedAction = {
        type: actionType
      };
      
      // Extract path
      const pathMatch = actionString.match(/path:\s*['"`]([^'"`]+)['"`]/);
      if (pathMatch) {
        action.path = pathMatch[1];
      }
      
      // Extract template
      const templateMatch = actionString.match(/template:\s*['"`]([^'"`]+)['"`]/);
      if (templateMatch) {
        action.template = templateMatch[1];
      }
      
      // Extract conflict resolution
      const conflictMatch = actionString.match(/conflictResolution:\s*\{[\s\S]*?\}/);
      if (conflictMatch) {
        const conflictString = conflictMatch[0];
        const strategyMatch = conflictString.match(/strategy:\s*ConflictResolutionStrategy\.(\w+)/);
        const priorityMatch = conflictString.match(/priority:\s*(\d+)/);
        
        action.conflictResolution = {
          strategy: strategyMatch?.[1] || 'unknown',
          priority: priorityMatch ? parseInt(priorityMatch[1]) : undefined
        };
      }
      
      actions.push(action);
    }
    
    return actions;
  }

  /**
   * Determine the appropriate conflict resolution strategy based on module type and file path
   */
  private getSuggestedConflictResolution(
    blueprintPath: string, 
    filePath: string, 
    actionIndex: number
  ): string {
    const isAdapter = blueprintPath.includes('/adapters/');
    const isIntegration = blueprintPath.includes('/integrations/');
    const isFeature = blueprintPath.includes('/features/');
    
    // Component files that should be replaceable by integrations
    const componentFiles = [
      'src/components/',
      'src/lib/',
      'src/hooks/',
      'src/utils/',
      'src/types/'
    ];
    
    // Configuration files that should be merged or replaced
    const configFiles = [
      'package.json',
      'tsconfig.json',
      'next.config.',
      'tailwind.config.',
      'eslint.config.',
      'drizzle.config.',
      '.env'
    ];
    
    // Template files that should typically be replaced
    const templateFiles = [
      '.tpl',
      '.template'
    ];
    
    const isComponentFile = componentFiles.some(pattern => filePath.includes(pattern));
    const isConfigFile = configFiles.some(pattern => filePath.includes(pattern));
    const isTemplateFile = templateFiles.some(pattern => filePath.includes(pattern));
    
    if (isAdapter) {
      if (isComponentFile) {
        return 'SKIP (let integrations override)';
      } else if (isConfigFile) {
        return 'MERGE (combine configurations)';
      } else {
        return 'REPLACE (adapter provides base implementation)';
      }
    } else if (isIntegration) {
      if (isComponentFile) {
        return 'REPLACE (integration provides framework-specific version)';
      } else if (isConfigFile) {
        return 'MERGE (combine with existing configuration)';
      } else {
        return 'REPLACE (integration provides optimized version)';
      }
    } else if (isFeature) {
      return 'REPLACE (feature provides complete implementation)';
    }
    
    return 'REPLACE (default strategy)';
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
    // Only validate CREATE_FILE actions
    if (action.type !== 'CREATE_FILE') {
      return;
    }
    
    // Skip if no path (invalid action)
    if (!action.path) {
      return;
    }
    
    // Check if conflict resolution is missing
    if (!action.conflictResolution) {
      const suggestion = this.getSuggestedConflictResolution(blueprintPath, action.path, actionIndex);
      
      this.addError(
        blueprintPath,
        blueprintId,
        actionIndex,
        action.type,
        'Missing conflict resolution strategy',
        `CREATE_FILE action for '${action.path}' is missing conflictResolution property`,
        suggestion
      );
    }
  }

  /**
   * Add an error to the validation results
   */
  private addError(
    blueprintPath: string,
    blueprintId: string,
    actionIndex: number,
    actionType: string,
    error: string,
    details: string,
    suggestion?: string
  ): void {
    this.errors.push({
      blueprintPath,
      blueprintId,
      actionIndex,
      actionType,
      error,
      details,
      suggestion
    });
  }

  /**
   * Run the complete validation
   */
  public async validate(): Promise<ValidationResult> {
    console.log('🔍 Starting Conflict Resolution Validation...\n');
    
    const blueprintFiles = this.findBlueprintFiles();
    console.log(`📋 Found ${blueprintFiles.length} blueprint files to validate\n`);
    
    let validBlueprints = 0;
    let invalidBlueprints = 0;
    let missingConflictResolution = 0;
    
    for (const blueprintPath of blueprintFiles) {
      console.log(`🔍 Validating: ${path.relative(this.marketplaceRoot, blueprintPath)}`);
      
      try {
        const blueprint = this.parseBlueprint(blueprintPath);
        if (blueprint) {
          this.validateBlueprint(blueprintPath, blueprint);
          
          // Check if this blueprint has any errors
          const blueprintErrors = this.errors.filter(e => e.blueprintPath === blueprintPath);
          const conflictErrors = blueprintErrors.filter(e => e.error === 'Missing conflict resolution strategy');
          
          if (blueprintErrors.length === 0) {
            console.log(`  ✅ Valid`);
            validBlueprints++;
          } else {
            console.log(`  ❌ Invalid (${blueprintErrors.length} errors)`);
            invalidBlueprints++;
            missingConflictResolution += conflictErrors.length;
          }
        } else {
          console.log(`  ❌ Failed to load`);
          invalidBlueprints++;
        }
      } catch (error) {
        console.log(`  ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
        totalErrors: this.errors.length,
        missingConflictResolution
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
    console.log('📊 CONFLICT RESOLUTION VALIDATION RESULTS');
    console.log('='.repeat(80));
    
    console.log(`\n📈 Summary:`);
    console.log(`  Total Blueprints: ${result.summary.totalBlueprints}`);
    console.log(`  Valid Blueprints: ${result.summary.validBlueprints}`);
    console.log(`  Invalid Blueprints: ${result.summary.invalidBlueprints}`);
    console.log(`  Total Errors: ${result.summary.totalErrors}`);
    console.log(`  Missing Conflict Resolution: ${result.summary.missingConflictResolution}`);
    
    if (result.errors.length > 0) {
      console.log(`\n❌ Errors Found:`);
      
      // Group errors by blueprint
      const errorsByBlueprint = new Map<string, ValidationError[]>();
      for (const error of result.errors) {
        const key = error.blueprintPath;
        if (!errorsByBlueprint.has(key)) {
          errorsByBlueprint.set(key, []);
        }
        errorsByBlueprint.get(key)!.push(error);
      }
      
      for (const [blueprintPath, errors] of errorsByBlueprint.entries()) {
        console.log(`\n📁 ${path.relative(this.marketplaceRoot, blueprintPath)}:`);
        
        for (const error of errors) {
          console.log(`  ❌ Action ${error.actionIndex}: ${error.error}`);
          console.log(`     File: ${error.details.split("'")[1] || 'Unknown'}`);
          if (error.suggestion) {
            console.log(`     💡 Suggestion: ${error.suggestion}`);
          }
        }
      }
      
      console.log(`\n🔧 How to Fix:`);
      console.log(`  1. Add conflictResolution property to CREATE_FILE actions`);
      console.log(`  2. Use appropriate strategy: SKIP, REPLACE, MERGE, or ERROR`);
      console.log(`  3. Set priority for adapter/integration conflicts`);
      console.log(`  4. Example:`);
      console.log(`     {`);
      console.log(`       type: BlueprintActionType.CREATE_FILE,`);
      console.log(`       path: 'src/components/MyComponent.tsx',`);
      console.log(`       template: 'templates/MyComponent.tsx.tpl',`);
      console.log(`       conflictResolution: {`);
      console.log(`         strategy: ConflictResolutionStrategy.SKIP,`);
      console.log(`         priority: 0`);
      console.log(`       }`);
      console.log(`     }`);
    } else {
      console.log(`\n✅ All blueprints have proper conflict resolution!`);
    }
    
    console.log('\n' + '='.repeat(80));
  }
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  const validator = new ConflictResolutionValidator();
  const result = await validator.validate();
  
  if (!result.isValid) {
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ConflictResolutionValidator };
