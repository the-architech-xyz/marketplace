/**
 * Blueprint Migration Script: Handlebars → EJS
 * 
 * Converts inline template syntax in blueprint.ts files from Handlebars to EJS
 * Run with: tsx scripts/utilities/migrate-blueprints-to-ejs.ts
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

/**
 * Convert Handlebars syntax to EJS within a string (including within JavaScript code)
 */
function convertInlineHandlebarsToEJS(content: string): { converted: string; replacements: number } {
  let converted = content;
  let replacementCount = 0;

  // STEP 1: Convert {{#if condition}} to <% if (condition) { %>
  converted = converted.replace(/\{\{#if\s+(.+?)\}\}/g, (match, condition) => {
    replacementCount++;
    return `<% if (${condition.trim()}) { %>`;
  });
  
  // STEP 2: Convert {{else}} to <% } else { %>
  converted = converted.replace(/\{\{else\}\}/g, () => {
    replacementCount++;
    return '<% } else { %>';
  });
  
  // STEP 3: Convert {{/if}} to <% } %>
  converted = converted.replace(/\{\{\/if\}\}/g, () => {
    replacementCount++;
    return '<% } %>';
  });

  // STEP 4: Convert {{#each array}} to <% array.forEach((item, index) => { %>
  converted = converted.replace(/\{\{#each\s+(\w+)\}\}/g, (match, arrayName) => {
    replacementCount++;
    return `<% ${arrayName}.forEach((item, index) => { %>`;
  });
  
  // STEP 5: Convert {{this.property}} to <%= item.property %>
  converted = converted.replace(/\{\{this\.(\w+)\}\}/g, (match, prop) => {
    replacementCount++;
    return `<%= item.${prop} %>`;
  });
  
  // STEP 6: Convert {{@index}}, {{@first}}, {{@last}}
  converted = converted.replace(/\{\{@index\}\}/g, () => {
    replacementCount++;
    return '<%= index %>';
  });
  
  converted = converted.replace(/\{\{@first\}\}/g, () => {
    replacementCount++;
    return '<%= index === 0 %>';
  });
  
  converted = converted.replace(/\{\{@last\}\}/g, () => {
    replacementCount++;
    return '<%= index === array.length - 1 %>';
  });
  
  // STEP 7: Convert {{#unless condition}} to <% if (!(condition)) { %>
  converted = converted.replace(/\{\{#unless\s+(.+?)\}\}/g, (match, condition) => {
    replacementCount++;
    return `<% if (!(${condition.trim()})) { %>`;
  });
  
  converted = converted.replace(/\{\{\/unless\}\}/g, () => {
    replacementCount++;
    return '<% } %>';
  });
  
  // STEP 8: Convert {{/each}} to <% }); %>
  converted = converted.replace(/\{\{\/each\}\}/g, () => {
    replacementCount++;
    return '<% }); %>';
  });

  // STEP 9: Convert simple variable substitution {{variable}}
  // BUT: Be careful not to convert JSX {{ }} objects
  // Strategy: Only convert {{ that appear in string context (between quotes)
  // Match patterns like: "...{{variable}}..." or '...{{variable}}...' or `...{{variable}}...`
  const stringContextPattern = /(["'`])([^"'`]*?)\{\{([^{#/}][^}]*?)\}\}([^"'`]*?)\1/g;
  
  let lastConverted = '';
  while (lastConverted !== converted) {
    lastConverted = converted;
    converted = converted.replace(stringContextPattern, (match, quote, before, variable, after, q2) => {
      replacementCount++;
      return `${quote}${before}<%= ${variable.trim()} %>${after}${quote}`;
    });
  }

  return { converted, replacements: replacementCount };
}

/**
 * Migrate a single blueprint file
 */
async function migrateBlueprintFile(filePath: string): Promise<{ success: boolean; replacements: number; error?: string }> {
  try {
    // Read original content
    const original = await fs.readFile(filePath, 'utf-8');
    
    // Convert to EJS
    const { converted, replacements } = convertInlineHandlebarsToEJS(original);
    
    // Write back only if changes were made
    if (replacements > 0) {
      await fs.writeFile(filePath, converted, 'utf-8');
      console.log(`✅ Migrated: ${path.relative(process.cwd(), filePath)} (${replacements} replacements)`);
    } else {
      console.log(`⏭️  Skipped: ${path.relative(process.cwd(), filePath)} (no template syntax found)`);
    }
    
    return { success: true, replacements };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Failed: ${filePath} - ${errorMsg}`);
    return { success: false, replacements: 0, error: errorMsg };
  }
}

/**
 * Main migration function
 */
async function migrateAllBlueprints(): Promise<void> {
  console.log('🚀 Starting blueprint.ts Handlebars → EJS migration...\n');
  
  let totalFiles = 0;
  let successfulFiles = 0;
  let failedFiles = 0;
  let totalReplacements = 0;
  const errors: Array<{ file: string; error: string }> = [];

  try {
    // Find all blueprint.ts files in marketplace
    const marketplacePath = process.cwd();
    const blueprintFiles = await glob('**/blueprint.ts', {
      cwd: marketplacePath,
      absolute: true,
      ignore: ['node_modules/**', 'dist/**']
    });

    totalFiles = blueprintFiles.length;
    console.log(`📁 Found ${totalFiles} blueprint files\n`);

    // Migrate each file
    for (const filePath of blueprintFiles) {
      const result = await migrateBlueprintFile(filePath);
      
      if (result.success) {
        successfulFiles++;
        totalReplacements += result.replacements;
      } else {
        failedFiles++;
        errors.push({
          file: filePath,
          error: result.error || 'Unknown error'
        });
      }
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 BLUEPRINT MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total files: ${totalFiles}`);
    console.log(`✅ Successful: ${successfulFiles}`);
    console.log(`❌ Failed: ${failedFiles}`);
    console.log(`Total replacements: ${totalReplacements}`);
    
    if (errors.length > 0) {
      console.log('\n❌ Errors:');
      errors.forEach(({ file, error }) => {
        console.log(`  - ${path.relative(marketplacePath, file)}: ${error}`);
      });
    }
    
    console.log('\n✅ Blueprint migration complete!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateAllBlueprints().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


