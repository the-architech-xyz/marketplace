#!/usr/bin/env tsx

/**
 * Create Placeholder Templates Script
 * 
 * Creates placeholder template files for all missing templates identified by the validator
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface MissingTemplate {
  blueprintPath: string;
  templatePath: string;
  fullPath: string;
}

class PlaceholderTemplateCreator {
  private missingTemplates: MissingTemplate[] = [];

  /**
   * Get missing templates from validator output
   */
  private async getMissingTemplates(): Promise<MissingTemplate[]> {
    // For now, we'll manually define the missing templates based on validator output
    // In a real implementation, you'd parse the validator output
    return [
      // zustand-nextjs-integration
      {
        blueprintPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/zustand-nextjs-integration/blueprint.ts',
        templatePath: 'templates/auth-store.ts.tpl',
        fullPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/zustand-nextjs-integration/templates/auth-store.ts.tpl'
      },
      {
        blueprintPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/zustand-nextjs-integration/blueprint.ts',
        templatePath: 'templates/ui-store.ts.tpl',
        fullPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/zustand-nextjs-integration/templates/ui-store.ts.tpl'
      },
      {
        blueprintPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/zustand-nextjs-integration/blueprint.ts',
        templatePath: 'templates/data-store.ts.tpl',
        fullPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/zustand-nextjs-integration/templates/data-store.ts.tpl'
      },
      {
        blueprintPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/zustand-nextjs-integration/blueprint.ts',
        templatePath: 'templates/ssr-store.ts.tpl',
        fullPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/zustand-nextjs-integration/templates/ssr-store.ts.tpl'
      },
      // web3-shadcn-nextjs-integration
      {
        blueprintPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/web3-shadcn-nextjs-integration/blueprint.ts',
        templatePath: 'templates/WalletCard.tsx.tpl',
        fullPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/web3-shadcn-nextjs-integration/templates/WalletCard.tsx.tpl'
      },
      {
        blueprintPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/web3-shadcn-nextjs-integration/blueprint.ts',
        templatePath: 'templates/TransactionCard.tsx.tpl',
        fullPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/web3-shadcn-nextjs-integration/templates/TransactionCard.tsx.tpl'
      },
      {
        blueprintPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/web3-shadcn-nextjs-integration/blueprint.ts',
        templatePath: 'templates/NetworkSwitcher.tsx.tpl',
        fullPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/web3-shadcn-nextjs-integration/templates/NetworkSwitcher.tsx.tpl'
      },
      {
        blueprintPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/web3-shadcn-nextjs-integration/blueprint.ts',
        templatePath: 'templates/balance-route.ts.tpl',
        fullPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/web3-shadcn-nextjs-integration/templates/balance-route.ts.tpl'
      },
      {
        blueprintPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/web3-shadcn-nextjs-integration/blueprint.ts',
        templatePath: 'templates/transaction-route.ts.tpl',
        fullPath: '/Users/antoine/Documents/Code/architech/marketplace/integrations/web3-shadcn-nextjs-integration/templates/transaction-route.ts.tpl'
      }
    ];
  }

  /**
   * Generate placeholder content based on file type
   */
  private generatePlaceholderContent(filePath: string): string {
    const fileName = filePath.split('/').pop() || '';
    const extension = fileName.split('.').pop() || '';
    
    if (fileName.includes('.tsx.tpl') || fileName.includes('.jsx.tpl')) {
      return this.generateReactComponentPlaceholder(fileName);
    } else if (fileName.includes('.ts.tpl') || fileName.includes('.js.tpl')) {
      return this.generateTypeScriptPlaceholder(fileName);
    } else if (fileName.includes('.sql.tpl')) {
      return this.generateSQLPlaceholder(fileName);
    } else if (fileName.includes('.yml.tpl') || fileName.includes('.yaml.tpl')) {
      return this.generateYAMLPlaceholder(fileName);
    } else if (fileName.includes('.sh.tpl')) {
      return this.generateShellScriptPlaceholder(fileName);
    } else if (fileName.includes('.json.tpl')) {
      return this.generateJSONPlaceholder(fileName);
    } else {
      return this.generateGenericPlaceholder(fileName);
    }
  }

  private generateReactComponentPlaceholder(fileName: string): string {
    const componentName = fileName.replace('.tsx.tpl', '').replace('.jsx.tpl', '');
    return `'use client';

import React from 'react';

/**
 * ${componentName} Component
 * 
 * TODO: Implement this component
 * This is a placeholder template that needs to be implemented.
 */

interface ${componentName}Props {
  // TODO: Define props interface
}

export function ${componentName}({ }: ${componentName}Props) {
  return (
    <div className="p-4 border border-dashed border-gray-300 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">${componentName}</h3>
      <p className="text-gray-600">
        This is a placeholder component. Please implement the actual functionality.
      </p>
      <div className="mt-4 text-sm text-gray-500">
        <p>File: ${fileName}</p>
        <p>Status: TODO - Implementation needed</p>
      </div>
    </div>
  );
}

export default ${componentName};`;
  }

  private generateTypeScriptPlaceholder(fileName: string): string {
    const moduleName = fileName.replace('.ts.tpl', '').replace('.js.tpl', '');
    return `/**
 * ${moduleName}
 * 
 * TODO: Implement this module
 * This is a placeholder template that needs to be implemented.
 */

// TODO: Add your implementation here
export function ${moduleName}() {
  // Placeholder implementation
  console.log('${moduleName} - TODO: Implement this function');
}

export default ${moduleName};`;
  }

  private generateSQLPlaceholder(fileName: string): string {
    return `-- ${fileName}
-- TODO: Implement this SQL migration
-- This is a placeholder template that needs to be implemented.

-- Add your SQL statements here
-- Example:
-- CREATE TABLE IF NOT EXISTS example_table (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );`;
  }

  private generateYAMLPlaceholder(fileName: string): string {
    return `# ${fileName}
# TODO: Implement this YAML configuration
# This is a placeholder template that needs to be implemented.

# Add your YAML configuration here
# Example:
# version: '3.8'
# services:
#   app:
#     image: node:18
#     ports:
#       - "3000:3000"`;
  }

  private generateShellScriptPlaceholder(fileName: string): string {
    return `#!/bin/bash
# ${fileName}
# TODO: Implement this shell script
# This is a placeholder template that needs to be implemented.

set -e

echo "Running ${fileName}..."
echo "TODO: Add your script implementation here"

# Add your shell script commands here`;
  }

  private generateJSONPlaceholder(fileName: string): string {
    return `{
  "name": "${fileName.replace('.json.tpl', '')}",
  "description": "TODO: Implement this JSON configuration",
  "version": "1.0.0",
  "status": "placeholder",
  "todo": "This is a placeholder template that needs to be implemented"
}`;
  }

  private generateGenericPlaceholder(fileName: string): string {
    return `# ${fileName}
# TODO: Implement this file
# This is a placeholder template that needs to be implemented.

# Add your implementation here`;
  }

  /**
   * Create all missing template files
   */
  async createPlaceholderTemplates(): Promise<void> {
    console.log('🔧 Creating placeholder templates...\n');
    
    this.missingTemplates = await this.getMissingTemplates();
    
    let created = 0;
    let skipped = 0;
    
    for (const template of this.missingTemplates) {
      if (existsSync(template.fullPath)) {
        console.log(`⏭️  Skipped: ${template.templatePath} (already exists)`);
        skipped++;
        continue;
      }
      
      try {
        // Ensure directory exists
        const dir = dirname(template.fullPath);
        if (!existsSync(dir)) {
          mkdirSync(dir, { recursive: true });
        }
        
        // Generate placeholder content
        const content = this.generatePlaceholderContent(template.templatePath);
        
        // Write file
        writeFileSync(template.fullPath, content, 'utf-8');
        
        console.log(`✅ Created: ${template.templatePath}`);
        created++;
      } catch (error) {
        console.error(`❌ Failed to create ${template.templatePath}:`, error);
      }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`  Created: ${created} files`);
    console.log(`  Skipped: ${skipped} files`);
    console.log(`  Total: ${this.missingTemplates.length} files`);
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  const creator = new PlaceholderTemplateCreator();
  await creator.createPlaceholderTemplates();
}

// Run the creator
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('💥 Placeholder creation failed:', error);
    process.exit(1);
  });
}

export { PlaceholderTemplateCreator };
