#!/usr/bin/env node

/**
 * CLI script for generating Constitutional Architecture types
 */

import { ConstitutionalTypeGenerator } from './generate-constitutional-types';
import * as path from 'path';
import * as process from 'process';

async function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  let marketplacePath = args[0] || process.cwd();
  let changedFiles: string[] = [];
  
  // Check if we're being called with specific files (from lint-staged)
  if (args.length > 0 && args.every(arg => path.extname(arg) === '.json' || arg.includes('generate-constitutional-types.ts'))) {
    // We have specific files, use incremental generation
    changedFiles = args.map(arg => path.isAbsolute(arg) ? arg : path.resolve(arg));
    
    // Find marketplace root from the first file
    const firstFile = changedFiles[0];
    let tempPath = path.dirname(firstFile);
    
    // Navigate up to find marketplace root
    while (tempPath !== path.dirname(tempPath)) {
      if (path.basename(tempPath) === 'marketplace') {
        marketplacePath = tempPath;
        break;
      } else if (path.basename(tempPath) === 'adapters' && path.basename(path.dirname(tempPath)) === 'marketplace') {
        marketplacePath = path.dirname(tempPath);
        break;
      } else if (path.basename(tempPath) === 'integrations' && path.basename(path.dirname(tempPath)) === 'marketplace') {
        marketplacePath = path.dirname(tempPath);
        break;
      }
      tempPath = path.dirname(tempPath);
    }
    
    // If we didn't find marketplace root, use the original logic
    if (marketplacePath === args[0]) {
      marketplacePath = path.dirname(firstFile);
      if (marketplacePath.endsWith('/scripts') || marketplacePath.endsWith('\\scripts')) {
        marketplacePath = path.dirname(marketplacePath);
      }
      if (path.basename(marketplacePath) === 'scripts') {
        marketplacePath = path.dirname(marketplacePath);
      }
    }
  }
  
  // Set output path
  const outputPath = path.join(marketplacePath, 'types');
  
  console.log('🚀 Constitutional Architecture Type Generator');
  console.log(`📁 Marketplace path: ${marketplacePath}`);
  console.log(`📁 Output path: ${outputPath}`);
  
  try {
    const generator = new ConstitutionalTypeGenerator(marketplacePath, outputPath);
    
    if (changedFiles.length > 0) {
      console.log('🔄 Running incremental generation...');
      await generator.generateAllTypes(); // For now, always regenerate all types
    } else {
      console.log('🔄 Running full generation...');
      await generator.generateAllTypes();
    }
    
    console.log('✅ Constitutional Architecture type generation completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Type generation failed:', error);
    process.exit(1);
  }
}

// Run the main function
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
