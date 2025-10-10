#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

interface TemplateReference {
  moduleId: string;
  blueprintPath: string;
  templatePath: string;
  lineNumber: number;
}

interface DeadTemplateReport {
  moduleId: string;
  deadTemplates: string[];
  unusedTemplates: string[];
  totalTemplates: number;
  usedTemplates: number;
  deadTemplatePercentage: number;
}

export class DeadTemplateDetector {
  private marketplaceRoot: string;
  private templateReferences: Map<string, TemplateReference[]> = new Map();
  private actualTemplates: Map<string, string[]> = new Map();

  constructor(marketplaceRoot: string) {
    this.marketplaceRoot = marketplaceRoot;
  }

  /**
   * Main method to detect dead templates across all modules
   */
  async detectDeadTemplates(): Promise<DeadTemplateReport[]> {
    console.log('🔍 Scanning for dead templates...\n');
    
    // Step 1: Find all modules
    const modules = await this.findAllModules();
    console.log(`📦 Found ${modules.length} modules to analyze\n`);

    // Step 2: Extract template references from blueprints
    await this.extractTemplateReferences(modules);
    
    // Step 3: Find actual template files
    await this.findActualTemplates(modules);
    
    // Step 4: Compare and generate reports
    const reports = this.generateDeadTemplateReports(modules);
    
    return reports;
  }

  /**
   * Find all modules in the marketplace
   */
  private async findAllModules(): Promise<string[]> {
    const modules: string[] = [];
    
    // Find adapters
    const adapterDirs = glob.sync('adapters/*/*', { cwd: this.marketplaceRoot });
    modules.push(...adapterDirs.map(dir => dir.replace('adapters/', ''))); // Remove 'adapters/' prefix
    
    // Find connectors
    const connectorDirs = glob.sync('connectors/*', { cwd: this.marketplaceRoot });
    modules.push(...connectorDirs.map(dir => dir)); // Keep 'connectors/' prefix
    
    // Find features
    const featureDirs = glob.sync('features/*/*', { cwd: this.marketplaceRoot });
    modules.push(...featureDirs.map(dir => dir)); // Keep 'features/' prefix
    
    console.log(`🔍 Debug: Found adapter dirs: ${adapterDirs.slice(0, 3).join(', ')}...`);
    console.log(`🔍 Debug: Found connector dirs: ${connectorDirs.slice(0, 3).join(', ')}...`);
    console.log(`🔍 Debug: Found feature dirs: ${featureDirs.slice(0, 3).join(', ')}...`);
    
    return modules;
  }

  /**
   * Extract template references from all blueprints
   */
  private async extractTemplateReferences(modules: string[]): Promise<void> {
    console.log('📋 Extracting template references from blueprints...');
    
    for (const moduleId of modules) {
      const blueprintPath = this.getBlueprintPath(moduleId);
      if (!fs.existsSync(blueprintPath)) {
        continue;
      }

      const references = await this.extractTemplatesFromBlueprint(blueprintPath, moduleId);
      this.templateReferences.set(moduleId, references);
      
      if (references.length > 0) {
        console.log(`  ✅ ${moduleId}: ${references.length} template references`);
      }
    }
    
    console.log('');
  }

  /**
   * Find actual template files in each module
   */
  private async findActualTemplates(modules: string[]): Promise<void> {
    console.log('📁 Finding actual template files...');
    
    for (const moduleId of modules.slice(0, 5)) { // Debug first 5 modules
      const templatesDir = this.getTemplatesDir(moduleId);
      console.log(`  🔍 Debug: ${moduleId} -> ${templatesDir}`);
      
      if (!fs.existsSync(templatesDir)) {
        console.log(`  ❌ Directory does not exist: ${templatesDir}`);
        this.actualTemplates.set(moduleId, []);
        continue;
      }

      const templateFiles = glob.sync('*.tpl', { cwd: templatesDir });
      this.actualTemplates.set(moduleId, templateFiles);
      
      if (templateFiles.length > 0) {
        console.log(`  ✅ ${moduleId}: ${templateFiles.length} template files`);
      } else {
        console.log(`  ⚠️  ${moduleId}: No templates found in ${templatesDir}`);
      }
    }
    
    // Process remaining modules without debug
    for (const moduleId of modules.slice(5)) {
      const templatesDir = this.getTemplatesDir(moduleId);
      if (!fs.existsSync(templatesDir)) {
        this.actualTemplates.set(moduleId, []);
        continue;
      }

      const templateFiles = glob.sync('*.tpl', { cwd: templatesDir });
      this.actualTemplates.set(moduleId, templateFiles);
      
      if (templateFiles.length > 0) {
        console.log(`  ✅ ${moduleId}: ${templateFiles.length} template files`);
      }
    }
    
    console.log('');
  }

  /**
   * Generate dead template reports for all modules
   */
  private generateDeadTemplateReports(modules: string[]): DeadTemplateReport[] {
    const reports: DeadTemplateReport[] = [];
    
    console.log('🔍 Analyzing dead templates...\n');
    
    for (const moduleId of modules) {
      const references = this.templateReferences.get(moduleId) || [];
      const actualTemplates = this.actualTemplates.get(moduleId) || [];
      
      // Extract template names from references (remove 'templates/' prefix)
      const usedTemplates = new Set(
        references.map(ref => ref.templatePath.replace('templates/', ''))
      );
      
      // Find dead templates
      const deadTemplates = actualTemplates.filter(template => !usedTemplates.has(template));
      
      // Find unused templates (templates referenced but don't exist)
      const referencedTemplates = new Set(
        references.map(ref => ref.templatePath.replace('templates/', ''))
      );
      const unusedTemplates = Array.from(referencedTemplates).filter(
        template => !actualTemplates.includes(template)
      );
      
      const report: DeadTemplateReport = {
        moduleId,
        deadTemplates,
        unusedTemplates,
        totalTemplates: actualTemplates.length,
        usedTemplates: usedTemplates.size,
        deadTemplatePercentage: actualTemplates.length > 0 
          ? (deadTemplates.length / actualTemplates.length) * 100 
          : 0
      };
      
      reports.push(report);
      
      // Log results
      if (deadTemplates.length > 0 || unusedTemplates.length > 0) {
        console.log(`⚠️  ${moduleId}:`);
        if (deadTemplates.length > 0) {
          console.log(`   🗑️  Dead templates (${deadTemplates.length}): ${deadTemplates.join(', ')}`);
        }
        if (unusedTemplates.length > 0) {
          console.log(`   ❓ Unused references (${unusedTemplates.length}): ${unusedTemplates.join(', ')}`);
        }
        console.log(`   📊 Usage: ${usedTemplates.size}/${actualTemplates.length} (${report.deadTemplatePercentage.toFixed(1)}% dead)`);
        console.log('');
      }
    }
    
    return reports;
  }

  /**
   * Extract template references from a blueprint file
   */
  private async extractTemplatesFromBlueprint(blueprintPath: string, moduleId: string): Promise<TemplateReference[]> {
    const content = fs.readFileSync(blueprintPath, 'utf-8');
    const references: TemplateReference[] = [];
    
    // Match template references in blueprint files
    const templateRegex = /template:\s*['"`]([^'"`]+\.tpl)['"`]/g;
    let match;
    let lineNumber = 1;
    
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineMatches = [...line.matchAll(templateRegex)];
      
      for (const templateMatch of lineMatches) {
        references.push({
          moduleId,
          blueprintPath,
          templatePath: templateMatch[1],
          lineNumber: i + 1
        });
      }
    }
    
    return references;
  }

  /**
   * Get blueprint path for a module
   */
  private getBlueprintPath(moduleId: string): string {
    const parts = moduleId.split(':');
    const type = parts[0];
    const modulePath = parts[1];
    
    switch (type) {
      case 'adapter':
        return path.join(this.marketplaceRoot, 'adapters', modulePath, 'blueprint.ts');
      case 'connector':
        return path.join(this.marketplaceRoot, 'connectors', modulePath, 'blueprint.ts');
      case 'feature':
        return path.join(this.marketplaceRoot, 'features', modulePath, 'blueprint.ts');
      default:
        return '';
    }
  }

  /**
   * Get templates directory for a module
   */
  private getTemplatesDir(moduleId: string): string {
    const parts = moduleId.split(':');
    const type = parts[0];
    const modulePath = parts[1];
    
    switch (type) {
      case 'adapter':
        return path.join(this.marketplaceRoot, 'adapters', modulePath, 'templates');
      case 'connector':
        return path.join(this.marketplaceRoot, 'connectors', modulePath, 'templates');
      case 'feature':
        return path.join(this.marketplaceRoot, 'features', modulePath, 'templates');
      default:
        return '';
    }
  }

  /**
   * Generate a summary report
   */
  generateSummaryReport(reports: DeadTemplateReport[]): void {
    const totalModules = reports.length;
    const modulesWithDeadTemplates = reports.filter(r => r.deadTemplates.length > 0).length;
    const modulesWithUnusedReferences = reports.filter(r => r.unusedTemplates.length > 0).length;
    const totalDeadTemplates = reports.reduce((sum, r) => sum + r.deadTemplates.length, 0);
    const totalUnusedReferences = reports.reduce((sum, r) => sum + r.unusedTemplates.length, 0);
    const totalTemplates = reports.reduce((sum, r) => sum + r.totalTemplates, 0);
    const totalUsedTemplates = reports.reduce((sum, r) => sum + r.usedTemplates, 0);
    
    console.log('📊 DEAD TEMPLATE DETECTION SUMMARY');
    console.log('=====================================');
    console.log(`📦 Total modules analyzed: ${totalModules}`);
    console.log(`🗑️  Modules with dead templates: ${modulesWithDeadTemplates}`);
    console.log(`❓ Modules with unused references: ${modulesWithUnusedReferences}`);
    console.log(`📁 Total template files: ${totalTemplates}`);
    console.log(`✅ Used templates: ${totalUsedTemplates}`);
    console.log(`🗑️  Dead templates: ${totalDeadTemplates}`);
    console.log(`❓ Unused references: ${totalUnusedReferences}`);
    console.log(`📈 Template usage rate: ${totalTemplates > 0 ? ((totalUsedTemplates / totalTemplates) * 100).toFixed(1) : 0}%`);
    console.log('');
    
    if (totalDeadTemplates > 0) {
      console.log('⚠️  RECOMMENDATIONS:');
      console.log('   • Consider removing dead template files to reduce clutter');
      console.log('   • Review if dead templates should be used in blueprints');
      console.log('   • Update blueprints to use existing templates if appropriate');
    }
    
    if (totalUnusedReferences > 0) {
      console.log('❓ UNUSED REFERENCES DETECTED:');
      console.log('   • These templates are referenced in blueprints but don\'t exist');
      console.log('   • Consider creating the missing templates or updating references');
    }
  }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const marketplaceRoot = process.argv[2] || process.cwd();
  const detector = new DeadTemplateDetector(marketplaceRoot);
  
  detector.detectDeadTemplates()
    .then(reports => {
      detector.generateSummaryReport(reports);
      
      // Exit with appropriate code
      const hasIssues = reports.some(r => r.deadTemplates.length > 0 || r.unusedTemplates.length > 0);
      process.exit(hasIssues ? 1 : 0);
    })
    .catch(error => {
      console.error('❌ Error detecting dead templates:', error);
      process.exit(1);
    });
}
