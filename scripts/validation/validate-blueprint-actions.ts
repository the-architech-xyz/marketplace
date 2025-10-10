#!/usr/bin/env tsx

/**
 * Blueprint Actions Validation Script
 * 
 * Validates that all blueprint actions have proper conflict resolution
 * and fallback strategies where required.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';
import { Blueprint, BlueprintActionType, ConflictResolutionStrategy, EnhanceFileFallbackStrategy } from '@thearchitech.xyz/types';

interface ValidationError {
  file: string;
  actionIndex: number;
  actionType: string;
  path?: string;
  issue: string;
  severity: 'error' | 'warning';
  suggestion: string;
}

interface ValidationResult {
  file: string;
  totalActions: number;
  errors: ValidationError[];
  warnings: ValidationError[];
}

class BlueprintActionsValidator {
  private marketplaceRoot: string;
  private results: ValidationResult[] = [];

  constructor() {
    this.marketplaceRoot = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
  }

  async validateAllBlueprints(): Promise<void> {
    console.log('🔍 Blueprint Actions Validation');
    console.log('================================');

    try {
      // Find all blueprint files
      const blueprintFiles = await glob('**/*.blueprint.ts', { 
        cwd: this.marketplaceRoot,
        ignore: ['node_modules/**', 'dist/**']
      });

      console.log(`📋 Found ${blueprintFiles.length} blueprint files`);

      for (const blueprintFile of blueprintFiles) {
        await this.validateBlueprint(blueprintFile);
      }

      this.printSummary();

    } catch (error) {
      console.error('❌ Validation failed:', error);
      process.exit(1);
    }
  }

  private async validateBlueprint(blueprintFile: string): Promise<void> {
    const filePath = path.join(this.marketplaceRoot, blueprintFile);
    
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      
      // Extract blueprint using regex (simple approach)
      const blueprintMatch = content.match(/export\s+(?:const|default)\s+\w+Blueprint:\s*Blueprint\s*=\s*({[\s\S]*?});/);
      if (!blueprintMatch) {
        console.log(`⚠️  ${blueprintFile}: Could not parse blueprint structure`);
        return;
      }

      // Parse the blueprint (simplified - in real implementation you'd use a proper parser)
      const blueprintStr = blueprintMatch[1];
      const actionsMatch = blueprintStr.match(/actions:\s*\[([\s\S]*?)\]/);
      if (!actionsMatch) {
        console.log(`⚠️  ${blueprintFile}: No actions found`);
        return;
      }

      // Extract individual actions (simplified parsing)
      const actions = this.extractActions(actionsMatch[1]);
      
      const result: ValidationResult = {
        file: blueprintFile,
        totalActions: actions.length,
        errors: [],
        warnings: []
      };

      // Validate each action
      for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        this.validateAction(blueprintFile, i, action, result);
      }

      this.results.push(result);

      if (result.errors.length > 0 || result.warnings.length > 0) {
        console.log(`❌ ${blueprintFile}: ${result.errors.length} errors, ${result.warnings.length} warnings`);
      } else {
        console.log(`✅ ${blueprintFile}: All actions valid`);
      }

    } catch (error) {
      console.error(`❌ Failed to validate ${blueprintFile}:`, error);
    }
  }

  private extractActions(actionsStr: string): any[] {
    // Simplified action extraction - in real implementation you'd use a proper parser
    const actions: any[] = [];
    const actionRegex = /{\s*type:\s*BlueprintActionType\.(\w+)[\s\S]*?},?\s*(?=\s*{|\s*\])/g;
    let match;
    
    while ((match = actionRegex.exec(actionsStr)) !== null) {
      const actionStr = match[0];
      const actionType = match[1];
      
      // Extract basic properties
      const action: any = { type: `BlueprintActionType.${actionType}` };
      
      // Extract path
      const pathMatch = actionStr.match(/path:\s*['"`]([^'"`]+)['"`]/);
      if (pathMatch) action.path = pathMatch[1];
      
      // Extract template
      const templateMatch = actionStr.match(/template:\s*['"`]([^'"`]+)['"`]/);
      if (templateMatch) action.template = templateMatch[1];
      
      // Extract modifier
      const modifierMatch = actionStr.match(/modifier:\s*ModifierType\.(\w+)/);
      if (modifierMatch) action.modifier = `ModifierType.${modifierMatch[1]}`;
      
      // Extract fallback
      const fallbackMatch = actionStr.match(/fallback:\s*(?:EnhanceFileFallbackStrategy\.(\w+)|['"`]([^'"`]+)['"`])/);
      if (fallbackMatch) {
        action.fallback = fallbackMatch[1] || fallbackMatch[2];
      }
      
      // Extract conflict resolution
      const conflictMatch = actionStr.match(/conflictResolution:\s*{\s*strategy:\s*ConflictResolutionStrategy\.(\w+)[\s\S]*?}/);
      if (conflictMatch) {
        action.conflictResolution = { strategy: `ConflictResolutionStrategy.${conflictMatch[1]}` };
      }
      
      actions.push(action);
    }
    
    return actions;
  }

  private validateAction(filePath: string, actionIndex: number, action: any, result: ValidationResult): void {
    const actionType = action.type;

    // Validate CREATE_FILE actions
    if (actionType === 'BlueprintActionType.CREATE_FILE') {
      if (!action.conflictResolution) {
        result.errors.push({
          file: filePath,
          actionIndex,
          actionType,
          path: action.path,
          issue: 'CREATE_FILE action missing conflictResolution',
          severity: 'error',
          suggestion: 'Add conflictResolution: { strategy: ConflictResolutionStrategy.REPLACE, priority: 1 }'
        });
      } else if (!action.conflictResolution.strategy) {
        result.errors.push({
          file: filePath,
          actionIndex,
          actionType,
          path: action.path,
          issue: 'CREATE_FILE conflictResolution missing strategy',
          severity: 'error',
          suggestion: 'Add strategy: ConflictResolutionStrategy.REPLACE'
        });
      }
    }

    // Validate ENHANCE_FILE actions
    if (actionType === 'BlueprintActionType.ENHANCE_FILE') {
      if (!action.fallback) {
        result.warnings.push({
          file: filePath,
          actionIndex,
          actionType,
          path: action.path,
          issue: 'ENHANCE_FILE action missing fallback strategy',
          severity: 'warning',
          suggestion: 'Add fallback: EnhanceFileFallbackStrategy.CREATE or fallback: "create"'
        });
      } else if (action.fallback !== 'create' && action.fallback !== 'EnhanceFileFallbackStrategy.CREATE') {
        result.warnings.push({
          file: filePath,
          actionIndex,
          actionType,
          path: action.path,
          issue: 'ENHANCE_FILE fallback strategy may not be optimal',
          severity: 'warning',
          suggestion: 'Consider using EnhanceFileFallbackStrategy.CREATE for better reliability'
        });
      }
    }

    // Validate template existence for CREATE_FILE actions
    if (actionType === 'BlueprintActionType.CREATE_FILE' && action.template) {
      const templatePath = path.join(this.marketplaceRoot, path.dirname(filePath), action.template);
      // Note: In a real implementation, you'd check if the file exists
      // For now, we'll just note that template validation would go here
    }
  }

  private printSummary(): void {
    console.log('\n📊 VALIDATION SUMMARY');
    console.log('=====================');

    const totalFiles = this.results.length;
    const totalActions = this.results.reduce((sum, r) => sum + r.totalActions, 0);
    const totalErrors = this.results.reduce((sum, r) => sum + r.errors.length, 0);
    const totalWarnings = this.results.reduce((sum, r) => sum + r.warnings.length, 0);

    console.log(`📁 Files processed: ${totalFiles}`);
    console.log(`⚡ Total actions: ${totalActions}`);
    console.log(`❌ Errors: ${totalErrors}`);
    console.log(`⚠️  Warnings: ${totalWarnings}`);

    if (totalErrors > 0) {
      console.log('\n🔴 ERRORS:');
      this.results.forEach(result => {
        if (result.errors.length > 0) {
          console.log(`\n📄 ${result.file}:`);
          result.errors.forEach(error => {
            console.log(`  ❌ Action ${error.actionIndex}: ${error.issue}`);
            console.log(`     💡 ${error.suggestion}`);
            if (error.path) console.log(`     📁 Path: ${error.path}`);
          });
        }
      });
    }

    if (totalWarnings > 0) {
      console.log('\n🟡 WARNINGS:');
      this.results.forEach(result => {
        if (result.warnings.length > 0) {
          console.log(`\n📄 ${result.file}:`);
          result.warnings.forEach(warning => {
            console.log(`  ⚠️  Action ${warning.actionIndex}: ${warning.issue}`);
            console.log(`     💡 ${warning.suggestion}`);
            if (warning.path) console.log(`     📁 Path: ${warning.path}`);
          });
        }
      });
    }

    if (totalErrors === 0 && totalWarnings === 0) {
      console.log('\n✅ All blueprint actions are properly configured!');
    } else if (totalErrors === 0) {
      console.log('\n✅ No errors found, but consider addressing warnings for better reliability.');
    } else {
      console.log('\n❌ Please fix the errors above before proceeding.');
      process.exit(1);
    }
  }
}

// Run the validator
async function main() {
  const validator = new BlueprintActionsValidator();
  await validator.validateAllBlueprints();
}

// Run the validator if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { BlueprintActionsValidator };
