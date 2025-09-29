#!/usr/bin/env tsx

/**
 * Final script to fix all remaining genome issues
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

async function fixFinalGenomeIssues() {
  try {
    // Find all genome files
    const genomeFiles = await glob('genomes/*.genome.ts');
    
    console.log(`Found ${genomeFiles.length} genome files to fix`);
    
    for (const file of genomeFiles) {
      console.log(`Fixing ${file}...`);
      
      let content = readFileSync(file, 'utf-8');
      let originalContent = content;
      
      // Fix all remaining issues
      const fixes = [
        // Add missing framework property
        { pattern: /project:\s*\{\s*name:\s*['"][^'"]*['"],\s*description:\s*['"][^'"]*['"],\s*version:\s*['"][^'"]*['"]\s*\}/g, replacement: 'project: {\n    name: \'project-name\',\n    description: \'Project description\',\n    version: \'0.1.0\',\n    framework: \'nextjs\'\n  }' },
        
        // Fix feature names to match generated types
        { pattern: /apiRoutes:/g, replacement: "'api-routes':" },
        { pattern: /serverActions:/g, replacement: "'server-actions':" },
        { pattern: /ssrOptimization:/g, replacement: "'ssr-optimization':" },
        { pattern: /advancedComponents:/g, replacement: "'advanced-components':" },
        { pattern: /emailVerification:/g, replacement: "'email-verification':" },
        { pattern: /passwordReset:/g, replacement: "'password-reset':" },
        { pattern: /sessionManagement:/g, replacement: "'session-management':" },
        { pattern: /multiFactor:/g, replacement: "'multi-factor':" },
        { pattern: /adminPanel:/g, replacement: "'admin-panel':" },
        { pattern: /oneTimePayments:/g, replacement: "'one-time-payments':" },
        { pattern: /customerPortal:/g, replacement: "'customer-portal':" },
        { pattern: /dynamicImports:/g, replacement: "'dynamic-imports':" },
        { pattern: /seoOptimization:/g, replacement: "'seo-optimization':" },
        
        // Fix auth providers to only use email
        { pattern: /providers:\s*\[['"]email['"],\s*['"]google['"],\s*['"]github['"]\]/g, replacement: "providers: ['email']" },
        { pattern: /providers:\s*\[['"]google['"],\s*['"]github['"],\s*['"]email['"]\]/g, replacement: "providers: ['email']" },
        { pattern: /providers:\s*\[['"]email['"],\s*['"]google['"]\]/g, replacement: "providers: ['email']" },
        { pattern: /providers:\s*\[['"]email['"],\s*['"]github['"]\]/g, replacement: "providers: ['email']" },
        
        // Fix drizzle parameters
        { pattern: /provider:\s*string,?\s*\n/, replacement: "provider: 'neon',\n    databaseType: 'postgresql',\n" },
        
        // Fix features inside parameters - move to separate features property
        { pattern: /parameters:\s*\{([^}]*),\s*features:\s*\{([^}]*)\}\s*\}/g, replacement: 'parameters: {$1},\n      features: {$2}' },
        
        // Fix tailwind number to boolean
        { pattern: /tailwind:\s*\d+,?\s*\n/, replacement: 'tailwind: true,\n' },
        
        // Fix importAlias string to proper format
        { pattern: /importAlias:\s*string,?\s*\n/, replacement: "importAlias: '@/*',\n" },
        
        // Clean up trailing commas and empty lines
        { pattern: /,\s*\n\s*}/g, replacement: '\n    }' },
        { pattern: /,\s*\n\s*]/g, replacement: '\n  ]' },
        { pattern: /\n\s*\n\s*\n/g, replacement: '\n\n' },
      ];
      
      // Apply all fixes
      for (const fix of fixes) {
        content = content.replace(fix.pattern, fix.replacement);
      }
      
      // Only write if content changed
      if (content !== originalContent) {
        writeFileSync(file, content, 'utf-8');
        console.log(`  ✅ Fixed ${file}`);
      } else {
        console.log(`  ⏭️  No changes needed for ${file}`);
      }
    }
    
    console.log('\n🎉 All genome files have been fixed!');
    
  } catch (error) {
    console.error('❌ Error fixing genome files:', error);
    process.exit(1);
  }
}

// Run the script
fixFinalGenomeIssues();
