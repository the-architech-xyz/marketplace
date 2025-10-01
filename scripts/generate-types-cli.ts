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
  const marketplacePath = args[0] || process.cwd();
  const outputPath = args[1] || path.join(process.cwd(), 'types');
  
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
