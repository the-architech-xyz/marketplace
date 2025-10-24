#!/usr/bin/env tsx
/**
 * Fix legacy template syntax in blueprints
 * Converts ${module.parameters.X} to ${module.parameters.X}
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const LEGACY_PATTERN = /\{\{([^}]+)\}\}/g;

function fixTemplateSyntax(content: string): string {
  return content.replace(LEGACY_PATTERN, (match, expression) => {
    // Convert ${module.parameters.X} to ${module.parameters.X}
    if (expression.startsWith('module.parameters.')) {
      return `\${${expression}}`;
    }
    
    // Convert ${condition ? "..." : ""} to ${condition ? "..." : ""}
    if (expression.startsWith('#if ')) {
      const condition = expression.replace('#if ', '');
      return `\${${condition} ? "..." : ""}`;
    }
    
    // Convert : "" to : ""
    if (expression === 'else') {
      return ': ""';
    }
    
    // Convert } to }
    if (expression === '/if') {
      return '}';
    }
    
    // For other cases, just convert ${X} to ${X}
    return `\${${expression}}`;
  });
}

async function main() {
  console.log('🔍 Finding files with legacy template syntax...\n');
  
  // Find all blueprint files and templates
  const patterns = [
    '**/*.ts',
    '**/*.js', 
    '**/*.tpl',
    '**/*.json'
  ];
  
  let fixedCount = 0;
  let alreadyCorrectCount = 0;
  let totalScanned = 0;
  
  for (const pattern of patterns) {
    const files = await glob(pattern, {
      cwd: process.cwd(),
      ignore: ['node_modules/**', 'dist/**', 'build/**']
    });
    
    for (const file of files) {
      totalScanned++;
      
      try {
        const filePath = path.resolve(file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        if (LEGACY_PATTERN.test(content)) {
          const fixedContent = fixTemplateSyntax(content);
          
          if (fixedContent !== content) {
            fs.writeFileSync(filePath, fixedContent, 'utf-8');
            console.log(`✅ Fixed: ${file}`);
            fixedCount++;
          } else {
            console.log(`⏭️  Already correct: ${file}`);
            alreadyCorrectCount++;
          }
        } else {
          alreadyCorrectCount++;
        }
      } catch (error) {
        console.log(`❌ Error processing ${file}: ${error}`);
      }
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`   ✅ Fixed: ${fixedCount} files`);
  console.log(`   ⏭️  Already correct: ${alreadyCorrectCount} files`);
  console.log(`   📁 Total scanned: ${totalScanned} files`);
  
  if (fixedCount > 0) {
    console.log('\n🎉 Legacy template syntax fixed!');
  } else {
    console.log('\n🎉 No fixes needed!');
  }
}

main().catch(console.error);
