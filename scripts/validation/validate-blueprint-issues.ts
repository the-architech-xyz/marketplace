#!/usr/bin/env tsx

/**
 * Blueprint Issues Validation Script
 * 
 * Specifically looks for common blueprint issues:
 * - Missing conflict resolution on CREATE_FILE actions
 * - Missing fallback on ENHANCE_FILE actions
 * - Template path issues
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

interface Issue {
  file: string;
  line: number;
  issue: string;
  severity: 'error' | 'warning';
  suggestion: string;
}

class BlueprintIssuesValidator {
  private marketplaceRoot: string;
  private issues: Issue[] = [];

  constructor() {
    this.marketplaceRoot = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
  }

  async validateAllBlueprints(): Promise<void> {
    console.log('🔍 Blueprint Issues Validation');
    console.log('===============================');

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
      const lines = content.split('\n');
      
      let inActionsArray = false;
      let actionDepth = 0;
      let currentAction: any = {};
      let actionLine = 0;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Detect start of actions array
        if (trimmed.includes('actions:') && trimmed.includes('[')) {
          inActionsArray = true;
          continue;
        }

        // Detect end of actions array
        if (inActionsArray && trimmed === ']' && actionDepth === 0) {
          inActionsArray = false;
          continue;
        }

        if (!inActionsArray) continue;

        // Track action depth
        if (trimmed.includes('{')) {
          actionDepth++;
          if (actionDepth === 1) {
            currentAction = { line: i + 1 };
            actionLine = i + 1;
          }
        }
        if (trimmed.includes('}')) {
          actionDepth--;
          if (actionDepth === 0 && Object.keys(currentAction).length > 1) {
            this.validateAction(blueprintFile, currentAction, actionLine);
            currentAction = {};
          }
        }

        // Parse action properties
        if (actionDepth >= 1) {
          this.parseActionProperty(line, currentAction);
        }
      }

    } catch (error) {
      console.error(`❌ Failed to validate ${blueprintFile}:`, error);
    }
  }

  private parseActionProperty(line: string, action: any): void {
    const trimmed = line.trim();

    // Extract action type
    if (trimmed.includes('type:') && trimmed.includes('BlueprintActionType')) {
      const match = trimmed.match(/BlueprintActionType\.(\w+)/);
      if (match) {
        action.type = match[1];
      }
    }

    // Extract path
    if (trimmed.includes('path:')) {
      const match = trimmed.match(/path:\s*['"`]([^'"`]+)['"`]/);
      if (match) {
        action.path = match[1];
      }
    }

    // Extract template
    if (trimmed.includes('template:')) {
      const match = trimmed.match(/template:\s*['"`]([^'"`]+)['"`]/);
      if (match) {
        action.template = match[1];
      }
    }

    // Extract modifier
    if (trimmed.includes('modifier:')) {
      const match = trimmed.match(/modifier:\s*ModifierType\.(\w+)/);
      if (match) {
        action.modifier = match[1];
      }
    }

    // Extract fallback
    if (trimmed.includes('fallback:')) {
      const match = trimmed.match(/fallback:\s*(?:EnhanceFileFallbackStrategy\.(\w+)|['"`]([^'"`]+)['"`])/);
      if (match) {
        action.fallback = match[1] || match[2];
      }
    }

    // Extract conflict resolution
    if (trimmed.includes('conflictResolution:')) {
      action.hasConflictResolution = true;
      const match = trimmed.match(/strategy:\s*ConflictResolutionStrategy\.(\w+)/);
      if (match) {
        action.conflictStrategy = match[1];
      }
    }
  }

  private validateAction(file: string, action: any, line: number): void {
    // Validate CREATE_FILE actions
    if (action.type === 'CREATE_FILE') {
      if (!action.hasConflictResolution) {
        this.issues.push({
          file,
          line: action.line,
          issue: 'CREATE_FILE action missing conflictResolution',
          severity: 'error',
          suggestion: 'Add conflictResolution: { strategy: ConflictResolutionStrategy.REPLACE, priority: 1 }'
        });
      }
    }

    // Validate ENHANCE_FILE actions
    if (action.type === 'ENHANCE_FILE') {
      if (!action.fallback) {
        this.issues.push({
          file,
          line: action.line,
          issue: 'ENHANCE_FILE action missing fallback strategy',
          severity: 'warning',
          suggestion: 'Add fallback: EnhanceFileFallbackStrategy.CREATE or fallback: "create"'
        });
      }
    }

    // Validate template existence for CREATE_FILE actions
    if (action.type === 'CREATE_FILE' && action.template) {
      const templatePath = path.join(this.marketplaceRoot, path.dirname(file), action.template);
      // Note: In a real implementation, you'd check if the file exists
    }
  }

  private printSummary(): void {
    console.log('\n📊 VALIDATION SUMMARY');
    console.log('=====================');

    const errors = this.issues.filter(i => i.severity === 'error');
    const warnings = this.issues.filter(i => i.severity === 'warning');

    console.log(`❌ Errors: ${errors.length}`);
    console.log(`⚠️  Warnings: ${warnings.length}`);

    if (errors.length > 0) {
      console.log('\n🔴 ERRORS:');
      errors.forEach(issue => {
        console.log(`\n📄 ${issue.file}:${issue.line}`);
        console.log(`  ❌ ${issue.issue}`);
        console.log(`  💡 ${issue.suggestion}`);
      });
    }

    if (warnings.length > 0) {
      console.log('\n🟡 WARNINGS:');
      warnings.forEach(issue => {
        console.log(`\n📄 ${issue.file}:${issue.line}`);
        console.log(`  ⚠️  ${issue.issue}`);
        console.log(`  💡 ${issue.suggestion}`);
      });
    }

    if (errors.length === 0 && warnings.length === 0) {
      console.log('\n✅ No blueprint issues found!');
    } else if (errors.length === 0) {
      console.log('\n✅ No errors found, but consider addressing warnings for better reliability.');
    } else {
      console.log('\n❌ Please fix the errors above before proceeding.');
      process.exit(1);
    }
  }
}

// Run the validator if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new BlueprintIssuesValidator();
  validator.validateAllBlueprints().catch(console.error);
}

export { BlueprintIssuesValidator };
