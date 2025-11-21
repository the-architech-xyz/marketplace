#!/usr/bin/env tsx

/**
 * Smart Contract Correctness Validator
 * 
 * This validator implements the new "correctness over completeness" philosophy:
 * 1. Reads contract definitions from auto-generated schema.json files
 * 2. Analyzes frontend implementations for proper data access patterns
 * 3. Validates that UI uses contract hooks, not direct API calls
 * 4. Checks naming consistency and type usage
 * 5. Reports on correctness, not completeness
 */

import { Project, SourceFile, ImportDeclaration, CallExpression, SyntaxKind } from 'ts-morph';
import { readFileSync, existsSync } from 'fs';
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

interface CorrectnessViolation {
  type: 'import_violation' | 'naming_violation' | 'type_violation' | 'data_access_violation' | 'contract_violation';
  severity: 'error' | 'warning';
  message: string;
  file: string;
  line?: number;
  details?: any;
}

interface CorrectnessReport {
  feature: string;
  implementation: string;
  violations: CorrectnessViolation[];
  score: number;
  status: 'compliant' | 'partial' | 'non_compliant';
}

class ContractCorrectnessValidator {
  private project: Project;
  private marketplaceRoot: string;
  private reports: CorrectnessReport[] = [];

  constructor(marketplaceRoot: string) {
    this.marketplaceRoot = marketplaceRoot;
    this.project = new Project({
      tsConfigFilePath: join(marketplaceRoot, 'tsconfig.json'),
    });
  }

  public async validateAllFeatures(onlyChanged: boolean = false): Promise<CorrectnessReport[]> {
    console.log('🔍 Smart Contract Correctness Validator');
    console.log('========================================\n');

    let contractFiles: string[];
    
    if (onlyChanged) {
      // Only validate changed features (optimization)
      contractFiles = await this.getChangedContractFiles();
      console.log(`📁 Found ${contractFiles.length} changed features with contracts:`);
    } else {
      // Find all features with contracts
      contractFiles = await glob('features/*/contract.ts', { cwd: this.marketplaceRoot });
      console.log(`📁 Found ${contractFiles.length} features with contracts:`);
    }
    
    for (const contractFile of contractFiles) {
      console.log(`  - ${contractFile}`);
    }
    console.log('');

    for (const contractFile of contractFiles) {
      await this.validateFeature(contractFile);
    }

    this.printSummary();
    return this.reports;
  }

  private async getChangedContractFiles(): Promise<string[]> {
    // Get git status to find changed files
    const { execSync } = require('child_process');
    
    try {
      // Get changed files from git
      const changedFiles = execSync('git diff --name-only HEAD~1 HEAD', { 
        cwd: this.marketplaceRoot,
        encoding: 'utf8' 
      }).split('\n').filter(Boolean);

      // Filter for contract files and their related features
      const changedContractFiles: string[] = [];
      const changedFeatures = new Set<string>();

      for (const file of changedFiles) {
        if (file.includes('features/') && file.includes('contract.ts')) {
          changedContractFiles.push(file);
        } else if (file.includes('features/')) {
          // Extract feature name from any changed file in features/
          const featureMatch = file.match(/features\/([^\/]+)\//);
          if (featureMatch) {
            changedFeatures.add(featureMatch[1]);
          }
        }
      }

      // Add contract files for changed features
      for (const feature of changedFeatures) {
        const contractFile = `features/${feature}/contract.ts`;
        if (!changedContractFiles.includes(contractFile)) {
          changedContractFiles.push(contractFile);
        }
      }

      return changedContractFiles;
    } catch (error) {
      console.log('⚠️ Could not determine changed files, validating all features');
      return await glob('features/*/contract.ts', { cwd: this.marketplaceRoot });
    }
  }

  private async validateFeature(contractPath: string): Promise<void> {
    const featureName = basename(dirname(contractPath));
    console.log(`🔍 Validating feature: ${featureName}`);

    // Find all implementations for this feature
    const implementations = await this.findFeatureImplementations(featureName);
    
    for (const implementation of implementations) {
      await this.validateImplementation(featureName, implementation);
    }
  }

  private async findFeatureImplementations(featureName: string): Promise<string[]> {
    const patterns = [
      `features/${featureName}/backend/*`,
      `features/${featureName}/frontend/*`
    ];
    
    const implementations: string[] = [];
    
    for (const pattern of patterns) {
      const matches = await glob(pattern, { cwd: this.marketplaceRoot });
      implementations.push(...matches);
    }
    
    return implementations;
  }

  private async validateImplementation(featureName: string, implementationPath: string): Promise<void> {
    const implementationType = implementationPath.includes('/backend/') ? 'backend' : 'frontend';
    const implementationName = basename(implementationPath);
    
    console.log(`  🏗️ Validating ${implementationType}: ${implementationName}`);

    const violations: CorrectnessViolation[] = [];

    if (implementationType === 'backend') {
      // Validate backend implementation
      await this.validateBackendImplementation(implementationPath, violations);
    } else {
      // Validate frontend implementation
      await this.validateFrontendImplementation(implementationPath, violations);
    }

    // Calculate correctness score
    const score = this.calculateCorrectnessScore(violations);
    const status = this.determineComplianceStatus(score, violations);

    const report: CorrectnessReport = {
      feature: featureName,
      implementation: `${implementationType}/${implementationName}`,
      violations,
      score,
      status
    };

    this.reports.push(report);

    console.log(`    📊 Score: ${score}% (${status})`);
    if (violations.length > 0) {
      console.log(`    ⚠️ ${violations.length} violations found`);
    }
  }

  private async validateBackendImplementation(backendPath: string, violations: CorrectnessViolation[]): Promise<void> {
    // Check if schema.json exists and has contract
    const schemaPath = join(this.marketplaceRoot, backendPath, 'schema.json');
    
    if (!existsSync(schemaPath)) {
      violations.push({
        type: 'import_violation',
        severity: 'error',
        message: 'Missing schema.json file',
        file: schemaPath
      });
      return;
    }

    try {
      const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
      
      // Contract is optional for backend-connector role (data sync services)
      // Contract is required for backend-feature role (full backend implementations)
      if (!schema.contract) {
        if (schema.role === 'backend-connector') {
          // backend-connector is just a data sync service, doesn't need frontend contract
          console.log(`⚠️  Backend connector ${backendPath} has no contract (optional for data sync services)`);
          return;
        } else {
          violations.push({
            type: 'import_violation',
            severity: 'error',
            message: 'Backend feature missing contract definition',
            file: schemaPath
          });
          return;
        }
      }

      // Validate that backend implements contract hooks
      await this.validateBackendHooks(backendPath, schema.contract, violations);

    } catch (error) {
      violations.push({
        type: 'import_violation',
        severity: 'error',
        message: `Invalid schema.json: ${error}`,
        file: schemaPath
      });
    }
  }

  private async validateBackendHooks(backendPath: string, contract: SchemaContract, violations: CorrectnessViolation[]): Promise<void> {
    // Find blueprint.ts file
    const blueprintPath = join(this.marketplaceRoot, backendPath, 'blueprint.ts');
    
    if (!existsSync(blueprintPath)) {
      violations.push({
        type: 'import_violation',
        severity: 'error',
        message: 'Missing blueprint.ts file',
        file: blueprintPath
      });
      return;
    }

    // Parse blueprint to find template references
    const sourceFile = this.project.addSourceFileAtPath(blueprintPath);
    const templates = this.extractTemplatesFromBlueprint(sourceFile);

    // UPDATED: New architecture has services in tech-stack, not backend
    // Backend should have pure API templates (e.g., *-api.ts.tpl)
    // Services are now in tech-stack layer (e.g., TeamsService.ts.tpl)
    
    // Check if we have API templates (pure server functions)
    const hasApiTemplate = templates.some(template => 
      template.toLowerCase().includes('api') && 
      template.toLowerCase().includes('.ts.tpl')
    );

    // Note: Service templates are intentionally in tech-stack, not backend
    // This validates the new "pure backend" architecture
    if (!hasApiTemplate && templates.length > 0) {
      // Only warn if there are templates but none are API templates
      // Some backends might have other valid templates (routes, types, etc.)
      violations.push({
        type: 'contract_violation',
        severity: 'warning',
        message: 'Backend should have pure API templates (e.g., *-api.ts.tpl) - services belong in tech-stack',
        file: blueprintPath,
        details: { availableTemplates: templates }
      });
    }

    // Validate each template actually implements the contract
    for (const template of templates) {
      await this.validateTemplateContent(backendPath, template, contract, violations);
    }
  }

  private async validateTemplateContent(backendPath: string, templatePath: string, contract: SchemaContract, violations: CorrectnessViolation[]): Promise<void> {
    // Template path already includes 'templates/' prefix from blueprint extraction
    const fullTemplatePath = join(this.marketplaceRoot, backendPath, templatePath);
    
    if (!existsSync(fullTemplatePath)) {
      violations.push({
        type: 'import_violation',
        severity: 'error',
        message: `Template file not found: ${templatePath}`,
        file: fullTemplatePath
      });
      return;
    }

    try {
      const templateContent = readFileSync(fullTemplatePath, 'utf8');
      
      // Check if template implements the cohesive service pattern
      if (templatePath.toLowerCase().includes('service')) {
        await this.validateServiceTemplate(templateContent, contract, violations);
      } else {
        // Check if it's an old granular template (violation)
        if (this.isGranularTemplate(templateContent)) {
          violations.push({
            type: 'contract_violation',
            severity: 'error',
            message: `Template uses old granular approach instead of cohesive service: ${templatePath}`,
            file: fullTemplatePath,
            details: { templatePath }
          });
        }
      }
    } catch (error) {
      violations.push({
        type: 'import_violation',
        severity: 'error',
        message: `Error reading template: ${error}`,
        file: fullTemplatePath
      });
    }
  }

  private async validateServiceTemplate(templateContent: string, contract: SchemaContract, violations: CorrectnessViolation[]): Promise<void> {
    // Check if template exports a service object
    if (!templateContent.includes('export const') || !templateContent.includes('Service')) {
      violations.push({
        type: 'contract_violation',
        severity: 'error',
        message: 'Service template should export a cohesive service object',
        file: 'template',
        details: { templateContent: templateContent.substring(0, 200) }
      });
      return;
    }

    // Check if template implements the contract interface
    const serviceInterfaceName = Object.keys(contract.hooks).find(hook => hook.startsWith('I') && hook.endsWith('Service'));
    if (serviceInterfaceName && !templateContent.includes(serviceInterfaceName)) {
      violations.push({
        type: 'contract_violation',
        severity: 'error',
        message: `Service template should implement ${serviceInterfaceName} interface`,
        file: 'template',
        details: { expectedInterface: serviceInterfaceName }
      });
    }

    // Check if template has cohesive service methods
    const hasCohesiveMethods = contract.hooks && Object.keys(contract.hooks).some(hookName => {
      const methodName = hookName.replace('use', '').toLowerCase();
      return templateContent.toLowerCase().includes(methodName) && 
             (templateContent.includes('() => ({') || templateContent.includes(': () => {')) && 
             // Check for any cohesive service pattern (CRUD or business-specific)
             (templateContent.includes('list:') || templateContent.includes('const list =') ||
              templateContent.includes('get:') || templateContent.includes('const get =') ||
              templateContent.includes('create:') || templateContent.includes('const create =') ||
              templateContent.includes('signIn:') || templateContent.includes('const signIn =') ||
              templateContent.includes('send:') || templateContent.includes('const send ='));
    });

    if (!hasCohesiveMethods) {
      violations.push({
        type: 'contract_violation',
        severity: 'error',
        message: 'Service template should implement cohesive methods with list/create/update/delete patterns',
        file: 'template',
        details: { templateContent: templateContent.substring(0, 200) }
      });
    }
  }

  private isGranularTemplate(templateContent: string): boolean {
    // Check for old granular patterns
    const granularPatterns = [
      'export const use',
      'useQuery(',
      'useMutation(',
      'queryKey: [',
      'mutationFn:'
    ];

    return granularPatterns.some(pattern => templateContent.includes(pattern));
  }

  private async validateFrontendImplementation(frontendPath: string, violations: CorrectnessViolation[]): Promise<void> {
    // Find all TypeScript files in frontend
    const tsFiles = await glob('**/*.ts', { cwd: frontendPath });
    const tsxFiles = await glob('**/*.tsx', { cwd: frontendPath });
    const allFiles = [...tsFiles, ...tsxFiles];

    for (const file of allFiles) {
      const fullPath = join(this.marketplaceRoot, frontendPath, file);
      await this.validateFrontendFile(fullPath, violations);
    }
  }

  private async validateFrontendFile(filePath: string, violations: CorrectnessViolation[]): Promise<void> {
    if (!existsSync(filePath)) return;

    try {
      const sourceFile = this.project.addSourceFileAtPath(filePath);
      
      // Check imports
      await this.validateImports(sourceFile, violations);
      
      // Check data access patterns
      await this.validateDataAccess(sourceFile, violations);
      
      // Check type usage
      await this.validateTypeUsage(sourceFile, violations);

    } catch (error) {
      violations.push({
        type: 'import_violation',
        severity: 'error',
        message: `Error parsing file: ${error}`,
        file: filePath
      });
    }
  }

  private async validateImports(sourceFile: SourceFile, violations: CorrectnessViolation[]): Promise<void> {
    const importDeclarations = sourceFile.getImportDeclarations();
    
    for (const importDecl of importDeclarations) {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();
      
      // Check for direct API imports (violation)
      if (moduleSpecifier.includes('/api/') || moduleSpecifier.includes('fetch') || moduleSpecifier.includes('axios')) {
        violations.push({
          type: 'data_access_violation',
          severity: 'error',
          message: `Direct API import detected: ${moduleSpecifier}`,
          file: sourceFile.getFilePath(),
          line: importDecl.getStartLineNumber(),
          details: { moduleSpecifier }
        });
      }

      // Check for contract imports (good)
      if (moduleSpecifier.includes('contract') || moduleSpecifier.includes('types')) {
        // This is good - importing from contract
        continue;
      }
    }
  }

  private async validateDataAccess(sourceFile: SourceFile, violations: CorrectnessViolation[]): Promise<void> {
    // Look for direct API calls
    const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);
    
    for (const callExpr of callExpressions) {
      const expression = callExpr.getExpression();
      const expressionText = expression.getText();
      
      // Check for fetch calls
      if (expressionText.includes('fetch') || expressionText.includes('axios')) {
        violations.push({
          type: 'data_access_violation',
          severity: 'error',
          message: `Direct API call detected: ${expressionText}`,
          file: sourceFile.getFilePath(),
          line: callExpr.getStartLineNumber(),
          details: { expression: expressionText }
        });
      }
    }
  }

  private async validateTypeUsage(sourceFile: SourceFile, violations: CorrectnessViolation[]): Promise<void> {
    // This would check if the file uses contract-defined types
    // For now, we'll implement a basic check
    const text = sourceFile.getText();
    
    // Look for type imports and usage
    if (text.includes('import') && text.includes('type')) {
      // Check if types are imported from contract
      const importLines = text.split('\n').filter(line => line.includes('import') && line.includes('type'));
      
      for (const importLine of importLines) {
        if (!importLine.includes('contract') && !importLine.includes('types')) {
          violations.push({
            type: 'type_violation',
            severity: 'warning',
            message: `Type import not from contract: ${importLine.trim()}`,
            file: sourceFile.getFilePath(),
            details: { importLine: importLine.trim() }
          });
        }
      }
    }
  }

  private extractTemplatesFromBlueprint(sourceFile: SourceFile): string[] {
    const templates: string[] = [];
    
    // Modern blueprints export a generateBlueprint function, old ones have a blueprint variable
    const blueprintVar = sourceFile.getVariableDeclarations().find(v => v.getName() === 'blueprint');
    const generateBlueprintFunc = sourceFile.getFunctions().find(f => f.getName() === 'generateBlueprint');
    const helperFunctions = sourceFile.getFunctions().filter(f => f.getName()?.startsWith('generate'));
    
    // Extract from old blueprint variable format
    if (blueprintVar) {
      const initializer = blueprintVar.getInitializer();
      if (initializer) {
        const templateMatches = initializer.getText().match(/template:\s*['"`]([^'"`]+)['"`]/g);
        if (templateMatches) {
          for (const match of templateMatches) {
            const templatePath = match.match(/['"`]([^'"`]+)['"`]/)?.[1];
            if (templatePath) {
              templates.push(templatePath);
            }
          }
        }
      }
    }
    
    // Extract from modern generateBlueprint function and helper functions
    if (generateBlueprintFunc || helperFunctions.length > 0) {
      const allFunctions = [generateBlueprintFunc, ...helperFunctions].filter(f => f);
      
      for (const func of allFunctions) {
        if (func) {
          const functionText = func.getText();
          const templateMatches = functionText.match(/template:\s*['"`]([^'"`]+)['"`]/g);
          if (templateMatches) {
            for (const match of templateMatches) {
              const templatePath = match.match(/['"`]([^'"`]+)['"`]/)?.[1];
              if (templatePath) {
                templates.push(templatePath);
              }
            }
          }
        }
      }
    }
    
    return templates;
  }

  private calculateCorrectnessScore(violations: CorrectnessViolation[]): number {
    if (violations.length === 0) return 100;
    
    const errorCount = violations.filter(v => v.severity === 'error').length;
    const warningCount = violations.filter(v => v.severity === 'warning').length;
    
    // Calculate score: errors are more penalizing than warnings
    const errorPenalty = errorCount * 20; // 20 points per error
    const warningPenalty = warningCount * 5; // 5 points per warning
    
    return Math.max(0, 100 - errorPenalty - warningPenalty);
  }

  private determineComplianceStatus(score: number, violations: CorrectnessViolation[]): 'compliant' | 'partial' | 'non_compliant' {
    const errorCount = violations.filter(v => v.severity === 'error').length;
    
    if (errorCount > 0) return 'non_compliant';
    if (score >= 80) return 'compliant';
    return 'partial';
  }

  private printSummary(): void {
    console.log('\n📊 CORRECTNESS VALIDATION SUMMARY');
    console.log('===================================');

    let compliant = 0;
    let partial = 0;
    let nonCompliant = 0;

    for (const report of this.reports) {
      const status = report.status === 'compliant' ? '✅' : 
                    report.status === 'partial' ? '⚠️' : '❌';
      console.log(`${status} ${report.feature}/${report.implementation}: ${report.score}% (${report.violations.length} violations)`);
      
      if (report.status === 'compliant') compliant++;
      else if (report.status === 'partial') partial++;
      else nonCompliant++;
    }

    console.log('\n📈 Summary:');
    console.log(`✅ Compliant: ${compliant}`);
    console.log(`⚠️ Partial: ${partial}`);
    console.log(`❌ Non-compliant: ${nonCompliant}`);

    // Show critical violations
    const criticalViolations = this.reports
      .flatMap(r => r.violations)
      .filter(v => v.severity === 'error');

    if (criticalViolations.length > 0) {
      console.log('\n🚨 Critical Violations:');
      for (const violation of criticalViolations) {
        console.log(`❌ ${violation.message} (${violation.file})`);
      }
    }
  }
}

async function main() {
  const validator = new ContractCorrectnessValidator(process.cwd());
  
  // Check if we should only validate changed features
  const onlyChanged = process.argv.includes('--changed') || process.argv.includes('-c');
  const reports = await validator.validateAllFeatures(onlyChanged);
  
  // Exit with error code if there are critical violations
  const criticalViolations = reports.flatMap(r => r.violations).filter(v => v.severity === 'error');
  if (criticalViolations.length > 0) {
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
