/**
 * Template Validation Script
 * 
 * Validates that all template files referenced in blueprints actually exist
 * and reports missing templates with detailed information
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

interface ValidationResult {
  moduleId: string;
  blueprintFile: string;
  missingTemplates: string[];
  totalTemplates: number;
  validTemplates: number;
  isValid: boolean;
}

class TemplateValidator {
  private marketplaceRoot: string;
  private results: ValidationResult[] = [];

  constructor(marketplaceRoot: string) {
    this.marketplaceRoot = marketplaceRoot;
  }

  async validateAllModules(): Promise<ValidationResult[]> {
    console.log('🔍 Scanning marketplace for template validation...');
    
    // Find all blueprint files
    const blueprintFiles = await glob('**/blueprint.ts', { 
      cwd: this.marketplaceRoot 
    });

    console.log(`Found ${blueprintFiles.length} blueprint files to validate`);

    for (const blueprintFile of blueprintFiles) {
      await this.validateModule(blueprintFile);
    }

    return this.results;
  }

  private async validateModule(blueprintFile: string): Promise<void> {
    const moduleId = this.extractModuleId(blueprintFile);
    const blueprintPath = path.join(this.marketplaceRoot, blueprintFile);
    
    try {
      // Check if blueprint file exists and is a file (not a directory)
      const stats = await fs.stat(blueprintPath);
      if (!stats.isFile()) {
        console.log(`⚠️ ${moduleId}: Blueprint path is not a file, skipping`);
        return;
      }

      // Read and parse blueprint
      const blueprintContent = await fs.readFile(blueprintPath, 'utf-8');
      const templateReferences = this.extractTemplateReferences(blueprintContent);
      
      // Check if templates exist
      const missingTemplates: string[] = [];
      const validTemplates: string[] = [];
      
      for (const templateRef of templateReferences) {
        const templatePath = path.join(
          this.marketplaceRoot,
          path.dirname(blueprintFile),
          templateRef
        );
        
        try {
          await fs.access(templatePath);
          validTemplates.push(templateRef);
        } catch {
          missingTemplates.push(templateRef);
        }
      }

      this.results.push({
        moduleId,
        blueprintFile,
        missingTemplates,
        totalTemplates: templateReferences.length,
        validTemplates: validTemplates.length,
        isValid: missingTemplates.length === 0
      });

      if (missingTemplates.length > 0) {
        console.log(`❌ ${moduleId}: ${missingTemplates.length} missing templates`);
      } else {
        console.log(`✅ ${moduleId}: All templates valid`);
      }

    } catch (error) {
      console.error(`❌ Failed to validate ${moduleId}:`, error);
      // Still add a result for failed modules so auto-fix can work
      this.results.push({
        moduleId,
        blueprintFile,
        missingTemplates: [],
        totalTemplates: 0,
        validTemplates: 0,
        isValid: false
      });
    }
  }

  private extractModuleId(blueprintFile: string): string {
    // Extract module ID from path: adapters/category/name/blueprint.ts -> adapters/category/name
    const parts = blueprintFile.split('/');
    if (parts[0] === 'adapters' || parts[0] === 'integrations' || parts[0] === 'features') {
      // For integrations, it's integrations/name
      if (parts[0] === 'integrations') {
        return `${parts[0]}/${parts[1]}`;
      }
      // For adapters and features, it's category/name
      return `${parts[1]}/${parts[2]}`;
    }
    return blueprintFile;
  }

  private extractTemplateReferences(blueprintContent: string): string[] {
    const templateRegex = /template:\s*['"`]([^'"`]+)['"`]/g;
    const references: string[] = [];
    let match;
    
    while ((match = templateRegex.exec(blueprintContent)) !== null) {
      references.push(match[1]);
    }
    
    return references;
  }

  generateReport(): void {
    console.log('\n📊 TEMPLATE VALIDATION REPORT');
    console.log('='.repeat(50));
    
    const totalModules = this.results.length;
    const validModules = this.results.filter(r => r.isValid).length;
    const invalidModules = totalModules - validModules;
    const totalTemplates = this.results.reduce((sum, r) => sum + r.totalTemplates, 0);
    const missingTemplates = this.results.reduce((sum, r) => sum + r.missingTemplates.length, 0);
    
    console.log(`Total modules: ${totalModules}`);
    console.log(`✅ Valid modules: ${validModules}`);
    console.log(`❌ Invalid modules: ${invalidModules}`);
    console.log(`Total templates: ${totalTemplates}`);
    console.log(`Missing templates: ${missingTemplates}`);
    
    if (invalidModules > 0) {
      console.log('\n🚨 MISSING TEMPLATES:');
      this.results
        .filter(r => !r.isValid)
        .forEach(result => {
          console.log(`\n📁 ${result.moduleId}`);
          console.log(`   Blueprint: ${result.blueprintFile}`);
          console.log(`   Missing templates (${result.missingTemplates.length}):`);
          result.missingTemplates.forEach(template => {
            console.log(`     - ${template}`);
          });
        });
    }

    console.log('\n' + '='.repeat(50));
    if (invalidModules === 0) {
      console.log('🎉 All templates are valid!');
    } else {
      console.log(`⚠️  ${invalidModules} modules have missing templates`);
    }
  }

  async generateMissingTemplates(): Promise<void> {
    const invalidModules = this.results.filter(r => !r.isValid);
    
    if (invalidModules.length === 0) {
      console.log('✅ No missing templates to generate');
      return;
    }

    console.log(`\n🔧 Generating missing templates for ${invalidModules.length} modules...`);
    
    for (const module of invalidModules) {
      console.log(`\n📁 Processing ${module.moduleId}...`);
      
      for (const template of module.missingTemplates) {
        await this.generateTemplate(module.moduleId, template);
      }
    }
  }

  private async generateTemplate(moduleId: string, templatePath: string): Promise<void> {
    const content = this.generateTemplateContent(moduleId, templatePath);
    
    // Find the original blueprint file to get the correct path
    const moduleResult = this.results.find(r => r.moduleId === moduleId);
    if (!moduleResult) {
      console.log(`   ❌ Module not found: ${moduleId}`);
      return;
    }
    
    const blueprintDir = path.dirname(moduleResult.blueprintFile);
    const fullPath = path.join(this.marketplaceRoot, blueprintDir, templatePath);
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    // Write template
    await fs.writeFile(fullPath, content);
    console.log(`   ✅ Created: ${templatePath}`);
  }

  private generateTemplateContent(moduleId: string, templatePath: string): string {
    const ext = path.extname(templatePath);
    const fileName = path.basename(templatePath, ext);
    
    if (ext === '.tsx.tpl') {
      return this.generateReactComponentTemplate(moduleId, fileName);
    } else if (ext === '.ts.tpl') {
      return this.generateTypeScriptTemplate(moduleId, fileName);
    } else if (ext === '.js.tpl') {
      return this.generateJavaScriptTemplate(moduleId, fileName);
    } else if (ext === '.json.tpl') {
      return this.generateJsonTemplate(moduleId, fileName);
    } else {
      return this.generateGenericTemplate(moduleId, fileName);
    }
  }

  private generateReactComponentTemplate(moduleId: string, fileName: string): string {
    const componentName = fileName.replace(/\.tsx$/, '');
    return `import React from 'react';

export interface ${componentName}Props {
  // Add props here
}

export function ${componentName}({ ...props }: ${componentName}Props) {
  return (
    <div>
      {/* Add component content here */}
    </div>
  );
}

export default ${componentName};
`;
  }

  private generateTypeScriptTemplate(moduleId: string, fileName: string): string {
    return `// ${fileName} - Generated template
// Module: ${moduleId}

export interface ${fileName}Config {
  // Add configuration interface here
}

export class ${fileName} {
  // Add class implementation here
}
`;
  }

  private generateJavaScriptTemplate(moduleId: string, fileName: string): string {
    return `// ${fileName} - Generated template
// Module: ${moduleId}

module.exports = {
  // Add configuration here
};
`;
  }

  private generateJsonTemplate(moduleId: string, fileName: string): string {
    return `{
  "name": "${fileName}",
  "description": "Generated template for ${moduleId}",
  "version": "1.0.0"
}
`;
  }

  private generateGenericTemplate(moduleId: string, fileName: string): string {
    return `# ${fileName} - Generated template
# Module: ${moduleId}

# Add content here
`;
  }
}

// CLI execution
async function main() {
  const args = process.argv.slice(2);
  const autoFix = args.includes('--fix') || args.includes('-f');
  const marketplaceRoot = args.find(arg => !arg.startsWith('-')) || process.cwd();
  
  console.log(`🔍 Validating templates in: ${marketplaceRoot}`);
  
  const validator = new TemplateValidator(marketplaceRoot);
  
  await validator.validateAllModules();
  validator.generateReport();
  
  if (autoFix) {
    await validator.generateMissingTemplates();
    console.log('\n🔄 Re-validating after auto-fix...');
    validator.results = [];
    await validator.validateAllModules();
    validator.generateReport();
  }
  
  // Exit with error code if any modules are invalid
  const hasInvalidModules = validator.results.some(r => !r.isValid);
  process.exit(hasInvalidModules ? 1 : 0);
}

// Check if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { TemplateValidator };
