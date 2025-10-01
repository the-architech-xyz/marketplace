#!/usr/bin/env node

/**
 * CLI script for generating types with artifact discovery
 */

import { SmartTypeGenerator } from './generate-types.js';
import * as path from 'path';
import * as process from 'process';

async function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  let marketplacePath = args[0] || process.cwd();
  
  // If the path is a file, get its parent directory
  if (marketplacePath && path.extname(marketplacePath)) {
    marketplacePath = path.dirname(marketplacePath);
  }
  
  // If we're in a subdirectory (like scripts/), go up to marketplace root
  if (marketplacePath.endsWith('/scripts') || marketplacePath.endsWith('\\scripts')) {
    marketplacePath = path.dirname(marketplacePath);
  }
  
  // Ensure we have the absolute path
  marketplacePath = path.resolve(marketplacePath);
  
  // Final check: if we're still in scripts directory, go up one more level
  if (path.basename(marketplacePath) === 'scripts') {
    marketplacePath = path.dirname(marketplacePath);
  }
  
  const outputPath = args[1] || path.join(marketplacePath, 'types');
  
  console.log('🚀 Smart Type Generator');
  console.log(`📁 Marketplace path: ${marketplacePath}`);
  console.log(`📁 Output path: ${outputPath}`);
  console.log('');
  
  try {
    const generator = new SmartTypeGenerator(marketplacePath, outputPath);
    await generator.generateAllTypes();
    
    console.log('');
    console.log('🎉 Type generation completed successfully!');
    console.log(`📁 Generated types are available at: ${outputPath}`);
  } catch (error) {
    console.error('❌ Type generation failed:', error);
    process.exit(1);
  }
}

// Run the CLI
main().catch(console.error);
