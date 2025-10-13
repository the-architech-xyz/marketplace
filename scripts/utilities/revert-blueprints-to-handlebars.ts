/**
 * Revert Blueprint Migration: EJS → Handlebars
 * 
 * Reverts inline template syntax in blueprint.ts files from EJS back to Handlebars
 * Reason: Simple regex works fine for blueprint strings, EJS only needed for complex .tpl files
 * Run with: tsx scripts/utilities/revert-blueprints-to-handlebars.ts
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

/**
 * Convert EJS syntax back to Handlebars
 */
function convertEJSToHandlebars(content: string): { converted: string; replacements: number } {
  let converted = content;
  let replacementCount = 0;

  // STEP 1: Convert <% if (condition) { %> back to {{#if condition}}
  converted = converted.replace(/<%\s*if\s*\((.+?)\)\s*\{\s*%>/g, (match, condition) => {
    replacementCount++;
    return `{{#if ${condition.trim()}}}`;
  });
  
  // STEP 2: Convert <% } else { %> back to {{else}}
  converted = converted.replace(/<%\s*\}\s*else\s*\{\s*%>/g, () => {
    replacementCount++;
    return '{{else}}';
  });
  
  // STEP 3: Convert <% } %> back to {{/if}} (for if blocks)
  // This is tricky - we need to match closing braces for if statements
  // For now, assume single-level conditionals in blueprints
  converted = converted.replace(/<%\s*\}\s*%>/g, () => {
    replacementCount++;
    return '{{/if}}';
  });

  // STEP 4: Convert <%= variable %> back to {{variable}}
  converted = converted.replace(/<%=\s*(.+?)\s*%>/g, (match, variable) => {
    replacementCount++;
    return `{{${variable.trim()}}}`;
  });
  
  // STEP 5: Convert array.forEach loops back to {{#each}}
  converted = converted.replace(/<%\s*(\w+)\.forEach\(\(item,\s*index\)\s*=>\s*\{\s*%>/g, (match, arrayName) => {
    replacementCount++;
    return `{{#each ${arrayName}}}`;
  });
  
  // STEP 6: Convert item.property back to this.property
  converted = converted.replace(/<%=\s*item\.(\w+)\s*%>/g, (match, prop) => {
    replacementCount++;
    return `{{this.${prop}}}`;
  });
  
  // STEP 7: Convert <%= index %> back to {{@index}}
  converted = converted.replace(/<%=\s*index\s*%>/g, () => {
    replacementCount++;
    return '{{@index}}';
  });
  
  // STEP 8: Convert <% }); %> back to {{/each}}
  converted = converted.replace(/<%\s*\}\);?\s*%>/g, () => {
    replacementCount++;
    return '{{/each}}';
  });
  
  // STEP 9: Convert <% if (!(condition)) { %> back to {{#unless condition}}
  converted = converted.replace(/<%\s*if\s*\(\!\((.+?)\)\)\s*\{\s*%>/g, (match, condition) => {
    replacementCount++;
    return `{{#unless ${condition.trim()}}}`;
  });

  return { converted, replacements: replacementCount };
}

/**
 * Revert a single blueprint file
 */
async function revertBlueprintFile(filePath: string): Promise<{ success: boolean; replacements: number }> {
  try {
    const original = await fs.readFile(filePath, 'utf-8');
    const { converted, replacements } = convertEJSToHandlebars(original);
    
    if (replacements > 0) {
      await fs.writeFile(filePath, converted, 'utf-8');
      console.log(`✅ Reverted: ${path.relative(process.cwd(), filePath)} (${replacements} replacements)`);
    } else {
      console.log(`⏭️  Skipped: ${path.relative(process.cwd(), filePath)} (no EJS syntax found)`);
    }
    
    return { success: true, replacements };
  } catch (error) {
    console.error(`❌ Failed: ${filePath}`, error);
    return { success: false, replacements: 0 };
  }
}

/**
 * Main reversion function
 */
async function revertAllBlueprints(): Promise<void> {
  console.log('🔄 Reverting blueprint.ts files from EJS → Handlebars syntax...\n');
  
  let totalFiles = 0;
  let totalReplacements = 0;

  const blueprintFiles = await glob('**/blueprint.ts', {
    cwd: process.cwd(),
    absolute: true,
    ignore: ['node_modules/**', 'dist/**']
  });

  totalFiles = blueprintFiles.length;
  console.log(`📁 Found ${totalFiles} blueprint files\n`);

  for (const filePath of blueprintFiles) {
    const result = await revertBlueprintFile(filePath);
    totalReplacements += result.replacements;
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 REVERSION SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total files: ${totalFiles}`);
  console.log(`Total replacements: ${totalReplacements}`);
  console.log('\n✅ Blueprint reversion complete!');
  console.log('Blueprints now use {{}} syntax (processed by simple regex)');
  console.log('.tpl files still use <% %> syntax (processed by EJS)');
}

revertAllBlueprints().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


