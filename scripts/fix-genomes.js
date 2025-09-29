#!/usr/bin/env node

/**
 * Fix genome files to match generated types
 * This script removes invalid parameters and fixes feature names
 */

const fs = require('fs');
const path = require('path');

// Genome files to fix
const genomeFiles = [
  'genomes/ultimate-app.genome.ts',
  'genomes/ultimate-app-minimal.genome.ts', 
  'genomes/ultimate-app-safe.genome.ts',
  'genomes/ultimate-app-basic.genome.ts'
];

// Fix patterns
const fixes = [
  // Shadcn UI fixes
  { pattern: /theme:\s*['"][^'"]*['"],?\s*\n/g, replacement: '' },
  { pattern: /darkMode:\s*true,?\s*\n/g, replacement: '' },
  
  // Forms fixes
  { pattern: /validation:\s*['"][^'"]*['"],?\s*\n/g, replacement: '' },
  { pattern: /components:\s*\[[^\]]*\],?\s*\n/g, replacement: '' },
  { pattern: /errorHandling:\s*true,?\s*\n/g, replacement: '' },
  
  // Tailwind fixes
  { pattern: /config:\s*['"][^'"]*['"],?\s*\n/g, replacement: '' },
  { pattern: /plugins:\s*\[[^\]]*\],?\s*\n/g, replacement: '' },
  { pattern: /darkMode:\s*['"][^'"]*['"],?\s*\n/g, replacement: '' },
  
  // Auth fixes
  { pattern: /providers:\s*\[['"]github['"],\s*['"]email['"]\]/g, replacement: "providers: ['email']" },
  { pattern: /providers:\s*\[['"]email['"],\s*['"]github['"]\]/g, replacement: "providers: ['email']" },
  { pattern: /providers:\s*\[['"]github['"],\s*['"]google['"],\s*['"]email['"]\]/g, replacement: "providers: ['email']" },
  { pattern: /providers:\s*\[['"]email['"],\s*['"]github['"],\s*['"]google['"]\]/g, replacement: "providers: ['email']" },
  { pattern: /emailVerification:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /passwordReset:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /multiFactor:\s*true,?\s*\n/g, replacement: '' },
  
  // Zustand fixes
  { pattern: /middleware:\s*\[['"]devtools['"],\s*['"]immer['"]\]/g, replacement: "middleware: ['persist']" },
  { pattern: /middleware:\s*\[['"]immer['"],\s*['"]devtools['"]\]/g, replacement: "middleware: ['persist']" },
  { pattern: /middleware:\s*\[['"]devtools['"],\s*['"]immer['"],\s*['"]subscribeWithSelector['"]\]/g, replacement: "middleware: ['persist']" },
  { pattern: /middleware:\s*true,?\s*\n/g, replacement: '' },
  
  // Stripe fixes
  { pattern: /subscriptions:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /oneTimePayments:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /marketplace:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /connect:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /taxCalculation:\s*true,?\s*\n/g, replacement: '' },
  
  // Resend fixes
  { pattern: /templates:\s*\[[^\]]*\],?\s*\n/g, replacement: '' },
  { pattern: /batchSending:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /scheduling:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /tracking:\s*true,?\s*\n/g, replacement: '' },
  
  // Next-intl fixes
  { pattern: /locales:\s*\[['"]en['"],\s*['"]fr['"],\s*['"]es['"]\]/g, replacement: "locales: ['en', 'fr']" },
  { pattern: /locales:\s*\[['"]en['"],\s*['"]es['"],\s*['"]fr['"]\]/g, replacement: "locales: ['en', 'fr']" },
  { pattern: /timezone:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /seo:\s*true,?\s*\n/g, replacement: '' },
  
  // Vitest fixes
  { pattern: /e2e:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /componentTesting:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /mockServiceWorker:\s*true,?\s*\n/g, replacement: '' },
  
  // Sentry fixes
  { pattern: /errorTracking:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /sessionReplay:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /alerts:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /profiling:\s*true,?\s*\n/g, replacement: '' },
  
  // Web3 fixes
  { pattern: /walletIntegration:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /smartContracts:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /nftSupport:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /defiSupport:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /networks:\s*\[['"]ethereum['"],\s*['"]polygon['"]\]/g, replacement: "networks: ['mainnet', 'polygon', 'arbitrum']" },
  { pattern: /networks:\s*\[['"]polygon['"],\s*['"]ethereum['"]\]/g, replacement: "networks: ['mainnet', 'polygon', 'arbitrum']" },
  
  // Docker fixes
  { pattern: /multiStage:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /productionReady:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /healthChecks:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /securityScanning:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /optimization:\s*true,?\s*\n/g, replacement: '' },
  
  // Dev-tools fixes
  { pattern: /linting:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /formatting:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /gitHooks:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /debugging:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /profiling:\s*true,?\s*\n/g, replacement: '' },
  
  // Drizzle fixes
  { pattern: /relations:\s*true,?\s*\n/g, replacement: '' },
  { pattern: /seeding:\s*true,?\s*\n/g, replacement: '' },
  
  // Cleanup trailing commas and empty lines
  { pattern: /,\s*\n\s*}/g, replacement: '\n    }' },
  { pattern: /,\s*\n\s*]/g, replacement: '\n  ]' },
  { pattern: /\n\s*\n\s*\n/g, replacement: '\n\n' },
];

// Fix a single file
function fixFile(filePath) {
  try {
    console.log(`Fixing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;
    
    // Apply all fixes
    for (const fix of fixes) {
      content = content.replace(fix.pattern, fix.replacement);
    }
    
    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`  ✅ Fixed ${filePath}`);
      return true;
    } else {
      console.log(`  ⏭️  No changes needed for ${filePath}`);
      return false;
    }
    
  } catch (error) {
    console.error(`  ❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🔧 Fixing genome files...\n');
  
  let fixedCount = 0;
  
  for (const file of genomeFiles) {
    if (fixFile(file)) {
      fixedCount++;
    }
  }
  
  console.log(`\n🎉 Fixed ${fixedCount} out of ${genomeFiles.length} genome files!`);
  
  if (fixedCount > 0) {
    console.log('\n📝 Next steps:');
    console.log('1. Run: npm run types:generate');
    console.log('2. Run: npx tsc --noEmit');
    console.log('3. Check for any remaining errors');
  }
}

// Run the script
main();
