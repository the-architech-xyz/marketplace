/**
 * Template Migration Script: Handlebars → EJS
 * 
 * Converts all .tpl files from Handlebars syntax to EJS syntax
 * Run with: tsx scripts/utilities/migrate-templates-to-ejs.ts
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

interface MigrationStats {
  totalFiles: number;
  successfulFiles: number;
  failedFiles: number;
  totalReplacements: number;
  errors: Array<{ file: string; error: string }>;
}

/**
 * Convert Handlebars syntax to EJS syntax
 */
function convertHandlebarsToEJS(content: string): { converted: string; replacements: number } {
  let converted = content;
  let replacementCount = 0;

  // STEP 1: Convert {{#each array}}...{{/each}} loops
  // Handlebars: {{#each modules}}{{this.id}}{{/each}}
  // EJS: <% modules.forEach((item, index) => { %><%= item.id %><% }); %>
  
  // Match {{#each arrayName}}
  const eachPattern = /\{\{#each\s+(\w+)\}\}/g;
  converted = converted.replace(eachPattern, (match, arrayName) => {
    replacementCount++;
    return `<% ${arrayName}.forEach((item, index) => { %>`;
  });
  
  // Replace {{this.property}} with <%= item.property %> within loops
  // This is a simplified approach - may need manual review
  converted = converted.replace(/\{\{this\.(\w+)\}\}/g, (match, prop) => {
    replacementCount++;
    return `<%= item.${prop} %>`;
  });
  
  // Replace {{@index}} with <%= index %>
  converted = converted.replace(/\{\{@index\}\}/g, () => {
    replacementCount++;
    return '<%= index %>';
  });
  
  // Replace {{@first}} and {{@last}} with <%= index === 0 %>, etc.
  converted = converted.replace(/\{\{@first\}\}/g, () => {
    replacementCount++;
    return '<%= index === 0 %>';
  });
  
  converted = converted.replace(/\{\{@last\}\}/g, () => {
    replacementCount++;
    return '<%= index === array.length - 1 %>';
  });
  
  // Replace {{/each}}
  converted = converted.replace(/\{\{\/each\}\}/g, () => {
    replacementCount++;
    return '<% }); %>';
  });

  // STEP 2: Convert {{#unless condition}}...{{/unless}}
  // Handlebars: {{#unless @last}},{{/unless}}
  // EJS: <% if (!condition) { %>,<% } %>
  
  const unlessPattern = /\{\{#unless\s+(.+?)\}\}/g;
  converted = converted.replace(unlessPattern, (match, condition) => {
    replacementCount++;
    // Clean up condition
    const cleanCondition = condition.trim();
    return `<% if (!(${cleanCondition})) { %>`;
  });
  
  converted = converted.replace(/\{\{\/unless\}\}/g, () => {
    replacementCount++;
    return '<% } %>';
  });

  // STEP 3: Convert {{#if condition}}...{{else}}...{{/if}} blocks
  // Handlebars: {{#if context.show}}yes{{else}}no{{/if}}
  // EJS: <% if (context.show) { %>yes<% } else { %>no<% } %>
  
  const ifPattern = /\{\{#if\s+(.+?)\}\}/g;
  converted = converted.replace(ifPattern, (match, condition) => {
    replacementCount++;
    return `<% if (${condition.trim()}) { %>`;
  });
  
  // Replace {{else}}
  converted = converted.replace(/\{\{else\}\}/g, () => {
    replacementCount++;
    return '<% } else { %>';
  });
  
  // Replace {{/if}}
  converted = converted.replace(/\{\{\/if\}\}/g, () => {
    replacementCount++;
    return '<% } %>';
  });

  // STEP 4: Convert simple variable substitution
  // Handlebars: {{variable}} or {{object.property}}
  // EJS: <%= variable %> or <%= object.property %>
  
  // Match {{variable}} but NOT {{ in JSX (which are part of prop assignments)
  // We need to avoid converting JSX like: initial={{ opacity: 0 }}
  // Strategy: Only convert {{ that are NOT preceded by =
  const variablePattern = /(?<!=)\{\{([^{#/}][^}]*?)\}\}/g;
  converted = converted.replace(variablePattern, (match, variable) => {
    replacementCount++;
    const trimmedVar = variable.trim();
    return `<%= ${trimmedVar} %>`;
  });

  return { converted, replacements: replacementCount };
}

/**
 * Migrate a single template file
 */
async function migrateTemplateFile(filePath: string): Promise<{ success: boolean; replacements: number; error?: string }> {
  try {
    // Read original content
    const original = await fs.readFile(filePath, 'utf-8');
    
    // Convert to EJS
    const { converted, replacements } = convertHandlebarsToEJS(original);
    
    // Write back
    await fs.writeFile(filePath, converted, 'utf-8');
    
    console.log(`✅ Migrated: ${filePath} (${replacements} replacements)`);
    
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
async function migrateAllTemplates(): Promise<void> {
  console.log('🚀 Starting Handlebars → EJS template migration...\n');
  
  const stats: MigrationStats = {
    totalFiles: 0,
    successfulFiles: 0,
    failedFiles: 0,
    totalReplacements: 0,
    errors: []
  };

  try {
    // Find all .tpl files in marketplace
    const marketplacePath = path.join(process.cwd());
    const templateFiles = await glob('**/*.tpl', {
      cwd: marketplacePath,
      absolute: true,
      ignore: ['node_modules/**', 'dist/**']
    });

    stats.totalFiles = templateFiles.length;
    console.log(`📁 Found ${stats.totalFiles} template files\n`);

    // Migrate each file
    for (const filePath of templateFiles) {
      const result = await migrateTemplateFile(filePath);
      
      if (result.success) {
        stats.successfulFiles++;
        stats.totalReplacements += result.replacements;
      } else {
        stats.failedFiles++;
        stats.errors.push({
          file: filePath,
          error: result.error || 'Unknown error'
        });
      }
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total files: ${stats.totalFiles}`);
    console.log(`✅ Successful: ${stats.successfulFiles}`);
    console.log(`❌ Failed: ${stats.failedFiles}`);
    console.log(`Total replacements: ${stats.totalReplacements}`);
    
    if (stats.errors.length > 0) {
      console.log('\n❌ Errors:');
      stats.errors.forEach(({ file, error }) => {
        console.log(`  - ${path.relative(marketplacePath, file)}: ${error}`);
      });
    }
    
    console.log('\n✅ Migration complete!');
    console.log('\n⚠️  IMPORTANT: Manually review the following template types:');
    console.log('  - Templates with nested {{#each}} loops');
    console.log('  - Templates with complex conditional logic');
    console.log('  - Templates that use {{this}} in non-loop contexts');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateAllTemplates().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


