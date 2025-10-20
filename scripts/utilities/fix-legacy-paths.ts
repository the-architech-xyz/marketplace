/**
 * Fix Legacy Path Syntax
 * 
 * Replaces old {{paths.X}} syntax with new ${paths.X} syntax
 * across all templates and blueprints
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fixLegacyPaths() {
  console.log('🔍 Finding files with legacy path syntax...\n');
  
  // Find all .tpl and blueprint.ts files
  const files = await glob('**/*.{tpl,ts}', {
    cwd: path.join(__dirname, '../../'),
    ignore: ['node_modules/**', 'dist/**', 'scripts/**']
  });
  
  let fixed = 0;
  let unchanged = 0;
  
  for (const file of files) {
    const fullPath = path.join(__dirname, '../../', file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace {{paths.X}} with ${paths.X}
    const updated = content.replace(/\{\{paths\.([a-zA-Z_]+)\}\}/g, '${paths.$1}');
    
    if (updated !== content) {
      fs.writeFileSync(fullPath, updated);
      console.log(`✅ Fixed: ${file}`);
      fixed++;
    } else if (content.includes('${paths.')) {
      // Already using new syntax
      unchanged++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Fixed: ${fixed} files`);
  console.log(`   ⏭️  Already correct: ${unchanged} files`);
  console.log(`   📁 Total scanned: ${files.length} files`);
  console.log(`\n🎉 Done!`);
}

fixLegacyPaths().catch(console.error);

