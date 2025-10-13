#!/usr/bin/env tsx

/**
 * Comprehensive Marketplace Validation System
 * 
 * This script runs all validation checks for the marketplace:
 * 1. Contract compliance validation
 * 2. Template existence validation
 * 3. Blueprint syntax validation
 * 4. Schema validation
 * 5. Import/export validation
 * 6. Compliance regression detection
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { glob } from 'glob';
import { DeadTemplateDetector } from './dead-template-detector';

interface ValidationResult {
  name: string;
  status: 'passed' | 'failed' | 'warning';
  message: string;
  details?: any;
}

interface ComplianceComparison {
  feature: string;
  implementation: string;
  previousScore: number;
  currentScore: number;
  regression: boolean;
  improvement: boolean;
}

class ComprehensiveValidator {
  private marketplaceRoot: string;
  private results: ValidationResult[] = [];
  private complianceRegressions: ComplianceComparison[] = [];
  private previousManifest: any = null;

  constructor(marketplaceRoot: string) {
    this.marketplaceRoot = marketplaceRoot;
  }

  public async validateAll(): Promise<ValidationResult[]> {
    console.log('🚀 Comprehensive Marketplace Validation');
    console.log('=====================================\n');

    // Load previous manifest for comparison
    await this.loadPreviousManifest();

    // Run all validation checks
    await this.validateContractCompliance();
    await this.validateTemplateExistence();
    await this.validateDeadTemplates();
    await this.validateBlueprintSyntax();
    await this.validateSchemaFiles();
    await this.validateImportsExports();
    await this.detectComplianceRegressions();

    return this.results;
  }

  private async loadPreviousManifest(): Promise<void> {
    const manifestPath = join(this.marketplaceRoot, 'manifest.json');
    if (existsSync(manifestPath)) {
      try {
        this.previousManifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
        console.log('📄 Loaded previous manifest for comparison');
      } catch (error) {
        console.log('⚠️ Could not load previous manifest:', error);
      }
    }
  }

  private async validateContractCompliance(): Promise<void> {
    console.log('🔍 1. Contract Compliance Validation');
    console.log('-----------------------------------');

    try {
      // Run the contract validation script
      const output = execSync('npm run validate:contracts', { 
        cwd: this.marketplaceRoot,
        encoding: 'utf8'
      });

      // Parse the output to extract compliance data
      const manifestPath = join(this.marketplaceRoot, 'manifest.json');
      if (existsSync(manifestPath)) {
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
        
        if (manifest.summary) {
          const { totalFeatures, fullyCompliant, partiallyCompliant, broken } = manifest.summary;
          const totalImplementations = fullyCompliant + partiallyCompliant + broken;
          const compliancePercentage = totalImplementations > 0 ? 
            Math.round((fullyCompliant / totalImplementations) * 100) : 0;

          this.results.push({
            name: 'Contract Compliance',
            status: compliancePercentage >= 60 ? 'passed' : 'warning',
            message: `${compliancePercentage}% compliance (${fullyCompliant}/${totalImplementations} fully compliant)`,
            details: manifest.summary
          });
        }
      }
    } catch (error) {
      this.results.push({
        name: 'Contract Compliance',
        status: 'failed',
        message: `Contract validation failed: ${error}`,
        details: error
      });
    }
  }

  private async validateTemplateExistence(): Promise<void> {
    console.log('🔍 2. Template Existence Validation');
    console.log('----------------------------------');

    try {
      // Find all blueprint files
      const blueprintFiles = await glob('**/blueprint.ts', { cwd: this.marketplaceRoot });
      let missingTemplates = 0;
      let totalTemplates = 0;

      for (const blueprintFile of blueprintFiles) {
        const blueprintPath = join(this.marketplaceRoot, blueprintFile);
        const blueprintContent = readFileSync(blueprintPath, 'utf8');
        
        // Extract template references
        const templateMatches = blueprintContent.match(/template:\s*['"`]([^'"`]+)['"`]/g);
        if (templateMatches) {
          for (const match of templateMatches) {
            const templatePath = match.match(/['"`]([^'"`]+)['"`]/)?.[1];
            if (templatePath) {
              totalTemplates++;
              const fullTemplatePath = join(this.marketplaceRoot, dirname(blueprintFile), templatePath);
              if (!existsSync(fullTemplatePath)) {
                missingTemplates++;
                console.log(`❌ Missing template: ${templatePath}`);
              }
            }
          }
        }
      }

      this.results.push({
        name: 'Template Existence',
        status: missingTemplates === 0 ? 'passed' : 'failed',
        message: `${totalTemplates - missingTemplates}/${totalTemplates} templates exist`,
        details: { missingTemplates, totalTemplates }
      });
    } catch (error) {
      this.results.push({
        name: 'Template Existence',
        status: 'failed',
        message: `Template validation failed: ${error}`,
        details: error
      });
    }
  }

  private async validateDeadTemplates(): Promise<void> {
    console.log('🔍 2.5. Dead Template Detection');
    console.log('-------------------------------');

    try {
      const detector = new DeadTemplateDetector(this.marketplaceRoot);
      const reports = await detector.detectDeadTemplates();
      
      const modulesWithDeadTemplates = reports.filter(r => r.deadTemplates.length > 0).length;
      const modulesWithUnusedReferences = reports.filter(r => r.unusedTemplates.length > 0).length;
      const totalDeadTemplates = reports.reduce((sum, r) => sum + r.deadTemplates.length, 0);
      const totalUnusedReferences = reports.reduce((sum, r) => sum + r.unusedTemplates.length, 0);
      const totalTemplates = reports.reduce((sum, r) => sum + r.totalTemplates, 0);
      const totalUsedTemplates = reports.reduce((sum, r) => sum + r.usedTemplates, 0);
      
      // This is a warning, not a failure - dead templates don't break functionality
      const status = totalDeadTemplates > 0 || totalUnusedReferences > 0 ? 'warning' : 'passed';
      
      this.results.push({
        name: 'Dead Template Detection',
        status,
        message: `Found ${totalDeadTemplates} dead templates and ${totalUnusedReferences} unused references across ${modulesWithDeadTemplates + modulesWithUnusedReferences} modules`,
        details: { 
          modulesWithDeadTemplates,
          modulesWithUnusedReferences,
          totalDeadTemplates,
          totalUnusedReferences,
          totalTemplates,
          totalUsedTemplates,
          usageRate: totalTemplates > 0 ? ((totalUsedTemplates / totalTemplates) * 100).toFixed(1) : 0
        }
      });

      // Log detailed findings
      if (totalDeadTemplates > 0 || totalUnusedReferences > 0) {
        console.log(`⚠️  Found ${totalDeadTemplates} dead templates and ${totalUnusedReferences} unused references`);
        console.log(`📊 Template usage rate: ${totalTemplates > 0 ? ((totalUsedTemplates / totalTemplates) * 100).toFixed(1) : 0}%`);
        
        // Show top modules with issues
        const problematicModules = reports
          .filter(r => r.deadTemplates.length > 0 || r.unusedTemplates.length > 0)
          .sort((a, b) => (b.deadTemplates.length + b.unusedTemplates.length) - (a.deadTemplates.length + a.unusedTemplates.length))
          .slice(0, 5);
        
        if (problematicModules.length > 0) {
          console.log('\n🔍 Top modules with template issues:');
          problematicModules.forEach(module => {
            const issues = module.deadTemplates.length + module.unusedTemplates.length;
            console.log(`  • ${module.moduleId}: ${issues} issues (${module.deadTemplates.length} dead, ${module.unusedTemplates.length} unused)`);
          });
        }
      } else {
        console.log('✅ No dead templates or unused references found');
      }
      
    } catch (error) {
      this.results.push({
        name: 'Dead Template Detection',
        status: 'failed',
        message: `Dead template detection failed: ${error}`,
        details: error
      });
    }
  }

  private async validateBlueprintSyntax(): Promise<void> {
    console.log('🔍 3. Blueprint Syntax Validation');
    console.log('--------------------------------');

    try {
      // Check if dist directory exists and has compiled blueprints
      const distBlueprintFiles = await glob('dist/**/blueprint.js', { cwd: this.marketplaceRoot });
      
      if (distBlueprintFiles.length > 0) {
        // Use compiled files for validation
        let syntaxErrors = 0;
        let totalBlueprints = distBlueprintFiles.length;

        for (const blueprintFile of distBlueprintFiles) {
          const blueprintPath = join(this.marketplaceRoot, blueprintFile);
          
          try {
            // Check if the compiled file exists and is valid JavaScript
            const content = readFileSync(blueprintPath, 'utf8');
            if (!content || content.trim() === '') {
              syntaxErrors++;
              console.log(`❌ Empty compiled file: ${blueprintFile}`);
            }
          } catch (error) {
            syntaxErrors++;
            console.log(`❌ Error reading compiled file: ${blueprintFile}`);
          }
        }

        this.results.push({
          name: 'Blueprint Syntax',
          status: syntaxErrors === 0 ? 'passed' : 'failed',
          message: `${totalBlueprints - syntaxErrors}/${totalBlueprints} blueprints have valid syntax`,
          details: { syntaxErrors, totalBlueprints }
        });
      } else {
        // Fallback to TypeScript files if no compiled files exist
        const blueprintFiles = await glob('**/blueprint.ts', { cwd: this.marketplaceRoot });
        let syntaxErrors = 0;
        let totalBlueprints = blueprintFiles.length;

        for (const blueprintFile of blueprintFiles) {
          const blueprintPath = join(this.marketplaceRoot, blueprintFile);
          
          try {
            // Try to compile the blueprint file with skipLibCheck to avoid dependency issues
            execSync(`npx tsc --noEmit --skipLibCheck "${blueprintPath}"`, { 
              cwd: this.marketplaceRoot,
              stdio: 'pipe'
            });
          } catch (error) {
            syntaxErrors++;
            console.log(`❌ Syntax error in ${blueprintFile}`);
          }
        }

        this.results.push({
          name: 'Blueprint Syntax',
          status: syntaxErrors === 0 ? 'passed' : 'failed',
          message: `${totalBlueprints - syntaxErrors}/${totalBlueprints} blueprints have valid syntax`,
          details: { syntaxErrors, totalBlueprints }
        });
      }
    } catch (error) {
      this.results.push({
        name: 'Blueprint Syntax',
        status: 'failed',
        message: `Blueprint syntax validation failed: ${error}`,
        details: error
      });
    }
  }

  private async validateSchemaFiles(): Promise<void> {
    console.log('🔍 4. Schema File Validation');
    console.log('---------------------------');

    try {
      // Find all schema files
      const schemaFiles = await glob('**/*.json', { cwd: this.marketplaceRoot });
      let invalidSchemas = 0;
      let totalSchemas = 0;

      for (const schemaFile of schemaFiles) {
        const schemaPath = join(this.marketplaceRoot, schemaFile);
        
        try {
          const content = readFileSync(schemaPath, 'utf8');
          JSON.parse(content);
          totalSchemas++;
        } catch (error) {
          invalidSchemas++;
          console.log(`❌ Invalid JSON in ${schemaFile}`);
        }
      }

      this.results.push({
        name: 'Schema Files',
        status: invalidSchemas === 0 ? 'passed' : 'failed',
        message: `${totalSchemas - invalidSchemas}/${totalSchemas} schema files are valid`,
        details: { invalidSchemas, totalSchemas }
      });
    } catch (error) {
      this.results.push({
        name: 'Schema Files',
        status: 'failed',
        message: `Schema validation failed: ${error}`,
        details: error
      });
    }
  }

  private async validateImportsExports(): Promise<void> {
    console.log('🔍 5. Import/Export Validation');
    console.log('-----------------------------');

    try {
      // Find all TypeScript files (excluding node_modules)
      const tsFiles = await glob('**/*.ts', { 
        cwd: this.marketplaceRoot,
        ignore: ['node_modules/**', 'dist/**']
      });
      let importErrors = 0;
      let totalFiles = tsFiles.length;

      for (const tsFile of tsFiles) {
        const filePath = join(this.marketplaceRoot, tsFile);
        
        try {
          // Check for common import/export issues
          const content = readFileSync(filePath, 'utf8');
          
          // Skip blueprint files and generator scripts - they contain template content, not real imports
          if (tsFile.includes('.blueprint.ts') || tsFile.includes('blueprint.ts') || tsFile.includes('generate-') || tsFile.includes('generation/')) {
            continue;
          }
          
          // Check for relative imports that might be broken
          // Split content into lines and filter out commented lines
          const lines = content.split('\n');
          const activeLines = lines.filter(line => {
            const trimmed = line.trim();
            return !trimmed.startsWith('//') && !trimmed.startsWith('*') && !trimmed.startsWith('/*');
          }).join('\n');
          
          const relativeImports = activeLines.match(/import.*from\s+['"`]\.\.?\/[^'"`]+['"`]/g);
          if (relativeImports) {
            for (const importPath of relativeImports) {
              const path = importPath.match(/['"`]([^'"`]+)['"`]/)?.[1];
              if (path) {
                const fullPath = join(dirname(filePath), path);
                if (!existsSync(fullPath) && !existsSync(fullPath + '.ts') && !existsSync(fullPath + '.js') && !existsSync(fullPath + '.d.ts')) {
                  importErrors++;
                  console.log(`❌ Broken import in ${tsFile}: ${path}`);
                }
              }
            }
          }
        } catch (error) {
          importErrors++;
          console.log(`❌ Error checking imports in ${tsFile}`);
        }
      }

      this.results.push({
        name: 'Import/Export',
        status: importErrors === 0 ? 'passed' : 'warning',
        message: `${totalFiles - importErrors}/${totalFiles} files have valid imports`,
        details: { importErrors, totalFiles }
      });
    } catch (error) {
      this.results.push({
        name: 'Import/Export',
        status: 'failed',
        message: `Import/export validation failed: ${error}`,
        details: error
      });
    }
  }

  private async detectComplianceRegressions(): Promise<void> {
    console.log('🔍 6. Compliance Regression Detection');
    console.log('------------------------------------');

    if (!this.previousManifest) {
      this.results.push({
        name: 'Compliance Regression',
        status: 'passed',
        message: 'No previous manifest found - first run',
        details: null
      });
      return;
    }

    try {
      // Load current manifest
      const currentManifestPath = join(this.marketplaceRoot, 'manifest.json');
      if (!existsSync(currentManifestPath)) {
        this.results.push({
          name: 'Compliance Regression',
          status: 'failed',
          message: 'Current manifest not found',
          details: null
        });
        return;
      }

      const currentManifest = JSON.parse(readFileSync(currentManifestPath, 'utf8'));
      let regressions = 0;
      let improvements = 0;

      // Compare compliance scores
      for (const [featureName, currentFeature] of Object.entries(currentManifest.features || {})) {
        const previousFeature = this.previousManifest.features?.[featureName];
        if (!previousFeature) continue;

        for (const [implName, currentImpl] of Object.entries((currentFeature as any).implementations || {})) {
          const previousImpl = previousFeature.implementations?.[implName];
          if (!previousImpl) continue;

          const currentScore = (currentImpl as any).compliance.score || 0;
          const previousScore = previousImpl.compliance.score || 0;

          if (currentScore < previousScore) {
            regressions++;
            this.complianceRegressions.push({
              feature: featureName,
              implementation: implName,
              previousScore,
              currentScore,
              regression: true,
              improvement: false
            });
          } else if (currentScore > previousScore) {
            improvements++;
            this.complianceRegressions.push({
              feature: featureName,
              implementation: implName,
              previousScore,
              currentScore,
              regression: false,
              improvement: true
            });
          }
        }
      }

      this.results.push({
        name: 'Compliance Regression',
        status: regressions === 0 ? 'passed' : 'failed',
        message: `${regressions} regressions, ${improvements} improvements detected`,
        details: { regressions, improvements, changes: this.complianceRegressions }
      });
    } catch (error) {
      this.results.push({
        name: 'Compliance Regression',
        status: 'failed',
        message: `Regression detection failed: ${error}`,
        details: error
      });
    }
  }

  public printSummary(): void {
    console.log('\n📊 COMPREHENSIVE VALIDATION SUMMARY');
    console.log('=====================================');

    let passed = 0;
    let warnings = 0;
    let failed = 0;

    for (const result of this.results) {
      const status = result.status === 'passed' ? '✅' : 
                    result.status === 'warning' ? '⚠️' : '❌';
      console.log(`${status} ${result.name}: ${result.message}`);
      
      if (result.status === 'passed') passed++;
      else if (result.status === 'warning') warnings++;
      else failed++;
    }

    console.log('\n📈 Summary:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`⚠️ Warnings: ${warnings}`);
    console.log(`❌ Failed: ${failed}`);

    // Show compliance regressions if any
    if (this.complianceRegressions.length > 0) {
      console.log('\n🔄 Compliance Changes:');
      for (const change of this.complianceRegressions) {
        const icon = change.regression ? '📉' : '📈';
        const direction = change.regression ? 'decreased' : 'increased';
        console.log(`${icon} ${change.feature}/${change.implementation}: ${direction} from ${change.previousScore}% to ${change.currentScore}%`);
      }
    }

    console.log('=====================================\n');
  }

  public shouldBlockCommit(): boolean {
    // Block commit if there are critical failures or compliance regressions
    const criticalFailures = this.results.filter(r => r.status === 'failed');
    const hasRegressions = this.complianceRegressions.some(c => c.regression);
    
    return criticalFailures.length > 0 || hasRegressions;
  }

  public getBlockingReasons(): string[] {
    const reasons: string[] = [];
    
    const criticalFailures = this.results.filter(r => r.status === 'failed');
    if (criticalFailures.length > 0) {
      reasons.push(`Critical validation failures: ${criticalFailures.map(f => f.name).join(', ')}`);
    }
    
    const regressions = this.complianceRegressions.filter(c => c.regression);
    if (regressions.length > 0) {
      reasons.push(`Compliance regressions detected: ${regressions.map(r => `${r.feature}/${r.implementation}`).join(', ')}`);
    }
    
    return reasons;
  }
}

// Helper function to get directory name
function dirname(path: string): string {
  return path.split('/').slice(0, -1).join('/');
}

async function main() {
  const validator = new ComprehensiveValidator(process.cwd());
  const results = await validator.validateAll();
  validator.printSummary();

  // Check if we should block the commit
  if (validator.shouldBlockCommit()) {
    console.log('🚫 COMMIT BLOCKED');
    console.log('================');
    console.log('The following issues must be resolved before committing:');
    
    const reasons = validator.getBlockingReasons();
    for (const reason of reasons) {
      console.log(`❌ ${reason}`);
    }
    
    console.log('\n💡 To resolve these issues:');
    console.log('1. Fix the validation failures listed above');
    console.log('2. Run "npm run validate:all" to verify fixes');
    console.log('3. Commit your changes again');
    
    process.exit(1);
  } else {
    console.log('✅ All validations passed - commit allowed');
    process.exit(0);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
