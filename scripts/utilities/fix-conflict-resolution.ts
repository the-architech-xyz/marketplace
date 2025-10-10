#!/usr/bin/env tsx

/**
 * Conflict Resolution Fixer
 * 
 * Automatically adds appropriate conflict resolution strategies to CREATE_FILE actions
 * that are missing them. This helps prevent "file already exists" errors during execution.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface FixResult {
  blueprintPath: string;
  fixed: boolean;
  actionsFixed: number;
  errors: string[];
}

class ConflictResolutionFixer {
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
   * Determine the appropriate conflict resolution strategy based on module type and file path
   */
  private getConflictResolutionStrategy(
    blueprintPath: string, 
    filePath: string
  ): { strategy: string; priority?: number } {
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
    
    const isComponentFile = componentFiles.some(pattern => filePath.includes(pattern));
    const isConfigFile = configFiles.some(pattern => filePath.includes(pattern));
    
    if (isAdapter) {
      if (isComponentFile) {
        return { strategy: 'SKIP', priority: 0 };
      } else if (isConfigFile) {
        return { strategy: 'MERGE', priority: 0 };
      } else {
        return { strategy: 'REPLACE', priority: 0 };
      }
    } else if (isIntegration) {
      if (isComponentFile) {
        return { strategy: 'REPLACE', priority: 1 };
      } else if (isConfigFile) {
        return { strategy: 'MERGE', priority: 1 };
      } else {
        return { strategy: 'REPLACE', priority: 1 };
      }
    } else if (isFeature) {
      return { strategy: 'REPLACE', priority: 2 };
    }
    
    return { strategy: 'REPLACE' };
  }

  /**
   * Fix a single blueprint file
   */
  private fixBlueprint(blueprintPath: string): FixResult {
    const result: FixResult = {
      blueprintPath,
      fixed: false,
      actionsFixed: 0,
      errors: []
    };

    try {
      let content = fs.readFileSync(blueprintPath, 'utf-8');
      let modified = false;

      // Find all CREATE_FILE actions without conflict resolution
      const createFileRegex = /\{\s*type:\s*BlueprintActionType\.CREATE_FILE,([\s\S]*?)\}/g;
      let match;

      while ((match = createFileRegex.exec(content)) !== null) {
        const actionString = match[0];
        const actionContent = match[1];
        
        // Check if conflict resolution is already present
        if (actionContent.includes('conflictResolution:')) {
          continue;
        }

        // Extract path from the action
        const pathMatch = actionContent.match(/path:\s*['"`]([^'"`]+)['"`]/);
        if (!pathMatch) {
          continue;
        }

        const filePath = pathMatch[1];
        const strategy = this.getConflictResolutionStrategy(blueprintPath, filePath);

        // Create the conflict resolution property
        let conflictResolution = `conflictResolution: {\n        strategy: ConflictResolutionStrategy.${strategy.strategy}`;
        if (strategy.priority !== undefined) {
          conflictResolution += `,\n        priority: ${strategy.priority}`;
        }
        conflictResolution += '\n      }';

        // Find the position to insert the conflict resolution
        // Look for the last property before the closing brace
        const lastPropertyMatch = actionContent.match(/([^,]+),?\s*$/);
        if (lastPropertyMatch) {
          const newActionString = actionString.replace(
            lastPropertyMatch[0],
            `${lastPropertyMatch[0].trim().endsWith(',') ? lastPropertyMatch[0] : lastPropertyMatch[0] + ','}\n      ${conflictResolution}`
          );

          content = content.replace(actionString, newActionString);
          modified = true;
          result.actionsFixed++;
        }
      }

      if (modified) {
        // Write the modified content back to the file
        fs.writeFileSync(blueprintPath, content, 'utf-8');
        result.fixed = true;
      }

    } catch (error) {
      result.errors.push(`Error processing ${blueprintPath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  /**
   * Fix all blueprint files
   */
  public async fixAll(): Promise<FixResult[]> {
    console.log('🔧 Starting Conflict Resolution Fix...\n');
    
    const blueprintFiles = this.findBlueprintFiles();
    console.log(`📋 Found ${blueprintFiles.length} blueprint files to process\n`);
    
    const results: FixResult[] = [];
    
    for (const blueprintPath of blueprintFiles) {
      const relativePath = path.relative(this.marketplaceRoot, blueprintPath);
      console.log(`🔍 Processing: ${relativePath}`);
      
      const result = this.fixBlueprint(blueprintPath);
      results.push(result);
      
      if (result.fixed) {
        console.log(`  ✅ Fixed ${result.actionsFixed} actions`);
      } else if (result.actionsFixed === 0) {
        console.log(`  ⏭️  No actions needed fixing`);
      } else {
        console.log(`  ❌ Failed to fix ${result.actionsFixed} actions`);
      }
      
      if (result.errors.length > 0) {
        console.log(`  ⚠️  Errors: ${result.errors.join(', ')}`);
      }
    }
    
    this.printSummary(results);
    return results;
  }

  /**
   * Print summary of fixes
   */
  private printSummary(results: FixResult[]): void {
    console.log('\n' + '='.repeat(80));
    console.log('📊 CONFLICT RESOLUTION FIX SUMMARY');
    console.log('='.repeat(80));
    
    const totalFiles = results.length;
    const fixedFiles = results.filter(r => r.fixed).length;
    const totalActionsFixed = results.reduce((sum, r) => sum + r.actionsFixed, 0);
    const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
    
    console.log(`\n📈 Summary:`);
    console.log(`  Total Files Processed: ${totalFiles}`);
    console.log(`  Files Fixed: ${fixedFiles}`);
    console.log(`  Total Actions Fixed: ${totalActionsFixed}`);
    console.log(`  Total Errors: ${totalErrors}`);
    
    if (totalActionsFixed > 0) {
      console.log(`\n✅ Successfully added conflict resolution to ${totalActionsFixed} CREATE_FILE actions!`);
      console.log(`\n🔧 What was fixed:`);
      console.log(`  - Adapter files: SKIP strategy (priority 0) for components`);
      console.log(`  - Integration files: REPLACE strategy (priority 1) for components`);
      console.log(`  - Feature files: REPLACE strategy (priority 2)`);
      console.log(`  - Configuration files: MERGE strategy`);
      console.log(`  - Other files: REPLACE strategy`);
    } else {
      console.log(`\n✅ No files needed fixing - all blueprints already have conflict resolution!`);
    }
    
    if (totalErrors > 0) {
      console.log(`\n⚠️  Errors encountered:`);
      results.filter(r => r.errors.length > 0).forEach(result => {
        console.log(`  ${path.relative(this.marketplaceRoot, result.blueprintPath)}:`);
        result.errors.forEach(error => console.log(`    - ${error}`));
      });
    }
    
    console.log('\n' + '='.repeat(80));
  }
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  const fixer = new ConflictResolutionFixer();
  const results = await fixer.fixAll();
  
  const hasErrors = results.some(r => r.errors.length > 0);
  if (hasErrors) {
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ConflictResolutionFixer };
