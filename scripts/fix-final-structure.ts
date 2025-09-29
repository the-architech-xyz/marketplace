#!/usr/bin/env tsx

/**
 * Final script to fix genome structure - separate features from parameters completely
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

async function fixFinalStructure() {
  try {
    // Find all genome files
    const genomeFiles = await glob('genomes/*.genome.ts');
    
    console.log(`Found ${genomeFiles.length} genome files to fix`);
    
    for (const file of genomeFiles) {
      console.log(`Fixing ${file}...`);
      
      let content = readFileSync(file, 'utf-8');
      let originalContent = content;
      
      // Fix all remaining structural issues
      const fixes = [
        // Fix features inside parameters - move to separate features property
        { pattern: /parameters:\s*\{([^}]*),\s*features:\s*\{([^}]*)\}\s*\}/g, replacement: 'parameters: {$1},\n      features: {$2}' },
        
        // Fix drizzle parameters - add missing databaseType
        { pattern: /provider:\s*string,?\s*\n/g, replacement: "provider: 'neon',\n    databaseType: 'postgresql',\n" },
        
        // Fix tailwind number to boolean
        { pattern: /tailwind:\s*\d+,?\s*\n/g, replacement: 'tailwind: true,\n' },
        
        // Fix importAlias string to proper format
        { pattern: /importAlias:\s*string,?\s*\n/g, replacement: "importAlias: '@/*',\n" },
        
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
fixFinalStructure();
