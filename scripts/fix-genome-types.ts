#!/usr/bin/env tsx

/**
 * Script to fix TypeScript type errors in genome files
 * This script removes invalid parameters and fixes feature names to match generated types
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

// Common fixes for genome files
const fixes = [
  // Remove invalid shadcn-ui parameters
  { pattern: /theme:\s*['"][^'"]*['"],?\s*\n/, replacement: '' },
  { pattern: /darkMode:\s*true,?\s*\n/, replacement: '' },
  
  // Fix auth providers
  { pattern: /providers:\s*\[['"]github['"],\s*['"]email['"]\]/, replacement: "providers: ['email']" },
  { pattern: /providers:\s*\[['"]email['"],\s*['"]github['"]\]/, replacement: "providers: ['email']" },
  { pattern: /providers:\s*\[['"]github['"],\s*['"]google['"],\s*['"]email['"]\]/, replacement: "providers: ['email']" },
  { pattern: /providers:\s*\[['"]email['"],\s*['"]github['"],\s*['"]google['"]\]/, replacement: "providers: ['email']" },
  
  // Fix zustand middleware
  { pattern: /middleware:\s*\[['"]devtools['"],\s*['"]immer['"]\]/, replacement: "middleware: ['persist']" },
  { pattern: /middleware:\s*\[['"]immer['"],\s*['"]devtools['"]\]/, replacement: "middleware: ['persist']" },
  { pattern: /middleware:\s*\[['"]devtools['"],\s*['"]immer['"],\s*['"]subscribeWithSelector['"]\]/, replacement: "middleware: ['persist']" },
  
  // Remove invalid zustand features
  { pattern: /middleware:\s*true,?\s*\n/, replacement: '' },
  
  // Fix stripe parameters
  { pattern: /subscriptions:\s*true,?\s*\n/, replacement: '' },
  { pattern: /oneTimePayments:\s*true,?\s*\n/, replacement: '' },
  { pattern: /marketplace:\s*true,?\s*\n/, replacement: '' },
  { pattern: /connect:\s*true,?\s*\n/, replacement: '' },
  { pattern: /taxCalculation:\s*true,?\s*\n/, replacement: '' },
  
  // Fix stripe features
  { pattern: /webhooks:\s*true,?\s*\n/, replacement: '' },
  { pattern: /subscriptions:\s*true,?\s*\n/, replacement: '' },
  { pattern: /invoices:\s*true,?\s*\n/, replacement: '' },
  { pattern: /marketplace:\s*true,?\s*\n/, replacement: '' },
  { pattern: /connect:\s*true,?\s*\n/, replacement: '' },
  { pattern: /taxCalculation:\s*true,?\s*\n/, replacement: '' },
  
  // Fix resend parameters
  { pattern: /templates:\s*\[[^\]]*\],?\s*\n/, replacement: '' },
  { pattern: /batchSending:\s*true,?\s*\n/, replacement: '' },
  { pattern: /scheduling:\s*true,?\s*\n/, replacement: '' },
  { pattern: /tracking:\s*true,?\s*\n/, replacement: '' },
  
  // Fix resend features
  { pattern: /batchSending:\s*true,?\s*\n/, replacement: '' },
  { pattern: /scheduling:\s*true,?\s*\n/, replacement: '' },
  { pattern: /tracking:\s*true,?\s*\n/, replacement: '' },
  
  // Fix next-intl locales
  { pattern: /locales:\s*\[['"]en['"],\s*['"]fr['"],\s*['"]es['"]\]/, replacement: "locales: ['en', 'fr']" },
  { pattern: /locales:\s*\[['"]en['"],\s*['"]es['"],\s*['"]fr['"]\]/, replacement: "locales: ['en', 'fr']" },
  { pattern: /locales:\s*\[['"]en['"],\s*['"]fr['"],\s*['"]es['"],\s*['"]de['"],\s*['"]it['"],\s*['"]pt['"],\s*['"]ja['"],\s*['"]ko['"],\s*['"]zh['"]\]/, replacement: "locales: ['en', 'fr']" },
  
  // Remove invalid next-intl parameters
  { pattern: /timezone:\s*true,?\s*\n/, replacement: '' },
  { pattern: /seo:\s*true,?\s*\n/, replacement: '' },
  
  // Fix next-intl features
  { pattern: /seoOptimization:\s*true,?\s*\n/, replacement: '' },
  { pattern: /dynamicImports:\s*true,?\s*\n/, replacement: '' },
  { pattern: /timezone:\s*true,?\s*\n/, replacement: '' },
  { pattern: /currency:\s*true,?\s*\n/, replacement: '' },
  
  // Fix vitest parameters
  { pattern: /e2e:\s*true,?\s*\n/, replacement: '' },
  { pattern: /componentTesting:\s*true,?\s*\n/, replacement: '' },
  { pattern: /mockServiceWorker:\s*true,?\s*\n/, replacement: '' },
  
  // Fix vitest features
  { pattern: /unitTesting:\s*true,?\s*\n/, replacement: '' },
  { pattern: /integrationTesting:\s*true,?\s*\n/, replacement: '' },
  { pattern: /e2eTesting:\s*true,?\s*\n/, replacement: '' },
  { pattern: /mocking:\s*true,?\s*\n/, replacement: '' },
  { pattern: /visualRegression:\s*true,?\s*\n/, replacement: '' },
  
  // Fix sentry parameters
  { pattern: /errorTracking:\s*true,?\s*\n/, replacement: '' },
  { pattern: /sessionReplay:\s*true,?\s*\n/, replacement: '' },
  { pattern: /alerts:\s*true,?\s*\n/, replacement: '' },
  { pattern: /profiling:\s*true,?\s*\n/, replacement: '' },
  
  // Fix sentry features
  { pattern: /errorTracking:\s*true,?\s*\n/, replacement: '' },
  { pattern: /performanceMonitoring:\s*true,?\s*\n/, replacement: '' },
  { pattern: /alertsDashboard:\s*true,?\s*\n/, replacement: '' },
  { pattern: /sessionReplay:\s*true,?\s*\n/, replacement: '' },
  { pattern: /profiling:\s*true,?\s*\n/, replacement: '' },
  { pattern: /releaseTracking:\s*true,?\s*\n/, replacement: '' },
  
  // Fix web3 parameters
  { pattern: /walletIntegration:\s*true,?\s*\n/, replacement: '' },
  { pattern: /smartContracts:\s*true,?\s*\n/, replacement: '' },
  { pattern: /nftSupport:\s*true,?\s*\n/, replacement: '' },
  { pattern: /defiSupport:\s*true,?\s*\n/, replacement: '' },
  { pattern: /walletConnect:\s*true,?\s*\n/, replacement: '' },
  
  // Fix web3 features
  { pattern: /walletIntegration:\s*true,?\s*\n/, replacement: '' },
  { pattern: /smartContracts:\s*true,?\s*\n/, replacement: '' },
  { pattern: /nftManagement:\s*true,?\s*\n/, replacement: '' },
  { pattern: /defiIntegration:\s*true,?\s*\n/, replacement: '' },
  
  // Fix docker parameters
  { pattern: /multiStage:\s*true,?\s*\n/, replacement: '' },
  { pattern: /productionReady:\s*true,?\s*\n/, replacement: '' },
  { pattern: /healthChecks:\s*true,?\s*\n/, replacement: '' },
  { pattern: /securityScanning:\s*true,?\s*\n/, replacement: '' },
  { pattern: /optimization:\s*true,?\s*\n/, replacement: '' },
  
  // Fix docker features
  { pattern: /multiStage:\s*true,?\s*\n/, replacement: '' },
  { pattern: /productionReady:\s*true,?\s*\n/, replacement: '' },
  { pattern: /healthChecks:\s*true,?\s*\n/, replacement: '' },
  { pattern: /securityScanning:\s*true,?\s*\n/, replacement: '' },
  { pattern: /optimization:\s*true,?\s*\n/, replacement: '' },
  { pattern: /monitoring:\s*true,?\s*\n/, replacement: '' },
  
  // Fix dev-tools parameters
  { pattern: /linting:\s*true,?\s*\n/, replacement: '' },
  { pattern: /formatting:\s*true,?\s*\n/, replacement: '' },
  { pattern: /gitHooks:\s*true,?\s*\n/, replacement: '' },
  { pattern: /debugging:\s*true,?\s*\n/, replacement: '' },
  { pattern: /profiling:\s*true,?\s*\n/, replacement: '' },
  
  // Fix dev-tools features
  { pattern: /linting:\s*true,?\s*\n/, replacement: '' },
  { pattern: /formatting:\s*true,?\s*\n/, replacement: '' },
  { pattern: /gitHooks:\s*true,?\s*\n/, replacement: '' },
  { pattern: /debugging:\s*true,?\s*\n/, replacement: '' },
  { pattern: /profiling:\s*true,?\s*\n/, replacement: '' },
  { pattern: /codeGeneration:\s*true,?\s*\n/, replacement: '' },
  
  // Fix drizzle parameters
  { pattern: /relations:\s*true,?\s*\n/, replacement: '' },
  { pattern: /seeding:\s*true,?\s*\n/, replacement: '' },
  
  // Fix drizzle features
  { pattern: /relations:\s*true,?\s*\n/, replacement: '' },
  { pattern: /seeding:\s*true,?\s*\n/, replacement: '' },
  { pattern: /queryOptimization:\s*true,?\s*\n/, replacement: '' },
  
  // Fix better-auth parameters
  { pattern: /emailVerification:\s*true,?\s*\n/, replacement: '' },
  { pattern: /passwordReset:\s*true,?\s*\n/, replacement: '' },
  { pattern: /multiFactor:\s*true,?\s*\n/, replacement: '' },
  
  // Fix better-auth features
  { pattern: /'oauth-providers':\s*true,?\s*\n/, replacement: '' },
  { pattern: /'session-management':\s*true,?\s*\n/, replacement: '' },
  { pattern: /'email-verification':\s*true,?\s*\n/, replacement: '' },
  { pattern: /'password-reset':\s*true,?\s*\n/, replacement: '' },
  { pattern: /'multi-factor':\s*true,?\s*\n/, replacement: '' },
  { pattern: /'admin-panel':\s*true,?\s*\n/, replacement: '' },
  
  // Fix forms parameters
  { pattern: /validation:\s*['"][^'"]*['"],?\s*\n/, replacement: '' },
  { pattern: /components:\s*\[[^\]]*\],?\s*\n/, replacement: '' },
  { pattern: /errorHandling:\s*true,?\s*\n/, replacement: '' },
  
  // Fix forms features
  { pattern: /validation:\s*true,?\s*\n/, replacement: '' },
  { pattern: /errorHandling:\s*true,?\s*\n/, replacement: '' },
  { pattern: /accessibility:\s*true,?\s*\n/, replacement: '' },
  
  // Fix tailwind parameters
  { pattern: /config:\s*['"][^'"]*['"],?\s*\n/, replacement: '' },
  { pattern: /plugins:\s*\[[^\]]*\],?\s*\n/, replacement: '' },
  { pattern: /darkMode:\s*['"][^'"]*['"],?\s*\n/, replacement: '' },
  
  // Fix tailwind features
  { pattern: /responsive:\s*true,?\s*\n/, replacement: '' },
  { pattern: /darkMode:\s*true,?\s*\n/, replacement: '' },
  { pattern: /animations:\s*true,?\s*\n/, replacement: '' },
];

// Clean up trailing commas and empty lines
const cleanupFixes = [
  { pattern: /,\s*\n\s*}/g, replacement: '\n    }' },
  { pattern: /,\s*\n\s*]/g, replacement: '\n  ]' },
  { pattern: /\n\s*\n\s*\n/g, replacement: '\n\n' },
];

async function fixGenomeFiles() {
  try {
    // Find all genome files
    const genomeFiles = await glob('genomes/*.genome.ts');
    
    console.log(`Found ${genomeFiles.length} genome files to fix`);
    
    for (const file of genomeFiles) {
      console.log(`Fixing ${file}...`);
      
      let content = readFileSync(file, 'utf-8');
      let originalContent = content;
      
      // Apply all fixes
      for (const fix of fixes) {
        content = content.replace(fix.pattern, fix.replacement);
      }
      
      // Apply cleanup fixes
      for (const fix of cleanupFixes) {
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
fixGenomeFiles();
