#!/usr/bin/env tsx

/**
 * Script to fix genome file structure - separate features from parameters
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

async function fixGenomeStructure() {
  try {
    // Find all genome files
    const genomeFiles = await glob('genomes/*.genome.ts');
    
    console.log(`Found ${genomeFiles.length} genome files to fix`);
    
    for (const file of genomeFiles) {
      console.log(`Fixing ${file}...`);
      
      let content = readFileSync(file, 'utf-8');
      let originalContent = content;
      
      // Fix common structural issues
      const fixes = [
        // Remove license from project
        { pattern: /license:\s*['"][^'"]*['"],?\s*\n/, replacement: '' },
        
        // Fix features inside parameters - move to separate features property
        { pattern: /parameters:\s*\{([^}]*),\s*features:\s*\{([^}]*)\}\s*\}/g, replacement: 'parameters: {$1},\n      features: {$2}' },
        
        // Fix tailwind number to boolean
        { pattern: /tailwind:\s*\d+,?\s*\n/, replacement: 'tailwind: true,\n' },
        
        // Fix importAlias string to proper format
        { pattern: /importAlias:\s*['"][^'"]*['"],?\s*\n/, replacement: "importAlias: '@/*',\n" },
        
        // Fix provider string to proper enum
        { pattern: /provider:\s*['"][^'"]*['"],?\s*\n/, replacement: "provider: 'neon',\n" },
        
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
fixGenomeStructure();
