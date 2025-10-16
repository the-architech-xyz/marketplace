#!/usr/bin/env tsx

/**
 * Template-Blueprint Consistency Analyzer
 * 
 * Analyzes all templates and their corresponding blueprints to ensure:
 * 1. Template variables exist in blueprint context
 * 2. Blueprint provides all variables that templates expect
 * 3. No orphaned template variables
 * 4. No missing blueprint context
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname, basename } from 'path';

interface TemplateVariable {
  file: string;
  line: number;
  variable: string;
  type: 'module.parameters' | 'project' | 'framework' | 'context' | 'unknown';
  context: string;
}

interface BlueprintContext {
  file: string;
  contextVariables: string[];
  contextStructure: Record<string, any>;
}

interface AnalysisResult {
  template: string;
  blueprint: string;
  templateVariables: TemplateVariable[];
  blueprintContext: BlueprintContext | null;
  issues: {
    missingInBlueprint: string[];
    orphanedInTemplate: string[];
    inconsistentNaming: string[];
  };
  status: 'valid' | 'issues' | 'no_blueprint';
}

class TemplateBlueprintAnalyzer {
  private marketplaceRoot: string;
  private results: AnalysisResult[] = [];

  constructor() {
    this.marketplaceRoot = process.cwd();
  }

  async analyze(): Promise<void> {
    console.log('🔍 Analyzing Template-Blueprint Consistency...\n');

    // Find all template files
    const templateFiles = this.findTemplateFiles();
    console.log(`📁 Found ${templateFiles.length} template files\n`);

    for (const templateFile of templateFiles) {
      const result = await this.analyzeTemplate(templateFile);
      this.results.push(result);
    }

    this.generateReport();
  }

  private findTemplateFiles(): string[] {
    const templates: string[] = [];
    
    const scanDirectory = (dir: string): void => {
      const items = readdirSync(dir);
      
      for (const item of items) {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (item.endsWith('.tpl')) {
          templates.push(fullPath);
        }
      }
    };

    scanDirectory(this.marketplaceRoot);
    return templates;
  }

  private async analyzeTemplate(templateFile: string): Promise<AnalysisResult> {
    const relativePath = relative(this.marketplaceRoot, templateFile);
    console.log(`🔍 Analyzing: ${relativePath}`);

    // Extract template variables
    const templateVariables = this.extractTemplateVariables(templateFile);
    
    // Find corresponding blueprint
    const blueprintFile = this.findBlueprintFile(templateFile);
    
    let blueprintContext: BlueprintContext | null = null;
    if (blueprintFile) {
      blueprintContext = this.analyzeBlueprint(blueprintFile);
    }

    // Analyze consistency
    const issues = this.analyzeConsistency(templateVariables, blueprintContext);

    const status = blueprintFile ? (issues.missingInBlueprint.length > 0 || issues.orphanedInTemplate.length > 0 ? 'issues' : 'valid') : 'no_blueprint';

    return {
      template: relativePath,
      blueprint: blueprintFile ? relative(this.marketplaceRoot, blueprintFile) : 'NOT_FOUND',
      templateVariables,
      blueprintContext,
      issues,
      status
    };
  }

  private extractTemplateVariables(templateFile: string): TemplateVariable[] {
    const content = readFileSync(templateFile, 'utf-8');
    const lines = content.split('\n');
    const variables: TemplateVariable[] = [];

    const patterns = [
      { regex: /<%=?\s*module\.parameters\.([a-zA-Z_][a-zA-Z0-9_.]*)/g, type: 'module.parameters' as const },
      { regex: /<%=?\s*project\.([a-zA-Z_][a-zA-Z0-9_.]*)/g, type: 'project' as const },
      { regex: /<%=?\s*framework/g, type: 'framework' as const },
      { regex: /<%=?\s*context\.([a-zA-Z_][a-zA-Z0-9_.]*)/g, type: 'context' as const },
    ];

    lines.forEach((line, index) => {
      patterns.forEach(pattern => {
        let match;
        while ((match = pattern.regex.exec(line)) !== null) {
          const variable = match[1] || 'framework';
          variables.push({
            file: templateFile,
            line: index + 1,
            variable,
            type: pattern.type,
            context: line.trim()
          });
        }
      });
    });

    return variables;
  }

  private findBlueprintFile(templateFile: string): string | null {
    const templateDir = dirname(templateFile);
    const possibleNames = ['blueprint.ts', 'blueprint.js', 'index.ts', 'index.js'];
    
    for (const name of possibleNames) {
      const blueprintPath = join(templateDir, name);
      try {
        if (statSync(blueprintPath).isFile()) {
          return blueprintPath;
        }
      } catch {
        // File doesn't exist, continue
      }
    }

    // Check parent directories
    let currentDir = templateDir;
    while (currentDir !== this.marketplaceRoot && currentDir !== dirname(this.marketplaceRoot)) {
      for (const name of possibleNames) {
        const blueprintPath = join(currentDir, name);
        try {
          if (statSync(blueprintPath).isFile()) {
            return blueprintPath;
          }
        } catch {
          // File doesn't exist, continue
        }
      }
      currentDir = dirname(currentDir);
    }

    return null;
  }

  private analyzeBlueprint(blueprintFile: string): BlueprintContext {
    const content = readFileSync(blueprintFile, 'utf-8');
    
    // Extract context variables from blueprint
    const contextVariables: string[] = [];
    const contextStructure: Record<string, any> = {};

    // Look for context object creation patterns
    const contextPatterns = [
      /context:\s*\{([^}]+)\}/gs,
      /featureContext\s*=\s*\{([^}]+)\}/gs,
      /templateContext\s*=\s*\{([^}]+)\}/gs,
      /module:\s*\{[^}]*parameters:\s*\{([^}]+)\}/gs,
    ];

    contextPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const contextContent = match[1];
        
        // Extract variable names from context content
        const variableMatches = contextContent.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g);
        if (variableMatches) {
          variableMatches.forEach(vm => {
            const varName = vm.replace(':', '').trim();
            if (!contextVariables.includes(varName)) {
              contextVariables.push(varName);
            }
          });
        }
      }
    });

    return {
      file: blueprintFile,
      contextVariables,
      contextStructure
    };
  }

  private analyzeConsistency(templateVariables: TemplateVariable[], blueprintContext: BlueprintContext | null): AnalysisResult['issues'] {
    const issues = {
      missingInBlueprint: [] as string[],
      orphanedInTemplate: [] as string[],
      inconsistentNaming: [] as string[]
    };

    if (!blueprintContext) {
      return issues;
    }

    // Group template variables by type
    const moduleParams = templateVariables.filter(v => v.type === 'module.parameters');
    const projectVars = templateVariables.filter(v => v.type === 'project');
    const contextVars = templateVariables.filter(v => v.type === 'context');

    // Check module.parameters variables
    moduleParams.forEach(tv => {
      if (!blueprintContext.contextVariables.includes(tv.variable)) {
        issues.missingInBlueprint.push(`module.parameters.${tv.variable}`);
      }
    });

    // Check for orphaned blueprint variables (variables in blueprint but not used in template)
    const usedVariables = new Set(templateVariables.map(tv => tv.variable));
    blueprintContext.contextVariables.forEach(bv => {
      if (!usedVariables.has(bv)) {
        issues.orphanedInTemplate.push(bv);
      }
    });

    // Check for inconsistent naming patterns
    const expectedPatterns: Record<string, RegExp> = {
      'module.parameters': /^[a-zA-Z_][a-zA-Z0-9_]*$/,
      'project': /^[a-zA-Z_][a-zA-Z0-9_]*$/,
      'context': /^[a-zA-Z_][a-zA-Z0-9_]*$/
    };

    templateVariables.forEach(tv => {
      const pattern = expectedPatterns[tv.type];
      if (pattern && !pattern.test(tv.variable)) {
        issues.inconsistentNaming.push(`${tv.type}.${tv.variable}`);
      }
    });

    return issues;
  }

  private generateReport(): void {
    console.log('\n📊 TEMPLATE-BLUEPRINT CONSISTENCY REPORT\n');
    console.log('=' .repeat(80));

    const valid = this.results.filter(r => r.status === 'valid').length;
    const issues = this.results.filter(r => r.status === 'issues').length;
    const noBlueprint = this.results.filter(r => r.status === 'no_blueprint').length;

    console.log(`\n📈 SUMMARY:`);
    console.log(`  ✅ Valid: ${valid}`);
    console.log(`  ⚠️  Issues: ${issues}`);
    console.log(`  ❌ No Blueprint: ${noBlueprint}`);
    console.log(`  📁 Total: ${this.results.length}`);

    // Detailed results
    console.log(`\n📋 DETAILED RESULTS:\n`);

    this.results.forEach(result => {
      const statusIcon = result.status === 'valid' ? '✅' : result.status === 'issues' ? '⚠️' : '❌';
      console.log(`${statusIcon} ${result.template}`);
      console.log(`   Blueprint: ${result.blueprint}`);
      
      if (result.templateVariables.length > 0) {
        console.log(`   Template Variables (${result.templateVariables.length}):`);
        const grouped = this.groupVariablesByType(result.templateVariables);
        Object.entries(grouped).forEach(([type, vars]) => {
          console.log(`     ${type}: ${vars.map(v => v.variable).join(', ')}`);
        });
      }

      if (result.blueprintContext) {
        console.log(`   Blueprint Context (${result.blueprintContext.contextVariables.length}): ${result.blueprintContext.contextVariables.join(', ')}`);
      }

      if (result.issues.missingInBlueprint.length > 0) {
        console.log(`   ❌ Missing in Blueprint: ${result.issues.missingInBlueprint.join(', ')}`);
      }
      if (result.issues.orphanedInTemplate.length > 0) {
        console.log(`   ⚠️  Orphaned in Blueprint: ${result.issues.orphanedInTemplate.join(', ')}`);
      }
      if (result.issues.inconsistentNaming.length > 0) {
        console.log(`   🔧 Inconsistent Naming: ${result.issues.inconsistentNaming.join(', ')}`);
      }

      console.log('');
    });

    // Recommendations
    console.log('\n💡 RECOMMENDATIONS:\n');
    
    if (issues > 0) {
      console.log('🔧 Fix Template-Blueprint Inconsistencies:');
      this.results.filter(r => r.status === 'issues').forEach(result => {
        console.log(`   • ${result.template}: Update blueprint to provide missing variables`);
      });
    }

    if (noBlueprint > 0) {
      console.log('📝 Create Missing Blueprints:');
      this.results.filter(r => r.status === 'no_blueprint').forEach(result => {
        console.log(`   • ${result.template}: Create corresponding blueprint file`);
      });
    }

    console.log('\n🎯 Next Steps:');
    console.log('   1. Fix missing blueprint variables');
    console.log('   2. Remove orphaned blueprint variables');
    console.log('   3. Standardize variable naming conventions');
    console.log('   4. Create missing blueprint files');
  }

  private groupVariablesByType(variables: TemplateVariable[]): Record<string, TemplateVariable[]> {
    return variables.reduce((acc, variable) => {
      if (!acc[variable.type]) {
        acc[variable.type] = [];
      }
      acc[variable.type].push(variable);
      return acc;
    }, {} as Record<string, TemplateVariable[]>);
  }
}

// Main execution
async function main() {
  const analyzer = new TemplateBlueprintAnalyzer();
  await analyzer.analyze();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
